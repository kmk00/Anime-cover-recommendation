import type {
  PicturesDataApiResponse,
  StreamingDataApiResponse,
  VideosApiResponse,
  AnalyticsStatsApiResponse,
  AnimeApiResponse,
  AnimeCharacterData,
  EpisodeApiResponse,
  ExternalData,
  StaffData,
} from "@/types/AnimeDetails";

class ApiQueue {
  private queue: Array<{
    endpoint: string;
    resolve: (value: any) => void;
    reject: (reason: any) => void;
    retries: number;
  }> = [];
  private processing = false;
  private lastRequestTime = 0;
  private requestsThisMinute = 0;
  private minuteTimer: NodeJS.Timeout | null = null;

  // Rate limit constants
  private readonly REQUEST_DELAY_MS = 400; // Slightly more than 333ms (3 per second)
  private readonly MAX_REQUESTS_PER_MINUTE = 55; // Slightly less than 60 to be safe
  private readonly MAX_RETRIES = 3;

  constructor() {
    // Reset minute counter every minute
    this.minuteTimer = setInterval(() => {
      this.requestsThisMinute = 0;
    }, 60000);
  }

  async addToQueue<T>(endpoint: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({
        endpoint,
        resolve,
        reject,
        retries: 0,
      });

      if (!this.processing) {
        this.processQueue();
      }
    });
  }

  private async processQueue(): Promise<void> {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;

    // Check if we've hit the per-minute rate limit
    if (this.requestsThisMinute >= this.MAX_REQUESTS_PER_MINUTE) {
      console.log("Minute rate limit reached, pausing queue for a minute");
      setTimeout(() => this.processQueue(), 60000);
      return;
    }

    const item = this.queue.shift();
    if (!item) {
      this.processQueue();
      return;
    }

    // Ensure we're not exceeding rate limit of 3 requests per second
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < this.REQUEST_DELAY_MS) {
      const delay = this.REQUEST_DELAY_MS - timeSinceLastRequest;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    try {
      this.lastRequestTime = Date.now();
      this.requestsThisMinute++;

      const response = await fetch(
        `https://api.jikan.moe/v4/anime${item.endpoint}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          // Too Many Requests
          console.log(`Rate limited on ${item.endpoint}, retrying...`);

          if (item.retries < this.MAX_RETRIES) {
            // Put back in queue with incremented retry count
            this.queue.unshift({
              ...item,
              retries: item.retries + 1,
            });

            // Wait longer between retries
            const retryDelay = Math.pow(2, item.retries) * 1000;
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
          } else {
            item.reject(
              new Error(
                `Rate limit exceeded after ${this.MAX_RETRIES} retries: ${response.status}`
              )
            );
          }
        } else {
          let errorMessage;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || `API error: ${response.status}`;
          } catch (e) {
            errorMessage = `API error: ${response.status} ${response.statusText}`;
          }
          item.reject(new Error(errorMessage));
        }
      } else {
        const data = await response.json();
        item.resolve(data);
      }
    } catch (error) {
      item.reject(error);
    }

    // Add a small delay between requests
    setTimeout(() => this.processQueue(), this.REQUEST_DELAY_MS);
  }

  // Clean up timer on app shutdown if needed
  destroy() {
    if (this.minuteTimer) {
      clearInterval(this.minuteTimer);
    }
  }
}

const apiQueue = new ApiQueue();

/**
 * Generic fetch wrapper with error handling
 * @param {string} endpoint - API endpoint to call (without base URL)
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} - Parsed response data
 */
export const fetchApi = async <T>(endpoint: string): Promise<T> => {
  return apiQueue.addToQueue<T>(endpoint);
};

export const animeApi = {
  getAnimeInfoAll: (animeId: string | number) => {
    const data = fetchApi<AnimeApiResponse>(`/${animeId}`);
    return data;
  },
  getExternalInfo: (animeId: string | number) => {
    const data = fetchApi<ExternalData>(`/${animeId}/external`);
    return data;
  },
  getCharactersForAnime: async (animeId: number | string, page: number = 1) => {
    // First fetch all characters - Jikan API doesn't support limit/offset directly
    const response = await fetchApi<AnimeCharacterData>(
      `/${animeId}/characters`
    );

    const ITEMS_PER_PAGE = 12;
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const mainSortedByFavorites = response.data
      .filter((character) => character.role === "Main")
      .sort((a, b) => b.favorites - a.favorites);

    const supportingCharacters = response.data
      .filter((character) => character.role !== "Main")
      .sort((a, b) => b.favorites - a.favorites);

    const characters = mainSortedByFavorites.concat(supportingCharacters);

    // Create a safe pagination object that doesn't depend on the original structure
    const paginatedData = {
      data: characters.slice(startIndex, endIndex),
      pagination: {
        last_visible_page: Math.ceil(response.data.length / ITEMS_PER_PAGE),
        current_page: page,
        has_next_page: endIndex < response.data.length,
        items: {
          count: response.data.length,
          total: response.data.length,
          per_page: ITEMS_PER_PAGE,
        },
      },
    };

    return paginatedData;
  },

  getProductionDeteails: async (
    animeId: number | string
  ): Promise<{ episodes: EpisodeApiResponse; staff: StaffData }> => {
    const episodesData = await fetchApi<EpisodeApiResponse>(
      `/${animeId}/episodes`
    );

    const staffData = await fetchApi<StaffData>(`/${animeId}/staff`);

    return {
      episodes: episodesData,
      staff: staffData,
    };
  },

  getAnalytics: async (animeId: number | string) => {
    const data = await fetchApi<AnalyticsStatsApiResponse>(
      `/${animeId}/statistics`
    );
    return data;
  },

  getAllMedia: async (animeId: number | string) => {
    const pictures = await fetchApi<PicturesDataApiResponse>(
      `/${animeId}/pictures`
    );

    const streaming = await fetchApi<StreamingDataApiResponse>(
      `/${animeId}/streaming`
    );

    const videos = await fetchApi<VideosApiResponse>(`/${animeId}/videos`);

    return {
      pictures: pictures,
      streaming: streaming,
      videos: videos,
    };
  },
};

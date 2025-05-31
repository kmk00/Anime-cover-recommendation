// types/anime.ts

export interface AnimeImage {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface AnimeImageFormats {
  jpg: AnimeImage;
  webp: AnimeImage;
}

export interface TrailerImage {
  image_url: string | null;
  small_image_url: string | null;
  medium_image_url: string | null;
  large_image_url: string | null;
  maximum_image_url: string | null;
}

export interface AnimeTrailer {
  youtube_id: string | null;
  url: string | null;
  embed_url: string | null;
  images: TrailerImage;
}

export interface AnimeTitle {
  type: string;
  title: string;
}

export interface DateProp {
  day: number | null;
  month: number | null;
  year: number | null;
}

export interface AiredDate {
  from: string | null;
  to: string | null;
  prop: {
    from: DateProp;
    to: DateProp;
  };
  string: string;
}

export interface AnimeBroadcast {
  day: string | null;
  time: string | null;
  timezone: string | null;
  string: string | null;
}

export interface AnimeReference {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface AnimeData {
  mal_id: number;
  url: string;
  images: AnimeImageFormats;
  trailer: AnimeTrailer;
  approved: boolean;
  titles: AnimeTitle[];
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: AiredDate;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string | null;
  season: string | null;
  year: number | null;
  broadcast: AnimeBroadcast;
  producers: AnimeReference[];
  licensors: AnimeReference[];
  studios: AnimeReference[];
  genres: AnimeReference[];
  explicit_genres: AnimeReference[];
  themes: AnimeReference[];
  demographics: AnimeReference[];
}

export interface AnimeApiResponse {
  data: AnimeData;
}

// Characters

export interface CharacterEntry {
  character: Character;
  role: string;
  favorites: number;
  voice_actors: VoiceActor[];
}

export interface Character {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
    };
  };
  name: string;
}

export interface VoiceActor {
  person: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    name: string;
  };
  language: string;
}

export interface AnimeCharacterData {
  data: CharacterEntry[];
  pagination: PaginationMeta;
}

export interface PaginationMeta {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

// External Data

export type ExternalLink = {
  name: string;
  url: string;
};

export type ExternalData = {
  data: ExternalLink[];
};

// Production

export type Episode = {
  mal_id: number;
  url: string | null;
  title: string;
  title_japanese: string;
  title_romanji: string;
  aired: string; // ISO date string
  score: number;
  filler: boolean;
  recap: boolean;
  forum_url: string;
};

export type EpisodeApiResponse = {
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  };
  data: Episode[];
};

// Staff

export type StaffMember = {
  person: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    name: string;
  };
  positions: string[];
};

export type StaffData = {
  data: StaffMember[];
};

// Analytics

export type ScoreData = {
  score: number;
  votes: number;
  percentage: number;
};

export type AnalyticsStats = {
  watching: number;
  completed: number;
  on_hold: number;
  dropped: number;
  plan_to_watch: number;
  total: number;
  scores: ScoreData[];
};

export type AnalyticsStatsApiResponse = {
  data: AnalyticsStats;
};

export type WatchingStatusData = {
  name: string;
  value: number;
  color: string;
  icon: JSX.Element;
};

export type AnimeRankingDistribution = {
  score: number;
  votes: number;
  percentage: string;
  color: string;
};

// Media

//     Pictures

export type PicturesDataApiResponse = {
  data: AnimeImageFormats[];
};

//     Streaming

export type AnimeStreamingPlatform = {
  name: string;
  url: string;
};

export type StreamingDataApiResponse = {
  data: AnimeStreamingPlatform[];
};

export type AnimeImageExtended = AnimeImage & {
  medium_image_url: string;
  maximum_image_url: string;
};

export type YTVideoType = {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: AnimeImageExtended;
};

export type PromoItem = {
  title: string;
  trailer: YTVideoType;
};
export type VideoEpisode = {
  mal_id: number;
  title: string;
  episode: string;
  url: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
};

export type ImageMeta = {
  title: string;
  author: string;
};

export type YTVideoType = {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: AnimeImageExtended;
};

export type MusicVideoItem = {
  title: string;
  video: YTVideoType;
  meta: ImageMeta;
};

export type VideosData = {
  promo: PromoItem[];
  episodes: VideoEpisode[];
  music_videos: MusicVideoItem[];
};

export type VideosApiResponse = {
  data: VideosData;
};

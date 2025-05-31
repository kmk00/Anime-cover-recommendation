export type AnimeRecommendationItem = {
  id: string;
  url: string;
  similarity: number;
  raw_score: number;
};

type AnimeRecommendationsDataResponse = {
  results: AnimeRecommendationItem[];
};

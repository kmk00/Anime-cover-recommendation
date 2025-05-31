export type AnimeData = {
  id: number;
  malURL: string;
  title: string;
  type: string | null;
  source: string | null;
  episodes: number | null;
  status: string | null;
  rating: string | null;
  score: number | null;
  scoredBy: number | null;
  rank: number | null;
  synopsis: string | null;
  season: string | null;
  year: number | null;
  producers: string[];
  genres: string[];
  themes: string[];
  images: {
    smallImgUrl: string;
    largeImgUrl: string;
  };
};

export type AnimeDetails = AnimeData & {};

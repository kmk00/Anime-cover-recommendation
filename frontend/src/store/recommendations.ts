import type { AnimeRecommendationItem } from "@/types/Recommendations";
import { create } from "zustand";

export interface useRecommendationsStore {
  recommendations: AnimeRecommendationItem[];
  setRecommendations: (recommendations: AnimeRecommendationItem[]) => void;
}

export const useRecommendationsStore = create<useRecommendationsStore>(
  (set) => ({
    recommendations: [],
    setRecommendations: (recommendations: AnimeRecommendationItem[]) =>
      set({ recommendations }),
  })
);

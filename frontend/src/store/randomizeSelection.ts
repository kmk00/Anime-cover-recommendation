import { create } from "zustand";

export interface RandomizeSelectionStore {
  isRandomizing: boolean;
  highlightedCardId: number | null;
  selectedCardId: number | null;
  triggerRandomizeAnimation: (totalCards: number) => void;
  resetSelection: () => void;
}

export const useRandomizeSelectionStore = create<RandomizeSelectionStore>(
  (set) => ({
    isRandomizing: false,
    highlightedCardId: null,
    selectedCardId: null,

    triggerRandomizeAnimation: (totalCards: number) => {
      set({ isRandomizing: true, selectedCardId: null });

      let animationCount = 0;
      const maxAnimations = 20 + Math.floor(Math.random() * 15);

      const interval = setInterval(() => {
        const randomCardId = Math.floor(Math.random() * totalCards);
        set({ highlightedCardId: randomCardId });
        animationCount++;

        if (animationCount >= maxAnimations) {
          clearInterval(interval);
          const finalSelectedId = Math.floor(Math.random() * totalCards);
          setTimeout(() => {
            set({
              isRandomizing: false,
              highlightedCardId: null,
              selectedCardId: finalSelectedId,
            });
          }, 100);
        }
      }, 50);
    },

    resetSelection: () => {
      set({
        isRandomizing: false,
        highlightedCardId: null,
        selectedCardId: null,
      });
    },
  })
);

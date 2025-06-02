// Updated RecommendationCard.jsx
import { HoverCard, HoverCardTrigger } from "../ui/hover-card";
import RecommendationHoverDetails from "./RecommendationHoverDetails";
import { useState } from "react";
import { useRandomizeSelectionStore } from "@/store/randomizeSelection";

const RecommendationCard = ({
  animeId,
  animeCoverUrl,
  similarity,
  cardId,
}: {
  animeId: string | number;
  animeCoverUrl: string;
  similarity: number;
  cardId: number;
}) => {
  const [open, setOpen] = useState(false);
  const { isRandomizing, highlightedCardId, selectedCardId } =
    useRandomizeSelectionStore();

  const isHighlighted = highlightedCardId === cardId;
  const isSelected = selectedCardId === cardId;

  const getCurrentBackgroundClass = () => {
    if (isSelected) {
      return "bg-red-500/70"; // Final selected card stays red
    }
    if (isHighlighted && isRandomizing) {
      return "bg-red-500/70"; // Currently highlighted card during animation
    }
    return "bg-black/70"; // Default state
  };

  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger asChild>
        <div className="relative h-full group cursor-pointer overflow-hidden rounded-lg shadow-lg">
          <a target="_blank" href={`/anime/${animeId}`}>
            <img
              src={animeCoverUrl}
              className={`object-cover transition-all duration-300 group-hover:scale-110 h-full w-full `}
            />
            <div
              className={`absolute bottom-0 w-full text-white p-2 transition-all duration-75 ease-in-out ${getCurrentBackgroundClass()}`}
            >
              <p className="text-center font-bold">{similarity.toFixed(2)} %</p>
            </div>
          </a>
        </div>
      </HoverCardTrigger>
      {open && <RecommendationHoverDetails animeId={animeId} />}
    </HoverCard>
  );
};

export default RecommendationCard;

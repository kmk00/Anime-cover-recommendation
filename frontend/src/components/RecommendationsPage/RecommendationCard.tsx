import { HoverCard, HoverCardTrigger } from "../ui/hover-card";
import RecommendationHoverDetails from "./RecommendationHoverDetails";
import { useState } from "react";

const RecommendationCard = ({
  animeId,
  animeCoverUrl,
  similarity,
}: {
  animeId: string | number;
  animeCoverUrl: string;
  similarity: number;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger asChild>
        <div className="relative h-full group cursor-pointer overflow-hidden rounded-lg ">
          <a target="_blank" href={`/anime/${animeId}`}>
            <img
              src={animeCoverUrl}
              className={`object-cover transition-all duration-300 group-hover:scale-110 h-full w-full`}
            />
            <div className="absolute bottom-0 w-full bg-black/70 text-white p-2">
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

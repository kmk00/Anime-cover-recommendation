import { useRecommendationsStore } from "@/store/recommendations";
import RecommendationCard from "./RecommendationCard";

const RecommendationResults = () => {
  const { recommendations } = useRecommendationsStore();

  if (!recommendations) return null;

  return (
    <div className="w-full h-fit ">
      <h2 className="text-2xl text-right font-bold mb-4">
        Similar to your image
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 ">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="animate-card-appear data-[state=closed]:animate-card-disappear opacity-0"
            style={{
              animationDelay: `${idx * 100}ms`,
              animationFillMode: "forwards",
            }}
          >
            <RecommendationCard
              animeId={rec.id}
              animeCoverUrl={rec.url}
              similarity={rec.similarity}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationResults;

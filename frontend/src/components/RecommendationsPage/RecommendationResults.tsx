import { useRecommendationsStore } from "@/store/recommendations";
import RecommendationCard from "./RecommendationCard";
import RandomSelected from "./RandomSelected";

const RecommendationResults = () => {
  const { recommendations } = useRecommendationsStore();

  if (!recommendations) return null;

  return (
    <div id="recommendation-modal" className="w-full h-fit ">
      <h2 className="text-2xl text-right font-bold mb-4 uppercase">
        Similar to your image
      </h2>
      <div className="grid md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] grid-cols-[repeat(auto-fill,minmax(100px,1fr))]  gap-4 relative">
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
              cardId={idx}
            />
          </div>
        ))}
        <RandomSelected />
      </div>
    </div>
  );
};

export default RecommendationResults;

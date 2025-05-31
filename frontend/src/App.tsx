import ImageUploader from "./components/ImageUploader";
import RecommendationResults from "./components/RecommendationResults";
import { useRecommendationsStore } from "./store/recommendations";

function App() {
  const { recommendations } = useRecommendationsStore();

  return (
    <div className="max-w-[1800px] justify-center md:flex py-4 gap-4 px-2 mx-auto">
      <div>
        <ImageUploader />
      </div>
      {recommendations && recommendations.length > 0 && (
        <RecommendationResults />
      )}
    </div>
  );
}

export default App;

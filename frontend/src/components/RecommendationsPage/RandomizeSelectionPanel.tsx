import { useRandomizeSelectionStore } from "@/store/randomizeSelection";
import { Button } from "../ui/button";
import { useRecommendationsStore } from "@/store/recommendations";
import scrollToElement from "@/lib/scrolltoElement";

const RandomizeSelectionPanel = () => {
  const { triggerRandomizeAnimation } = useRandomizeSelectionStore();
  const { recommendations } = useRecommendationsStore();

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  const handleRandomize = () => {
    if (recommendations && recommendations.length > 0) {
      scrollToElement("recommendation-modal");
      triggerRandomizeAnimation(recommendations.length);
    }
  };

  return (
    <div className="w-full h-12 mt-4">
      <Button
        onClick={handleRandomize}
        className="w-full h-full cursor-pointer"
        variant="outline"
      >
        Randomize Selection
      </Button>
    </div>
  );
};

export default RandomizeSelectionPanel;

import Loading from "./Loading";
import { HoverCardContent } from "./ui/hover-card";

const RecommendationHoverSceleton = () => {
  return (
    <HoverCardContent className="w-80 p-0 overflow-hidden">
      <Loading />
    </HoverCardContent>
  );
};

export default RecommendationHoverSceleton;

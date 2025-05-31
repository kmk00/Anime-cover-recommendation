import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import scrollToElement from "@/lib/scrolltoElement";
import type { Episode } from "@/types/AnimeDetails";
import { Tv } from "lucide-react";

const ProductionTimeline = ({
  episodesData,
}: {
  episodesData: Episode[] | undefined | null;
}) => {
  scrollToElement("tabs-navigation");

  return (
    <Card className="h-[600px] md:h-fit overflow-auto">
      <CardHeader>
        <CardTitle className="flex justify-between">
          Production Timeline
          <Tv className="h-4 w-4 mr-2 text-gray-500" />
        </CardTitle>
        <CardDescription>{episodesData?.length} Episodes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {episodesData?.map((episode) => (
            <div
              key={episode.mal_id}
              className="flex justify-between items-center"
            >
              <span>Episode {episode.mal_id}</span>
              <span className="text-sm text-gray-500">
                {new Date(episode.aired).toLocaleDateString()}
              </span>
            </div>
          ))}
          {episodesData?.length === 0 && <div>No episodes found</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductionTimeline;

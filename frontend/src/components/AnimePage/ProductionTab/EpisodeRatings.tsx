import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import EpisodeChart from "./EpisodeChart";
import type { Episode } from "@/types/AnimeDetails";
import scrollToElement from "@/lib/scrolltoElement";

const EpisodeRatings = ({
  episodesData,
}: {
  episodesData: Episode[] | undefined;
}) => {
  const averageRating =
    episodesData &&
    episodesData
      .reduce((acc, episode) => acc + episode.score / episodesData.length, 0)
      .toFixed(2);

  scrollToElement("tabs-navigation");

  return (
    <Card className="h-[600px] md:h-fit overflow-auto">
      <CardHeader>
        <CardTitle className="flex justify-between">
          Episode Types <Star className="h-4 w-4 mr-2 text-gray-500" />
        </CardTitle>
        <CardDescription>
          Average Rating:{" "}
          {(episodesData && episodesData.length > 0 && averageRating) || "-"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {episodesData && <EpisodeChart episodes={episodesData} />}
        {episodesData?.length === 0 && <div>No episodes found</div>}
      </CardContent>
    </Card>
  );
};

export default EpisodeRatings;

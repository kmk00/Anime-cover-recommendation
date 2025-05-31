import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Episode } from "@/types/AnimeDetails";

const EpisodeTypes = ({
  episodesData,
}: {
  episodesData: Episode[] | undefined;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Episode Types</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Canon Episodes</span>
            <Badge className="bg-green-600">
              {episodesData?.filter((ep) => !ep.filler && !ep.recap).length ||
                "-"}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Filler Episodes</span>
            <Badge className="bg-amber-500">
              {episodesData?.filter((ep) => ep.filler).length || "-"}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Recap Episodes</span>
            <Badge className="bg-gray-500">
              {episodesData?.filter((ep) => ep.recap).length || "-"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EpisodeTypes;

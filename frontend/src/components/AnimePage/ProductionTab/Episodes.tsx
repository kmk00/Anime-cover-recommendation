import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import scrollToElement from "@/lib/scrolltoElement";
import type { Episode } from "@/types/AnimeDetails";
import { Calendar, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const Episodes = ({ episodes }: { episodes: Episode[] | undefined }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  if (!episodes || episodes.length === 0) {
    return (
      <Card>
        <CardContent>No episodes found</CardContent>
      </Card>
    );
  }

  scrollToElement("tabs-navigation");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {episodes.map((episode) => (
        <Card key={episode.mal_id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <Badge className="mb-2">Episode {episode.mal_id || "N/A"}</Badge>
              <Badge
                variant="default"
                className={cn(
                  "flex items-center gap-1",
                  { "bg-secondary": episode.score < 3 },
                  { "bg-primary": episode.score >= 4 }
                )}
              >
                <Star className="h-3 w-3" /> {episode.score.toFixed(2)}
              </Badge>
            </div>
            <CardTitle className="text-lg">{episode.title}</CardTitle>
            <CardDescription className="mt-1 line-clamp-1">
              {episode.title_romanji || "-"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2 italic font-medium text-gray-600">
              {episode.title_japanese || "-"}
            </p>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(episode.aired || "-")}</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="flex gap-2">
              {episode.filler && <Badge variant="outline">Filler</Badge>}
              {episode.recap && <Badge variant="outline">Recap</Badge>}
              {!episode.filler && !episode.recap && (
                <Badge variant="outline">Canon</Badge>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Episodes;

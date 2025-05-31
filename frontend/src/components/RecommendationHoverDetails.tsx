import { HoverCardContent } from "./ui/hover-card";
import { BookOpen, Calendar, Clock, Medal, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { useQuery } from "@tanstack/react-query";
import { animeApi } from "@/lib/animeApi";
import ErrorComponent from "./ErrorComponent";
import RecommendationHoverSceleton from "./RecommendationHoverSceleton";

const RecommendationHoverDetails = ({
  animeId,
}: {
  animeId: string | number;
}) => {
  const {
    data: animeData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recommendation", animeId],
    queryFn: () => animeApi.getAnimeInfoAll(animeId),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <RecommendationHoverSceleton />;

  if (isError)
    return <ErrorComponent errorMesage="Could not load recommendation" />;

  if (!animeData) return <ErrorComponent errorMesage="No data found" />;

  return (
    <HoverCardContent className="w-80 p-0 overflow-hidden">
      <div className="relative h-32 overflow-hidden">
        <img
          src={animeData.data.images.webp.large_image_url}
          alt={animeData.data.title}
          className="w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <div className="p-4 text-white w-full">
            <h3 className="text-lg font-bold truncate">
              {animeData.data.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">
                {animeData.data.score}
              </span>
              <span className="text-xs text-gray-300">
                ({animeData.data.scored_by} votes)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-1 mb-3">
          {animeData.data.genres.slice(0, 3).map((genre, i) => (
            <Badge
              key={i}
              variant="secondary"
              className="text-xs bg-primary text-white"
            >
              {genre.name}
            </Badge>
          ))}
          {animeData.data.genres.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{animeData.data.genres.length - 3}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4 text-gray-400" />
            <span>{animeData.data.type}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{animeData.data.episodes} eps</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{animeData.data.status}</span>
          </div>
          <div className="flex items-center gap-1">
            <Medal className="w-4 h-4 text-gray-400" />
            <span>#{animeData.data.rank}</span>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-xs text-gray-500 line-clamp-3">
            {animeData.data.synopsis}
          </p>
        </div>

        {animeData.data.themes.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-400 mb-1">Themes:</p>
            <p className="text-xs text-gray-600">
              {animeData.data.themes.map((theme) => theme.name).join(", ")}
            </p>
          </div>
        )}

        <a
          href={
            import.meta.env.VITE_APP_URL + `/anime/${animeData.data.mal_id}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-primary hover:bg-primary/20 text-white py-2 rounded-md text-sm transition-colors"
        >
          Read More
        </a>
      </div>
    </HoverCardContent>
  );
};

export default RecommendationHoverDetails;

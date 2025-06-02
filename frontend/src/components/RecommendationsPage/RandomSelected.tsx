import { animeApi } from "@/lib/animeApi";
import { useRandomizeSelectionStore } from "@/store/randomizeSelection";
import { useRecommendationsStore } from "@/store/recommendations";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "../ErrorComponent";
import { Badge } from "../ui/badge";
import { BookOpen, Calendar, Clock, Medal, Star } from "lucide-react";
import Loading from "../Loading";
import { Button } from "../ui/button";
import { fireConfetti } from "@/lib/confettiReal";
import Confetti from "./Confetti";

const RandomSelected = () => {
  const { recommendations } = useRecommendationsStore();
  const { selectedCardId } = useRandomizeSelectionStore();

  // Get the selected recommendation data
  const selectedRecommendation =
    selectedCardId !== null && recommendations
      ? recommendations[selectedCardId]
      : null;

  // Always call useQuery, but conditionally enable it
  const {
    data: animeData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recommendation", selectedRecommendation?.id],
    queryFn: () => animeApi.getAnimeInfoAll(selectedRecommendation!.id),
    enabled: selectedRecommendation !== null, // Only run query when we have data
    refetchOnWindowFocus: false,
  });

  // Early returns after all hooks
  if (selectedCardId === null || !recommendations) {
    return null;
  }

  if (isLoading) return <Loading />;

  if (isError)
    return <ErrorComponent errorMesage="Could not load recommendation" />;

  if (!animeData) return <ErrorComponent errorMesage="No data found" />;

  return (
    <div className="absolute w-full h-full bg-black/70 z-10 flex items-center justify-center">
      <div className="w-80 p-0 z-50 overflow-hidden absolute bg-white rounded-3xl">
        <div className="relative overflow-hidden">
          <img
            src={animeData.data.images.webp.large_image_url}
            alt={animeData.data.title}
            className="w-full max-h-72 object-cover"
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
          >
            <Button
              variant="default"
              className="mt-2 w-full cursor-pointer py-2 rounded-md text-sm transition-colors"
            >
              View Details
            </Button>
          </a>
          <a
            href={animeData.data.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="mt-2 w-full cursor-pointer py-2 rounded-md text-sm transition-colors"
            >
              View on MyAnimeList
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomSelected;

import {
  Award,
  Calendar,
  Clock,
  Film,
  Heart,
  Star,
  Tv,
  Users,
} from "lucide-react";
import { Badge } from "../ui/badge";
import SeasonBadge from "./SeasonalBadge";

import type { AnimeData } from "@/types/AnimeDetails";

const HeroSection = ({ animeDetails }: { animeDetails: AnimeData }) => {
  const usersCount =
    `(${animeDetails.scored_by.toLocaleString()} users)` || "-";

  return (
    <div className="rounded-xl overflow-hidden mb-8 bg-primary/10 backdrop-blur shadow-xl">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 relative">
          <div className="aspect-[2/3] w-full">
            <img
              src={
                animeDetails.images.webp.large_image_url ||
                "https://cdn.myanimelist.net/images/questionmark_23.gif?s=f7dcbc4a4603d18356d3dfef8abd655c"
              }
              alt={animeDetails.title_english || animeDetails.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-2 bg-black/70 p-2 rounded-lg">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 " />
              <span className="font-bold text-lg text-white">
                {animeDetails.score || "-"}
              </span>
              <span className="text-sm text-white">{usersCount}</span>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 p-6 md:p-8">
          <div className="flex justify-between mb-4">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {animeDetails.type && (
                <Badge className="bg-primary">{animeDetails.type}</Badge>
              )}
              <SeasonBadge
                season={animeDetails.season}
                year={animeDetails.year}
              />
              {animeDetails.rating && (
                <Badge className="bg-red-600 hover:bg-red-700">
                  {animeDetails.rating}
                </Badge>
              )}
            </div>
            <div>
              {animeDetails.favorites && (
                <div className="flex items-center gap-2">
                  <Heart size={16} className="fill-rose-500 text-rose-500" />
                  <span>{animeDetails.favorites.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {animeDetails.title_english || animeDetails.title}
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            {animeDetails.title_japanese}
          </p>
          {animeDetails.title_synonyms.length > 0 && (
            <p className="text-gray-600 text-sm mb-4">
              Alternative: {animeDetails.title_synonyms.join(", ")}
            </p>
          )}

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 my-6">
            <div className="flex items-center gap-2">
              <Tv className="w-4 h-4 text-primary" />
              <span>{animeDetails.episodes || "-"} episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>{animeDetails.duration || "-"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{animeDetails.aired.string || "-"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-primary" />
              <span>{animeDetails.status || "-"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              <span>Rank #{animeDetails.rank || "-"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>
                {animeDetails.members.toLocaleString() || "-"} members
              </span>
            </div>
          </div>

          <h2 className="text-lg font-semibold  mb-1">Genres</h2>
          {animeDetails.genres.length === 0 && <p>No genres found</p>}
          <div className="flex flex-wrap gap-2 mb-3">
            {animeDetails.genres.map((genre) => (
              <Badge key={genre.name} className="bg-primary">
                {genre.name}
              </Badge>
            ))}
          </div>

          <h2 className="text-lg font-semibold mb-1">Themes</h2>
          {animeDetails.themes.length === 0 && <p>No themes found</p>}
          <div className="flex flex-wrap gap-2 mb-3">
            {animeDetails.themes.map((theme) => (
              <Badge
                key={theme.name}
                variant="outline"
                className="border-primary black"
              >
                {theme.name}
              </Badge>
            ))}
          </div>

          <h2 className="text-lg font-semibold  mb-1">Studios</h2>
          {animeDetails.studios.length === 0 && <p>No studios found</p>}
          <div className="flex flex-wrap  gap-2 mb-3">
            {animeDetails.studios.map((studio) => (
              <Badge
                key={studio.name}
                variant="outline"
                className="border-primary black"
              >
                {studio.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

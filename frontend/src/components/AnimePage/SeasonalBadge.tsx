import { Badge } from "../ui/badge";

const SeasonalBadge = ({
  season,
  year,
}: {
  season: string | null;
  year: number | null;
}) => {
  const seasonToColor: { [key: string]: string } = {
    winter: "bg-blue-600 hover:bg-blue-700",
    spring: "bg-green-600 hover:bg-green-700",
    summer: "bg-yellow-600 hover:bg-yellow-700",
    fall: "bg-orange-600 hover:bg-orange-700",
  };

  const colorClass = season
    ? seasonToColor[season.toLowerCase()]
    : "bg-gray-600";

  if (!season || !year) return null;

  return (
    <Badge className={`${colorClass} hover:${colorClass}`}>
      {season
        ? season.charAt(0).toUpperCase() + season.slice(1) + " " + year
        : "Unknown"}
    </Badge>
  );
};

export default SeasonalBadge;

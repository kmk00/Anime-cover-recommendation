import type { Episode, StaffMember } from "@/types/AnimeDetails";
import EpisodeTypes from "./EpisodeTypes";
import StaffDistribution from "./StaffDistribution";
import ProductionTimeline from "./ProductionTimeline";
import EpisodeRatings from "./EpisodeRatings";

const Stats = ({
  episodes: episodesData,
  staff,
}: {
  episodes: Episode[] | undefined;
  staff: StaffMember[] | undefined;
}) => {
  return (
    <>
      <EpisodeTypes episodesData={episodesData} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StaffDistribution staff={staff} />

        <ProductionTimeline episodesData={episodesData} />

        <EpisodeRatings episodesData={episodesData} />
      </div>
    </>
  );
};

export default Stats;

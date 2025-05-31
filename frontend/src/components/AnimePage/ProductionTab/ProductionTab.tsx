import type { Episode, StaffMember } from "@/types/AnimeDetails";
import Episodes from "./Episodes";
import { Film, Star, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Staff from "./Staff";
import Stats from "./Stats";
import TabHeading from "../TabHeading";

interface ProductionTabProps {
  episodes: Episode[] | undefined;
  staff: StaffMember[] | undefined;
}

const ProductionTab = ({ episodes, staff }: ProductionTabProps) => {
  return (
    <div id="production">
      <TabHeading
        title={`Production dashboard`}
        subtitle="Explore episodes and staff information"
      />

      <Tabs defaultValue="episodes" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger
            value="episodes"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Film className="h-4 w-4" />
            Episodes
          </TabsTrigger>
          <TabsTrigger
            value="staff"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Users className="h-4 w-4" />
            Staff
          </TabsTrigger>
          <TabsTrigger
            value="stats"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Star className="h-4 w-4" />
            Stats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="episodes" className="space-y-4">
          <Episodes episodes={episodes} />
        </TabsContent>

        <TabsContent value="staff" className="space-y-8">
          <Staff staff={staff} />
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <Stats staff={staff} episodes={episodes} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductionTab;

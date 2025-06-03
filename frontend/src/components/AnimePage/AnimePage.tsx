import type { AnimeData } from "@/types/AnimeDetails";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import OverviewTab from "./OverviewTab";
import CharactersTab from "./CharactersTab";
import AnalyticsTab from "./AnalyticsTab/AnalyticsTab";
import MediaTab from "./MediaTab/MediaTab";

import ProductionTabWrapper from "./ProductionTab/ProductionTabWrapper";
import HeroSection from "./HeroSection";
import ErrorComponent from "../ErrorComponent";

const AnimePage = ({ animeDetails }: { animeDetails: AnimeData }) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!animeDetails) return <ErrorComponent errorMesage="No data found" />;

  return (
    <div className=" min-h-screen  p-6">
      <div className="max-w-6xl bg-primary-foreground rounded-md p-2 mx-auto">
        <HeroSection animeDetails={animeDetails} />

        <Tabs
          id="tabs-navigation"
          defaultValue="overview"
          className="mb-8"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="bg-primary/10 w-full justify-start overflow-x-auto ">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-primary data-[state=active]:text-white cursor-pointer"
            >
              Overview
            </TabsTrigger>

            <TabsTrigger
              value="characters"
              className="data-[state=active]:bg-primary data-[state=active]:text-white cursor-pointer"
            >
              Characters
            </TabsTrigger>

            <TabsTrigger
              value="production"
              className="data-[state=active]:bg-primary data-[state=active]:text-white cursor-pointer"
            >
              Production
            </TabsTrigger>

            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-primary data-[state=active]:text-white cursor-pointer"
            >
              Analytics
            </TabsTrigger>

            <TabsTrigger
              value="media"
              className="data-[state=active]:bg-primary data-[state=active]:text-white cursor-pointer"
            >
              Media
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="prose max-w-none">
              <OverviewTab overview={animeDetails.synopsis} />
            </div>
          </TabsContent>

          <TabsContent value="characters">
            <div className="prose max-w-none">
              <CharactersTab animeId={animeDetails.mal_id} />
            </div>
          </TabsContent>

          <TabsContent value="production">
            <div className="prose max-w-none">
              <ProductionTabWrapper animeId={animeDetails.mal_id} />
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="prose max-w-none">
              <AnalyticsTab animeId={animeDetails.mal_id} />
            </div>
          </TabsContent>

          <TabsContent value="media">
            <div className="prose max-w-none">
              <MediaTab animeId={animeDetails.mal_id} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnimePage;

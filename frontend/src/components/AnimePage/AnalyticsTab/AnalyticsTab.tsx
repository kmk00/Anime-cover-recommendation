import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { animeApi } from "@/lib/animeApi";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  CheckCircle,
  Clock,
  PauseCircle,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";

import Overview from "./Overview";
import Status from "./Status";
import Ratings from "./Ratings";
import Insights from "./Insights";
import type { AnimeRankingDistribution } from "@/types/AnimeDetails";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/ErrorComponent";
import TabHeading from "../TabHeading";

const AnalyticsTab = ({ animeId }: { animeId: string | number }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const {
    data: analyticsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["analytics"],
    queryFn: () => animeApi.getAnalytics(animeId),
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <ErrorComponent
        errorMesage={`Error loading analytics: ${error.message}`}
        small
      />
    );
  }

  if (!analyticsData)
    return <ErrorComponent errorMesage="No data found" small />;

  const votesCount = analyticsData.data.scores.reduce(
    (sum, item) => sum + item.votes,
    0
  );

  let averageScore =
    analyticsData.data.scores.reduce(
      (sum, item) => sum + item.score * item.votes,
      0
    ) / votesCount;

  const rankingDistribution: AnimeRankingDistribution[] =
    analyticsData.data.scores.map((item, index) => ({
      score: item.score,
      votes: item.votes,
      percentage: ((item.votes / votesCount) * 100).toFixed(1),
      color: `hsl(${(index / analyticsData.data.scores.length) * 360}, 70%, 50%)`,
    }));

  const watchingStatusData = [
    {
      name: "Watching",
      value: analyticsData.data.watching,
      color: "#1f6d56",
      icon: <Activity className="h-4 w-4 mr-2 " />,
    },
    {
      name: "Completed",
      value: analyticsData.data.completed,
      color: "#82ca9d",
      icon: <CheckCircle className="h-4 w-4 mr-2" />,
    },
    {
      name: "On Hold",
      value: analyticsData.data.on_hold,
      color: "#e26f11",
      icon: <PauseCircle className="h-4 w-4 mr-2" />,
    },
    {
      name: "Dropped",
      value: analyticsData.data.dropped,
      color: "#c23512",
      icon: <XCircle className="h-4 w-4 mr-2" />,
    },
    {
      name: "Plan to Watch",
      value: analyticsData.data.plan_to_watch,
      color: "#43adc7",
      icon: <Clock className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <main className="min-h-screen" id="analytics">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <TabHeading
              title="Analytics Dashboard"
              subtitle="Detailed statistics and user engagement metrics"
            />
            <div className="mt-4 md:mt-0 flex items-center bg-white rounded-lg shadow-sm p-2">
              <Users className="text-gray-400 mr-2" />
              <div>
                <span className="text-sm text-gray-500">Total Users</span>
                <p className="font-semibold ">
                  {analyticsData.data.total.toLocaleString()}
                </p>
              </div>
            </div>
          </header>

          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList
              id="tabs-analytics"
              className="w-full md:w-1/2 md:mx-auto mb-2 justify-start overflow-x-auto "
            >
              <TabsTrigger className="cursor-pointer" value="overview">
                Overview
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="status">
                Watching Status
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="ratings">
                Ratings
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="insights">
                Insights
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <Overview
              watchingStatusData={watchingStatusData}
              analyticsData={analyticsData.data}
              rankingDistribution={rankingDistribution}
              averageScore={averageScore}
              votesScoreCount={votesCount}
            />

            {/* Status Tab */}
            <Status
              watchingStatusData={watchingStatusData}
              analyticsData={analyticsData.data}
            />

            {/* Ratings Tab */}
            <Ratings
              votesScoreCount={votesCount}
              rankingDistribution={rankingDistribution}
              averageScore={averageScore}
            />

            {/* Insights Tab */}
            <Insights
              analyticsData={analyticsData.data}
              averageScore={averageScore}
              votesScoreCount={votesCount}
            />
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default AnalyticsTab;

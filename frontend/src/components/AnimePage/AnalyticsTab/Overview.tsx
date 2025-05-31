import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import scrollToElement from "@/lib/scrolltoElement";
import type {
  AnalyticsStats,
  AnimeRankingDistribution,
  WatchingStatusData,
} from "@/types/AnimeDetails";
import { Activity, CheckCircle, Flag } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Overview = ({
  analyticsData,
  watchingStatusData,
  rankingDistribution,
  votesScoreCount,
  averageScore,
}: {
  analyticsData: AnalyticsStats;
  watchingStatusData: WatchingStatusData[];
  rankingDistribution: AnimeRankingDistribution[];
  votesScoreCount: number;
  averageScore: number;
}) => {
  const { watching, completed, total } = analyticsData;

  const YAxisDomain = [
    0,
    Math.max(...rankingDistribution.map((item) => item.votes)),
  ];
  const YAxisTickFormatter = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toLocaleString();
  };

  scrollToElement("tabs-analytics");

  return (
    <TabsContent value="overview" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Active Watchers
            </CardTitle>
            <CardDescription>Currently watching users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-2xl font-bold">
                  {watching.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  {((watching / total) * 100).toFixed(1)}% of total
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Completion Rate
            </CardTitle>
            <CardDescription>Users who finished watching</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-2xl font-bold">
                  {completed.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  {((completed / total) * 100).toFixed(1)}% of total
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Average Rating
            </CardTitle>
            <CardDescription>
              Based on {votesScoreCount.toLocaleString()} votes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Flag className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-2xl font-bold">
                  {averageScore.toFixed(2)}/10
                </p>
                <div className="flex mt-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                    <div
                      key={star}
                      className={`h-2 w-2 mr-1 rounded-sm ${
                        star <= Math.round(averageScore)
                          ? "bg-primary"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Watching Status Distribution</CardTitle>
            <CardDescription>
              How users are engaging with the content
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={watchingStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                  >
                    {watchingStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [
                      `${value.toLocaleString()}`,
                      name,
                    ]}
                    labelFormatter={(name) => `Status: ${name}`}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>How users are rating the content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rankingDistribution} barCategoryGap="15%">
                  <XAxis dataKey="score" />
                  <YAxis
                    domain={YAxisDomain}
                    tick={{ fontSize: 12 }}
                    tickFormatter={YAxisTickFormatter}
                    tickCount={5}
                  />
                  <Tooltip
                    formatter={(value, name) => {
                      return name === "percentage"
                        ? [`${value}%`, "Percentage"]
                        : [`${value.toLocaleString()}`, "Votes"];
                    }}
                    labelFormatter={(score) => `Rating: ${score}/10`}
                  />
                  <Bar dataKey="votes" name="Percentage">
                    {rankingDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};

export default Overview;

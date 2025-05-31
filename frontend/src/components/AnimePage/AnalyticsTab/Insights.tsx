import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import scrollToElement from "@/lib/scrolltoElement";
import type { AnalyticsStats } from "@/types/AnimeDetails";

const Insights = ({
  analyticsData,
  averageScore,
  votesScoreCount,
}: {
  analyticsData: AnalyticsStats;
  averageScore: number;
  votesScoreCount: number;
}) => {
  const { total, watching, completed, dropped, plan_to_watch, scores } =
    analyticsData;

  scrollToElement("tabs-analytics");

  return (
    <TabsContent value="insights" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Statistics</CardTitle>
            <CardDescription>Important metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Total Users</span>
                <span className="font-bold">{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Completion Rate</span>
                <span className="font-bold text-green-600">
                  {((completed / total) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Dropout Rate</span>
                <span className="font-bold text-red-500">
                  {((dropped / total) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Average Rating</span>
                <span className="font-bold text-purple-600">
                  {averageScore.toFixed(1)}/10
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Potential Growth</span>
                <span className="font-bold text-blue-500">
                  {((plan_to_watch / total) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rating Participation</span>
                <span className="font-bold text-amber-600">
                  {((votesScoreCount / total) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rating Insights</CardTitle>
            <CardDescription>Analysis of user scoring patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Score Distribution
                </h4>
                <div className="flex">
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">Low (1-4)</span>
                    </div>
                    <p className="text-lg font-semibold">
                      {scores
                        .slice(0, 4)
                        .reduce((sum, item) => sum + item.percentage, 0)
                        .toFixed(1)}
                      %
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm">Mid (5-7)</span>
                    </div>
                    <p className="text-lg font-semibold">
                      {scores
                        .slice(4, 7)
                        .reduce((sum, item) => sum + item.percentage, 0)
                        .toFixed(1)}
                      %
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">High (8-10)</span>
                    </div>
                    <p className="text-lg font-semibold">
                      {scores
                        .slice(7, 10)
                        .reduce((sum, item) => sum + item.percentage, 0)
                        .toFixed(1)}
                      %
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium text-gray-700 mb-2">
                  Key Observations
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="text-green-500 mr-2 mt-1">•</div>
                    <p className="text-sm">
                      <span className="font-medium">
                        High Rating Concentration:
                      </span>{" "}
                      {scores
                        .slice(7, 10)
                        .reduce((sum, item) => sum + item.percentage, 0)
                        .toFixed(1)}
                      % of ratings are 8 or above, indicating strong user
                      satisfaction.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-amber-500 mr-2 mt-1">•</div>
                    <p className="text-sm">
                      <span className="font-medium">Engagement Rate:</span> Only{" "}
                      {((watching / total) * 100).toFixed(1)}% are currently
                      active watchers while{" "}
                      {((plan_to_watch / total) * 100).toFixed(1)}% plan to
                      watch.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-blue-500 mr-2 mt-1">•</div>
                    <p className="text-sm">
                      <span className="font-medium">Low Abandonment:</span> Only{" "}
                      {((dropped / total) * 100).toFixed(1)}% of users dropped,
                      suggesting strong content retention.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};

export default Insights;

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import scrollToElement from "@/lib/scrolltoElement";
import type { AnalyticsStats, WatchingStatusData } from "@/types/AnimeDetails";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const Status = ({
  analyticsData,
  watchingStatusData,
}: {
  analyticsData: AnalyticsStats;
  watchingStatusData: WatchingStatusData[];
}) => {
  const { total } = analyticsData;

  scrollToElement("tabs-analytics");

  return (
    <TabsContent value="status" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Watching Status Breakdown</CardTitle>
          <CardDescription>
            Detailed analysis of user engagement states
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart className="h-full">
                  <Pie
                    data={watchingStatusData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    nameKey="name"
                  >
                    {watchingStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-4">
                {watchingStatusData.map((item) => (
                  <div
                    key={item.name}
                    className="bg-white p-4 rounded-lg border"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="font-semibold">
                        {item.value.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${((item.value / total) * 100).toFixed(1)}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-gray-500 text-right">
                      {((item.value / total) * 100).toFixed(1)}% of total
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Status;

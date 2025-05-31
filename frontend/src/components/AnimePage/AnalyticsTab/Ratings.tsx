import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import scrollToElement from "@/lib/scrolltoElement";
import type { AnimeRankingDistribution } from "@/types/AnimeDetails";

const Ratings = ({
  averageScore,
  rankingDistribution,
  votesScoreCount,
}: {
  averageScore: number;
  rankingDistribution: AnimeRankingDistribution[];
  votesScoreCount: number;
}) => {
  scrollToElement("tabs-analytics");

  return (
    <TabsContent value="ratings" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rating Distribution</CardTitle>
          <CardDescription>
            Analysis of {votesScoreCount.toLocaleString()} user ratings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {rankingDistribution.map((item) => (
              <div key={item.score} className="flex items-center space-x-2">
                <div className="w-6 text-right font-medium">{item.score}</div>
                <div className="flex-1 h-6 bg-gray-100 rounded-sm relative">
                  <div
                    className="absolute inset-y-0 left-0 rounded-sm flex items-center px-2 text-xs text-white font-medium"
                    style={{
                      width: `${Math.max(Number(item.percentage) * 3, Number(item.percentage) + 8)}%`,
                      backgroundColor: item.color,
                    }}
                  >
                    {item.percentage}%
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-6 mt-6 border-t">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Average Score</span>
                <span className="font-bold text-purple-700">
                  {averageScore.toFixed(2)}/10
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-purple-600"
                  style={{ width: `${averageScore * 10}%` }}
                />
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>1</span>
                <span>10</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Ratings;

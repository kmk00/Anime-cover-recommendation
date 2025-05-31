import type { Episode } from "@/types/AnimeDetails";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const EpisodeChart = ({ episodes }: { episodes: Episode[] }) => {
  const data = episodes.map((episode) => ({
    name: `Ep. ${episode.mal_id}`,
    score: episode.score,
  }));

  const chartHeight = episodes.length * 28;

  return (
    <div>
      <div></div>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: -30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis
            type="number"
            domain={[0, 5]}
            tickCount={6}
            ticks={[0, 1, 2, 3, 4, 5]}
            tick={{ fontSize: 14 }}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 14 }}
            tickFormatter={(value) => value.split(". ")[1]}
          />
          <Tooltip
            formatter={(value: number) => [`${value.toFixed(2)}`, "Score"]}
            labelFormatter={(label) =>
              `Episode ${label.split(". ")[0]}: ${label.split(". ")[1]}`
            }
          />
          <Bar dataKey="score" fill="var(--primary)" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EpisodeChart;

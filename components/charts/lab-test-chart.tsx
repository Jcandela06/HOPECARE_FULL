"use client";

import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "../ui/card";

interface DataProps {
  data: {
    total: number;
    completed: number;
    pending: number;
    cancelled: number;
    month: string;
  }[];
}
export const LabTestChart = ({ data }: DataProps) => {
  const { theme } = useTheme();

  return (
    <Card className="bg-background rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Estadísticas de laboratorio</h1>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={25}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tick={{ fill: "#9ca3af" }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#9ca3af" }} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "#fff" }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{
              paddingTop: "20px",
              paddingBottom: "40px",
              textTransform: "capitalize",
            }}
          />

          <Bar
            dataKey="completed"
            fill="#3b82f6"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="pending"
            fill={theme === "dark" ? "yellow" : "#000000"}
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="cancelled"
            fill="red"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

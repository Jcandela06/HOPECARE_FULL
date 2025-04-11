"use client";

import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const FinancialStats = ({
  data,
}: {
  data: { name: string; value: number }[];
}) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data!}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            horizontal={false}
            stroke="#ddd"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#9ca3af" }}
            tickLine={false}
          />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2196F3"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const FinancialBarChart = ({
  data,
}: {
  data: { name: string; value: number }[];
}) => {
  const { theme } = useTheme();

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          horizontal={false}
          stroke="#ddd"
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tick={{ fill: "#9ca3af" }}
          tickLine={false}
        />
        <YAxis axisLine={false} tick={{ fill: "#9ca3af" }} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "#fff" }} />

        <Bar
          dataKey="value"
          fill={theme !== "light" ? "#e76e50" : "#2a9d90"}
          legendType="circle"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

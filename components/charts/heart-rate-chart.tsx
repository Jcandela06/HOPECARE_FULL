"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface DataProps {
  average: string;
  data: {
    label: string;
    value1: number;
    value2: number;
  }[];
}

export function HeartRateChart({ data, average }: DataProps) {
  const lastData = data[data?.length - 1];

  return (
    <Card className="col-span-2 rounded-xl shadow-none">
      <CardHeader className="px-2 md:px-4 lg:px-6">
        <CardTitle className="text-base md:text-lg">
        Frecuencia cardíaca (pulso)
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 md:px-4 lg:px-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm md:text-lg xl:text-xl font-semibold">
              {lastData?.value1 || 0}-{lastData?.value2 || 0}
            </p>
            <p className="text-sm text-gray-500">Lecturas recientes</p>
          </div>
          <div>
            <p className="text-sm md:text-lg xl:text-xl font-semibold">
              {average}
            </p>
            <p className="text-sm text-gray-500">Tasa promedio</p>
          </div>
          <Button size="sm" variant="outline" className="hidden lg:flex">
          Ver información
          </Button>
        </div>

        <ResponsiveContainer
          width="100%"
          height={300}
          className={"text-xs md:text-base"}
        >
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              horizontal={false}
              stroke="#ddd"
            />
            <XAxis
              dataKey="label"
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
              dataKey="value1"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="value2" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

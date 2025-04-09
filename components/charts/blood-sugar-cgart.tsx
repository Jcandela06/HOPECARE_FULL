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

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface DataProps {
  average: string;
  data: {
    label: string;
    systolic: number;
    diastolic: number;
  }[];
}

export function BloodPressureChart({ data, average }: DataProps) {
  const lastData = data[data?.length - 1];
  const { theme } = useTheme();

  return (
    <Card className="col-span-2 rounded-xl shadow-none">
      <CardHeader className="px-2 md:px-4 lg:px-6">
        <CardTitle className="text-base md:text-lg">Presión arterial</CardTitle>
      </CardHeader>
      <CardContent className="px-2 md:px-4 lg:px-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-base md:text-lg xl:text-xl font-semibold">
              {lastData?.systolic || 0}/{lastData?.diastolic || 0} mg/dL
            </p>
            <p className="text-xs md:text-sm text-gray-500">Lecturas recientes</p>
          </div>
          <div>
            <p className="text-base md:text-lg xl:text-xl font-semibold">
              {average || "0/0 mg/dL"}
            </p>
            <p className="text-xs md:text-sm text-gray-500">Promedio de 7 días</p>
          </div>
          <Button size="sm" variant="outline" className="hidden lg:flex">
          Ver información
          </Button>
        </div>

        <ResponsiveContainer
          width="100%"
          height={400}
          className={"text-xs md:text-base"}
        >
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#ddd"
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tick={{ fill: "#9ca3af" }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#9ca3af" }}
              tickLine={false}
            />
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
              dataKey="systolic"
              fill={theme !== "light" ? "#e76e50" : "#000000"}
              legendType="circle"
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="diastolic"
              fill={theme !== "light" ? "#2a9d90" : "#2563eb"}
              legendType="circle"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

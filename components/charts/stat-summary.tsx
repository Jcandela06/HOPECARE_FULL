"use client";

import { Users } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

import { formatNumber } from "@/utils";

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

export const StatSummary = ({ data, total }: { data: any; total: number }) => {
  const { theme, setTheme } = useTheme();

  const dataInfo = [
    {
      name: "Total",
      count: total,
      fill: "white",
    },
    {
      name: "Appointments",
      count: data?.PENDING + data?.SCHEDULED || 0,
      fill: theme !== "light" ? "#2a9d90" : "#000000",
    },
    {
      name: "Completed",
      count: data?.COMPLETED ?? 0,
      fill: "#2563eb",
    },
  ];

  const appointment = dataInfo[1].count;
  const consultation = dataInfo[2].count;

  return (
    <Card className="w-full max-h-[320px] md:max-h-[300px] h-full">
      {/* TITLE */}
      <CardHeader className="flex flex-row justify-between items-center px-3 md:px-6">
        <h1 className="text-lg font-semibold">Resumen</h1>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="font-normal text-xs"
        >
          <Link href="/record/appointments">Ver detalles</Link>
        </Button>
      </CardHeader>
      {/* CHART */}
      <CardContent className="h-full">
        <div className="relative w-full h-[70%] -mt-12">
          <ResponsiveContainer>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="100%"
              barSize={32}
              data={dataInfo}
            >
              <RadialBar dataKey="count" />
            </RadialBarChart>
          </ResponsiveContainer>

          <Users
            size={30}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
        {/* BOTTOM */}
        <CardFooter className="flex justify-center gap-16 px-0 md:px-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-4 md:w-5 h-4 md:h-5 bg-[#000000] dark:bg-[#2a9d90] rounded-full" />
              <h1 className="font-bold">{formatNumber(appointment)}</h1>
            </div>
            <h2 className="text-xs text-gray-400">
              {dataInfo[1].name} (
              {((appointment / (appointment + consultation)) * 100).toFixed(0)}
              %)
            </h2>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-4 md:w-5 h-4 md:h-5 bg-[#2563eb] rounded-full" />
              <h1 className="font-bold">{formatNumber(consultation)}</h1>
            </div>
            <h2 className="text-xs text-gray-400">
              {dataInfo[2].name} (
              {((consultation / (appointment + consultation)) * 100).toFixed(0)}
              %)
            </h2>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

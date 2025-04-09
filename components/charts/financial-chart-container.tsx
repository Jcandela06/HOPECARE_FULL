import React from "react";
import { FinancialBarChart, FinancialStats } from "./financial-stats";
import { getRevenueChartData } from "@/utils/services/account";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export const FinancialChartContainer = async ({
  category = "monthly",
}: {
  category?: string;
}) => {
  const { revenueData } = await getRevenueChartData(category);

  return (
    <div>
      <Tabs defaultValue="bar-chart">
        <TabsList className="mb-6">
          <TabsTrigger value="bar-chart">Gráfico de barras</TabsTrigger>
          <TabsTrigger value="line-chart">Gráfico de líneas</TabsTrigger>
        </TabsList>

        <TabsContent value="bar-chart">
          <FinancialBarChart data={revenueData!} />
        </TabsContent>
        <TabsContent value="line-chart">
          <FinancialStats data={revenueData!} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

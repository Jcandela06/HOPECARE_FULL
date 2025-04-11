import { Activity, CheckCircle2, Clock, XCircle } from "lucide-react";

import { Card } from "@/components/ui/card";
import { getLabDashboardStats } from "@/utils/services/lab";

import { LabTestChart } from "../charts/lab-test-chart";
import { RecentTests } from "./recent-test";

export const LabDashboardContainer = async () => {
  const { pending, completed, cancelled, recentRecords, totalTest, groupData } =
    await getLabDashboardStats();

  const stats = [
    {
      title: "Total Tests",
      value: totalTest || "0",
      icon: Activity,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-600/15",
      note: "Prueba de laboratorio total para este año",
    },
    {
      title: "Completed",
      value: completed || "0",
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-600/15",
      note: "Total de pruebas completadas para este año",
    },
    {
      title: "Pending",
      value: pending || "0",
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-600/15",
      note: "Total de pruebas pendientes para este año",
    },
    {
      title: "Cancelled",
      value: cancelled || "0",
      icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-600/15",
      note: "Total de pruebas canceladas para este año",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats?.map((stat) => (
          <Card
            key={stat?.title}
            className="p-6 transition-all h-32 duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-base font-medium text-muted-foreground">
                  {stat?.title}
                </p>
                <h3 className="text-2xl font-bold">{stat?.value}</h3>
                <span className="text-xs text-gray-500 ">{stat?.note}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="h-[500px]">
        <LabTestChart data={groupData as any} />
      </div>
      <RecentTests data={recentRecords as any} />
    </div>
  );
};

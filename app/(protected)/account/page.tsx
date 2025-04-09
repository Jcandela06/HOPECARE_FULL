import { currentUser } from "@clerk/nextjs/server";
import {
  BarChart3,
  CreditCard,
  DollarSign,
  Receipt,
  TrendingUp,
} from "lucide-react";
import React from "react";

import { ActivityTimeline } from "@/components/activity-timeline";
import { FinancialChartContainer } from "@/components/charts/financial-chart-container";
import { FinanceCategory } from "@/components/search-by-category";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SearchParamsProps } from "@/types";
import { formatNumberToCurrency } from "@/utils";
import { getAccountDashboard } from "@/utils/services/account";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon,
  description,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("transition-all hover:shadow-lg", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground capitalize">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

const AccountPage = async (prop: SearchParamsProps) => {
  const searchParams = await prop.searchParams;
  const cat = searchParams?.c || "monthly";

  const user = await currentUser();
  const {
    category,
    currentRevenue,
    previousRevenue,
    growth,
    outstandingPayments,
    totalInvoice,
    totalPendingInvoice,
  } = await getAccountDashboard(cat);

  return (
    <div className="p-4 space-y-8 w-full">
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
          Panel financiero
          </h2>
          <p className="text-muted-foreground">Bienvenido, {user?.firstName}</p>
        </div>

        <FinanceCategory />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Ingresos totales"
          value={formatNumberToCurrency(currentRevenue!)}
          icon={
            <DollarSign className="h-4 lg:h-6 w-4 lg:w-6 text-emerald-600" />
          }
          description={
            formatNumberToCurrency(previousRevenue!) +
            ` último ${category?.slice(0, -2)}`
          }
        />
        <StatsCard
          title="Pagos pendientes"
          value={formatNumberToCurrency(totalPendingInvoice!)}
          icon={<CreditCard className="h-4 lg:h-6 w-4 lg:w-6 text-amber-600" />}
          description={totalInvoice + " facturas pendientes"}
        />
        <StatsCard
          title="Facturas pendientes"
          value={formatNumberToCurrency(outstandingPayments!)}
          icon={<Receipt className="h-4 lg:h-6 w-4 lg:w-6 text-red-600" />}
          description="Pagos vencidos"
        />
        <StatsCard
          title={category + " Crecimiento"}
          value={growth! + "%"}
          icon={<TrendingUp className="h-4 lg:h-6 w-4 lg:w-6 text-blue-600" />}
          description={"Comparado con el último" + category?.slice(0, -2)}
        />
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-5">
        <div className="w-[70%]">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2 capitalize">
                <BarChart3 className="h-5 lg:h-6 w-5 lg:w-6 text-blue-600" />
                {category} Ganancia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FinancialChartContainer category={cat} />
            </CardContent>
          </Card>
        </div>

        <ActivityTimeline />
      </div>
    </div>
  );
};

export default AccountPage;

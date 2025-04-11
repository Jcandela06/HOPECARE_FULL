import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/lib/db";
import { formatNumberToCurrency } from "@/utils";
import { formatDistanceToNow } from "date-fns";
import {
  Activity,
  Calendar,
  DollarSign,
  FileText,
  UserPlus,
} from "lucide-react";

const activities = [
  {
    icon: <UserPlus className="h-4 w-4 text-medical-600" />,
    title: "New patient registered",
    time: "2 minutes ago",
  },
  {
    icon: <Calendar className="h-4 w-4 text-medical-600" />,
    title: "Appointment scheduled",
    time: "1 hour ago",
  },
  {
    icon: <FileText className="h-4 w-4 text-medical-600" />,
    title: "Medical record updated",
    time: "3 hours ago",
  },
];

export const ActivityTimeline = async () => {
  const data = await db.paymentDetails.findMany({
    include: {
      payment: {
        include: { patient: { select: { first_name: true, last_name: true } } },
      },
    },
    orderBy: { created_at: "desc" },
    take: 10,
  });

  if (!data) return null;

  return (
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Activity className="h-5 w-5 text-medical-600" />
          Pagos recientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data?.map((el, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="mt-1">
                <DollarSign className="h-4 w-4 text-medical-600" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  {el?.payment?.patient.first_name}{" "}
                  {el?.payment?.patient.last_name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(el?.created_at, { addSuffix: true })}
                </p>
              </div>

              <p className="text-emerald-600 text-base font-semibold">
                + {formatNumberToCurrency(el?.amount)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

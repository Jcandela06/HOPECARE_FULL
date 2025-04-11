import { formatDate } from "@/utils";

import { SmallCard } from "./cards/small-card";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface DataProps {
  id: number | string;
  patient_id: string;
  appointment_date: Date;
  time: string;
  note?: string;
}
export const AppointmentDetail = ({
  id,
  patient_id,
  appointment_date,
  time,
  note,
}: DataProps) => {
  return (
    <Card className="rounded-xl shadow-none">
      <CardHeader className="px-4 lg:px-6">
        <CardTitle className="text-base md:text-lg text-gray-600">
        Información de la cita
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 px-4 lg:px-6">
        <div className="flex">
          <SmallCard label="Appointment #" value={`# ${id}`} />
          <SmallCard label="Date" value={formatDate(appointment_date)} />
          <SmallCard label="Time" value={time} />
        </div>
        <div>
          <span className="text-sm text-gray-500">Nota adicional</span>
          <p className="text-sm text-gray-500">{note || "N/A"}</p>
        </div>
      </CardContent>
    </Card>
  );
};

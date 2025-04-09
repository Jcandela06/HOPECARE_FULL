import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "../ui/card";
import { LabTest, Patient, Services } from "@prisma/client";
import { format } from "date-fns";

interface DataProps extends LabTest {
  patient: Patient;
  services: Services;
}
export const RecentTests = ({ data }: { data: DataProps[] }) => {
  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Solicitudes de pruebas recientes</h2>

        <Table>
          <TableHeader>
            <TableRow className="lg:uppercase">
              <TableHead>No.</TableHead>
              <TableHead>Nombre del paciente</TableHead>
              <TableHead>Prueba</TableHead>
              <TableHead>Fecha/Hora</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((test) => (
              <TableRow key={test.id} className="hover:bg-muted/50">
                <TableCell># {test?.id}</TableCell>
                <TableCell>
                  {test.patient?.first_name + " " + test.patient?.last_name}
                </TableCell>
                <TableCell>{test?.services?.name}</TableCell>
                <TableCell>
                  {format(test?.created_at, "yyyy-MM-dd")}{" "}
                  {format(test?.created_at, "h:mm a")}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      test.status === "COMPLETED"
                        ? "bg-green-100 dark:bg-green-600/15 text-green-800"
                        : test.status === "PENDING"
                        ? "bg-yellow-100 dark:bg-yellow-600/15 text-yellow-800"
                        : "bg-red-100 dark:bg-red-600/15 text-red-800"
                    }`}
                  >
                    {test.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

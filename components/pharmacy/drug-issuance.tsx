import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumberToCurrency } from "@/utils";
import {
  Drug,
  DrugIssuance,
  IssuedDrug,
  Patient,
  Prescription,
} from "@prisma/client";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ViewAction } from "../action-options";
import { IssuedDrugs } from "../dialogs/issued-drugs";

interface Drugs extends IssuedDrug {
  drug: Drug;
}
interface Props extends DrugIssuance {
  patient: Patient;
  prescription: Prescription;
  drugs: Drugs[];
  pharmacist: { id: string; name: string };
}
export const DrugIssuanceTable = async ({
  data,
  isShow = false,
}: {
  data: Props[];
  isShow?: boolean;
}) => {
  return (
    <div>
      {isShow && (
        <div className="flex justify-end items-center mb-6 gap-3">
          <ViewAction label="View All" href="/pharmacy/drug-issuance" />
          <Link href={`/pharmacy/prescriptions`}>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nueva emisión
            </Button>
          </Link>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="lg:uppercase">
              <TableHead>Fecha</TableHead>
              <TableHead>Paciente</TableHead>
              <TableHead>Prescripción ID</TableHead>
              <TableHead>Drogas</TableHead>
              <TableHead>Costo total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Expedido por</TableHead>
              <TableHead>Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((el, index) => (
              <TableRow key={el.id}>
                <TableCell>
                  {format(el?.issuedAt, "yyyy-MM-dd h:m a")}0
                </TableCell>
                <TableCell>
                  {el?.patient?.first_name + " " + el?.patient?.last_name}
                </TableCell>
                <TableCell>{el?.prescriptionId}</TableCell>
                <TableCell>{el?.drugs?.length} Elementos</TableCell>
                <TableCell>{formatNumberToCurrency(el?.totalCost)}</TableCell>
                <TableCell>
                  <Badge>{el?.prescription?.status}</Badge>
                </TableCell>
                <TableCell>{el?.pharmacist.name}</TableCell>
                <TableCell>
                  <IssuedDrugs data={el?.drugs} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

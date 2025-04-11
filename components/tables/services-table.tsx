import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumberToCurrency } from "@/utils";
import { checkRole } from "@/utils/roles";
import { Services } from "@prisma/client";
import { Edit2 } from "lucide-react";
import ActionDialog from "../dialogs/action-dialog";
import { Button } from "../ui/button";
import { AddServiceDialog } from "../labtest/add-services";

export const ServiceTable = async ({ data }: { data: Services[] }) => {
  const isAdmin = await checkRole("ADMIN");

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Nombre del servicio</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>TAT (horas)</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((el) => (
          <TableRow key={el?.id}>
            <TableCell># {el?.id}</TableCell>
            <TableCell>{el?.name}</TableCell>
            <TableCell>{el?.category}</TableCell>
            <TableCell>{formatNumberToCurrency(Number(el?.price))}</TableCell>
            <TableCell>{el?.tat}</TableCell>
            <TableCell>Activo</TableCell>
            <TableCell className="text-right space-x-2">
              <AddServiceDialog
                data={{
                  name: el?.name,
                  description: el?.description!,
                  tat: el?.tat?.toString()!,
                  category: el?.category,
                  price: String(el?.price),
                  department: el?.department,
                }}
                id={el?.id}
                type="update"
              />

              {isAdmin && (
                <ActionDialog
                  type="delete"
                  id={el?.id.toString()}
                  deleteType="service"
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

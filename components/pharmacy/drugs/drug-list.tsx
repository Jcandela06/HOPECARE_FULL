import ActionDialog from "@/components/dialogs/action-dialog";
import { EditDrugForm } from "@/components/dialogs/edit-drug";
import { SearchByCategory } from "@/components/search-by-category";
import SearchInput from "@/components/search-input";
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
import { Drug } from "@prisma/client";
import { format } from "date-fns";
import { Edit, Trash2 } from "lucide-react";

export function DrugList({ data }: { data: Drug[] }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <SearchInput />
        <SearchByCategory />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="lg:uppercase">
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Existencias</TableHead>
              <TableHead>Precio/Unidad</TableHead>
              <TableHead>Fecha de caducidad</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Comportamiento</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((el) => (
              <TableRow key={el?.id}>
                <TableCell>{el?.name}</TableCell>
                <TableCell>{el?.category}</TableCell>
                <TableCell>{el?.quantity}</TableCell>
                <TableCell>${el?.pricePerUnit?.toFixed(2)}</TableCell>
                <TableCell>{format(el?.expiryDate, "yyyy-MM-dd")}</TableCell>
                <TableCell>
                  <Badge
                    variant={el?.quantity > 0 ? "secondary" : "destructive"}
                  >
                    {el?.quantity > 0 ? "In" : "Out"} Existencias
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <EditDrugForm data={el as any} />
                    <ActionDialog type="delete" id={el.id} deleteType="drug" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/lib/db";
import { format } from "date-fns";

export const StockHistory = async () => {
  const data = await db.stockUpdate.findMany({
    take: 10,
    orderBy: { updatedAt: "desc" },
    include: {
      drug: { select: { name: true } },
      updatedBy: { select: { name: true } },
    },
  });

  if (!data) return null;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="lg:uppercase">
            <TableHead>Fecha</TableHead>
            <TableHead>Droga</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Cantidad anterior</TableHead>
            <TableHead>Nueva cantidad</TableHead>
            <TableHead>Actualizado por</TableHead>
            <TableHead>Notas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((el) => (
            <TableRow key={el?.id}>
              <TableCell>{format(el?.updatedAt, "yyyy-MM-dd h:m a")}</TableCell>
              <TableCell>{el?.drug?.name}</TableCell>
              <TableCell>
                <Badge
                  variant={el?.type === "RESTOCK" ? "secondary" : "default"}
                >
                  {el?.type}
                </Badge>
              </TableCell>
              <TableCell>{el?.previousQuantity}</TableCell>
              <TableCell>{el?.newQuantity}</TableCell>
              <TableCell>{el?.updatedBy?.name}</TableCell>
              <TableCell>{el?.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

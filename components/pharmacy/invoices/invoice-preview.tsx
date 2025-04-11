"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInvoiceStore } from "@/hooks/use-invoice-store";

export function InvoicePreview() {
  const { selectedDrugs } = useInvoiceStore();
  const total = selectedDrugs.reduce(
    (acc, drug) => acc + drug.quantity * drug.pricePerUnit,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Vista previa de la factura</h3>
          <p className="text-sm text-muted-foreground">
          Revisar antes de crear
          </p>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="lg:uppercase">
              <TableHead>Nombre del medicamento</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Precio/Unidad</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {selectedDrugs?.map((drug) => (
              <TableRow key={drug.drugId}>
                <TableCell>{drug.name}</TableCell>
                <TableCell>{drug.quantity}</TableCell>
                <TableCell>${drug.pricePerUnit.toFixed(2)}</TableCell>
                <TableCell>
                  ${(drug?.quantity * drug.pricePerUnit).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} className="text-right font-semibold">
                Total:
              </TableCell>
              <TableCell className="font-semibold">
                ${total.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

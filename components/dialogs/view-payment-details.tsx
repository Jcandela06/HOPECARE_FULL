import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { string } from "zod";
import { PaymentDetails } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatNumberToCurrency } from "@/utils";
import { format } from "date-fns";

export const ViewPaymentDetails = ({
  label,
  data,
}: {
  label: string;
  data: PaymentDetails[];
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild disabled={data?.length === 0}>
        <button>{label}</button>
      </DialogTrigger>
      <DialogContent className="w-full md:max-w-3xl">
        <DialogTitle>Detalles de pago</DialogTitle>

        <div>
          <Table>
            <TableHeader>
              <TableRow className="lg:uppercase">
                <TableHead>id</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((el) => (
                <TableRow key={el.id}>
                  <TableCell>{formatNumberToCurrency(el.amount)}</TableCell>
                  <TableCell>{el?.method}</TableCell>
                  <TableCell>
                    {format(el.created_at, "yyyy-MM-dd h:m a")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

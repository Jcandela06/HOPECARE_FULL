import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Drug, IssuedDrug } from "@prisma/client";

import {
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { format } from "date-fns";

interface Props extends IssuedDrug {
  drug: Drug;
}

export const IssuedDrugs = ({ data }: { data: Props[] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="view-btn">Vista</button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>MEDICAMENTOS EMITIDOS</DialogTitle>
        </DialogHeader>

        <div>
          <Table>
            <TableHeader>
              <TableRow className="lg:uppercase">
                <TableHead>Medicamento Id</TableHead>
                <TableHead>Nombre del medicamento</TableHead>
                <TableHead>Cantidad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((el, index) => (
                <TableRow key={el.id}>
                  <TableCell>{el?.drugId}</TableCell>
                  <TableCell>{el?.drug.name}</TableCell>
                  <TableCell>{el?.quantity} Elementos</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

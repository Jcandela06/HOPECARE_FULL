"use client";

import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

import { leaveAction } from "@/app/actions/leaves";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Leave } from "@prisma/client";

interface LeaveListProps extends Leave {
  user: { id: string; name: string };
}
export const LeaveList = ({ data }: { data: LeaveListProps[] }) => {
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [modifiedDates, setModifiedDates] = useState<DateRange | undefined>();
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isModifyDatesDialogOpen, setIsModifyDatesDialogOpen] = useState(false);

  const handleApprove = async (id: number) => {
    const res = await leaveAction({
      id,
      status: "APPROVED",
    });

    if (res.success) {
      toast.success("Solicitud de licencia aprobada exitosamente");
    }
  };

  const handleReject = async (id: number) => {
    if (!rejectionReason.trim()) {
      toast.error("Proporcione un motivo del rechazo.");
      return;
    }

    const res = await leaveAction({
      id,
      status: "REJECTED",
      rejectionReason,
    });

    if (res.success) {
      toast.success("Solicitud de licencia rechazada exitosamente");
      setIsRejectDialogOpen(false);
      setRejectionReason("");
    }
  };

  const handleModifyDates = async (id: number) => {
    if (!modifiedDates?.from || !modifiedDates?.to) {
      toast.error("Por favor seleccione tanto la fecha de inicio como la de finalización");
      return;
    }

    const res = await leaveAction({
      id,
      status: "APPROVED",
      modifiedStartDate: new Date(modifiedDates.from),
      modifiedEndDate: new Date(modifiedDates.to),
    });

    if (res.success) {
      toast.success("Fechas de salida modificadas y aprobadas exitosamente");
      setIsModifyDatesDialogOpen(false);
      setModifiedDates(undefined);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return (
      <Badge variant="outline" className={variants[status.toLowerCase()]}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de solicitudes de licencia</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empleado</TableHead>
                <TableHead>Fecha de inicio</TableHead>
                <TableHead>Fecha de finalización</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Razón</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Comportamiento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((request) => (
                <TableRow key={request?.id}>
                  <TableCell>{request?.user?.name}</TableCell>
                  <TableCell>
                    {format(request?.startDate, "yyyy-MM-dd")}
                  </TableCell>
                  <TableCell>
                    {format(request?.endDate, "yyyy-MM-dd")}
                  </TableCell>
                  <TableCell>{request?.type}</TableCell>
                  <TableCell>{request?.reason}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>
                    {request.status === "PENDING" && (
                      <div className="flex space-x-2">
                        <Button
                          //   variant="outline"
                          size="sm"
                          onClick={() => handleApprove(request.id)}
                          className="bg-emerald-100 text-emerald-700"
                        >
                          Aprobar
                        </Button>
                        <Dialog
                          open={isRejectDialogOpen}
                          onOpenChange={setIsRejectDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => setSelectedLeave(request)}
                            >
                              Rechazar
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Rechazar solicitud de permiso</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <Textarea
                                placeholder="Enter reason for rejection"
                                value={rejectionReason}
                                onChange={(e) =>
                                  setRejectionReason(e.target.value)
                                }
                              />
                            </div>
                            <DialogFooter>
                              <Button
                                variant="destructive"
                                onClick={() => handleReject(selectedLeave?.id)}
                              >
                                Confirmar rechazo
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Dialog
                          open={isModifyDatesDialogOpen}
                          onOpenChange={setIsModifyDatesDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedLeave(request)}
                            >
                              Modificar fechas
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Modificar fechas de licencia</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <Calendar
                                mode="range"
                                selected={modifiedDates}
                                onSelect={setModifiedDates}
                                className="rounded-md border "
                                disabled={(date) => date < new Date()}
                              />
                            </div>
                            <DialogFooter>
                              <Button
                                onClick={() =>
                                  handleModifyDates(selectedLeave?.id)
                                }
                              >
                                Confirmar cambios
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

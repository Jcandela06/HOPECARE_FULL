"use client";

import { appointmentAction } from "@/app/actions/appointment";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";

interface ActionsProps {
  type: "approve" | "cancel";
  id: string | number;
  disabled: boolean;
}
export const AppointmentActionDialog = ({
  type,
  id,
  disabled = false,
}: ActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState("");
  const router = useRouter();

  const handleAction = async () => {
    if (type === "cancel" && !reason) {
      toast.error("Proporcione un motivo para la cancelación.");
      return;
    }

    try {
      setIsLoading(true);
      const newReason =
        reason ||
        `Appointment has ben ${
          type === "approve" ? "scheduled" : "cancelled"
        } on ${new Date()}`;

      const resp = await appointmentAction(
        id,
        type === "approve" ? "SCHEDULED" : "CANCELLED",
        newReason
      );

      if (resp.success) {
        toast.success(resp.msg);
        setReason("");
        router.refresh();
      } else if (resp.error) {
        toast.error(resp.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Algo salió mal. Inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild disabled={!disabled}>
        {type === "approve" ? (
          <Button size="sm" variant="ghost" className="w-full justify-start">
            <Check size={16} /> Aprobar
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="w-full flex items-center justify-start gap-2 rounded-full text-red-500 disabled:cursor-not-allowed bg-red-600/10"
          >
            <MdCancel size={16} /> Cancelar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="">
        <div className="flex flex-col items-center justify-center py-6">
          <DialogTitle>
            {type === "approve" ? (
              <div className="bg-emerald-200 p-4 rounded-full mb-2">
                <GiConfirmed size={50} className="text-emerald-500" />
              </div>
            ) : (
              <div className="bg-red-200 p-4 rounded-full mb-2">
                <MdCancel size={50} className="text-red-500" />
              </div>
            )}
          </DialogTitle>
          <span className="text-xl text-black">
            Cita
            {type === "approve" ? " Confirmation" : " Cancellation"}
          </span>
          <p className="text-sm text-center text-gray-500">
            {type === "approve"
              ? "Estás a punto de confirmar esta cita. Sí para aprobarla o No para cancelarla."
              : "¿Estás seguro de que deseas cancelar esta cita?"}
          </p>

          {type == "cancel" && (
            <Textarea
              disabled={isLoading}
              className="mt-4"
              placeholder="Motivo de cancelación...."
              onChange={(e) => setReason(e.target.value)}
            ></Textarea>
          )}

          <div className="flex justify-center mt-6 items-center gap-x-4">
            <Button
              disabled={isLoading}
              onClick={() => handleAction()}
              variant="outline"
              className={cn(
                "px-4 py-2 text-sm font-medium text-white hover:text-white hover:underline",
                type === "approve"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-destructive hover:bg-destructive"
              )}
            >
              Si, {type === "approve" ? "Approve" : "Delete"}
            </Button>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="px-4 py-2 text-sm underline text-gray-500"
              >
                No
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

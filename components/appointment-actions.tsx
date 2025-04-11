import { checkRole } from "@/utils/roles";
import { auth } from "@clerk/nextjs/server";
import { PopoverClose } from "@radix-ui/react-popover";
import { EllipsisVertical, User } from "lucide-react";
import Link from "next/link";

import { AppointmentActionDialog } from "./dialogs/appintment-action-dialog";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface ActionsProps {
  userId: string;
  status: string;
  patientId: string;
  doctorId: string;
  appointmentId: number;
}
export const AppointmentActionOptions = async ({
  userId,
  patientId,
  doctorId,
  status,
  appointmentId,
}: ActionsProps) => {
  const user = await auth();
  const isAdmin = await checkRole("ADMIN");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center justify-center rounded-full p-0 md:p-1 border-none md:border"
        >
          <EllipsisVertical size={16} className="text-sm text-gray-500" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-56 p-3">
        <div className="space-y-3 flex flex-col items-start">
          <span className="text-gray-400 text-xs">Realizar acciones</span>

          <PopoverClose asChild>
            <Link
              href={`appointments/${appointmentId}`}
              className="flex flex-row items-center text-xs gap-1"
            >
              <User size={16} /> Ver todos los detalles
            </Link>
          </PopoverClose>

          {status !== "SCHEDULED" && (
            <AppointmentActionDialog
              type="approve"
              id={appointmentId}
              disabled={isAdmin || user.userId === doctorId}
            />
          )}
          <AppointmentActionDialog
            type="cancel"
            id={appointmentId}
            disabled={
              (status === "PENDING" || status === "SCHEDULED") &&
              (isAdmin ||
                user.userId === doctorId ||
                user?.userId === patientId)
            }
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

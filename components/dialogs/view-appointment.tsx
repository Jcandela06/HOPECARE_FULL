import { auth } from "@clerk/nextjs/server";
import { Calendar, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { calculateAge, formatDate, formatDateTime } from "@/utils";
import { checkRole } from "@/utils/roles";
import { getAppointmentById } from "@/utils/services/appointment";

import { AppointmentAction } from "../appointment-action";
import { ProfileImage } from "../profile-image";
import { AppointmentStatusIndicator } from "../status";

export const ViewAppointment = async ({ id }: { id: string | undefined }) => {
  const { data } = await getAppointmentById(Number(id)!);
  const { userId } = await auth();

  if (!data) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center justify-center border-none md:border rounded-full md:bg-blue-600/10 hover:underline text-blue-600  px-1.5 py-1 text-xs md:text-sm"
        >
          Vista
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[425px] max-h-[95%] md:max-w-2xl 2xl:max-w-3xl p-8 overflow-y-auto">
        <>
          <DialogHeader className="text-left">
            <DialogTitle>Cita del paciente</DialogTitle>
            <DialogDescription>
              Esta cita fue reservada el{" "}
              {formatDateTime(data?.created_at.toString())}
            </DialogDescription>
          </DialogHeader>
          {data.status === "CANCELLED" && (
            <div className="bg-yellow-100 p-4 mt-4 rounded-md">
              <span className="font-semibold text-sm">
                Esta cita ha sido cancelada
              </span>
              <p className="text-sm">
                <strong>Razón:</strong> {data?.reason}
              </p>
            </div>
          )}
          <div className="grid gap-4 py-4">
            {/* PROFILE */}
            <p className="w-fit bg-blue-100 dark:bg-blue-600/10 text-blue-600 py-1 px-2 rounded text-xs md:text-sm">
              Información de la persona
            </p>
            <div className="flex flex-col md:flex-row gap-8 mb-16">
              <div className="flex gap-3 w-full md:w-1/2">
                <ProfileImage
                  url={data?.patient?.img!}
                  name={
                    data?.patient?.first_name + " " + data?.patient?.last_name
                  }
                  className="size-20"
                  textClassName="text-2xl"
                />
                <div className="space-y-0.5">
                  <h2 className="text-lg  md:text-xl font-medium uppercase">
                    {data?.patient?.first_name + " " + data?.patient?.last_name}
                  </h2>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Calendar size={20} className="text-gray-500" />
                    {calculateAge(data?.patient?.date_of_birth)}
                  </p>
                  <span className="flex items-center text-sm gap-2">
                    <Phone size={16} className="text-gray-500" />{" "}
                    {data?.patient?.phone}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-500">Dirección</span>
                <p className="text-gray-600 capitalize">
                  {data?.patient?.address}
                </p>
              </div>
            </div>

            {/* APPOINTMENT */}
            <p className="w-fit bg-blue-100 text-blue-600 dark:bg-blue-600/10 py-1 px-2 rounded text-xs md:text-sm">
              Información de la cita
            </p>
            <div className="grid grid-cols-3 gap-10">
              <div>
                <span className="text-sm text-gray-500">Fecha</span>
                <p>{formatDate(data?.appointment_date)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Hora</span>
                <p>{data?.time}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Estado</span>
                <AppointmentStatusIndicator status={data?.status} />
              </div>
            </div>

            {data?.note && (
              <div>
                <span className="text-sm text-gray-500">Nota del paciente</span>
                <p>{data?.note}</p>
              </div>
            )}

            <p className="w-fit bg-blue-100 text-blue-600 dark:bg-blue-600/10 py-1 px-2 rounded text-xs md:text-sm mt-16">
            Información del médico
            </p>
            <div className="w-full flex flex-col md:flex-row gap-8 mb-8">
              <div className="flex gap-3">
                <ProfileImage
                  url={data?.doctor?.img!}
                  name={data?.doctor?.name}
                  className="xl:size-20"
                  textClassName="xl:text-2xl"
                />
                <div className="">
                  <h2 className="text-lg uppercase font-medium">
                    {data?.doctor?.name}
                  </h2>
                  <p className="flex items-center gap-2 text-gray-600 capitalize">
                    {data?.doctor?.specialization}
                  </p>
                </div>
              </div>
            </div>

            {((await checkRole("ADMIN")) || data?.doctor_id === userId) && (
              <>
                <p className="w-fit bg-blue-100 dark:bg-blue-600/10 text-blue-600 py-1 px-2 rounded text-xs md:text-sm mt-4">
                  Realizar acción
                </p>
                <AppointmentAction id={data.id} status={data?.status} />
              </>
            )}
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
};

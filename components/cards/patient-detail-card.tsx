import { Calendar, Clipboard, Home, Info, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { calculateAge, formatPhoneNumber } from "@/utils";
import { Patient } from "@prisma/client";

interface PatientData extends Patient {
  primaryPhysician: { name: string; specialization: string };
}
export function PatientDetailCard({ data }: { data: PatientData }) {
  return (
    <Card className="shadow-none rounded-xl">
      <CardHeader className="flex items-start gap-4 p-4 md:p-6">
        <div className="relative w-20 h-20 xl:w-24 xl:h-24 rounded-full overflow-hidden">
          <Image
            src={data?.img || "/profile.png"}
            alt="Patient"
            fill
            objectFit="cover"
          />
        </div>
        <div>
          <h2 className="text-lg xl:text-2xl font-bold">
            {data?.first_name} {data?.last_name}
          </h2>
          <p className="text-sm text-gray-500">
            {data?.gender} - {calculateAge(data?.date_of_birth)}
          </p>
          <p className="text-xs text-gray-500">Paciente ID: {data?.id}</p>
        </div>
        <div className="flex gap-2 mt-4">
          <Link href={`tel:${data?.phone}`}>
            <Button
              size="sm"
              variant="outline"
              className="flex justify-center bg-blue-600/10 text-blue-600 gap-x-3 px-2 md:px-4"
            >
              <Phone size={18} />
              Llamar
            </Button>
          </Link>
          <Link href={`mailto:${data?.email}`}>
            <Button
              size="sm"
              variant="outline"
              className="flex justify-center bg-blue-600/10 text-blue-600 gap-x-3 px-2 md:px-4"
            >
              <Mail size={18} />
              Email
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="mt-4 space-y-4 p-4 md:p-6">
        <div className="flex items-start gap-3">
          <Calendar size={22} className="hidden md:flex text-gray-500" />
          <div>
            <p className="text-xs md:text-sm text-gray-500">Fecha de nacimiento</p>
            <p className="text-sm md:text-base font-medium">
              {data?.date_of_birth?.getDay()} /{" "}
              {data?.date_of_birth?.getMonth() + 1} /{" "}
              {data?.date_of_birth?.getFullYear()}{" "}
              <span className="font-light text-xs text-gray-600">
                (dd/mm/yyy)
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Home size={22} className="hidden md:flex text-gray-500" />
          <div>
            <p className="text-xs md:text-sm text-gray-500">Dirección</p>
            <p className="text-sm md:text-base font-medium">{data?.address}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Mail size={22} className="hidden md:flex text-gray-500" />
          <div>
            <p className="text-xs md:text-sm text-gray-500">Email</p>
            <p className="text-sm md:text-base font-medium lowercase">
              {data?.email}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Phone size={22} className="hidden md:flex text-gray-500" />
          <div>
            <p className="text-xs md:text-sm text-gray-500">Móvil</p>
            <p className="text-sm md:text-base font-medium">
              {formatPhoneNumber(data?.phone)}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clipboard size={22} className="hidden md:flex text-gray-500" />
          <div>
            <p className="text-xs md:text-sm text-gray-500">Próxima visita</p>
            <p className="text-sm md:text-base font-medium">
              N/A
              <span className="text-xs text-blue-600 ml-2">(Estándar)</span>
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Info size={22} className="hidden md:flex text-gray-500" />
          <div>
            <p className="text-xs md:text-sm text-gray-500">
            Médico primario
            </p>
            <p className="text-sm md:text-base font-medium">
              {data?.primaryPhysician?.name || "N/A"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-xs md:text-sm text-gray-500">
            Condiciones activas
            </p>
            <p className="text-sm md:text-base font-medium">
              {data?.medical_conditions || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-500">Alergias</p>
            <p className="text-sm md:text-base font-medium capitalize">
              {data?.allergies || "N/A"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

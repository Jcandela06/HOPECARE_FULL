import { auth } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import Link from "next/link";

import db from "@/lib/db";
import { Diagnosis, MedicalRecords } from "@prisma/client";

import { MedicalHistoryCard } from "./cards/medical-history-card";
import { NoDataFound } from "./no-data-found";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface DataProps {
  id: string | number;
  patientId: string;
  medicalId?: string;
  doctor_id: string | number;
}

interface Doctor {
  id: string | number;
  name: string;
  specialization: string;
}

interface ExtendedDiagnosis extends Diagnosis {
  doctor: Doctor;
}

interface MedicalPros extends MedicalRecords {
  diagnosis: ExtendedDiagnosis[];
}

export const DiagnosisContainer = async ({
  id,
  patientId,
  doctor_id,
}: DataProps) => {
  const { userId } = await auth();
  const data: MedicalPros | null = await db.medicalRecords.findFirst({
    where: {
      appointment_id: Number(id),
    },
    include: {
      diagnosis: {
        include: {
          doctor: { select: { name: true, id: true, specialization: true } },
          prescriptions: {
            select: {
              id: true,
              status: true,
              drugs: {
                include: { drug: { select: { name: true, id: true } } },
              },
            },
          },
        },
        orderBy: { created_at: "desc" },
      },
    },
    orderBy: { created_at: "desc" },
  });

  const diagnosis = data?.diagnosis ? data?.diagnosis : [];

  return (
    <div className="">
      {diagnosis?.length === 0 || !diagnosis ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <NoDataFound note="No Diagnosis found for this appointment" />
          {data?.id && doctor_id === userId && (
            <Link href={`/diagnosis/${data?.id}`}>
              <Button
                size="lg"
                className="text-white text-sm md:text-base mt-4"
              >
                <Plus size={22} className="text-white" />
                Agregar diagnóstico
                <span className="ml-2 text-xs md:text-sm font-medium text-gray-300">
                  (New)
                </span>
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <section className="space-y-6">
          <Card className="rounded-xl shadow-none">
            <CardHeader className="flex flex-row items-center justify-between px-4 md:px-6">
              <div className="w-full flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-gray-600">
                  Historial médico
                  </CardTitle>
                  <CardDescription>
                    Hay <strong>{diagnosis?.length}</strong> registro(s) médico(s) asociados con esta cita
                  </CardDescription>
                </div>

                {doctor_id === userId && (
                  <Link href={`/diagnosis/${data?.id}`}>
                    <Button size="lg" className="text-white mt-4">
                      <Plus size={22} className="text-white" />
                      Agregar diagnóstico
                      <span className="ml-2 text-sm font-medium text-gray-300">
                        (Nuevo)
                      </span>
                    </Button>
                  </Link>
                )}
              </div>
            </CardHeader>
          </Card>
          {diagnosis?.map((el, id) => (
            <div key={id}>
              <MedicalHistoryCard el={el as any} index={id} />
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

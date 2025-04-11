import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

import { MedicalHistoryContainer } from "@/components/medical-history-container";
import PatientRatingContainer from "@/components/patient-rating-container";
import { Payments } from "@/components/payments";
import { ProfileImage } from "@/components/profile-image";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/utils";
import { isAuthenticatedUser } from "@/utils/is-authenticated";
import { getPatientFullDataById } from "@/utils/services/patient";
import { CldImage } from 'next-cloudinary';

interface ParamsProps {
  params: Promise<{ patientId: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const PatientDetail = async (props: ParamsProps) => {
  await isAuthenticatedUser();

  const searchParams = await props.searchParams;
  const params = await props.params;
  let id: string = params.patientId;
  const cat = (searchParams?.cat || "medical-history") as String;

  const patientId = params.patientId;

  if (patientId === "self") {
    const { userId } = await auth();
    id = userId!;
  } else id = patientId;
  const { data } = await getPatientFullDataById(id);

  const SmallCard = ({ label, value }: { label: string; value: string }) => (
    <div className="w-full md:w-1/3">
      <span className="text-sm text-gray-500">{label}</span>
      <p className="text-sm md:text-base capitalize">{value}</p>
    </div>
  );

  return (
    <Card className="bg-background h-full rounded-xl py-6 px-0 md:px-3 2xl:p-6 flex flex-col lg:flex-row gap-6 border-none md:border">
      <div className="w-full xl:w-3/4">
        {/* DETAILS */}
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <Card className="rounded-xl p-4 w-full lg:w-[30%] flex flex-col items-center">
            <ProfileImage
              url={data?.img!}
              name={data?.first_name + " " + data?.last_name}
              className="h-20 w-20 md:flex"
              textClassName="text-3xl"
            />
            <h1 className="font-semibold text-2xl mt-2">
              {data?.first_name + " " + data?.last_name}
            </h1>
            <span className="text-sm text-gray-500">{data?.email}</span>

            <div className="w-full flex items-center justify-center gap-2 mt-4">
              <div className="w-1/2 space-y-1 text-center">
                <p className="text-xl font-medium">{data?.totalAppointments}</p>
                <span className="text-xs text-gray-500">Citas</span>
              </div>
            </div>
          </Card>

          <Card className="rounded-xl p-4 md:p-6 w-full lg:w-[70%] space-y-6">
            <div className="flex flex-col md:flex-row md:flex-wrap md:items-center xl:justify-between gap-y-4 md:gap-x-0">
              <SmallCard label="Gender" value={data?.gender?.toLowerCase()!} />
              <SmallCard
                label="Fecha de nacimiento"
                value={formatDate(data?.date_of_birth!)}
              />
              <SmallCard label="Número de teléfono" value={data?.phone!} />
            </div>

            <div className="flex flex-col md:flex-row md:flex-wrap md:items-center xl:justify-between gap-y-4 md:gap-x-0">
              <SmallCard label="Estado civil" value={data?.marital_status!} />
              <SmallCard label="Grupo sanguíneo" value={data?.blood_group!} />
              <SmallCard label="DIRECCIÓN" value={data?.address!} />
            </div>

            <div className="flex flex-col md:flex-row md:flex-wrap md:items-center xl:justify-between gap-y-4 md:gap-x-0">
              <SmallCard
                label="Persona de contacto"
                value={data?.emergency_contact_name!}
              />
              <SmallCard
                label="Contacto de emergencia"
                value={data?.emergency_contact_number!}
              />
              <SmallCard
                label="Última visita"
                value={
                  data?.lastVisit
                    ? formatDate(data?.lastVisit!)
                    : "Sin última visita"
                }
              />
            </div>
          </Card>
        </div>

        <div className="mt-10">
          {cat === "medical-history" && (
            <MedicalHistoryContainer patientId={id} />
          )}

          {cat === "payments" && <Payments patientId={id!} />}
        </div>
      </div>

      <div className="w-full xl:w-1/3 pb-10 md:pb-0">
        <Card className="p-4 rounded-md mb-8">
          <h1 className="text-lg md:text-xl font-semibold">Enlaces rápidos</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-sm text-gray-500">
            <Link
              className="p-3 text-xs md:text-sm rounded-md bg-yellow-600/10 text-yellow-600 hover:underline"
              href={`/record/appointments?id=${id}`}
            >
              Paciente&apos; Citas
            </Link>
            <Link
              className="p-3 text-xs md:text-sm rounded-md bg-purple-600/10 text-purple-600 hover:underline"
              href="?cat=medical-history"
            >
              Historial médico
            </Link>
            <Link
              className="p-3 text-xs md:text-sm rounded-md bg-emerald-600/10 text-emerald-600 hover:underline"
              href={`?cat=payments`}
            >
              Facturas médicas
            </Link>
            <Link
              className="p-3 text-xs md:text-sm rounded-md bg-pink-600/10 text-pink-600 hover:underline"
              href={`/`}
            >
              Panel
            </Link>

            <Link
              className="p-3 text-xs md:text-sm rounded-md bg-rose-600/10 text-rose-600 hover:underline"
              href={`#`}
            >
              Prueba de laboratorio y resultado
            </Link>
            {patientId === "self" && (
              <Link
                className="p-3 text-xs md:text-sm rounded-md bg-black/10 dark:text-white"
                href={`/patient/registration`}
              >
                Editar información
              </Link>
            )}
          </div>
        </Card>

        <PatientRatingContainer id={id} />
      </div>
    </Card>
  );
};

export default PatientDetail;

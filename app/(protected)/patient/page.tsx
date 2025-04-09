import { currentUser } from "@clerk/nextjs/server";
import { Briefcase, BriefcaseBusiness, BriefcaseMedical } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AvailableDoctors } from "@/components/available-doctors";
import { StatCard } from "@/components/cards/stat-card";
import { AppointmentChart } from "@/components/charts/appointment-chart";
import { StatSummary } from "@/components/charts/stat-summary";
import PatientRatingContainer from "@/components/patient-rating-container";
import { RecentAppointments } from "@/components/tables/recent-appointment";
import { Button } from "@/components/ui/button";
import { isAuthenticatedUser } from "@/utils/is-authenticated";
import { getPatientDashboardStatistics } from "@/utils/services/patient";

const PatientPage = async () => {
  await isAuthenticatedUser();

  const user = await currentUser();
  const userId = user?.id;

  const {
    data,
    last5Records,
    appointmentCounts,
    totalAppointments,
    availableDoctors,
    monthlyData,
  } = await getPatientDashboardStatistics(userId!);

  if (user && !data) {
    redirect("/patient/registration");
  }

  if (!data) return null;

  const cardData = [
    {
      title: "Citas",
      value: totalAppointments,
      icon: Briefcase,
      className: "bg-blue-600/15",
      iconClassName: "bg-blue-600/25 text-blue-600",
      note: "Total Citas",
    },
    {
      title: "cancelada",
      value: appointmentCounts?.CANCELLED,
      icon: Briefcase,
      className: "bg-rose-600/15",
      iconClassName: "bg-rose-600/25 text-rose-600",
      note: "Citas canceladas",
    },
    {
      title: "pendiente",
      value: appointmentCounts?.PENDING! + appointmentCounts?.SCHEDULED!,
      icon: BriefcaseBusiness,
      className: "bg-yellow-600/15",
      iconClassName: "bg-yellow-600/25 text-yellow-600",
      note: "Citas pendientes",
    },
    {
      title: "terminada",
      value: appointmentCounts?.COMPLETED,
      icon: BriefcaseMedical,
      className: "bg-emerald-600/15",
      iconClassName: "bg-emerald-600/25 text-emerald-600",
      note: "Citas exitosas",
    },
  ];

  return (
    <div className="rounded-xl py-6 px-0 md:px-3 flex flex-col xl:flex-row gap-6">
      {/* LEFT */}
      <div className="w-full xl:w-[69%]">
        <div className="bg-background rounded-xl p-0 md:p-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg xl:text-2xl font-semibold">
            Bienvenido, {data?.first_name ?? user?.firstName}
            </h1>

            <div className="space-x-2 flex ">
              <Button size="sm" className="hidden md:flex">
                {new Date().getFullYear()}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="hover:underline text-xs md:text-sm"
              >
                <Link href={"/patient/self"}>Ver perfil</Link>
              </Button>
            </div>
          </div>
          <div className="w-full flex flex-wrap gap-5">
            {cardData?.map((i, id) => (
              <StatCard
                key={id}
                title={i.title}
                value={i.value!}
                icon={i.icon}
                className={i.className}
                note={i.note}
                iconClassName={i.iconClassName}
                link="#"
              />
            ))}
          </div>
        </div>

        <div className="h-[500px]">
          <AppointmentChart data={monthlyData} />
        </div>
        <div className="bg-background rounded-xl p-0 md:p-4 mt-8">
          <RecentAppointments data={last5Records as any} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-[30%] mt-5 md:mt-0">
        <div className="w-full h-[320px] md:h-[300px] mb-8">
          <StatSummary data={appointmentCounts} total={totalAppointments!} />
        </div>

        <AvailableDoctors data={availableDoctors as any} />

        <PatientRatingContainer />
      </div>
    </div>
  );
};

export default PatientPage;

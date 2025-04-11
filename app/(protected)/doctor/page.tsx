import { currentUser } from "@clerk/nextjs/server";
import { BriefcaseBusiness, BriefcaseMedical, User, Users } from "lucide-react";
import Link from "next/link";

import { AvailableDoctors } from "@/components/available-doctors";
import { StatCard } from "@/components/cards/stat-card";
import { AppointmentChart } from "@/components/charts/appointment-chart";
import { StaffChartContainer } from "@/components/charts/stat-chart-container";
import { StatSummary } from "@/components/charts/stat-summary";
import { RecentAppointments } from "@/components/tables/recent-appointment";
import { Button } from "@/components/ui/button";
import { isAuthenticatedUser } from "@/utils/is-authenticated";
import { getDoctorDashboardStatistics } from "@/utils/services/doctor";

const DoctorDashboard = async () => {
  await isAuthenticatedUser();

  const user = await currentUser();
  const data = await getDoctorDashboardStatistics();

  if (!data) {
    return null;
  }

  const {
    totalPatient,
    appointmentCounts,
    last5Records,
    totalAppointments,
    availableDoctors,
    monthlyData,
    totalNurses,
  } = data;

  const cardData = [
    {
      title: "Pacientes",
      value: totalPatient,
      icon: Users,
      className: "bg-blue-600/15",
      iconClassName: "bg-blue-600/25 text-blue-600",
      note: "Total de Pacientes",
      link: "/record/patients",
    },
    {
      title: "Enfermeras",
      value: totalNurses,
      icon: User,
      className: "bg-rose-600/15",
      iconClassName: "bg-rose-600/25 text-rose-600",
      note: "Total de Enfermeras",
      link: "",
    },
    {
      title: "Citas",
      value: totalAppointments,
      icon: BriefcaseBusiness,
      className: "bg-yellow-600/15",
      iconClassName: "bg-yellow-600/25 text-yellow-600",
      note: "Total de Citas",
      link: "/record/appointments",
    },
    {
      title: "Consulta",
      value: appointmentCounts?.COMPLETED,
      icon: BriefcaseMedical,
      className: "bg-emerald-600/15",
      iconClassName: "bg-emerald-600/25 text-emerald-600",
      note: "Total de Consultas",
      link: "/record/appointments",
    },
  ];

  return (
    <div className="rounded-xl py-6 px-3 flex flex-col xl:flex-row gap-6">
      {/* LEFT */}
      <div className="w-full xl:w-[69%]">
        <div className="bg-background rounded-xl p-4 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-lg xl:text-2xl font-semibold">
            Bienvenido, Doctor.. {user?.firstName}
            </h1>
            <div className="space-x-2">
              <Button size="sm" variant="outline" asChild>
                <Link href={`/record/doctors/${user?.id}`}>Ver perfil</Link>
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
                link={i.link}
              />
            ))}
          </div>
        </div>

        <div className="h-[500px]">
          <AppointmentChart data={monthlyData!} />
        </div>
        <div className="bg-background rounded-xl p-0 mt-8">
          <RecentAppointments data={last5Records as any} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-[30%]">
        <div className="w-full h-[450px] mb-8">
          <StatSummary data={appointmentCounts} total={totalAppointments!} />
        </div>

        <StaffChartContainer />

        <AvailableDoctors data={availableDoctors as any} />
      </div>
    </div>
  );
};

export default DoctorDashboard;

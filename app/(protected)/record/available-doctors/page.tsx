import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { availableDays } from "@/components/available-doctors";
import { BookAppointmentForm } from "@/components/dialogs/book-appointment-daialog";
import { Pagination } from "@/components/pagination";
import { ProfileImage } from "@/components/profile-image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SearchParamsProps } from "@/types";
import { getAllDoctors } from "@/utils/services/doctor";

const Page = async (props: SearchParamsProps) => {
  const { userId } = await auth();
  if (!userId) redirect("/sing-in");

  const searchParams = await props.searchParams;
  const page = (searchParams?.p || "1") as string;
  const searchQuery = (searchParams?.q || "") as string;

  const { data, totalRecord, totalPages, currentPage } = await getAllDoctors({
    page,
    limit: 12,
    search: searchQuery,
  });

  if (!data) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctores disponibles</CardTitle>
        <CardDescription>{totalRecord} doctores</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6 lg:gap-8">
          {data.map((doctor) => (
            <Card
              key={doctor.id}
              className="w-full md:w-[300px] 2xl:w-[450px]  p-4 hover:scale-105 duration-700 ease-in-out"
            >
              <div className="flex gap-2">
                <ProfileImage
                  url={doctor?.img!}
                  name={doctor?.name}
                  bgColor={doctor?.colorCode!}
                  textClassName="text-black"
                  className="size-12 md:size-16"
                />
                <div>
                  <h2 className="text-lg font-semibold">{doctor?.name}</h2>
                  <p className="text-blue-600 text-sm mf:text-base">
                    {doctor?.specialization}
                  </p>
                  <span className="text-xs md:text-sm italic text-gray-500">
                    {availableDays({ data: doctor?.working_days })}
                  </span>
                </div>
              </div>

              <span className="mt-4 text-sm">Días laborables:</span>
              <div className="space-x-2 space-y-2">
                {doctor?.working_days?.map((el) => {
                  return (
                    <p
                      key={el.id}
                      className="inline-block text-xs text-gray-600 capitalize"
                    >
                      {el?.day} : {el.start_time} - {el.close_time}
                    </p>
                  );
                })}
              </div>
              <div className="mt-4 flex justify-end items-end">
                <BookAppointmentForm {...doctor} patient_id={userId!} />
              </div>
            </Card>
          ))}
        </div>

        <Pagination
          totalRecords={totalRecord}
          currentPage={currentPage}
          totalPages={totalPages}
          limit={12}
        />
      </CardContent>
    </Card>
  );
};

export default Page;

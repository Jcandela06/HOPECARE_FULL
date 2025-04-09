import { format } from "date-fns";
import { BriefcaseBusiness } from "lucide-react";

import { ViewAction } from "@/components/action-options";
import { getStatusVariant } from "@/components/cards/medical-history-card";
import { Pagination } from "@/components/pagination";
import { SearchByPrescriptionStatus } from "@/components/search-by-category";
import SearchInput from "@/components/search-input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { SearchParamsProps } from "@/types";
import { calculateAge } from "@/utils";
import { isAuthenticatedUser } from "@/utils/is-authenticated";
import { getPrescriptions } from "@/utils/services/pharmacy";
import { DATA_LIMIT } from "@/utils/settings";

const PrescriptionPage = async (props: SearchParamsProps) => {
  await isAuthenticatedUser();

  const searchParams = await props.searchParams;
  const page = (searchParams?.p || "1") as string;
  const searchQuery = (searchParams?.q || "") as string;
  const category = (searchParams?.c || "") as string;

  const { data, totalPages, currentPage, totalRecord } = await getPrescriptions(
    {
      page: Number(page),
      search: searchQuery,
      category: category ? category : "ALL",
    }
  );

  if (!data) return null;

  return (
    <div className="container mx-auto py-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="hidden lg:flex items-center gap-1">
              <BriefcaseBusiness size={20} className="text-gray-500" />
              <p className="text-2xl font-semibold">{totalRecord}</p>
              <span className="text-gray-600 text-sm xl:text-base">
              prescripciones totales
              </span>
            </div>
            <div className="flex gap-4">
              <SearchInput />

              <SearchByPrescriptionStatus />
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="lg:uppercase">
                  <TableHead>Pres. ID</TableHead>
                  <TableHead>Nombre del paciente</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Medicamentos recetados</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Comportamiento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-gray-400"
                    >
                      No se encontraron recetas pendientes
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell>{prescription.id}</TableCell>
                      <TableCell className="uppercase flex flex-col">
                        <p>
                          {prescription.patient?.first_name +
                            " " +
                            prescription.patient?.last_name}
                        </p>
                        <span className="text-sm lowercase text-gray-600">
                          {calculateAge(prescription?.patient?.date_of_birth)}
                        </span>
                      </TableCell>
                      <TableCell className="uppercase">
                        <p> {prescription.doctor.name}</p>
                        <span className="text-sm lowercase text-gray-600">
                          {prescription.doctor.specialization}
                        </span>
                      </TableCell>
                      <TableCell>
                        {prescription.drugs.map((drug, id) => (
                          <div key={drug.id}>
                            {id + 1}. {drug.drug.name} ({drug.quantity} units)
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>
                        {format(prescription.createdAt, "yyyy-MM-dd")}
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            getStatusVariant(
                              prescription?.status.toLowerCase()
                            ),
                            "px-2 py-1 rounded-full text-white text-xs"
                          )}
                        >
                          {prescription?.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <ViewAction
                          href={`/pharmacy/prescriptions/${prescription.id}`}
                          label="Issue Drugs"
                          disabled={prescription.status === "COMPLETED"}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            <Pagination
              totalRecords={totalRecord!}
              currentPage={currentPage!}
              totalPages={totalPages!}
              limit={DATA_LIMIT}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PrescriptionPage;

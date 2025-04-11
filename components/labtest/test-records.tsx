import { format } from "date-fns";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLabTestRecords } from "@/utils/services/lab";
import { DATA_LIMIT } from "@/utils/settings";

import { Pagination } from "../pagination";
import SearchInput from "../search-input";
import { Button } from "../ui/button";
import { LabResultForm } from "./test-result-form";
import { ViewLabTest } from "./view-labtest";

export const AllLabRecords = async ({
  page,
  searchQuery,
}: {
  page: number | string;
  searchQuery: string;
}) => {
  const { data, totalPages, totalRecord, currentPage } =
    await getLabTestRecords({
      page: Number(page),
      search: searchQuery,
    });

  if (!data) return null;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold mb-4">Todos los registros de laboratorio</h2>
        <SearchInput />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="lg:uppercase">
            <TableHead>No.</TableHead>
            <TableHead>Nombre del paciente</TableHead>
            <TableHead>Prueba</TableHead>
            <TableHead>Fecha/Hora</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((test) => (
            <TableRow key={test.id} className="hover:bg-muted/50">
              <TableCell># {test?.id}</TableCell>
              <TableCell className="uppercase">
                {test?.patient?.first_name + " " + test?.patient?.last_name}
              </TableCell>
              <TableCell>{test.services?.name}</TableCell>
              <TableCell>
                {format(test?.created_at, "yyyy-MM-dd")}{" "}
                {format(test?.created_at, "h:mm a")}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    test.status === "COMPLETED"
                      ? "bg-green-100 dark:bg-green-600/15 text-green-800"
                      : test.status === "PENDING"
                      ? "bg-yellow-100 dark:bg-yellow-600/15 text-yellow-800"
                      : "bg-red-100 dark:bg-red-600/15 text-red-800"
                  }`}
                >
                  {test.status}
                </span>
              </TableCell>

              <TableCell className="flex items-center gap-0">
                <ViewLabTest data={test as any} />
                <LabResultForm
                  id={test?.id}
                  disabled={test?.status === "CANCELLED"}
                  data={test as any}
                  label={
                    test?.result || test?.status === "CANCELLED"
                      ? "Edit"
                      : "Add Result"
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4">
        {data?.length > 0 && (
          <Pagination
            totalRecords={totalRecord!}
            currentPage={currentPage!}
            totalPages={totalPages!}
            limit={DATA_LIMIT}
          />
        )}
      </div>
    </Card>
  );
};

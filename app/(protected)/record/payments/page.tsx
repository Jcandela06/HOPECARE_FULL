import { format } from "date-fns";
import { BriefcaseBusiness } from "lucide-react";

import { Pagination } from "@/components/pagination";
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
import { SearchParamsProps } from "@/types";
import { formatNumberToCurrency } from "@/utils";
import { isAuthenticatedUser } from "@/utils/is-authenticated";
import { getPaymentDetails } from "@/utils/services/account";
import { DATA_LIMIT } from "@/utils/settings";

const Page = async (props: SearchParamsProps) => {
  await isAuthenticatedUser();

  const searchParams = await props.searchParams;
  const page = (searchParams?.p || "1") as string;
  const searchQuery = (searchParams?.q || "") as string;

  const { data, totalPages, currentPage, totalRecord } =
    await getPaymentDetails({
      page: Number(page),
      search: searchQuery,
    });

  if (!data) return null;

  return (
    <Card>
      <div className="flex items-center justify-between p-4">
        <div className="hidden lg:flex items-center gap-1">
          <BriefcaseBusiness size={20} className="text-gray-500" />
          <p className="text-2xl font-semibold">{totalRecord}</p>
          <span className="text-gray-600 text-sm xl:text-base">
          pagos totales
          </span>
        </div>
        <div className="flex gap-4">
          <SearchInput />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="lg:uppercase">
              <TableHead>ID</TableHead>
              <TableHead>Fecha/Hora</TableHead>
              <TableHead>Paciente</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Modo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((el, index) => (
              <TableRow key={el.id}>
                <TableCell>{el?.id}</TableCell>
                <TableCell>
                  {format(el?.created_at, "yyyy-MM-dd h:m a")}0
                </TableCell>
                <TableCell>
                  {el?.payment?.patient?.first_name +
                    " " +
                    el?.payment?.patient?.last_name}
                </TableCell>
                <TableCell>{formatNumberToCurrency(el.amount)}</TableCell>
                <TableCell>{el?.method}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <Pagination
          totalRecords={totalRecord!}
          currentPage={currentPage!}
          totalPages={totalPages!}
          limit={DATA_LIMIT}
        />
      </div>
    </Card>
  );
};

export default Page;

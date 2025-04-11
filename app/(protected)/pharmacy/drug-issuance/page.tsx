import { BriefcaseBusiness } from "lucide-react";

import { Pagination } from "@/components/pagination";
import { DrugIssuanceTable } from "@/components/pharmacy/drug-issuance";
import SearchInput from "@/components/search-input";
import { Card } from "@/components/ui/card";
import { SearchParamsProps } from "@/types";
import { isAuthenticatedUser } from "@/utils/is-authenticated";
import { getIssuedDrugs } from "@/utils/services/pharmacy";
import { DATA_LIMIT } from "@/utils/settings";

const Page = async (props: SearchParamsProps) => {
  await isAuthenticatedUser();

  const searchParams = await props.searchParams;
  const page = (searchParams?.p || "1") as string;
  const searchQuery = (searchParams?.q || "") as string;

  const { data, totalPages, currentPage, totalRecord } = await getIssuedDrugs({
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
          registros totales
          </span>
        </div>
        <div className="flex gap-4">
          <SearchInput />
        </div>
      </div>

      <DrugIssuanceTable data={data as any} />

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

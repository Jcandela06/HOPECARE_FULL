import { Plus } from "lucide-react";
import Link from "next/link";

import { Pagination } from "@/components/pagination";
import { DrugList } from "@/components/pharmacy/drugs/drug-list";
import { Button } from "@/components/ui/button";
import { SearchParamsProps } from "@/types";
import { isAuthenticatedUser } from "@/utils/is-authenticated";
import { getDrugs } from "@/utils/services/pharmacy";
import { DATA_LIMIT } from "@/utils/settings";

const DrugsPage = async (props: SearchParamsProps) => {
  await isAuthenticatedUser();

  const searchParams = await props.searchParams;
  const page = (searchParams?.p || "1") as string;
  const searchQuery = (searchParams?.q || "") as string;
  const category = (searchParams?.c || "") as string;

  const { data, totalPages, currentPage, totalRecord } = await getDrugs({
    page: Number(page),
    search: searchQuery,
    category: category ? category : "ALL",
  });

  if (!data) return null;

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Inventario de medicamentos</h1>
          <p>
            <strong>{totalRecord}</strong> medicamentos disponibles
          </p>
        </div>
        <Link href="/pharmacy/drugs/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Agregar nuevo medicamento
          </Button>
        </Link>
      </div>

      <div>
        <DrugList data={data} />

        {data?.length > 0 && (
          <Pagination
            totalRecords={totalRecord!}
            currentPage={currentPage!}
            totalPages={totalPages!}
            limit={DATA_LIMIT}
          />
        )}
      </div>
    </div>
  );
};

export default DrugsPage;

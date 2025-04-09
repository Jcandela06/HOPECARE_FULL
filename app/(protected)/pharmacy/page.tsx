import { PharmacyDashboard } from "@/components/pharmacy/dashboard";
import { DrugIssuanceTable } from "@/components/pharmacy/drug-issuance";
import { DrugStock } from "@/components/pharmacy/drug-stock";
import { ExpiringDrugs } from "@/components/pharmacy/expiring-drugs";
import { Invoices } from "@/components/pharmacy/invoices";
import { StockHistory } from "@/components/pharmacy/stock-history";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchParamsProps } from "@/types";
import { isAuthenticatedUser } from "@/utils/is-authenticated";
import { getPharmacyDashboardStats } from "@/utils/services/pharmacy";
import {
  AlertCircle,
  Calendar,
  ClipboardList,
  FileText,
  Package,
} from "lucide-react";

const PharmacyHome = async (props: SearchParamsProps) => {
  await isAuthenticatedUser();

  const searchParams = await props.searchParams;
  const category = searchParams?.c || "ALL";
  const searchTerm = (searchParams?.q || "") as string;

  const {
    totalDrugs,
    totalLowStock,
    expiringSoonDrugs,
    totalIssuedDrugs,
    expiringDrugList,
    drugIssuance,
  } = await getPharmacyDashboardStats();

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-8">Panel</h1>

      <PharmacyDashboard
        totalDrugs={totalDrugs!}
        totalLowStock={totalLowStock!}
        expiringSoonDrugs={expiringSoonDrugs!}
        totalIssuedDrugs={totalIssuedDrugs!}
        expiringDrugList={expiringDrugList!}
      />

      <Tabs defaultValue="expirando" className="mt-8">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="expiring" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Medicamentos que caducan
          </TabsTrigger>
          <TabsTrigger value="existencias" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Stock de medicamentos
          </TabsTrigger>
          <TabsTrigger value="historial" className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Historial de acciones
          </TabsTrigger>
          <TabsTrigger value="facturas" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Facturas
          </TabsTrigger>
          <TabsTrigger value="emisión" className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4" />
            Emisión de medicamentos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="expirando">
          <ExpiringDrugs />
        </TabsContent>

        <TabsContent value="existencias">
          <DrugStock category={category} searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="historial">
          <StockHistory />
        </TabsContent>

        <TabsContent value="facturas">
          <Invoices />
        </TabsContent>

        <TabsContent value="emisión">
          <DrugIssuanceTable data={drugIssuance as any} isShow />
        </TabsContent>
      </Tabs>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 2xl:gap-10 mt-20">
        <InvoiceGeneration />
        <CsvImport />
      </div> */}
    </div>
  );
};

export default PharmacyHome;

import { CreateInvoiceForm } from "@/components/pharmacy/invoices/create-invoice-form";
import { DrugSelectionTable } from "@/components/pharmacy/invoices/drug-selection-table";
import { InvoicePreview } from "@/components/pharmacy/invoices/invoice-preview";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import db from "@/lib/db";
import { isAuthenticatedUser } from "@/utils/is-authenticated";

const CreateInvoicePage = async () => {
  await isAuthenticatedUser();

  const drugs = await db.drug.findMany({ orderBy: { name: "asc" } });

  if (!drugs) return null;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Crear factura</h1>

      <div className="grid gap-6">
        <Card className="p-6">
          <CreateInvoiceForm />
        </Card>

        <Tabs defaultValue="select">
          <TabsList>
            <TabsTrigger value="select">Selecciona Medicamento</TabsTrigger>
            <TabsTrigger value="preview">Vista previa de factura</TabsTrigger>
          </TabsList>

          <TabsContent value="select">
            <Card className="p-6">
              <DrugSelectionTable drugs={drugs} />
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card className="p-6">
              <InvoicePreview />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreateInvoicePage;

import { AddDrugForm } from "@/components/pharmacy/drugs/add-drug-form";
import { Card } from "@/components/ui/card";
import { isAuthenticatedUser } from "@/utils/is-authenticated";

const AddDrugPage = async () => {
  await isAuthenticatedUser();

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Agregar nuevo medicamento</h1>
      <Card className="p-6">
        <AddDrugForm />
      </Card>
    </div>
  );
};

export default AddDrugPage;

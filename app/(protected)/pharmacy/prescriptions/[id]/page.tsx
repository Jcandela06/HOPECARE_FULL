import { IssuanceForm } from "@/components/pharmacy/drugs/issuance-form";
import { isAuthenticatedUser } from "@/utils/is-authenticated";
import { getPrescriptionById } from "@/utils/services/pharmacy";
import { auth } from "@clerk/nextjs/server";

const IssueDrugsPage = async (props: { params: Promise<{ id: string }> }) => {
  await isAuthenticatedUser();

  const params = await props.params;
  const { userId } = await auth();

  const { data } = await getPrescriptionById(params?.id);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Emisión de Medicamentos</h1>
      <IssuanceForm prescription={data as any} />
    </div>
  );
};

export default IssueDrugsPage;

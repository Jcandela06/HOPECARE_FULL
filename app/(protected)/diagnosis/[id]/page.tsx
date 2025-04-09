import { auth } from "@clerk/nextjs/server";

import { DiagnosisForm } from "@/components/forms/diagnosis-form";
import { Card } from "@/components/ui/card";
import db from "@/lib/db";
import { isAuthenticatedUser } from "@/utils/is-authenticated";

const CreateDiagnosisPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  await isAuthenticatedUser();

  const { id } = await props.params;
  const { userId } = await auth();

  const data = await db.medicalRecords.findUnique({
    where: { id: Number(id) },
    include: {
      patient: { select: { first_name: true, last_name: true, id: true } },
    },
  });

  const drugs = await db.drug.findMany({
    where: {
      expiryDate: { gte: new Date() },
    },
    select: {
      name: true,
      id: true,
      quantity: true,
      expiryDate: true,
      category: true,
    },
  });

  if (!data) return null;

  return (
    <div className="container mx-auto py-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Crear diagnóstico</h1>
        <p className="text-sm ">
        Asegúrese de que se presenten hallazgos precisos y se 
        corrijan como corresponde para garantizar que sean correctos para su aplicación 
        y que no generen errores.
        </p>
      </div>
      <Card className="p-6">
        <DiagnosisForm data={data} doctorId={userId!} drugs={drugs} />
      </Card>
    </div>
  );
};

export default CreateDiagnosisPage;

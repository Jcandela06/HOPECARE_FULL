import Link from "next/link";

import { checkRole } from "@/utils/roles";

import ReviewForm from "./dialogs/rating-review-form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const AppointmentQuickLinks = async ({
  staffId,
}: {
  staffId?: string;
}) => {
  const isPatient = await checkRole("PATIENT");

  return (
    <Card className="w-full rounded-xl shadow-none">
      <CardHeader>
        <CardTitle className="text-lg text-gray-500">Enlaces rápidos</CardTitle>
      </CardHeader>

      <CardContent className="text-xs md:text-sm font-normal flex flex-wrap gap-4 p-2 md:p-6">
        <Link
          href="?cat=charts"
          className="px-2 md:px-4 py-2 rounded-lg bg-gray-600/10 text-gray-600 dark:text-gray-400"
        >
          Gráficos
        </Link>
        <Link
          href="?cat=appointment"
          className="px-2 md:px-4 py-2 rounded-lg bg-violet-600/10 text-violet-600"
        >
          Cita
        </Link>

        <Link
          href="?cat=medical-history"
          className="px-2 md:px-4 py-2 rounded-lg bg-rose-600/10 text-rose-600"
        >
          Historial médico
        </Link>
        <Link
          href="?cat=lab-test"
          className="px-2 md:px-4 py-2 rounded-lg bg-yellow-600/10 text-yellow-600"
        >
          Pruebas de laboratorio
        </Link>
        <Link
          href="?cat=diagnosis"
          className="px-2 md:px-4 py-2 rounded-lg bg-blue-600/10 text-blue-600"
        >
          Diagnóstico
        </Link>

        <Link
          href="?cat=appointment#vital-signs"
          className="px-2 md:px-4 py-2 rounded-lg bg-green-600/10 text-green-600"
        >
          Signos vitales
        </Link>
        <Link
          href="?cat=bills"
          className="px-2 md:px-4 py-2 rounded-lg bg-sky-600/10 text-sky-600"
        >
          Facturas médicas
        </Link>
        <Link
          href="?cat=payments"
          className="px-2 md:px-4 py-2 rounded-lg bg-pink-600/10 text-pink-600"
        >
          Pagos
        </Link>

        {isPatient && <ReviewForm staffId={staffId!} />}
      </CardContent>
    </Card>
  );
};

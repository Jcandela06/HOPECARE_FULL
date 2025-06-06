import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

export const SettingsQuickLinks = () => {
  return (
    <Card className="w-full rounded-xl bg-white shadow-none">
      <CardHeader>
        <CardTitle className="text-lg text-gray-500">Enlaces rápidos</CardTitle>
      </CardHeader>

      <CardContent className="text-sm font-normal flex flex-wrap gap-4">
        <Link
          href="?cat=services"
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600"
        >
          Servicios
        </Link>
        <Link
          href="?cat=appointment"
          className="px-4 py-2 rounded-lg bg-violet-100 text-violet-600"
        >
          Métodos de pago
        </Link>

        <Link
          href="?cat=medical-history"
          className="px-4 py-2 rounded-lg bg-rose-100 text-rose-600"
        >
          Historial médico
        </Link>
      </CardContent>
    </Card>
  );
};

import React from "react";
import { Table } from "./tables/table";
import db from "@/lib/db";
import { Payment } from "@prisma/client";
import { formatDate, formatNumberToCurrency } from "@/utils";
import { ViewAction } from "./action-options";
import ActionDialog from "./dialogs/action-dialog";
import { checkRole } from "@/utils/roles";
import { Card } from "./ui/card";

interface DataProps {
  patientId: string;
}

const columns = [
  {
    header: "No",
    key: "id",
  },
  {
    header: "Fecha de la factura",
    key: "bill_date",
    className: "",
  },
  {
    header: "Fecha de pago",
    key: "pay_date",
    className: "hidden md:table-cell",
  },
  {
    header: "Total",
    key: "total",
    className: "",
  },
  {
    header: "Descuento",
    key: "discount",
    className: "hidden xl:table-cell",
  },
  {
    header: "Metodo de Pago",
    key: "payable",
    className: "hidden xl:table-cell",
  },
  {
    header: "Pagado",
    key: "paid",
    className: "hidden xl:table-cell",
  },
  {
    header: "Acciones",
    key: "action",
  },
];

export const Payments = async ({ patientId }: DataProps) => {
  const data = await db.payment.findMany({
    where: { patient_id: patientId },
  });
  const isAdmin = await checkRole("ADMIN");

  if (!data) return null;

  const renderRow = (item: Payment) => {
    return (
      <tr
        key={item.id}
        className="border-b border-gray-200 dark:border-gray-800 even:bg-blue-50  dark:even:bg-transparent text-sm hover:bg-slate-50 dark:hover:bg-gray-900"
      >
        <td className="flex items-center gap-2 md:gap-4 py-2 xl:py-4">
          #{item?.id}
        </td>

        <td className="lowercase">{formatDate(item?.bill_date)}</td>
        <td className="hidden  items-center py-2  md:table-cell">
          {formatDate(item?.payment_date)}
        </td>
        <td className="">{formatNumberToCurrency(item?.total_amount)}</td>
        <td className="hidden xl:table-cell">
          {formatNumberToCurrency(item?.discount)}
        </td>
        <td className="hidden xl:table-cell">
          {formatNumberToCurrency(item?.total_amount - item?.discount)}
        </td>
        <td className="hidden xl:table-cell">
          {formatNumberToCurrency(item?.amount_paid)}
        </td>

        <td className="">
          <div className="flex items-center">
            <ViewAction
              href={`/record/appointments/${item?.appointment_id}?cat=bills`}
            />
            {isAdmin && (
              <ActionDialog
                type="delete"
                deleteType="payment"
                id={item?.id.toString()}
              />
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <Card className="rounded-xl p-2 md:p-4 2xl:p-6">
      <div className="flex items-center justify-between">
        <div className="hidden lg:flex items-center gap-1">
          <p className="text-2xl font-semibold">{data?.length ?? 0}</p>
          <span className="text-gray-600 text-sm xl:text-base">
          registros totales
          </span>
        </div>
      </div>

      <div className="mt-6">
        <Table columns={columns} renderRow={renderRow} data={data} />
      </div>
    </Card>
  );
};

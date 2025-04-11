import db from "@/lib/db";
import { calculateDiscount, formatDate, formatNumberToCurrency } from "@/utils";
import { checkRole } from "@/utils/roles";
import { PatientBills } from "@prisma/client";
import { ReceiptText } from "lucide-react";
import ActionDialog from "./dialogs/action-dialog";
import { AddBills } from "./dialogs/add-bills";
import { GenerateFinalBills } from "./dialogs/generate-final-bill";
import { Table } from "./tables/table";
import { SelectSeparator } from "./ui/select";

const columns = [
  {
    header: "No",
    key: "no",
    className: "hidden md:table-cell",
  },
  {
    header: "Servicio",
    key: "service",
  },
  {
    header: "Fecha",
    key: "date",
    className: "",
  },
  {
    header: "Cantidad",
    key: "qnty",
    className: "hidden md:table-cell",
  },
  {
    header: "Precio unitario",
    key: "price",
    className: "hidden md:table-cell",
  },
  {
    header: "Costo total",
    key: "total",
    className: "",
  },
  {
    header: "Accion",
    key: "action",
    className: "hidden xl:table-cell",
  },
];

interface BillProps {
  id: number | string;
}

export const BillsContainer = async ({ id }: BillProps) => {
  const data = await db.payment.findFirst({
    where: {
      appointment_id: Number(id),
    },
    include: {
      bills: {
        orderBy: { service_date: "asc" },
      },
    },
  });

  const servicesData = await db.services.findMany({
    select: { name: true, id: true, price: true },
  });
  let totalBill = 0;

  const billData = data?.bills || [];

  if (billData) {
    totalBill = billData.reduce((a, b) => a + b.total_cost, 0);
  }
  const discount = data
    ? calculateDiscount({
        amount: data?.total_amount || totalBill,
        discount: data?.discount,
      })
    : null;

  if (!data) return null;

  const renderRow = (item: PatientBills) => (
    <tr key={item.id} className="table-style">
      <td className="hidden md:table-cell py-2 xl:py-6"># {item?.id}</td>

      <td className="items-center py-2">{item?.service_name}</td>

      <td className="">{formatDate(item?.service_date)}</td>

      <td className="hidden items-center py-2  md:table-cell">
        {item?.quantity}
      </td>
      <td className="hidden lg:table-cell">
        {formatNumberToCurrency(item?.unit_cost)}
      </td>
      <td>{formatNumberToCurrency(item?.total_cost)}</td>

      <td className="hidden xl:table-cell">
        <ActionDialog
          type="delete"
          id={item?.id.toString()}
          deleteType="bill"
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="bg-background rounded-xl p-2 2xl:p-4">
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="">
            <h1 className="font-semibold text-xl">Facturas de pacientes</h1>
            <div className="hidden lg:flex items-center gap-1">
              <ReceiptText size={20} className="text-gray-500" />
              <p className="text-2xl font-semibold">{billData?.length}</p>
              <span className="text-gray-600 text-sm xl:text-base">
              registros totales
              </span>
            </div>
          </div>

          {((await checkRole("ADMIN")) || (await checkRole("DOCTOR"))) && (
            <div className="flex items-center mt-5 justify-end gap-4">
              <AddBills
                id={data?.id}
                appId={id}
                servicesData={servicesData as any}
              />

              <GenerateFinalBills id={data?.id} total_bill={totalBill} />
            </div>
          )}
        </div>

        <Table columns={columns} renderRow={renderRow} data={billData!} />

        <SelectSeparator className="mt-16" />
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between md:text-center py-2 space-y-6">
          <div className="w-[120px]">
            <span className="text-gray-500">Factura total</span>
            <p className="text-xl font-semibold">
              {formatNumberToCurrency(data?.total_amount || totalBill)}
            </p>
          </div>
          <div className="w-[120px]">
            <span className="text-gray-500">Descuento</span>
            <p className="text-xl font-semibold text-yellow-600">
              {(data?.discount || 0.0).toFixed(2)}{" "}
              <span className="text-sm text-gray-600">
                {" "}
                ({discount?.discountPercentage || "0.0"}%)
              </span>
            </p>
          </div>
          <div className="w-[120px]">
            <span className="text-gray-500">Proceso</span>
            <p className="text-xl font-semibold ">
              {formatNumberToCurrency(discount?.finalAmount || 0.0)}
            </p>
          </div>
          <div className="w-[120px]">
            <span className="text-gray-500">Pagado</span>
            <p className="text-xl font-semibold text-emerald-600">
              {formatNumberToCurrency(data?.amount_paid || 0.0)}
            </p>
          </div>
          <div className="w-[120px]">
            <span className="text-gray-500">No pagado</span>
            <p className="text-xl font-semibold text-red-600">
              {formatNumberToCurrency(
                discount?.finalAmount! - data?.amount_paid! || 0.0
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

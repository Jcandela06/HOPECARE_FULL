import { auth } from "@clerk/nextjs/server";
import { ReceiptText } from "lucide-react";
import { redirect } from "next/navigation";

import { ViewAction } from "@/components/action-options";
import ActionDialog from "@/components/dialogs/action-dialog";
import { ViewPaymentDetails } from "@/components/dialogs/view-payment-details";
import { Pagination } from "@/components/pagination";
import { ProfileImage } from "@/components/profile-image";
import SearchInput from "@/components/search-input";
import { Table } from "@/components/tables/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SearchParamsProps } from "@/types";
import { formatDate, formatNumberToCurrency, formatPhoneNumber } from "@/utils";
import { checkRole, getRole } from "@/utils/roles";
import { getPaymentRecords } from "@/utils/services/bills";
import { DATA_LIMIT } from "@/utils/settings";
import { Payment, PaymentDetails } from "@prisma/client";

const columns = [
  {
    header: "RNO",
    key: "id",
  },
  {
    header: "Paciente",
    key: "info",
    className: "",
  },
  {
    header: "Contacto",
    key: "phone",
    className: "hidden md:table-cell",
  },
  {
    header: "Fecha Factura",
    key: "bill_date",
    className: "hidden md:table-cell",
  },
  {
    header: "Total",
    key: "total",
    className: "hidden xl:table-cell",
  },
  {
    header: "Descuento",
    key: "discount",
    className: "hidden xl:table-cell",
  },
  {
    header: "Pagable",
    key: "payable",
    className: "hidden xl:table-cell",
  },
  {
    header: "Pago",
    key: "paid",
    className: "hidden xl:table-cell",
  },
  {
    header: "Estado",
    key: "status",
    className: "hidden xl:table-cell",
  },
  {
    header: "Acción",
    key: "action",
  },
];

interface ExtendedPayment extends Payment {
  patient: {
    first_name: string;
    last_name: string;
    phone: string;
    gender: string;
    img: string;
  };
  payments: PaymentDetails[];
}

const BillingRecords = async (props: SearchParamsProps) => {
  const { userId } = await auth();

  if (!userId) redirect("/sing-in");

  const searchParams = await props.searchParams;
  const page = (searchParams?.p || "1") as string;
  const searchQuery = (searchParams?.q || "") as string;
  const userRole = await getRole();
  const isAdmin = await checkRole("ADMIN");

  const { data, totalRecord, totalPages, currentPage } =
    await getPaymentRecords({
      page,
      search: searchQuery,
    });

  const renderRow = (item: ExtendedPayment) => {
    const name = item?.patient?.first_name + " " + item?.patient?.last_name;

    return (
      <tr key={item?.id + name} className="table-style">
        <td className="">#{item?.id}</td>

        <td className="flex items-center gap-2 2xl:gap-4 py-2 xl:py-4">
          <ProfileImage
            url={item?.patient?.img!}
            name={name}
            className="hidden md:flex"
          />
          <div>
            <h3 className="font-medium">{name.toUpperCase()}</h3>
            <span className="text-xs capitalize hidden md:flex">
              {item?.patient?.gender.toLowerCase()}
            </span>
          </div>
        </td>

        <td className="hidden md:table-cell lowercase">
          {formatPhoneNumber(item?.patient?.phone)}
        </td>
        <td className="hidden  items-center py-2  md:table-cell">
          {formatDate(item?.bill_date)}
        </td>
        <td className="hidden xl:table-cell">
          {formatNumberToCurrency(item?.total_amount)}
        </td>
        <td className="hidden xl:table-cell text-yellow-600">
          {formatNumberToCurrency(item?.discount)}
        </td>
        <td className="hidden xl:table-cell">
          {formatNumberToCurrency(item?.total_amount - item?.discount)}
        </td>
        <td className="hidden xl:table-cell text-emerald-600">
          <ViewPaymentDetails
            label={formatNumberToCurrency(item?.amount_paid)}
            data={item?.payments}
          />
        </td>

        <td className="hidden xl:table-cell">
          <span
            className={cn(
              item?.status === "UNPAID"
                ? "text-red-600"
                : item?.status === "PAID"
                ? "text-emerald-600"
                : ""
            )}
          >
            {item?.status}
          </span>
        </td>

        <td className="">
          <div className="flex items-center">
            <ViewAction
              href={`appointments/${item?.appointment_id}?cat=bills`}
              disabled={
                userRole === "admin" ? false : userId !== item?.patient_id
              }
            />
            <Button
              disabled={item?.patient_id !== userId || userRole !== "cashier"}
              variant="ghost"
              className="flex items-center gap-2 justify-start  text-gray-600 text-sm font-light"
            >
              Pagar
            </Button>

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
          <ReceiptText size={20} className="text-gray-500" />
          <p className="text-2xl font-semibold">{totalRecord ?? 0}</p>
          <span className="text-gray-600 text-sm xl:text-base">
          registros totales
          </span>
        </div>

        <div className="w-full lg:w-fit flex items-center justify-between lg:justify-start gap-2">
          <SearchInput />
        </div>
      </div>

      <div className="mt-6">
        <Table columns={columns} renderRow={renderRow} data={data!} />

        {data?.length !== 0 && (
          <Pagination
            totalRecords={totalRecord!}
            currentPage={currentPage!}
            totalPages={totalPages!}
            limit={DATA_LIMIT}
          />
        )}
      </div>
    </Card>
  );
};

export default BillingRecords;

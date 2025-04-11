import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import { isAuthenticatedUser } from "../is-authenticated";

export const getAccountDashboard = async (category = "monthly") => {
  try {
    const session = await isAuthenticatedUser();

    if (session.role !== "ACCOUNT" && session.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    let currentPeriodStart,
      currentPeriodEnd,
      previousPeriodStart,
      previousPeriodEnd;

    if (category === "monthly") {
      currentPeriodStart = startOfMonth(new Date());
      currentPeriodEnd = endOfMonth(new Date());
      previousPeriodStart = startOfMonth(subMonths(new Date(), 1));
      previousPeriodEnd = endOfMonth(subMonths(new Date(), 1));
    } else if (category === "weekly") {
      currentPeriodStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday start
      currentPeriodEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
      previousPeriodStart = startOfWeek(subWeeks(new Date(), 1), {
        weekStartsOn: 1,
      });
      previousPeriodEnd = endOfWeek(subWeeks(new Date(), 1), {
        weekStartsOn: 1,
      });
    } else if (category === "yearly") {
      currentPeriodStart = startOfYear(new Date());
      currentPeriodEnd = endOfYear(new Date());
      previousPeriodStart = startOfYear(subYears(new Date(), 1));
      previousPeriodEnd = endOfYear(subYears(new Date(), 1));
    } else {
      throw new Error(
        "Invalid grouping category. Use 'monthly', 'weekly', or 'yearly'."
      );
    }

    const [
      currentRevenueData,
      previousRevenueData,
      outstandingPaymentsData,
      invoiceData,
    ] = await Promise.all([
      db.payment.findMany({
        where: {
          payment_date: {
            gte: currentPeriodStart,
            lte: currentPeriodEnd,
          },
        },
        select: {
          total_amount: true,
          amount_paid: true,
        },
      }),
      db.payment.findMany({
        where: {
          payment_date: {
            gte: previousPeriodStart,
            lte: previousPeriodEnd,
          },
        },
        select: {
          total_amount: true,
          amount_paid: true,
        },
      }),
      db.payment.findMany({
        where: {
          total_amount: {
            gt: db.payment.fields.amount_paid,
          },
        },
        select: {
          total_amount: true,
          amount_paid: true,
        },
      }),
      db.invoice.findMany({
        where: {
          purchaseDate: {
            gte: currentPeriodStart,
            lte: currentPeriodEnd,
          },
          status: "PENDING",
        },
        select: {
          purchaseDate: true,
          totalCost: true,
        },
      }),
    ]);

    const calculateTotalPaid = (
      payments: {
        total_amount: number;
        amount_paid: number;
      }[]
    ) => {
      return payments.reduce(
        (acc, payment) => acc + (payment.amount_paid || 0),
        0
      );
    };

    const calculateTotalOutstanding = (
      payments: {
        total_amount: number;
        amount_paid: number;
      }[]
    ) => {
      return payments.reduce(
        (acc, payment) =>
          acc + (payment.total_amount - payment.amount_paid || 0),
        0
      );
    };

    const calculateTotalInvoice = (
      payments: {
        totalCost: number;
      }[]
    ) => {
      return payments.reduce(
        (acc, payment) => acc + (payment.totalCost || 0),
        0
      );
    };

    const currentTotal = calculateTotalPaid(currentRevenueData);
    const previousTotal = calculateTotalPaid(previousRevenueData);
    const outstandingTotal = calculateTotalOutstanding(outstandingPaymentsData);
    const totalInvoice = calculateTotalInvoice(invoiceData);

    const growth =
      previousTotal > 0
        ? ((currentTotal - previousTotal) / previousTotal) * 100
        : 0;

    return {
      category,
      currentRevenue: currentTotal,
      previousRevenue: previousTotal,
      growth: growth.toFixed(2),
      outstandingPayments: outstandingTotal,
      totalPendingInvoice: totalInvoice,
      totalInvoice: invoiceData.length,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error", status: 500 };
  }
};

export const getRevenueChartData = async (grouping = "monthly") => {
  const session = await isAuthenticatedUser();

  if (session.role !== "ACCOUNT" && session.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  let currentPeriodStart, currentPeriodEnd;
  let periodFormat: string;

  if (grouping === "yearly") {
    currentPeriodStart = startOfYear(new Date());
    currentPeriodEnd = endOfYear(new Date());
    periodFormat = "MMM";
  } else if (grouping === "weekly") {
    currentPeriodStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday start
    currentPeriodEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
    periodFormat = "EEE";
  } else if (grouping === "monthly") {
    currentPeriodStart = startOfMonth(new Date());
    currentPeriodEnd = endOfMonth(new Date());
    periodFormat = "MMM dd";
  } else {
    throw new Error(
      "Invalid grouping category. Use 'monthly', 'weekly', or 'yearly'."
    );
  }

  const [currentRevenueData] = await Promise.all([
    db.payment.findMany({
      where: {
        payment_date: {
          gte: currentPeriodStart,
          lte: currentPeriodEnd,
        },
      },
      select: {
        total_amount: true,
        amount_paid: true,
        payment_date: true,
      },
      orderBy: { payment_date: "asc" },
    }),
  ]);

  const revenueByPeriod = currentRevenueData.reduce<
    { name: string; value: number }[]
  >((acc, payment) => {
    let period = null;
    if (grouping === "monthly") {
      const weekStart = startOfWeek(payment.payment_date, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(payment.payment_date, { weekStartsOn: 1 });

      period = `${format(weekStart, "MMM dd")} - ${format(weekEnd, "MMM dd")}`;
    } else period = format(payment.payment_date, periodFormat);

    const existing = acc.find((item) => item.name === period);
    if (existing) {
      existing.value += payment.amount_paid;
    } else {
      acc.push({ name: period, value: payment.amount_paid });
    }
    return acc;
  }, []);

  // Sort data by period
  //   revenueByPeriod.sort(
  //     (a, b) =>
  //       new Date(`01 ${a.name} 2000`).getTime() -
  //       new Date(`01 ${b.name} 2000`).getTime()
  //   );

  return {
    category: grouping,
    revenueData: revenueByPeriod,
  };
};

export async function getPaymentDetails({
  page,
  limit,
  search,
  category,
}: {
  page: number;
  limit?: number;
  search?: string;
  category?: string;
}) {
  try {
    const session = await isAuthenticatedUser();

    if (session.role !== "ACCOUNT" && session.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    const PAGE_NUMBER = search ? 1 : Number(page) <= 0 ? 1 : Number(page);
    const LIMIT = Number(limit) || 10;

    const SKIP = (PAGE_NUMBER - 1) * LIMIT;

    const where: Prisma.PaymentDetailsWhereInput = {
      ...(search && {
        OR: [
          {
            payment: {
              patient: {
                first_name: { contains: search, mode: "insensitive" },
              },
            },
          },
          {
            payment: {
              patient: { last_name: { contains: search, mode: "insensitive" } },
            },
          },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      db.paymentDetails.findMany({
        take: LIMIT,
        skip: SKIP,
        where: where,
        include: {
          payment: {
            include: {
              patient: { select: { first_name: true, last_name: true } },
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      }),
      db.paymentDetails.count({ where }),
    ]);

    const totalPages = Math.ceil(total / LIMIT);

    return {
      data,
      totalRecord: total,
      totalPages,
      currentPage: PAGE_NUMBER,
    };
  } catch (error) {
    return { error: "Failed to fetch prescriptions" };
  }
}

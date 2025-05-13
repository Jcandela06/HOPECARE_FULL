"use server";

import db from "@/lib/db";
import { isAuthenticatedUser } from "@/utils/is-authenticated";
import { PaymentStatus } from '@prisma/client';
import Stripe from "stripe";
import { redirect } from "next/navigation";

export async function payBillAction({
  paymentId,
  amount,
}: {
  paymentId: number;
  amount: number;
}) {
  try {
    await isAuthenticatedUser();

    // Buscar el pago actual
    const payment = await db.payment.findUnique({
      where: { id: paymentId },
      include: { payments: true },
    });

    if (!payment) {
      return { success: false, msg: "Factura no encontrada" };
    }

    const totalPaid = payment.payments.reduce((acc, cur) => acc + cur.amount, 0);
    const remaining = payment.total_amount - payment.discount - totalPaid;

    if (amount > remaining) {
      return { success: false, msg: "Monto excede lo adeudado" };
    }

    // Registrar el nuevo pago
    await db.paymentDetails.create({
      data: {
        payment_id: paymentId,
        amount,
      },
    });

    // Actualizar estado si está completamente pagado
    const newTotalPaid = totalPaid + amount;
    const newStatus = newTotalPaid >= (payment.total_amount - payment.discount) ? "PAID" : "PART";

    await db.payment.update({
      where: { id: paymentId },
      data: { amount_paid: newTotalPaid, status: PaymentStatus.PART },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, msg: "Error interno del servidor" };
  }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export async function createStripeCheckoutSession({
  paymentId,
  amount,
}: {
  paymentId: number;
  amount: number;
}) {
  await isAuthenticatedUser();

  const payment = await db.payment.findUnique({
    where: { id: paymentId },
    include: {
      patient: true,
    },
  });

  if (!payment) {
    throw new Error("Factura no encontrada");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Factura #${paymentId}`,
            description: `Pago para ${payment.patient.first_name} ${payment.patient.last_name}`,
          },
          unit_amount: amount * 100, // en centavos
        },
        quantity: 1,
      },
    ],
    metadata: {
      paymentId: String(paymentId),
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/record/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/record/billing?canceled=true`,
  });

  redirect(session.url!);
}
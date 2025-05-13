"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createStripeCheckoutSession } from "@/app/actions/payments";

interface PayBillDialogProps {
  paymentId: number;
  maxAmount: number;
  disabled?: boolean;
}

export const PayBillDialog = ({ paymentId, maxAmount, disabled }: PayBillDialogProps) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      await createStripeCheckoutSession({
        paymentId,
        amount: parseFloat(amount),
      });
    } catch (error) {
      console.error("Error iniciando pago con Stripe:", error);
      alert("Error iniciando pago con Stripe");
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} variant="ghost" className="text-gray-600 text-sm">
          Pagar
        </Button>
      </DialogTrigger>
      
        <DialogContent>
          <h2 className="text-lg font-semibold">Pagar con tarjeta</h2>
          <p className="text-sm text-gray-500">Total restante: ${maxAmount.toFixed(2)}</p>
          <Input
            type="number"
            min={0}
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Monto a pagar"
          />
          <Button onClick={handlePayment} disabled={loading || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > maxAmount}>
            {loading ? "Redirigiendo a Stripe..." : "Pagar con tarjeta"}
          </Button>
        </DialogContent>
    </Dialog>
  );
};

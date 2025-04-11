"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const InvoiceGeneration = () => {
  const [providerName, setProviderName] = useState("");

  const handleGenerateInvoice = () => {
    // This would be connected to the backend later
    toast.success("La factura ha sido generada y enviada al proveedor.");
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Generar factura
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="providerName">Nombre del proveedor</Label>
            <Input
              id="providerName"
              value={providerName}
              onChange={(e) => setProviderName(e.target.value)}
              placeholder="Ingrese el nombre del proveedor"
            />
          </div>
          <Button onClick={handleGenerateInvoice} className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Generar y enviar factura
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

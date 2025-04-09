"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export const CsvImport = () => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // This would be connected to the backend later
      toast.success("La lista de inventario se ha importado correctamente.");
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Inventario de importación
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input type="file" accept=".csv" onChange={handleFileUpload} />
          <p className="text-sm text-muted-foreground">
          Suba un archivo CSV con su lista de inventario. 
          El archivo debe incluir columnas para el nombre del medicamento, 
          el número de lote, el fabricante, la fecha de caducidad, la cantidad, 
          el precio unitario, la categoría y la descripción.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

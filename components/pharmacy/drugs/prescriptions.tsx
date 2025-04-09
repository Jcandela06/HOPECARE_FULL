"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export function DrugPrescriptions() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const fetchPrescriptions = async () => {
    //   const result = await getPendingPrescriptions();
    //   if (result.prescriptions) {
    //     setPrescriptions(result.prescriptions);
    //   }
    //   setLoading(false);
    // };
    // fetchPrescriptions();
  }, []);

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.patient.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      prescription.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar por nombre del paciente o ID de prescripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prescripción ID</TableHead>
              <TableHead>Nombre del paciente</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Medicamentos recetados</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrescriptions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                No se encontraron recetas pendientes
                </TableCell>
              </TableRow>
            ) : (
              filteredPrescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell>{prescription.id}</TableCell>
                  <TableCell>{prescription.patient.name}</TableCell>
                  <TableCell>{prescription.doctor.name}</TableCell>
                  <TableCell>
                    {prescription.drugs.map((drug: any) => (
                      <div key={drug.id}>
                        {drug.drug.name} ({drug.quantity} unidades)
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {new Date(prescription.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() =>
                        router.push(
                          `/pharmacy/drug-issuance/${prescription.id}`
                        )
                      }
                    >
                      Drogas de emisión
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

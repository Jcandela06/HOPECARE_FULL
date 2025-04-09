"use client";

import { issueDrugs } from "@/app/actions/pharmacy";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumberToCurrency } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Doctor,
  Drug,
  Patient,
  PrescribedDrug,
  Prescription,
} from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const issuanceSchema = z.object({
  prescriptionId: z.coerce.number(),
  appointment_id: z.coerce.number(),
  patientId: z.string(),
  drugs: z.array(
    z.object({
      drugId: z.string(),
      quantity: z.coerce.number().min(1),
      // prescribedQuantity: z.coerce.number().min(1),
      pricePerUnit: z.coerce.number(),
    })
  ),
});

interface Drugs extends PrescribedDrug {
  drug: Drug;
}

interface Props extends Prescription {
  patient: Patient;
  doctor: Doctor;
  drugs: Drugs[];
  diagnosis: {
    id: number;
    medical: {
      id: number;
      appointment_id: number;
    };
  };
}

export const IssuanceForm = ({ prescription }: { prescription: Props }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof issuanceSchema>>({
    resolver: zodResolver(issuanceSchema),
    defaultValues: {
      prescriptionId: prescription.id,
      patientId: prescription.patient.id,
      appointment_id: prescription.diagnosis.medical.appointment_id,
      drugs: prescription.drugs.map((drug: Drugs) => ({
        drugId: drug.drug.id,
        // prescribedQuantity: drug.quantity,
        quantity: drug.quantity,
        pricePerUnit: drug.drug.pricePerUnit,
      })),
    },
  });

  const handleOnSubmit = async (data: z.infer<typeof issuanceSchema>) => {
    try {
      setIsSubmitting(true);
      const result = await issueDrugs(data);

      if (result.success) {
        toast.success("Drugs issued successfully");
        router.push("/pharmacy/drug-issuance");
      } else {
        toast.error(result.error || "No se entregaron medicamentos");
      }
    } catch (error) {
      toast.error("Se produjo un error al emitir medicamentos.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-6">
        <Card className="p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <Label>Nombre del paciente</Label>
              <p className="text-lg uppercase">
                {prescription?.patient?.first_name +
                  " " +
                  prescription?.patient?.last_name}
              </p>
            </div>
            <div>
              <Label>Prescripción ID</Label>
              <p className="text-lg font-medium">{prescription?.id}</p>
            </div>
            <div>
              <Label>Doctor</Label>
              <p className="text-lg uppercase">{prescription?.doctor?.name}</p>
            </div>
            <div>
              <Label>Fecha</Label>
              <p className="text-lg font-medium">
                {new Date(prescription?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="lg:uppercase">
                  <TableHead>Nombre del medicamento</TableHead>
                  <TableHead>Cantidad prescrita</TableHead>
                  <TableHead>Cantidad de emisión</TableHead>
                  <TableHead>Stock disponible</TableHead>
                  <TableHead>Precio/Unidad</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Frecuencia</TableHead>
                  <TableHead>Duración</TableHead>
                  <TableHead>Instrucciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prescription?.drugs?.map((item: any, index: number) => (
                  <TableRow key={item?.drug?.id}>
                    <TableCell>{item?.drug?.name}</TableCell>
                    <TableCell>{item?.quantity}</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`drugs.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                min={1}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value) || 1;
                                  if (value > item?.drug?.quantity) {
                                    toast.error(
                                      "No se puede emitir más del stock disponible"
                                    );
                                    return;
                                  }
                                  field.onChange(value);
                                }}
                                className="w-20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>{item?.drug?.quantity}</TableCell>
                    <TableCell>
                      {formatNumberToCurrency(item?.drug?.pricePerUnit)}
                    </TableCell>
                    <TableCell>
                      {formatNumberToCurrency(
                        form.watch(`drugs.${index}.quantity`) *
                          item?.drug?.pricePerUnit
                      )}
                    </TableCell>
                    <TableCell>{item?.frequency}</TableCell>
                    <TableCell>{item?.duration} días</TableCell>
                    <TableCell>{item?.instructions || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Issue Drugs"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addNewDiagnosis } from "@/app/actions/medical";
import { DiagnosisSchema } from "@/lib/schema";
import { z } from "zod";
import { CustomInput } from "../custom-inputs";
import { Button } from "../ui/button";
import { CardDescription, CardHeader } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form } from "../ui/form";

interface DataProps {
  patientId: string;
  medicalId: string;
  doctor_id: string | number;
  appointment_id: string | number;
}
export const AddDiagnosis = ({
  patientId,
  medicalId,
  doctor_id,
  appointment_id,
}: DataProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof DiagnosisSchema>>({
    resolver: zodResolver(DiagnosisSchema),
    defaultValues: {
      patient_id: patientId,
      medical_id: medicalId,
      doctor_id: doctor_id.toString(),
      symptoms: undefined,
      diagnosis: undefined,
      notes: undefined,
      prescribed_medications: undefined,
      follow_up_plan: undefined,
    },
  });

  const handleOnSubmit = async (values: z.infer<typeof DiagnosisSchema>) => {
    try {
      setIsLoading(true);
      const resp = await addNewDiagnosis({
        ...values,
        doctor_id: doctor_id,
        appointment_id: appointment_id,
      });

      if (resp.success) {
        toast.success("¡Signos vitales añadidos exitosamente!");

        router.refresh();

        form.reset();
      } else if (resp.error) {
        toast.error(resp.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Algo salió mal. Inténtalo de nuevo..");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="lg"
            // variant="outline"
            className="text-white mt-4"
          >
            <Plus size={22} className="text-white" />
            Agregar diagnóstico
            <span className="ml-2 text-sm font-medium text-gray-300">
              (Nuevo)
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[60%] 2xl:max-w-[40%]">
          <CardHeader className="px-0">
            <DialogTitle>Agregar nuevo diagnóstico</DialogTitle>
            <CardDescription>
            Asegúrese de que se presenten los resultados con precisión y se corrijan en consecuencia 
            para garantizar que sean correctos para su aplicación y que 
            no generen un error.
            </CardDescription>
          </CardHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <CustomInput
                  type="textarea"
                  control={form.control}
                  name="symptoms"
                  label="Síntomas"
                  placeholder="Introduzca los síntomas aquí..."
                />
              </div>
              <div className="flex items-center gap-4">
                <CustomInput
                  type="textarea"
                  control={form.control}
                  name="diagnosis"
                  placeholder="Introduzca el diagnóstico aquí..."
                  label="Diagnóstico (Encontrado)"
                />
              </div>
              {/* <div className="flex items-center gap-4">
                <CustomInput
                  type="textarea"
                  control={form.control}
                  name="prescribed_medications"
                  placeholder="Enter principles here ..."
                  label="Prescriptions for this patient"
                />
              </div> */}

              <div className="flex flex-col gap-4">
                <CustomInput
                  type="textarea"
                  control={form.control}
                  name="notes"
                  placeholder="Nota opcional"
                  label="Notas adicionales para este tratamiento"
                />
                <CustomInput
                  type="textarea"
                  control={form.control}
                  name="follow_up_plan"
                  placeholder="Opcional"
                  label="Plan de seguimiento"
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                Guardar
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

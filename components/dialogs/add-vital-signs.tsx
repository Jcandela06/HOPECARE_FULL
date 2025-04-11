"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { addNewVitalSigns } from "@/app/actions/appointment";
import { VitalSignsSchema } from "@/lib/schema";

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
export const AddVitalSigns = ({
  patientId,
  medicalId,
  doctor_id,
  appointment_id,
}: DataProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof VitalSignsSchema>>({
    resolver: zodResolver(VitalSignsSchema),
    defaultValues: {
      patient_id: patientId,
      medical_id: medicalId,
      body_temperature: 0,
      systolic: 0,
      diastolic: 0,
      heartRate: "",
      weight: 0,
      height: 0,
      respiratory_rate: 0,
      oxygen_saturation: 0,
    },
  });

  const handleOnSubmit = async (values: z.infer<typeof VitalSignsSchema>) => {
    try {
      setIsLoading(true);
      const resp = await addNewVitalSigns({
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
      toast.error("Algo salió mal. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="text-[14px] font-light"
          >
            <Plus size={22} className="text-gray-500" /> Agregar signos vitales
          </Button>
        </DialogTrigger>
        <DialogContent>
          <CardHeader className="px-0">
            <DialogTitle>Agregar signos vitales</DialogTitle>
            <CardDescription>
            Asegúrese de realizar lecturas precisas, 
            ya que esto puede afectar el diagnóstico y otros procesos médicos.
            </CardDescription>
          </CardHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <CustomInput
                  type="input"
                  control={form.control}
                  name="body_temperature"
                  label="Temperatura corporal (°C)"
                  placeholder="ej.:37.5"
                />
                <CustomInput
                  type="input"
                  control={form.control}
                  name="heartRate"
                  placeholder="ej: 54-123"
                  label="Frecuencia cardíaca (BPM)"
                />
              </div>
              <div className="flex items-center gap-4">
                <CustomInput
                  type="input"
                  control={form.control}
                  name="systolic"
                  placeholder="ej: 120"
                  label="Presión arterial sistólica"
                />
                <CustomInput
                  type="input"
                  control={form.control}
                  name="diastolic"
                  placeholder="eg: 80"
                  label="Presión arterial diastólica"
                />
              </div>
              <div className="flex items-center gap-4">
                <CustomInput
                  type="input"
                  control={form.control}
                  name="weight"
                  placeholder="ej.: 80"
                  label="Peso (Kg)"
                />
                <CustomInput
                  type="input"
                  control={form.control}
                  name="height"
                  placeholder="ej.: 175"
                  label="Altura (Cm)"
                />
              </div>

              <div className="flex items-center gap-4">
                <CustomInput
                  type="input"
                  control={form.control}
                  name="respiratory_rate"
                  placeholder="Opcional"
                  label="Frecuencia respiratoria"
                />
                <CustomInput
                  type="input"
                  control={form.control}
                  name="oxygen_saturation"
                  placeholder="Opcional"
                  label="Saturación de oxígeno"
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

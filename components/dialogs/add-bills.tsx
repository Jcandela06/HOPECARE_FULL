"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addNewBill } from "@/app/actions/medical";
import { PatientBillSchema } from "@/lib/schema";
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
  servicesData: { name: string; price: number; id: number }[];
  id?: string | number;
  appId?: string | number;
}
export const AddBills = ({ id, appId, servicesData }: DataProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [data, setData] = useState<any>();

  const form = useForm<z.infer<typeof PatientBillSchema>>({
    resolver: zodResolver(PatientBillSchema),
    defaultValues: {
      payment_id: String(id),
      service_name: "",
      service_date: new Date().toISOString().slice(0, 10),
      appointment_id: String(appId),
      quantity: "1",
      unit_cost: "0.00",
      total_cost: "0.00",
    },
  });

  const handleOnSubmit = async (values: z.infer<typeof PatientBillSchema>) => {
    try {
      setIsLoading(true);
      const resp = await addNewBill(values);

      if (resp.success) {
        toast.success("¡Factura del paciente agregada exitosamente!");

        form.reset();
        router.refresh();
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

  useEffect(() => {
    if (servicesData) {
      setData(
        servicesData?.map((service) => ({
          value: service.name,
          label: service?.name,
        }))
      );
    }
  }, [servicesData, id]);

  const selectedService = form.watch("service_name");
  const quantity = form.watch("quantity");

  useEffect(() => {
    if (selectedService) {
      const unit_cost = servicesData.find((el) => el.name === selectedService);

      if (unit_cost) {
        form.setValue("unit_cost", unit_cost?.price.toFixed(2));
      }
      if (quantity) {
        form.setValue(
          "total_cost",
          (Number(quantity) * Number(unit_cost?.price!)).toFixed(2)
        );
      }
    }
  }, [selectedService, quantity]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="text-sm font-normal">
            <Plus size={22} className="text-gray-400" />
            Agregar factura
          </Button>
        </DialogTrigger>
        <DialogContent>
          <CardHeader className="px-0">
            <DialogTitle>Agregar factura de paciente</DialogTitle>
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
              <div className="flex items-center gap-2">
                <CustomInput
                  type="select"
                  control={form.control}
                  name="service_name"
                  placeholder="Select service"
                  label="Nombre del servicio"
                  selectList={data!}
                />
                <CustomInput
                  type="input"
                  control={form.control}
                  name="unit_cost"
                  placeholder=""
                  label="Costo unitario"
                />
              </div>

              <div className="flex items-center gap-2">
                <CustomInput
                  type="input"
                  control={form.control}
                  name="quantity"
                  placeholder="Enter quantity"
                  label="Cantidad"
                />
                <CustomInput
                  type="input"
                  control={form.control}
                  name="total_cost"
                  placeholder="0.00"
                  label="Costo total"
                />
              </div>

              <CustomInput
                type="input"
                control={form.control}
                name="service_date"
                label="Fecha de servicio"
                placeholder=""
                inputType="date"
              />

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

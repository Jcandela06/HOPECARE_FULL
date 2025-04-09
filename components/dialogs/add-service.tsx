"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addNewService } from "@/app/actions/admin";
import { ServicesSchema } from "@/lib/schema";
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

export const AddService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof ServicesSchema>>({
    resolver: zodResolver(ServicesSchema),
    defaultValues: {
      name: undefined,
      price: undefined,
      description: undefined,
    },
  });

  const handleOnSubmit = async (values: z.infer<typeof ServicesSchema>) => {
    try {
      setIsLoading(true);
      const resp = await addNewService(values);

      if (resp.success) {
        toast.success("¡Servicio añadido exitosamente!");

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
          <Button size="sm" className="text-sm font-normal">
            <Plus size={22} className="text-gray-500" /> Agregar nuevo servicio
          </Button>
        </DialogTrigger>
        <DialogContent>
          <CardHeader className="px-0">
            <DialogTitle>Agregar nuevo servicio</DialogTitle>
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
              <CustomInput
                type="input"
                control={form.control}
                name="service_name"
                label="Nombre del servicio"
                placeholder=""
              />

              <CustomInput
                type="input"
                control={form.control}
                name="price"
                placeholder=""
                label="Precio del servicio"
              />
              <div className="flex items-center gap-4">
                <CustomInput
                  type="textarea"
                  control={form.control}
                  name="description"
                  placeholder=""
                  label="Descripción del servicio"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 w-full"
              >
                Guardar
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

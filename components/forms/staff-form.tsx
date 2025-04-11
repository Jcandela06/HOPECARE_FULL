"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createStaff } from "@/app/actions/staff";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { StaffSchema } from "@/lib/schema";
import { CustomInput } from "../custom-inputs";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

const TYPES = [
  { label: "Nurse", value: "NURSE" },
  { label: "Laboratory", value: "LABORATORY" },
  { label: "Pharmacy", value: "PHARMACY" },
  { label: "Account", value: "ACCOUNT" },
];

export const StaffForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof StaffSchema>>({
    resolver: zodResolver(StaffSchema),
    defaultValues: {
      name: "",
      role: "NURSE",
      phone: "",
      email: "",
      license_number: "",
      address: "",
      department: "",
      img: "",
      password: "",
    },
  });

  const handleOnSubmit = async (values: z.infer<typeof StaffSchema>) => {
    try {
      setIsLoading(true);
      const resp = await createStaff(values);
      console.log(resp);

      if (resp.success) {
        toast.success("¡Doctor añadido exitosamente!");

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
    <Sheet>
      <Button size="sm" className="text-sm font-normal" asChild>
        <SheetTrigger>
          <Plus size={20} />
          Add Staff
        </SheetTrigger>
      </Button>

      <SheetContent className="rounded-xl rounded-r-2xl md:h-[95%] md:top-[2.5%] md:right-[1%] w-full">
        <div className="h-full overflow-y-auto p-4">
          <SheetHeader>
            <SheetTitle>Añadir nuevo personal</SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="space-y-8 mt-5 2xl:mt-10"
            >
              <CustomInput
                type="radio"
                selectList={TYPES}
                control={form.control}
                name="role"
                label="TYPE"
                placeholder=""
                defaultValue="nurse"
              />

              <CustomInput
                type="input"
                control={form.control}
                name="name"
                placeholder="John Doe"
                label="Nombre Completo"
              />

              <div className="flex items-center gap-2">
                <CustomInput
                  type="input"
                  control={form.control}
                  name="phone"
                  placeholder="9225600735"
                  label="Numero de contacto"
                />
                <CustomInput
                  type="input"
                  control={form.control}
                  name="license_number"
                  placeholder="AN-347834786"
                  label="Numero de Licencia"
                />
              </div>

              <CustomInput
                type="input"
                control={form.control}
                name="email"
                placeholder="john@example.com"
                label="Email"
              />

              <CustomInput
                type="input"
                control={form.control}
                name="address"
                placeholder="1479 Street, Apt 1839-G, NY"
                label="Dirección"
              />

              <CustomInput
                type="input"
                control={form.control}
                name="password"
                placeholder=""
                label="Contraseña"
                inputType="password"
              />

              <Button type="submit" disabled={isLoading} className="w-full">
                Guardar
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

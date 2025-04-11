"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pen, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { addLabResult } from "@/app/actions/medical";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LabResultSchema } from "@/lib/schema";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type STATUS = "PENDING" | "COMPLETED" | "CANCELLED";

export const LabResultForm = ({
  id,
  disabled,
  label,
  data,
}: {
  id: number;
  disabled: boolean;
  label: string;
  data?: {
    test_date: Date;
    result: string;
    resultNote?: string;
    status: string;
  };
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof LabResultSchema>>({
    resolver: zodResolver(LabResultSchema),
    defaultValues: {
      testId: id.toString() || "",
      testDate: "",
      result: "",
      status: "PENDING",
      notes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LabResultSchema>) {
    try {
      setIsLoading(true);

      const res = await addLabResult(values);
      router.refresh();

      toast.success(res?.message);
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error("Algo salió mal. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    data &&
      form.reset({
        testId: id.toString(),
        testDate: new Date(data.test_date).toISOString().slice(0, 10),
        result: data.result || "",
        status: (data.status || "PENDING") as STATUS,
        notes: data.resultNote || "",
      });
  }, [data]);

  return (
    <Dialog>
      <DialogTrigger
        asChild
        disabled={disabled}
        className="disabled:cursor-not-allowed disabled:opacity-50"
      >
        <button className="text-[13px] font-normal flex items-center text-black dak:text-emerald-500">
          {label !== "Edit" ? (
            <Plus className="h-4 w-4" />
          ) : (
            <Pen className="h-3 w-3" />
          )}
          {label}
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar resultado de prueba</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="testId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paciente ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Test ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="testDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de la prueba</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="result"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resultado</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese el resultado de la prueba" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="COMPLETED">Completado</SelectItem>
                      <SelectItem value="PENDING">Pendiente</SelectItem>
                      <SelectItem value="CANCELLED">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Añade cualquier nota adicional"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              Enviar resultado de laboratorio
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

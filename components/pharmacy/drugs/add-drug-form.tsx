"use client";

import { createDrug } from "@/app/actions/pharmacy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { drugSchema } from "@/lib/schema";
import { DrugCategory } from "@/lib/types/pharmacy";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export type DrugFormData = {
  name: string;
  category: DrugCategory;
  batchNumber: string;
  manufacturer: string;
  quantity: number;
  pricePerUnit: number;
  expiryDate: string;
  description: string;
};

export const AddDrugForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DrugFormData>({
    resolver: zodResolver(drugSchema),
  });

  const onSubmit = async (data: DrugFormData) => {
    setIsLoading(true);
    const result = await createDrug({
      ...data,
      expiryDate: new Date(data.expiryDate),
    });
    setIsLoading(false);
    if (result.drug) {
      toast.success("Drug added successfully");
      router.push("/pharmacy/drugs");
    } else {
      toast.error(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre del medicamento</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoría</Label>
          <Select
            onValueChange={(value) =>
              setValue("category", value as DrugCategory)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(DrugCategory).map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-destructive">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="batchNumber">Número de lote</Label>
          <Input id="batchNumber" {...register("batchNumber")} />
          {errors.batchNumber && (
            <p className="text-sm text-destructive">
              {errors.batchNumber.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="manufacturer">Fabricante</Label>
          <Input id="manufacturer" {...register("manufacturer")} />
          {errors.manufacturer && (
            <p className="text-sm text-destructive">
              {errors.manufacturer.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Cantidad</Label>
          <Input
            type="number"
            id="quantity"
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity && (
            <p className="text-sm text-destructive">
              {errors.quantity.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pricePerUnit">Precio por unidad</Label>
          <Input
            type="number"
            step="0.01"
            id="pricePerUnit"
            {...register("pricePerUnit", { valueAsNumber: true })}
          />
          {errors.pricePerUnit && (
            <p className="text-sm text-destructive">
              {errors.pricePerUnit.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiryDate">Fecha de caducidad</Label>
          <Input type="date" id="expiryDate" {...register("expiryDate")} />
          {errors.expiryDate && (
            <p className="text-sm text-destructive">
              {errors.expiryDate.message}
            </p>
          )}
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea id="description" {...register("description")} />
          {errors.description && (
            <p className="text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/pharmacy/drugs")}
        >
          Cancelar
        </Button>
        <Button disabled={isLoading} type="submit">
        Agregar medicamento
        </Button>
      </div>
    </form>
  );
};

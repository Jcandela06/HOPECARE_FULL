"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
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
import { Services } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";

interface TestDetailsSectionProps {
  form: UseFormReturn<any>;
  data: { id: number; name: string }[];
}

export const TestDetailsSection = ({ form, data }: TestDetailsSectionProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="testTypes"
        render={() => (
          <FormItem>
            <FormLabel>Tipos de prueba</FormLabel>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data?.map((test) => (
                <FormField
                  key={test.id}
                  control={form.control}
                  name="testTypes"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={test.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(test.id.toString())}
                            onCheckedChange={(checked) => {
                              const currentValue = field.value || [];
                              return checked
                                ? field.onChange([
                                    ...currentValue,
                                    test.id.toString(),
                                  ])
                                : field.onChange(
                                    currentValue.filter(
                                      (value: String) =>
                                        value !== test.id.toString()
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {test?.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prioridad</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar prioridad" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="routine">Rutina</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                  <SelectItem value="stat">ESTADÍSTICA</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requestDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de solicitud</FormLabel>
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
        name="specialInstructions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Instrucciones especiales</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Agregue instrucciones o notas especiales"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

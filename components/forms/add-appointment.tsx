"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserPen } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AppointmentSchema } from "@/lib/schema";
import { generateTimes } from "@/utils";

import { createNewAppointment } from "@/app/actions/appointment";
import { Doctor, Patient } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CustomInput } from "../custom-inputs";
import { ProfileImage } from "../profile-image";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const APPOINTMENT_TYPES = [
  { label: "General Consultation", value: "General Consultation" },
  { label: "General Check up", value: "General Check Up" },
  { label: "Antenatal", value: "Antenatal" },
  { label: "Maternity", value: "Maternity" },
  { label: "Lab Test", value: "Lab Test" },
  { label: "ANT", value: "ANT" },
];

interface PatientInfoProps {
  id: string;
  img?: string;
  name: string;
  gender: string;
  colorCode: string;
}
export const AddAppointment = ({
  data,
  doctors,
}: {
  data: Patient;
  doctors: Doctor[];
}) => {
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patient_ifo, setPatientInfo] = useState<PatientInfoProps | undefined>({
    id: data?.id,
    img: data?.img!,
    name: `${data?.first_name} ${data?.last_name}`,
    gender: data?.gender,
    colorCode: data?.colorCode!,
  });
  const router = useRouter();
  const [physicians, setPhysicians] = useState<Doctor[] | undefined>(doctors);

  const appointmentTimes = generateTimes(8, 17, 30);

  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      doctor_id: "",
      appointment_date: "",
      time: "",
      type: "",
      note: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof AppointmentSchema>> = async (
    values
  ) => {
    try {
      setIsSubmitting(true);
      const newData = { ...values, patient_id: patient_ifo?.id };

      const data = await createNewAppointment(newData);

      if (data.success) {
        form.reset({});
        router.refresh();
        toast.success("Cita creada exitosamente");
      }
    } catch (error) {
      console.log(error);
      toast.error("Algo salió mal. Inténtalo de nuevo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full md:w-fit flex items-center gap-2 justify-center text-sm font-light">
          <UserPen size={16} /> Reservar cita
        </Button>
      </SheetTrigger>

      <SheetContent className="rounded-xl rounded-r-2xl md:h-[95%] md:top-[2.5%] md:right-[1%] w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <span>Cargando...</span>
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-4">
            <SheetHeader>
              <SheetTitle>Reservar cita</SheetTitle>
            </SheetHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-5 2xl:mt-10"
              >
                <div className="w-full rounded-md border border-input bg-background px-3 py-1 flex items-center gap-4">
                  <ProfileImage
                    url={patient_ifo?.img}
                    name={patient_ifo?.name}
                    className="size-16 border border-input"
                    bgColor={patient_ifo?.colorCode}
                  />

                  <div>
                    <p className="font-semibold text-lg">{patient_ifo?.name}</p>
                    <span className="text-sm text-gray-500 capitalize">
                      {patient_ifo?.gender}
                    </span>
                  </div>
                </div>

                <CustomInput
                  type="select"
                  selectList={APPOINTMENT_TYPES}
                  control={form.control}
                  name="type"
                  label="Tipo de cita"
                  placeholder="Seleccione un tipo de cita"
                />

                <FormField
                  control={form.control}
                  name="doctor_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Médico</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un médico" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="">
                          {physicians?.map((i, id) => (
                            <SelectItem key={id} value={i.id} className="p-2">
                              <div className="flex flex-row gap-2 p-2">
                                <ProfileImage
                                  url={i?.img!}
                                  name={i?.name}
                                  bgColor={i?.colorCode!}
                                  textClassName="text-black"
                                />
                                <div>
                                  <p className="font-medium text-start ">
                                    {i.name}
                                  </p>
                                  <span className="text-sm text-gray-600">
                                    {i?.specialization}
                                  </span>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center gap-2">
                  <CustomInput
                    type="input"
                    control={form.control}
                    name="appointment_date"
                    placeholder=""
                    label="Fecha"
                    inputType="date"
                  />
                  <CustomInput
                    type="select"
                    control={form.control}
                    name="time"
                    placeholder="Seleccione la hora"
                    label="Hora"
                    selectList={appointmentTimes}
                  />
                </div>

                <CustomInput
                  type="textarea"
                  control={form.control}
                  name="note"
                  placeholder="Nota adicional"
                  label="Nota adicional"
                />

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full"
                >
                  Guardar
                </Button>
              </form>
            </Form>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

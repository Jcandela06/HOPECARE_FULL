"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createNewPatient, updatePatient } from "@/app/actions/patient";
import { PatientFormSchema } from "@/lib/schema";
import { GENDER, MARITAL_STATUS, RELATION } from "@/utils";
import { Doctor, Patient } from "@prisma/client";
import { CustomInput } from "../custom-inputs";
import { ImageUploader } from "../image-uploader";
import { ProfileImage } from "../profile-image";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DataProps {
  data?: Patient;
  type: "create" | "update";
  physiciansData: Doctor[];
}

type M_STATUS = "casado" | "soltero" | "divorciado" | "viudo" | "separado";
type RELATION_TYPE = "madre" | "padre" | "esposo" | "esposa" | "otro";

export const NewPatientForm = ({ data, type, physiciansData }: DataProps) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [imgURL, setImgURL] = useState<any>();

  const userData = {
    first_name: user?.firstName! || "",
    last_name: user?.lastName! || "",
    email: user?.emailAddresses[0].emailAddress || "",
    phone: user?.phoneNumbers.toString() || "",
  };

  const userId = user?.id;

  const form = useForm<z.infer<typeof PatientFormSchema>>({
    resolver: zodResolver(PatientFormSchema),
    defaultValues: {
      ...userData,
      date_of_birth: new Date().toISOString().split("T")[0],
      gender: "MALE",
      marital_status: "soltero" as M_STATUS,
      address: "",
      emergency_contact_name: "",
      emergency_contact_number: "",
      relation: "madre" as RELATION_TYPE,
      blood_group: "",
      allergies: "",
      medical_conditions: "",
      medical_history: "",
      insurance_provider: "",
      insurance_number: "",
      primaryPhysician: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof PatientFormSchema>> = async (
    values
  ) => {
    setLoading(true);
    const res =
      type === "create"
        ? await createNewPatient(
            { ...values, img: imgURL?.secure_url || "" },
            userId!
          )
        : await updatePatient(
            { ...values, img: imgURL?.secure_url || "" },
            userId!
          );

    setLoading(false);
    if (res?.success) {
      toast.success(res?.msg);
      form.reset();
      router.push("/");
    } else {
      console.log(res);
      toast.error("Error al registrarse, Inténtalo nuevamente.");
    }
  };

  useEffect(() => {
    if (type === "create") {
      userData && form.reset({ ...userData });
    } else if (type === "update") {
      data &&
        form.reset({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          date_of_birth: new Date(data.date_of_birth)
            .toISOString()
            .split("T")[0],
          gender: data.gender,
          marital_status: data.marital_status as M_STATUS,
          address: data.address,
          emergency_contact_name: data.emergency_contact_name,
          emergency_contact_number: data.emergency_contact_number,
          relation: data.relation as RELATION_TYPE,
          blood_group: data?.blood_group!,
          allergies: data?.allergies! || "",
          medical_conditions: data?.medical_conditions! || "",
          medical_history: data?.medical_history! || "",
          insurance_number: data.insurance_number! || "",
          insurance_provider: data.insurance_provider! || "",
          medical_consent: data.medical_consent,
          privacy_consent: data.privacy_consent,
          service_consent: data.service_consent,
        });
    }
  }, [user]);

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Registro de pacientes</CardTitle>
        <CardDescription>
          Proporcione toda la información a continuación para ayudarnos a comprender mejor
          y brindarle un servicio bueno y de calidad.
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <h3 className="text-lg font-semibold">Información personal</h3>
            <>
              {/* PROFILE IMAGE */}

              <ImageUploader
                imgURL={imgURL?.secure_url || data?.img}
                setImgURL={setImgURL}
              />
              <div className="flex flex-col lg:flex-row  gap-y-6 items-center gap-2 md:gap-x-4">
                <CustomInput
                  type="input"
                  control={form.control}
                  name="first_name"
                  placeholder="John"
                  label="Nombre de pila"
                />
                <CustomInput
                  type="input"
                  control={form.control}
                  name="last_name"
                  placeholder="Doe"
                  label="Apellido"
                />
              </div>
              <CustomInput
                type="input"
                control={form.control}
                name="email"
                placeholder="john@example.com"
                label="Email"
              />
              <div className="flex flex-col lg:flex-row  gap-y-6 items-center gap-2 md:gap-x-4">
                <CustomInput
                  type="select"
                  control={form.control}
                  name="gender"
                  placeholder="Seleccione género"
                  label="Género"
                  selectList={GENDER!}
                />
                <CustomInput
                  type="input"
                  control={form.control}
                  name="date_of_birth"
                  placeholder="01-05-2000"
                  label="Fecha de nacimiento"
                  inputType="date"
                />
              </div>
              <div className="flex flex-col lg:flex-row  gap-y-6 items-center gap-2 md:gap-x-4">
                <CustomInput
                  type="input"
                  control={form.control}
                  name="phone"
                  placeholder="9225600735"
                  label="Número de contacto"
                />
                <CustomInput
                  type="select"
                  control={form.control}
                  name="marital_status"
                  placeholder="Seleccione estado civil"
                  label="Estado civil"
                  selectList={MARITAL_STATUS!}
                />
              </div>
              <CustomInput
                type="input"
                control={form.control}
                name="address"
                placeholder="1479 Street, Apt 1839-G, NY"
                label="Dirección"
              />
            </>

            <div className="space-y-8">
              <h3 className="text-lg font-semibold">Información familiar</h3>
              <CustomInput
                type="input"
                control={form.control}
                name="emergency_contact_name"
                placeholder="Anne Smith"
                label="Nombre del contacto de emergencia"
              />
              <CustomInput
                type="input"
                control={form.control}
                name="emergency_contact_number"
                placeholder="675444467"
                label="Contacto de emergencia"
              />
              <CustomInput
                type="select"
                control={form.control}
                name="relation"
                placeholder="Seleccione relación con persona de contacto"
                label="Relación"
                selectList={RELATION}
              />
            </div>

            <div className="space-y-8">
              <h3 className="text-lg font-semibold">Información médica</h3>

              <CustomInput
                type="input"
                control={form.control}
                name="blood_group"
                placeholder="A+"
                label="Grupo sanguíneo"
              />
              <CustomInput
                type="input"
                control={form.control}
                name="allergies"
                placeholder="Milk"
                label="Alergias"
              />
              <CustomInput
                type="input"
                control={form.control}
                name="medical_conditions"
                placeholder="Condiciones médicas"
                label="Condiciones médicas"
              />
              <CustomInput
                type="input"
                control={form.control}
                name="medical_history"
                placeholder="Historial médico"
                label="Historial médico"
              />
              <div className="flex flex-col lg:flex-row  gap-y-6 items-center gap-2 md:gap-4">
                <CustomInput
                  type="input"
                  control={form.control}
                  name="insurance_provider"
                  placeholder="Proveedor de seguros"
                  label="Proveedor de seguros"
                />{" "}
                <CustomInput
                  type="input"
                  control={form.control}
                  name="insurance_number"
                  placeholder="Número de seguro"
                  label="Número de seguro"
                />
              </div>
            </div>

            <div>
              <FormField
                control={form.control}
                name="primaryPhysician"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Médico primario</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un médico de cabecera" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="">
                        {physiciansData?.map((i, id) => (
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
                  </FormItem>
                )}
              />
            </div>

            {type !== "update" && (
              <div className="">
                <h3 className="text-lg font-semibold mb-2">Consent</h3>

                <div className="space-y-6">
                  <CustomInput
                    name="privacy_consent"
                    label=" Acuerdo de política de privacidad"
                    placeholder="Doy mi consentimiento para la recopilación, el almacenamiento y el uso de mi
                      información personal y de salud según lo descrito en la Política de
                      Privacidad. Entiendo cómo se utilizarán mis datos, con quiénes pueden
                      compartirse y mis derechos con respecto al acceso, la corrección y la eliminación de mis datos."
                    type="checkbox"
                    control={form.control}
                  />

                  <CustomInput
                    control={form.control}
                    type="checkbox"
                    name="service_consent"
                    label=" Acuerdo de condiciones de servicio"
                    placeholder="Acepto los Términos de servicio, incluidas mis
                    responsabilidades como usuario de este sistema de
                    gestión de atención médica, las limitaciones de responsabilidad y el proceso de
                    resolución de disputas. Entiendo que el uso continuo de este servicio depende de mi cumplimiento de estos 
                    términos."
                  />

                  <CustomInput
                    control={form.control}
                    type="checkbox"
                    name="medical_consent"
                    label="Consentimiento informado para tratamiento médico"
                    placeholder="Doy mi consentimiento informado para recibir tratamiento
                    y servicios médicos a través de este sistema de gestión de atención médica. Reconozco que he sido informado sobre la naturaleza,
                    los riesgos, los beneficios y las alternativas de los tratamientos propuestos y que tengo derecho a hacer preguntas y
                    recibir más información antes de continuar."
                  />
                </div>
              </div>
            )}

            <Button
              disabled={loading}
              type="submit"
              className="w-full md:w-fit px-6"
            >
              {type === "create" ? "Submit" : "Update"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

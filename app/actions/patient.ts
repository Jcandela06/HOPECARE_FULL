"use server";

import { clerkClient } from "@clerk/nextjs/server";

import db from "@/lib/db";
import { PatientFormSchema } from "@/lib/schema";
import { generateRandomColor } from "@/utils";
import { isAuthenticatedUser } from "@/utils/is-authenticated";

export async function createNewPatient(data: any, pid: string) {
  try {
    await isAuthenticatedUser();

    const validateData = PatientFormSchema.safeParse(data);

    if (!validateData.success) {
      return {
        success: false,
        error: true,
        msg: "Proporcione todos los campos obligatorios.",
      };
    }

    const validatedData = validateData.data;
    let patient_id = pid;

    const client = await clerkClient();

    if (pid === "new-patient") {
      const password = validatedData.last_name + "@" + validatedData.phone;

      const user = await client.users.createUser({
        emailAddress: [validatedData.email],
        password: password,
        firstName: validatedData.first_name,
        lastName: validatedData.last_name,
        publicMetadata: { role: "patient" },
      });

      patient_id = user.id;
    } else {
      await client.users.updateUser(pid, {
        publicMetadata: { role: "patient" },
      });
    }
    const colorCode = generateRandomColor();

    await db.patient.create({
      data: {
        id: patient_id,
        first_name: validatedData.first_name,
        last_name: validatedData.last_name,
        date_of_birth: new Date(validatedData.date_of_birth),
        gender: validatedData.gender,
        phone: validatedData.phone,
        email: validatedData.email,
        marital_status: validatedData.marital_status,
        address: validatedData.address,
        emergency_contact_name: validatedData.emergency_contact_name,
        emergency_contact_number: validatedData.emergency_contact_number,
        relation: validatedData.relation,
        blood_group: validatedData.blood_group ?? null,
        allergies: validatedData.allergies ?? null,
        medical_conditions: validatedData.medical_conditions ?? null,
        medical_history: validatedData.medical_history ?? null,
        insurance_provider: validatedData.insurance_provider ?? null,
        insurance_number: validatedData.insurance_number ?? null,
        privacy_consent: validatedData.privacy_consent,
        service_consent: validatedData.service_consent,
        medical_consent: validatedData.medical_consent,
        img: validatedData.img ?? null,
        colorCode: colorCode,
        physician_id: validatedData.primaryPhysician ?? null, // Use physician_id directly
      },
    });

    await db.notification.create({
      data: {
        title: "Bienvenido a bordo",
        message: `Le damos la bienvenida al Sistema de Gestión de Atención Sanitaria Dr. ${validatedData.first_name}  ${validatedData.last_name}.`,
        user_id: patient_id,
      },
    });

    return { success: true, error: false, msg: "Registrado exitosamente" };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: true, msg: error?.message };
  }
}
export async function updatePatient(data: any, pid: string) {
  try {
    await isAuthenticatedUser();

    const validateData = PatientFormSchema.safeParse(data);

    if (!validateData.success) {
      return {
        success: false,
        error: true,
        msg: "Proporcione todos los campos obligatorios.",
      };
    }

    const validatedData = validateData.data;
    const client = await clerkClient();

    await client.users.updateUser(pid, {
      firstName: validatedData.first_name,
      lastName: validatedData.last_name,
    });

    await db.patient.update({
      data: {
        first_name: validatedData.first_name,
        last_name: validatedData.last_name,
        date_of_birth: new Date(validatedData.date_of_birth),
        gender: validatedData.gender,
        phone: validatedData.phone,
        email: validatedData.email,
        marital_status: validatedData.marital_status,
        address: validatedData.address,
        emergency_contact_name: validatedData.emergency_contact_name,
        emergency_contact_number: validatedData.emergency_contact_number,
        relation: validatedData.relation,
        blood_group: validatedData.blood_group ?? null,
        allergies: validatedData.allergies ?? null,
        medical_conditions: validatedData.medical_conditions ?? null,
        medical_history: validatedData.medical_history ?? null,
        insurance_provider: validatedData.insurance_provider ?? null,
        insurance_number: validatedData.insurance_number ?? null,
        privacy_consent: validatedData.privacy_consent,
        service_consent: validatedData.service_consent,
        medical_consent: validatedData.medical_consent,
        img: validatedData.img ?? null,
        physician_id: validatedData.primaryPhysician ?? null, // Use physician_id directly
      },
      where: { id: pid },
    });

    return { success: true, error: false, msg: "Actualizado exitosamente" };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: true, msg: error?.message };
  }
}

export async function updatedPatientMetadata(patientId: string) {
  const client = await clerkClient();

  await client.users.updateUser(patientId, {
    publicMetadata: { role: "patient" },
  });

  return { success: true, message: "Metadatos del paciente actualizados" };
}

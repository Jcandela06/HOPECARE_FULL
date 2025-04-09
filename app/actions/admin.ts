"use server";

import { redirect } from "next/navigation";

import db from "@/lib/db";
import { ServicesSchema } from "@/lib/schema";
import { isAuthenticatedUser } from "@/utils/is-authenticated";

export async function addNewService(data: any) {
  try {
    const session = await isAuthenticatedUser();

    if (!session) redirect("/sign-in");

    if (session?.role !== "ADMIN" && session?.role !== "LABORATORY")
      return { success: false, error: true, message: "Unauthorized access" };

    const isValidData = ServicesSchema.safeParse(data);

    const validatedData = isValidData.data;

    await db.services.create({
      data: {
        ...validatedData!,
        price: Number(data.price),
        tat: Number(data.tat),
        department: data?.department,
      },
    });

    return {
      success: true,
      error: false,
      message: `Servicio añadido exitosamente`,
    };
  } catch (error) {
    console.log(error);
    return { success: false, msg: "Error Interno del Servidor" };
  }
}

export async function updateService(data: any, id: number) {
  try {
    const session = await isAuthenticatedUser();
    if (!session) redirect("/sign-in");

    if (session.role !== "ADMIN" && session.role !== "LABORATORY")
      return { success: false, error: true, message: "Acceso no autorizado" };

    const isValidData = ServicesSchema.safeParse(data);

    const validatedData = isValidData.data;

    await db.services.update({
      where: { id },
      data: {
        ...validatedData!,
        price: Number(data.price),
        tat: Number(data.tat),
        department: data?.department,
      },
    });

    return {
      success: true,
      error: false,
      message: `Actualización del servicio exitosa`,
    };
  } catch (error) {
    console.log(error);
    return { success: false, msg: "Error Interno del Servidor" };
  }
}

"use server";

import db from "@/lib/db";
import { DoctorSchema, WorkingDaysSchema } from "@/lib/schema";
import { generateRandomColor } from "@/utils";
import { checkRole } from "@/utils/roles";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const createDoctor = async (data: any) => {
  try {
    const { userId } = await auth();
    const isAdmin = await checkRole("ADMIN");

    if (!userId && !isAdmin) {
      throw new Error("Unauthorized user");
    }

    const values = DoctorSchema.safeParse(data);
    const workdaysValues = WorkingDaysSchema.safeParse(data?.work_schedule);

    if (!values.success || !workdaysValues.success) {
      return { success: false, error: true, msg: "Provide all fields." };
    }

    const validatedData = values?.data;

    const client = await clerkClient();

    const user = await client.users.createUser({
      emailAddress: [validatedData.email],
      password: validatedData.password,
      firstName: validatedData.name.split(" ")[0],
      lastName: validatedData.name.split(" ")[1],
      publicMetadata: { role: "doctor" },
    });

    delete validatedData["password"];

    const doctor = await db.doctor.create({
      data: {
        ...validatedData,
        colorCode: generateRandomColor(),
        id: user.id,
      },
    });

    const workDaysValidatedData = workdaysValues.data!;

    await Promise.all(
      workDaysValidatedData.map((el) =>
        db.workingDays.create({
          data: { ...el, doctor_id: doctor.id },
        })
      )
    );

    await db.notification.create({
      data: {
        title: "Bienvenido a bordo",
        message: `Le damos la bienvenida al Sistema de Gestión de Atención Sanitaria Dr. ${validatedData.name}.`,
        user_id: user.id,
      },
    });

    return { success: true, error: false, msg: "Doctor añadido exitosamente" };
  } catch (error: any) {
    console.log(error);
    return { success: false, error: true, msg: error?.message };
  }
};

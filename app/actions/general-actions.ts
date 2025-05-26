"use server";

import db from "@/lib/db";
import { DeleteType } from "@/types";
import { isAuthenticatedUser } from "@/utils/is-authenticated";
import { getRole } from "@/utils/roles";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";

export async function deleteDataById(id: string, type: DeleteType) {
  try {
    const session = await isAuthenticatedUser();

    if (session.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    switch (type) {
      case "doctor":
        await db.doctor.delete({ where: { id } });
        break;
      case "staff":
        await db.staff.delete({ where: { id } });
        break;
      case "patient":
        await db.patient.delete({ where: { id } });
        break;
      case "auditLog":
        await db.auditLog.delete({ where: { id: Number(id) } });
        break;
      case "bill":
        await db.patientBills.delete({ where: { id: Number(id) } });
        break;
      case "payment":
        await db.payment.delete({ where: { id: Number(id) } });
        break;
      case "service":
        await db.services.delete({ where: { id: Number(id) } });
        break;
      case "vital_signs":
        await db.vitalSigns.delete({ where: { id: Number(id) } });
        break;
      case "diagnosis":
        const checkPresStatus = await db.prescription.findFirst({
          where: { diagnosisId: Number(id) },
        });
        if (checkPresStatus?.status === "COMPLETED") {
          return {
            success: false,
            message:
              "Las prescripciones de este diagnóstico han sido atendidas y no se pueden eliminar.",
          };
        }
        await db.diagnosis.delete({ where: { id: Number(id) } });
        break;
      case "drug":
        await db.drug.delete({ where: { id: String(id) } });
        break;
      default:
        break;
    }

    if (type === "patient" || type === "staff" || type === "doctor") {
      const client = await clerkClient();
      await client.users.deleteUser(id);
    }

    return { success: true, message: "Datos eliminados exitosamente" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error" };
  }
}

export const addReview = async (data: any) => {
  try {
    await isAuthenticatedUser();

    await db.rating.create({
      data: {
        ...data,
      },
    });

    return { success: true, error: false, msg: "Reseña agregada exitosamente" };
  } catch (error: any) {
    console.log(error);
    return { success: false, error: true, msg: error?.message };
  }
};

export const markRead = async (userId: string, id?: number) => {
  try {
    await isAuthenticatedUser();

    if (id) {
      await db.notification.update({
        where: { id: Number(id) },
        data: { isRead: true },
      });
    } else {
      await db.notification.updateMany({
        where: { user_id: userId },
        data: { isRead: true },
      });
    }

    return { success: true, error: false, msg: "Marcar como leído exitosamente." };
  } catch (error: any) {
    console.log(error);
    return { success: false, error: true, msg: error?.message };
  }
};

export const checkAndAddNewUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { message: "Usuario no autorizado" };
    }

    const userExist = await db.user.findUnique({
      where: { id: user?.id },
    });

    if (userExist) {
      if (
        userExist.lastLogin.toISOString().slice(0, 10) ===
        new Date().toISOString().slice(0, 10)
      )
        return;

      await db.user.update({
        where: { id: user?.id },
        data: { lastLogin: new Date() },
      });
    } else {
      const role = await getRole();

      await db.user.create({
        data: {
          id: user?.id!,
          email: user?.emailAddresses[0].emailAddress!,
          name: user?.firstName + " " + user?.lastName,
          role: role.toUpperCase() as Role,
          lastLogin: new Date(),
        },
      });
    }
    return { message: "done" };
  } catch (error: any) {
    console.log(error);
    return { success: false, error: true, msg: error?.message };
  }
};

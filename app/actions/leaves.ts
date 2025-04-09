"use server";

import { auth } from "@clerk/nextjs/server";

import db from "@/lib/db";
import { isAuthenticatedUser } from "@/utils/is-authenticated";
import { LeaveStatus, LeaveType } from "@prisma/client";

interface LeaveTypes {
  type: LeaveType;
  startDate: Date;
  endDate: Date;
  reason: string;
}
export const requestLeave = async (data: LeaveTypes) => {
  try {
    await isAuthenticatedUser();

    const { type, reason, startDate, endDate } = data;
    if (!reason || !type || !startDate || !endDate)
      return {
        success: false,
        error: true,
        message: "Todos los campos son obligatorios",
      };

    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const res = await db.leave.create({
      data: {
        ...data,
        userId: userId!,
      },
    });

    return {
      success: true,
      error: false,
      message: "Dejar aplicada con éxito.",
    };
  } catch (error: any) {
    console.log(error);
    return { success: false, error: true, message: error?.message };
  }
};

export const leaveAction = async ({
  id,
  rejectionReason,
  status,
  modifiedStartDate,
  modifiedEndDate,
}: {
  rejectionReason?: string;
  status: LeaveStatus;
  id: number;
  modifiedStartDate?: Date;
  modifiedEndDate?: Date;
}) => {
  try {
    const session = await isAuthenticatedUser();

    if (session.role !== "ADMIN") {
      throw new Error("Only admin can perform this action");
    }

    await db.leave.update({
      where: { id: Number(id) },
      data: {
        status,
        rejectionReason,
        modifiedStartDate,
        modifiedEndDate,
      },
    });
    return { success: true, error: false, message: `Leave has been ${status}` };
  } catch (error: any) {
    console.log(error);
    return { success: false, error: true, msg: error?.message };
  }
};

import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function fetUserNotifications(userId: string, perPage?: number) {
  try {
    const data = await db.notification.findMany({
      where: { user_id: userId },
      take: perPage || undefined,
      orderBy: { created_at: "desc" },
    });

    if (!data) {
      return {
        success: false,
        message: "Data not found",
        status: 404,
        data: [],
      };
    }

    return {
      success: true,
      data,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error", status: 500 };
  }
}

export const getNotification = async () => {
  try {
    const { userId } = await auth();

    if (!userId) return { message: "Unauthorized", status: 404 };

    const data = await db.notification.findMany({
      where: { user_id: userId!, isRead: false },
      take: 5,
      orderBy: { created_at: "desc" },
    });

    console.log(data);

    return {
      data,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: true,
      message: "Something went wrong",
    };
  }
};

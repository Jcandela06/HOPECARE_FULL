import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const isAuthenticatedUser = async () => {
  const user = await auth();

  const { sessionClaims, userId } = user;

  const role = sessionClaims?.metadata.role;

  if (!userId) redirect("/sign-in");

  return { user, userId, role: role?.toUpperCase() };
};

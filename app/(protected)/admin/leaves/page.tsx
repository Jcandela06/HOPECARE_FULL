import { LeaveList } from "@/components/leaves-list";
import db from "@/lib/db";
import { isAuthenticatedUser } from "@/utils/is-authenticated";

const LeavesManagement = async () => {
  await isAuthenticatedUser();

  const data = await db.leave.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!data) return null;

  return <LeaveList data={data} />;
};

export default LeavesManagement;

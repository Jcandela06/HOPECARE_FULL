import { UserButton } from "@clerk/nextjs";

import { GetLabel } from "./get-label";
import { NotificationPanel } from "./notification-panel";
import { ThemeToggle } from "./theme-switcher";

export const Navbar = async () => {
  return (
    <div className="px-5 pt-5  flex justify-between">
      <GetLabel />
      <div className="flex items-center gap-4">
        <NotificationPanel />
        <ThemeToggle />
        <UserButton />
      </div>
    </div>
  );
};

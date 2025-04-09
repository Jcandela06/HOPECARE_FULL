import { PopoverClose } from "@radix-ui/react-popover";
import { formatDistanceToNow } from "date-fns";
import { Bell } from "lucide-react";
import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { getNotification } from "@/utils/services/generaal-services";

export const NotificationPanel = async () => {
  const { data } = await getNotification();

  if (!data) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
          <Bell className="h-5 w-5" />
          {data?.length > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white animate-pulse">
              {data?.length}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2" align="end">
        <div className="flex flex-col">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-semibold">Notificaciones</h3>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {data?.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No hay notificaciones todavía
              </div>
            ) : (
              data?.map((notification) => (
                <button
                  key={notification.id}
                  className={cn(
                    "w-full px-4 py-3 flex flex-col gap-1 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
                    !notification.isRead && "bg-blue-600/10"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm line-clamp-1 flex-1">
                      {notification.title}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(notification?.created_at, {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {notification.message}
                  </p>
                </button>
              ))
            )}
          </div>
          {data?.length > 0 && (
            <div className="border-t border-border p-4">
              <PopoverClose asChild className="text-xs hover:underline">
                <Link href="/notifications">Ver todo</Link>
              </PopoverClose>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

"use client";

import { format, formatDistanceToNow } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { markRead } from "@/app/actions/general-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Notification } from "@prisma/client";

import { Card } from "./ui/card";

export const NotificationContainer = ({ data }: { data: Notification[] }) => {
  const router = useRouter();
  const [filter, setFilter] = useState<"Todo" | "Leído" | "No leído">("Todo");
  const [notifications, setNotifications] = useState<Notification[]>(data);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "Leído") return notification?.isRead;
    if (filter === "No leído") return !notification?.isRead;
    return true;
  });

  const handleNotificationClick = async (notification: Notification) => {
    setSelectedNotification(notification);
    setIsDialogOpen(true);
    notification?.isRead === false &&
      (await markRead(notification?.user_id, notification?.id));

    router.refresh();
  };

  return (
    <Card className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 md:h-5 h-4 md:w-5" />
            </Button>
            <h1 className="text-base md:text-2xl font-semibold">
              Notificaciones
            </h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === "Todo" ? "default" : "outline"}
              onClick={() => setFilter("Todo")}
              className="text-xs md:text-sm"
            >
              Todo
            </Button>
            <Button
              variant={filter === "No leído" ? "default" : "outline"}
              onClick={() => setFilter("No leído")}
              className="text-xs md:text-sm"
            >
              No leído
            </Button>
            <Button
              variant={filter === "Leído" ? "default" : "outline"}
              onClick={() => setFilter("Leído")}
              className="text-xs md:text-sm"
            >
              Leído
            </Button>
          </div>
        </div>

        <div className="rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Tiempo</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications?.map((notification) => (
                <TableRow
                  key={notification.id}
                  className={`${
                    !notification.isRead ? "bg-blue-50/50 dark:bg-gray-900" : ""
                  } cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <TableCell className="font-medium max-w-1/3 w-1/3">
                    {notification.title}
                  </TableCell>
                  <TableCell>{notification?.message}</TableCell>
                  <TableCell>
                    {formatDistanceToNow(notification?.created_at, {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        notification?.isRead
                          ? "bg-gray-100 text-gray-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {notification?.isRead ? "Leído" : "No Leído"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {selectedNotification?.title}
            </DialogTitle>
            <div>
              <div className="mt-4 space-y-4">
                <p className="text-gray-700">{selectedNotification?.message}</p>
                <p className="text-sm text-gray-500">
                  {selectedNotification
                    ? format(
                        selectedNotification?.created_at,
                        "yyyy-MM-dd HH:mm:ss"
                      )
                    : "N/A"}
                </p>
                {/* <div className="text-sm">
                  Status:{" "}
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedNotification?.isRead
                        ? "bg-gray-100 text-gray-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {selectedNotification?.isRead ? "Read" : "Unread"}
                  </span>
                </div> */}
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

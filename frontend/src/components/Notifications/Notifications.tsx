import React from "react";

import { useNotificationStore } from "@/hooks/useNotificationStore";

import { Notification } from "./Notification";


export const Notifications = (): React.ReactElement => {
  const { notifications, dismissNotification } = useNotificationStore();

  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 z-50 flex flex-col items-end px-4 py-6 space-y-4 pointer-events-none sm:p-6 sm:items-start"
    >
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={dismissNotification}
        />
      ))}
    </div>
  );
};

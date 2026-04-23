"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Bell, CheckCircle, Info, X } from "lucide-react";
import type { Notification, NotificationIcon } from "@/types/supabase";
import Container from "../layout/container";

interface NotificationCarouselProps {
  readonly notifications: Notification[];
  readonly onClose?: () => void;
}

function renderIcon(iconName: NotificationIcon, size: number = 20) {
  const className = "h-5 w-5 flex text-white";

  switch (iconName) {
    case "success":
      return <CheckCircle size={size} className={className} />;
    case "warning":
      return <AlertCircle size={size} className={className} />;
    case "alert":
      return <Bell size={size} className={className} />;
    case "info":
    default:
      return <Info size={size} className={className} />;
  }
}

export default function NotificationCarousel({
  notifications,
  onClose,
}: NotificationCarouselProps) {
  // ALL HOOKS FIRST - NO EARLY RETURNS BEFORE THIS
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleNotifications = useMemo(
    () => notifications || [],
    [notifications],
  );

  useEffect(() => {
    if (visibleNotifications.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex(
        (previousIndex) => (previousIndex + 1) % visibleNotifications.length,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [visibleNotifications.length]);

  // GUARD CLAUSES AFTER ALL HOOKS
  if (!notifications || notifications.length === 0) {
    return null;
  }

  if (visibleNotifications.length === 0) {
    return null;
  }

  const activeIndex = currentIndex % visibleNotifications.length;
  const currentNotification = visibleNotifications[activeIndex];

  const handleClose = () => {
    onClose?.();
  };

  return (
    <section
      className="flex items-center justify-between gap-4 bg-gray-900 px-4 py-3 text-white"
      aria-live="polite"
      aria-atomic="true"
    >
      <Container>
        <div className="flex row-auto w-full items-center justify-center">
          <div className="flex row-auto w-full items-center gap-3  px-4 py-2">
            {renderIcon(currentNotification.icon, 20)}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">
                {currentNotification.title}
              </p>
              <p className="text-xs text-gray-300">
                {currentNotification.message}
              </p>
            </div>
            {currentNotification.action_label &&
              currentNotification.action_url && (
                <a
                  href={currentNotification.action_url}
                  className="whitespace-nowrap rounded bg-gray-700 px-3 py-1 text-xs font-semibold text-white transition hover:bg-gray-200"
                >
                  {currentNotification.action_label}
                </a>
              )}
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded p-1 transition hover:bg-gray-800"
            aria-label="Close notification"
          >
            <X size={18} />
          </button>
        </div>
      </Container>
    </section>
  );
}

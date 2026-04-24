'use client';

import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, Bell, CheckCircle, Info, X } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import type { Notification, NotificationIcon } from '@/types/supabase';
import Container from '../layout/container';

interface NotificationCarouselProps {
  readonly notifications: Notification[];
  readonly onClose?: () => void;
}

interface IconComponentProps {
  readonly iconName: NotificationIcon;
  readonly size?: number;
  readonly isDark?: boolean;
}

function IconComponent({
  iconName,
  size = 20,
  isDark = false,
}: IconComponentProps) {
  const className = isDark
    ? 'h-5 w-5 flex-shrink-0 text-white'
    : 'h-5 w-5 flex-shrink-0 text-gray-600';

  switch (iconName) {
    case 'success':
      return <CheckCircle size={size} className={className} />;
    case 'warning':
      return <AlertCircle size={size} className={className} />;
    case 'alert':
      return <Bell size={size} className={className} />;
    case 'info':
    default:
      return <Info size={size} className={className} />;
  }
}

export default function NotificationCarousel({
  notifications,
  onClose,
}: NotificationCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const visibleNotifications = useMemo(
    () => notifications || [],
    [notifications]
  );

  useEffect(() => {
    if (globalThis.window === undefined) return;

    const checkMobile = () => {
      const mobile = globalThis.window.innerWidth < 768;
      setIsMobile(mobile);
      setIsDrawerOpen(mobile);
    };

    checkMobile();
    globalThis.window.addEventListener('resize', checkMobile);
    return () =>
      globalThis.window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (visibleNotifications.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex(
        (previousIndex) =>
          (previousIndex + 1) % visibleNotifications.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [visibleNotifications.length]);

  if (
    !notifications ||
    notifications.length === 0 ||
    visibleNotifications.length === 0
  ) {
    return null;
  }

  const activeIndex = currentIndex % visibleNotifications.length;
  const currentNotification = visibleNotifications[activeIndex];

  const handleClose = () => {
    setIsDrawerOpen(false);
    onClose?.();
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    onClose?.();
  };

  return (
    <>
      {!isMobile && (
        <section
          className="flex items-center justify-between h-16 bg-black px-4 py-3 text-white"
          aria-live="polite"
          aria-atomic="true"
        >
          <Container>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <IconComponent
                  iconName={currentNotification.icon}
                  size={20}
                  isDark={true}
                />
                <div className="flex flex-col">
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
                    className="whitespace-nowrap rounded bg-white px-3 py-1 text-xs font-semibold text-black transition hover:bg-gray-200"
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
      )}

      {isMobile && (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent className="bg-white" aria-describedby="drawer-description">
            <DrawerHeader className="relative border-b border-gray-200">
              <DrawerTitle>What&apos;s New</DrawerTitle>
              <p id="drawer-description" className="sr-only">
                View all notifications
              </p>
              <DrawerClose asChild>
                <button
                  onClick={handleDrawerClose}
                  className="absolute right-4 top-4 rounded p-1 text-gray-600 hover:bg-gray-100"
                  aria-label="Close drawer"
                >
                  <X size={20} />
                </button>
              </DrawerClose>
            </DrawerHeader>

            <div className="max-h-[60vh] overflow-y-auto">
              {visibleNotifications.map((notification, index) => (
                <div key={notification.id}>
                  <div className="px-4 py-4">
                    <div className="flex gap-3">
                      <div className="shrink-0 pt-1">
                        <IconComponent
                          iconName={notification.icon}
                          size={20}
                          isDark={false}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {notification.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {notification.message}
                        </p>

                        {notification.action_label &&
                          notification.action_url && (
                            <div className="mt-3">
                              <a
                                href={notification.action_url}
                                className="inline-block rounded bg-gray-800 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-700"
                              >
                                {notification.action_label}
                              </a>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  {index < visibleNotifications.length - 1 && (
                    <div className="border-b border-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
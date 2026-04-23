'use client';

import { useCallback, useState } from 'react';

export function useClosedNotifications() {
  const [closedIds, setClosedIds] = useState<Set<string>>(new Set());

  const closeNotification = useCallback((id: string | number) => {
    const idStr = String(id);
    setClosedIds((prev) => {
      const updated = new Set(prev);
      updated.add(idStr);
      return updated;
    });
  }, []);

  const isNotificationClosed = useCallback(
    (id: string | number) => {
      return closedIds.has(String(id));
    },
    [closedIds]
  );

  return { closeNotification, isNotificationClosed };
}
'use client';

import { useEffect, useState } from 'react';
import { getNotifications } from '@/lib/notifications';
import type { Notification } from '@/types/supabase';

interface UseNotificationsOptions {
  initialNotifications?: Notification[];
}

export function useNotifications(
  options: UseNotificationsOptions = {}
) {
  const initialNotifications = options.initialNotifications ?? [];

  const [notifications, setNotifications] = useState<Notification[]>(
    initialNotifications
  );
  const [loading, setLoading] = useState(initialNotifications.length === 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchNotifications = async () => {
      try {
        if (initialNotifications.length === 0) {
          setLoading(true);
        }

        const data = await getNotifications({
          signal: abortController.signal,
          source: 'client',
        });

        if (abortController.signal.aborted) {
          return;
        }

        setNotifications(data);
        setError(null);
      } catch (error) {
        if (abortController.signal.aborted) {
          return;
        }

        setError('Failed to load notifications');
        console.error('Failed to load notifications', error);
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchNotifications();

    return () => {
      abortController.abort();
    };
  }, [initialNotifications.length]);

  return { notifications, loading, error };
}

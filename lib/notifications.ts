import { fetchFromAPI } from './api-client';
import type { Notification, NotificationIcon } from '@/types/supabase';

type NotificationPayload = Partial<Notification> & {
  id?: string | number | null;
};

interface GetNotificationsOptions {
  signal?: AbortSignal;
  source?: 'auto' | 'client' | 'server';
}

const VALID_ICONS: NotificationIcon[] = ['info', 'success', 'warning', 'alert'];

function isNotificationIcon(value: unknown): value is NotificationIcon {
  return typeof value === 'string' && VALID_ICONS.includes(value as NotificationIcon);
}

function normalizeNotification(
  notification: NotificationPayload
): Notification | null {
  if (
    notification.id === null ||
    notification.id === undefined ||
    typeof notification.title !== 'string' ||
    typeof notification.message !== 'string'
  ) {
    return null;
  }

  return {
    id: String(notification.id),
    title: notification.title,
    message: notification.message,
    icon: isNotificationIcon(notification.icon) ? notification.icon : 'info',
    action_label:
      typeof notification.action_label === 'string' ? notification.action_label : null,
    action_url:
      typeof notification.action_url === 'string' ? notification.action_url : null,
    order_index:
      typeof notification.order_index === 'number' ? notification.order_index : 0,
    is_active: notification.is_active !== false,
    created_at:
      typeof notification.created_at === 'string'
        ? notification.created_at
        : new Date(0).toISOString(),
  };
}

async function fetchNotificationsFromSupabase(
  signal?: AbortSignal
): Promise<NotificationPayload[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !apiKey) {
    throw new Error('Missing Supabase credentials');
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/notifications?is_active=eq.true&order=order_index.asc`,
    {
      cache: 'no-store',
      signal,
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Supabase notifications request failed (${response.status})`);
  }

  return response.json() as Promise<NotificationPayload[]>;
}

export async function getNotifications(
  options: GetNotificationsOptions = {}
): Promise<Notification[]> {
  const shouldUseServerSource =
    options.source === 'server' ||
    (options.source !== 'client' && typeof globalThis.window === 'undefined');

  const data = shouldUseServerSource
    ? await fetchNotificationsFromSupabase(options.signal)
    : await fetchFromAPI<NotificationPayload[]>('/notifications', {
        signal: options.signal,
      });

  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map(normalizeNotification)
    .filter((notification): notification is Notification => notification !== null)
    .sort((left, right) => left.order_index - right.order_index);
}

export type NotificationIcon = 'info' | 'success' | 'warning' | 'alert';

export interface Notification {
  id: string;
  title: string;
  message: string;
  icon: NotificationIcon;
  action_label: string | null;
  action_url: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      notifications: {
        Row: Notification;
        Insert: {
          id?: string;
          title: string;
          message: string;
          icon?: NotificationIcon;
          action_label?: string | null;
          action_url?: string | null;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>;
      };
    };
  };
}

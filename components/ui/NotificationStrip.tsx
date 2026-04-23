'use client';

import { useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationCarousel from '../sections/NotificationCarousel';

export default function NotificationStrip() {
  const { notifications, loading, error } = useNotifications();
  const [isClosed, setIsClosed] = useState(false);

  if (loading || error || notifications.length === 0 || isClosed) {
    return null;
  }

  const handleCloseStrip = () => {
    setIsClosed(true);
  };

  return (
    <NotificationCarousel 
      notifications={notifications} 
      onClose={handleCloseStrip}
    />
  );
}
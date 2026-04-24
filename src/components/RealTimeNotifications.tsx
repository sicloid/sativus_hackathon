'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function RealTimeNotifications({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<{ id: string, message: string }[]>([]);
  const supabase = createClient();

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel('messages_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.new.is_from_seller) {
            const newNotif = {
              id: payload.new.id,
              message: 'Satıcıdan yeni mesaj: ' + payload.new.content.substring(0, 50) + '...'
            };
            setNotifications(prev => [...prev, newNotif]);
            
            // Otomatik kapanma
            setTimeout(() => {
              setNotifications(prev => prev.filter(n => n.id !== newNotif.id));
            }, 5000);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, supabase]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-4">
      {notifications.map(notif => (
        <div key={notif.id} className="bg-[var(--brutal-yellow)] brutal-border brutal-shadow p-4 max-w-sm flex items-start gap-4">
          <div className="flex-grow">
            <h4 className="font-black uppercase mb-1">YENİ BİLDİRİM!</h4>
            <p className="font-bold text-sm">{notif.message}</p>
          </div>
          <button 
            onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))}
            className="font-black text-xl hover:text-red-600 px-2"
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}

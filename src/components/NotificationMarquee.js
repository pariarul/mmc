'use client';

import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { BellRing, ShieldCheck } from 'lucide-react';
import { useGraphQL } from '@/hooks/useGraphQL';

const fallbackNotifications = [
  { id: '1', title: 'FMG Candidates Verification schedule updated for May-June 2026' },
  { id: '2', title: 'Mandatory KYC details validation initiated for all RMPs in Maharashtra' },
  { id: '3', title: 'Maharashtra Medical Council Elections: Voter registrations list finalized' },
  { id: '4', title: 'Important notification regarding additional qualification degrees verification' },
];

const NOTIFICATIONS_QUERY = `#graphql
  query GetNotifications {
    notifications {
      id
      title
      created_at
    }
  }
`;

export default function NotificationMarquee() {
  const { data, executeQuery } = useGraphQL();

  useEffect(() => {
    executeQuery(NOTIFICATIONS_QUERY).catch((err) => {
      console.warn('Falling back to default notifications due to GraphQL loading: ', err);
    });
  }, [executeQuery]);

  // Memoize notifications mapping list to avoid recalculation on re-renders
  const notifications = useMemo(() => {
    if (data?.notifications && data.notifications.length > 0) {
      return data.notifications;
    }
    return fallbackNotifications;
  }, [data]);

  return (
    <div className="w-full bg-govBlue-100 dark:bg-govBlue-950/80 border-y border-govBlue-200 dark:border-govBlue-900 flex items-center h-11 overflow-hidden transition-colors duration-200">
      {/* Blinking updates badge */}
      <div className="bg-govGold-500 text-govBlue-950 font-black text-[10px] md:text-xs uppercase tracking-wider px-4 py-3 flex items-center gap-1.5 h-full flex-shrink-0 z-10 border-r border-govGold-600/35 relative">
        <BellRing className="w-3.5 h-3.5 animate-bounce text-govBlue-950" />
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
        </span>
        Updates
      </div>

      {/* Ticker marquee box */}
      <div className="marquee-container flex-grow relative w-full h-full flex items-center select-none cursor-pointer">
        <div className="marquee-content flex gap-12 text-xs font-bold text-govBlue-900 dark:text-govBlue-100">
          {/* Double map to ensure seamless looping without blanks */}
          {[...notifications, ...notifications].map((notif, index) => (
            <Link 
              key={`${notif.id}-${index}`}
              href="/notifications" 
              className="hover:text-govGold-600 dark:hover:text-govGold-400 flex items-center gap-2 whitespace-nowrap"
            >
              <ShieldCheck className="w-4 h-4 text-govGold-500" />
              <span>{notif.title}</span>
              <span className="text-govGold-500 text-[10px] bg-govBlue-200/50 dark:bg-govBlue-800/80 px-2 py-0.5 rounded font-extrabold uppercase ml-1">
                New
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

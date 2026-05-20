'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { BellRing, ShieldCheck } from 'lucide-react';

const fallbackNotifications = [
  { id: '1', title: 'FMG Candidates Verification schedule updated for May-June 2026' },
  { id: '2', title: 'Mandatory KYC details validation initiated for all RMPs in Maharashtra' },
  { id: '3', title: 'Maharashtra Medical Council Elections: Voter registrations list finalized' },
  { id: '4', title: 'Important notification regarding additional qualification degrees verification' },
];

export default function NotificationMarquee() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const response = await axios.get('/api/notifications');
        if (response.data?.success && response.data.notifications.length > 0) {
          setNotifications(response.data.notifications);
        } else {
          setNotifications(fallbackNotifications);
        }
      } catch (error) {
        console.error('Error fetching notifications for marquee:', error);
        setNotifications(fallbackNotifications);
      }
    }
    loadNotifications();
  }, []);

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

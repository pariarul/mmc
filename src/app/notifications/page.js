'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell, Calendar, Search } from 'lucide-react';

const fallbackNotifications = [
  { id: '1', title: 'Delayed Verification process of FMG Candidates', description: 'Candidates who have qualified FMG screening exams must submit credential schedules before the due timeline.', created_at: '2026-05-14T00:00:00Z' },
  { id: '2', title: 'Notice: Maharashtra Medical Council General Elections 2026', description: 'Voters registry, constituencies details, and guidelines booklet has been published. Login to search voters list.', created_at: '2026-05-08T00:00:00Z' },
  { id: '3', title: 'Mandatory KYC documentation renewal verification notice', description: 'All active practitioners (RMPs) in Maharashtra must complete digital KYC details matching before the end of the term.', created_at: '2026-05-02T00:00:00Z' },
];

export default function PublicNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const response = await axios.get('/api/notifications');
        if (response.data?.success && response.data.notifications) {
          setNotifications(response.data.notifications);
        } else {
          setNotifications(fallbackNotifications);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setNotifications(fallbackNotifications);
      } finally {
        setLoading(false);
      }
    }
    loadNotifications();
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const filtered = notifications.filter((n) => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full bg-govBlue-50/10 py-12 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex-grow">
      {/* Header Banner */}
      <div className="bg-govBlue-900 text-white rounded-2xl p-8 md:p-10 border border-govGold-600/35 mb-10 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-radial-gradient from-govBlue-800 to-govBlue-950 opacity-60" />
        <div className="relative z-10">
          <span className="text-[10px] sm:text-xs font-bold text-govGold-400 uppercase tracking-widest bg-govBlue-950/80 px-3 py-1.5 rounded-md border border-govGold-600/25">
            Notifications Center
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-4">
            Council Notifications & Press Releases
          </h2>
          <p className="text-xs sm:text-sm text-govBlue-200 mt-2 max-w-2xl font-medium">
            Review the latest administrative circulars, anti-quackery announcements, elections updates, and verification schedules.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white dark:bg-govBlue-900 border border-govBlue-100 dark:border-govBlue-800 rounded-2xl p-6 shadow-xs mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search notifications by keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-govBlue-50/50 dark:bg-govBlue-950 border border-govBlue-200 dark:border-govBlue-800 text-xs rounded-lg py-3.5 pl-10 pr-4 text-govBlue-900 dark:text-govBlue-50 focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500 transition-all"
          />
          <Search className="w-4 h-4 text-govBlue-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
        <p className="text-[11px] font-bold text-govBlue-400 uppercase">
          Total: {filtered.length} Notifications
        </p>
      </div>

      {/* Notifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 text-center py-12 text-sm text-govBlue-400">Loading notifications center...</div>
        ) : filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-govBlue-900 p-6 rounded-2xl border border-govBlue-100 dark:border-govBlue-800 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="flex items-center gap-1.5 text-govBlue-400 dark:text-govBlue-300 text-[10px] font-bold uppercase mb-3">
                  <Calendar className="w-3.5 h-3.5 text-govGold-500" />
                  Published: {formatDate(item.created_at)}
                </span>
                <h4 className="font-extrabold text-sm sm:text-base text-govBlue-900 dark:text-govBlue-50 leading-snug uppercase tracking-tight">
                  {item.title}
                </h4>
                <p className="text-xs leading-relaxed text-govBlue-500 dark:text-govBlue-300 mt-3 pr-2">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-govBlue-50 dark:border-govBlue-800/80 flex items-center gap-1.5 text-[10px] font-bold text-govGold-600 dark:text-govGold-400 uppercase tracking-widest">
                <Bell className="w-3.5 h-3.5 animate-pulse" /> Official MMC Notice
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 bg-white dark:bg-govBlue-900 p-12 rounded-xl border border-govBlue-100 dark:border-govBlue-800 text-center text-govBlue-400">
            No matching notifications found.
          </div>
        )}
      </div>
    </div>
  );
}

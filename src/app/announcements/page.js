'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Download, Calendar, Search } from 'lucide-react';

const fallbackAnnouncements = [
  { id: '1', title: 'FMG Internship Schedule & Guidelines booklet for 2026 batches', file_url: '#', created_at: '2026-05-10T00:00:00Z' },
  { id: '2', title: 'Notification regarding Additional Qualifications verification process', file_url: '#', created_at: '2026-05-05T00:00:00Z' },
  { id: '3', title: 'Official Election Voter List Circular & updates checklist', file_url: '#', created_at: '2026-04-28T00:00:00Z' },
];

export default function PublicAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnnouncements() {
      try {
        const response = await axios.get('/api/announcements');
        if (response.data?.success && response.data.announcements) {
          setAnnouncements(response.data.announcements);
        } else {
          setAnnouncements(fallbackAnnouncements);
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setAnnouncements(fallbackAnnouncements);
      } finally {
        setLoading(false);
      }
    }
    loadAnnouncements();
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const filtered = announcements.filter((a) => 
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full bg-govBlue-50/10 py-12 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex-grow">
      {/* Header Banner */}
      <div className="bg-govBlue-900 text-white rounded-2xl p-8 md:p-10 border border-govGold-600/35 mb-10 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-radial-gradient from-govBlue-800 to-govBlue-950 opacity-60" />
        <div className="relative z-10">
          <span className="text-[10px] sm:text-xs font-bold text-govGold-400 uppercase tracking-widest bg-govBlue-950/80 px-3 py-1.5 rounded-md border border-govGold-600/25">
            Announcements Board
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-4">
            Council Circulars & Public Orders
          </h2>
          <p className="text-xs sm:text-sm text-govBlue-200 mt-2 max-w-2xl font-medium">
            Browse through designated regulatory orders, legal circulars, medical qualifications booklets, and state-wide directives.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white dark:bg-govBlue-900 border border-govBlue-100 dark:border-govBlue-800 rounded-2xl p-6 shadow-xs mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search circulars by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-govBlue-50/50 dark:bg-govBlue-950 border border-govBlue-200 dark:border-govBlue-800 text-xs rounded-lg py-3.5 pl-10 pr-4 text-govBlue-900 dark:text-govBlue-50 focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500 transition-all"
          />
          <Search className="w-4 h-4 text-govBlue-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
        <p className="text-[11px] font-bold text-govBlue-400 uppercase">
          Circulars Found: {filtered.length}
        </p>
      </div>

      {/* Announcements list */}
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="text-center py-12 text-sm text-govBlue-400">Loading circular board...</div>
        ) : filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-govBlue-900 p-5 rounded-xl border border-govBlue-100 dark:border-govBlue-800 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 rounded-lg flex-shrink-0 text-red-600 dark:text-red-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <span className="flex items-center gap-1.5 text-govBlue-400 dark:text-govBlue-300 text-[10px] sm:text-xs font-bold mb-1">
                    <Calendar className="w-3.5 h-3.5 text-govGold-500" />
                    Published: {formatDate(item.created_at)}
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-govBlue-900 dark:text-govBlue-50 leading-snug">
                    {item.title}
                  </h4>
                </div>
              </div>

              <a
                href={item.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-govBlue-100 hover:bg-govGold-500 hover:text-white dark:bg-govBlue-800 p-3 rounded-lg text-govBlue-700 dark:text-govBlue-100 border border-govBlue-200 dark:border-govBlue-700 transition-all font-bold text-xs flex items-center justify-center gap-1.5 flex-shrink-0"
              >
                <Download className="w-4 h-4" /> Download circular PDF
              </a>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-govBlue-900 p-12 rounded-xl border border-govBlue-100 dark:border-govBlue-800 text-center text-govBlue-400">
            No matching circulars or announcements found.
          </div>
        )}
      </div>
    </div>
  );
}

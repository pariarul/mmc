'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Download, FileDown, Search } from 'lucide-react';

const fallbackDownloads = [
  { id: '1', title: 'Form A - Application for Doctor Provisional Registration under MMC Act 1965', file_url: '#' },
  { id: '2', title: 'Form B - Application for registration of Additional Medical Qualifications', file_url: '#' },
  { id: '3', title: 'CPD Credit Guidelines, Webinars syllabus, & Accreditations handbook', file_url: '#' },
  { id: '4', title: 'No Objection Certificate (NOC) Request / Verification transfer forms', file_url: '#' },
];

export default function PublicDownloadsPage() {
  const [downloads, setDownloads] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDownloads() {
      try {
        const response = await axios.get('/api/downloads');
        if (response.data?.success && response.data.downloads) {
          setDownloads(response.data.downloads);
        } else {
          setDownloads(fallbackDownloads);
        }
      } catch (error) {
        console.error('Error fetching downloads:', error);
        setDownloads(fallbackDownloads);
      } finally {
        setLoading(false);
      }
    }
    loadDownloads();
  }, []);

  const filtered = downloads.filter((d) => 
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full bg-govBlue-50/10 py-12 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex-grow">
      {/* Header Banner */}
      <div className="bg-govBlue-900 text-white rounded-2xl p-8 md:p-10 border border-govGold-600/35 mb-10 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-radial-gradient from-govBlue-800 to-govBlue-950 opacity-60" />
        <div className="relative z-10">
          <span className="text-[10px] sm:text-xs font-bold text-govGold-400 uppercase tracking-widest bg-govBlue-950/80 px-3 py-1.5 rounded-md border border-govGold-600/25">
            Downloads Center
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-4">
            Council Document Forms Repository
          </h2>
          <p className="text-xs sm:text-sm text-govBlue-200 mt-2 max-w-2xl font-medium">
            Search, view, and download application forms, licensing guidelines booklets, CCMP syllabus sheets, and certificates requests.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white dark:bg-govBlue-900 border border-govBlue-100 dark:border-govBlue-800 rounded-2xl p-6 shadow-xs mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Type keyword to filter forms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-govBlue-50/50 dark:bg-govBlue-950 border border-govBlue-200 dark:border-govBlue-800 text-xs rounded-lg py-3.5 pl-10 pr-4 text-govBlue-900 dark:text-govBlue-50 focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500 transition-all"
          />
          <Search className="w-4 h-4 text-govBlue-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
        <p className="text-[11px] font-bold text-govBlue-400 uppercase">
          Total Found: {filtered.length} Documents
        </p>
      </div>

      {/* Downloads List */}
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="text-center py-12 text-sm text-govBlue-400">Loading downloads registry...</div>
        ) : filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-govBlue-900 p-5 rounded-xl border border-govBlue-100 dark:border-govBlue-800 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="flex items-start gap-4.5">
                <div className="p-3 rounded-lg bg-govBlue-50 dark:bg-govBlue-850 text-govBlue-700 dark:text-govBlue-100 border border-govBlue-100 dark:border-govBlue-750 flex-shrink-0">
                  <FileDown className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-govBlue-900 dark:text-govBlue-50 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-govBlue-400 dark:text-govBlue-300 font-bold uppercase mt-1">
                    File Type: PDF Circular • Official MMC Certificate
                  </p>
                </div>
              </div>

              <a
                href={item.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-govGold-500 hover:bg-govGold-600 text-white font-extrabold text-xs px-5 py-3 rounded-lg shadow-sm hover:shadow flex items-center justify-center gap-1.5 transition-all uppercase flex-shrink-0"
              >
                <Download className="w-4 h-4" /> Download PDF Form
              </a>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-govBlue-900 p-12 rounded-xl border border-govBlue-100 dark:border-govBlue-800 text-center text-govBlue-400">
            No matching downloads found.
          </div>
        )}
      </div>
    </div>
  );
}

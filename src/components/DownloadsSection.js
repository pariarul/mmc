'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Download, FileDown, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const fallbackDownloads = [
  { id: '1', title: 'Form A - Application for Doctor Provisional Registration under MMC Act 1965', file_url: '#' },
  { id: '2', title: 'Form B - Application for registration of Additional Medical Qualifications', file_url: '#' },
  { id: '3', title: 'CPD Credit Guidelines, Webinars syllabus, & Accreditations handbook', file_url: '#' },
  { id: '4', title: 'No Objection Certificate (NOC) Request / Verification transfer forms', file_url: '#' },
];

export default function DownloadsSection() {
  const [downloads, setDownloads] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadDownloads() {
      try {
        const response = await axios.get('/api/downloads');
        if (response.data?.success && response.data.downloads.length > 0) {
          setDownloads(response.data.downloads.slice(0, 4));
        } else {
          setDownloads(fallbackDownloads);
        }
      } catch (error) {
        console.error('Error fetching downloads:', error);
        setDownloads(fallbackDownloads);
      }
    }
    loadDownloads();
  }, []);

  const filtered = downloads.filter((d) => 
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-12 bg-govBlue-50/50 dark:bg-govBlue-950/40 border-y border-govBlue-100 dark:border-govBlue-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Info & Search Box */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-govGold-600 dark:text-govGold-400 font-extrabold text-xs uppercase tracking-wider mb-2">
            <FileDown className="w-4 h-4" />
            Official Portals Documents
          </div>
          <h3 className="text-xl md:text-2xl font-black text-govBlue-900 dark:text-white uppercase leading-tight">
            Downloads & Forms
          </h3>
          <p className="text-xs md:text-sm text-govBlue-500 dark:text-govBlue-300 leading-relaxed mt-2.5">
            Access the current certified forms, PDF rules checklists, CCMP applications, and election declarations released by the council.
          </p>

          {/* Quick Search */}
          <div className="mt-6 relative">
            <input
              type="text"
              placeholder="Search forms by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-govBlue-900 border border-govBlue-200 dark:border-govBlue-800 text-xs rounded-lg py-3.5 pl-10 pr-4 text-govBlue-900 dark:text-govBlue-50 placeholder-govBlue-400 focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500 transition-all duration-200"
            />
            <Search className="w-4 h-4 text-govBlue-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Right Side: List Grid */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-govBlue-900 p-4 rounded-xl border border-govBlue-100 dark:border-govBlue-800 hover:shadow-md transition-all duration-200 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-govBlue-50 dark:bg-govBlue-800 text-govBlue-700 dark:text-govBlue-100 border border-govBlue-100 dark:border-govBlue-700">
                    <FileDown className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-govBlue-900 dark:text-govBlue-50 leading-snug line-clamp-1 pr-4">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-govBlue-400 dark:text-govBlue-300 font-bold uppercase mt-1">
                      File Format: PDF
                    </p>
                  </div>
                </div>

                <a
                  href={item.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-govGold-500 hover:bg-govGold-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-lg shadow-sm hover:shadow flex items-center gap-1.5 transition-all uppercase"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </a>
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-govBlue-900 p-8 rounded-xl border border-govBlue-100 dark:border-govBlue-800 text-center text-govBlue-400">
              No matching forms or download titles found.
            </div>
          )}

          <div className="mt-2 text-right">
            <Link
              href="/downloads"
              className="inline-flex items-center gap-1 text-xs font-bold text-govGold-600 dark:text-govGold-400 hover:text-govBlue-800 uppercase tracking-widest transition-colors"
            >
              Access All Downloads Desk <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

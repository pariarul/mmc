'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Download, Calendar, ExternalLink, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const fallbackAnnouncements = [
  { id: '1', title: 'Circular regarding FMG internship rotation schedules for 2026', file_url: '#', created_at: '2026-05-10T00:00:00Z' },
  { id: '2', title: 'Mandatory KYC documentation verification deadline extension circular', file_url: '#', created_at: '2026-05-05T00:00:00Z' },
  { id: '3', title: 'Accreditation guidelines for Continuous Medical Education (CME) providers', file_url: '#', created_at: '2026-04-28T00:00:00Z' },
  { id: '4', title: 'Notification on voter list inclusion guidelines for upcoming MMC elections', file_url: '#', created_at: '2026-04-20T00:00:00Z' },
];

export default function ImportantAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    async function loadAnnouncements() {
      try {
        const response = await axios.get('/api/announcements');
        if (response.data?.success && response.data.announcements.length > 0) {
          setAnnouncements(response.data.announcements.slice(0, 4));
        } else {
          setAnnouncements(fallbackAnnouncements);
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setAnnouncements(fallbackAnnouncements);
      }
    }
    loadAnnouncements();
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* 1. Announcements list panel (Left) */}
      <div className="lg:col-span-8 flex flex-col">
        <div className="flex justify-between items-center border-b-2 border-govBlue-800 pb-3 mb-6">
          <h3 className="text-xl md:text-2xl font-black text-govBlue-900 dark:text-white uppercase flex items-center gap-2">
            <span className="w-2.5 h-6 bg-govGold-500 rounded-full" />
            Important Announcements
          </h3>
          <Link 
            href="/announcements" 
            className="text-xs font-bold text-govGold-600 dark:text-govGold-400 hover:text-govBlue-800 flex items-center gap-1 uppercase transition-colors"
          >
            View All <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {announcements.map((item) => (
            <div 
              key={item.id} 
              className="bg-white dark:bg-govBlue-900 p-4.5 rounded-xl border border-govBlue-100 dark:border-govBlue-800 hover:shadow-md transition-all duration-200 flex items-start gap-4"
            >
              <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 rounded-lg flex-shrink-0 text-red-600 dark:text-red-400">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <span className="flex items-center gap-1.5 text-govBlue-400 dark:text-govBlue-300 text-[10px] sm:text-xs font-bold mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Published on: {formatDate(item.created_at)}
                </span>
                <h4 className="text-sm md:text-base font-extrabold text-govBlue-900 dark:text-govBlue-50 hover:text-govGold-600 transition-colors line-clamp-2">
                  {item.title}
                </h4>
              </div>
              <a 
                href={item.file_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="self-center bg-govBlue-100 hover:bg-govGold-500 hover:text-white dark:bg-govBlue-800 p-3 rounded-lg text-govBlue-700 dark:text-govBlue-100 border border-govBlue-200 dark:border-govBlue-700 transition-all duration-200 flex items-center gap-1.5 font-bold text-xs"
                title="Download Attachment (PDF)"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">PDF</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Council Timeline Bulletin panel (Right) */}
      <div className="lg:col-span-4 flex flex-col">
        <div className="bg-govBlue-900 text-white rounded-2xl p-6 border border-govGold-600/35 shadow-xl flex-grow flex flex-col">
          <h3 className="text-lg md:text-xl font-black text-govGold-400 uppercase border-b border-govBlue-800 pb-3 mb-5 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-govGold-500" />
            Quick Guidelines
          </h3>
          <div className="flex-grow flex flex-col gap-4 text-xs">
            <div className="flex gap-3 border-l-2 border-govGold-500 pl-4 py-1">
              <div>
                <span className="text-[10px] text-govGold-400 font-extrabold uppercase">Step 1 • Search</span>
                <p className="font-bold text-govBlue-50 mt-0.5">Enter Doctor Details</p>
                <p className="text-govBlue-300 leading-snug mt-1">Provide the registered Email or Maharashtra Medical Council Registration number to lookup details.</p>
              </div>
            </div>
            
            <div className="flex gap-3 border-l-2 border-govGold-500 pl-4 py-1">
              <div>
                <span className="text-[10px] text-govGold-400 font-extrabold uppercase">Step 2 • Secure OTP</span>
                <p className="font-bold text-govBlue-50 mt-0.5">Verify Registered Email</p>
                <p className="text-govBlue-300 leading-snug mt-1">For safety, a 6-digit verification code is instantly sent to the doctor\'s verified email on record.</p>
              </div>
            </div>

            <div className="flex gap-3 border-l-2 border-govGold-500 pl-4 py-1">
              <div>
                <span className="text-[10px] text-govGold-400 font-extrabold uppercase">Step 3 • View Profile</span>
                <p className="font-bold text-govBlue-50 mt-0.5">Display Secure RMP Dossier</p>
                <p className="text-govBlue-300 leading-snug mt-1">Access the official credential page featuring live verification status, qualifications, valid_upto date, and print exports.</p>
              </div>
            </div>
          </div>
          <Link
            href="/verify-doctor"
            className="mt-6 w-full bg-govGold-500 hover:bg-govGold-600 text-white font-black py-3 rounded-lg text-center uppercase tracking-wider transition-colors shadow-md block text-xs"
          >
            Go to Verification Portal
          </Link>
        </div>
      </div>
    </div>
  );
}

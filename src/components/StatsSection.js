'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, GraduationCap, FileCheck, CheckCircle2, Tv } from 'lucide-react';

const statsConfig = [
  { key: 'totalRmp', label: 'Total Registered (RMP)', icon: <Users className="w-6 h-6" />, fallback: 142050 },
  { key: 'provisional', label: 'Provisional Registrations', icon: <GraduationCap className="w-6 h-6" />, fallback: 12400 },
  { key: 'additionalQualifications', label: 'Additional Qualifications', icon: <FileCheck className="w-6 h-6" />, fallback: 45900 },
  { key: 'cpdApproved', label: 'CPD Credit Approved', icon: <CheckCircle2 className="w-6 h-6" />, fallback: 89430 },
  { key: 'webinarApproved', label: 'Accredited Webinars', icon: <Tv className="w-6 h-6" />, fallback: 1420 },
];

export default function StatsSection() {
  const [data, setData] = useState(null);
  const [displayCounts, setDisplayCounts] = useState({
    totalRmp: 0,
    provisional: 0,
    additionalQualifications: 0,
    cpdApproved: 0,
    webinarApproved: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await axios.get('/api/stats');
        if (response.data?.success && response.data.stats) {
          setData(response.data.stats);
        } else {
          // Use default configuration fallback values
          const defaults = {};
          statsConfig.forEach(s => {
            defaults[s.key] = s.fallback;
          });
          setData(defaults);
        }
      } catch (error) {
        console.error('Error loading stats:', error);
        const defaults = {};
        statsConfig.forEach(s => {
          defaults[s.key] = s.fallback;
        });
        setData(defaults);
      }
    }
    loadStats();
  }, []);

  useEffect(() => {
    if (!data) return;

    // Smooth counter increment animation
    const duration = 1500; // 1.5 seconds
    const steps = 30;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setDisplayCounts((prev) => {
        const next = {};
        Object.keys(data).forEach((key) => {
          const target = data[key];
          const increment = Math.ceil((target / steps) * step);
          next[key] = increment > target ? target : increment;
        });
        return next;
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [data]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <section className="py-12 bg-govBlue-900 text-white border-y border-govGold-500 relative overflow-hidden transition-colors duration-200">
      {/* Background seal watermarks */}
      <div className="absolute inset-0 bg-radial-gradient from-govBlue-800 to-govBlue-950 opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {statsConfig.map((stat) => (
            <div 
              key={stat.key}
              className="bg-govBlue-950/70 border border-govBlue-800 p-6 rounded-2xl flex flex-col items-center text-center shadow-2xl backdrop-blur-md relative overflow-hidden group"
            >
              <div className="w-12 h-12 rounded-full bg-govGold-500 text-govBlue-950 flex items-center justify-center mb-4 border-2 border-white/10 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {formatNumber(displayCounts[stat.key])}+
              </div>
              <div className="text-[11px] font-bold text-govGold-400 uppercase tracking-wider mt-2 max-w-[160px] leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { ShieldCheck, BookOpen, Clock, ShieldAlert } from 'lucide-react';

const guidelines = [
  {
    title: 'RMP Registration Renewal Obligation',
    desc: 'Under the MMC Act, 1965, every registered medical practitioner must renew their license every five (5) years. Applications must be initiated three months prior to the valid_upto date.',
    icon: <Clock className="w-5 h-5 text-govGold-500" />,
  },
  {
    title: 'Continuing Professional Development (CPD)',
    desc: 'Practitioners must secure a minimum of thirty (30) CPD credit hours every five years by attending accredited seminars, workshops, and webinars to remain eligible for registration renewal.',
    icon: <BookOpen className="w-5 h-5 text-govGold-500" />,
  },
  {
    title: 'Code of Medical Ethics & Malpractice',
    desc: 'RMPs are strictly bound by the Indian Medical Council (Professional Conduct, Etiquette and Ethics) Regulations. Violations are subject to disciplinary hearings and temporary/permanent suspension.',
    icon: <ShieldAlert className="w-5 h-5 text-govGold-500" />,
  },
  {
    title: 'Clinical Name Plate KYD Compliance',
    desc: 'All active medical clinics in Maharashtra are mandated to display an official name plate incorporating a secure QR code linking directly to their verified MMC online profile.',
    icon: <ShieldCheck className="w-5 h-5 text-govGold-500" />,
  },
];

export default function InstructionsSection() {
  return (
    <section className="py-12 bg-white dark:bg-govBlue-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h3 className="text-xl md:text-3xl font-black text-govBlue-900 dark:text-white uppercase tracking-tight">
            Statutory Instructions & Code of Conduct
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-govGold-600 dark:text-govGold-400 uppercase tracking-widest mt-2">
            Key Guidelines and Compliance Rules for Maharashtra Medical Practitioners
          </p>
          <div className="w-16 h-1 bg-govGold-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Guidelines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guidelines.map((guide) => (
            <div 
              key={guide.title}
              className="bg-govBlue-50/30 dark:bg-govBlue-900/20 p-6 rounded-2xl border border-govBlue-100/80 dark:border-govBlue-800/40 flex items-start gap-4"
            >
              <div className="p-3 bg-govBlue-50 dark:bg-govBlue-800 text-govGold-500 rounded-xl border border-govBlue-100 dark:border-govBlue-700/80 flex-shrink-0">
                {guide.icon}
              </div>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-govBlue-900 dark:text-govBlue-50 uppercase tracking-tight">
                  {guide.title}
                </h4>
                <p className="text-xs sm:text-sm text-govBlue-500 dark:text-govBlue-300 leading-relaxed mt-2.5">
                  {guide.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

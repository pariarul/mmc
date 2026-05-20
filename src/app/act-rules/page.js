'use client';

import React from 'react';
import { FileText, Download, ShieldCheck, Scale, Award } from 'lucide-react';

const statutes = [
  {
    title: 'Maharashtra Medical Council Act, 1965',
    desc: 'The fundamental legislative act passed by the Maharashtra State Assembly establishing the council and defining registration and ethics compliance directives.',
    pdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    date: '1965 Act No. XLVI',
  },
  {
    title: 'Maharashtra Medical Council Rules, 1967',
    desc: 'Constitutional operational rules detailing executive body elections procedures, tribunal hearings regulations, and register updates schedules.',
    pdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    date: 'Enacted 1967',
  },
  {
    title: 'Code of Medical Ethics & Professional Conduct',
    desc: 'Statutory ethical rules, clinical etiquettes, and standard of duties expected from registered modern medicine practitioners.',
    pdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    date: 'Indian Medical Council Regulations',
  },
  {
    title: 'CCMP Statutory Amendment Act, 2016',
    desc: 'Official legislative amendment enabling registered Homeopathic practitioners in Maharashtra to complete the CCMP course and practice basic Allopathy.',
    pdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    date: 'Amendment 2016',
  },
];

export default function ActRulesPage() {
  return (
    <div className="w-full bg-govBlue-50/10 py-12 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex-grow">
      
      {/* 1. Header Banner */}
      <div className="bg-govBlue-900 text-white rounded-2xl p-8 md:p-10 border border-govGold-600/35 mb-10 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-radial-gradient from-govBlue-800 to-govBlue-950 opacity-60" />
        <div className="relative z-10">
          <span className="text-[10px] sm:text-xs font-bold text-govGold-400 uppercase tracking-widest bg-govBlue-950/80 px-3 py-1.5 rounded-md border border-govGold-600/25">
            Acts, Statutes, and Rules
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-4">
            Council Acts & Ethical Rules
          </h2>
          <p className="text-xs sm:text-sm text-govBlue-200 mt-2 max-w-2xl font-medium">
            Review the legal framework, constitutional amendments, and administrative regulations governing medical licensure in the State of Maharashtra.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Statutes */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex justify-between items-center border-b pb-3 mb-2">
            <h3 className="font-extrabold text-base md:text-lg uppercase text-govBlue-900 dark:text-white flex items-center gap-2">
              <Scale className="w-5.5 h-5.5 text-govGold-500" />
              Statutory Legislation PDF Circulars
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {statutes.map((s) => (
              <div 
                key={s.title}
                className="bg-white dark:bg-govBlue-900 border border-govBlue-100 dark:border-govBlue-800 p-5 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[9px] font-black text-govGold-600 dark:text-govGold-400 bg-govGold-50 dark:bg-govGold-950/20 px-2 py-0.5 rounded uppercase">
                      {s.date}
                    </span>
                    <FileText className="w-5 h-5 text-red-500" />
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-govBlue-900 dark:text-govBlue-50 leading-snug">
                    {s.title}
                  </h4>
                  <p className="text-[11px] leading-relaxed text-govBlue-500 dark:text-govBlue-300 mt-2.5">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-govBlue-50 dark:border-govBlue-800 flex justify-end">
                  <a 
                    href={s.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-govBlue-50 hover:bg-govGold-500 hover:text-white dark:bg-govBlue-800 p-2.5 rounded-lg text-govBlue-850 dark:text-govBlue-100 border border-govBlue-100 dark:border-govBlue-700 transition-all font-bold text-xs flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Act PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Professional conduct summaries */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-govBlue-900 border border-govBlue-100 dark:border-govBlue-800 rounded-2xl p-6 shadow-xs flex flex-col gap-3 text-xs leading-relaxed text-govBlue-500 dark:text-govBlue-300">
            <h3 className="font-extrabold text-sm uppercase text-govBlue-900 dark:text-white border-b pb-2 mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-govGold-500" />
              Ethics Highlights
            </h3>
            <p>
              1. <strong>Mandatory Registry inclusion:</strong> No physician can consult, dispense medicine, or write medical certificates in Maharashtra without active registration in the MMC register.
            </p>
            <p>
              2. <strong>Accredited CME hours:</strong> Renewal is conditionally suspended if the candidate fails to upload certificates proving 30 CPD hours completed.
            </p>
            <p>
              3. <strong>Anti-Quackery audits:</strong> Non-allopathic practitioners writing Allopathy prescriptions without CCMP credentials are subject to prosecution.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { Award, ShieldAlert, BookOpen, Users, Milestone } from 'lucide-react';

const members = [
  { name: 'Dr. Shivkumar S. Utture', role: 'President, Maharashtra Medical Council', qual: 'MS (General Surgery)' },
  { name: 'Dr. Vasantrao G. Pawar', role: 'Vice-President, Maharashtra Medical Council', qual: 'MD (Paediatrics)' },
  { name: 'Dr. Dilip S. Sarda', role: 'Executive Member & Registrar', qual: 'MD (General Medicine)' },
  { name: 'Dr. Anoop S. Deshmukh', role: 'Elected Council Member', qual: 'MS (Orthopaedics)' },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-govBlue-50/10 py-12 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex-grow">
      
      {/* 1. Header Banner */}
      <div className="bg-govBlue-900 text-white rounded-2xl p-8 md:p-10 border border-govGold-600/35 mb-10 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-radial-gradient from-govBlue-800 to-govBlue-950 opacity-60" />
        <div className="relative z-10">
          <span className="text-[10px] sm:text-xs font-bold text-govGold-400 uppercase tracking-widest bg-govBlue-950/80 px-3 py-1.5 rounded-md border border-govGold-600/25">
            About the Council
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-4">
            Constitution & Statutory Objectives
          </h2>
          <p className="text-xs sm:text-sm text-govBlue-200 mt-2 max-w-2xl font-medium">
            Discover the legacy, legal mandates, and organizational structures of the statutory medical licensing authority for the State of Maharashtra.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Columns: Legacy & Objectives */}
        <div className="lg:col-span-8 flex flex-col gap-8 text-sm leading-relaxed text-govBlue-800 dark:text-govBlue-100">
          <div>
            <h3 className="text-lg md:text-xl font-black text-govBlue-900 dark:text-white uppercase flex items-center gap-2 mb-3">
              <Milestone className="w-5 h-5 text-govGold-500" />
              1. Historical Legacy (Established 1965)
            </h3>
            <p>
              The Maharashtra Medical Council is a statutory body established by the Government of Maharashtra under the <strong>Maharashtra Medical Council Act, 1965</strong> (Mah. XLVI of 1965). The council represents the statutory continuation of the former Bombay Medical Council, regulating modern scientific medicine practitioners (Allopathy) across the state.
            </p>
            <p className="mt-3">
              Our central headquarters are situated in Mumbai, handling state-wide registers, continuing medical education guidelines, and disciplinary actions concerning professional ethics and clinical etiquette.
            </p>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-black text-govBlue-900 dark:text-white uppercase flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-govGold-500" />
              2. Core Directives & Mandates
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="bg-white dark:bg-govBlue-900 p-4 rounded-xl border border-govBlue-100 dark:border-govBlue-800 shadow-xs">
                <span className="font-extrabold text-govBlue-900 dark:text-govBlue-50">State Register Registry</span>
                <p className="text-xs text-govBlue-500 dark:text-govBlue-300 mt-1">Maintaining the updated register of practitioners eligible to practice modern scientific medicine in Maharashtra.</p>
              </div>
              <div className="bg-white dark:bg-govBlue-900 p-4 rounded-xl border border-govBlue-100 dark:border-govBlue-800 shadow-xs">
                <span className="font-extrabold text-govBlue-900 dark:text-govBlue-50">CME / CPD Guidelines</span>
                <p className="text-xs text-govBlue-500 dark:text-govBlue-300 mt-1">Accrediting training platforms, webinars, and conferences to mandate thirty (30) credit hours of life education every five years.</p>
              </div>
              <div className="bg-white dark:bg-govBlue-900 p-4 rounded-xl border border-govBlue-100 dark:border-govBlue-800 shadow-xs">
                <span className="font-extrabold text-govBlue-900 dark:text-govBlue-50">Clinical Ethics Auditing</span>
                <p className="text-xs text-govBlue-500 dark:text-govBlue-300 mt-1">Enforcing the code of conduct, auditing complaints, and initiating disciplinary tribunal hearings against malpractice.</p>
              </div>
              <div className="bg-white dark:bg-govBlue-900 p-4 rounded-xl border border-govBlue-100 dark:border-govBlue-800 shadow-xs">
                <span className="font-extrabold text-govBlue-900 dark:text-govBlue-50">FMG Internship Audits</span>
                <p className="text-xs text-govBlue-500 dark:text-govBlue-300 mt-1">Regulating internship rotations and validating degrees of Foreign Medical Graduates undergoing training.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns: Leadership Members */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-govBlue-900 border border-govBlue-100 dark:border-govBlue-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-black text-govBlue-900 dark:text-white uppercase border-b border-govBlue-100 dark:border-govBlue-800 pb-3 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-govGold-500" />
              Executive Members
            </h3>
            
            <div className="flex flex-col gap-4">
              {members.map((m) => (
                <div key={m.name} className="border-b border-govBlue-50 dark:border-govBlue-800/60 pb-3 last:border-b-0 last:pb-0">
                  <h4 className="font-extrabold text-govBlue-900 dark:text-govBlue-50 text-sm leading-snug">{m.name}</h4>
                  <p className="text-[11px] font-bold text-govGold-600 dark:text-govGold-400 mt-0.5 uppercase tracking-wide">{m.role}</p>
                  <p className="text-[10px] text-govBlue-400 dark:text-govBlue-300 mt-0.5">{m.qual}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

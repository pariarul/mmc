'use client';

import React from 'react';
import { BookOpen, User, ShieldCheck, Mail, MapPin } from 'lucide-react';

export default function RtiPage() {
  return (
    <div className="w-full bg-govBlue-50/10 py-12 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex-grow">
      
      {/* 1. Header Banner */}
      <div className="bg-govBlue-900 text-white rounded-2xl p-8 md:p-10 border border-govGold-600/35 mb-10 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-radial-gradient from-govBlue-800 to-govBlue-950 opacity-60" />
        <div className="relative z-10">
          <span className="text-[10px] sm:text-xs font-bold text-govGold-400 uppercase tracking-widest bg-govBlue-950/80 px-3 py-1.5 rounded-md border border-govGold-600/25">
            Right to Information (RTI) Desk
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-4">
            RTI Act, 2005 Statutory Framework
          </h2>
          <p className="text-xs sm:text-sm text-govBlue-200 mt-2 max-w-2xl font-medium">
            Review public information disclosures, designated information officers, appellate procedures, and submission instructions under RTI.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Statutory PIOs */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white dark:bg-govBlue-900 border border-govBlue-100 dark:border-govBlue-800 rounded-2xl p-6 shadow-xs">
            <h3 className="font-extrabold text-base md:text-lg uppercase text-govBlue-900 dark:text-white border-b pb-3 mb-5 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-govGold-500" />
              Designated RTI Officers
            </h3>

            <div className="flex flex-col gap-6">
              {/* FAA */}
              <div className="border-b border-govBlue-100 dark:border-govBlue-800 pb-5">
                <span className="text-[10px] font-bold text-govGold-600 dark:text-govGold-400 bg-govGold-50 dark:bg-govGold-950/20 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  First Appellate Authority (FAA)
                </span>
                <div className="flex items-start gap-3 mt-3.5 text-xs">
                  <User className="w-5 h-5 text-govBlue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-black text-sm text-govBlue-900 dark:text-govBlue-50">Dr. Shivkumar S. Utture</h4>
                    <p className="text-govBlue-400 font-bold uppercase mt-0.5">President, Maharashtra Medical Council</p>
                    <p className="text-govBlue-500 dark:text-govBlue-300 mt-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> Chinchpokli, Arthur Road, Mumbai - 400011
                    </p>
                    <p className="text-govBlue-500 dark:text-govBlue-300 mt-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> president@maharashtramedicalcouncil.in
                    </p>
                  </div>
                </div>
              </div>

              {/* PIO */}
              <div className="border-b border-govBlue-100 dark:border-govBlue-800 pb-5">
                <span className="text-[10px] font-bold text-govGold-600 dark:text-govGold-400 bg-govGold-50 dark:bg-govGold-950/20 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  Public Information Officer (PIO)
                </span>
                <div className="flex items-start gap-3 mt-3.5 text-xs">
                  <User className="w-5 h-5 text-govBlue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-black text-sm text-govBlue-900 dark:text-govBlue-50">Dr. Dilip S. Sarda</h4>
                    <p className="text-govBlue-400 font-bold uppercase mt-0.5">Registrar, Maharashtra Medical Council</p>
                    <p className="text-govBlue-500 dark:text-govBlue-300 mt-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> Chinchpokli, Arthur Road, Mumbai - 400011
                    </p>
                    <p className="text-govBlue-500 dark:text-govBlue-300 mt-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> registrar@maharashtramedicalcouncil.in
                    </p>
                  </div>
                </div>
              </div>

              {/* APIO */}
              <div>
                <span className="text-[10px] font-bold text-govGold-600 dark:text-govGold-400 bg-govGold-50 dark:bg-govGold-950/20 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  Assistant Public Information Officer (APIO)
                </span>
                <div className="flex items-start gap-3 mt-3.5 text-xs">
                  <User className="w-5 h-5 text-govBlue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-black text-sm text-govBlue-900 dark:text-govBlue-50">Shri. R. M. Kadam</h4>
                    <p className="text-govBlue-400 font-bold uppercase mt-0.5">Administrative Officer, MMC Mumbai</p>
                    <p className="text-govBlue-500 dark:text-govBlue-300 mt-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> Chinchpokli, Arthur Road, Mumbai - 400011
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Filing Guidelines */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-govBlue-900 border border-govBlue-100 dark:border-govBlue-800 rounded-2xl p-6 shadow-xs flex flex-col gap-4 text-xs">
            <h3 className="font-extrabold text-sm uppercase text-govBlue-900 dark:text-white border-b pb-2 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-govGold-500" />
              Submission Guidelines
            </h3>
            
            <div className="flex flex-col gap-3 text-govBlue-500 dark:text-govBlue-300 leading-relaxed">
              <div className="flex gap-2">
                <span className="w-5 h-5 rounded-full bg-govBlue-50 dark:bg-govBlue-850 flex items-center justify-center font-bold text-govGold-500 flex-shrink-0">1</span>
                <p>Citizens of India can request information by submitting a written application in Marathi, Hindi, or English.</p>
              </div>

              <div className="flex gap-2">
                <span className="w-5 h-5 rounded-full bg-govBlue-50 dark:bg-govBlue-850 flex items-center justify-center font-bold text-govGold-500 flex-shrink-0">2</span>
                <p>Applications must clearly specify the requested data details and be sent to the designated PIO at Arthur Road, Mumbai.</p>
              </div>

              <div className="flex gap-2">
                <span className="w-5 h-5 rounded-full bg-govBlue-50 dark:bg-govBlue-850 flex items-center justify-center font-bold text-govGold-500 flex-shrink-0">3</span>
                <p>A statutory application fee of ₹10 (Ten Rupees) is payable via Court Fee Stamp, Demand Draft, or IPO drawn in favor of 'Registrar, Maharashtra Medical Council'.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

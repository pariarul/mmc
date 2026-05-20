'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, User, X, Info, HelpCircle } from 'lucide-react';

const districts = [
  { name: 'Mumbai', code: 'MUM', rmpCount: '34,920', office: ' Arthur Road Naka, Chinchpokli (W), Mumbai - 400011', registrar: 'Dr. S. K. Deshmukh', phone: '022-23010660', email: 'registrar.mumbai@mmc.gov.in' },
  { name: 'Pune', code: 'PUN', rmpCount: '21,450', office: 'General Hospital Campus, Near Sassoon, Pune - 411001', registrar: 'Dr. M. R. Patil', phone: '020-26123490', email: 'registrar.pune@mmc.gov.in' },
  { name: 'Nagpur', code: 'NAG', rmpCount: '12,980', office: 'Government Medical College premises, Nagpur - 440003', registrar: 'Dr. V. N. Shendre', phone: '0712-2701290', email: 'registrar.nagpur@mmc.gov.in' },
  { name: 'Nashik', code: 'NAS', rmpCount: '9,810', office: 'Civil Hospital Premises, Trimbak Road, Nashik - 422002', registrar: 'Dr. A. P. Shinde', phone: '0253-2578910', email: 'registrar.nashik@mmc.gov.in' },
  { name: 'Thane', code: 'THA', rmpCount: '15,640', office: 'District Civil Hospital Campus, Court Naka, Thane - 400601', registrar: 'Dr. P. D. Joshi', phone: '022-25345678', email: 'registrar.thane@mmc.gov.in' },
  { name: 'Ahmednagar', code: 'AHM', rmpCount: '7,430', office: 'Civil Hospital Compound, Ahmednagar - 414001', registrar: 'Dr. S. V. Pawar', phone: '0241-2430560', email: 'registrar.ahmednagar@mmc.gov.in' },
  { name: 'Akola', code: 'AKO', rmpCount: '4,890', office: 'Government Medical College premises, Akola - 444001', registrar: 'Dr. R. G. Kale', phone: '0724-2435678', email: 'registrar.akola@mmc.gov.in' },
  { name: 'Amravati', code: 'AMR', rmpCount: '6,210', office: 'Irwin Hospital Campus, Amravati - 444601', registrar: 'Dr. N. T. Deshmukh', phone: '0721-2662345', email: 'registrar.amravati@mmc.gov.in' },
  { name: 'Solapur', code: 'SOL', rmpCount: '7,890', office: 'Civil Hospital Campus, Solapur - 413003', registrar: 'Dr. K. G. Jadhav', phone: '0217-2745670', email: 'registrar.solapur@mmc.gov.in' },
  { name: 'Satara', code: 'SAT', rmpCount: '5,120', office: 'Civil Hospital Compound, Sadar Bazar, Satara - 415001', registrar: 'Dr. Y. B. Mane', phone: '02162-234560', email: 'registrar.satara@mmc.gov.in' },
  { name: 'Raigad', code: 'RAI', rmpCount: '4,230', office: 'Civil Hospital Compound, Alibag, Raigad - 402201', registrar: 'Dr. S. M. Salvi', phone: '02141-222045', email: 'registrar.raigad@mmc.gov.in' },
  { name: 'Kolhapur', code: 'KOL', rmpCount: '8,110', office: 'CPR General Hospital Campus, Kolhapur - 416002', registrar: 'Dr. R. B. Ghule', phone: '0231-2645678', email: 'registrar.kolhapur@mmc.gov.in' },
];

export default function DistrictSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-12 bg-govBlue-50/50 dark:bg-govBlue-950/40 border-y border-govBlue-100 dark:border-govBlue-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 className="text-xl md:text-3xl font-black text-govBlue-900 dark:text-white uppercase tracking-tight">
            District Wise Registries
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-govGold-600 dark:text-govGold-400 uppercase tracking-widest mt-2">
            Click any district to view its official registrar directory
          </p>
          <div className="w-16 h-1 bg-govGold-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* District Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {districts.map((dist, idx) => (
            <motion.button
              key={dist.name}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(dist)}
              className="bg-white dark:bg-govBlue-900 p-4 rounded-xl border border-govBlue-100 dark:border-govBlue-800 text-center shadow-sm hover:shadow-md transition-all duration-200"
            >
              <span className="text-[10px] font-bold text-govGold-600 dark:text-govGold-400 bg-govGold-50 dark:bg-govGold-950/20 px-2 py-0.5 rounded uppercase">
                {dist.code}
              </span>
              <h4 className="font-extrabold text-sm md:text-base text-govBlue-900 dark:text-govBlue-50 mt-2">
                {dist.name}
              </h4>
              <p className="text-[11px] font-medium text-govBlue-400 dark:text-govBlue-300 mt-1">
                {dist.rmpCount} Doctors
              </p>
            </motion.button>
          ))}
        </div>

        {/* Registrar Directory Modal Dialog */}
        <AnimatePresence>
          {selected && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-[9995]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-white dark:bg-govBlue-900 rounded-2xl max-w-md w-full shadow-2xl border border-govGold-500/35 overflow-hidden"
              >
                {/* Modal Header */}
                <div className="bg-govBlue-900 text-white p-5 flex justify-between items-center border-b border-govGold-500/25">
                  <div>
                    <h3 className="font-black text-base md:text-lg uppercase tracking-tight text-govGold-400">
                      {selected.name} Registrar Directory
                    </h3>
                    <p className="text-[10px] text-govBlue-200 font-bold uppercase tracking-wider mt-0.5">
                      Maharashtra Medical Council Regional Hub
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelected(null)}
                    className="p-1 rounded-full bg-govBlue-950 hover:bg-govBlue-800 text-govBlue-200 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 flex flex-col gap-4 text-sm text-govBlue-800 dark:text-govBlue-100">
                  <div className="flex gap-3 bg-govBlue-50 dark:bg-govBlue-950/40 p-3.5 rounded-xl border border-govBlue-100 dark:border-govBlue-800/80">
                    <Info className="w-5 h-5 text-govGold-600 dark:text-govGold-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-extrabold text-govBlue-900 dark:text-govBlue-50">Active RMP Count</p>
                      <p className="text-xs font-semibold text-govGold-600 dark:text-govGold-400 mt-0.5">
                        {selected.rmpCount} Registered Practitioners
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <User className="w-4.5 h-4.5 text-govGold-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-govBlue-400 font-bold uppercase">Regional Registrar</p>
                      <p className="font-extrabold mt-0.5">{selected.registrar}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4.5 h-4.5 text-govGold-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-govBlue-400 font-bold uppercase">Office Address</p>
                      <p className="font-semibold text-xs leading-relaxed mt-0.5">{selected.office}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4.5 h-4.5 text-govGold-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-govBlue-400 font-bold uppercase">Contact Number</p>
                      <p className="font-extrabold mt-0.5">{selected.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4.5 h-4.5 text-govGold-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-govBlue-400 font-bold uppercase">Support Email</p>
                      <p className="font-extrabold mt-0.5 text-govGold-600 dark:text-govGold-400 break-all select-all">
                        {selected.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="bg-govBlue-50 dark:bg-govBlue-950/40 p-4 border-t border-govBlue-100 dark:border-govBlue-800/80 text-center">
                  <button 
                    onClick={() => setSelected(null)}
                    className="bg-govBlue-900 hover:bg-govBlue-950 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-lg transition-colors"
                  >
                    Close Directory
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

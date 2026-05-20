'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserCheck, 
  BookOpen, 
  Globe, 
  AlertOctagon, 
  CreditCard, 
  Printer, 
  FileCheck, 
  CreditCard as OrderIcon, 
  QrCode 
} from 'lucide-react';
import Link from 'next/link';

const services = [
  { 
    title: 'RMP Portal Access', 
    desc: 'Access your practitioner dashboard, check renewal due dates, and update personal profile records.',
    icon: <UserCheck className="w-6 h-6 text-govGold-500" />,
    link: '/admin/login' 
  },
  { 
    title: 'CPD Accreditation', 
    desc: 'Verify CME Credit Points, review the accreditation guidelines handbook, and check cumulative hours.',
    icon: <BookOpen className="w-6 h-6 text-govGold-500" />,
    link: '/rti' 
  },
  { 
    title: 'Online CPD Platform', 
    desc: 'Access the dedicated e-learning portal and registers for upcoming accredited medical council webinars.',
    icon: <Globe className="w-6 h-6 text-govGold-500" />,
    link: '/rti' 
  },
  { 
    title: 'Register Complaint', 
    desc: 'File ethics complaints, track active medical malpractice hearings, or report unethical practices.',
    icon: <AlertOctagon className="w-6 h-6 text-govGold-500" />,
    link: '/contact' 
  },
  { 
    title: 'Online Fee Payment', 
    desc: 'Pay registration, additional qualification, or profile renewal fees securely online using SBI gateway.',
    icon: <CreditCard className="w-6 h-6 text-govGold-500" />,
    link: '/contact' 
  },
  { 
    title: 'ID Card Digital Print', 
    desc: 'Verify your registration credentials through OTP to instantly view and download your verified smart ID Card.',
    icon: <Printer className="w-6 h-6 text-govGold-500" />,
    link: '/verify-doctor' 
  },
  { 
    title: 'CCMP Registration', 
    desc: 'Apply for the Certificate Course in Modern Pharmacology (CCMP) registration and download standard forms.',
    icon: <FileCheck className="w-6 h-6 text-govGold-500" />,
    link: '/downloads' 
  },
  { 
    title: 'Physical ID Card Order', 
    desc: 'Order a physical high-security PVC Smart Card with hologram and embedded RMP verification details.',
    icon: <OrderIcon className="w-6 h-6 text-govGold-500" />,
    link: '/verify-doctor' 
  },
  { 
    title: 'QR Name Plate KYD', 
    desc: 'Generate your official QR-based clinical name plate to meet KYC (Know Your Doctor) compliance standards.',
    icon: <QrCode className="w-6 h-6 text-govGold-500" />,
    link: '/verify-doctor' 
  },
];

export default function RmpServices() {
  return (
    <section className="py-12 bg-white dark:bg-govBlue-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 className="text-xl md:text-3xl font-black text-govBlue-900 dark:text-white uppercase tracking-tight">
            Registered Practitioner (RMP) Services
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-govGold-600 dark:text-govGold-400 uppercase tracking-widest mt-2">
            One-Stop Online Services Desk for Medical Practitioners
          </p>
          <div className="w-16 h-1 bg-govGold-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              whileHover={{ y: -4, shadow: '0 10px 25px -5px rgba(20, 37, 61, 0.1), 0 8px 10px -6px rgba(20, 37, 61, 0.1)' }}
              className="bg-govBlue-50/50 dark:bg-govBlue-900/40 p-6 rounded-2xl border border-govBlue-100 dark:border-govBlue-800/80 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-govGold-500/10 dark:bg-govGold-500/5 flex items-center justify-center border border-govGold-500/25 mb-4">
                  {service.icon}
                </div>
                <h4 className="font-extrabold text-base md:text-lg text-govBlue-900 dark:text-govBlue-50 uppercase tracking-tight">
                  {service.title}
                </h4>
                <p className="text-xs md:text-sm text-govBlue-500 dark:text-govBlue-300 leading-relaxed mt-2.5">
                  {service.desc}
                </p>
              </div>

              <div className="mt-5">
                <Link
                  href={service.link}
                  className="inline-flex items-center gap-1 text-xs font-bold text-govBlue-900 hover:text-govGold-600 dark:text-govGold-400 dark:hover:text-govGold-300 uppercase tracking-wider transition-colors"
                >
                  Access Service →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

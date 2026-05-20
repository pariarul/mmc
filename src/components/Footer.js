'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Award, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-govBlue-950 text-govBlue-100 border-t-4 border-govGold-500 pt-12 pb-6 px-4 sm:px-6 md:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Column 1: Seal and Branding */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 100 100" className="w-12 h-12 text-govGold-400" fill="currentColor">
              <path d="M50 4C24.6 4 4 24.6 4 50s20.6 46 46 46 46-20.6 46-46S75.4 4 50 4zm0 8c20.9 0 38 17.1 38 38s-17.1 38-38 38-38-17.1-38-38 17.1-38 38-38z"/>
              <path d="M50 20c-16.6 0-30 13.4-30 30s13.4 30 30 30 30-13.4 30-30-13.4-30-30-30zm0 8c12.2 0 22 9.8 22 22s-9.8 22-22 22-22-9.8-22-22 9.8-22 22-22zm-5 10h10v20H45V38zm0 24h10v6H45v-6z" fill="#D2AE2D"/>
            </svg>
            <div>
              <h3 className="font-bold text-sm text-white tracking-wide uppercase leading-tight">
                MAHARASHTRA MEDICAL COUNCIL
              </h3>
              <p className="text-govGold-400 text-xs mt-0.5">MUMBAI, INDIA</p>
            </div>
          </div>
          <p className="text-xs text-govBlue-300 leading-relaxed">
            Statutory body established by the Government of Maharashtra under the Maharashtra Medical Council Act, 1965, regulating standards of medical practitioners and medical ethics.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Award className="w-5 h-5 text-govGold-400 flex-shrink-0" />
            <span className="text-[11px] text-govGold-300 font-semibold tracking-wider uppercase">
              ISO 9001:2015 Certified Council
            </span>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-govBlue-800 pb-2 mb-4 flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-govGold-500 rounded-full" />
            Navigation Links
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-govBlue-300">
            <li>
              <Link href="/" className="hover:text-govGold-400 flex items-center gap-1 transition-colors">
                <ArrowUpRight className="w-3 h-3 text-govGold-500" /> Home Page
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-govGold-400 flex items-center gap-1 transition-colors">
                <ArrowUpRight className="w-3 h-3 text-govGold-500" /> About the Council
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-govGold-400 flex items-center gap-1 transition-colors">
                <ArrowUpRight className="w-3 h-3 text-govGold-500" /> Contact & Helpdesk
              </Link>
            </li>
            <li>
              <Link href="/rti" className="hover:text-govGold-400 flex items-center gap-1 transition-colors">
                <ArrowUpRight className="w-3 h-3 text-govGold-500" /> Right to Information (RTI)
              </Link>
            </li>
            <li>
              <Link href="/act-rules" className="hover:text-govGold-400 flex items-center gap-1 transition-colors">
                <ArrowUpRight className="w-3 h-3 text-govGold-500" /> Council Act & Rules
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: RMP Portal & Admin */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-govBlue-800 pb-2 mb-4 flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-govGold-500 rounded-full" />
            Services & Admin
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-govBlue-300">
            <li>
              <Link href="/verify-doctor" className="hover:text-govGold-400 flex items-center gap-1.5 font-semibold text-govGold-300 transition-colors">
                <ShieldCheck className="w-3.5 h-3.5" /> Doctor Verification Portal
              </Link>
            </li>
            <li>
              <Link href="/announcements" className="hover:text-govGold-400 flex items-center gap-1 transition-colors">
                <ArrowUpRight className="w-3 h-3 text-govGold-500" /> Council Announcements
              </Link>
            </li>
            <li>
              <Link href="/downloads" className="hover:text-govGold-400 flex items-center gap-1 transition-colors">
                <ArrowUpRight className="w-3 h-3 text-govGold-500" /> Document Downloads
              </Link>
            </li>
            <li className="mt-2 pt-2 border-t border-govBlue-900/60">
              <Link href="/admin/login" className="hover:text-white flex items-center gap-1 transition-colors font-bold text-govGold-400">
                <ArrowUpRight className="w-3 h-3 text-govGold-500" /> Administrative Access (Login)
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Council Address */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-govBlue-800 pb-2 mb-4 flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-govGold-500 rounded-full" />
            Contact Info
          </h4>
          <ul className="flex flex-col gap-3.5 text-xs text-govBlue-300">
            <li className="flex gap-2">
              <MapPin className="w-4 h-4 text-govGold-500 flex-shrink-0 mt-0.5" />
              <span>
                189-A, Anand Complex, 2nd Floor, Sane Guruji Marg, Arthur Road Naka, Chinchpokli (West), Mumbai - 400 011
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-govGold-500 flex-shrink-0" />
              <span>+91-22-23010660 / 23010661</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-govGold-500 flex-shrink-0" />
              <span className="break-all">support@maharashtramedicalcouncil.in</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-govBlue-900 text-[11px] text-govBlue-400 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div>
          <p>© 2026 Maharashtra Medical Council, Mumbai. All Rights Reserved.</p>
          <p className="text-[10px] text-govBlue-500 mt-0.5">
            Content managed & maintained by Maharashtra Medical Council. Platform powered by Cobenoinfotech Website Core.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3.5 font-medium">
          <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          <span>|</span>
          <Link href="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
          <span>|</span>
          <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span>|</span>
          <Link href="/contact" className="hover:text-white transition-colors">Helpdesk</Link>
        </div>
      </div>
    </footer>
  );
}

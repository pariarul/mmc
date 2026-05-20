'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="w-full flex-grow bg-govBlue-50/10 py-16 px-4 flex flex-col items-center justify-center">
      <div className="max-w-md w-full text-center flex flex-col items-center gap-6">
        
        {/* Shield Icon */}
        <div className="p-4 bg-govBlue-900/10 rounded-full border border-govGold-500/20 text-govBlue-900 animate-bounce">
          <ShieldAlert className="w-12 h-12 text-govGold-600" />
        </div>

        {/* Text */}
        <div>
          <h2 className="text-3xl font-black text-govBlue-900 uppercase tracking-tight">
            404 • Page Not Found
          </h2>
          <p className="text-[10px] font-bold text-govGold-600 uppercase tracking-widest mt-1">
            Maharashtra Medical Council, Mumbai
          </p>
          <p className="text-xs text-govBlue-500 leading-relaxed mt-4 max-w-sm mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Please verify the URL or return to safety.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center text-xs font-bold uppercase tracking-wider">
          <Link
            href="/"
            className="bg-govBlue-900 hover:bg-govBlue-950 text-white py-3.5 px-6 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-md"
          >
            <Home className="w-4 h-4" /> Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="bg-white hover:bg-govBlue-50 text-govBlue-905 border border-govBlue-200 py-3.5 px-6 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>

      </div>
    </div>
  );
}

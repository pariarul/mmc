'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { ShieldCheck, ArrowRight, UserCheck, AlertCircle, HelpCircle } from 'lucide-react';
import { useToast } from '@/components/Toast';

function VerifyDoctorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle redirect errors (e.g. from middleware blocks)
  React.useEffect(() => {
    const errorType = searchParams.get('error');
    if (errorType === 'session_required') {
      setErrorMsg('Access Restricted: You must authenticate with OTP to view a practitioner secure dossier.');
    } else if (errorType === 'session_invalid') {
      setErrorMsg('Your secure session has expired. Please verify again to view the credential sheet.');
    }
  }, [searchParams]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      showToast('Please enter a valid Registration Number or Email Address.', 'warning');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await axios.post('/api/otp/send', {
        identifier: identifier.trim(),
      });

      if (response.data?.success) {
        showToast(response.data.message, 'success');
        // Store temporary target email for verification tracking
        const email = response.data.email;
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      }
    } catch (error) {
      console.error('Error sending OTP verification:', error);
      const errMsg = error.response?.data?.error || 'Failed to dispatch verification email. Please try again.';
      setErrorMsg(errMsg);
      showToast(errMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-govBlue-50/10 py-16 px-4 flex flex-col items-center justify-center flex-grow">
      <div className="max-w-md w-full flex flex-col gap-6">
        
        {/* Portal Branding logo/header */}
        <div className="text-center flex flex-col items-center">
          <svg viewBox="0 0 100 100" className="w-16 h-16 text-govBlue-900 dark:text-govGold-400" fill="currentColor">
            <path d="M50 4C24.6 4 4 24.6 4 50s20.6 46 46 46 46-20.6 46-46S75.4 4 50 4zm0 8c20.9 0 38 17.1 38 38s-17.1 38-38 38-38-17.1-38-38 17.1-38 38-38z"/>
            <path d="M50 20c-16.6 0-30 13.4-30 30s13.4 30 30 30 30-13.4 30-30-13.4-30-30-30zm0 8c12.2 0 22 9.8 22 22s-9.8 22-22 22-22-9.8-22-22 9.8-22 22-22zm-5 10h10v20H45V38zm0 24h10v6H45v-6z" fill="#D2AE2D"/>
          </svg>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-govBlue-900 dark:text-white tracking-tight mt-3">
            RMP Verification Hub
          </h2>
          <p className="text-[10px] sm:text-xs font-bold text-govGold-600 dark:text-govGold-400 uppercase tracking-widest mt-1">
            Maharashtra Medical Council Secure Registry
          </p>
        </div>

        {/* Action card */}
        <div className="bg-white dark:bg-govBlue-900 border border-govBlue-100 dark:border-govBlue-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Security Indicator */}
          <div className="flex items-center gap-2 bg-govBlue-50 dark:bg-govBlue-950/60 p-3 rounded-2xl border border-govBlue-100 dark:border-govBlue-800 text-xs text-govBlue-600 dark:text-govBlue-300 font-medium mb-6">
            <UserCheck className="w-5 h-5 text-govGold-500 flex-shrink-0" />
            <span>Profile lookup requires active OTP validation sent directly to the practitioner's registered email.</span>
          </div>

          {/* Middleware redirect error alert */}
          {errorMsg && (
            <div className="bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-red-400 border border-red-200 dark:border-red-900/50 p-4 rounded-2xl flex gap-2.5 text-xs mb-6 font-semibold leading-relaxed">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSendOtp} className="flex flex-col gap-4 text-xs">
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-govBlue-750 dark:text-govBlue-200">
                Doctor Registered Email or MMC Registration Number
              </label>
              <input
                type="text"
                required
                disabled={loading}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. MMC-2005-09876 or doctor@email.com"
                className="bg-govBlue-50/50 dark:bg-govBlue-950 border border-govBlue-200 dark:border-govBlue-850 rounded-xl p-4 text-xs text-govBlue-900 dark:text-govBlue-50 focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500 transition-all disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-govGold-500 hover:bg-govGold-600 text-white font-extrabold py-3.5 px-6 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-55 shadow-md hover:shadow-lg mt-2 text-xs"
            >
              {loading ? 'Dispatched verification code...' : 'Generate Verification OTP'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Security Disclaimers */}
        <div className="bg-govBlue-50/30 dark:bg-govBlue-900/20 border border-govBlue-150/40 dark:border-govBlue-800/40 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-govBlue-500 dark:text-govBlue-300">
          <HelpCircle className="w-5 h-5 text-govGold-500 flex-shrink-0 mt-0.5" />
          <div className="text-[11px]">
            <p className="font-bold text-govBlue-900 dark:text-govBlue-100">Why do we require OTP?</p>
            <p className="mt-0.5">To safeguard doctor confidentiality and protect clinical details from bulk scrapers or malicious automated inquiries, the complete practitioner registration details sheet is strictly locked behind secure OTP checks.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function VerifyDoctorPage() {
  return (
    <Suspense fallback={
      <div className="w-full bg-govBlue-50/10 py-16 px-4 flex flex-col items-center justify-center flex-grow text-center text-xs text-govBlue-600">
        Loading verification hub...
      </div>
    }>
      <VerifyDoctorContent />
    </Suspense>
  );
}


'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { ShieldAlert, ArrowRight, KeyRound, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/Toast';

function OtpVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown timer

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    } else {
      router.push('/verify-doctor');
    }
  }, [searchParams, router]);

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.trim().length !== 6 || isNaN(otp)) {
      showToast('Please enter a valid 6-digit numeric verification code.', 'warning');
      return;
    }

    if (timeLeft <= 0) {
      showToast('Verification OTP has expired. Please go back and request a new one.', 'error');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await axios.post('/api/otp/verify', {
        email: email,
        otp: otp.trim(),
      });

      if (response.data?.success) {
        showToast('Secure session validated successfully.', 'success');
        const doctorId = response.data.doctorId;
        router.push(`/doctor-profile/${doctorId}`);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      const errMsg = error.response?.data?.error || 'Verification failed. Please check the code and try again.';
      setErrorMsg(errMsg);
      showToast(errMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await axios.post('/api/otp/send', {
        identifier: email,
      });
      if (response.data?.success) {
        showToast('A new OTP has been dispatched to your email.', 'success');
        setTimeLeft(300); // Reset timer
      }
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Failed to resend code. Please try again.';
      setErrorMsg(errMsg);
      showToast(errMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-govBlue-900 border border-govBlue-100 dark:border-govBlue-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      
      {/* Expiry Clock */}
      <div className="flex justify-between items-center bg-govBlue-50 dark:bg-govBlue-950/60 p-3.5 rounded-2xl border border-govBlue-100 dark:border-govBlue-800 text-xs font-semibold mb-6">
        <span className="text-govBlue-600 dark:text-govBlue-300">OTP Validity Clock:</span>
        <div className={`flex items-center gap-1.5 ${timeLeft <= 30 ? 'text-red-500 animate-pulse' : 'text-govGold-600 dark:text-govGold-400'}`}>
          <Clock className="w-4 h-4" />
          <span>{timeLeft > 0 ? formatTime(timeLeft) : 'Expired'}</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-red-400 border border-red-200 dark:border-red-900/50 p-4 rounded-2xl flex gap-2.5 text-xs mb-6 font-semibold">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5 text-xs">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label className="font-bold text-govBlue-750 dark:text-govBlue-200">
              Enter 6-Digit Verification Code *
            </label>
            <span className="text-[10px] text-govBlue-400 font-bold">{email}</span>
          </div>
          <input
            type="text"
            required
            maxLength={6}
            disabled={loading}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="e.g. 123456"
            className="bg-govBlue-50/50 dark:bg-govBlue-950 border border-govBlue-200 dark:border-govBlue-850 rounded-xl p-4 text-center text-lg font-black tracking-widest text-govBlue-900 dark:text-govBlue-50 focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500 transition-all disabled:opacity-60"
          />
        </div>

        <button
          type="submit"
          disabled={loading || timeLeft <= 0}
          className="bg-govGold-500 hover:bg-govGold-600 text-white font-extrabold py-3.5 px-6 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-55 shadow-md hover:shadow-lg mt-2 text-xs"
        >
          {loading ? 'Authenticating Secure Session...' : 'Verify OTP & View Profile'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Resend Helper */}
      <div className="text-center mt-6 text-xs text-govBlue-400">
        Didn't receive the email?{' '}
        <button 
          onClick={handleResend}
          disabled={loading}
          className="font-bold text-govGold-600 hover:text-govBlue-900 hover:underline disabled:opacity-50 transition-colors"
        >
          Resend Code
        </button>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <div className="w-full bg-govBlue-50/10 py-16 px-4 flex flex-col items-center justify-center flex-grow">
      <div className="max-w-md w-full flex flex-col gap-6">
        
        {/* Branding header */}
        <div className="text-center flex flex-col items-center">
          <div className="p-3 bg-govBlue-900/10 dark:bg-govGold-500/10 rounded-full border border-govGold-500/25">
            <KeyRound className="w-10 h-10 text-govBlue-900 dark:text-govGold-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-govBlue-900 dark:text-white tracking-tight mt-3">
            OTP Authorization
          </h2>
          <p className="text-[10px] sm:text-xs font-bold text-govGold-600 dark:text-govGold-400 uppercase tracking-widest mt-1">
            Validate Credentials Access
          </p>
        </div>

        {/* Suspense Wrapper to prevent Next.js useSearchParams client-side deopt build warnings */}
        <Suspense fallback={<div className="text-center text-xs text-govBlue-400">Initializing verification form...</div>}>
          <OtpVerificationForm />
        </Suspense>

      </div>
    </div>
  );
}

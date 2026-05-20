'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Lock, Mail, ArrowRight, ShieldAlert } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      showToast('Please enter administrative credentials.', 'warning');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await axios.post('/api/auth/admin-login', {
        email: email.trim(),
        password: password.trim(),
      });

      if (response.data?.success) {
        showToast('Administrative session authenticated successfully.', 'success');
        router.push('/admin/dashboard');
      }
    } catch (error) {
      console.error('Error logging in admin:', error);
      const errMsg = error.response?.data?.error || 'Invalid credentials or access suspended.';
      setErrorMsg(errMsg);
      showToast(errMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-govBlue-950 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full flex flex-col gap-6">
        
        {/* Government Crest Logo / Brand */}
        <div className="text-center flex flex-col items-center">
          <svg viewBox="0 0 100 100" className="w-16 h-16 text-govGold-400" fill="currentColor">
            <path d="M50 4C24.6 4 4 24.6 4 50s20.6 46 46 46 46-20.6 46-46S75.4 4 50 4zm0 8c20.9 0 38 17.1 38 38s-17.1 38-38 38-38-17.1-38-38 17.1-38 38-38z"/>
            <path d="M50 20c-16.6 0-30 13.4-30 30s13.4 30 30 30 30-13.4 30-30-13.4-30-30-30zm0 8c12.2 0 22 9.8 22 22s-9.8 22-22 22-22-9.8-22-22 9.8-22 22-22zm-5 10h10v20H45V38zm0 24h10v6H45v-6z" fill="#D2AE2D"/>
          </svg>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight mt-3">
            MMC Admin Console
          </h2>
          <p className="text-[10px] sm:text-xs font-bold text-govGold-400 uppercase tracking-widest mt-1">
            Maharashtra Medical Council, Mumbai
          </p>
        </div>

        {/* Secure Form Panel */}
        <div className="bg-govBlue-900 border border-govBlue-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          
          <div className="flex items-center gap-2 bg-govBlue-950 p-3 rounded-2xl border border-govBlue-800 text-[11px] text-govBlue-200 font-semibold mb-6">
            <Lock className="w-4 h-4 text-govGold-400 flex-shrink-0" />
            <span>Authorized Personnel Only. All session logs are auditable under MMC compliance systems.</span>
          </div>

          {errorMsg && (
            <div className="bg-red-950/40 text-red-400 border border-red-900/50 p-4 rounded-2xl flex gap-2.5 text-xs mb-6 font-semibold leading-relaxed">
              <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4.5 text-xs">
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-govBlue-200">Administrative Email *</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. admin@mmc.gov.in"
                  className="w-full bg-govBlue-950 border border-govBlue-850 rounded-xl py-3.5 pl-10 pr-4 text-xs text-white placeholder-govBlue-600 focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500 transition-all disabled:opacity-60"
                />
                <Mail className="w-4 h-4 text-govBlue-650 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-govBlue-200">Secure Password *</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-govBlue-950 border border-govBlue-850 rounded-xl py-3.5 pl-10 pr-4 text-xs text-white placeholder-govBlue-600 focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500 transition-all disabled:opacity-60"
                />
                <Lock className="w-4 h-4 text-govBlue-650 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-govGold-500 hover:bg-govGold-600 text-white font-extrabold py-3.5 px-6 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-55 shadow-md hover:shadow-lg mt-2 text-xs"
            >
              {loading ? 'Authenticating Personnel...' : 'Access Admin Dashboard'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <a href="/" className="text-xs text-govBlue-400 hover:text-white transition-colors uppercase font-bold tracking-wider">
            ← Return to public portal
          </a>
        </div>

      </div>
    </div>
  );
}

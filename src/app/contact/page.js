'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock, HelpCircle, Send } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function ContactPage() {
  const { showToast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const handleSubmitContactForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate contact submission
    setTimeout(() => {
      setLoading(false);
      showToast('Thank you! Your inquiry has been sent to the Maharashtra Medical Council support desk. Ref Ticket: MMC-' + Math.floor(100000 + Math.random() * 900000), 'success');
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="w-full bg-govBlue-50/10 py-12 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex-grow">
      
      {/* 1. Header Banner */}
      <div className="bg-govBlue-900 text-white rounded-2xl p-8 md:p-10 border border-govGold-600/35 mb-10 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-radial-gradient from-govBlue-800 to-govBlue-950 opacity-60" />
        <div className="relative z-10">
          <span className="text-[10px] sm:text-xs font-bold text-govGold-400 uppercase tracking-widest bg-govBlue-950/80 px-3 py-1.5 rounded-md border border-govGold-600/25">
            Contact Us & Helpdesk
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-4">
            Council Headquarters & Help Desk
          </h2>
          <p className="text-xs sm:text-sm text-govBlue-200 mt-2 max-w-2xl font-medium">
            Get in touch with administrative officers, submit feedback, or locate our primary headquarters in Chinchpokli, Mumbai.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Address Details */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white dark:bg-govBlue-900 border border-govBlue-100 dark:border-govBlue-800 rounded-2xl p-6 shadow-xs flex flex-col gap-4 text-sm">
            <h3 className="font-extrabold text-base uppercase text-govBlue-900 dark:text-white border-b pb-2 mb-2">
              Primary Office Address
            </h3>

            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-govGold-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-govBlue-900 dark:text-govBlue-50">Maharashtra Medical Council, Mumbai</p>
                <p className="text-xs text-govBlue-500 dark:text-govBlue-300 mt-1 leading-relaxed">
                  189-A, Anand Complex, 2nd Floor, Sane Guruji Marg, Arthur Road Naka, Chinchpokli (West), Mumbai - 400 011.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-govGold-500 flex-shrink-0" />
              <div>
                <p className="font-bold text-govBlue-900 dark:text-govBlue-50">Phone Numbers</p>
                <p className="text-xs text-govBlue-500 dark:text-govBlue-300 mt-0.5">
                  +91-22-23010660 / 23010661
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-govGold-500 flex-shrink-0" />
              <div>
                <p className="font-bold text-govBlue-900 dark:text-govBlue-50">Office Timings</p>
                <p className="text-xs text-govBlue-500 dark:text-govBlue-300 mt-0.5">
                  Mon to Sat • 10:00 AM to 05:30 PM (Closed on 2nd & 4th Saturday)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-govBlue-900 border border-govBlue-100 dark:border-govBlue-800 rounded-2xl p-6 shadow-xs flex flex-col gap-3 text-sm">
            <h3 className="font-extrabold text-base uppercase text-govBlue-900 dark:text-white border-b pb-2 mb-2">
              Helpdesk Department Contacts
            </h3>
            
            <div>
              <p className="font-bold text-xs text-govBlue-400 uppercase">General & Admin Inquiries</p>
              <a href="mailto:support@maharashtramedicalcouncil.in" className="text-xs font-semibold text-govGold-600 hover:underline">
                support@maharashtramedicalcouncil.in
              </a>
            </div>

            <div>
              <p className="font-bold text-xs text-govBlue-400 uppercase">RMP Registrations support</p>
              <a href="mailto:rmp.support@maharashtramedicalcouncil.in" className="text-xs font-semibold text-govGold-600 hover:underline">
                rmp.support@maharashtramedicalcouncil.in
              </a>
            </div>

            <div>
              <p className="font-bold text-xs text-govBlue-400 uppercase">CPD points / CME Webinars</p>
              <a href="mailto:cpd.webinars@maharashtramedicalcouncil.in" className="text-xs font-semibold text-govGold-600 hover:underline">
                cpd.webinars@maharashtramedicalcouncil.in
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Feedback Form */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-govBlue-900 border border-govBlue-100 dark:border-govBlue-800 rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="font-extrabold text-base md:text-lg uppercase text-govBlue-900 dark:text-white mb-2 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-govGold-500" />
              Online Inquiry Form
            </h3>
            <p className="text-xs text-govBlue-400 leading-relaxed border-b pb-4 mb-6">
              Fill out this form, and the concerned desk officer will respond to your queries via email within two working days.
            </p>

            <form onSubmit={handleSubmitContactForm} className="flex flex-col gap-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-govBlue-700 dark:text-govBlue-200">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="bg-govBlue-50/50 dark:bg-govBlue-950 border border-govBlue-200 dark:border-govBlue-850 rounded-lg p-3 text-govBlue-900 dark:text-govBlue-50 focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-govBlue-700 dark:text-govBlue-200">Email ID *</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="bg-govBlue-50/50 dark:bg-govBlue-950 border border-govBlue-200 dark:border-govBlue-850 rounded-lg p-3 text-govBlue-900 dark:text-govBlue-50 focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-govBlue-700 dark:text-govBlue-200">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter mobile number"
                    className="bg-govBlue-50/50 dark:bg-govBlue-950 border border-govBlue-200 dark:border-govBlue-850 rounded-lg p-3 text-govBlue-900 dark:text-govBlue-50 focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-govBlue-700 dark:text-govBlue-200">Registration Number (RMP)</label>
                  <input
                    type="text"
                    placeholder="e.g. MMC-2005-09876"
                    className="bg-govBlue-50/50 dark:bg-govBlue-950 border border-govBlue-200 dark:border-govBlue-850 rounded-lg p-3 text-govBlue-900 dark:text-govBlue-50 focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-govBlue-700 dark:text-govBlue-200">Subject Inquiry *</label>
                <input
                  type="text"
                  required
                  placeholder="Subject of your query"
                  className="bg-govBlue-50/50 dark:bg-govBlue-950 border border-govBlue-200 dark:border-govBlue-850 rounded-lg p-3 text-govBlue-900 dark:text-govBlue-50 focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-govBlue-700 dark:text-govBlue-200">Message Description *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your query in detail..."
                  className="bg-govBlue-50/50 dark:bg-govBlue-950 border border-govBlue-200 dark:border-govBlue-850 rounded-lg p-3 text-govBlue-900 dark:text-govBlue-50 focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 bg-govBlue-900 hover:bg-govBlue-950 text-white font-extrabold py-3.5 px-6 rounded-lg uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-55"
              >
                {loading ? 'Sending Request...' : 'Send Inquiry Ticket'}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

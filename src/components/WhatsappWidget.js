'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';

export default function WhatsappWidget() {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    // Show attention grabber bubble after 3.5 seconds
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsappRedirect = () => {
    const phoneNumber = '912223010660'; // MMC Mumbai support line
    const textMessage = 'Hello Maharashtra Medical Council Helpdesk, I am a practitioner and need assistance regarding my RMP registration/verification.';
    const encodedText = encodeURIComponent(textMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 5 }}
            className="bg-white dark:bg-govBlue-900 text-govBlue-900 dark:text-govBlue-50 p-3.5 rounded-2xl shadow-2xl border border-govBlue-100 dark:border-govBlue-800 max-w-[240px] pointer-events-auto flex flex-col gap-1.5 relative"
          >
            {/* Close button */}
            <button
              onClick={() => setShowBubble(false)}
              className="absolute top-2 right-2 text-govBlue-400 hover:text-govBlue-600 dark:hover:text-govBlue-200 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              MMC Support Online
            </div>
            <p className="text-xs font-semibold leading-snug pr-3">
              "Click to solve all your RMP Queries instantly"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleWhatsappRedirect}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl pointer-events-auto relative group"
        title="WhatsApp Support Helpdesk"
      >
        {/* Glowing border effect */}
        <span className="absolute inset-0 rounded-full border-4 border-emerald-400/30 animate-ping pointer-events-none" />
        
        {/* WhatsApp Icon */}
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.963L2 22l5.233-1.371a9.944 9.944 0 0 0 4.779 1.21h.005c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.038-5.176-2.925-7.064C17.195 3.003 14.685 2 12.012 2zm5.727 14.047c-.254.717-1.477 1.373-2.022 1.464-.495.083-1.144.153-3.327-.751-2.793-1.157-4.595-4.013-4.736-4.2a8.214 8.214 0 0 1-.184-.247c-.881-1.171-1.503-2.529-1.503-3.929 0-1.616.84-2.41 1.139-2.716.299-.306.664-.383.886-.383.221 0 .442.001.636.01.203.01.478-.077.747.571.277.665.946 2.307 1.028 2.473.083.166.138.36.028.581-.11.22-.165.36-.33.553-.165.194-.347.433-.497.581-.166.166-.341.347-.147.68.194.331.862 1.414 1.848 2.29.1.09 1.18.99 2.052.88.243-.03.541-.247.731-.502.19-.256.387-.512.607-.221.22.292 1.381 1.545 1.547 1.876.166.331.166.553.083.717z"/>
        </svg>
      </motion.button>
    </div>
  );
}

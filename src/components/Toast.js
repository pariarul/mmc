'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

const ToastContext = createContext({
  showToast: (message, type = 'info', duration = 4000) => {},
});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Overlay Container */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            let icon = <Info className="w-5 h-5 text-blue-500" />;
            let bgClass = 'bg-white dark:bg-govBlue-900 border-blue-200 dark:border-blue-800';
            
            if (toast.type === 'success') {
              icon = <CheckCircle className="w-5 h-5 text-emerald-500" />;
              bgClass = 'bg-emerald-50/95 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50';
            } else if (toast.type === 'error') {
              icon = <XCircle className="w-5 h-5 text-red-500" />;
              bgClass = 'bg-red-50/95 dark:bg-red-950/30 border-red-200 dark:border-red-900/50';
            } else if (toast.type === 'warning') {
              icon = <AlertTriangle className="w-5 h-5 text-amber-500" />;
              bgClass = 'bg-amber-50/95 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50';
            }

            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg pointer-events-auto backdrop-blur-md ${bgClass}`}
              >
                <div className="flex-shrink-0 mt-0.5">{icon}</div>
                <div className="flex-1 text-sm font-medium text-govBlue-900 dark:text-govBlue-50">
                  {toast.message}
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="flex-shrink-0 text-govBlue-400 hover:text-govBlue-600 dark:hover:text-govBlue-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

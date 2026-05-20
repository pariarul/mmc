import React from 'react';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ToastProvider } from '@/components/Toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsappWidget from '@/components/WhatsappWidget';

export const metadata = {
  title: 'Maharashtra Medical Council, Mumbai | Government of Maharashtra',
  description: 'Official Doctor Registration and Secure Verification Platform of the Maharashtra Medical Council, Mumbai. Verify Registered Medical Practitioners (RMPs) instantly with secure OTP validation.',
  keywords: 'Maharashtra Medical Council, MMC Mumbai, Doctor Verification, RMP Register, Medical Practitioner Validation, FMG Internship, CPD Points',
  authors: [{ name: 'Maharashtra Medical Council' }],
  robots: 'index, follow',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-full font-sans antialiased text-govBlue-950 dark:text-govBlue-50 bg-govBlue-50/20 dark:bg-govBlue-950/20 transition-colors duration-200">
        <ThemeProvider>
          <ToastProvider>
            {/* Header / Nav */}
            <Navbar />
            
            {/* Main Content Area */}
            <main className="flex-grow flex flex-col">
              {children}
            </main>
            
            {/* Footer */}
            <Footer />
            
            {/* Float Services */}
            <WhatsappWidget />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { Menu, X, Sun, Moon, ShieldAlert, Award, FileText, CheckCircle2 } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'RTI', path: '/rti' },
    { name: 'Act & Rules', path: '/act-rules' },
    { name: 'Announcements', path: '/announcements' },
    { name: 'Downloads', path: '/downloads' },
  ];

  const isActive = (path) => pathname === path;

  return (
    <header className="w-full flex flex-col z-50">
      {/* 1. Top Information Bar */}
      <div className="w-full bg-govBlue-900 text-govGold-100 py-1.5 px-4 text-xs font-medium flex flex-col md:flex-row justify-between items-center gap-1.5 border-b border-govGold-600/35">
        <span className="text-center md:text-left flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-govGold-400" />
          (Established by Government of Maharashtra Under MMC Act, 1965)
        </span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 bg-govBlue-950 px-2 py-0.5 rounded border border-govBlue-800 text-[10px]">
            ISO 9001:2015 Certified
          </span>
          <button 
            onClick={toggleTheme}
            className="flex items-center gap-1 hover:text-white transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-govGold-400" />
                <span className="hidden sm:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-govGold-300" />
                <span className="hidden sm:inline">Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Main Identity Brand Header */}
      <div className="w-full bg-white dark:bg-govBlue-950 py-3.5 px-4 sm:px-6 md:px-8 flex items-center justify-between border-b border-govBlue-100 dark:border-govBlue-900 transition-colors duration-200">
        <div className="flex items-center gap-3">
          {/* Detailed SVG Emblem Logo */}
          <div className="w-14 h-14 bg-govBlue-50 dark:bg-govBlue-900 rounded-full flex items-center justify-center p-2 border border-govGold-500/35">
            <svg viewBox="0 0 100 100" className="w-full h-full text-govBlue-700 dark:text-govGold-400" fill="currentColor">
              <path d="M50 4C24.6 4 4 24.6 4 50s20.6 46 46 46 46-20.6 46-46S75.4 4 50 4zm0 8c20.9 0 38 17.1 38 38s-17.1 38-38 38-38-17.1-38-38 17.1-38 38-38z"/>
              <path d="M50 20c-16.6 0-30 13.4-30 30s13.4 30 30 30 30-13.4 30-30-13.4-30-30-30zm0 8c12.2 0 22 9.8 22 22s-9.8 22-22 22-22-9.8-22-22 9.8-22 22-22zm-5 10h10v20H45V38zm0 24h10v6H45v-6z" className="fill-govGold-500 dark:fill-govGold-400"/>
            </svg>
          </div>
          <div>
            <h1 className="text-govBlue-800 dark:text-white font-extrabold text-sm sm:text-lg md:text-xl tracking-tight uppercase leading-none">
              Maharashtra Medical Council
            </h1>
            <p className="text-govGold-600 dark:text-govGold-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mt-0.5">
              Mumbai • महाराष्ट्र वैद्यकीय परिषद
            </p>
          </div>
        </div>

        {/* Desktop Quick Verification CTA & Admin Entry */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/verify-doctor"
            className="flex items-center gap-2 bg-govGold-500 hover:bg-govGold-600 text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <CheckCircle2 className="w-4 h-4" />
            Verify Registered Doctor (RMP)
          </Link>
          <Link
            href="/admin/login"
            className="bg-govBlue-100 hover:bg-govBlue-200 dark:bg-govBlue-900 dark:hover:bg-govBlue-800 text-govBlue-800 dark:text-govBlue-100 font-semibold text-xs px-3.5 py-2 rounded border border-govBlue-200 dark:border-govBlue-800 transition-colors"
          >
            Admin Portal
          </Link>
        </div>
      </div>

      {/* 3. Sticky Navigation Menu */}
      <nav 
        className={`w-full transition-all duration-300 ${
          scrolled 
            ? 'fixed top-0 shadow-lg border-b bg-white/95 dark:bg-govBlue-950/95 backdrop-blur-md z-50' 
            : 'relative bg-govBlue-50 dark:bg-govBlue-900 border-b border-govBlue-100 dark:border-govBlue-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-12">
          {/* Scroll Navigation Logo */}
          {scrolled && (
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-govBlue-900 dark:text-white text-sm">MMC Mumbai</span>
            </Link>
          )}

          {/* Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-xs uppercase font-bold tracking-wider px-3.5 py-2.5 rounded-md transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-govBlue-800 dark:bg-govGold-500 text-white dark:text-govBlue-950 shadow-sm'
                    : 'text-govBlue-800 dark:text-govBlue-100 hover:bg-govBlue-100 dark:hover:bg-govBlue-800/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* If scrolled, display doctor verification link */}
            {scrolled && (
              <Link
                href="/verify-doctor"
                className="bg-govGold-500 hover:bg-govGold-600 text-white font-bold text-xs px-3 py-1.5 rounded uppercase tracking-wider transition-colors"
              >
                Verify Doctor
              </Link>
            )}
          </div>

          {/* Mobile hamburger menu trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-govBlue-900 dark:text-white hover:bg-govBlue-100 dark:hover:bg-govBlue-800 rounded transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu panel */}
        {isOpen && (
          <div className="md:hidden bg-white dark:bg-govBlue-950 border-b border-govBlue-100 dark:border-govBlue-900 px-4 py-3 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-semibold p-2.5 rounded-lg block transition-colors ${
                  isActive(link.path)
                    ? 'bg-govBlue-900 dark:bg-govGold-500 text-white dark:text-govBlue-950'
                    : 'text-govBlue-800 dark:text-govBlue-100 hover:bg-govBlue-50 dark:hover:bg-govBlue-900/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-px bg-govBlue-100 dark:bg-govBlue-900 my-2" />

            <Link
              href="/verify-doctor"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 bg-govGold-500 hover:bg-govGold-600 text-white font-bold py-3 rounded-lg shadow"
            >
              <CheckCircle2 className="w-4 h-4" />
              Verify Registered Doctor (RMP)
            </Link>

            <Link
              href="/admin/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 bg-govBlue-100 dark:bg-govBlue-900 text-govBlue-900 dark:text-govBlue-100 font-bold py-3 rounded-lg border border-govBlue-200 dark:border-govBlue-800"
            >
              Admin Portal Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

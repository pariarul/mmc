'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, ShieldAlert, Award } from 'lucide-react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: 'Maharashtra Medical Council, Mumbai',
    subtitle: 'Government Statutory Authority established under MMC Act, 1965',
    description: 'Upholding medical standards, regulating practice, and maintaining the register of modern scientific medicine practitioners across Maharashtra.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Verify Practitioner (RMP)',
    ctaLink: '/verify-doctor',
    icon: <Award className="w-8 h-8 text-govGold-400" />,
  },
  {
    id: 2,
    title: 'Secure OTP-Based Verification Portal',
    subtitle: 'Ensuring Integrity & Preventing Unauthorized Listings',
    description: 'Verify registration details securely. Profile retrieval requires active OTP validation sent directly to the doctor\'s verified email address.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Start Doctor Verification',
    ctaLink: '/verify-doctor',
    icon: <CheckCircle className="w-8 h-8 text-govGold-400" />,
  },
  {
    id: 3,
    title: 'CPD Accreditation & Webinars',
    subtitle: 'Promoting Lifelong Education & Quality Healthcare Standards',
    description: 'Access the digital Continuing Professional Development platform, verify credit points, and register for accredited global medical webinars.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Explore CPD Services',
    ctaLink: '/rti', // RMP CPD services directory
    icon: <ShieldAlert className="w-8 h-8 text-govGold-400" />,
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[380px] sm:h-[450px] md:h-[500px] overflow-hidden bg-govBlue-950 border-b border-govGold-600/35">
      {/* Slide Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image Layer with Heavy Government Gradient overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-105"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-govBlue-950 via-govBlue-950/85 to-govBlue-900/60 dark:from-govBlue-950 dark:via-govBlue-950/90 dark:to-govBlue-950/65" />

          {/* Interactive Slide Text Container */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 flex flex-col justify-center text-left">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex items-center gap-3 mb-3"
                >
                  <div className="p-2 rounded-lg bg-govBlue-900/80 border border-govGold-500/25 shadow-lg">
                    {slides[current].icon}
                  </div>
                  <span className="text-govGold-400 font-extrabold text-xs sm:text-sm tracking-widest uppercase">
                    {slides[current].subtitle}
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase"
                >
                  {slides[current].title}
                </motion.h2>

                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-4 text-sm sm:text-base text-govBlue-200 font-medium max-w-2xl leading-relaxed"
                >
                  {slides[current].description}
                </motion.p>

                <motion.div
                  initial={{ y: 35, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-8 flex flex-wrap gap-4"
                >
                  <Link
                    href={slides[current].ctaLink}
                    className="bg-govGold-500 hover:bg-govGold-600 text-white font-extrabold px-6 py-3 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-200 uppercase text-xs tracking-wider border border-govGold-400"
                  >
                    {slides[current].ctaText}
                  </Link>
                  <Link
                    href="/about"
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 font-bold px-6 py-3 rounded-lg backdrop-blur-sm transition-all duration-200 uppercase text-xs tracking-wider"
                  >
                    Read Circulars
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Sliding Nav Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-govBlue-900/60 hover:bg-govBlue-900 text-white border border-govBlue-800 flex items-center justify-center transition-colors shadow-lg"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-govBlue-900/60 hover:bg-govBlue-900 text-white border border-govBlue-800 flex items-center justify-center transition-colors shadow-lg"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Sliding dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
              index === current ? 'bg-govGold-500 w-7' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { 
  ShieldCheck, 
  Printer, 
  Download, 
  ArrowLeft, 
  Calendar, 
  Hash, 
  MapPin, 
  Mail, 
  Award, 
  Lock,
  UserCheck
} from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function DoctorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const certificateRef = useRef(null);

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [pdfGenerating, setPdfGenerating] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      if (!params.id) return;
      try {
        const response = await axios.get(`/api/doctors/${params.id}`);
        if (response.data?.success && response.data.doctor) {
          setDoctor(response.data.doctor);
        }
      } catch (error) {
        console.error('Error fetching doctor secure profile:', error);
        showToast('Unauthorized access or invalid secure session.', 'error');
        router.push('/verify-doctor');
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [params.id, router, showToast]);

  // Generate QR Code dynamically targeting this specific profile link for mobile auditing
  useEffect(() => {
    if (!doctor) return;
    const profileUrl = window.location.href;
    QRCode.toDataURL(profileUrl, { width: 120, margin: 1 })
      .then(url => {
        setQrCodeUrl(url);
      })
      .catch(err => {
        console.error('Failed to generate auditing QR Code:', err);
      });
  }, [doctor]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  // High-precision PDF export using html2canvas & jsPDF
  const handleDownloadPdf = async () => {
    if (!certificateRef.current || !doctor) return;
    setPdfGenerating(true);
    showToast('Compiling secure PDF Certificate dossier...', 'info');

    try {
      const element = certificateRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // Double quality resolution
        useCORS: true, // Allow cross-origin images
        allowTaint: true,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 size width
      const pageHeight = 295; // A4 size height
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`MMC_Verified_RMP_${doctor.register_no.replace(/\//g, '_')}.pdf`);
      showToast('PDF Document exported successfully!', 'success');
    } catch (error) {
      console.error('Failed to compile PDF certificate:', error);
      showToast('Failed to export PDF certificate.', 'error');
    } finally {
      setPdfGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="w-full flex-grow bg-govBlue-50/10 py-16 flex flex-col items-center justify-center">
        <div className="text-center text-sm font-semibold text-govBlue-400 animate-pulse">
          Retrieving secure RMP database credentials...
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="w-full flex-grow bg-govBlue-50/10 py-16 flex flex-col items-center justify-center">
        <div className="text-center text-sm text-red-500 font-bold">
          Credentials file not found or session has expired.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-govBlue-50/10 py-10 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto flex-grow print:p-0">
      
      {/* 1. Print controls - Hidden when printing */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 print:hidden">
        <button
          onClick={() => router.push('/verify-doctor')}
          className="flex items-center gap-1.5 text-xs font-black text-govBlue-850 dark:text-govBlue-200 hover:text-govGold-600 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Verification
        </button>

        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="bg-govBlue-100 hover:bg-govBlue-250 dark:bg-govBlue-900 text-govBlue-900 dark:text-govBlue-100 font-extrabold text-xs px-4 py-3 rounded-lg border border-govBlue-200 dark:border-govBlue-800 flex items-center gap-1.5 transition-all uppercase"
          >
            <Printer className="w-4 h-4" /> Print Certificate
          </button>
          
          <button
            onClick={handleDownloadPdf}
            disabled={pdfGenerating}
            className="bg-govGold-500 hover:bg-govGold-600 text-white font-extrabold text-xs px-5 py-3 rounded-lg shadow-md hover:shadow-lg flex items-center gap-1.5 transition-all uppercase disabled:opacity-60"
          >
            <Download className="w-4 h-4" /> 
            {pdfGenerating ? 'Compiling...' : 'Download PDF Dossier'}
          </button>
        </div>
      </div>

      {/* 2. Official Certificate Panel */}
      <div 
        ref={certificateRef}
        className="bg-white text-govBlue-950 p-8 md:p-12 rounded-3xl border-[8px] border-govBlue-900 shadow-2xl relative overflow-hidden flex flex-col gap-6 print:border-none print:shadow-none print:p-4"
        style={{ minHeight: '290mm' }} // Matches standard A4 proportions roughly
      >
        
        {/* Certificate Background Seal Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <svg viewBox="0 0 100 100" className="w-[300px] h-[300px] text-govBlue-900" fill="currentColor">
            <path d="M50 4C24.6 4 4 24.6 4 50s20.6 46 46 46 46-20.6 46-46S75.4 4 50 4zm0 8c20.9 0 38 17.1 38 38s-17.1 38-38 38-38-17.1-38-38 17.1-38 38-38z"/>
            <path d="M50 20c-16.6 0-30 13.4-30 30s13.4 30 30 30 30-13.4 30-30-13.4-30-30-30zm0 8c12.2 0 22 9.8 22 22s-9.8 22-22 22-22-9.8-22-22 9.8-22 22-22zm-5 10h10v20H45V38zm0 24h10v6H45v-6z"/>
          </svg>
        </div>

        {/* Certificate Golden Border Inset */}
        <div className="absolute inset-2 border-2 border-govGold-500/50 rounded-2xl pointer-events-none" />

        {/* Certificate Heading Block */}
        <div className="text-center flex flex-col items-center border-b-2 border-govBlue-900 pb-4 relative z-10">
          <svg viewBox="0 0 100 100" className="w-16 h-16 text-govBlue-900 mb-2" fill="currentColor">
            <path d="M50 4C24.6 4 4 24.6 4 50s20.6 46 46 46 46-20.6 46-46S75.4 4 50 4zm0 8c20.9 0 38 17.1 38 38s-17.1 38-38 38-38-17.1-38-38 17.1-38 38-38z"/>
            <path d="M50 20c-16.6 0-30 13.4-30 30s13.4 30 30 30 30-13.4 30-30-13.4-30-30-30zm0 8c12.2 0 22 9.8 22 22s-9.8 22-22 22-22-9.8-22-22 9.8-22 22-22zm-5 10h10v20H45V38zm0 24h10v6H45v-6z" fill="#B89222"/>
          </svg>
          <h2 className="text-lg md:text-2xl font-black uppercase text-govBlue-900 tracking-tight leading-none">
            MAHARASHTRA MEDICAL COUNCIL, MUMBAI
          </h2>
          <p className="text-[10px] font-bold text-govGold-600 uppercase tracking-widest mt-1">
            Established under Maharashtra Medical Council Act, 1965
          </p>
          <p className="text-[11px] font-extrabold text-govBlue-900 uppercase tracking-wider mt-1 bg-govBlue-50 border border-govBlue-100 px-3.5 py-1 rounded">
            Practitioner Registration Verification Dossier
          </p>
        </div>

        {/* Certificate Center Area */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 my-3 relative z-10 flex-grow">
          
          {/* Doctor Portrait Left Area */}
          <div className="md:col-span-1 flex flex-col items-center text-center gap-4">
            <div className="w-32 h-32 rounded-2xl border-4 border-govBlue-900 shadow-lg overflow-hidden bg-govBlue-50 relative group">
              {doctor.doctor_image ? (
                <img 
                  src={doctor.doctor_image} 
                  alt={doctor.doctor_name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-govBlue-300">Portrait Image</div>
              )}
            </div>

            {/* Official Stamps / Verification Seals */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-1 text-[9px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
                <UserCheck className="w-3.5 h-3.5" /> MMC Verified
              </div>
              <p className="text-[9px] font-bold text-govBlue-400 uppercase tracking-wide">
                Valid Registration
              </p>
            </div>
          </div>

          {/* Doctor Detailed Registry Data Right Area */}
          <div className="md:col-span-3 flex flex-col gap-4 text-xs">
            <div className="grid grid-cols-1 gap-3">
              <div className="border-b pb-1.5">
                <span className="text-[9px] font-bold text-govBlue-400 uppercase">Practitioner Full Name</span>
                <p className="font-extrabold text-base text-govBlue-900">{doctor.doctor_name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border-b pb-1.5">
                  <span className="text-[9px] font-bold text-govBlue-400 uppercase">Father's Name</span>
                  <p className="font-bold text-govBlue-800">{doctor.father_name}</p>
                </div>
                <div className="border-b pb-1.5">
                  <span className="text-[9px] font-bold text-govBlue-400 uppercase">Date of Birth</span>
                  <p className="font-bold text-govBlue-800">{formatDate(doctor.dob)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border-b pb-1.5">
                  <span className="text-[9px] font-bold text-govBlue-400 uppercase">Registration Number (RMP)</span>
                  <p className="font-black text-govGold-600 text-sm flex items-center gap-1">
                    <Award className="w-4 h-4 text-govGold-500" /> {doctor.register_no}
                  </p>
                </div>
                <div className="border-b pb-1.5">
                  <span className="text-[9px] font-bold text-govBlue-400 uppercase">SR Number</span>
                  <p className="font-bold text-govBlue-800 flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-govBlue-400" /> {doctor.sr_no}
                  </p>
                </div>
              </div>

              <div className="border-b pb-1.5">
                <span className="text-[9px] font-bold text-govBlue-400 uppercase">Qualifications</span>
                <p className="font-bold text-govBlue-850 bg-govBlue-50/50 p-2 rounded border border-govBlue-100">{doctor.qualification}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border-b pb-1.5">
                  <span className="text-[9px] font-bold text-govBlue-400 uppercase">Date of Issue</span>
                  <p className="font-bold text-govBlue-800">{formatDate(doctor.date_of_issue)}</p>
                </div>
                <div className="border-b pb-1.5">
                  <span className="text-[9px] font-bold text-govBlue-400 uppercase">Valid Upto</span>
                  <p className="font-extrabold text-emerald-600 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {formatDate(doctor.valid_upto)}
                  </p>
                </div>
              </div>

              <div className="border-b pb-1.5">
                <span className="text-[9px] font-bold text-govBlue-400 uppercase">Registered Address</span>
                <p className="font-semibold text-govBlue-800 flex items-start gap-1 leading-relaxed">
                  <MapPin className="w-4 h-4 text-govBlue-400 flex-shrink-0 mt-0.5" />
                  {doctor.address}
                </p>
              </div>

              <div className="border-b pb-1.5">
                <span className="text-[9px] font-bold text-govBlue-400 uppercase">Registered Email</span>
                <p className="font-semibold text-govBlue-850 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-govBlue-400" />
                  {doctor.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Footer Row: Signatures and QR */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 border-t pt-5 relative z-10 mt-auto items-end">
          {/* Auditing QR Code */}
          <div className="sm:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left gap-1.5">
            {qrCodeUrl ? (
              <img 
                src={qrCodeUrl} 
                alt="Profile Verification QR Code" 
                className="w-[100px] h-[100px] border p-1 rounded-lg bg-white shadow-xs" 
              />
            ) : (
              <div className="w-[100px] h-[100px] border border-dashed rounded flex items-center justify-center text-[10px] text-govBlue-400">QR Code</div>
            )}
            <span className="text-[8px] font-bold text-govBlue-400 uppercase tracking-widest mt-1 block">
              Scan to audit credentials
            </span>
          </div>

          {/* Registrar Seal */}
          <div className="sm:col-span-8 flex flex-col items-center sm:items-end text-center sm:text-right gap-1.5 justify-end h-full">
            <div className="flex flex-col items-center text-center">
              {/* Registrar signature mock vector */}
              <div className="w-36 h-10 border-b border-govBlue-900 border-dashed mb-1 flex items-center justify-center">
                <span className="font-serif italic text-sm text-govBlue-850 select-none">Dilip Sarda</span>
              </div>
              <p className="font-extrabold text-[10px] text-govBlue-900 uppercase">
                Registrar
              </p>
              <p className="text-[9px] font-bold text-govGold-600 uppercase tracking-wider">
                Maharashtra Medical Council, Mumbai
              </p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="bg-govBlue-50/70 p-3.5 rounded-xl border border-govBlue-100 text-[10px] text-govBlue-550 leading-relaxed text-center relative z-10 mt-2 font-medium">
          <strong>Security Notice:</strong> This document is a computer-generated official credential dossier of registration issued by the Maharashtra Medical Council, Mumbai under the MMC Act, 1965. It is authenticated dynamically through active OTP validation and secure session tokens. Hand-written changes or tampering renders this record void.
        </div>

      </div>
    </div>
  );
}

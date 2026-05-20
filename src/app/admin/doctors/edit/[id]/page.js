'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Edit2, ArrowLeft, Save, Sparkles } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function AdminEditDoctorPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    register_no: '',
    sr_no: '',
    doctor_name: '',
    father_name: '',
    dob: '',
    qualification: '',
    address: '',
    email: '',
    date_of_issue: '',
    valid_upto: '',
    doctor_image: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadDoctorDetails() {
      if (!params.id) return;
      try {
        const response = await axios.get(`/api/doctors/${params.id}`);
        if (response.data?.success && response.data.doctor) {
          const doc = response.data.doctor;
          // Format date strings to YYYY-MM-DD for date inputs
          const formatDateInput = (dateStr) => {
            if (!dateStr) return '';
            const d = new Date(dateStr);
            return d.toISOString().split('T')[0];
          };

          setForm({
            register_no: doc.register_no || '',
            sr_no: doc.sr_no || '',
            doctor_name: doc.doctor_name || '',
            father_name: doc.father_name || '',
            dob: formatDateInput(doc.dob),
            qualification: doc.qualification || '',
            address: doc.address || '',
            email: doc.email || '',
            date_of_issue: formatDateInput(doc.date_of_issue),
            valid_upto: formatDateInput(doc.valid_upto),
            doctor_image: doc.doctor_image || '',
          });
        }
      } catch (error) {
        console.error('Error fetching doctor details for edit:', error);
        showToast('Failed to load practitioner profile.', 'error');
        router.push('/admin/doctors');
      } finally {
        setLoading(false);
      }
    }
    loadDoctorDetails();
  }, [params.id, router, showToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form.register_no.trim() || !form.doctor_name.trim() || !form.email.trim()) {
      showToast('Please fill out all mandatory fields.', 'warning');
      return;
    }

    setSaving(true);

    try {
      const response = await axios.put(`/api/doctors/${params.id}`, form);
      if (response.data?.success) {
        showToast(`Registration credentials file for ${form.doctor_name} updated successfully.`, 'success');
        router.push('/admin/doctors');
      }
    } catch (error) {
      console.error('Error updating doctor:', error);
      const errMsg = error.response?.data?.error || 'Update failed. Check inputs or connection.';
      showToast(errMsg, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex-grow bg-govBlue-955 py-16 flex flex-col items-center justify-center text-white">
        <div className="text-center text-xs font-bold text-govGold-400 animate-pulse uppercase tracking-wider">
          Querying credentials file details...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-govBlue-955 min-h-screen text-white flex flex-col">
      {/* Header Row */}
      <div className="w-full bg-govBlue-900 border-b border-govBlue-800 px-6 py-4 flex items-center gap-3">
        <button 
          onClick={() => router.push('/admin/doctors')}
          className="p-2 hover:bg-govBlue-800 rounded-lg text-govBlue-250 hover:text-white transition-colors"
          title="Back to Doctors list"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-lg md:text-xl font-black uppercase tracking-tight flex items-center gap-2">
            <Edit2 className="w-5 h-5 text-govGold-500" />
            Edit Practitioner Credentials File
          </h2>
          <p className="text-[10px] text-govGold-400 font-bold uppercase tracking-wider">Modify Profile {form.register_no}</p>
        </div>
      </div>

      {/* Form Area */}
      <div className="max-w-3xl mx-auto px-6 py-8 w-full flex-grow">
        <div className="bg-govBlue-900 border border-govBlue-850 rounded-3xl p-6 md:p-8 shadow-2xl">
          <h3 className="font-extrabold text-sm uppercase text-govGold-400 mb-6 border-b border-govBlue-850 pb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-govGold-500" />
            Modify Practitioner Registration Records
          </h3>

          <form onSubmit={handleUpdate} className="flex flex-col gap-5 text-xs">
            
            {/* Identity details Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-govBlue-200">Doctor Full Name *</label>
                <input
                  type="text"
                  name="doctor_name"
                  required
                  value={form.doctor_name}
                  onChange={handleChange}
                  placeholder="e.g. Dr. Ramesh Kumar Patil"
                  className="bg-govBlue-950 border border-govBlue-800 rounded-lg p-3 text-white focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-govBlue-200">Father's Name *</label>
                <input
                  type="text"
                  name="father_name"
                  required
                  value={form.father_name}
                  onChange={handleChange}
                  placeholder="e.g. Kumar Patil"
                  className="bg-govBlue-950 border border-govBlue-800 rounded-lg p-3 text-white focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500"
                />
              </div>
            </div>

            {/* Registration details Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-govBlue-200">RMP Registration Number *</label>
                <input
                  type="text"
                  name="register_no"
                  required
                  value={form.register_no}
                  onChange={handleChange}
                  placeholder="e.g. MMC/2005/09876"
                  className="bg-govBlue-950 border border-govBlue-800 rounded-lg p-3 text-white focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-govBlue-200">SR Register Sequence Number *</label>
                <input
                  type="text"
                  name="sr_no"
                  required
                  value={form.sr_no}
                  onChange={handleChange}
                  placeholder="e.g. 142051"
                  className="bg-govBlue-950 border border-govBlue-800 rounded-lg p-3 text-white focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500"
                />
              </div>
            </div>

            {/* Contact details Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-govBlue-200">Registered Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="e.g. doctor@email.com"
                  className="bg-govBlue-950 border border-govBlue-800 rounded-lg p-3 text-white focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-govBlue-200">Date of Birth *</label>
                <input
                  type="date"
                  name="dob"
                  required
                  value={form.dob}
                  onChange={handleChange}
                  className="bg-govBlue-950 border border-govBlue-800 rounded-lg p-3 text-white focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500"
                />
              </div>
            </div>

            {/* Qualifications */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-govBlue-200">Practitioner Qualifications *</label>
              <textarea
                name="qualification"
                required
                rows={2}
                value={form.qualification}
                onChange={handleChange}
                placeholder="e.g. MBBS (Govt Medical College, Mumbai, 2004), MS (General Surgery, Pune University, 2008)"
                className="bg-govBlue-950 border border-govBlue-800 rounded-lg p-3 text-white focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500"
              />
            </div>

            {/* Timelines row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-govBlue-200">Registration Date of Issue *</label>
                <input
                  type="date"
                  name="date_of_issue"
                  required
                  value={form.date_of_issue}
                  onChange={handleChange}
                  className="bg-govBlue-950 border border-govBlue-800 rounded-lg p-3 text-white focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-govBlue-200">Registration Valid Upto *</label>
                <input
                  type="date"
                  name="valid_upto"
                  required
                  value={form.valid_upto}
                  onChange={handleChange}
                  className="bg-govBlue-950 border border-govBlue-800 rounded-lg p-3 text-white focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500"
                />
              </div>
            </div>

            {/* Registered Address */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-govBlue-200">Practice Registered Address *</label>
              <textarea
                name="address"
                required
                rows={2}
                value={form.address}
                onChange={handleChange}
                placeholder="Clinic address, Hospital name, street, city, pin code..."
                className="bg-govBlue-950 border border-govBlue-800 rounded-lg p-3 text-white focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500"
              />
            </div>

            {/* Doctor Image Profile link */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-govBlue-200">Practitioner Portrait Image URL</label>
              <input
                type="text"
                name="doctor_image"
                value={form.doctor_image}
                onChange={handleChange}
                placeholder="Supply photo link or use standard default placeholder avatar"
                className="bg-govBlue-950 border border-govBlue-800 rounded-lg p-3 text-white focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500"
              />
            </div>

            {/* Save Buttons */}
            <button
              type="submit"
              disabled={saving}
              className="bg-govGold-500 hover:bg-govGold-600 text-white font-extrabold py-3.5 px-6 rounded-lg uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-55 shadow mt-2 text-xs"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Updating Credentials File...' : 'Save Registry Changes'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { UserPlus, ArrowLeft, Save, Sparkles, Award } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function AdminAddDoctorPage() {
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
    doctor_image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80', // Beautiful default Unsplash doctor avatar
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.register_no.trim() || !form.doctor_name.trim() || !form.email.trim()) {
      showToast('Please fill out all mandatory fields.', 'warning');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/doctors', form);
      if (response.data?.success) {
        showToast(`Registration credentials file created for ${form.doctor_name} successfully.`, 'success');
        router.push('/admin/doctors');
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
      const errMsg = error.response?.data?.error || 'Registration failed. Check inputs or connection.';
      showToast(errMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

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
            <UserPlus className="w-6 h-6 text-govGold-500" />
            Register Practitioner (RMP)
          </h2>
          <p className="text-[10px] text-govGold-400 font-bold uppercase tracking-wider">Create Doctor Registry Profile</p>
        </div>
      </div>

      {/* Form Area */}
      <div className="max-w-3xl mx-auto px-6 py-8 w-full flex-grow">
        <div className="bg-govBlue-900 border border-govBlue-850 rounded-3xl p-6 md:p-8 shadow-2xl">
          <h3 className="font-extrabold text-sm uppercase text-govGold-400 mb-6 border-b border-govBlue-850 pb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-govGold-500 animate-pulse" />
            Practitioner Credentials Data Form
          </h3>

          <form onSubmit={handleRegister} className="flex flex-col gap-5 text-xs">
            
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
              disabled={loading}
              className="bg-govGold-500 hover:bg-govGold-600 text-white font-extrabold py-3.5 px-6 rounded-lg uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-55 shadow mt-2 text-xs"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Creating Credentials File...' : 'Create Registry Profile'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

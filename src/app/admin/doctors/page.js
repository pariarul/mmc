'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Search, 
  Trash2, 
  Edit2, 
  Plus, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useToast } from '@/components/Toast';
import Link from 'next/link';

export default function AdminDoctorsPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  async function loadDoctors() {
    setLoading(true);
    try {
      const response = await axios.get(`/api/doctors?page=${page}&limit=10&search=${encodeURIComponent(search)}`);
      if (response.data?.success) {
        setDoctors(response.data.doctors);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      showToast('Failed to load doctor directory.', 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDoctors();
  }, [page, search]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete the registration credentials file for ${name}? This action is destructive and irreversible.`)) {
      return;
    }

    try {
      const response = await axios.delete(`/api/doctors/${id}`);
      if (response.data?.success) {
        showToast(`Registration file for ${name} deleted.`, 'success');
        loadDoctors(); // Reload list
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
      showToast('Deletion failed. Authorized admins only.', 'error');
    }
  };

  return (
    <div className="w-full bg-govBlue-950 min-h-screen text-white flex flex-col">
      
      {/* Header Row */}
      <div className="w-full bg-govBlue-900 border-b border-govBlue-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push('/admin/dashboard')}
            className="p-2 hover:bg-govBlue-800 rounded-lg text-govBlue-200 hover:text-white transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg md:text-xl font-black uppercase tracking-tight flex items-center gap-2">
              <Users className="w-6 h-6 text-govGold-500" />
              Practitioners Directory
            </h2>
            <p className="text-[10px] text-govGold-400 font-bold uppercase tracking-wider">MMC Register Management</p>
          </div>
        </div>

        <Link
          href="/admin/doctors/add"
          className="bg-govGold-500 hover:bg-govGold-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors uppercase shadow"
        >
          <Plus className="w-4 h-4" /> Register Doctor
        </Link>
      </div>

      {/* Main Directory Area */}
      <div className="max-w-7xl mx-auto px-6 py-8 w-full flex-grow flex flex-col gap-6">
        
        {/* Search Input Bar */}
        <div className="bg-govBlue-900 border border-govBlue-850 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search by registration number, name, or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // Reset page to 1 on typing search query
              }}
              className="w-full bg-govBlue-950 border border-govBlue-800 text-xs rounded-lg py-3.5 pl-10 pr-4 text-white placeholder-govBlue-600 focus:outline-hidden focus:border-govGold-500 focus:ring-1 focus:ring-govGold-500"
            />
            <Search className="w-4 h-4 text-govBlue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          <span className="text-[10px] text-govBlue-400 font-bold uppercase">
            Double Check Registration Validity dates regularly
          </span>
        </div>

        {/* Directory Grid */}
        <div className="bg-govBlue-900 border border-govBlue-850 rounded-3xl overflow-hidden shadow-2xl flex-grow flex flex-col">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-govBlue-850 text-govBlue-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-5">RMP Photo</th>
                  <th className="py-3 px-5">Registration No</th>
                  <th className="py-3 px-5">Practitioner Name</th>
                  <th className="py-3 px-5">Registered Email</th>
                  <th className="py-3 px-5">Valid Upto</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-govBlue-850 font-medium">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-govBlue-400">
                      Querying MMC state registry database...
                    </td>
                  </tr>
                ) : doctors.length > 0 ? (
                  doctors.map((doc) => (
                    <tr key={doc.id} className="hover:bg-govBlue-950/40">
                      <td className="py-3 px-5">
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-govBlue-800 bg-govBlue-950 flex items-center justify-center text-govBlue-700">
                          {doc.doctor_image ? (
                            <img src={doc.doctor_image} alt={doc.doctor_name} className="w-full h-full object-cover" />
                          ) : (
                            'Pic'
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-5 font-black text-govGold-400 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-govGold-500" />
                        {doc.register_no}
                      </td>
                      <td className="py-3 px-5 text-white font-extrabold">{doc.doctor_name}</td>
                      <td className="py-3 px-5 text-govBlue-300">{doc.email}</td>
                      <td className="py-3 px-5 font-bold text-emerald-500">
                        {new Date(doc.valid_upto).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-3 px-5 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => router.push(`/admin/doctors/edit/${doc.id}`)}
                            className="p-2 bg-govBlue-950 hover:bg-govBlue-800 border border-govBlue-800 rounded-lg text-govBlue-200 hover:text-white transition-colors"
                            title="Edit Credentials File"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(doc.id, doc.doctor_name)}
                            className="p-2 bg-govBlue-950 hover:bg-red-950/40 border border-govBlue-800 rounded-lg text-red-400 hover:text-red-500 transition-colors"
                            title="Delete Registration File"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-govBlue-400">
                      No practitioners found in MMC registry matching query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="border-t border-govBlue-850 p-4 flex justify-between items-center bg-govBlue-900/60 mt-auto text-xs">
              <span className="font-bold text-govBlue-400">
                Page {page} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(p => p - 1)}
                  className="bg-govBlue-950 hover:bg-govBlue-800 p-2.5 rounded-lg border border-govBlue-800 text-govBlue-200 hover:text-white transition-all disabled:opacity-40 disabled:hover:bg-govBlue-950"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="bg-govBlue-950 hover:bg-govBlue-800 p-2.5 rounded-lg border border-govBlue-800 text-govBlue-200 hover:text-white transition-all disabled:opacity-40 disabled:hover:bg-govBlue-950"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

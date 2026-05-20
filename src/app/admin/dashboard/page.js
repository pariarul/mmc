'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  Users, 
  GraduationCap, 
  Tv, 
  BookOpen, 
  LogOut, 
  UserPlus, 
  Bell, 
  FileText, 
  Download, 
  Clock, 
  Database,
  UserCheck
} from 'lucide-react';
import { useToast } from '@/components/Toast';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const response = await axios.get('/api/stats');
        if (response.data?.success) {
          setStats(response.data.stats);
          setLogs(response.data.logs || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard statistics:', error);
        showToast('Session expired or access restricted.', 'error');
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, [router, showToast]);

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/auth/admin-logout');
      if (response.data?.success) {
        showToast('Administrative session logged out.', 'info');
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Error logging out admin:', error);
      showToast('Logout action failed.', 'error');
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="w-full flex-grow bg-govBlue-950 py-16 flex flex-col items-center justify-center text-white">
        <div className="text-center text-xs font-bold text-govGold-400 animate-pulse uppercase tracking-wider">
          Initializing secure administrative session...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-govBlue-950 min-h-screen text-white flex flex-col">
      {/* 1. Header Row */}
      <div className="w-full bg-govBlue-900 border-b border-govBlue-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-govGold-500 rounded-xl text-govBlue-950">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-black uppercase tracking-tight">MMC Admin Panel</h2>
            <p className="text-[10px] text-govGold-400 font-bold uppercase tracking-wider">Council Management Console</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-650 hover:bg-red-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors uppercase"
        >
          <LogOut className="w-4 h-4" /> Secure Sign Out
        </button>
      </div>

      {/* 2. Primary Body Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
        
        {/* Left 8-col Area: Stats & Audit logs */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Analytics grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Stat 1 */}
            <div className="bg-govBlue-900 border border-govBlue-800 p-5 rounded-2xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold text-govGold-400 uppercase">Practitioners (RMP)</span>
                <Users className="w-5 h-5 text-govGold-500" />
              </div>
              <p className="text-2xl font-black">{stats?.totalRmp || 0}</p>
            </div>

            {/* Stat 2 */}
            <div className="bg-govBlue-900 border border-govBlue-800 p-5 rounded-2xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold text-govGold-400 uppercase">Provisional</span>
                <GraduationCap className="w-5 h-5 text-govGold-500" />
              </div>
              <p className="text-2xl font-black">{stats?.provisional || 0}</p>
            </div>

            {/* Stat 3 */}
            <div className="bg-govBlue-900 border border-govBlue-800 p-5 rounded-2xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold text-govGold-400 uppercase">CPD Hours</span>
                <Tv className="w-5 h-5 text-govGold-500" />
              </div>
              <p className="text-2xl font-black">{stats?.cpdApproved || 0}</p>
            </div>

            {/* Stat 4 */}
            <div className="bg-govBlue-900 border border-govBlue-800 p-5 rounded-2xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold text-govGold-400 uppercase">Webinars</span>
                <BookOpen className="w-5 h-5 text-govGold-500" />
              </div>
              <p className="text-2xl font-black">{stats?.webinarApproved || 0}</p>
            </div>

          </div>

          {/* Real-Time Audit Trails */}
          <div className="bg-govBlue-900 border border-govBlue-800 rounded-3xl p-6 shadow-2xl">
            <h3 className="font-extrabold text-sm uppercase text-govGold-400 mb-4 border-b border-govBlue-850 pb-2.5 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-govGold-500" />
              Live Security Auditing logs (Recent Actions)
            </h3>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-govBlue-850 text-govBlue-400 font-bold uppercase tracking-wider">
                    <th className="py-2.5">User Operator</th>
                    <th className="py-2.5">Logged Action</th>
                    <th className="py-2.5">Operator IP</th>
                    <th className="py-2.5">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-govBlue-850 font-medium">
                  {logs.length > 0 ? (
                    logs.map((log) => (
                      <tr key={log.id} className="hover:bg-govBlue-950/40">
                        <td className="py-3 text-govGold-400">{log.admin_email}</td>
                        <td className="py-3 text-govBlue-100">{log.action_details}</td>
                        <td className="py-3 text-govBlue-300 font-mono">{log.ip_address || '127.0.0.1'}</td>
                        <td className="py-3 text-govBlue-450">{formatDate(log.created_at)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-govBlue-400">
                        No auditable operational logs recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right 4-col Area: Action Hubs panel */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-govBlue-900 border border-govBlue-800 rounded-3xl p-6 shadow-xl flex flex-col gap-4">
            <h3 className="font-black text-sm uppercase text-govGold-400 border-b border-govBlue-850 pb-2.5">
              Administrative Control Desks
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/admin/doctors"
                className="bg-govBlue-950 hover:bg-govBlue-800 p-4 rounded-xl border border-govBlue-850 flex items-center gap-3 transition-colors group"
              >
                <div className="p-2 bg-govGold-500 rounded-lg text-govBlue-950 group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-white">Practitioners Directory</h4>
                  <p className="text-[10px] text-govBlue-400 font-bold uppercase mt-0.5">Manage All RMP Lists</p>
                </div>
              </Link>

              <Link
                href="/admin/doctors/add"
                className="bg-govBlue-950 hover:bg-govBlue-800 p-4 rounded-xl border border-govBlue-850 flex items-center gap-3 transition-colors group"
              >
                <div className="p-2 bg-govGold-500 rounded-lg text-govBlue-950 group-hover:scale-105 transition-transform">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-white">Register New Doctor</h4>
                  <p className="text-[10px] text-govBlue-400 font-bold uppercase mt-0.5">Create RMP Credentials File</p>
                </div>
              </Link>

              <Link
                href="/admin/notifications"
                className="bg-govBlue-950 hover:bg-govBlue-800 p-4 rounded-xl border border-govBlue-850 flex items-center gap-3 transition-colors group"
              >
                <div className="p-2 bg-govGold-500 rounded-lg text-govBlue-950 group-hover:scale-105 transition-transform">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-white">Update News Marquees</h4>
                  <p className="text-[10px] text-govBlue-400 font-bold uppercase mt-0.5">Manage Scrolling Notices</p>
                </div>
              </Link>

              <Link
                href="/admin/announcements"
                className="bg-govBlue-950 hover:bg-govBlue-800 p-4 rounded-xl border border-govBlue-850 flex items-center gap-3 transition-colors group"
              >
                <div className="p-2 bg-govGold-500 rounded-lg text-govBlue-950 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-white">Bulletins Editor</h4>
                  <p className="text-[10px] text-govBlue-400 font-bold uppercase mt-0.5">Manage Circular Bulletins</p>
                </div>
              </Link>

              <Link
                href="/admin/downloads"
                className="bg-govBlue-950 hover:bg-govBlue-800 p-4 rounded-xl border border-govBlue-850 flex items-center gap-3 transition-colors group"
              >
                <div className="p-2 bg-govGold-500 rounded-lg text-govBlue-950 group-hover:scale-105 transition-transform">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-white">PDF Forms Registry</h4>
                  <p className="text-[10px] text-govBlue-400 font-bold uppercase mt-0.5">Manage Downloads Library</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

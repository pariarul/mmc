'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Bell, ArrowLeft, Plus, Trash2, ShieldAlert } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function AdminNotificationsPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '' });
  const [adding, setAdding] = useState(false);

  async function loadNotifications() {
    try {
      const response = await axios.get('/api/notifications');
      if (response.data?.success) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error('Error fetching admin notifications:', error);
      showToast('Failed to load notifications list.', 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast('Please enter a notification title.', 'warning');
      return;
    }

    setAdding(true);
    try {
      const response = await axios.post('/api/notifications', form);
      if (response.data?.success) {
        showToast('Scrolling news marquee added.', 'success');
        setForm({ title: '', description: '' });
        loadNotifications();
      }
    } catch (error) {
      console.error('Error adding notification:', error);
      showToast('Addition failed.', 'error');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notification? It will instantly be removed from the home page marquee.')) {
      return;
    }

    try {
      const response = await axios.delete(`/api/notifications?id=${id}`);
      if (response.data?.success) {
        showToast('Notification removed successfully.', 'success');
        loadNotifications();
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
      showToast('Deletion failed.', 'error');
    }
  };

  return (
    <div className="w-full bg-govBlue-955 min-h-screen text-white flex flex-col">
      {/* Header Row */}
      <div className="w-full bg-govBlue-900 border-b border-govBlue-800 px-6 py-4 flex items-center gap-3">
        <button 
          onClick={() => router.push('/admin/dashboard')}
          className="p-2 hover:bg-govBlue-800 rounded-lg text-govBlue-250 hover:text-white transition-colors"
          title="Back to Dashboard"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-lg md:text-xl font-black uppercase tracking-tight flex items-center gap-2">
            <Bell className="w-5 h-5 text-govGold-500" />
            Update News Marquees
          </h2>
          <p className="text-[10px] text-govGold-400 font-bold uppercase tracking-wider">Manage Scrolling Ticker Notices</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
        
        {/* Left Side: Add Form */}
        <div className="lg:col-span-5">
          <div className="bg-govBlue-900 border border-govBlue-850 rounded-3xl p-6 shadow-2xl">
            <h3 className="font-extrabold text-sm uppercase text-govGold-400 mb-6 border-b border-govBlue-850 pb-2.5">
              Add New Ticker Notice
            </h3>

            <form onSubmit={handleAdd} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-govBlue-200">Notice Title (Displayed in Marquee) *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. FMG Candidates schedule updated for May-June 2026"
                  className="bg-govBlue-950 border border-govBlue-800 rounded-lg p-3 text-white focus:outline-hidden focus:border-govGold-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-govBlue-200">Detailed Description (Optional)</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide more background context regarding this news ticker release..."
                  className="bg-govBlue-950 border border-govBlue-800 rounded-lg p-3 text-white focus:outline-hidden focus:border-govGold-500"
                />
              </div>

              <button
                type="submit"
                disabled={adding}
                className="bg-govGold-500 hover:bg-govGold-600 text-white font-extrabold py-3 px-6 rounded-lg uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors disabled:opacity-55 mt-2"
              >
                <Plus className="w-4 h-4" />
                {adding ? 'Publishing Ticker...' : 'Publish Scrolling Ticker'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Current List */}
        <div className="lg:col-span-7">
          <div className="bg-govBlue-900 border border-govBlue-850 rounded-3xl p-6 shadow-2xl flex-grow flex flex-col">
            <h3 className="font-black text-sm uppercase text-govGold-400 border-b border-govBlue-850 pb-2.5 mb-4">
              Active News Marquees
            </h3>

            {loading ? (
              <div className="text-center py-12 text-xs text-govBlue-400">Loading notices registry...</div>
            ) : notifications.length > 0 ? (
              <div className="flex flex-col gap-4">
                {notifications.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-govBlue-950 p-4 rounded-xl border border-govBlue-850 flex items-start justify-between gap-4"
                  >
                    <div>
                      <h4 className="font-extrabold text-xs text-white leading-snug">{item.title}</h4>
                      <p className="text-[10px] text-govBlue-400 mt-1 leading-relaxed">{item.description || 'No description supplied.'}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 hover:bg-red-950/40 rounded-lg text-red-400 hover:text-red-500 transition-colors flex-shrink-0 border border-govBlue-800"
                      title="Remove Ticker Notice"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-xs text-govBlue-400">
                No active ticker notices published.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

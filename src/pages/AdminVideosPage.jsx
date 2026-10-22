import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Video, ArrowLeft, ArrowUpRight, BookOpen, Coins, Users } from 'lucide-react';
import AdminVideoManager from '../components/admin/AdminVideoManager';

export default function AdminVideosPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Admin Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-semibold shadow-sm"
              title="Return to Main Admin Console"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
              <span>Admin Console</span>
            </Link>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">FAHMRISE Operations /</span>
              <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5" />
                <span>YouTube Video Manager</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin?tab=overview"
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              KPI Overview
            </Link>
            <Link
              to="/admin?tab=revenue"
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              Revenue (30/70)
            </Link>
            <Link
              to="/admin?tab=courses"
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              Courses
            </Link>
            <Link
              to="/admin?tab=users"
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              Learners
            </Link>
          </div>
        </div>

        {/* Dedicated YouTube Video Manager Component */}
        <AdminVideoManager />
      </div>
    </div>
  );
}

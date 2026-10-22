import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Sparkles, ShieldCheck, ArrowRight, Lock, Mail, ChevronRight, GraduationCap, Video } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/common/Alert';

export default function LoginPage() {
  const { login, loginDemo, loginTeacherReviewer } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get('redirect') || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate(redirect);
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await login('admin@fahmrise.com', 'Admin@Fahmrise2026!');
      navigate(redirect.startsWith('/admin') ? redirect : '/admin/videos');
    } catch (err) {
      setError('Administrator login failed: ' + (err.message || 'Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginDemo();
      navigate(redirect);
    } catch (err) {
      setError('Demo login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherReviewerLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginTeacherReviewer();
      navigate(redirect);
    } catch (err) {
      setError('Teacher review access login failed: ' + (err.message || 'Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        
        {/* Top Brand Logo */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center p-0.5 shadow-glow">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-emerald-400">
                F
              </div>
            </div>
            <span className="text-2xl font-black text-white tracking-tight">FAHMRISE</span>
          </Link>
          <h2 className="text-2xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-xs text-slate-400">Understand. Learn. Rise. Sign in to your account.</p>
        </div>

        {/* 1-Click Administrator & YouTube Video Manager Access Card */}
        <div className="p-5 bg-gradient-to-r from-rose-950/90 via-slate-900 to-rose-950/70 border-2 border-rose-500/60 rounded-2xl space-y-3 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-rose-500 text-white font-black text-[10px] uppercase tracking-wider rounded-bl-xl shadow">
            Admin Pass
          </div>
          <div className="flex items-center gap-2 text-sm font-black text-rose-300">
            <Video className="w-5 h-5 text-rose-400" />
            <span>YouTube Video Manager & Operations Admin</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            Full administrator control: access the <strong>YouTube Video Manager</strong>, inspect 287+ course videos, edit YouTube IDs, verify sync, and manage platform operations.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={handleAdminLogin}
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Video className="w-4 h-4 text-white" />
              <span>👑 Log In as Administrator (YouTube Video Manager)</span>
            </button>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1.5 border-t border-rose-900/50 font-mono">
            <span>Email: <code className="text-rose-300">admin@fahmrise.com</code></span>
            <span>Password: <code className="text-rose-300">Admin@Fahmrise2026!</code></span>
          </div>
        </div>

        {/* Clearly Labelled Teacher Demo / Reviewer Access Card */}
        <div className="p-5 bg-gradient-to-r from-blue-950/80 via-indigo-950/70 to-slate-900 border-2 border-indigo-500/60 rounded-2xl space-y-3 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-500 text-slate-950 font-black text-[10px] uppercase tracking-wider rounded-bl-xl shadow">
            Supervisor & Teacher Pass
          </div>
          <div className="flex items-center gap-2 text-sm font-black text-indigo-300">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <span>Teacher Demo / Reviewer Access</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            Specially configured for teachers and reviewers. Inspect all courses across <strong>Technology</strong>, <strong>Islamic Studies</strong>, <strong>Business</strong>, and <strong>International Languages</strong> with zero payment locks, pre-loaded sample coursework, full reader access, quizzes, and live progress tracking.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={handleTeacherReviewerLogin}
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-teal-400 hover:from-indigo-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-slate-950" />
              <span>🎓 Enter as Teacher Reviewer (1-Click Demo)</span>
            </button>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1.5 border-t border-indigo-900/50">
            <span>Email: <code className="text-indigo-300 font-mono">teacher@fahmrise.com</code></span>
            <span>Password: <code className="text-indigo-300 font-mono">teacher123</code></span>
          </div>
        </div>

        {/* 1-Click Demo Evaluation Box */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Standard Student Demo</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">demo@fahmrise.com</span>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 border border-slate-700"
          >
            <span>⚡ Log In as Demo Learner</span>
          </button>
        </div>


        {/* Main Login Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          {error && (
            <div className="p-3.5 bg-rose-950/50 border border-rose-800 rounded-xl text-xs text-rose-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-emerald-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="border-t border-slate-800 pt-4 text-center">
            <p className="text-xs text-slate-400">
              Don't have an account yet?{' '}
              <Link to="/signup" className="text-emerald-400 font-semibold hover:underline">
                Create one now
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

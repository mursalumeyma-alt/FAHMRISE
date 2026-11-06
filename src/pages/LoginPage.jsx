import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Sparkles, ShieldCheck, ArrowRight, Lock, Mail, ChevronRight, GraduationCap, Video, Eye, EyeOff, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/common/Alert';

export default function LoginPage() {
  const { login, loginDemo, loginTeacherReviewer } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get('redirect') || '/dashboard';

  const validateForm = () => {
    const errors = {};
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address (e.g. you@example.com).';
    }

    if (!password) {
      errors.password = 'Password is required.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      setSuccessMessage('Login successful! Redirecting to your dashboard...');
      setTimeout(() => {
        navigate(redirect);
      }, 500);
    } catch (err) {
      const msg = err.message || '';
      if (msg.toLowerCase().includes('failed to fetch') || msg.toLowerCase().includes('networkerror') || msg.toLowerCase().includes('network error')) {
        setError('Unable to connect to the FAHMRISE service. Please check your internet connection or try again later.');
      } else if (msg.toLowerCase().includes('suspended')) {
        setError('This account has been suspended. Please contact FAHMRISE support at fahmrise.contact@gmail.com.');
      } else {
        // Strict security: Generic message to prevent email enumeration
        setError('Invalid email or password. Please verify your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      await login('admin@fahmrise.com', 'Admin@Fahmrise2026!');
      setSuccessMessage('Administrator authenticated! Opening YouTube Video Manager...');
      setTimeout(() => {
        navigate(redirect.startsWith('/admin') ? redirect : '/admin/videos');
      }, 500);
    } catch (err) {
      setError('Administrator login failed: ' + (err.message || 'Please verify server status.'));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      await loginDemo();
      setSuccessMessage('Demo learner session loaded! Redirecting to dashboard...');
      setTimeout(() => {
        navigate(redirect);
      }, 500);
    } catch (err) {
      setError('Demo login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherReviewerLogin = async () => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      await loginTeacherReviewer();
      setSuccessMessage('Teacher Reviewer pass active! Full unrestricted access enabled.');
      setTimeout(() => {
        navigate(redirect);
      }, 500);
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
          {successMessage && (
            <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-xs sm:text-sm text-emerald-300 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {error && (
            <div className="p-3.5 bg-rose-950/60 border border-rose-800/80 rounded-xl text-xs sm:text-sm text-rose-300 flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: null }));
                  }}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 bg-slate-950 border ${
                    fieldErrors.email ? 'border-rose-500' : 'border-slate-800'
                  } rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors`}
                  required
                />
              </div>
              {fieldErrors.email && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <span>•</span> {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Password <span className="text-rose-400">*</span>
                </label>
                <Link to="/forgot-password" className="text-xs text-emerald-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: null }));
                  }}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pr-11 bg-slate-950 border ${
                    fieldErrors.password ? 'border-rose-500' : 'border-slate-800'
                  } rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono transition-colors`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-lg focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <span>•</span> {fieldErrors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Signing in to FAHMRISE...</span>
                </>
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

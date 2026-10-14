import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { 
  BookOpen, 
  Code2, 
  Bot, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Sparkles, 
  Award, 
  ChevronRight, 
  Layers, 
  ShieldCheck,
  Zap,
  Lock,
  RefreshCw,
  Coins,
  GraduationCap
} from 'lucide-react';

export default function Navbar() {
  const { user, logout, subscription, isSubscriptionActive, daysRemaining, isTeacherReviewer } = useAuth();

  const { progress } = useProgress();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const activeSub = isSubscriptionActive();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Course Catalog', path: '/courses', icon: Layers },
    { name: 'Practice Arena', path: '/practice', icon: Code2, badge: '10 Projects' },
    { name: 'AI Tutor', path: '/ai-tutor', icon: Bot, badge: 'Voice' },
    { name: 'Become a Coach', path: '/become-a-coach', icon: Sparkles, badge: 'Apply' },
    ...(user ? [{ name: 'My Learning', path: '/dashboard', icon: BookOpen }] : [])
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full max-w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* FAHMRISE Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-amber-500 p-0.5 shadow-glow group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  F
                </span>
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  FAHMRISE
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  v2.0
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-slate-400 -mt-0.5 font-medium hidden md:block tracking-wide truncate">
                Understand. Learn. Rise.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation (lg screens and above) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-shrink-0">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-2.5 xl:px-3.5 py-1.5 xl:py-2 rounded-xl text-xs xl:text-sm font-medium transition-all whitespace-nowrap ${
                    active 
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm font-semibold' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 xl:w-4 xl:h-4 opacity-80 flex-shrink-0" />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[9px] xl:text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 flex-shrink-0 leading-none">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Auth Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all text-xs xl:text-sm"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                    alt={user.name}
                    className="w-6 h-6 xl:w-7 xl:h-7 rounded-full object-cover border border-emerald-500/40"
                  />
                  <span className="text-slate-200 font-semibold text-xs max-w-[80px] xl:max-w-[110px] truncate">{user.name}</span>
                  
                  {/* Subscription / Teacher Reviewer Pill */}
                  {isTeacherReviewer ? (
                    <span className="text-[9px] xl:text-[10px] font-bold px-2 py-0.5 rounded border whitespace-nowrap bg-indigo-950 text-indigo-300 border-indigo-700/80 flex items-center gap-1 shadow-sm">
                      <GraduationCap className="w-3 h-3 text-indigo-400" />
                      <span>Teacher Reviewer</span>
                    </span>
                  ) : subscription && (
                    <span className={`text-[9px] xl:text-[10px] font-bold px-1.5 py-0.5 rounded border whitespace-nowrap ${
                      activeSub
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800/80'
                        : 'bg-rose-950 text-rose-300 border-rose-800/80'
                    }`}>
                      {activeSub ? `Active • ${daysRemaining}d` : 'Expired'}
                    </span>
                  )}
                </button>

                {userMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-slate-800 text-xs">
                      <p className="font-bold text-white truncate">{user.name}</p>
                      <p className="text-slate-400 truncate">{user.email}</p>
                      
                      {isTeacherReviewer ? (
                        <div className="mt-2 p-2.5 rounded-xl bg-indigo-950/80 border border-indigo-500/40 space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-indigo-300 font-bold flex items-center gap-1">
                              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                              Reviewer Mode
                            </span>
                            <span className="text-emerald-400 font-bold">Full Access 🔓</span>
                          </div>
                          <p className="text-[10px] text-slate-300 leading-tight">
                            All courses, lessons, quizzes & sandboxes unlocked for inspection.
                          </p>
                        </div>
                      ) : subscription && (
                        <div className="mt-2 p-2 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">Monthly Plan:</span>
                            <span className={activeSub ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                              {activeSub ? 'Active 🔓' : 'Expired 🔒'}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500">
                            {activeSub ? `Expires: ${subscription.formattedExpiresAt}` : 'Renew to unlock courses'}
                          </p>
                        </div>
                      )}
                    </div>

                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/70"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>My Learning</span>
                    </Link>

                    <Link
                      to="/courses"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/70"
                    >
                      <BookOpen className="w-4 h-4 text-teal-400" />
                      <span>Browse All Courses</span>
                    </Link>

                    {(user?.role === 'instructor' || user?.role === 'admin') && (
                      <Link
                        to="/instructor/dashboard"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-emerald-300 bg-emerald-950/30 hover:bg-emerald-900/40 border-y border-emerald-500/20"
                      >
                        <Coins className="w-4 h-4 text-emerald-400" />
                        <span>Instructor Portal (70%)</span>
                        <span className="ml-auto text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Share</span>
                      </Link>
                    )}

                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-purple-300 bg-purple-950/40 hover:bg-purple-900/50 border-b border-purple-500/20"
                      >
                        <ShieldCheck className="w-4 h-4 text-purple-400" />
                        <span>Admin Console</span>
                        <span className="ml-auto text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-purple-500/30 text-purple-200">Admin</span>
                      </Link>
                    )}

                    <div className="border-t border-slate-800 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-950/30"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl text-xs xl:text-sm font-bold bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/40 transition-all flex items-center gap-1.5 whitespace-nowrap shadow-sm"
                  title="Teacher Reviewer & Supervisor Access"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Teacher Review</span>
                </Link>
                <Link
                  to="/login"
                  className="px-3 xl:px-4 py-1.5 xl:py-2 text-xs xl:text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/courses"
                  className="px-3 xl:px-4 py-1.5 xl:py-2 rounded-xl text-xs xl:text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-glow transition-all flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>Explore Courses</span>
                  <ChevronRight className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                </Link>
              </div>
            )}
          </div>


          {/* Mobile/Tablet Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {user && (
              <Link
                to="/dashboard"
                className="p-1.5 px-2.5 rounded-lg text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1"
                title="My Learning"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">My Learning</span>
              </Link>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Slide-Down Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 max-w-full overflow-hidden animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-slate-900 border border-slate-900"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-emerald-400" />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="border-t border-slate-800 pt-4 mt-2">
            {user ? (
              <div className="space-y-2">
                {(user?.role === 'instructor' || user?.role === 'admin') && (
                  <Link
                    to="/instructor/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-200 text-sm font-bold"
                  >
                    <Coins className="w-5 h-5 text-emerald-400" />
                    <span>Instructor Portal (70%)</span>
                    <span className="ml-auto text-[10px] bg-emerald-500/30 px-2 py-0.5 rounded">Provider</span>
                  </Link>
                )}
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-200 text-sm font-bold"
                  >
                    <ShieldCheck className="w-5 h-5 text-purple-400" />
                    <span>Admin Console</span>
                    <span className="ml-auto text-[10px] bg-purple-500/30 px-2 py-0.5 rounded">Admin</span>
                  </Link>
                )}
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 text-slate-200 text-sm font-medium"
                >
                  <User className="w-5 h-5 text-amber-400" />
                  <span>{user.name} (Profile & Certificates)</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-950/30 text-sm font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-indigo-950/80 text-indigo-300 border border-indigo-500/40 text-sm font-bold flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span>Teacher Review Access</span>
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl bg-slate-900 text-slate-200 text-sm font-semibold border border-slate-800"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-sm font-semibold shadow-glow"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </header>
  );
}

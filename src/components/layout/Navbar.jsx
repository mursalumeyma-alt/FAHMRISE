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
  GraduationCap,
  Rocket,
  Video,
  Search,
  ExternalLink,
  Mail
} from 'lucide-react';
import Modal from '../common/Modal';
import { BLOG_POSTS } from '../../data/blogData';

export default function Navbar() {
  const { user, logout, subscription, isSubscriptionActive, daysRemaining, isTeacherReviewer } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activeSub = isSubscriptionActive();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const handleAboutClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('about');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#about');
    }
    setMobileOpen(false);
  };

  const handleCoursesClick = () => {
    setMobileOpen(false);
    navigate('/courses');
  };

  const searchableItems = [
    { title: 'Frontend Developer: Zero to Job-Ready', path: '/courses/frontend-developer-zero-to-job-ready', category: 'Technology', badge: 'Flagship' },
    { title: 'Backend Developer: Zero to Job-Ready', path: '/courses/backend-developer-zero-to-job-ready', category: 'Technology', badge: 'Flagship' },
    { title: 'Full-Stack Developer Bundle', path: '/courses/fullstack-developer-bundle', category: 'Technology', badge: 'Bundle' },
    { title: 'Data Analytics & Spreadsheets', path: '/courses/data-analysis-spreadsheets', category: 'Data & Analytics', badge: 'Beginner' },
    { title: 'SQL & Relational Databases Mastery', path: '/courses/sql-relational-databases', category: 'Data & Analytics', badge: 'Interactive' },
    { title: 'Power BI Business Intelligence', path: '/courses/power-bi-business-intelligence', category: 'Data & Analytics', badge: 'DAX' },
    { title: 'International Languages: Arabic Track', path: '/tracks/international-languages', category: 'Languages', badge: 'A1-B2' },
    { title: 'Islamic Studies & Quranic Sciences', path: '/courses?category=Islamic%20Studies', category: 'Islamic Studies', badge: 'Core' },
    { title: 'Practice Arena (10 Real JavaScript Projects)', path: '/practice', category: 'Practice Arena', badge: '10 Projects' },
    { title: 'Full Stack Projects & Deployment', path: '/fullstack-projects', category: 'Projects', badge: '6 Projects' },
    ...BLOG_POSTS.map(post => ({
      title: post.title,
      path: `/blog/${post.slug}`,
      category: `Blog • ${post.category}`,
      badge: post.readTime
    }))
  ];

  const filteredItems = searchQuery.trim() === ''
    ? searchableItems
    : searchableItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full max-w-full bg-[#0B2F2D] border-b border-[#072120] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* FAHMRISE Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <img
                src="/fahmrise-gold-emblem.png"
                alt="FAHMRISE Gold Emblem"
                className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#E5B869] group-hover:text-amber-200 transition-colors leading-none">
                  FAHMRISE
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-[#E5B869] uppercase mt-1 leading-none">
                  LEARNING WITHOUT LIMITS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-7 flex-shrink-0">
              <Link
                to="/"
                className={`text-sm font-semibold transition-colors ${
                  location.pathname === '/' 
                    ? 'text-[#E5B869]' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link
                to="/courses"
                className={`text-sm font-semibold transition-colors ${
                  isActive('/courses') 
                    ? 'text-[#E5B869]' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                Courses
              </Link>
              <Link
                to="/practice"
                className={`text-sm font-semibold transition-colors ${
                  isActive('/practice') 
                    ? 'text-[#E5B869]' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                Practice
              </Link>
              <Link
                to="/blog"
                className={`text-sm font-semibold transition-colors ${
                  isActive('/blog') 
                    ? 'text-[#E5B869]' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                Blog
              </Link>
              <a
                href="#about"
                onClick={handleAboutClick}
                className="text-sm font-semibold text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                About
              </a>
              <Link
                to="/contact"
                className={`text-sm font-semibold transition-colors ${
                  isActive('/contact') 
                    ? 'text-[#E5B869]' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Side Actions: Search + Auth */}
            <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
              {/* Search Icon Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Search courses"
                title="Search courses & topics"
              >
                <Search className="w-5 h-5" />
              </button>

              {user ? (
                /* Authenticated User Menu */
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-black/20 border border-white/10 hover:border-[#E5B869]/50 transition-all text-xs"
                  >
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover border border-[#E5B869]/40"
                    />
                    <span className="text-white font-medium text-xs max-w-[100px] truncate">{user.name}</span>
                    
                    {isTeacherReviewer ? (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-indigo-900/80 text-indigo-200 border border-indigo-700/60 flex items-center gap-1">
                        <GraduationCap className="w-3 h-3" />
                        <span>Reviewer</span>
                      </span>
                    ) : subscription && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        activeSub ? 'bg-emerald-900/80 text-emerald-300' : 'bg-rose-900/80 text-rose-300'
                      }`}>
                        {activeSub ? 'Active' : 'Expired'}
                      </span>
                    )}
                  </button>

                  {userMenuOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-64 bg-[#072120] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <div className="px-4 py-2.5 border-b border-white/10 text-xs">
                        <p className="font-bold text-white truncate">{user.name}</p>
                        <p className="text-[#A2C4C1] truncate">{user.email}</p>
                      </div>

                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-200 hover:text-white hover:bg-white/5"
                      >
                        <Sparkles className="w-4 h-4 text-[#E5B869]" />
                        <span>My Learning</span>
                      </Link>

                      <Link
                        to="/courses"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-200 hover:text-white hover:bg-white/5"
                      >
                        <BookOpen className="w-4 h-4 text-emerald-400" />
                        <span>Browse Courses</span>
                      </Link>

                      <Link
                        to="/fullstack-projects"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-200 hover:text-white hover:bg-white/5"
                      >
                        <Rocket className="w-4 h-4 text-indigo-400" />
                        <span>Full Stack Projects</span>
                      </Link>

                      {user?.role === 'admin' && (
                        <Link
                          to="/admin/videos"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-900/50"
                        >
                          <Video className="w-4 h-4 text-rose-400" />
                          <span>Video Manager</span>
                        </Link>
                      )}

                      <div className="border-t border-white/10 my-1"></div>

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
                /* Unauthenticated Actions */
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-white/95 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="text-sm font-bold bg-[#E5B869] hover:bg-[#d9ab58] text-[#0B2F2D] px-5 py-2.5 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center whitespace-nowrap"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile / Tablet Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-white/80 hover:text-white rounded-lg"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-[#072120] border-b border-[#0B2F2D] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-semibold text-white hover:bg-white/5"
            >
              Home
            </Link>
            <Link
              to="/courses"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-semibold text-white hover:bg-white/5"
            >
              Courses
            </Link>
            <Link
              to="/practice"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-semibold text-white hover:bg-white/5"
            >
              Practice
            </Link>
            <Link
              to="/blog"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-semibold text-white hover:bg-white/5"
            >
              Blog
            </Link>
            <a
              href="#about"
              onClick={handleAboutClick}
              className="block px-3 py-2.5 rounded-lg text-base font-semibold text-white hover:bg-white/5 cursor-pointer"
            >
              About
            </a>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                isActive('/contact') 
                  ? 'text-[#E5B869] bg-white/10' 
                  : 'text-white hover:bg-white/5'
              }`}
            >
              Contact
            </Link>

            <div className="border-t border-white/10 pt-4 mt-2 space-y-2">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center py-2.5 px-4 rounded-xl bg-white/10 text-white font-semibold text-sm"
                  >
                    My Learning
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center py-2.5 px-4 rounded-xl bg-rose-950/60 text-rose-300 font-semibold text-sm"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="text-center py-2.5 px-4 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/5"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="text-center py-2.5 px-4 rounded-xl bg-[#E5B869] text-[#0B2F2D] font-bold text-sm shadow-md"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Course Search Modal */}
      <Modal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        title="Search FAHMRISE Courses & Disciplines"
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by course name, topic, or discipline (e.g. React, SQL, Arabic)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#E5B869]"
              autoFocus
            />
          </div>

          <div className="max-h-[60vh] overflow-y-auto space-y-2 divide-y divide-slate-800">
            {filteredItems.length === 0 ? (
              <p className="text-center text-slate-400 py-6 text-sm">
                No matching courses found for "{searchQuery}".
              </p>
            ) : (
              filteredItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/60 transition-colors group"
                >
                  <div>
                    <h5 className="text-sm font-semibold text-white group-hover:text-[#E5B869] transition-colors">
                      {item.title}
                    </h5>
                    <p className="text-xs text-slate-400">{item.category}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {item.badge}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

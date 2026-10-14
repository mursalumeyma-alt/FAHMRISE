import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Code2, 
  Bot, 
  Award, 
  CheckCircle2, 
  Play, 
  ArrowRight, 
  Sparkles, 
  RotateCcw, 
  Clock,
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap,
  Lock,
  Unlock,
  AlertTriangle,
  RefreshCw,
  Calendar,
  Check,
  Printer,
  ExternalLink,
  Download,
  GraduationCap
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import ProgressBar from '../components/common/ProgressBar';
import Badge from '../components/common/Badge';
import AiTutorDrawer from '../components/ai/AiTutorDrawer';
import CertificateModal from '../components/common/CertificateModal';

export default function DashboardPage() {
  const { 
    user, 
    subscription, 
    isSubscriptionActive, 
    isTeacherReviewer,
    daysRemaining, 
    formattedExpiresAt,
    renewSubscription,
    testToggleSubscription,
    refreshSubscription,
    isEnrolledIn
  } = useAuth();

  
  const { progress, fetchProgress, resetCourseProgress } = useProgress();
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourseId, setSelectedCourseId] = useState('html-from-zero');
  const [activeCourse, setActiveCourse] = useState(null);
  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [renewing, setRenewing] = useState(false);
  const [renewSuccess, setRenewSuccess] = useState(false);

  // Certificates State
  const [earnedCertificates, setEarnedCertificates] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [claimingCert, setClaimingCert] = useState(false);

  const activeSub = isSubscriptionActive();

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await api.books.getAll();
      const catalog = data.courses || data.books || [];
      setAllCourses(catalog);

      const initialId = selectedCourseId || 'html-from-zero';
      const courseData = await api.books.getById(initialId);
      setActiveCourse(courseData.course || courseData.book);

      // Load Certificates
      try {
        const certData = await api.certificates.getMyCertificates();
        setEarnedCertificates(certData.certificates || []);
      } catch (certErr) {
        console.warn('Could not load certificates:', certErr);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleSelectCourse = async (courseId) => {
    setSelectedCourseId(courseId);
    try {
      const courseData = await api.books.getById(courseId);
      setActiveCourse(courseData.course || courseData.book);
      await fetchProgress(courseId);
    } catch (err) {
      console.error('Error switching course:', err);
    }
  };

  const handleRenew = async () => {
    setRenewing(true);
    setRenewSuccess(false);
    try {
      await renewSubscription({ method: 'mpesa' });
      setRenewSuccess(true);
      await refreshSubscription();
      if (selectedCourseId) {
        await fetchProgress(selectedCourseId);
      }
      setTimeout(() => setRenewSuccess(false), 4000);
    } catch (err) {
      console.error('Renewal error:', err);
      alert('Renewal failed. Please try again.');
    } finally {
      setRenewing(false);
    }
  };

  const handleTestToggle = async (targetState) => {
    try {
      await testToggleSubscription(targetState);
      await refreshSubscription();
      if (selectedCourseId) {
        await fetchProgress(selectedCourseId);
      }
    } catch (err) {
      console.error('Toggle error:', err);
    }
  };

  const handleReset = async () => {
    if (window.confirm(`Reset your progress for ${activeCourse?.title || 'this course'} back to 0% for testing?`)) {
      setResetting(true);
      try {
        await resetCourseProgress(selectedCourseId);
      } finally {
        setResetting(false);
      }
    }
  };

  const handleClaimCertificate = (courseId) => {
    const existing = earnedCertificates.find(c => c.courseId === courseId);
    if (existing) {
      setSelectedCert(existing);
    } else {
      setSelectedCert({
        courseId: courseId || selectedCourseId,
        courseTitle: activeCourse?.title || 'HTML From Zero',
        userName: user?.name && user.name !== 'Demo Learner' ? user.name : ''
      });
    }
    setCertModalOpen(true);
  };

  const handleCertificateUpdated = async (updatedCert) => {
    setSelectedCert(updatedCert);
    try {
      const certData = await api.certificates.getMyCertificates();
      setEarnedCertificates(certData.certificates || []);
    } catch (e) {
      console.warn('Could not reload certificates:', e);
    }
  };

  const openCertificate = (cert) => {
    setSelectedCert(cert);
    setCertModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading your FAHMRISE dashboard...</span>
        </div>
      </div>
    );
  }

  const completedLessons = progress?.completedLessons || [];
  const nextLesson = activeCourse?.lessons?.find(l => !completedLessons.includes(l.id)) || activeCourse?.lessons?.[0];
  const isCurrentCourseCompleted = (progress?.overallPercentage === 100) || (activeCourse?.lessons && completedLessons.length >= activeCourse.lessons.length);
  const currentCourseCert = earnedCertificates.find(c => c.courseId === selectedCourseId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome & Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-900">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                FAHMRISE Learning Dashboard
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                activeSub
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  : 'bg-rose-950 text-rose-300 border-rose-800'
              }`}>
                {activeSub ? 'Subscription Active 🔓' : 'Subscription Expired 🔒'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Welcome back, {user?.name || 'Learner'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Understand. Learn. Rise. Manage your courses, progress, and certificates below.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAiTutorOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-emerald-500/50 text-xs font-bold transition-all flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>Ask AI Tutor</span>
            </button>
            <Link
              to="/courses"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-glow transition-all flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4" />
              <span>Browse Catalog</span>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. LEARNER & TEACHER ACCESS STATUS BANNER */}
        {/* ========================================================================= */}
        {isTeacherReviewer ? (
          /* TEACHER REVIEWER DASHBOARD BANNER */
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/80 via-indigo-950/70 to-slate-900 border-2 border-indigo-500/50 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-black text-white">Teacher Reviewer Mode: Active</h2>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 uppercase tracking-wide">
                      Full Access Pass Unlocked
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                    Welcome to the FAHMRISE evaluation session. All courses across <strong>Technology</strong>, <strong>Islamic Studies</strong>, <strong>Business</strong>, and <strong>International Languages</strong> are pre-authorized with zero payment locks. Inspect curriculum structure, read lesson chapters, test quizzes, and verify practice sandboxes.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-indigo-300">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-indigo-900/60 font-mono">
                      Account: teacher@fahmrise.com
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-indigo-900/60 font-mono text-emerald-400">
                      Sample Student Progress Loaded
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
                <Link
                  to="/courses"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 hover:from-indigo-400 hover:to-teal-300 text-slate-950 font-black text-xs shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Browse All Courses</span>
                </Link>
                <Link
                  to="/practice"
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>Practice Arena</span>
                </Link>
              </div>
            </div>
          </div>
        ) : activeSub ? (
          /* ACTIVE SUBSCRIPTION BANNER */
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/60 border border-emerald-500/40 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                  <Unlock className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-white">All-Access Learning Pass: Active</h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                      {daysRemaining} Days Left
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    All courses, practice projects, quizzes, and certificates are unlocked.
                  </p>
                  <p className="text-[11px] text-emerald-400/90 font-mono mt-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Expires on {formattedExpiresAt || 'in 30 days'}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Link
                  to="/courses"
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-glow"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Explore Courses</span>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* GENERAL ENROLLED LEARNER BANNER */
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Welcome to Your Learning Dashboard</h2>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Continue your lessons below or explore newly released courses and practice tracks.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Link
                  to="/courses"
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-glow"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Explore Catalog</span>
                </Link>
              </div>
            </div>
          </div>
        )}


        {/* Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1">
            <span className="text-xs text-slate-400">Subscription State</span>
            <p className={`text-xl font-black ${activeSub ? 'text-emerald-400' : 'text-rose-400'}`}>
              {activeSub ? 'Active 🔓' : 'Expired 🔒'}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1">
            <span className="text-xs text-slate-400">Preserved Lessons</span>
            <p className="text-xl font-black text-emerald-400">{completedLessons.length} Completed</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1">
            <span className="text-xs text-slate-400">Earned Certificates</span>
            <p className="text-xl font-black text-amber-400">{earnedCertificates.length} 🏆</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1">
            <span className="text-xs text-slate-400">Current Course Progress</span>
            <p className="text-xl font-black text-teal-400">{progress?.overallPercentage || 0}%</p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. CERTIFICATES SECTION IN MY LEARNING */}
        {/* ========================================================================= */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg sm:text-xl font-black text-white">Earned Certificates of Completion</h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Official certificates issued upon 100% course completion. Permanently saved and never deleted on subscription expiration.
              </p>
            </div>

            {isCurrentCourseCompleted && !currentCourseCert && (
              <button
                onClick={() => handleClaimCertificate(selectedCourseId)}
                disabled={claimingCert}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-glow flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>{claimingCert ? 'Generating...' : `Claim Certificate for ${activeCourse?.title || 'Course'}`}</span>
              </button>
            )}
          </div>

          {earnedCertificates.length === 0 ? (
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-center space-y-3">
              <Award className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-sm font-bold text-white">No certificates earned yet</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Complete 100% of lessons, interactive quizzes, and coding challenges in any course to receive your verified FAHMRISE certificate of completion.
              </p>
              {isCurrentCourseCompleted && (
                <button
                  onClick={() => handleClaimCertificate(selectedCourseId)}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-glow mt-2"
                >
                  Claim Certificate for {activeCourse?.title} →
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {earnedCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/40 hover:border-emerald-400 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {cert.id}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified ✓
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {cert.courseTitle}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Awarded to: <strong className="text-slate-200">{cert.userName || user?.name}</strong> on {cert.formattedIssuedAt || cert.issuedAt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() => openCertificate(cert)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all flex items-center gap-1.5 shadow-glow"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>View Official Certificate</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openCertificate(cert)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                        title="Print / Save PDF"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        to={`/verify-certificate/${cert.id}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                        title="Verify Credential Link"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Course Cards Library */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <span>Available Courses & Access Status</span>
            </h2>
            <span className="text-xs text-slate-400">{allCourses.length} Courses Catalog</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allCourses.map((c) => {
              const isSelected = c.id === selectedCourseId;
              const isCoursePremium = Boolean(c.requiresPayment);
              const isCourseUnlocked = !isCoursePremium || activeSub || (isEnrolledIn && isEnrolledIn(c.id));

              return (
                <div
                  key={c.id}
                  onClick={() => handleSelectCourse(c.id)}
                  className={`cursor-pointer p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500 shadow-glow'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950 text-slate-300">
                        {c.category}
                      </span>
                      {isCourseUnlocked ? (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                          <Unlock className="w-3 h-3 text-emerald-400" /> Available
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 flex items-center gap-1">
                          <Lock className="w-3 h-3 text-rose-400" /> Locked (Expired)
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white">{c.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{c.subtitle}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-500">{c.totalLessons || 10} Chapters</span>
                    {isCourseUnlocked ? (
                      <Link
                        to={`/reader/${c.id}`}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-all flex items-center gap-1"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRenew();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40 text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <span>Renew to Access</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Course Spotlight & Next Lesson */}
        {activeCourse && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Current Course
                </span>
                <h2 className="text-2xl font-black text-white">{activeCourse.title}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{activeCourse.subtitle}</p>
              </div>

              <div className="flex items-center gap-3">
                {activeSub || !activeCourse.requiresPayment || (isEnrolledIn && isEnrolledIn(activeCourse.id)) ? (
                  <Link
                    to={`/reader/${activeCourse.id}/${nextLesson?.id || 'lesson-1'}`}
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-glow flex items-center gap-2 transition-all"
                  >
                    <Play className="w-4 h-4" />
                    <span>Continue: {nextLesson?.title || 'Chapter 1'}</span>
                  </Link>
                ) : (
                  <button
                    onClick={handleRenew}
                    className="px-6 py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs shadow-glow flex items-center gap-2 transition-all"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Renew Subscription to Unlock</span>
                  </button>
                )}

                <button
                  onClick={handleReset}
                  disabled={resetting}
                  title="Reset course progress"
                  className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <RotateCcw className={`w-4 h-4 ${resetting ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Course Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Preserved Learning Progress</span>
                <span className="font-bold text-emerald-400">{progress?.overallPercentage || 0}% Complete</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                  style={{ width: `${progress?.overallPercentage || 0}%` }}
                />
              </div>
            </div>

            {/* Syllabus Chapters List */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Chapters & Milestones
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(activeCourse.lessons || []).map((lesson, idx) => {
                  const isDone = completedLessons.includes(lesson.id);
                  const isAccessible = lesson.number === 1 || activeSub || !activeCourse.requiresPayment;

                  return (
                    <Link
                      key={lesson.id}
                      to={`/reader/${activeCourse.id}/${lesson.id}`}
                      className={`p-3.5 rounded-xl border flex items-center justify-between transition-all group ${
                        isDone
                          ? 'bg-slate-950/80 border-emerald-500/30'
                          : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                          isDone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <div>
                          <h4 className={`text-xs font-bold group-hover:text-emerald-300 transition-colors ${
                            isDone ? 'text-slate-200' : 'text-slate-300'
                          }`}>
                            {lesson.title}
                          </h4>
                          <span className="text-[10px] text-slate-500">{lesson.readingTime || '10 min'}</span>
                        </div>
                      </div>

                      {isAccessible ? (
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-rose-400" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* Practice Arena Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-amber-950/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">FAHMRISE Practice Arena</h3>
              <p className="text-xs text-slate-400">10 progressive real-world projects with separate file structure (index.html, style.css, script.js) and automated test runner.</p>
            </div>
          </div>
          <Link
            to="/practice"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-glow transition-all"
          >
            Open Practice Arena
          </Link>
        </div>

      </div>

      {/* Embedded Socratic AI Tutor Drawer */}
      <AiTutorDrawer
        isOpen={aiTutorOpen}
        onClose={() => setAiTutorOpen(false)}
        currentLesson={nextLesson || { title: activeCourse?.title || "FAHMRISE Learning", summary: "Active study session" }}
      />

      {/* Official Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        onCertificateUpdated={handleCertificateUpdated}
      />
    </div>
  );
}

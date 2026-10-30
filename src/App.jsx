import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import HomePage from './pages/HomePage';
import BookCatalogPage from './pages/BookCatalogPage';
import BookProductPage from './pages/BookProductPage';
import CheckoutPage from './pages/CheckoutPage';
import DashboardPage from './pages/DashboardPage';
import ReaderPage from './pages/ReaderPage';
import PracticePage from './pages/PracticePage';
import QuizPage from './pages/QuizPage';
import MiniProjectPage from './pages/MiniProjectPage';
import ProfilePage from './pages/ProfilePage';
import AiTutorPage from './pages/AiTutorPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CertificateVerifyPage from './pages/CertificateVerifyPage';
import AdminPage from './pages/AdminPage';
import AdminVideosPage from './pages/AdminVideosPage';
import BecomeCoachPage from './pages/BecomeCoachPage';
import InstructorDashboardPage from './pages/InstructorDashboardPage';
import ArabicTrackPage from './pages/ArabicTrackPage';
import FullStackProjectsPage from './pages/FullStackProjectsPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import WelcomePromoModal from './components/common/WelcomePromoModal';
import { ShieldCheck, Lock } from 'lucide-react';

// Protected Route Guard (For authenticated learners & admins)
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Verifying session...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children;
}

// Admin-Only Guard
function AdminRoute({ children }) {
  const { user, loading, login } = useAuth();
  const location = useLocation();
  const [switching, setSwitching] = React.useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Verifying administrator privileges...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (user.role !== 'admin') {
    const handleAdminSwitch = async () => {
      setSwitching(true);
      try {
        await login('admin@fahmrise.com', 'Admin@Fahmrise2026!');
      } catch (e) {
        console.error('Failed to switch to administrator account:', e);
      } finally {
        setSwitching(false);
      }
    };

    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900 border border-amber-500/30 rounded-3xl p-8 text-center shadow-2xl space-y-4">
          <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-2">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Administrator Access Required</h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            You are currently signed in as <strong className="text-white">{user.email}</strong> (Role: <code className="text-amber-300 font-mono">{user.role}</code>). The YouTube Video Manager and Operations Console are restricted to authorized administrators.
          </p>
          <div className="pt-2 space-y-2">
            <button
              onClick={handleAdminSwitch}
              disabled={switching}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{switching ? 'Authenticating Admin...' : '⚡ Switch to Administrator (1-Click)'}</span>
            </button>
            <a
              href="/dashboard"
              className="block w-full py-2.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              Return to Learner Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

// Disable automatic browser scroll restoration to prevent browser history restoring wrong scroll positions
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Scroll to top helper
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-[#0B2F2D] text-slate-100 selection:bg-[#E5B869] selection:text-[#0B2F2D]">
            <Navbar />
            <div className="flex-1">
              <Routes>
                {/* Dedicated International Languages Track Page */}
                <Route path="/tracks/international-languages" element={<ArabicTrackPage />} />
                <Route path="/international-languages" element={<ArabicTrackPage />} />
                <Route path="/tracks/languages" element={<ArabicTrackPage />} />
                <Route path="/languages" element={<ArabicTrackPage />} />
                <Route path="/courses/international-languages" element={<ArabicTrackPage />} />
                <Route path="/tracks/languages-arabic" element={<ArabicTrackPage />} />
                <Route path="/tracks/arabic" element={<ArabicTrackPage />} />
                <Route path="/languages-arabic" element={<ArabicTrackPage />} />
                <Route path="/arabic-track" element={<ArabicTrackPage />} />
                <Route path="/courses/languages-arabic" element={<ArabicTrackPage />} />

                {/* Public Marketing & Courses Catalog */}
                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<BookCatalogPage />} />
                <Route path="/courses/category/:categorySlug" element={<BookCatalogPage />} />
                <Route path="/category/:categorySlug" element={<BookCatalogPage />} />
                <Route path="/tracks/:categorySlug" element={<BookCatalogPage />} />
                <Route path="/courses/:bookId" element={<BookProductPage />} />
                <Route path="/books" element={<BookCatalogPage />} />
                <Route path="/books/category/:categorySlug" element={<BookCatalogPage />} />
                <Route path="/books/:bookId" element={<BookProductPage />} />
                
                {/* Checkout (Protected) */}
                <Route
                  path="/checkout/:bookId?"
                  element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  }
                />

                {/* Learner Dashboard (Protected) */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />

                {/* Instructor Portal & Revenue Dashboard (Protected) */}
                <Route
                  path="/instructor/dashboard"
                  element={
                    <ProtectedRoute>
                      <InstructorDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/instructor"
                  element={
                    <ProtectedRoute>
                      <InstructorDashboardPage />
                    </ProtectedRoute>
                  }
                />

                {/* Administration Console (Protected Admin Only) */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/videos"
                  element={
                    <AdminRoute>
                      <AdminVideosPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/video-manager"
                  element={
                    <AdminRoute>
                      <AdminVideosPage />
                    </AdminRoute>
                  }
                />

                {/* Multi-Course Reader */}
                <Route path="/reader/:bookId?/:lessonId?" element={<ReaderPage />} />
                
                {/* Practice Arena (10 Progressive JS Projects) */}
                <Route path="/practice/:practiceId?" element={<PracticePage />} />

                {/* Educational Blog & Articles */}
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />

                {/* Contact FAHMRISE Support */}
                <Route path="/contact" element={<ContactPage />} />

                {/* Full Stack Development Projects & Deployment (6 Progressive Projects) */}
                <Route path="/fullstack-projects" element={<FullStackProjectsPage />} />
                <Route path="/fullstack-projects/:projectId" element={<FullStackProjectsPage />} />
                <Route path="/projects/fullstack" element={<FullStackProjectsPage />} />
                <Route path="/projects/fullstack/:projectId" element={<FullStackProjectsPage />} />

                {/* Quizzes */}
                <Route path="/quiz/:quizId?" element={<QuizPage />} />

                {/* Mini Project */}
                <Route path="/project" element={<MiniProjectPage />} />

                {/* Profile & Credentials (Protected) */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />

                {/* Dedicated FAHMRISE AI Tutor */}
                <Route path="/ai-tutor" element={<AiTutorPage />} />

                {/* Public Certificate Verification */}
                <Route path="/verify-certificate/:certificateId" element={<CertificateVerifyPage />} />
                <Route path="/verify/:certificateId" element={<CertificateVerifyPage />} />

                {/* Become a FAHMRISE Coach */}
                <Route path="/become-a-coach" element={<BecomeCoachPage />} />
                <Route path="/become-coach" element={<BecomeCoachPage />} />
                <Route path="/coaches/apply" element={<BecomeCoachPage />} />

                {/* Authentication & Password Recovery */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            <WelcomePromoModal />
            <Footer />
          </div>
        </Router>
      </ProgressProvider>
    </AuthProvider>
  );
}

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
import BecomeCoachPage from './pages/BecomeCoachPage';
import InstructorDashboardPage from './pages/InstructorDashboardPage';
import ArabicTrackPage from './pages/ArabicTrackPage';
import FullStackProjectsPage from './pages/FullStackProjectsPage';

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
  const { user, loading } = useAuth();
  const location = useLocation();

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
    return <Navigate to="/dashboard" replace />;
  }

  return children;
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
          <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
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
                      <AdminPage defaultTab="videos" />
                    </AdminRoute>
                  }
                />

                {/* Multi-Course Reader */}
                <Route path="/reader/:bookId?/:lessonId?" element={<ReaderPage />} />
                
                {/* Practice Arena (10 Progressive JS Projects) */}
                <Route path="/practice/:practiceId?" element={<PracticePage />} />

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
            <Footer />
          </div>
        </Router>
      </ProgressProvider>
    </AuthProvider>
  );
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('fahmrise_token') || localStorage.getItem('somaivo_token'));
  const [enrollments, setEnrollments] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user data & subscription on startup
  useEffect(() => {
    async function loadUser() {
      if (token) {
        try {
          const data = await api.auth.getMe();
          setUser(data.user);
          setEnrollments(data.enrollments || []);
          setSubscription(data.subscription || null);
        } catch (err) {
          console.warn('Session expired or invalid, logging out:', err);
          logout();
        }
      }
      setLoading(false);
    }
    loadUser();
  }, [token]);

  const login = async (email, password) => {
    setError(null);
    try {
      const data = await api.auth.login(email, password);
      localStorage.setItem('fahmrise_token', data.token);
      setToken(data.token);
      setUser(data.user);
      setSubscription(data.subscription || null);

      const meData = await api.auth.getMe();
      setEnrollments(meData.enrollments || []);
      setSubscription(meData.subscription || null);
      return data;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    }
  };

  const loginDemo = async () => {
    try {
      return await login('demo@fahmrise.com', 'demo123');
    } catch (e) {
      return await login('demo@somaivo.com', 'demo123');
    }
  };

  const loginTeacherReviewer = async () => {
    setError(null);
    try {
      const data = await api.auth.teacherReviewerLogin();
      localStorage.setItem('fahmrise_token', data.token);
      setToken(data.token);
      setUser(data.user);
      setEnrollments(data.enrollments || []);
      setSubscription(data.subscription || null);
      return data;
    } catch (err) {
      setError(err.message || 'Teacher review access login failed');
      throw err;
    }
  };

  const register = async (userData) => {
    setError(null);
    try {
      const data = await api.auth.register(userData);
      localStorage.setItem('fahmrise_token', data.token);
      setToken(data.token);
      setUser(data.user);
      setEnrollments([]);
      setSubscription(data.subscription || null);
      return data;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('fahmrise_token');
    localStorage.removeItem('somaivo_token');
    setToken(null);
    setUser(null);
    setEnrollments([]);
    setSubscription(null);
  };

  const updateProfile = async (profileData) => {
    const data = await api.auth.updateProfile(profileData);
    setUser(data.user);
    return data;
  };

  const refreshSubscription = async () => {
    if (token) {
      try {
        const subData = await api.payments.getSubscriptionStatus();
        setSubscription(subData.subscription || null);
        return subData.subscription;
      } catch (err) {
        console.warn('Error refreshing subscription:', err);
      }
    }
    return null;
  };

  const renewSubscription = async (payload = {}) => {
    const res = await api.payments.renewSubscription(payload);
    setSubscription(res.subscription);
    return res;
  };

  const testToggleSubscription = async (targetState) => {
    const res = await api.payments.testToggleSubscription(targetState);
    setSubscription(res.subscription);
    return res;
  };

  const refreshEnrollments = async () => {
    if (token) {
      try {
        const data = await api.auth.getMe();
        setEnrollments(data.enrollments || []);
        setSubscription(data.subscription || null);
      } catch (err) {
        console.warn('Error refreshing enrollments:', err);
      }
    }
  };

  const isTeacherReviewer = Boolean(
    user?.role === 'teacher_reviewer' || 
    user?.isTeacherReviewer || 
    user?.email === 'teacher@fahmrise.com'
  );

  const isSubscriptionActive = () => {
    if (isTeacherReviewer) return true;
    if (!subscription) return false;
    return subscription.status === 'active' && new Date(subscription.expiresAt).getTime() > Date.now();
  };

  const isEnrolledIn = (bookId) => {
    if (!bookId) return false;
    // Teacher Reviewer has full unrestricted access across all courses
    if (isTeacherReviewer) return true;
    // If user has an active subscription, all courses are accessible
    if (isSubscriptionActive()) return true;

    const feAliases = [
      'frontend-developer-zero-to-job-ready', 'frontend-developer', 'frontend-job-ready',
      'html-from-zero', 'css-from-zero', 'javascript-from-zero', 'react-frontend',
      'web-development', 'frontend-zero-to-hero', 'frontend'
    ];
    const beAliases = [
      'backend-developer-zero-to-job-ready', 'backend-developer', 'backend-job-ready',
      'node-backend', 'express-backend', 'backend', 'backend-zero-to-hero',
      'backend-web-development', 'backend-engineering'
    ];

    return enrollments.some(e => {
      const eId = e.bookId || e.courseId;
      if (!eId) return false;
      if (e.status && e.status !== 'active') return false;
      if (eId === bookId) return true;
      if (feAliases.includes(bookId) && feAliases.includes(eId)) return true;
      if (beAliases.includes(bookId) && beAliases.includes(eId)) return true;
      return false;
    });
  };

  const value = {
    user,
    token,
    enrollments,
    subscription,
    isTeacherReviewer,
    isSubscriptionActive,
    subscriptionExpiresAt: isTeacherReviewer ? 'Teacher Reviewer Pass (1 Year Unlocked)' : subscription?.expiresAt,
    daysRemaining: isTeacherReviewer ? 365 : subscription?.daysRemaining,
    formattedExpiresAt: isTeacherReviewer ? 'Teacher Reviewer Pass (Full Access)' : subscription?.formattedExpiresAt,
    loading,
    error,
    login,
    loginDemo,
    loginTeacherReviewer,
    register,
    logout,
    updateProfile,
    isEnrolledIn,
    refreshEnrollments,
    refreshSubscription,
    renewSubscription,
    testToggleSubscription
  };


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

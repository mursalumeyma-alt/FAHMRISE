import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';
import confetti from 'canvas-confetti';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const { user, token } = useAuth();
  const [currentBookId, setCurrentBookId] = useState('html-from-zero');
  const [progress, setProgress] = useState({
    completedLessons: [],
    completedSmallLessons: {},
    completedExercises: [],
    quizScores: {},
    projectCompleted: false,
    projectSubmission: null,
    overallPercentage: 0
  });
  const [loading, setLoading] = useState(false);

  const fetchProgress = useCallback(async (bookId = currentBookId) => {
    if (!token || !user) return;
    setLoading(true);
    try {
      const data = await api.progress.get(bookId);
      setProgress(data.progress || {
        completedLessons: [],
        completedSmallLessons: {},
        completedExercises: [],
        quizScores: {},
        projectCompleted: false,
        projectSubmission: null,
        overallPercentage: 0
      });
    } catch (err) {
      console.warn('Failed to fetch progress:', err);
    } finally {
      setLoading(false);
    }
  }, [token, user, currentBookId]);

  useEffect(() => {
    if (token && user) {
      fetchProgress(currentBookId);
    } else {
      setProgress({
        completedLessons: [],
        completedSmallLessons: {},
        completedExercises: [],
        quizScores: {},
        projectCompleted: false,
        projectSubmission: null,
        overallPercentage: 0
      });
    }
  }, [token, user, currentBookId, fetchProgress]);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  const markLessonComplete = async (lessonId, bookId = currentBookId, chapterId = null, smallLessonId = null) => {
    if (!token) return;
    try {
      const data = await api.progress.completeLesson(bookId, lessonId, chapterId, smallLessonId);
      setProgress(data.progress);
      if (data.progress.overallPercentage === 100) {
        triggerCelebration();
      }
      return data;
    } catch (err) {
      console.error('Error completing lesson:', err);
      throw err;
    }
  };

  const markExerciseComplete = async (exerciseId, code, bookId = currentBookId) => {
    if (!token) return;
    try {
      const data = await api.progress.completeExercise(bookId, exerciseId, code);
      setProgress(data.progress);
      triggerCelebration();
      return data;
    } catch (err) {
      console.error('Error completing exercise:', err);
      throw err;
    }
  };

  const recordQuizScore = async (quizId, score, total, bookId = currentBookId) => {
    if (!token) return;
    try {
      const data = await api.progress.submitQuiz(bookId, quizId, score, total);
      setProgress(data.progress);
      if (score === total) {
        triggerCelebration();
      }
      return data;
    } catch (err) {
      console.error('Error recording quiz:', err);
      throw err;
    }
  };

  const submitProject = async (projectCode, checklistStatus, bookId = currentBookId) => {
    if (!token) return;
    try {
      const data = await api.progress.submitProject(bookId, projectCode, checklistStatus);
      setProgress(data.progress);
      triggerCelebration();
      return data;
    } catch (err) {
      console.error('Error submitting project:', err);
      throw err;
    }
  };

  const resetCourseProgress = async (bookId = currentBookId) => {
    if (!token) return;
    try {
      const data = await api.progress.reset(bookId);
      setProgress(data.progress);
      return data;
    } catch (err) {
      console.error('Error resetting progress:', err);
      throw err;
    }
  };

  const isLessonCompleted = (lessonId) => {
    return (progress.completedLessons || []).includes(lessonId);
  };

  const isSmallLessonCompleted = (chapterId, smallLessonId) => {
    const chapterSmall = (progress.completedSmallLessons || {})[chapterId] || [];
    return chapterSmall.includes(smallLessonId);
  };

  const isExerciseCompleted = (exerciseId) => {
    return (progress.completedExercises || []).includes(exerciseId);
  };

  const getQuizResult = (quizId) => {
    return (progress.quizScores || {})[quizId] || null;
  };

  const value = {
    currentBookId,
    setCurrentBookId,
    progress,
    loading,
    fetchProgress,
    markLessonComplete,
    markExerciseComplete,
    recordQuizScore,
    submitProject,
    resetCourseProgress,
    isLessonCompleted,
    isSmallLessonCompleted,
    isExerciseCompleted,
    getQuizResult
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}

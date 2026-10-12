import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  ChevronLeft, 
  BookOpen, 
  Code2, 
  Sparkles,
  Award,
  Check
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import Badge from '../components/common/Badge';

export default function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { recordQuizScore, getQuizResult } = useProgress();

  const [book, setBook] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: optionIndex }
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const activeQuizId = quizId || 'quiz-1';

  useEffect(() => {
    async function loadQuiz() {
      setLoading(true);
      try {
        const bookData = await api.books.getById('html-from-zero');
        setBook(bookData.book);

        const quizData = await api.books.getQuiz('html-from-zero', activeQuizId);
        setQuiz(quizData.quiz);

        // Reset state for new quiz
        setSelectedAnswers({});
        setSubmitted(false);
        setScore(0);
      } catch (err) {
        console.error('Failed to load quiz:', err);
      } finally {
        setLoading(false);
      }
    }
    loadQuiz();
  }, [activeQuizId]);

  const handleSelect = (questionId, optionIndex) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quiz) return;

    let correctCount = 0;
    quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setSubmitted(true);

    if (user) {
      await recordQuizScore(activeQuizId, correctCount, quiz.questions.length);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const currentIdx = book?.quizzes.findIndex(q => q.id === activeQuizId) ?? 0;
  const nextQuiz = book?.quizzes[currentIdx + 1];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading mastery quiz...</span>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p>Quiz not found.</p>
      </div>
    );
  }

  const allAnswered = quiz.questions.every(q => selectedAnswers[q.id] !== undefined);
  const percentage = Math.round((score / quiz.questions.length) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950 px-2.5 py-1 rounded-full border border-amber-800">
              QUIZ {currentIdx + 1} OF 10
            </span>
          </div>
        </div>

        {/* Quiz Title Banner */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-2 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" /> Concept Mastery Check
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {quiz.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Answer the questions below to test your retention. Detailed explanations will appear after you submit.
          </p>
        </div>

        {/* Score Summary Box (After Submission) */}
        {submitted && (
          <div className={`p-6 rounded-3xl border shadow-xl animate-in zoom-in-95 space-y-4 ${
            percentage >= 70
              ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-100'
              : 'bg-amber-950/50 border-amber-500/50 text-amber-100'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center font-black text-2xl">
                  {percentage >= 70 ? '🎉' : '📚'}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {percentage === 100 
                      ? 'Perfect Score! 100%' 
                      : percentage >= 70 
                      ? `Great Job! Score: ${score}/${quiz.questions.length} (${percentage}%)`
                      : `Keep Going! Score: ${score}/${quiz.questions.length} (${percentage}%)`}
                  </h3>
                  <p className="text-xs opacity-90 mt-0.5">
                    {percentage >= 70 
                      ? 'You have mastered the concepts in this lesson!' 
                      : 'Review the explanations below and give it another try.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRetry}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Quiz</span>
                </button>

                {nextQuiz && (
                  <button
                    onClick={() => navigate(`/quiz/${nextQuiz.id}`)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-glow flex items-center gap-1.5 transition-all"
                  >
                    <span>Next Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Questions Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {quiz.questions.map((q, qIndex) => {
            const userAnswer = selectedAnswers[q.id];
            const isCorrect = userAnswer === q.correctIndex;

            return (
              <div
                key={q.id}
                className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-md"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {qIndex + 1}
                  </span>
                  <h3 className="font-bold text-white text-base leading-snug">
                    {q.question}
                  </h3>
                </div>

                {/* Options List */}
                <div className="space-y-2.5 pt-1 pl-9">
                  {q.options.map((option, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    let optionStyle = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (submitted) {
                      if (optIdx === q.correctIndex) {
                        optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      } else {
                        optionStyle = 'bg-slate-950/30 border-slate-900 text-slate-600 opacity-60';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-emerald-500/10 border-emerald-500 text-emerald-300 font-semibold';
                    }

                    return (
                      <button
                        type="button"
                        key={optIdx}
                        onClick={() => handleSelect(q.id, optIdx)}
                        disabled={submitted}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                      >
                        <span className="leading-relaxed">{option}</span>
                        {submitted && optIdx === q.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        )}
                        {submitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box (Revealed after submission) */}
                {submitted && (
                  <div className="pt-3 mt-2 border-t border-slate-800/80 pl-9 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 space-y-1">
                      <span className="font-bold text-amber-400 block">Explanation:</span>
                      <p className="leading-relaxed text-slate-300">{q.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Submit Action */}
          {!submitted && (
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={!allAnswered}
                className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-glow disabled:opacity-40 disabled:hover:bg-emerald-500 transition-all flex items-center gap-2"
              >
                <span>Submit Quiz Answers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </form>

      </div>
    </div>
  );
}

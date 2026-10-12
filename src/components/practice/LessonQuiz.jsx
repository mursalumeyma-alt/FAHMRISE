import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  HelpCircle, 
  Award, 
  ArrowRight,
  Sparkles,
  Check,
  AlertCircle
} from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';

export default function LessonQuiz({ quiz, bookId, lessonId, onComplete }) {
  const { user } = useAuth();
  const { fetchProgress } = useProgress();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setSelectedAnswers({});
    setSubmitted(false);
    setResults(null);
  }, [quiz?.id, lessonId]);

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return null;
  }

  const questions = quiz.questions;

  const handleSelectOption = (qIdx, optIdx) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  const handleSubmit = async () => {
    if (submitted) return;
    setSubmitting(true);

    let correctCount = 0;
    const evaluated = questions.map((q, qIdx) => {
      const selected = selectedAnswers[qIdx];
      const isCorrect = selected !== undefined && selected === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        questionIndex: qIdx,
        selected,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation
      };
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    const passed = percentage >= 70;

    const summary = {
      score: correctCount,
      total: questions.length,
      percentage,
      passed,
      details: evaluated
    };

    setResults(summary);
    setSubmitted(true);
    setSubmitting(false);

    // Save to backend if user is authenticated
    if (user && bookId) {
      try {
        await api.quiz.submitQuiz(bookId, quiz.id || `quiz-${lessonId}`, selectedAnswers).catch(() => {});
        if (fetchProgress) {
          await fetchProgress(bookId);
        }
      } catch (err) {
        console.warn('Could not sync quiz progress to backend:', err);
      }
    }

    if (passed && onComplete) {
      onComplete(summary);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setResults(null);
  };

  const allAnswered = questions.every((_, qIdx) => selectedAnswers[qIdx] !== undefined);

  return (
    <div className="my-10 rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono text-[11px] font-bold uppercase tracking-wider">
              Knowledge Assessment
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {questions.length} Questions • 70% to pass
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {quiz.title || 'Module Knowledge Check'}
          </h3>
        </div>

        {submitted && results && (
          <div className={`px-4 py-2.5 rounded-2xl flex items-center gap-2.5 font-bold text-sm ${
            results.passed 
              ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300' 
              : 'bg-amber-950/80 border border-amber-500/50 text-amber-300'
          }`}>
            <Award className="w-5 h-5 shrink-0" />
            <div>
              <span>Score: {results.score}/{results.total} ({results.percentage}%)</span>
              <span className="text-xs ml-1 font-semibold">
                {results.passed ? '• Passed 🎉' : '• Review & Retry'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-8">
        {questions.map((q, qIdx) => {
          const selected = selectedAnswers[qIdx];
          const hasAnsweredThis = selected !== undefined;
          const isCorrect = submitted && selected === q.correctAnswer;
          const isWrong = submitted && hasAnsweredThis && selected !== q.correctAnswer;

          return (
            <div key={qIdx} className="space-y-3.5 p-5 rounded-2xl bg-slate-950/60 border border-slate-850">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 text-teal-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {qIdx + 1}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
                  {q.question}
                </h4>
              </div>

              {/* Options */}
              <div className="grid gap-2 pl-9">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selected === optIdx;
                  const isThisCorrect = submitted && optIdx === q.correctAnswer;
                  const isThisSelectedWrong = submitted && isSelected && !isThisCorrect;

                  let btnStyle = "bg-slate-900/90 border-slate-800 text-slate-300 hover:bg-slate-850 hover:text-white";

                  if (submitted) {
                    if (isThisCorrect) {
                      btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold ring-1 ring-emerald-500/30";
                    } else if (isThisSelectedWrong) {
                      btnStyle = "bg-rose-950/80 border-rose-500 text-rose-300 font-semibold ring-1 ring-rose-500/30";
                    } else {
                      btnStyle = "bg-slate-900/40 border-slate-850 text-slate-500 opacity-60";
                    }
                  } else if (isSelected) {
                    btnStyle = "bg-teal-950/60 border-teal-400 text-teal-200 font-semibold ring-1 ring-teal-500/40";
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition-all ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-full border text-[10px] font-mono flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-teal-400 bg-teal-500/20 text-teal-300'
                            : 'border-slate-700 text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </div>

                      {submitted && (
                        <div>
                          {isThisCorrect && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                          {isThisSelectedWrong && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation upon submission */}
              {submitted && q.explanation && (
                <div className={`ml-9 mt-3 p-3.5 rounded-xl border text-xs leading-relaxed ${
                  isCorrect 
                    ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' 
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}>
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>Explanation & Scholarly Context:</span>
                  </div>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {!submitted ? (
          <button
            type="button"
            disabled={!allAnswered || submitting}
            onClick={handleSubmit}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl transition-all ${
              allAnswered
                ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 cursor-pointer shadow-teal-500/20'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <span>Submit Quiz & Check Answers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
          </div>
        )}

        {!submitted && !allAnswered && (
          <p className="text-xs text-slate-400 text-center sm:text-right">
            Please answer all {questions.length} questions before submitting.
          </p>
        )}
      </div>
    </div>
  );
}

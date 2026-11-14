import React, { useState, useMemo } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Download, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  Layers, 
  Volume2, 
  AlertCircle, 
  HelpCircle,
  Clock,
  Printer,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  EXAM_SECTIONS, 
  EXAM_QUESTIONS, 
  PASSING_PERCENTAGE, 
  TOTAL_QUESTIONS, 
  PASSING_MINIMUM_CORRECT,
  gradeExam 
} from '../../data/tajweedFinalExamData';
import CertificateModal from '../common/CertificateModal';

export default function FinalExamInterface({ 
  course, 
  currentLesson, 
  user, 
  onComplete,
  isCompleted 
}) {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [activeReviewFilter, setActiveReviewFilter] = useState('all'); // 'all', 'incorrect', 'correct'
  const [warningMessage, setWarningMessage] = useState('');

  // Default learner name
  const learnerName = user?.name && user.name !== 'Demo Learner' 
    ? user.name 
    : 'FAHMRISE Learner';

  // Deterministic certificate ID based on user and course
  const certId = useMemo(() => {
    const seed = (user?.id || 'learner') + '-tajweed-2026';
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash |= 0;
    }
    const cleanHash = Math.abs(hash).toString(36).toUpperCase().padStart(4, '7').substring(0, 4);
    return `FAHM-TAJ-${cleanHash}-2026`;
  }, [user]);

  const activeSection = EXAM_SECTIONS[activeSectionIndex];
  const sectionQuestions = useMemo(() => {
    return activeSection.questionIndices.map(idx => ({
      ...EXAM_QUESTIONS[idx],
      globalIndex: idx
    }));
  }, [activeSection]);

  const totalAnswered = useMemo(() => {
    return Object.keys(answers).filter(k => answers[k] !== undefined && answers[k] !== null).length;
  }, [answers]);

  const progressPercentage = Math.round((totalAnswered / TOTAL_QUESTIONS) * 100);

  const handleSelectOption = (questionId, optionIndex) => {
    if (submitted) return; // Prevent edits after submission
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
    setWarningMessage('');
  };

  const handleSubmitExam = () => {
    if (isSubmitting || submitted) return;

    if (totalAnswered < TOTAL_QUESTIONS) {
      const remaining = TOTAL_QUESTIONS - totalAnswered;
      const confirmSubmit = window.confirm(
        `You have ${remaining} unanswered question${remaining > 1 ? 's' : ''}. Unanswered questions will be marked incorrect. Do you want to submit anyway?`
      );
      if (!confirmSubmit) {
        setWarningMessage(`Please answer the remaining ${remaining} question${remaining > 1 ? 's' : ''} before submitting, or confirm to proceed.`);
        return;
      }
    }

    setIsSubmitting(true);
    setWarningMessage('');

    // Instant grading calculation
    const examResults = gradeExam(answers);
    setResults(examResults);
    setSubmitted(true);
    setIsSubmitting(false);

    // If passed, notify parent to mark chapter complete
    if (examResults.passed && onComplete) {
      onComplete();
    }

    // Scroll to top of results
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleRetakeExam = () => {
    const confirmRetake = window.confirm('Are you sure you want to retake the examination? Your current answers will be reset.');
    if (!confirmRetake) return;

    setAnswers({});
    setSubmitted(false);
    setResults(null);
    setShowReview(false);
    setActiveSectionIndex(0);
    setWarningMessage('');
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  // Certificate Object for CertificateModal
  const certificateData = useMemo(() => {
    const today = new Date().toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });

    return {
      id: certId,
      certificateId: certId,
      courseId: 'quran-tajweed-from-zero',
      courseTitle: 'AHKAMU AL TAJWEUED',
      userName: learnerName,
      recipientName: learnerName,
      category: 'Qur\'anic Sciences & Recitation',
      grade: results ? `Passed with Distinction (${results.percentage}%)` : 'Distinction & Full Mastery',
      issuedAt: new Date().toISOString(),
      formattedIssuedAt: today,
      status: 'verified',
      brand: 'FAHMRISE',
      tagline: 'Understand. Learn. Rise.',
      issuer: 'FAHMRISE Board'
    };
  }, [certId, learnerName, results]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. HERO HEADER: FAHMRISE BRANDING (Deep Green #0B2F2D, Gold #E5B869, Cream #FAF8F5) */}
      <div 
        className="relative overflow-hidden rounded-3xl border border-[#E5B869]/30 p-6 sm:p-10 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #0B2F2D 0%, #061918 55%, #0B2F2D 100%)'
        }}
      >
        {/* Subtle Islamic geometric pattern decorative overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #E5B869 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5B869]/20 border border-[#E5B869]/50 text-xs font-bold text-[#E5B869] uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#E5B869]" />
              <span>Chapter 11 • Official Final Examination</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#FAF8F5]/80 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#E5B869]" />
              <span>80% Passing Threshold Required for Certificate</span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#FAF8F5] tracking-tight leading-tight">
              Chapter 11: Final Tajweed Examination & Certification
            </h1>
            <div 
              className="text-xl sm:text-2xl font-serif text-[#E5B869] font-medium" 
              dir="rtl"
              style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
            >
              الاختبار النهائي وشهادة إتمام التجويد
            </div>
            <p className="text-sm sm:text-base text-[#FAF8F5]/90 max-w-3xl leading-relaxed font-normal">
              Test your Tajweed knowledge and earn your certificate. This comprehensive final assessment synthesizes all 10 chapters: Makharij, Sifaat, Noon & Meem Sakinah, Qalqalah, Madd elongation, Tafkhim/Tarqiq, Waqf stopping symbols, and practical Quranic recitation.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10 text-xs text-[#FAF8F5]">
            <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
              <span className="text-[#FAF8F5]/60 block text-[11px]">Total Sections</span>
              <span className="text-base font-bold text-[#E5B869]">6 Core Sections</span>
            </div>
            <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
              <span className="text-[#FAF8F5]/60 block text-[11px]">Total Questions</span>
              <span className="text-base font-bold text-[#E5B869]">{TOTAL_QUESTIONS} Questions</span>
            </div>
            <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
              <span className="text-[#FAF8F5]/60 block text-[11px]">Passing Mark</span>
              <span className="text-base font-bold text-emerald-400">80% ({PASSING_MINIMUM_CORRECT} / {TOTAL_QUESTIONS})</span>
            </div>
            <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
              <span className="text-[#FAF8F5]/60 block text-[11px]">Credential</span>
              <span className="text-base font-bold text-[#E5B869]">Verified Certificate</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RESULTS VIEW (IF SUBMITTED) */}
      {submitted && results && (
        <div className="space-y-6">
          {results.passed ? (
            /* PASSED CARD: FAHMRISE BRAND COLORS */
            <div 
              className="rounded-3xl border-2 border-[#E5B869] p-6 sm:p-10 shadow-2xl space-y-6 text-center animate-in zoom-in-95 duration-300"
              style={{
                background: 'linear-gradient(135deg, #0B2F2D 0%, #082422 60%, #041413 100%)'
              }}
            >
              <div className="w-20 h-20 mx-auto rounded-3xl bg-[#E5B869]/20 border border-[#E5B869]/60 flex items-center justify-center text-[#E5B869] shadow-lg shadow-[#E5B869]/10">
                <Award className="w-10 h-10 text-[#E5B869]" />
              </div>

              <div className="space-y-2 max-w-2xl mx-auto">
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#E5B869]/20 text-[#E5B869] font-mono text-xs font-bold uppercase tracking-wider border border-[#E5B869]/40">
                  ★ Distinction & Full Tajweed Mastery ★
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FAF8F5] tracking-tight">
                  Mabrook! Congratulations, {learnerName}! 🎉
                </h2>
                <p className="text-sm sm:text-base text-[#FAF8F5]/90 leading-relaxed font-normal">
                  You have successfully passed the final comprehensive examination for <strong className="text-[#E5B869] font-bold">AHKAMU AL TAJWEUED</strong> with an outstanding score of <strong className="text-emerald-300 font-bold">{results.score} / {results.total} ({results.percentage}%)</strong>, well exceeding the 80% passing threshold!
                </p>
              </div>

              {/* Verified Certificate Mini-Preview Card */}
              <div className="max-w-xl mx-auto bg-black/40 border border-[#E5B869]/40 rounded-2xl p-5 text-left space-y-3.5 shadow-inner">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#E5B869]" />
                    <span className="text-xs font-bold text-[#FAF8F5] uppercase tracking-wider">Official Verified Credential</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    STATUS: VERIFIED ✓
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#FAF8F5]/80 font-mono">
                  <div>
                    <span className="block text-[10px] text-[#FAF8F5]/50 uppercase">Recipient:</span>
                    <span className="font-bold text-[#FAF8F5] text-sm">{learnerName}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#FAF8F5]/50 uppercase">Course:</span>
                    <span className="font-bold text-[#E5B869] text-sm">AHKAMU AL TAJWEUED</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#FAF8F5]/50 uppercase">Issue Date:</span>
                    <span className="font-bold text-[#FAF8F5]">{certificateData.formattedIssuedAt}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#FAF8F5]/50 uppercase">Certificate Verification ID:</span>
                    <span className="font-bold text-emerald-400 font-mono">{certId}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowCertModal(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#E5B869] hover:bg-[#d6a555] text-[#0B2F2D] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl hover:shadow-[#E5B869]/30 transition-all active:scale-95"
                >
                  <Award className="w-5 h-5 text-[#0B2F2D]" />
                  <span>View & Download Certificate</span>
                </button>

                <button
                  onClick={() => setShowReview(!showReview)}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-black/40 hover:bg-black/60 border border-white/20 text-[#FAF8F5] font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <BookOpen className="w-4 h-4 text-[#E5B869]" />
                  <span>{showReview ? 'Hide Question Explanations' : 'Review Questions & Explanations'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* FAILED CARD: ENCOURAGING RETRY */
            <div className="rounded-3xl border border-amber-500/50 bg-slate-900/90 p-6 sm:p-10 shadow-2xl space-y-6 text-center animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <RotateCcw className="w-10 h-10 text-amber-400" />
              </div>

              <div className="space-y-2 max-w-xl mx-auto">
                <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider border border-amber-500/30">
                  Passing Standard: 80% Required
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Score: {results.score} / {results.total} ({results.percentage}%)
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  You scored <strong className="text-amber-400">{results.percentage}%</strong>. A minimum score of <strong className="text-white">80% ({PASSING_MINIMUM_CORRECT} / {TOTAL_QUESTIONS} correct)</strong> is strictly required to unlock your official verified certificate.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                  ⚠️ <strong className="text-amber-300">Certificate Locked:</strong> Certificates are only issued to students who achieve the 80% mastery threshold. Please review the detailed explanations below to strengthen your understanding, then retake the examination.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRetakeExam}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
                >
                  <RotateCcw className="w-4 h-4 text-slate-950" />
                  <span>Retake Examination</span>
                </button>

                <button
                  onClick={() => setShowReview(!showReview)}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <BookOpen className="w-4 h-4 text-teal-400" />
                  <span>{showReview ? 'Hide Explanations' : 'Review Questions & Explanations'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Section Breakdown Grid */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#E5B869]" />
              <span>Section Performance Breakdown</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.values(results.sectionBreakdown).map(sec => {
                const isSecPassed = sec.percentage >= 80;
                return (
                  <div 
                    key={sec.sectionId} 
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">
                        Section {sec.number}: {sec.title}
                      </span>
                      <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                        isSecPassed 
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                      }`}>
                        {sec.correct}/{sec.total} ({sec.percentage}%)
                      </span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          isSecPassed ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${sec.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Question Explanations Review */}
          {showReview && (
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#E5B869]" />
                  <span>Comprehensive Question Review & Explanations</span>
                </h3>

                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    onClick={() => setActiveReviewFilter('all')}
                    className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                      activeReviewFilter === 'all'
                        ? 'bg-slate-800 text-white border border-slate-700'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All ({results.total})
                  </button>
                  <button
                    onClick={() => setActiveReviewFilter('incorrect')}
                    className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                      activeReviewFilter === 'incorrect'
                        ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Incorrect ({results.total - results.score})
                  </button>
                  <button
                    onClick={() => setActiveReviewFilter('correct')}
                    className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                      activeReviewFilter === 'correct'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Correct ({results.score})
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {results.questionResults
                  .filter(q => {
                    if (activeReviewFilter === 'incorrect') return !q.isCorrect;
                    if (activeReviewFilter === 'correct') return q.isCorrect;
                    return true;
                  })
                  .map((q, idx) => (
                    <div 
                      key={q.id}
                      className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-3.5 ${
                        q.isCorrect 
                          ? 'bg-slate-900/80 border-emerald-500/30' 
                          : 'bg-slate-900/90 border-amber-500/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-[11px] font-mono text-slate-400 block">
                            Question {q.index + 1} of {TOTAL_QUESTIONS} • {q.sectionTitle}
                          </span>
                          <h4 className="text-sm sm:text-base font-semibold text-white leading-snug">
                            {q.question}
                          </h4>
                          {q.arabicPrompt && (
                            <p 
                              className="text-base sm:text-lg text-[#E5B869] font-serif pt-1" 
                              dir="rtl"
                              style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
                            >
                              {q.arabicPrompt}
                            </p>
                          )}
                        </div>

                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shrink-0 ${
                          q.isCorrect 
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' 
                            : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                        }`}>
                          {q.isCorrect ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Correct</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5 text-amber-400" />
                              <span>Incorrect</span>
                            </>
                          )}
                        </span>
                      </div>

                      {/* Options Grid */}
                      <div className="space-y-2 pt-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = q.submittedAnswer === optIdx;
                          const isRight = q.correctAnswer === optIdx;

                          let badgeClass = 'border-slate-800 bg-slate-950/60 text-slate-400';
                          if (isRight) {
                            badgeClass = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold';
                          } else if (isSelected && !isRight) {
                            badgeClass = 'border-amber-500 bg-amber-950/40 text-amber-200';
                          }

                          return (
                            <div 
                              key={optIdx} 
                              className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 transition-all ${badgeClass}`}
                            >
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                                isRight 
                                  ? 'bg-emerald-500 text-slate-950' 
                                  : isSelected 
                                    ? 'bg-amber-500 text-slate-950' 
                                    : 'bg-slate-800 text-slate-400'
                              }`}>
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span className="flex-1 leading-relaxed">{opt}</span>
                              {isRight && (
                                <span className="text-[10px] font-bold text-emerald-400 shrink-0 uppercase tracking-wider font-mono">
                                  Correct Answer ✓
                                </span>
                              )}
                              {isSelected && !isRight && (
                                <span className="text-[10px] font-bold text-amber-400 shrink-0 uppercase tracking-wider font-mono">
                                  Your Choice ✗
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Pedagogical Explanation Box */}
                      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-teal-400 font-semibold text-xs">
                          <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
                          <span>Pedagogical Tajweed Explanation:</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed font-normal">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. ACTIVE EXAMINATION QUESTION INTERFACE (WHEN NOT SUBMITTED) */}
      {!submitted && (
        <div className="space-y-6">

          {/* Section Navigation Tabs (6 Sections) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Exam Sections Navigation</span>
              <span className="font-mono text-teal-400">
                Overall Progress: {totalAnswered} / {TOTAL_QUESTIONS} Answered ({progressPercentage}%)
              </span>
            </div>

            {/* Overall Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progressPercentage}%`,
                  background: 'linear-gradient(90deg, #0B2F2D 0%, #E5B869 100%)'
                }}
              />
            </div>

            {/* 6 Section Tab Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
              {EXAM_SECTIONS.map((sec, secIdx) => {
                const isActive = activeSectionIndex === secIdx;
                // Count answered in this section
                const answeredCount = sec.questionIndices.filter(
                  idx => answers[EXAM_QUESTIONS[idx].id] !== undefined
                ).length;
                const isSectionComplete = answeredCount === sec.questionIndices.length;

                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setActiveSectionIndex(secIdx);
                      setWarningMessage('');
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all relative ${
                      isActive 
                        ? 'bg-[#0B2F2D] border-[#E5B869] shadow-lg shadow-[#0B2F2D]/50 ring-1 ring-[#E5B869]' 
                        : isSectionComplete
                          ? 'bg-slate-900/90 border-emerald-500/30 hover:bg-slate-900'
                          : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-mono font-bold uppercase ${
                        isActive ? 'text-[#E5B869]' : 'text-slate-500'
                      }`}>
                        Sec {sec.number}
                      </span>
                      {isSectionComplete ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <span className="text-[10px] font-mono text-slate-500">
                          {answeredCount}/4
                        </span>
                      )}
                    </div>
                    <div className={`text-xs font-bold truncate ${
                      isActive ? 'text-[#FAF8F5]' : 'text-slate-200'
                    }`}>
                      {sec.title}
                    </div>
                    <div 
                      className={`text-[11px] font-serif truncate mt-0.5 ${
                        isActive ? 'text-[#E5B869]' : 'text-slate-500'
                      }`}
                      dir="rtl"
                      style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
                    >
                      {sec.arabicTitle}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Section Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-[#E5B869]/20 text-[#E5B869] font-mono text-xs font-bold">
                  Section {activeSection.number} of 6
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {activeSection.subtitle}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>{activeSection.title}</span>
                <span 
                  className="font-serif text-[#E5B869] text-base" 
                  dir="rtl"
                  style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
                >
                  ({activeSection.arabicTitle})
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={activeSectionIndex === 0}
                onClick={() => {
                  setActiveSectionIndex(prev => Math.max(0, prev - 1));
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold text-slate-200 flex items-center gap-1 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev Section</span>
              </button>
              <button
                disabled={activeSectionIndex === EXAM_SECTIONS.length - 1}
                onClick={() => {
                  setActiveSectionIndex(prev => Math.min(EXAM_SECTIONS.length - 1, prev + 1));
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold text-[#E5B869] flex items-center gap-1 transition-all"
              >
                <span>Next Section</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Questions in Active Section */}
          <div className="space-y-6">
            {sectionQuestions.map((q, localIdx) => {
              const selectedOpt = answers[q.id];
              const isAnswered = selectedOpt !== undefined;

              return (
                <div 
                  key={q.id}
                  className={`p-6 rounded-3xl border transition-all space-y-4 shadow-lg ${
                    isAnswered 
                      ? 'bg-slate-900/90 border-slate-750' 
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  {/* Question Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <span className="font-bold text-[#E5B869]">
                          Question {q.globalIndex + 1} of {TOTAL_QUESTIONS}
                        </span>
                        <span>•</span>
                        <span>Section {q.sectionNumber}: {q.sectionTitle}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                        {q.question}
                      </h3>
                      {q.arabicPrompt && (
                        <div 
                          className="pt-2 text-lg sm:text-xl font-serif text-[#E5B869] font-medium" 
                          dir="rtl"
                          style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
                        >
                          {q.arabicPrompt}
                        </div>
                      )}
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold shrink-0 ${
                      isAnswered 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {isAnswered ? 'Answered ✓' : 'Pending'}
                    </span>
                  </div>

                  {/* Options List */}
                  <div className="space-y-2.5 pt-2">
                    {q.options.map((optionText, optIdx) => {
                      const isOptionSelected = selectedOpt === optIdx;

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`p-3.5 sm:p-4 rounded-2xl border text-sm flex items-start gap-3 cursor-pointer transition-all active:scale-[0.99] ${
                            isOptionSelected 
                              ? 'bg-[#0B2F2D] border-[#E5B869] text-[#FAF8F5] shadow-md ring-1 ring-[#E5B869]' 
                              : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-950'
                          }`}
                        >
                          {/* Radio Pill */}
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-all ${
                            isOptionSelected 
                              ? 'bg-[#E5B869] text-[#0B2F2D]' 
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </div>

                          <div className="flex-1 leading-relaxed font-normal">
                            {optionText}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section Navigation & Submission Bar */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {activeSectionIndex > 0 && (
                <button
                  onClick={() => {
                    setActiveSectionIndex(prev => prev - 1);
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Section</span>
                </button>
              )}

              {activeSectionIndex < EXAM_SECTIONS.length - 1 && (
                <button
                  onClick={() => {
                    setActiveSectionIndex(prev => prev + 1);
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[#E5B869] text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <span>Next Section</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Submission Button */}
            <div className="w-full sm:w-auto flex flex-col items-end gap-2">
              {warningMessage && (
                <div className="text-xs text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{warningMessage}</span>
                </div>
              )}

              <button
                onClick={handleSubmitExam}
                disabled={isSubmitting}
                className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-xl active:scale-95 bg-[#E5B869] hover:bg-[#d6a555] text-[#0B2F2D] shadow-[#E5B869]/20"
              >
                <CheckCircle2 className="w-5 h-5 text-[#0B2F2D]" />
                <span>
                  {isSubmitting ? 'Grading Examination...' : 'Submit Examination & View Score'}
                </span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* 4. MODAL: OFFICIAL VERIFIED FAHMRISE CERTIFICATE */}
      <CertificateModal
        certificate={certificateData}
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
        onCertificateUpdated={() => {}}
      />

    </div>
  );
}

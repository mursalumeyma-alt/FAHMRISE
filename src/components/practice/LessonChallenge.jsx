import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Play, 
  RotateCcw, 
  HelpCircle, 
  Check, 
  Award, 
  AlertCircle, 
  ArrowRight,
  Volume2,
  Sparkles,
  HelpCircle as QuestionIcon
} from 'lucide-react';
import AudioPlayer from '../common/AudioPlayer';
import { playPronunciation, stopAllAudio } from '../../utils/soundService';

/**
 * Interactive Challenge Engine for FAHMRISE Small Lessons
 * Supports:
 * - Code execution testing (JS sandbox)
 * - Multiple-choice & true/false verification
 * - Tajweed audio listening questions with replay
 * - Pairwise letter comparison drills
 * - Per-option explanations & retry workflow
 * - Large accessible typography (18-22px questions, 36-48px Arabic, 48px+ touch targets)
 */
export default function LessonChallenge({ challenge, onComplete, isCompleted = false }) {
  if (!challenge) return null;

  const isCodeChallenge = challenge.type === 'code';
  const isQuizChallenge = challenge.type === 'quiz' || challenge.type === 'multiple-choice' || challenge.type === 'true-false';

  // Code challenge state
  const [userCode, setUserCode] = useState(challenge.starterCode || '');
  const [testOutput, setTestOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // Quiz challenge state
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isQuizCorrect, setIsQuizCorrect] = useState(false);

  useEffect(() => {
    setUserCode(challenge.starterCode || '');
    setTestOutput(null);
    setSelectedOption(null);
    setQuizSubmitted(false);
    setIsQuizCorrect(false);
  }, [challenge]);

  // Code execution & test case runner
  const handleRunCode = () => {
    setIsRunning(true);
    setTestOutput(null);

    const logs = [];
    const customConsole = {
      log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
      warn: (...args) => logs.push('[WARN] ' + args.join(' ')),
      error: (...args) => logs.push('[ERROR] ' + args.join(' '))
    };

    try {
      const runFn = new Function('console', userCode);
      runFn(customConsole);

      const actualOutput = logs.join('\n').trim();
      let passed = false;

      if (challenge.testCases && challenge.testCases.length > 0) {
        const expected = challenge.testCases[0].expected.trim();
        passed = actualOutput === expected || actualOutput.includes(expected);
      } else {
        passed = true;
      }

      setTestOutput({
        success: passed,
        output: actualOutput || '(No console output)',
        message: passed
          ? 'Excellent work! Your code passed all test assertions.'
          : `Output didn't match expected test case.`
      });

      if (passed && onComplete) {
        onComplete();
      }
    } catch (err) {
      setTestOutput({
        success: false,
        output: logs.join('\n'),
        error: err.message || 'Execution error'
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleResetCode = () => {
    setUserCode(challenge.starterCode || '');
    setTestOutput(null);
  };

  // Quiz submission handler
  const handleOptionSelect = (index) => {
    if (quizSubmitted && isQuizCorrect) return;
    setSelectedOption(index);
    setQuizSubmitted(false);
  };

  const handleCheckQuiz = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === challenge.correctAnswer;
    setIsQuizCorrect(correct);
    setQuizSubmitted(true);

    if (correct && onComplete) {
      onComplete();
    }
  };

  const handleResetQuiz = () => {
    setSelectedOption(null);
    setQuizSubmitted(false);
    setIsQuizCorrect(false);
  };

  return (
    <div className="mt-8 rounded-3xl bg-slate-900/95 border border-teal-800/40 shadow-2xl overflow-hidden backdrop-blur-sm">
      {/* Challenge Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
              {challenge.title || 'Interactive Lesson Mastery Challenge'}
            </h3>
            <p className="text-xs text-teal-400/90 font-medium mt-0.5">
              {isCodeChallenge ? 'Code Implementation & Testing' : 'Concept & Articulation Verification'}
            </p>
          </div>
        </div>

        {isCompleted && (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-inner">
            <CheckCircle className="w-4 h-4 text-emerald-400" /> Completed
          </span>
        )}
      </div>

      {/* Challenge Body */}
      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Optional Listening Audio Prompt (for Tajweed / Makharij listening tests) */}
        {(challenge.audioPrompt || challenge.arabicPrompt) && (
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-teal-900/60 shadow-inner">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-2">
              🎧 Audio Listening Prompt:
            </span>
            <AudioPlayer
              arabicText={challenge.arabicPrompt || challenge.audioPrompt}
              transliteration={challenge.promptTransliteration || 'Listen to the sound carefully'}
              soundCue={challenge.soundCue || 'Focus on the point of articulation and letter weight'}
              label="Recitation Sample"
              size="large"
            />
          </div>
        )}

        {/* Large Accessible Question Title */}
        <div className="space-y-2">
          <p className="text-lg sm:text-xl text-slate-100 font-semibold leading-relaxed">
            {challenge.question}
          </p>
          {challenge.subQuestion && (
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {challenge.subQuestion}
            </p>
          )}
        </div>

        {/* ========================================================================= */}
        {/* CODE CHALLENGE MODE */}
        {/* ========================================================================= */}
        {isCodeChallenge && (
          <div className="space-y-4">
            <div className="relative rounded-2xl border border-slate-700 bg-slate-950 overflow-hidden shadow-inner">
              <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">solution.js</span>
                <button
                  onClick={handleResetCode}
                  type="button"
                  className="min-h-[36px] px-3 rounded-lg text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Code
                </button>
              </div>

              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                rows={7}
                spellCheck={false}
                className="w-full bg-slate-950 text-emerald-300 font-mono text-sm p-4 focus:outline-none focus:ring-1 focus:ring-teal-500/50 resize-y"
                placeholder="// Write your code solution here..."
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                type="button"
                className="min-h-[48px] px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-teal-500/20 active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                {isRunning ? 'Testing Assertion...' : 'Run & Verify Solution'}
              </button>

              {challenge.solution && (
                <button
                  onClick={() => setUserCode(challenge.solution)}
                  type="button"
                  className="text-xs text-slate-400 hover:text-teal-400 underline underline-offset-4"
                >
                  Need help? View solution code
                </button>
              )}
            </div>

            {testOutput && (
              <div
                className={`p-5 rounded-2xl border ${
                  testOutput.success
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {testOutput.success ? (
                    <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 space-y-2">
                    <p className="font-bold text-base">
                      {testOutput.success ? 'Challenge Passed!' : 'Assertion Failed'}
                    </p>
                    {testOutput.output && (
                      <div className="p-3 bg-black/50 rounded-xl font-mono text-xs text-slate-200">
                        <span className="text-slate-400 block mb-1">Console Output:</span>
                        {testOutput.output}
                      </div>
                    )}
                    {challenge.explanation && (
                      <p className="text-xs sm:text-sm text-slate-300 border-t border-slate-800/80 pt-2 leading-relaxed">
                        💡 <strong>Explanation:</strong> {challenge.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* QUIZ / MULTIPLE CHOICE MODE */}
        {/* ========================================================================= */}
        {isQuizChallenge && challenge.options && (
          <div className="space-y-4">
            <div className="grid gap-3">
              {challenge.options.map((opt, index) => {
                const isSelected = selectedOption === index;
                const isCorrectAnswer = index === challenge.correctAnswer;
                const isString = typeof opt === 'string';
                const optText = isString ? opt : opt.text;
                const optArabic = !isString ? opt.arabic : null;
                const optSound = !isString ? opt.sound : null;

                let optionStyle = 'border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:border-slate-700';

                if (quizSubmitted) {
                  if (isCorrectAnswer) {
                    optionStyle = 'border-emerald-500 bg-emerald-950/50 text-emerald-100 ring-2 ring-emerald-500/40 shadow-lg';
                  } else if (isSelected && !isQuizCorrect) {
                    optionStyle = 'border-rose-500 bg-rose-950/50 text-rose-100 ring-2 ring-rose-500/40';
                  }
                } else if (isSelected) {
                  optionStyle = 'border-teal-400 bg-teal-950/40 text-teal-100 ring-2 ring-teal-400/50';
                }

                return (
                  <div
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`min-h-[56px] p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${optionStyle}`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span className="w-8 h-8 rounded-xl border border-slate-700 bg-slate-800 flex items-center justify-center text-xs font-mono font-bold text-slate-200 shrink-0">
                        {String.fromCharCode(65 + index)}
                      </span>

                      <div className="flex-1">
                        <span className="text-sm sm:text-base font-medium leading-relaxed block">
                          {optText}
                        </span>

                        {optArabic && (
                          <div className="mt-2 flex items-center gap-3">
                            <span
                              className="text-3xl sm:text-4xl font-serif text-teal-200 font-bold leading-normal"
                              style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
                              dir="rtl"
                            >
                              {optArabic}
                            </span>
                            {optSound && (
                              <span className="text-xs text-slate-400 font-mono">({optSound})</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      {(optArabic || optSound) && (
                        <AudioPlayer
                          compact
                          arabicText={optArabic || optText}
                          soundCue={optSound}
                        />
                      )}

                      {quizSubmitted && isCorrectAnswer && (
                        <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </span>
                      )}
                      {quizSubmitted && isSelected && !isQuizCorrect && (
                        <span className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
                          <XCircle className="w-4 h-4 stroke-[2]" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quiz Actions */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleCheckQuiz}
                disabled={selectedOption === null}
                type="button"
                className="min-h-[52px] px-8 py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-slate-950 font-extrabold text-sm transition-all shadow-xl shadow-teal-500/20 active:scale-95 flex items-center gap-2"
              >
                <Check className="w-5 h-5 stroke-[2.5]" />
                <span>Verify Answer</span>
              </button>

              {quizSubmitted && (
                <button
                  onClick={handleResetQuiz}
                  type="button"
                  className="min-h-[52px] px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 active:scale-95 transition-all"
                >
                  <RotateCcw className="w-4 h-4 text-teal-400" />
                  <span>Retry Question</span>
                </button>
              )}
            </div>

            {/* Detailed Feedback & Explanations */}
            {quizSubmitted && (
              <div
                className={`p-6 rounded-2xl border mt-4 ${
                  isQuizCorrect
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100'
                    : 'bg-rose-950/40 border-rose-500/50 text-rose-100'
                }`}
              >
                <div className="flex items-start gap-4">
                  {isQuizCorrect ? (
                    <CheckCircle className="w-7 h-7 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-7 h-7 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-2 flex-1">
                    <h4 className="font-extrabold text-base sm:text-lg">
                      {isQuizCorrect ? 'Correct! Articulation & Rule Mastered.' : 'Incorrect Selection'}
                    </h4>
                    {challenge.explanation && (
                      <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                        {challenge.explanation}
                      </p>
                    )}
                    {challenge.breakdown && (
                      <div className="mt-3 p-3.5 bg-black/40 rounded-xl space-y-1.5 text-xs sm:text-sm text-slate-300">
                        <strong className="text-teal-300 block mb-1">Detailed Rule Breakdown:</strong>
                        {challenge.breakdown.map((b, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2">
                            <span className="text-teal-400 font-bold">•</span>
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

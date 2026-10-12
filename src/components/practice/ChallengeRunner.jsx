import React, { useState } from 'react';
import { Play, CheckCircle2, XCircle, Lightbulb, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { useAuth } from '../../context/AuthContext';

export default function ChallengeRunner({ exercise, code, onOpenAiHint, onNextChallenge }) {
  const { user } = useAuth();
  const { markExerciseComplete, isExerciseCompleted } = useProgress();
  const [testResult, setTestResult] = useState(null); // null, { passed: bool, tests: [] }
  const [isVerifying, setIsVerifying] = useState(false);

  const completed = isExerciseCompleted(exercise?.id);

  const validateCode = () => {
    setIsVerifying(true);
    const parser = new DOMParser();
    const doc = parser.parseFromString(code || '', 'text/html');

    const rules = exercise.validationRules || [];
    const results = [];

    for (const rule of rules) {
      let pass = false;
      let note = rule.message;

      if (rule.type === 'doctypeExists') {
        pass = /<!DOCTYPE\s+html>/i.test(code || '');
      } else if (rule.type === 'tagExists') {
        const els = doc.getElementsByTagName(rule.tag);
        pass = els.length > 0;
      } else if (rule.type === 'tagCount') {
        const els = doc.getElementsByTagName(rule.tag);
        if (rule.minCount) {
          pass = els.length >= rule.minCount;
        } else if (rule.count !== undefined) {
          pass = els.length === rule.count;
        }
      } else if (rule.type === 'attributeExists') {
        const els = doc.getElementsByTagName(rule.tag);
        pass = Array.from(els).some(el => el.hasAttribute(rule.attribute));
      } else if (rule.type === 'attributeValue') {
        const els = doc.getElementsByTagName(rule.tag);
        pass = Array.from(els).some(el => {
          const val = el.getAttribute(rule.attribute) || '';
          return rule.contains ? val.toLowerCase().includes(rule.contains.toLowerCase()) : val === rule.value;
        });
      } else if (rule.type === 'textContains') {
        const text = doc.body.textContent || '';
        pass = rule.caseInsensitive
          ? text.toLowerCase().includes(rule.text.toLowerCase())
          : text.includes(rule.text);
      }

      results.push({
        message: note,
        passed: pass
      });
    }

    const allPassed = results.length > 0 && results.every(r => r.passed);
    setTestResult({
      passed: allPassed,
      tests: results
    });
    setIsVerifying(false);

    if (allPassed && user) {
      markExerciseComplete(exercise.id, code);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 shadow-xl space-y-4">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={validateCode}
            disabled={isVerifying}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-glow transition-all active:scale-95 disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Check Answer</span>
          </button>

          <button
            onClick={onOpenAiHint}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-sm border border-slate-700 hover:border-amber-500/40 transition-colors"
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Get AI Hint</span>
          </button>
        </div>

        {completed && (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Challenge Completed!
            </span>
            {onNextChallenge && (
              <button
                onClick={onNextChallenge}
                className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Validation Test Breakdown Feed */}
      {testResult && (
        <div className={`p-4 rounded-xl border animate-in fade-in ${
          testResult.passed 
            ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200' 
            : 'bg-slate-950/80 border-slate-800 text-slate-300'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-sm flex items-center gap-2">
              {testResult.passed ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-300">Awesome job! All tests passed! 🎉</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-400" />
                  <span className="text-white">Review what needs to be improved:</span>
                </>
              )}
            </h4>
          </div>

          <div className="space-y-2">
            {testResult.tests.map((t, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs">
                {t.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                )}
                <span className={t.passed ? 'text-slate-300 line-through opacity-80' : 'text-slate-200 font-medium'}>
                  {t.message}
                </span>
              </div>
            ))}
          </div>

          {!testResult.passed && (
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Need guidance? Click <strong>Get AI Hint</strong> for Socratic clues!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

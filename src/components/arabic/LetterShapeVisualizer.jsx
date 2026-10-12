import React, { useState } from 'react';
import { Layers, Sparkles, Volume2, ArrowLeft, Info, CheckCircle2 } from 'lucide-react';
import AudioPlayer from '../common/AudioPlayer';

const DEFAULT_SHAPE_GROUPS = [
  {
    name: 'Bā\' Family (ب)',
    letter: 'ب',
    audioText: 'بَاء',
    isolated: 'ب',
    initial: 'بـ',
    medial: 'ـبـ',
    final: 'ـب',
    exampleWord: 'بَـيْـت',
    exampleTrans: 'Bayt (House)',
    rule: 'The boat-like bowl drops its left edge in initial & medial forms to connect along the baseline.'
  },
  {
    name: 'Jīm Family (ج)',
    letter: 'ج',
    audioText: 'جِيم',
    isolated: 'ج',
    initial: 'جـ',
    medial: 'ـجـ',
    final: 'ـج',
    exampleWord: 'جَـمَـل',
    exampleTrans: 'Jamal (Camel)',
    rule: 'The large lower loop is removed in initial/medial forms; the stroke stays directly on the baseline.'
  },
  {
    name: 'Sīn Family (س)',
    letter: 'س',
    audioText: 'سِين',
    isolated: 'س',
    initial: 'سـ',
    medial: 'ـسـ',
    final: 'ـس',
    exampleWord: 'سَـمَـك',
    exampleTrans: 'Samak (Fish)',
    rule: 'The 3 small teeth remain prominent, while the wide descending tail is dropped until the final form.'
  },
  {
    name: '\'Ayn Family (ع)',
    letter: 'ع',
    audioText: 'عَيْن',
    isolated: 'ع',
    initial: 'عـ',
    medial: 'ـعـ',
    final: 'ـع',
    exampleWord: 'عَـلَـم',
    exampleTrans: '\'Alam (Flag)',
    rule: 'In medial and final positions, the top loop closes into a small filled triangle.'
  },
  {
    name: 'Mīm Family (م)',
    letter: 'م',
    audioText: 'مِيم',
    isolated: 'م',
    initial: 'مـ',
    medial: 'ـمـ',
    final: 'ـم',
    exampleWord: 'مَـسْـجِـد',
    exampleTrans: 'Masjid (Mosque)',
    rule: 'The small circular head sits on the baseline with a downward tail in isolated and final forms.'
  },
  {
    name: 'Non-Connecting: Dāl (د)',
    letter: 'د',
    audioText: 'دَال',
    isolated: 'د',
    initial: 'د',
    medial: 'ـد',
    final: 'ـد',
    exampleWord: 'دَرْس',
    exampleTrans: 'Dars (Lesson)',
    rule: 'Non-connecting letter: never connects forward to the left. Any letter following it must start in initial form.'
  }
];

export default function LetterShapeVisualizer({ customShapes = null, customNote = null }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const shapes = customShapes || DEFAULT_SHAPE_GROUPS;
  const current = shapes[selectedIdx] || shapes[0];

  return (
    <div className="relative z-10 w-full my-8 space-y-6 overflow-visible">
      {/* Visualizer Card */}
      <div className="rounded-3xl bg-slate-900/95 border border-teal-800/40 p-6 sm:p-8 shadow-2xl backdrop-blur-sm overflow-visible">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-wide">
                Interactive Arabic Letter Shapes Visualizer
              </h3>
              <p className="text-xs sm:text-sm text-teal-400 font-medium mt-0.5">
                Observe how letters transform across 4 cursive positions (Right-to-Left)
              </p>
            </div>
          </div>

          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-teal-950/80 text-teal-300 border border-teal-800/60">
            RTL Baseline Flow
          </span>
        </div>

        {/* Letter Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 custom-scrollbar">
          {shapes.map((item, idx) => {
            const isSelected = idx === selectedIdx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                type="button"
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-2 transition-all shrink-0 ${
                  isSelected
                    ? 'bg-teal-500 text-slate-950 ring-2 ring-teal-400 shadow-lg shadow-teal-500/20 scale-105'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <span
                  className="text-lg sm:text-xl font-serif leading-none"
                  style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
                >
                  {item.letter}
                </span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* 4-Position Visual Board (Flows Right to Left) */}
        <div className="my-6 p-6 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/80 text-xs font-bold uppercase tracking-wider text-slate-400">
            <span className="flex items-center gap-1.5 text-teal-400">
              <ArrowLeft className="w-4 h-4" /> Reading & Connection Direction
            </span>
            <span>4 Script Variations</span>
          </div>

          {/* Grid of 4 Positions: Isolated, Initial, Medial, Final */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" dir="rtl">
            {/* 1. Initial Position (بِدَايَة) */}
            <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-900 border border-teal-500/30 text-center shadow-lg relative group hover:border-teal-400 transition-all">
              <span className="text-[11px] font-mono text-teal-400 font-bold uppercase tracking-wider mb-2">
                1. Initial (بِدَايَة)
              </span>
              <span
                className="text-4xl sm:text-5xl lg:text-6xl font-serif text-teal-200 font-bold py-3 select-none"
                style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
              >
                {current.initial}
              </span>
              <span className="text-xs text-slate-400 mt-2">Connects to Left</span>
            </div>

            {/* 2. Medial Position (وَسَط) */}
            <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-900 border border-teal-500/30 text-center shadow-lg relative group hover:border-teal-400 transition-all">
              <span className="text-[11px] font-mono text-teal-400 font-bold uppercase tracking-wider mb-2">
                2. Medial (وَسَط)
              </span>
              <span
                className="text-4xl sm:text-5xl lg:text-6xl font-serif text-teal-200 font-bold py-3 select-none"
                style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
              >
                {current.medial}
              </span>
              <span className="text-xs text-slate-400 mt-2">Connects Both Sides</span>
            </div>

            {/* 3. Final Position (نِهَايَة) */}
            <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-900 border border-teal-500/30 text-center shadow-lg relative group hover:border-teal-400 transition-all">
              <span className="text-[11px] font-mono text-teal-400 font-bold uppercase tracking-wider mb-2">
                3. Final (نِهَايَة)
              </span>
              <span
                className="text-4xl sm:text-5xl lg:text-6xl font-serif text-teal-200 font-bold py-3 select-none"
                style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
              >
                {current.final}
              </span>
              <span className="text-xs text-slate-400 mt-2">Connects from Right</span>
            </div>

            {/* 4. Isolated Position (مُنْفَصِل) */}
            <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-900 border border-slate-700 text-center shadow-lg relative group hover:border-slate-500 transition-all">
              <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-2">
                4. Isolated (مُنْفَصِل)
              </span>
              <span
                className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white font-bold py-3 select-none"
                style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
              >
                {current.isolated}
              </span>
              <span className="text-xs text-slate-400 mt-2">Standalone Letter</span>
            </div>
          </div>

          {/* SVG Baseline Connecting Demonstration */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">Connecting in a Word:</span>
              <span
                className="text-2xl sm:text-3xl font-serif text-teal-300 font-bold px-3 py-1 bg-slate-900 rounded-xl border border-slate-700"
                style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
                dir="rtl"
              >
                {current.exampleWord}
              </span>
              <span className="text-xs text-slate-400 font-mono">({current.exampleTrans})</span>
            </div>

            <AudioPlayer
              compact
              arabicText={current.audioText || current.letter}
              soundCue={`Pronunciation of letter ${current.name}`}
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DEDICATED UNBLOCKED NOTE: “The Shape Style” */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 border-2 border-teal-500/40 shadow-2xl overflow-visible">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 shrink-0 mt-0.5 shadow-md">
            <Info className="w-6 h-6" />
          </div>

          <div className="space-y-3 flex-1 overflow-visible">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded-lg border border-teal-800/60">
                Foundational Orthography Note
              </span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fully Unblocked & Accessible
              </span>
            </div>

            <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              The Shape Style: How Arabic Letters Connect
            </h4>

            <div className="space-y-3 text-sm sm:text-base text-slate-200 leading-[1.8] font-normal">
              <p>
                Arabic writing is inherently cursive and flows strictly from <strong>Right to Left (RTL)</strong> along a continuous horizontal baseline.
              </p>

              <div className="grid gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <strong className="text-teal-300 block font-bold text-sm sm:text-base">
                    1. Continuous Baseline Flow (سَطْر)
                  </strong>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Letters link together like cursive handwriting. The primary body of each letter sits directly on the baseline while connecting arms reach out to neighboring letters.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <strong className="text-teal-300 block font-bold text-sm sm:text-base">
                    2. Truncation of Descending Tails in Initial & Medial Positions
                  </strong>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    When a letter with a wide bowl or descending loop (such as <span className="font-serif text-teal-200 text-lg font-bold">ب, ج, س, ص, ع</span>) appears at the beginning or middle of a word, its tail is omitted so the stroke continues seamlessly into the next letter.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <strong className="text-teal-300 block font-bold text-sm sm:text-base">
                    3. Restoration of Full Tails in Final Form
                  </strong>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    When a letter ends a word, it completes the stroke by restoring its full natural isolated flourish (tail).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-1">
                  <strong className="text-amber-300 block font-bold text-sm sm:text-base">
                    4. The 6 Non-Connecting Letters (حُرُوفُ الْفَصْل)
                  </strong>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                    Six letters (<span className="font-serif text-amber-200 text-lg font-bold">ا , د , ذ , ر , ز , و</span>) NEVER connect to any letter that comes after them. They only connect from the right. Any letter following them must be written in its Initial or Isolated shape.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

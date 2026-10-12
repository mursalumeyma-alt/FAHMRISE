import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Sparkles, Loader2, Gauge } from 'lucide-react';
import { playPronunciation, stopAllAudio, getAudioUrlForText } from '../../utils/soundService';

/**
 * Audio / Pronunciation Component for FAHMRISE
 * Plays clear, authentic Arabic letter and Qur'anic recitation audio.
 * Features:
 * - Singleton audio control (no overlapping sounds)
 * - Authentic audio playback with high-fidelity Arabic streams
 * - Slow-motion learning toggle (0.8x speed for Tajweed precision)
 * - Large accessible touch targets (min 48px)
 * - Ultra-large Arabic typography support with Amiri font & no clipping
 */
export default function AudioPlayer({
  arabicText,
  audioUrl,
  transliteration,
  soundCue,
  label = 'Listen Pronunciation',
  compact = false,
  size = 'normal', // 'large' (72-96px), 'comparison' (36-48px), 'normal' (28-36px), 'compact'
  slowOption = true,
  makhrajDetails = null
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSlow, setIsSlow] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioInstanceRef = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (audioInstanceRef.current) {
        try {
          audioInstanceRef.current.pause();
        } catch (e) {}
      }
    };
  }, []);

  const handlePlay = (e) => {
    if (e) e.stopPropagation();

    if (isPlaying) {
      stopAllAudio();
      setIsPlaying(false);
      setIsLoading(false);
      return;
    }

    setHasError(false);
    const textOrSource = audioUrl || arabicText || soundCue || transliteration || 'أ';
    const rate = isSlow ? 0.75 : 1.0;

    audioInstanceRef.current = playPronunciation(
      textOrSource,
      {
        onStart: () => {
          setIsPlaying(true);
          setIsLoading(false);
        },
        onLoading: (loading) => {
          setIsLoading(loading);
        },
        onEnd: () => {
          setIsPlaying(false);
          setIsLoading(false);
        },
        onError: (err) => {
          console.warn('Playback error:', err);
          setIsPlaying(false);
          setIsLoading(false);
          setHasError(true);
        }
      },
      rate
    );
  };

  const handleReplay = (e) => {
    if (e) e.stopPropagation();
    stopAllAudio();
    setIsPlaying(false);
    setTimeout(() => {
      handlePlay();
    }, 100);
  };

  const toggleSpeed = (e) => {
    if (e) e.stopPropagation();
    const nextSlow = !isSlow;
    setIsSlow(nextSlow);
    if (isPlaying) {
      handleReplay();
    }
  };

  // Compact inline button mode (e.g. for quiz options or inline comparison cards)
  if (compact) {
    return (
      <button
        onClick={handlePlay}
        type="button"
        title={isPlaying ? "Stop audio" : "Play pronunciation"}
        className={`min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
          isPlaying
            ? 'bg-teal-500 text-slate-950 ring-2 ring-teal-400 shadow-md shadow-teal-500/30 animate-pulse'
            : 'bg-slate-800/90 text-teal-300 hover:text-white hover:bg-slate-700 border border-slate-700 active:scale-95'
        }`}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-teal-400" />
        ) : isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4 text-teal-400" />
        )}
        <span className="font-sans font-semibold tracking-wide">
          {isLoading ? 'Loading...' : isPlaying ? 'Playing' : 'Listen Audio'}
        </span>
      </button>
    );
  }

  // Large Hero Card / Articulation Box mode
  const isLargeLetter = size === 'large' || (arabicText && arabicText.length <= 4 && !arabicText.includes(' '));
  const isComparisonSize = size === 'comparison';

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border border-teal-800/40 shadow-2xl my-6 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: Large Arabic Display & Labels */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left w-full md:w-auto">
          {arabicText && (
            <div className="shrink-0 flex flex-col items-center justify-center p-4 min-w-[120px] rounded-2xl bg-slate-950/80 border border-teal-900/60 shadow-inner">
              <span
                className={`font-serif text-teal-200 font-bold select-none leading-[1.6] py-2 px-3 tracking-normal ${
                  isLargeLetter
                    ? 'text-6xl sm:text-7xl lg:text-8xl'
                    : isComparisonSize
                    ? 'text-4xl sm:text-5xl'
                    : 'text-3xl sm:text-4xl'
                }`}
                style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
                dir="rtl"
              >
                {arabicText}
              </span>
              <span className="text-[11px] text-teal-400/80 font-mono mt-1 font-semibold uppercase tracking-wider">
                {arabicText.length <= 4 ? 'Arabic Letter' : 'Qur\'an Text'}
              </span>
            </div>
          )}

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800/40">
                <Sparkles className="w-3.5 h-3.5" /> {label}
              </span>

              {isPlaying && (
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/50 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Active Audio Stream
                </span>
              )}

              {hasError && (
                <span className="text-xs text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/50">
                  Audio streaming retry ready
                </span>
              )}
            </div>

            {transliteration && (
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                {transliteration}
              </h3>
            )}

            {soundCue && (
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                {soundCue}
              </p>
            )}

            {makhrajDetails && (
              <div className="mt-2 text-xs text-teal-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 font-medium">
                📍 <strong className="text-white">Articulation Point:</strong> {makhrajDetails}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Audio Controls (Min 48px Touch Targets) */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
          {/* Main Play / Pause Button */}
          <button
            onClick={handlePlay}
            type="button"
            className={`min-h-[52px] min-w-[140px] px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2.5 font-bold text-sm transition-all shadow-xl active:scale-95 ${
              isPlaying
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 ring-4 ring-emerald-500/30'
                : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/20 hover:shadow-teal-500/40'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading Audio...</span>
              </>
            ) : isPlaying ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current ml-0.5" />
                <span>Play Sound</span>
              </>
            )}
          </button>

          {/* Replay Button */}
          <button
            onClick={handleReplay}
            type="button"
            title="Replay pronunciation from start"
            className="min-h-[52px] min-w-[52px] px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 text-xs font-semibold active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4 text-teal-400" />
            <span className="hidden sm:inline">Replay</span>
          </button>

          {/* Precision Slow-Motion Toggle */}
          {slowOption && (
            <button
              onClick={toggleSpeed}
              type="button"
              title="Toggle slow 0.75x speed for Tajweed precision"
              className={`min-h-[52px] px-4 py-3 rounded-2xl border flex items-center justify-center gap-1.5 text-xs font-semibold active:scale-95 transition-all ${
                isSlow
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 ring-2 ring-amber-500/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              <Gauge className="w-4 h-4 text-amber-400" />
              <span>{isSlow ? '0.75x Slow' : '1.0x Normal'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

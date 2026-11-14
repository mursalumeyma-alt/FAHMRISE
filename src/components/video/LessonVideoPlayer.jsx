import React, { useState, useEffect, useMemo } from 'react';
import { 
  Video, 
  ExternalLink, 
  Play, 
  BookOpen, 
  Eye, 
  EyeOff, 
  Sparkles,
  FileText,
  RefreshCw,
  Globe2,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Search
} from 'lucide-react';

/**
 * Robustly extracts an 11-character YouTube video ID from any videoLesson object, URL string, or ID.
 * Supports:
 * - Direct 11-char ID
 * - youtube.com/watch?v=ID (standard & mobile)
 * - youtu.be/ID
 * - youtube.com/embed/ID & youtube-nocookie.com/embed/ID
 * - youtube.com/shorts/ID
 * - youtube.com/live/ID
 * - youtube.com/v/ID
 * - URLs with multiple parameters before or after v=
 */
export function extractYouTubeVideoId(videoLesson) {
  if (!videoLesson) return null;

  // 1. If videoLesson is a string (direct ID or URL)
  if (typeof videoLesson === 'string') {
    const raw = videoLesson.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw;
    return extractIdFromUrl(raw);
  }

  // 2. Check direct ID properties
  const directId = videoLesson.videoId || videoLesson.id || videoLesson.video_id || videoLesson.youtubeId;
  if (directId && typeof directId === 'string') {
    const trimmed = directId.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
    const fromDirect = extractIdFromUrl(trimmed);
    if (fromDirect) return fromDirect;
  }

  // 3. Check possible URL properties
  const urlCandidate = videoLesson.watchUrl || videoLesson.embedUrl || videoLesson.url || videoLesson.src || videoLesson.link || '';
  if (urlCandidate && typeof urlCandidate === 'string') {
    const fromUrl = extractIdFromUrl(urlCandidate.trim());
    if (fromUrl) return fromUrl;
  }

  return null;
}

/**
 * Extracts 11-character YouTube video ID from any valid YouTube URL format.
 */
function extractIdFromUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const clean = url.trim();

  // Pattern covers: watch?v=, embed/, v/, shorts/, live/, youtu.be/
  const patterns = [
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|(?:embed|v|shorts|live)\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i,
    /[?&]v=([a-zA-Z0-9_-]{11})/i
  ];

  for (const regex of patterns) {
    const match = clean.match(regex);
    if (match && match[1] && match[1].length === 11) {
      return match[1];
    }
  }

  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
    return clean;
  }

  return null;
}

/**
 * Extracts start time in seconds from video object or URL.
 */
function extractStartTime(videoLesson) {
  if (!videoLesson) return null;
  if (typeof videoLesson.start === 'number') return videoLesson.start;
  if (typeof videoLesson.start === 'string' && /^\d+$/.test(videoLesson.start)) {
    return parseInt(videoLesson.start, 10);
  }

  const urlCandidate = typeof videoLesson === 'string' 
    ? videoLesson 
    : (videoLesson.watchUrl || videoLesson.url || videoLesson.embedUrl || '');

  if (urlCandidate && typeof urlCandidate === 'string') {
    const match = urlCandidate.match(/[?&](?:t|start)=([0-9hm]+s?)/i);
    if (match && match[1]) {
      const raw = match[1].replace(/s$/i, '');
      if (/^\d+$/.test(raw)) return parseInt(raw, 10);
      let seconds = 0;
      const h = raw.match(/(\d+)h/i);
      const m = raw.match(/(\d+)m/i);
      const s = raw.match(/(\d+)s?/i);
      if (h) seconds += parseInt(h[1], 10) * 3600;
      if (m) seconds += parseInt(m[1], 10) * 60;
      if (s && !h && !m) seconds += parseInt(s[1], 10);
      return seconds > 0 ? seconds : null;
    }
  }

  return null;
}

// Strictly English language-learning IDs (ESL grammar drills) that must not leak into native Arabic/Swahili language-acquisition courses
const ENGLISH_ESL_ONLY_IDS = new Set([
  'RWLaMgeD8gU', 'juKd26qkNAw', 'iZnjTX_NHBQ', 'JOt10vhUtYE', 'I1Gt-4Qahdk', 'VxjFEj0dx18'
]);

/**
 * Protects language learning courses (like Arabic Language from zero) from unrelated ESL English grammar drills,
 * while ensuring Islamic Studies and Tajweed courses (which teach in English) are NEVER blocked.
 */
function isMismatchedLanguageVideo(videoLesson, courseId, courseLanguage) {
  if (!videoLesson) return true;
  if (videoLesson.isUserProvided) return false;

  const courseKey = String(courseId || courseLanguage || '').toLowerCase();
  
  // NEVER block Tajweed, Quran, Islamic studies, Hadith, Tafsir courses - they teach in English!
  const isIslamicStudiesCourse = courseKey.includes('tajweed') || 
                                 courseKey.includes('quran') || 
                                 courseKey.includes('hadith') || 
                                 courseKey.includes('tafsir') || 
                                 courseKey.includes('salah') || 
                                 courseKey.includes('aqeedah') || 
                                 courseKey.includes('manners');
  if (isIslamicStudiesCourse) {
    return false;
  }

  const isTargetArabic = courseKey.includes('arabic-language') || courseKey.includes('arabic-from-zero');
  const isTargetSwahili = courseKey.includes('swahili') || courseKey.includes('kiswahili');

  const extractedId = extractYouTubeVideoId(videoLesson);

  if (isTargetArabic || isTargetSwahili) {
    if (extractedId && ENGLISH_ESL_ONLY_IDS.has(extractedId)) {
      return true;
    }
    const channel = String(videoLesson.channel || '').toLowerCase();
    if (channel.includes('englishclass101')) {
      return true;
    }
    const title = String(videoLesson.title || '').toLowerCase();
    if (title.includes('learn english vocabulary') || title.includes('english listening practice')) {
      return true;
    }
  }

  return false;
}

export default function LessonVideoPlayer({ videoLesson, courseId, courseLanguage }) {
  const [isPlayerVisible, setIsPlayerVisible] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [selectedRefIndex, setSelectedRefIndex] = useState(0);

  const references = useMemo(() => {
    if (Array.isArray(videoLesson?.references) && videoLesson.references.length > 0) {
      return videoLesson.references;
    }
    return null;
  }, [videoLesson]);

  const activeVideo = useMemo(() => {
    if (references && references[selectedRefIndex]) {
      return references[selectedRefIndex];
    }
    return videoLesson;
  }, [references, selectedRefIndex, videoLesson]);

  const isLanguageMismatched = useMemo(
    () => isMismatchedLanguageVideo(activeVideo, courseId, courseLanguage),
    [activeVideo, courseId, courseLanguage]
  );

  // Extract clean 11-character YouTube video ID
  const videoId = useMemo(() => {
    if (isLanguageMismatched) return null;
    return extractYouTubeVideoId(activeVideo);
  }, [activeVideo, isLanguageMismatched]);

  // Extract start time in seconds
  const startTime = useMemo(() => {
    return extractStartTime(activeVideo);
  }, [activeVideo]);

  // Derive YouTube embed URL safely with all standard playback parameters
  const embedUrl = useMemo(() => {
    if (!videoId || isLanguageMismatched) return null;
    
    // Base privacy-enhanced embed endpoint
    let url = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
    
    // Add origin parameter if running in a browser environment to eliminate postMessage cross-origin warnings
    if (typeof window !== 'undefined' && window.location?.origin) {
      url += `&origin=${encodeURIComponent(window.location.origin)}`;
    }

    if (startTime) {
      url += `&start=${startTime}`;
    }

    return url;
  }, [videoId, isLanguageMismatched, startTime]);

  // Derive genuine watch URL for fallback link
  const watchUrl = useMemo(() => {
    if (isLanguageMismatched) return null;
    if (videoId) {
      if (startTime) {
        return `https://www.youtube.com/watch?v=${videoId}&t=${startTime}s`;
      }
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return activeVideo?.watchUrl || activeVideo?.url || null;
  }, [videoId, activeVideo, isLanguageMismatched, startTime]);

  // Reset states whenever a new video or lesson is loaded
  useEffect(() => {
    setShowTranscript(false);
    setRetryKey(0);
    setSelectedRefIndex(0);
  }, [videoLesson?.id, videoLesson?.title, videoLesson?.videoId]);

  if (!videoLesson) return null;

  const handleRetry = () => {
    setRetryKey(prev => prev + 1);
  };

  const videoTitle = activeVideo.title || videoLesson.title || 'Lesson Video Lecture';

  return (
    <div className="my-6 p-4 sm:p-6 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl space-y-4 transition-all">
      
      {/* Multi-Reference Topic Switcher Tabs */}
      {references && (
        <div className="space-y-2 pb-3 border-b border-slate-800/90">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lesson Topic References ({references.length})</span>
            </span>
            <span className="text-[11px] text-slate-400">Select topic to switch lecture</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 custom-scrollbar">
            {references.map((ref, rIdx) => {
              const isSelected = rIdx === selectedRefIndex;
              return (
                <button
                  key={ref.id || ref.videoId || rIdx}
                  data-ref-tab={ref.id || rIdx}
                  onClick={() => {
                    setSelectedRefIndex(rIdx);
                    setRetryKey(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-teal-500/25 text-teal-300 border border-teal-500/50 shadow-sm'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
                  }`}
                >
                  <span>{ref.tabLabel || ref.shortTitle || ref.title}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Header with Badges, Title, Channel, Duration & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/90">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            {/* Verification Status Badge */}
            {(() => {
              if (activeVideo.isUnavailable || (!activeVideo.videoId && !videoId)) {
                return (
                  <span className="inline-flex items-center gap-1.5 text-slate-300 font-bold text-xs uppercase tracking-wider bg-slate-800/90 border border-slate-700/80 px-2.5 py-0.5 rounded-full">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Reference Currently Unavailable</span>
                  </span>
                );
              }
              const isUserProvided = activeVideo.isUserProvided || 
                (activeVideo.badge && activeVideo.badge.toLowerCase().includes('user-provided'));
              if (isUserProvided) {
                return (
                  <span className="inline-flex items-center gap-1.5 text-blue-400 font-bold text-xs uppercase tracking-wider bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>User-Provided Video Reference</span>
                  </span>
                );
              }
              const isVerified = (activeVideo.badge === 'Verified Reference Video' || activeVideo.badge === 'Verified' || activeVideo.status === 'Verified') && activeVideo.badge !== 'Needs Review' && activeVideo.status !== 'Needs Review';
              if (isVerified || activeVideo.channel) {
                return (
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Reference Video</span>
                  </span>
                );
              }
              return (
                <span className="inline-flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Topic Reference</span>
                </span>
              );
            })()}

            {/* Video Duration & Start Time */}
            {activeVideo.duration && (
              <span className="text-[11px] text-slate-300 font-mono bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/60">
                ⏱ {activeVideo.duration}{activeVideo.startFormatted ? ` (Starts at ${activeVideo.startFormatted})` : ''}
              </span>
            )}

            {/* Verified Channel / Provider */}
            {activeVideo.channel && (
              <span className="text-[11px] text-teal-300 font-medium bg-teal-500/10 border border-teal-500/20 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                <Globe2 className="w-3 h-3 text-teal-400" />
                <span>{activeVideo.channel}</span>
              </span>
            )}
          </div>

          <h4 className="text-sm sm:text-base font-bold text-white pt-0.5 leading-snug">
            {videoTitle}
          </h4>

          {activeVideo.topic && (
            <p className="text-xs text-teal-300/90 font-medium">
              <span className="text-slate-400 font-normal">Topic Covered: </span>
              {activeVideo.topic}
            </p>
          )}
        </div>

        {/* Action Buttons: Watch on YouTube, Transcript & Controls */}
        <div className="flex flex-wrap items-center gap-2 flex-shrink-0 pt-1 sm:pt-0">
          <button
            onClick={handleRetry}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title="Reload Video Player"
            aria-label="Reload Video Player"
          >
            <RefreshCw className="w-4 h-4 text-teal-400" />
          </button>

          {activeVideo.transcript && (
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                showTranscript
                  ? 'bg-teal-500/20 text-teal-200 border-teal-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title="Toggle Video Transcript"
            >
              <FileText className="w-3.5 h-3.5 text-teal-400" />
              <span>Transcript</span>
            </button>
          )}

          {watchUrl && !activeVideo?.isUnavailable && (
            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 hover:text-red-200 border border-red-500/30 text-xs font-semibold transition-all cursor-pointer shadow-sm"
              title="Watch lecture directly on YouTube in a new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Watch on YouTube</span>
            </a>
          )}

          <button
            onClick={() => setIsPlayerVisible(!isPlayerVisible)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title={isPlayerVisible ? "Hide Video Player" : "Show Video Player"}
            aria-label={isPlayerVisible ? "Hide Video Player" : "Show Video Player"}
          >
            {isPlayerVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Video Embed Player Container */}
      {isPlayerVisible && (
        <div className="space-y-3 animate-in fade-in duration-200">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner group">
            {embedUrl ? (
              <iframe
                key={`${videoId}-${retryKey}`}
                src={embedUrl}
                title={videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen={true}
                referrerPolicy="strict-origin-when-cross-origin"
                loading="lazy"
                className="w-full h-full border-0 absolute inset-0"
              />
            ) : (
              /* Clean Video Unavailable / Fallback Banner */
              <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center p-6 text-center space-y-3.5 bg-slate-950">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Play className="w-6 h-6 ml-0.5 opacity-60" />
                </div>
                <div className="space-y-1.5 max-w-md mx-auto">
                  <p className="text-sm font-bold text-white">
                    {activeVideo.unavailableTitle || (isLanguageMismatched ? 'Video Unavailable for This Language' : 'Video Reference In Preparation')}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {activeVideo.unavailableMessage || (isLanguageMismatched
                      ? 'This lesson requires dedicated native audio and does not use an unverified fallback video. Structured lesson notes, vocabulary, and interactive exercises are provided below.'
                      : 'A dedicated video lecture for this topic is currently being reviewed. The complete written lesson, interactive exercises, and recitation guidance below are fully self-contained.')}
                  </p>
                </div>

                {watchUrl && !isLanguageMismatched && !activeVideo.isUnavailable ? (
                  <a
                    href={watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md active:scale-95"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Watch Lecture on YouTube</span>
                  </a>
                ) : (
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${videoTitle} Tajweed`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-700 active:scale-95"
                  >
                    <Search className="w-3.5 h-3.5 text-teal-400" />
                    <span>Search Related Videos on YouTube</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Prominent Fallback Action Bar: Resolves any potential iframe blocking or embedding restrictions */}
          {embedUrl && watchUrl && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 sm:p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-slate-300">
                  Having trouble playing in-browser? Video embedding restricted or slow?
                </span>
              </div>
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 hover:text-red-200 border border-red-500/30 font-semibold transition-all shrink-0 active:scale-95"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Watch Directly on YouTube</span>
              </a>
            </div>
          )}

          {/* Self-contained Lesson & Resource Note */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                {activeVideo.note || videoLesson.note || "Video lessons are supplemental resources. The full lesson text, vocabulary bank, dialogues, and quizzes below are completely self-contained."}
              </span>
            </div>
            {activeVideo.sources && Array.isArray(activeVideo.sources) && activeVideo.sources.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                {activeVideo.sources.map((s, sIdx) => (
                  <a
                    key={sIdx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:text-teal-300 font-semibold underline underline-offset-2 flex items-center gap-1 text-xs"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                    <span>{s.name}</span>
                  </a>
                ))}
              </div>
            ) : (activeVideo.alternativeSource || videoLesson.alternativeSource) && (
              <a
                href={activeVideo.alternativeSource || videoLesson.alternativeSource}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300 font-semibold underline underline-offset-2 flex items-center gap-1 flex-shrink-0"
              >
                <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                <span>{activeVideo.sourceName || videoLesson.sourceName || 'Verified Open Learning Portal'}</span>
              </a>
            )}
          </div>

          {/* Collapsible Transcript Panel */}
          {showTranscript && (activeVideo.transcript || videoLesson.transcript) && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-teal-500/30 text-xs sm:text-sm text-slate-200 space-y-2 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-teal-300 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-teal-400" />
                  <span>Video Lesson Transcript</span>
                </span>
                <span className="text-[11px] text-slate-400">Read & Follow Along</span>
              </div>
              <p className="leading-relaxed whitespace-pre-line text-slate-300">
                {activeVideo.transcript || videoLesson.transcript}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

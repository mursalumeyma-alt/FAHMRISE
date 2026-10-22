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
  AlertCircle
} from 'lucide-react';

/**
 * Robustly extracts an 11-character YouTube video ID from any videoLesson object or URL string.
 */
function extractYouTubeVideoId(videoLesson) {
  if (!videoLesson) return null;

  // If videoLesson is a string (URL or direct ID)
  if (typeof videoLesson === 'string') {
    const raw = videoLesson.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw;
    const match = raw.match(/(?:youtube(?:-nocookie)?\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    return match ? match[1] : null;
  }

  // If explicit videoId is provided
  if (videoLesson.videoId && typeof videoLesson.videoId === 'string') {
    const trimmed = videoLesson.videoId.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  }

  // Check possible URL properties
  const urlCandidate = videoLesson.embedUrl || videoLesson.url || videoLesson.watchUrl || '';
  if (urlCandidate && typeof urlCandidate === 'string') {
    const match = urlCandidate.match(/(?:youtube(?:-nocookie)?\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (match) return match[1];
  }

  return null;
}

// English learning video IDs - strictly prohibited as fallbacks for Arabic, Kiswahili or other non-English language courses
const ENGLISH_ONLY_VIDEO_IDS = new Set([
  'RWLaMgeD8gU', 'juKd26qkNAw', 'iZnjTX_NHBQ', 'JOt10vhUtYE', 'I1Gt-4Qahdk', 'VxjFEj0dx18'
]);

function isMismatchedLanguageVideo(videoLesson, courseId, courseLanguage) {
  if (!videoLesson) return true;
  const courseKey = String(courseId || courseLanguage || '').toLowerCase();
  const isTargetArabic = courseKey.includes('arabic') || videoLesson.language === 'arabic';
  const isTargetSwahili = courseKey.includes('swahili') || courseKey.includes('kiswahili') || videoLesson.language === 'swahili';

  const extractedId = extractYouTubeVideoId(videoLesson);

  if (isTargetArabic || isTargetSwahili) {
    // English video ID passed to Arabic or Swahili lesson
    if (extractedId && ENGLISH_ONLY_VIDEO_IDS.has(extractedId)) {
      return true;
    }
    // Channel is EnglishClass101
    const channel = String(videoLesson.channel || '').toLowerCase();
    if (channel.includes('englishclass101') || (channel.includes('english') && !channel.includes('arabic') && !channel.includes('swahili'))) {
      return true;
    }
    // Title explicitly says English without mentioning Arabic or Swahili
    const title = String(videoLesson.title || '').toLowerCase();
    if (title.includes('english alphabet') || title.includes('learn english') || (title.includes('english') && !title.includes('arabic') && !title.includes('swahili'))) {
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

  // Derive genuine watch URL and embed URL safely
  const embedUrl = useMemo(() => {
    if (!videoId || isLanguageMismatched) return null;
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`;
  }, [videoId, isLanguageMismatched]);

  const watchUrl = useMemo(() => {
    if (isLanguageMismatched) return null;
    if (videoId) return `https://www.youtube.com/watch?v=${videoId}`;
    return activeVideo?.watchUrl || activeVideo?.url || null;
  }, [videoId, activeVideo, isLanguageMismatched]);

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

  return (
    <div className="my-6 p-5 sm:p-6 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl space-y-4 transition-all">
      
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
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5">
            {references.map((ref, rIdx) => {
              const isSelected = rIdx === selectedRefIndex;
              return (
                <button
                  key={ref.id || rIdx}
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
                  <span>{ref.tabLabel || ref.title}</span>
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
              const isVerified = (activeVideo.badge === 'Verified Reference Video' || activeVideo.badge === 'Verified' || activeVideo.status === 'Verified') && activeVideo.badge !== 'Needs Review' && activeVideo.status !== 'Needs Review';
              if (isVerified) {
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
                  <span>Needs Review</span>
                </span>
              );
            })()}

            {/* Video Duration */}
            {activeVideo.duration && (
              <span className="text-[11px] text-slate-300 font-mono bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/60">
                ⏱ {activeVideo.duration}
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

          <h4 className="text-sm sm:text-base font-bold text-white pt-0.5">
            {activeVideo.title || 'Lesson Video Lecture'}
          </h4>

          {activeVideo.topic && (
            <p className="text-xs text-teal-300/90 font-medium">
              <span className="text-slate-400 font-normal">Topic Covered: </span>
              {activeVideo.topic}
            </p>
          )}
        </div>

        {/* Action Buttons: Watch on YouTube, Transcript & Controls */}
        <div className="flex items-center gap-2 flex-shrink-0 pt-1 sm:pt-0">
          <button
            onClick={handleRetry}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title="Reload Video Player"
            aria-label="Reload Video Player"
          >
            <RefreshCw className="w-4 h-4 text-teal-400" />
          </button>

          {activeVideo.transcript && (
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
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

          {watchUrl && (
            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 hover:text-red-200 border border-red-500/30 text-xs font-semibold transition-all cursor-pointer"
              title="Watch lecture directly on YouTube in a new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Watch on YouTube</span>
            </a>
          )}

          <button
            onClick={() => setIsPlayerVisible(!isPlayerVisible)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title={isPlayerVisible ? "Hide Video Player" : "Show Video Player"}
            aria-label={isPlayerVisible ? "Hide Video Player" : "Show Video Player"}
          >
            {isPlayerVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Video Embed Player */}
      {isPlayerVisible && (
        <div className="space-y-3 animate-in fade-in duration-200">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner group">
            {embedUrl ? (
              <iframe
                key={`${videoId}-${retryKey}`}
                src={`${embedUrl}&vkey=${retryKey}`}
                title={activeVideo.title || videoLesson.title || 'Lesson Video'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              /* Clean Video Unavailable Banner */
              <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center p-6 text-center space-y-3 bg-slate-950">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Play className="w-6 h-6 ml-0.5 opacity-60" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">
                    {isLanguageMismatched ? 'Video Unavailable for This Language' : 'Video Lecture Unavailable'}
                  </p>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    {isLanguageMismatched
                      ? 'This lesson requires dedicated native audio and does not use an unverified fallback video. Structured lesson notes, vocabulary, and interactive exercises are provided below.'
                      : 'Video lecture is currently unavailable for this lesson. Comprehensive study notes, vocabulary, and interactive practice exercises are fully self-contained below.'}
                  </p>
                </div>
                {watchUrl && !isLanguageMismatched && (
                  <a
                    href={watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Watch Video Lecture</span>
                  </a>
                )}
              </div>
            )}
          </div>

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

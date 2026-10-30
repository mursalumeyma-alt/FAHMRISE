import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Layers,
  Globe,
  Award,
  Clock,
  Check,
  X,
  Compass,
  GraduationCap,
  MessageSquare,
  Bot,
  ExternalLink,
  HelpCircle,
  Lightbulb,
  Eye,
  Star,
  Shuffle,
  Volume2,
  Share2,
  Flame,
  Search,
  BookMarked,
  Video,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  INTERNATIONAL_LANGUAGES_TRACK,
  ENGLISH_TRACK_DATA,
  FRENCH_TRACK_DATA,
  SWAHILI_TRACK_DATA,
  ARABIC_TRACK_DATA,
  JAPANESE_TRACK_DATA,
  SOMALI_TRACK_DATA,
  ALL_LANGUAGE_TRACKS
} from '../data/arabicTrackData';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import LetterShapeVisualizer from '../components/arabic/LetterShapeVisualizer';
import LanguageNewsSection from '../components/news/LanguageNewsSection';

export default function ArabicTrackPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isEnrolledIn, isTeacherReviewer } = useAuth();

  const progressContext = useProgress();

  const location = useLocation();

  // Active language pathway selection (detects URL route or ?lang= param)
  const getLanguageFromUrl = () => {
    const langParam = searchParams.get('lang');
    if (langParam && ALL_LANGUAGE_TRACKS[langParam]) {
      return langParam;
    }
    const path = (location.pathname || '').toLowerCase();
    if (path.includes('arabic')) return 'arabic-language-learning';
    if (path.includes('swahili') || path.includes('kiswahili')) return 'swahili-language-learning';
    if (path.includes('somali')) return 'somali-language-learning';
    if (path.includes('japanese') || path.includes('nihon')) return 'japanese-language-learning';
    if (path.includes('french') || path.includes('francais')) return 'french-language-learning';
    if (path.includes('english')) return 'english-language-learning';
    return 'arabic-language-learning';
  };

  const [selectedLangId, setSelectedLangId] = useState(getLanguageFromUrl());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const activeFromUrl = getLanguageFromUrl();
    if (activeFromUrl && activeFromUrl !== selectedLangId) {
      setSelectedLangId(activeFromUrl);
    }
  }, [searchParams, location.pathname]);

  const handleSelectLanguage = (langId) => {
    setSelectedLangId(langId);
    setDailyWordIndex(0);
    setCurrentCardIndex(0);
    setIsCardFlipped(false);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setDialogueCurrentStep(0);
    setDialogueUserChoices({});
    setActiveLesson(null);

    const updated = new URLSearchParams(searchParams);
    updated.set('lang', langId);
    setSearchParams(updated, { replace: true });
  };

  // Active track data shortcut
  const internationalTrack = INTERNATIONAL_LANGUAGES_TRACK;
  const track = ALL_LANGUAGE_TRACKS[selectedLangId] || ENGLISH_TRACK_DATA;

  const allLessons = useMemo(() => {
    return (track?.modules || []).flatMap((m) =>
      (m?.lessons || []).map((l) => ({
        ...l,
        moduleNumber: m?.number,
        moduleTitle: m?.title
      }))
    );
  }, [track]);

  // Persistent progress tracking per language
  const COMPLETED_LESSONS_KEY = `fahmrise_${selectedLangId}_completed_lessons`;
  const MASTERED_WORDS_KEY = `fahmrise_${selectedLangId}_mastered_words`;

  const [completedLessonIds, setCompletedLessonIds] = useState(() => {
    try {
      const saved = localStorage.getItem(COMPLETED_LESSONS_KEY);
      return saved ? JSON.parse(saved) : (track.modules?.[0]?.lessons?.[0]?.id ? [track.modules[0].lessons[0].id] : []);
    } catch {
      return [];
    }
  });

  const [masteredWordIds, setMasteredWordIds] = useState(() => {
    try {
      const saved = localStorage.getItem(MASTERED_WORDS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(COMPLETED_LESSONS_KEY);
      setCompletedLessonIds(saved ? JSON.parse(saved) : (track.modules?.[0]?.lessons?.[0]?.id ? [track.modules[0].lessons[0].id] : []));
    } catch {
      setCompletedLessonIds([]);
    }
    try {
      const savedWords = localStorage.getItem(MASTERED_WORDS_KEY);
      setMasteredWordIds(savedWords ? JSON.parse(savedWords) : []);
    } catch {
      setMasteredWordIds([]);
    }
  }, [selectedLangId]);

  useEffect(() => {
    try {
      localStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(completedLessonIds));
    } catch (e) {
      console.warn('Could not save completed lessons:', e);
    }
  }, [completedLessonIds, COMPLETED_LESSONS_KEY]);

  useEffect(() => {
    try {
      localStorage.setItem(MASTERED_WORDS_KEY, JSON.stringify(masteredWordIds));
    } catch (e) {
      console.warn('Could not save mastered words:', e);
    }
  }, [masteredWordIds, MASTERED_WORDS_KEY]);

  // Module Accordions
  const [expandedModules, setExpandedModules] = useState({
    'en-mod-1': true, 'en-mod-2': true, 'en-mod-3': true, 'en-mod-4': true, 'en-mod-5': true, 'en-mod-6': true,
    'fr-mod-1': true, 'fr-mod-2': true, 'fr-mod-3': true, 'fr-mod-4': true, 'fr-mod-5': true, 'fr-mod-6': true,
    'sw-mod-1': true, 'sw-mod-2': true, 'sw-mod-3': true, 'sw-mod-4': true, 'sw-mod-5': true, 'sw-mod-6': true,
    'module-1': true, 'module-2': true, 'module-3': true, 'module-4': true, 'module-5': true
  });

  const toggleModuleAccordion = (modId) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  // Lesson preview modal
  const [activeLesson, setActiveLesson] = useState(null);

  // Daily Word Carousel
  const [dailyWordIndex, setDailyWordIndex] = useState(0);
  const dailyWords = track.dailyWords || [];
  const currentDailyWord = dailyWords[dailyWordIndex] || dailyWords[0];

  const handleNextDailyWord = () => {
    if (dailyWords.length === 0) return;
    setDailyWordIndex((prev) => (prev + 1) % dailyWords.length);
  };
  const handlePrevDailyWord = () => {
    if (dailyWords.length === 0) return;
    setDailyWordIndex((prev) => (prev - 1 + dailyWords.length) % dailyWords.length);
  };

  // Flashcards Arena
  const allTrackFlashcards = useMemo(() => {
    return (track.modules || []).flatMap((m) => m.flashcards || []);
  }, [track]);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const currentFlashcard = allTrackFlashcards[currentCardIndex] || allTrackFlashcards[0];

  const handleNextCard = () => {
    setIsCardFlipped(false);
    if (allTrackFlashcards.length === 0) return;
    setCurrentCardIndex((prev) => (prev + 1) % allTrackFlashcards.length);
  };
  const handlePrevCard = () => {
    setIsCardFlipped(false);
    if (allTrackFlashcards.length === 0) return;
    setCurrentCardIndex((prev) => (prev - 1 + allTrackFlashcards.length) % allTrackFlashcards.length);
  };
  const handleShuffleCards = () => {
    setIsCardFlipped(false);
    if (allTrackFlashcards.length === 0) return;
    const randomIndex = Math.floor(Math.random() * allTrackFlashcards.length);
    setCurrentCardIndex(randomIndex);
  };

  const toggleMasteredWord = (cardId) => {
    setMasteredWordIds((prev) => {
      const isMastered = prev.includes(cardId);
      if (isMastered) {
        return prev.filter((id) => id !== cardId);
      } else {
        triggerMiniCelebration();
        return [...prev, cardId];
      }
    });
  };

  // Grammar Questions
  const allGrammarQuestions = useMemo(() => {
    return (track.modules || []).flatMap((m) => m.practiceQuestions || []);
  }, [track]);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleSelectQuizOption = (questionId, optionIndex) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const quizScore = useMemo(() => {
    let score = 0;
    allGrammarQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  }, [allGrammarQuestions, selectedAnswers]);

  // Dialogue Scenario
  const dialogueScenario = useMemo(() => {
    const modWithDialogue = (track.modules || []).find((m) => m.interactiveDialogueScenario);
    return modWithDialogue?.interactiveDialogueScenario || null;
  }, [track]);

  const [dialogueCurrentStep, setDialogueCurrentStep] = useState(0);
  const [dialogueUserChoices, setDialogueUserChoices] = useState({});

  const handleChooseDialogueOption = (stepIdx, optionIdx) => {
    setDialogueUserChoices((prev) => ({ ...prev, [stepIdx]: optionIdx }));
    const currentStepObj = dialogueScenario?.steps?.[stepIdx];
    const chosen = currentStepObj?.options?.[optionIdx];
    if (chosen?.isCorrect) {
      triggerMiniCelebration();
      if (stepIdx < (dialogueScenario?.steps?.length || 1) - 1) {
        setTimeout(() => {
          setDialogueCurrentStep(stepIdx + 1);
        }, 1200);
      }
    }
  };

  const handleResetDialogue = () => {
    setDialogueCurrentStep(0);
    setDialogueUserChoices({});
  };

  // Confetti celebrations
  const triggerMiniCelebration = () => {
    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    } catch {}
  };
  const triggerFullCelebration = () => {
    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    } catch {}
  };

  const handleToggleLessonComplete = (lessonId) => {
    const isCompleted = completedLessonIds.includes(lessonId);
    if (isCompleted) {
      setCompletedLessonIds((prev) => prev.filter((id) => id !== lessonId));
    } else {
      setCompletedLessonIds((prev) => [...prev, lessonId]);
      triggerFullCelebration();
    }
  };

  const progressPercentage = Math.min(
    100,
    Math.round((completedLessonIds.length / Math.max(1, allLessons.length)) * 100)
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white pb-24">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION & LANGUAGE SELECTOR BAR */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-20 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          
          {/* Header Title */}
          <div className="space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>International Languages Track • 6 Global Pathways</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {internationalTrack.heading}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
              {internationalTrack.description}
            </p>
          </div>

          {/* 6 Interactive Language Switcher Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-2">
            {internationalTrack.languages.map((lang) => {
              const isSelected = lang.id === selectedLangId;
              return (
                <button
                  key={lang.id}
                  onClick={() => handleSelectLanguage(lang.id)}
                  className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between space-y-2 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500 shadow-lg ring-1 ring-emerald-500/50 scale-[1.02]'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}>
                      {lang.priceDisplay}
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-sm sm:text-base font-bold truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {lang.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate">
                      {lang.estimatedHours} • {lang.totalLessons} Chapters
                    </p>
                  </div>

                  {isSelected && (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 pt-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Active Pathway</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Language Showcase Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-3xl mr-1">{track.flag}</span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  {track.badge}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-teal-300 border border-slate-700">
                  {track.level}
                </span>
                <span className="text-xs font-bold text-slate-400 ml-auto">
                  Tuition: <strong className="text-emerald-400">{track.priceDisplay}</strong>
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {track.title}
                </h2>
                <p className="text-sm sm:text-base text-teal-300 font-medium leading-relaxed">
                  {track.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {track.trackDescription}
              </p>

              {/* 3 Learning Outcomes */}
              <div className="space-y-2 pt-2">
                {track.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>

              {/* Teacher Reviewer Active Banner */}
              {isTeacherReviewer && (
                <div className="p-3.5 bg-gradient-to-r from-blue-950/80 via-indigo-950/70 to-slate-900 border border-indigo-500/40 rounded-2xl text-xs text-indigo-200 flex items-center justify-between gap-3 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span><strong>Teacher Reviewer Mode Active</strong>: Unrestricted free evaluation pass for Arabic curriculum (all 37 lessons unlocked).</span>
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 uppercase tracking-wide">
                    Free Review Pass
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Link
                  to={`/reader/${track.id}`}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm transition-all shadow-glow flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>
                    {isTeacherReviewer
                      ? 'Review in Reader (Free Teacher Access)'
                      : isEnrolledIn(track.id)
                      ? 'Continue Learning in Reader'
                      : 'Preview Chapter 1 (Free)'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {!isTeacherReviewer && !isEnrolledIn(track.id) && (
                  <Link
                    to={`/checkout/${track.id}`}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm shadow-md transition-all flex items-center gap-1.5"
                  >
                    <span>Upgrade to Arabic Track ({track.priceDisplay || 'KSh 5,000'})</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                )}

                <Link
                  to={`/courses/${track.id}`}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all flex items-center gap-2"
                >
                  <span>Course Details</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Track Stats & Summary Card */}
            <div className="lg:col-span-4 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4 text-center">
              <div className="text-4xl sm:text-5xl font-black text-white">
                {track.nativeTitle || track.title.split(' ')[0]}
              </div>
              <p className="text-xs text-slate-400">
                {track.stats.modulesCount} Modules • {track.stats.totalLessons} Lessons • {track.stats.vocabularyCount}+ Vocabulary
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 text-left text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Lessons</span>
                  <span className="font-bold text-slate-200">{track.stats.totalLessons} Chapters</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Estimated</span>
                  <span className="font-bold text-teal-300">{track.estimatedHours}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Certificate</span>
                  <span className="font-bold text-emerald-400">FAHMRISE Verified</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Access</span>
                  <span className="font-bold text-amber-400">
                    {isTeacherReviewer ? 'Free (Teacher Pass)' : (track.priceDisplay || 'Separate Upgrade')}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PROGRESS BAR & REAL-TIME STATS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8 relative z-20">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  <span>{track.title} Progress</span>
                </span>
                <span className="text-sm font-bold text-emerald-400">{progressPercentage}% Completed</span>
              </div>

              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-full rounded-full transition-all duration-500 shadow-glow"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>
                  <strong>{completedLessonIds.length}</strong> of <strong>{allLessons.length}</strong> lessons completed
                </span>
                <span>
                  <strong>{masteredWordIds.length}</strong> vocabulary cards mastered
                </span>
              </div>
            </div>

            <div className="md:col-span-6 flex flex-wrap items-center justify-end gap-3">
              <Link
                to={`/reader/${track.id}`}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-glow flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>Resume {track.title.split(' ')[0]}</span>
              </Link>

              <Link
                to="/courses?category=International%20Languages"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5"
              >
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Browse All Languages</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SYLLABUS & CURRICULUM MODULES (FOR SELECTED LANGUAGE) */}
      {/* ========================================================================= */}
      <section id="curriculum" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {track.title} Curriculum
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Structured video lessons, transcripts, vocabulary lists, example dialogues, and checkpoint quizzes.
            </p>
          </div>
          <span className="text-xs font-semibold text-teal-300 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full w-fit">
            {track.modules?.length || 0} Modules • {allLessons.length} Lessons
          </span>
        </div>

        <div className="space-y-4">
          {(track.modules || []).map((mod, modIdx) => {
            const isExpanded = expandedModules[mod.id] ?? true;
            return (
              <div
                key={mod.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden transition-all shadow-md"
              >
                <div
                  onClick={() => toggleModuleAccordion(mod.id)}
                  className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-850/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-300 border border-teal-500/30 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                      0{mod.number || modIdx + 1}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {mod.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      {mod.readingTime || `${(mod.lessons || []).length * 15} min`}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    />
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 sm:p-5 pt-0 border-t border-slate-800/80 bg-slate-950/40 space-y-2.5">
                    {(mod.lessons || []).map((lesson, lIdx) => {
                      const isDone = completedLessonIds.includes(lesson.id);
                      return (
                        <div
                          key={lesson.id}
                          className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-teal-500/40 transition-all flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <button
                              onClick={() => handleToggleLessonComplete(lesson.id)}
                              className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all shrink-0 ${
                                isDone
                                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                                  : 'border-slate-700 hover:border-emerald-500/60 text-transparent'
                              }`}
                              title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </button>

                            <div className="min-w-0">
                              <h4 className="text-xs sm:text-sm font-bold text-slate-200 truncate">
                                {lesson.number || lIdx + 1}. {lesson.title}
                              </h4>
                              {lesson.subtitle && (
                                <p className="text-[11px] text-slate-400 truncate">
                                  {lesson.subtitle}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => setActiveLesson(lesson)}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-all"
                            >
                              <Eye className="w-3.5 h-3.5 text-teal-400" />
                              <span className="hidden sm:inline">Preview</span>
                            </button>

                            <Link
                              to={`/reader/${track.id}/${lesson.id}`}
                              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1 transition-all shadow-sm"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Study</span>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE PRACTICE ARENA FOR SELECTED LANGUAGE */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-12">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {track.title} Interactive Practice Arena
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Active vocabulary drills, flashcards, grammar exercises, and real-world dialogue simulations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Daily Word Carousel */}
          {currentDailyWord && (
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Daily Word of the Day</span>
                </span>
                <span className="text-xs text-slate-400">
                  {dailyWordIndex + 1} of {dailyWords.length}
                </span>
              </div>

              <div className="text-center space-y-2 py-4">
                <div className="text-3xl sm:text-4xl font-black text-white">
                  {currentDailyWord.word || currentDailyWord.arabic}
                </div>
                {currentDailyWord.phonetic && (
                  <p className="text-xs font-mono text-teal-300">
                    {currentDailyWord.phonetic}
                  </p>
                )}
                <p className="text-sm font-semibold text-emerald-400">
                  {currentDailyWord.translation || currentDailyWord.english}
                </p>
                {currentDailyWord.usage && (
                  <p className="text-xs text-slate-300 italic bg-slate-950 p-3 rounded-xl border border-slate-850 mt-3">
                    "{currentDailyWord.usage}"
                  </p>
                )}
                {currentDailyWord.breakdown && (
                  <p className="text-[11px] text-slate-400 text-left pt-2">
                    💡 {currentDailyWord.breakdown}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                <button
                  onClick={handlePrevDailyWord}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Previous Word
                </button>
                <button
                  onClick={handleNextDailyWord}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400"
                >
                  Next Word
                </button>
              </div>
            </div>
          )}

          {/* Right Column: Flashcard Arena */}
          {currentFlashcard && (
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                  <BookMarked className="w-4 h-4 text-teal-400" />
                  <span>Vocabulary Flashcard Drill ({currentFlashcard.group})</span>
                </span>
                <button
                  onClick={handleShuffleCards}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <Shuffle className="w-3 h-3" />
                  <span>Shuffle</span>
                </button>
              </div>

              {/* Flashcard Card */}
              <div
                onClick={() => setIsCardFlipped(!isCardFlipped)}
                className="min-h-[160px] bg-slate-950 border border-slate-800 hover:border-teal-500/40 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all shadow-inner select-none space-y-2"
              >
                {!isCardFlipped ? (
                  <>
                    <span className="text-2xl sm:text-3xl font-black text-white">
                      {currentFlashcard.front}
                    </span>
                    {currentFlashcard.phonetic && (
                      <span className="text-xs font-mono text-teal-300">
                        {currentFlashcard.phonetic}
                      </span>
                    )}
                    <span className="text-[11px] text-slate-500 block pt-2">
                      (Click to flip card)
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-sm sm:text-base font-semibold text-emerald-300 leading-relaxed">
                      {currentFlashcard.back}
                    </span>
                    <span className="text-[11px] text-slate-500 block pt-2">
                      (Click to flip back)
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                <button
                  onClick={handlePrevCard}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Prev
                </button>

                <button
                  onClick={() => toggleMasteredWord(currentFlashcard.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    masteredWordIds.includes(currentFlashcard.id)
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{masteredWordIds.includes(currentFlashcard.id) ? 'Mastered ✓' : 'Mark Mastered'}</span>
                </button>

                <button
                  onClick={handleNextCard}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400"
                >
                  Next Card
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Real-World Conversational Dialogue Simulator */}
        {dialogueScenario && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span>Interactive Real-World Dialogue</span>
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {dialogueScenario.title}
                </h3>
                <p className="text-xs text-slate-400">
                  Setting: {dialogueScenario.setting}
                </p>
              </div>
              <button
                onClick={handleResetDialogue}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="space-y-4">
              {dialogueScenario.steps.slice(0, dialogueCurrentStep + 1).map((step, sIdx) => {
                const chosenOptIdx = dialogueUserChoices[sIdx];
                const chosenOpt = chosenOptIdx !== undefined ? step.options[chosenOptIdx] : null;

                return (
                  <div key={sIdx} className="space-y-3 p-4 rounded-2xl bg-slate-950 border border-slate-850">
                    <div className="flex items-start gap-3">
                      <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold shrink-0">
                        {step.speaker}
                      </span>
                      <p className="text-sm text-slate-200 font-medium">
                        "{step.prompt}"
                      </p>
                    </div>

                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Your Response:</span>
                      <div className="grid gap-2">
                        {step.options.map((opt, optIdx) => {
                          const isChosen = chosenOptIdx === optIdx;
                          return (
                            <button
                              key={optIdx}
                              disabled={chosenOptIdx !== undefined}
                              onClick={() => handleChooseDialogueOption(sIdx, optIdx)}
                              className={`p-3 rounded-xl text-left text-xs font-medium border transition-all flex items-center justify-between ${
                                isChosen
                                  ? opt.isCorrect
                                    ? 'bg-emerald-950 text-emerald-200 border-emerald-500'
                                    : 'bg-rose-950 text-rose-200 border-rose-500'
                                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                              }`}
                            >
                              <span>{opt.text}</span>
                              {isChosen && opt.isCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {chosenOpt && (
                        <p className={`text-xs p-2.5 rounded-xl border mt-2 ${
                          chosenOpt.isCorrect
                            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                            : 'bg-rose-950/40 text-rose-300 border-rose-500/30'
                        }`}>
                          {chosenOpt.feedback}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Arabic Alphabet Makharij Visualizer (Displayed ONLY for Arabic) */}
        {selectedLangId === 'arabic-language-learning' && (
          <div className="space-y-4 pt-4">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-teal-400" />
              <span>Arabic Alphabet Makharij Articulation Visualizer</span>
            </h3>
            <LetterShapeVisualizer />
          </div>
        )}

      </section>

      {/* ========================================================================= */}
      {/* 5. LANGUAGE IMMERSION & LEARNING RESOURCES SECTION (LEARNABLE, NEWS, ETC.) */}
      {/* ========================================================================= */}
      <LanguageNewsSection selectedLangId={selectedLangId} />

      {/* ========================================================================= */}
      {/* 6. IN-PAGE LESSON PREVIEW MODAL */}
      {/* ========================================================================= */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">
                  {track.title} Preview
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {activeLesson.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveLesson(null)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {activeLesson.explanation}
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>What you will learn:</span>
              </span>
              <p className="text-xs text-slate-300">
                {activeLesson.subtitle || 'Master the essential principles and practical applications for this chapter.'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                onClick={() => setActiveLesson(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Close Preview
              </button>

              <Link
                to={`/reader/${track.id}/${activeLesson.id}`}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-glow flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Full Lesson in Reader</span>
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

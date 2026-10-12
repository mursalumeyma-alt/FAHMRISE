import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { 
  BookOpen, 
  Code2, 
  Bot, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  Menu, 
  X, 
  Play, 
  Award, 
  Copy, 
  Check, 
  HelpCircle,
  Sparkles,
  ArrowRight,
  Lock,
  ShieldCheck,
  RefreshCw,
  Unlock,
  Volume2,
  FileText,
  Lightbulb,
  CheckCircle,
  Video,
  BookMarked,
  ExternalLink
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import AiTutorDrawer from '../components/ai/AiTutorDrawer';
import Badge from '../components/common/Badge';
import AudioPlayer from '../components/common/AudioPlayer';
import LessonChallenge from '../components/practice/LessonChallenge';
import LessonQuiz from '../components/practice/LessonQuiz';
import LessonNotes from '../components/notes/LessonNotes';
import LetterShapeVisualizer from '../components/arabic/LetterShapeVisualizer';
import LessonVideoPlayer from '../components/video/LessonVideoPlayer';

// Inline markdown formatting helper (bold, code, italics)
function renderInlineMarkdown(text) {
  if (!text) return text;
  const tokens = [];
  const regex = /(\*\*.*?\*\*|`.*?`|\*.*?\*)/g;
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }
    const raw = match[0];
    if (raw.startsWith('**') && raw.endsWith('**')) {
      tokens.push({ type: 'bold', content: raw.slice(2, -2) });
    } else if (raw.startsWith('`') && raw.endsWith('`')) {
      tokens.push({ type: 'code', content: raw.slice(1, -1) });
    } else if (raw.startsWith('*') && raw.endsWith('*')) {
      tokens.push({ type: 'italic', content: raw.slice(1, -1) });
    }
    lastIndex = match.index + raw.length;
  }
  if (lastIndex < text.length) {
    tokens.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return tokens.map((token, i) => {
    if (token.type === 'bold') {
      return <strong key={i} className="font-bold text-white">{token.content}</strong>;
    }
    if (token.type === 'code') {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-300 font-mono text-xs">
          {token.content}
        </code>
      );
    }
    if (token.type === 'italic') {
      return <em key={i} className="italic text-slate-200">{token.content}</em>;
    }
    return token.content;
  });
}

function renderMarkdownBlock(paragraph, pIdx, copySnippet, copiedIndex) {
  const trimmed = paragraph.trim();

  // Code Block
  if (trimmed.startsWith('```')) {
    const lines = trimmed.replace(/```[a-z0-9_-]*/g, '').trim();
    return (
      <div key={pIdx} className="relative my-5 rounded-2xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs sm:text-sm text-emerald-400 overflow-x-auto shadow-inner">
        <button
          onClick={() => copySnippet(lines, pIdx)}
          className="absolute right-3 top-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center gap-1 transition-all"
        >
          {copiedIndex === pIdx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedIndex === pIdx ? 'Copied' : 'Copy'}</span>
        </button>
        <pre className="whitespace-pre">{lines}</pre>
      </div>
    );
  }

  // Headings
  if (trimmed.startsWith('#### ')) {
    return (
      <h4 key={pIdx} className="text-base sm:text-lg font-bold text-teal-300 mt-6 mb-2">
        {renderInlineMarkdown(trimmed.replace('#### ', ''))}
      </h4>
    );
  }
  if (trimmed.startsWith('### ')) {
    return (
      <h3 key={pIdx} className="text-lg sm:text-xl font-extrabold text-white mt-8 mb-3 flex items-center gap-2">
        <span className="w-2 h-5 bg-emerald-500 rounded-full inline-block shrink-0"></span>
        <span>{renderInlineMarkdown(trimmed.replace('### ', ''))}</span>
      </h3>
    );
  }
  if (trimmed.startsWith('## ')) {
    return (
      <h2 key={pIdx} className="text-xl sm:text-2xl font-black text-white mt-9 mb-4">
        {renderInlineMarkdown(trimmed.replace('## ', ''))}
      </h2>
    );
  }
  if (trimmed.startsWith('# ')) {
    return (
      <h1 key={pIdx} className="text-2xl sm:text-3xl font-black text-white mt-10 mb-4">
        {renderInlineMarkdown(trimmed.replace('# ', ''))}
      </h1>
    );
  }

  // Horizontal Divider
  if (trimmed === '---' || trimmed === '***') {
    return <hr key={pIdx} className="border-slate-800 my-8" />;
  }

  // Blockquote / Tip / Important Callout
  if (trimmed.startsWith('> ')) {
    const quoteText = trimmed.split('\n').map(l => l.replace(/^>\s?/, '')).join('\n');
    return (
      <div key={pIdx} className="my-6 p-5 sm:p-6 rounded-2xl bg-emerald-950/25 border-l-4 border-emerald-500 border-y border-r border-slate-800 shadow-md">
        <div className="flex items-start gap-3">
          <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div className="text-sm sm:text-base text-slate-200 leading-relaxed space-y-1">
            {quoteText.split('\n').map((qLine, qIdx) => (
              <p key={qIdx}>{renderInlineMarkdown(qLine)}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Markdown Table
  if (trimmed.startsWith('|') && trimmed.includes('\n|')) {
    const lines = trimmed.split('\n').filter(l => l.trim().startsWith('|'));
    if (lines.length >= 2) {
      const headerRow = lines[0].split('|').map(c => c.trim()).filter(Boolean);
      const dataRows = lines.slice(2).map(r => r.split('|').map(c => c.trim()).filter(Boolean));
      return (
        <div key={pIdx} className="my-6 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-200 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                {headerRow.map((h, hIdx) => (
                  <th key={hIdx} className="px-4 py-3 sm:px-5 sm:py-3.5">
                    {renderInlineMarkdown(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y border-slate-800/60">
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-800/30 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 sm:px-5 sm:py-3.5">
                      {renderInlineMarkdown(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  // Unordered or Ordered List
  const lines = trimmed.split('\n');
  const isUnordered = lines.every(l => l.trim().startsWith('- ') || l.trim().startsWith('* '));
  if (isUnordered && lines.length > 0) {
    return (
      <ul key={pIdx} className="my-4 space-y-2 text-sm sm:text-base text-slate-300 pl-2">
        {lines.map((l, lIdx) => (
          <li key={lIdx} className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2.5 shrink-0" />
            <span className="leading-relaxed">{renderInlineMarkdown(l.trim().replace(/^[-*]\s+/, ''))}</span>
          </li>
        ))}
      </ul>
    );
  }

  const isOrdered = lines.every(l => /^\d+\.\s+/.test(l.trim()));
  if (isOrdered && lines.length > 0) {
    return (
      <ol key={pIdx} className="my-4 space-y-2.5 text-sm sm:text-base text-slate-300 pl-1">
        {lines.map((l, lIdx) => {
          const match = l.trim().match(/^(\d+)\.\s+(.*)/);
          const num = match ? match[1] : String(lIdx + 1);
          const text = match ? match[2] : l.trim();
          return (
            <li key={lIdx} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {num}
              </span>
              <span className="leading-relaxed">{renderInlineMarkdown(text)}</span>
            </li>
          );
        })}
      </ol>
    );
  }

  // Regular paragraph with multi-line preservation
  return (
    <div key={pIdx} className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-2">
      {lines.map((line, lIdx) => (
        <p key={lIdx}>{renderInlineMarkdown(line)}</p>
      ))}
    </div>
  );
}

export default function ReaderPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isEnrolledIn, subscription, isSubscriptionActive, renewSubscription, refreshSubscription } = useAuth();
  const { progress, markLessonComplete, isLessonCompleted, isSmallLessonCompleted, fetchProgress } = useProgress();

  // Resolve bookId and lessonId safely
  let targetBookId = 'frontend-developer-zero-to-job-ready';
  let targetLessonId = params.lessonId || null;

  if (params.bookId) {
    const raw = params.bookId.toLowerCase().trim();

    // 1. Check if params.bookId is a known course ID / alias
    if (raw === 'fullstack-developer-bundle' || raw === 'fullstack-developer-zero-to-job-ready' || raw === 'fullstack-bundle' || raw === 'full-stack-developer-bundle' || raw === 'fullstack-developer' || raw === 'full-stack-bundle' || raw === 'fullstack' || raw === 'full-stack') {
      targetBookId = 'fullstack-developer-bundle';
    } else if (raw === 'data-analytics-professional-programme' || raw === 'data-analytics-programme' || raw === 'data-analytics-bundle' || raw === 'data-programme' || raw === 'data-analytics-career-track' || raw === 'data-analytics-master-track') {
      targetBookId = 'data-analytics-professional-programme';
    } else if (raw === 'power-bi-business-intelligence' || raw === 'power-bi' || raw === 'powerbi' || raw === 'power-bi-bi' || raw === 'business-intelligence' || raw === 'powerbi-mastery' || raw === 'pbi') {
      targetBookId = 'power-bi-business-intelligence';
    } else if (raw === 'sql-data-analysis' || raw === 'sql' || raw === 'sql-analysis' || raw === 'sql-for-data-analysis' || raw === 'sql-analytics' || raw === 'sql-mastery') {
      targetBookId = 'sql-data-analysis';
    } else if (raw === 'python-data-analysis' || raw === 'python-data' || raw === 'python-analytics' || raw === 'python-for-data-analysis' || raw === 'python-data-science' || raw === 'python-analysis') {
      targetBookId = 'python-data-analysis';
    } else if (raw === 'data-analytics-career-portfolio' || raw === 'data-career' || raw === 'data-portfolio' || raw === 'analytics-portfolio' || raw === 'data-analyst-career' || raw === 'career-portfolio' || raw === 'data-career-course') {
      targetBookId = 'data-analytics-career-portfolio';
    } else if (raw === 'data-analysis-spreadsheets' || raw === 'spreadsheet-mastery' || raw === 'data-analysis' || raw === 'excel-sheets' || raw === 'spreadsheets' || raw === 'data-spreadsheets' || raw === 'data-analytics' || raw === 'data-analysis-course') {
      targetBookId = 'data-analysis-spreadsheets';
    } else if (raw === 'backend-developer-zero-to-job-ready' || raw === 'backend-developer' || raw === 'backend-job-ready' || raw === 'backend' || raw === 'node-backend' || raw === 'express-backend' || raw === 'node-from-zero' || raw === 'express-from-zero' || raw === 'backend-engineering') {
      targetBookId = 'backend-developer-zero-to-job-ready';
    } else if (raw === 'frontend-developer-zero-to-job-ready' || raw === 'frontend-developer' || raw === 'frontend-job-ready' || raw === 'frontend' || raw === 'html-from-zero' || raw === 'css-from-zero' || raw === 'javascript-from-zero' || raw === 'react-frontend' || raw === 'web-development' || raw === 'web-dev') {
      targetBookId = 'frontend-developer-zero-to-job-ready';
    } else if (raw === 'cybersecurity-fundamentals' || raw === 'digital-safety' || raw === 'cyber-security' || raw === 'cybersecurity' || raw === 'online-safety') {
      targetBookId = 'cybersecurity-fundamentals';
    } else if (raw === 'professional-communication' || raw === 'job-readiness' || raw === 'modern-career-skills' || raw === 'career-skills' || raw === 'career' || raw === 'career-track' || raw === 'communication-skills') {
      targetBookId = 'professional-communication';
    } else if (raw === 'digital-entrepreneurship' || raw === 'entrepreneurship' || raw === 'freelancing' || raw === 'digital-business') {
      targetBookId = 'digital-entrepreneurship';
    } else if (raw === 'hadith-essentials' || raw === 'hadith' || raw === 'hadith-studies' || raw === 'forty-hadith') {
      targetBookId = 'hadith-essentials';
    } else if (raw === 'quran-tafsir-from-zero' || raw === 'tafsir-from-zero' || raw === 'tafsir' || raw === 'quran-tafsir' || raw === 'quran-understanding' || raw === 'tafseer') {
      targetBookId = 'quran-tafsir-from-zero';
    } else if (raw === 'salah-from-zero' || raw === 'prayer-from-zero' || raw === 'salah' || raw === 'prayer' || raw === 'learn-salah' || raw === 'islamic-prayer' || raw === 'salat' || raw === 'namaz') {
      targetBookId = 'salah-from-zero';
    } else if (raw === 'islamic-aqeedah-from-zero' || raw === 'aqeedah-from-zero' || raw === 'aqeedah' || raw === 'islamic-creed' || raw === 'six-pillars-of-iman' || raw === 'tawheed-from-zero' || raw === 'iman' || raw === 'creed') {
      targetBookId = 'islamic-aqeedah-from-zero';
    } else if (raw === 'islamic-manners-and-duas' || raw === 'manners-and-duas' || raw === 'islamic-manners' || raw === 'daily-duas' || raw === 'adab-and-duas' || raw === 'akhlaq-and-duas' || raw === 'adab' || raw === 'akhlaq' || raw === 'duas') {
      targetBookId = 'islamic-manners-and-duas';
    } else if (raw === 'quran-tajweed-from-zero' || raw === 'tajweed-from-zero' || raw === 'tajweed' || raw === 'quran-recitation' || raw === 'quran-recitation-and-tajweed' || raw === 'huruf-al-hijaa') {
      targetBookId = 'quran-tajweed-from-zero';
    } else if (raw === 'arabic-language-learning' || raw === 'arabic-language-from-zero' || raw === 'arabic-language-mastery' || raw === 'learn-arabic' || raw === 'arabic') {
      targetBookId = 'arabic-language-learning';
    } else if (raw === 'english-language-learning' || raw === 'english-language-skills' || raw === 'english-language' || raw === 'learn-english' || raw === 'english') {
      targetBookId = 'english-language-learning';
    } else if (raw === 'french-language-learning' || raw === 'french-language' || raw === 'learn-french' || raw === 'french') {
      targetBookId = 'french-language-learning';
    } else if (raw === 'swahili-language-learning' || raw === 'swahili-language-skills' || raw === 'swahili-language' || raw === 'kiswahili-skills' || raw === 'learn-swahili' || raw === 'swahili' || raw === 'kiswahili') {
      targetBookId = 'swahili-language-learning';
    }
    // 2. Check if params.bookId is a single standalone lesson ID (e.g. /reader/data-1 or /reader/pbi-3)
    else if (/^m\d+-l\d+$/i.test(raw) || /^ar-\d+$/i.test(raw)) {
      targetBookId = 'arabic-language-learning';
      targetLessonId = raw;
    } else if (/^en-\d+$/i.test(raw)) {
      targetBookId = 'english-language-learning';
      targetLessonId = raw;
    } else if (/^fr-\d+$/i.test(raw)) {
      targetBookId = 'french-language-learning';
      targetLessonId = raw;
    } else if (/^sw-\d+$/i.test(raw)) {
      targetBookId = 'swahili-language-learning';
      targetLessonId = raw;
    } else if (/^pbi-\d+$/i.test(raw)) {
      targetBookId = 'power-bi-business-intelligence';
      targetLessonId = raw;
    } else if (/^sql-\d+$/i.test(raw)) {
      targetBookId = 'sql-data-analysis';
      targetLessonId = raw;
    } else if (/^py-\d+$/i.test(raw)) {
      targetBookId = 'python-data-analysis';
      targetLessonId = raw;
    } else if (/^port-\d+$/i.test(raw)) {
      targetBookId = 'data-analytics-career-portfolio';
      targetLessonId = raw;
    } else if (/^data-\d+$/i.test(raw)) {
      targetBookId = 'data-analysis-spreadsheets';
      targetLessonId = raw;
    } else if (/^be-\d+$/i.test(raw) || /^bed-\d+$/i.test(raw)) {
      targetBookId = 'backend-developer-zero-to-job-ready';
      targetLessonId = raw;
    } else if (/^fe-\d+$/i.test(raw) || /^fed-\d+$/i.test(raw)) {
      targetBookId = 'frontend-developer-zero-to-job-ready';
      targetLessonId = raw;
    } else if (/^cyber-\d+$/i.test(raw)) {
      targetBookId = 'cybersecurity-fundamentals';
      targetLessonId = raw;
    } else if (/^job-\d+$/i.test(raw) || /^comm-\d+$/i.test(raw)) {
      targetBookId = 'professional-communication';
      targetLessonId = raw;
    } else if (/^biz-\d+$/i.test(raw)) {
      targetBookId = 'digital-entrepreneurship';
      targetLessonId = raw;
    } else if (/^hadith-\d+$/i.test(raw)) {
      targetBookId = 'hadith-essentials';
      targetLessonId = raw;
    } else if (/^tafsir-\d+$/i.test(raw)) {
      targetBookId = 'quran-tafsir-from-zero';
      targetLessonId = raw;
    } else if (/^salah-\d+$/i.test(raw) || /^prayer-\d+$/i.test(raw)) {
      targetBookId = 'salah-from-zero';
      targetLessonId = raw;
    } else if (/^aqeedah-\d+$/i.test(raw) || /^iman-\d+$/i.test(raw)) {
      targetBookId = 'islamic-aqeedah-from-zero';
      targetLessonId = raw;
    } else if (/^manners-\d+$/i.test(raw) || /^dua-\d+$/i.test(raw) || /^adab-\d+$/i.test(raw)) {
      targetBookId = 'islamic-manners-and-duas';
      targetLessonId = raw;
    } else if (/^tajweed-ch\d+$/i.test(raw) || /^tajweed-\d+$/i.test(raw)) {
      targetBookId = 'quran-tajweed-from-zero';
      targetLessonId = raw;
    } else if (/^js-\d+$/i.test(raw)) {
      targetBookId = 'frontend-developer-zero-to-job-ready';
      targetLessonId = 'fe-4';
    } else if (/^lesson-\d+$/i.test(raw)) {
      targetBookId = 'frontend-developer-zero-to-job-ready';
      targetLessonId = 'fe-2';
    } else {
      targetBookId = params.bookId;
      targetLessonId = params.lessonId || null;
    }
  }

  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [prevLesson, setPrevLesson] = useState(null);
  const [nextLesson, setNextLesson] = useState(null);
  const [currentSmallLessonIndex, setCurrentSmallLessonIndex] = useState(0);
  const [openChapters, setOpenChapters] = useState({});
  const [isLocked, setIsLocked] = useState(false);
  const [lockReason, setLockReason] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [savingProgress, setSavingProgress] = useState(false);
  const [renewing, setRenewing] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const activeSub = isSubscriptionActive();
  const isEnrolled = isEnrolledIn(targetBookId);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const bookData = await api.books.getById(targetBookId);
        const loadedCourse = bookData.course || bookData.book;
        setCourse(loadedCourse);

        // Determine active lesson ID with robust fallback
        let activeLessonId = targetLessonId;
        if (!activeLessonId && loadedCourse?.lessons?.length > 0) {
          activeLessonId = loadedCourse.lessons[0].id;
        }
        if (!activeLessonId) {
          activeLessonId = 'data-1';
        }

        try {
          const lessonData = await api.books.getLesson(targetBookId, activeLessonId);
          setCurrentLesson(lessonData.lesson);
          setPrevLesson(lessonData.prevLesson);
          setNextLesson(lessonData.nextLesson);
          setIsLocked(lessonData.isLocked);
          setLockReason(lessonData.lockReason);

          if (lessonData.lesson?.id) {
            setOpenChapters(prev => ({ ...prev, [lessonData.lesson.id]: true }));
          }
        } catch (lessonErr) {
          console.warn('Failed to load specific lesson, attempting fallback to chapter 1:', lessonErr);
          if (loadedCourse?.lessons?.length > 0) {
            const firstLesson = loadedCourse.lessons[0];
            const fallbackLessonData = await api.books.getLesson(targetBookId, firstLesson.id);
            setCurrentLesson(fallbackLessonData.lesson);
            setPrevLesson(fallbackLessonData.prevLesson);
            setNextLesson(fallbackLessonData.nextLesson);
            setIsLocked(fallbackLessonData.isLocked);
            setLockReason(fallbackLessonData.lockReason);
            if (firstLesson.id) {
              setOpenChapters(prev => ({ ...prev, [firstLesson.id]: true }));
            }
          }
        }

        // Check if small lesson param was passed in URL query
        const smallParam = searchParams.get('sl');
        if (smallParam && currentLesson?.smallLessons) {
          const idx = currentLesson.smallLessons.findIndex(sl => sl.id === smallParam);
          if (idx >= 0) {
            setCurrentSmallLessonIndex(idx);
          } else {
            setCurrentSmallLessonIndex(0);
          }
        } else {
          setCurrentSmallLessonIndex(0);
        }

        if (user) {
          await fetchProgress(targetBookId);
        }
      } catch (err) {
        console.error('Failed to load lesson in reader:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
    window.scrollTo(0, 0);
  }, [targetBookId, targetLessonId, subscription]);

  // Handle small lesson parameter synchronization
  const handleSelectSmallLesson = (index) => {
    setCurrentSmallLessonIndex(index);
    const sl = currentLesson?.smallLessons?.[index];
    if (sl) {
      setSearchParams({ sl: sl.id });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasSmallLessons = currentLesson?.smallLessons && currentLesson.smallLessons.length > 0;
  const activeSmallLesson = hasSmallLessons ? currentLesson.smallLessons[currentSmallLessonIndex] : null;

  const isCurrentSmallDone = useMemo(() => {
    if (!currentLesson) return false;
    if (hasSmallLessons && activeSmallLesson) {
      return isSmallLessonCompleted(currentLesson.id, activeSmallLesson.id);
    }
    return isLessonCompleted(currentLesson.id);
  }, [currentLesson, hasSmallLessons, activeSmallLesson, progress]);

  const isChapterFullyDone = useMemo(() => {
    if (!currentLesson) return false;
    return isLessonCompleted(currentLesson.id);
  }, [currentLesson, progress]);

  // Mark lesson / small lesson complete
  const handleMarkComplete = async () => {
    if (!user) {
      navigate(`/login?redirect=/reader/${targetBookId}/${currentLesson?.id}`);
      return;
    }
    if (!currentLesson) return;

    setSavingProgress(true);
    try {
      if (hasSmallLessons && activeSmallLesson) {
        // Complete small lesson
        await markLessonComplete(
          currentLesson.id,
          targetBookId,
          currentLesson.id,
          activeSmallLesson.id
        );

        // Move to next small lesson if available in this chapter
        if (currentSmallLessonIndex < currentLesson.smallLessons.length - 1) {
          handleSelectSmallLesson(currentSmallLessonIndex + 1);
        } else if (nextLesson) {
          // Chapter completed, proceed to next chapter
          navigate(`/reader/${targetBookId}/${nextLesson.id}`);
        } else {
          // Course completed!
          navigate('/dashboard');
        }
      } else {
        // Standard single lesson completion
        await markLessonComplete(currentLesson.id, targetBookId);
        if (nextLesson) {
          navigate(`/reader/${targetBookId}/${nextLesson.id}`);
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.error('Error completing lesson:', err);
    } finally {
      setSavingProgress(false);
    }
  };

  const handleQuickRenew = async () => {
    setRenewing(true);
    try {
      await renewSubscription({ method: 'mpesa' });
      await refreshSubscription();
      setIsLocked(false);
    } catch (err) {
      alert('Renewal failed. Please try again.');
    } finally {
      setRenewing(false);
    }
  };

  const copySnippet = (codeText, idx) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleChapterAccordion = (chId) => {
    setOpenChapters(prev => ({ ...prev, [chId]: !prev[chId] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading FAHMRISE reader...</span>
        </div>
      </div>
    );
  }

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4 px-4 text-center">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center mx-auto">
          <BookOpen className="w-6 h-6" />
        </div>
        <p className="text-base font-bold text-white">Lesson not found.</p>
        <p className="text-xs text-slate-400 max-w-sm">The requested chapter or course could not be loaded. You can return to the course catalog or jump to Chapter 1.</p>
        <div className="flex items-center gap-3">
          {course?.lessons?.[0] && (
            <Link to={`/reader/${course.id}/${course.lessons[0].id}`} className="px-4 py-2 bg-emerald-500 text-slate-950 rounded-xl font-bold text-xs shadow-glow">
              Open Chapter 1
            </Link>
          )}
          <Link to="/courses" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold text-xs border border-slate-700">
            Return to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* Top Reader Navbar */}
      <div className="sticky top-16 z-30 bg-slate-950/95 backdrop-blur border-b border-slate-800/80 px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3 truncate">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white shrink-0"
            title="Toggle syllabus sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="truncate">
            <div className="flex items-center gap-2 truncate">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 shrink-0">
                {course.title}
              </span>
              <span className="text-xs font-semibold text-slate-300 hidden sm:inline truncate">
                Ch. {currentLesson.number}: {currentLesson.title}
                {hasSmallLessons && activeSmallLesson && (
                  <span className="text-teal-400 font-normal ml-1">
                    › {activeSmallLesson.title}
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setAiTutorOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-all"
          >
            <Bot className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>

          <Link
            to="/practice"
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-teal-400 flex items-center gap-1.5 transition-all"
          >
            <Code2 className="w-4 h-4" />
            <span className="hidden sm:inline">Practice Arena</span>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Left Sidebar Drawer (Structured Syllabus Accordion) */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-80 bg-slate-950 border-r border-slate-800 p-4 transform transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {course.title}
              </h3>
              <p className="text-[11px] text-teal-400 font-medium mt-0.5">
                {course.totalLessons || course.lessons?.length || 0} Chapters Curriculum
              </p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 space-y-2 max-h-[calc(100vh-190px)] overflow-y-auto pr-1 custom-scrollbar">
            {(course.lessons || []).map((ch, chIdx) => {
              const isCurrentChapter = ch.id === currentLesson.id;
              const isDone = isLessonCompleted(ch.id);
              const canAccess = ch.number === 1 || activeSub || !course.requiresPayment;
              const chOpen = openChapters[ch.id] ?? isCurrentChapter;
              const chapterSmallLessons = ch.smallLessons || [];

              return (
                <div key={ch.id} className="rounded-xl border border-slate-850 overflow-hidden bg-slate-900/40">
                  {/* Chapter Header */}
                  <div
                    onClick={() => {
                      if (chapterSmallLessons.length > 0) {
                        toggleChapterAccordion(ch.id);
                      }
                      if (!isCurrentChapter) {
                        navigate(`/reader/${targetBookId}/${ch.id}`);
                        setSidebarOpen(false);
                      }
                    }}
                    className={`p-3 text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                      isCurrentChapter
                        ? 'bg-teal-950/40 text-teal-300 border-l-2 border-teal-400'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className="font-mono text-[11px] text-slate-500 shrink-0">{ch.number || chIdx + 1}.</span>
                      <span className="truncate">{ch.title}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : !canAccess ? (
                        <Lock className="w-3.5 h-3.5 text-rose-400" />
                      ) : null}

                      {chapterSmallLessons.length > 0 && (
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${chOpen ? 'rotate-180' : ''}`} />
                      )}
                    </div>
                  </div>

                  {/* Nested Small Lessons List */}
                  {chapterSmallLessons.length > 0 && chOpen && (
                    <div className="bg-slate-950/80 border-t border-slate-850/60 py-1 px-2 space-y-1">
                      {chapterSmallLessons.map((sl, slIdx) => {
                        const isSmallActive = isCurrentChapter && currentSmallLessonIndex === slIdx;
                        const isSlDone = isSmallLessonCompleted(ch.id, sl.id);

                        return (
                          <button
                            key={sl.id}
                            onClick={() => {
                              if (!isCurrentChapter) {
                                navigate(`/reader/${targetBookId}/${ch.id}?sl=${sl.id}`);
                              } else {
                                handleSelectSmallLesson(slIdx);
                              }
                              setSidebarOpen(false);
                            }}
                            className={`w-full text-left py-1.5 px-2.5 rounded-lg text-[11px] flex items-center justify-between transition-all ${
                              isSmallActive
                                ? 'bg-teal-500/20 text-teal-200 font-semibold ring-1 ring-teal-500/30'
                                : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate pr-2">
                              <span className="font-mono text-[10px] text-slate-500">{slIdx + 1}.</span>
                              <span className="truncate">{sl.title}</span>
                            </div>

                            {isSlDone && (
                              <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-8 lg:px-12 py-8 max-w-4xl space-y-8">
          
          {isLocked ? (
            /* LOCKED LESSON PROMPT */
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-rose-500/40 text-center space-y-6 my-12 shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center mx-auto">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase font-bold tracking-wider text-rose-400">
                  {lockReason === 'subscription_expired' ? 'Subscription Expired • Progress Preserved' : 'Monthly Subscription Required'}
                </span>
                <h2 className="text-2xl font-black text-white">
                  Unlock Chapter {currentLesson.number}: {currentLesson.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  This chapter is part of the <strong>{course.title}</strong> premium curriculum. 
                </p>
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-emerald-400 max-w-md mx-auto">
                  💾 <strong>Learning Progress Safe</strong>: Your completed chapters and quiz scores are saved. Renewing immediately restores full reading access.
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleQuickRenew}
                  disabled={renewing}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2"
                >
                  {renewing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Renewing...</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4" />
                      <span>Renew Subscription — KSh 350</span>
                    </>
                  )}
                </button>

                <Link
                  to={`/reader/${targetBookId}/${course.lessons[0]?.id || 'lesson-1'}`}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Read Free Preview (Lesson 1)
                </Link>
              </div>
            </div>
          ) : (
            /* UNLOCKED LESSON CONTENT */
            <>
              {/* STRUCTURED SMALL LESSONS MODE */}
              {hasSmallLessons && activeSmallLesson ? (
                <div className="space-y-8">
                  {/* Chapter & Small Lesson Header */}
                  <div className="space-y-3 pb-6 border-b border-slate-850">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span className="font-semibold text-slate-300">
                        Chapter {currentLesson.number}: {currentLesson.title}
                      </span>
                      <span>•</span>
                      <span className="text-teal-400 font-medium">
                        Lesson {currentSmallLessonIndex + 1} of {currentLesson.smallLessons.length}
                      </span>
                      <span>•</span>
                      <span>{activeSmallLesson.readingTime || '5 min'}</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                      {activeSmallLesson.title}
                    </h1>

                    {activeSmallLesson.subtitle && (
                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                        {activeSmallLesson.subtitle}
                      </p>
                    )}

                    {/* Small Lesson Quick Pill Tabs */}
                    <div className="flex items-center gap-1.5 pt-2 overflow-x-auto pb-1">
                      {currentLesson.smallLessons.map((sl, idx) => {
                        const isCurrent = idx === currentSmallLessonIndex;
                        const isDone = isSmallLessonCompleted(currentLesson.id, sl.id);

                        return (
                          <button
                            key={sl.id}
                            onClick={() => handleSelectSmallLesson(idx)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
                              isCurrent
                                ? 'bg-teal-500/25 text-teal-300 border border-teal-500/40'
                                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                            }`}
                          >
                            <span>{idx + 1}. {sl.title.split(' ')[0]}</span>
                            {isDone && <Check className="w-3 h-3 text-emerald-400" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Audio Pronunciation (Tajweed & Phonetics) */}
                  {(activeSmallLesson.audio || activeSmallLesson.arabic || activeSmallLesson.sound || targetBookId.includes('tajweed') || targetBookId.includes('quran')) && (
                    <AudioPlayer
                      arabicText={activeSmallLesson.arabic || (activeSmallLesson.examples?.[0]?.arabic) || null}
                      transliteration={activeSmallLesson.transliteration || (activeSmallLesson.examples?.[0]?.label) || null}
                      soundCue={activeSmallLesson.sound || (activeSmallLesson.examples?.[0]?.sound) || null}
                      label={activeSmallLesson.arabic ? 'Core Articulation & Audio' : 'Phonetic Sound Guide'}
                      size="large"
                      makhrajDetails={activeSmallLesson.makhraj || null}
                    />
                  )}

                  {/* Main Explanation Markdown Content */}
                  <div className="space-y-6 text-base sm:text-lg lg:text-xl text-slate-200 leading-[1.85] font-normal">
                    {activeSmallLesson.explanation ? (
                      activeSmallLesson.explanation.split('\n\n').map((paragraph, pIdx) => {
                        if (paragraph.startsWith('```')) {
                          const lines = paragraph.replace(/```[a-z]*/g, '').trim();
                          return (
                            <div key={pIdx} className="relative my-5 rounded-2xl bg-slate-900 border border-slate-800 p-5 font-mono text-sm text-teal-300 overflow-x-auto">
                              <button
                                onClick={() => copySnippet(lines, pIdx)}
                                className="absolute right-3 top-3 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 transition-colors"
                              >
                                {copiedIndex === pIdx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                <span>{copiedIndex === pIdx ? 'Copied' : 'Copy'}</span>
                              </button>
                              <pre>{lines}</pre>
                            </div>
                          );
                        }

                        if (paragraph.startsWith('### ')) {
                          return (
                            <h3 key={pIdx} className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mt-8 mb-3 flex items-center gap-2.5">
                              <span className="w-2 h-5 bg-teal-400 rounded-full inline-block shrink-0"></span>
                              <span>{paragraph.replace('### ', '')}</span>
                            </h3>
                          );
                        }

                        if (paragraph.startsWith('#### ')) {
                          return (
                            <h4 key={pIdx} className="text-lg sm:text-xl font-bold text-teal-300 mt-6 mb-2">
                              {paragraph.replace('#### ', '')}
                            </h4>
                          );
                        }

                        return (
                          <p key={pIdx} className="text-slate-200 leading-[1.85]">
                            {paragraph}
                          </p>
                        );
                      })
                    ) : (
                      <p className="text-slate-400">Lesson explanation rendering.</p>
                    )}
                  </div>

                  {/* Interactive Arabic Letter Shapes Visualizer & Unblocked "The Shape Style" Note */}
                  {(activeSmallLesson.shapeTable || activeSmallLesson.shapeStyleNote || activeSmallLesson.id === 'tajweed-ch1-l2' || (activeSmallLesson.title && activeSmallLesson.title.toLowerCase().includes('shape'))) && (
                    <LetterShapeVisualizer
                      customShapes={activeSmallLesson.shapeTable}
                      customNote={activeSmallLesson.shapeStyleNote}
                    />
                  )}

                  {/* Key Points Box */}
                  {activeSmallLesson.keyPoints && activeSmallLesson.keyPoints.length > 0 && (
                    <div className="p-6 sm:p-7 rounded-3xl bg-teal-950/30 border border-teal-500/40 shadow-xl">
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400">
                          <Lightbulb className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-teal-300">
                          Key Articulation & Recitation Takeaways
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {activeSmallLesson.keyPoints.map((point, ptIdx) => (
                          <li key={ptIdx} className="flex items-start gap-3 text-sm sm:text-base text-slate-100 leading-relaxed">
                            <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0"></span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Examples & Letter Comparisons Section */}
                  {activeSmallLesson.examples && activeSmallLesson.examples.length > 0 && (
                    <div className="space-y-5">
                      <h4 className="text-base sm:text-lg font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-2.5">
                        <Sparkles className="w-5 h-5 text-teal-400" /> Examples & Letter Comparisons
                      </h4>
                      <div className="grid gap-4">
                        {activeSmallLesson.examples.map((ex, exIdx) => (
                          <div key={exIdx} className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
                            {ex.title && (
                              <p className="text-sm font-bold text-teal-300 mb-2">{ex.title}</p>
                            )}
                            {ex.code && (
                              <div className="my-2 p-4 bg-slate-950 rounded-xl font-mono text-xs sm:text-sm text-emerald-300 overflow-x-auto border border-slate-800">
                                <pre>{ex.code}</pre>
                              </div>
                            )}
                            {ex.arabic && (
                              <div className="my-3 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 bg-slate-950 rounded-2xl border border-slate-800">
                                <div className="text-center sm:text-left">
                                  <span
                                    className="text-3xl sm:text-4xl lg:text-5xl font-serif text-teal-200 font-bold block leading-[1.7] py-2 px-1"
                                    style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
                                    dir="rtl"
                                  >
                                    {ex.arabic}
                                  </span>
                                  {ex.label && <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">{ex.label}</p>}
                                </div>
                                <AudioPlayer compact arabicText={ex.arabic} transliteration={ex.label} soundCue={ex.sound} />
                              </div>
                            )}
                            {ex.description && (
                              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">{ex.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Practice Activity */}
                  {activeSmallLesson.practice && (
                    <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-lg">
                      <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-teal-400 mb-3 flex items-center gap-2.5">
                        <Code2 className="w-5 h-5" /> Practical Articulation Drill
                      </h4>
                      <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-medium">
                        {activeSmallLesson.practice}
                      </p>
                    </div>
                  )}

                  {/* Interactive Challenge */}
                  {activeSmallLesson.challenge && (
                    <LessonChallenge
                      challenge={activeSmallLesson.challenge}
                      isCompleted={isCurrentSmallDone}
                      onComplete={() => {
                        markLessonComplete(
                          currentLesson.id,
                          targetBookId,
                          currentLesson.id,
                          activeSmallLesson.id
                        );
                      }}
                    />
                  )}

                  {/* Personal Study Notes */}
                  <LessonNotes
                    bookId={targetBookId}
                    chapterId={currentLesson.id}
                    smallLessonId={activeSmallLesson.id}
                  />

                  {/* Lesson Navigation & Completion Action Bar */}
                  <div className="pt-8 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={handleMarkComplete}
                      disabled={savingProgress}
                      className={`min-h-[52px] w-full sm:w-auto px-7 py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2.5 transition-all shadow-xl active:scale-95 ${
                        isCurrentSmallDone
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/80 hover:bg-emerald-900/60'
                          : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/20 hover:shadow-teal-500/40'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                      <span>{isCurrentSmallDone ? 'Completed ✓ Continue' : 'Mark as Complete & Continue'}</span>
                    </button>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                      {currentSmallLessonIndex > 0 ? (
                        <button
                          onClick={() => handleSelectSmallLesson(currentSmallLessonIndex - 1)}
                          className="min-h-[48px] px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 border border-slate-800 active:scale-95 transition-all"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Previous Lesson</span>
                        </button>
                      ) : prevLesson ? (
                        <Link
                          to={`/reader/${targetBookId}/${prevLesson.id}`}
                          className="min-h-[48px] px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 border border-slate-800 active:scale-95 transition-all"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Previous Chapter</span>
                        </Link>
                      ) : null}

                      {currentSmallLessonIndex < currentLesson.smallLessons.length - 1 ? (
                        <button
                          onClick={() => handleSelectSmallLesson(currentSmallLessonIndex + 1)}
                          className="min-h-[48px] px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-teal-400 text-xs sm:text-sm font-semibold flex items-center gap-1.5 border border-slate-800 active:scale-95 transition-all"
                        >
                          <span>Next Lesson</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : nextLesson ? (
                        <Link
                          to={`/reader/${targetBookId}/${nextLesson.id}`}
                          className="min-h-[48px] px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-teal-400 text-xs sm:text-sm font-semibold flex items-center gap-1.5 border border-slate-800 active:scale-95 transition-all"
                        >
                          <span>Next Chapter</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : (
                /* STANDARD LESSON MODE (e.g. HTML From Zero) */
                <>
                  {/* Chapter Header */}
                  <div className="space-y-3 pb-6 border-b border-slate-900">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>Chapter {currentLesson.number} of {course.totalLessons || course.lessons?.length || 10}</span>
                      <span>•</span>
                      <span>{currentLesson.readingTime || '12 min'}</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {currentLesson.title}
                    </h1>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      {currentLesson.subtitle || currentLesson.summary}
                    </p>
                  </div>

                  {/* Learning Objectives Box (if available) */}
                  {currentLesson.objectives && currentLesson.objectives.length > 0 && (
                    <div className="p-5 sm:p-6 rounded-3xl bg-teal-950/20 border border-teal-500/30 shadow-lg">
                      <div className="flex items-center gap-2 mb-3 text-teal-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
                        <Sparkles className="w-4 h-4" />
                        <span>Module Learning Objectives</span>
                      </div>
                      <ul className="grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-200">
                        {currentLesson.objectives.map((obj, oIdx) => (
                          <li key={oIdx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
                            <span className="leading-relaxed">{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Verified Prophetic Hadith Callout Box (if available) */}
                  {currentLesson.verifiedHadith && (
                    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-xl space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Core Verified Hadith</span>
                        </span>
                        {currentLesson.verifiedHadith.grading && (
                          <span className="px-2.5 py-1 rounded-full bg-slate-900 text-teal-300 text-xs font-semibold border border-slate-700">
                            {currentLesson.verifiedHadith.grading}
                          </span>
                        )}
                      </div>

                      {/* Arabic Matn */}
                      <div 
                        className="py-4 text-center sm:text-right font-serif text-2xl sm:text-3xl text-emerald-100 leading-[2] font-semibold"
                        style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
                        dir="rtl"
                      >
                        {currentLesson.verifiedHadith.arabic}
                      </div>

                      {/* English Translation */}
                      <div className="pt-3 border-t border-slate-800/80">
                        <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
                          "{currentLesson.verifiedHadith.translation}"
                        </p>
                        {currentLesson.verifiedHadith.reference && (
                          <p className="text-xs font-bold text-teal-400 mt-2 font-mono">
                            📜 Source: {currentLesson.verifiedHadith.reference}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Resilient English Video Lesson Player (if available) */}
                  {currentLesson.videoLesson && (
                    <LessonVideoPlayer videoLesson={currentLesson.videoLesson} />
                  )}

                  {/* Lesson Body Rendered Markdown */}
                  <div className="prose prose-invert max-w-none text-slate-300 space-y-6 text-sm sm:text-base leading-relaxed">
                    {currentLesson.content ? (
                      currentLesson.content
                        .split('\n\n')
                        .filter(p => Boolean(p && p.trim()))
                        .map((paragraph, pIdx) => renderMarkdownBlock(paragraph, pIdx, copySnippet, copiedIndex))
                    ) : (
                      <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <p className="text-slate-300 font-semibold text-sm">Educational content is being loaded for this chapter.</p>
                        <p className="text-xs text-slate-500">Please select a chapter from the curriculum or refresh if needed.</p>
                      </div>
                    )}
                  </div>

                  {/* Interactive Language Vocabulary Bank (if available) */}
                  {currentLesson.vocabulary && currentLesson.vocabulary.length > 0 && (
                    <div className="space-y-4 pt-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-teal-400" />
                          <span>Chapter Vocabulary Bank</span>
                        </h3>
                        <span className="text-xs text-teal-400 font-medium bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                          {currentLesson.vocabulary.length} Key Terms
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3.5">
                        {currentLesson.vocabulary.map((item, vIdx) => (
                          <div key={vIdx} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/30 transition-all shadow-sm space-y-1.5">
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="text-sm sm:text-base font-bold text-white">
                                {item.word}
                              </span>
                              {item.phonetic && (
                                <span className="text-xs font-mono text-teal-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                                  {item.phonetic}
                                </span>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-emerald-300 font-medium">
                              {item.translation}
                            </p>
                            {item.example && (
                              <p className="text-xs text-slate-400 italic pt-1 border-t border-slate-850">
                                "{item.example}"
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Language Examples & Conversational Models (if available) */}
                  {currentLesson.examples && currentLesson.examples.length > 0 && (
                    <div className="space-y-4 pt-4">
                      <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-teal-400" />
                        <span>Example Sentences & Practical Models</span>
                      </h3>

                      <div className="space-y-3">
                        {currentLesson.examples.map((ex, exIdx) => (
                          <div key={exIdx} className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                            <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                              {ex.original || ex.arabic || ex.text}
                            </p>
                            <p className="text-xs sm:text-sm text-teal-300 font-medium">
                              {ex.translation || ex.trans}
                            </p>
                            {ex.note && (
                              <p className="text-xs text-slate-400 border-t border-slate-850 pt-1.5 flex items-center gap-1.5">
                                <span className="text-teal-400 font-bold">💡 Note:</span>
                                <span>{ex.note}</span>
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Takeaways & Core Rules (if available) */}
                  {currentLesson.keyPoints && currentLesson.keyPoints.length > 0 && (
                    <div className="p-6 sm:p-7 rounded-3xl bg-teal-950/20 border border-teal-500/30 shadow-lg space-y-3">
                      <div className="flex items-center gap-2 text-teal-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
                        <Lightbulb className="w-4 h-4" />
                        <span>Key Chapter Takeaways & Rules</span>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                        {currentLesson.keyPoints.map((pt, ptIdx) => (
                          <li key={ptIdx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
                            <span className="leading-relaxed">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Key Vocabulary / Terminology Grid (if available) */}
                  {currentLesson.keyTerms && currentLesson.keyTerms.length > 0 && (
                    <div className="space-y-4 pt-4">
                      <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-teal-400" />
                        <span>Essential Terminology & Key Vocabulary</span>
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {currentLesson.keyTerms.map((item, ktIdx) => (
                          <div key={ktIdx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm space-y-1">
                            <p className="text-xs sm:text-sm font-bold text-teal-300">{item.term}</p>
                            <p className="text-xs text-slate-300 leading-relaxed">{item.meaning}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Practical Application & Action Checklist (if available) */}
                  {currentLesson.practicalApplication && (
                    <div className="p-6 rounded-3xl bg-emerald-950/25 border border-emerald-500/30 shadow-md space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
                        <CheckCircle className="w-4 h-4" />
                        <span>Daily Sunnah & Practical Application</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {currentLesson.practicalApplication}
                      </p>
                    </div>
                  )}

                  {/* Reflection & Critical Inquiries (if available) */}
                  {currentLesson.reflectionQuestions && currentLesson.reflectionQuestions.length > 0 && (
                    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-850 shadow-md space-y-3">
                      <div className="flex items-center gap-2 text-teal-300 font-bold text-xs sm:text-sm uppercase tracking-wider">
                        <HelpCircle className="w-4 h-4 text-teal-400" />
                        <span>Reflective Inquiry & Contemplation</span>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                        {currentLesson.reflectionQuestions.map((q, qIdx) => (
                          <li key={qIdx} className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-slate-800 text-teal-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {qIdx + 1}
                            </span>
                            <span className="leading-relaxed">{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Module End Interactive Quiz (if available) */}
                  {currentLesson.quiz && (
                    <LessonQuiz
                      quiz={currentLesson.quiz}
                      bookId={targetBookId}
                      lessonId={currentLesson.id}
                      onComplete={() => {
                        if (user) {
                          markLessonComplete(currentLesson.id, targetBookId);
                        }
                      }}
                    />
                  )}

                  {/* Scholarly Sources & Classical Citations (if available) */}
                  {currentLesson.references && currentLesson.references.length > 0 && (
                    <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider">
                        <BookMarked className="w-4 h-4 text-emerald-400" />
                        <span>Scholarly Sources & Classical Exegesis References</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-400">
                        {currentLesson.references.map((ref, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span className="leading-relaxed">{ref}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Notes */}
                  <LessonNotes
                    bookId={targetBookId}
                    chapterId={currentLesson.id}
                    smallLessonId="main"
                  />

                  {/* Action Buttons: Mark as Complete & Next */}
                  <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={handleMarkComplete}
                      disabled={savingProgress}
                      className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                        isChapterFullyDone
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/80 hover:bg-emerald-900/60'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-glow'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isChapterFullyDone ? 'Completed ✓ Mark Again' : 'Mark as Complete & Continue'}</span>
                    </button>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      {prevLesson && (
                        <Link
                          to={`/reader/${targetBookId}/${prevLesson.id}`}
                          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1 border border-slate-800"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Previous</span>
                        </Link>
                      )}
                      {nextLesson && (
                        <Link
                          to={`/reader/${targetBookId}/${nextLesson.id}`}
                          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 text-xs font-semibold flex items-center gap-1 border border-slate-800"
                        >
                          <span>Next</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </>
              )}
            </>
          )}

        </main>

      </div>

      {/* Embedded Socratic AI Tutor Drawer */}
      <AiTutorDrawer
        isOpen={aiTutorOpen}
        onClose={() => setAiTutorOpen(false)}
        currentLesson={currentLesson}
      />

    </div>
  );
}

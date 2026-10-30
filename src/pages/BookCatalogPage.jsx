import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { coursesData, practiceProjectsData } from '../data/coursesData';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Award, 
  Layers, 
  Code2, 
  ChevronRight,
  ChevronDown,
  TrendingUp,
  Globe,
  Briefcase,
  BookMarked,
  Compass,
  FolderGit2,
  Terminal,
  Search,
  X,
  Shield,
  GraduationCap,
  Check,
  Star
} from 'lucide-react';

/**
 * Category Configuration & Metadata
 * Strictly preserves all canonical categories:
 * - Technology & Web Development
 * - Data & Analytics
 * - Islamic Studies
 * - International Languages
 * - Business & Entrepreneurship
 * - Career Skills
 * - Practice Arena (Projects)
 */
export const CATEGORIES = [
  { id: 'All', label: 'All Courses' },
  { id: 'Technology', label: 'Technology' },
  { id: 'Data & Analytics', label: 'Data & Analytics' },
  { id: 'Islamic Studies', label: 'Islamic Studies' },
  { id: 'International Languages', label: 'International Languages' },
  { id: 'Business', label: 'Business' },
  { id: 'Career Skills', label: 'Career Skills' },
  { id: 'Projects', label: 'Practice Arena' }
];

// Discipline-specific Icon resolver
function getCategoryIcon(catId) {
  switch (catId) {
    case 'Technology':
    case 'Professional Development Pathways':
      return Code2;
    case 'Data & Analytics':
      return TrendingUp;
    case 'Cybersecurity':
      return Shield;
    case 'Islamic Studies':
      return BookMarked;
    case 'International Languages':
      return Globe;
    case 'Business':
    case 'Business & Entrepreneurship':
      return Briefcase;
    case 'Career Skills':
      return Compass;
    case 'Projects':
      return FolderGit2;
    default:
      return Layers;
  }
}

// Dedicated Live Curriculum Tracks Metadata
const LIVE_TRACKS = [
  {
    id: 'international-languages',
    courseId: 'arabic-language-learning',
    trackUrl: '/tracks/international-languages',
    title: 'International Languages',
    fullTitle: 'International Languages Track',
    subtitle: 'Learn World Languages Through Structured Digital Modules',
    category: 'International Languages',
    categoryAliases: ['International Languages', 'Languages & Arabic', 'Languages'],
    level: 'Beginner to Advanced',
    estimatedHours: '40 – 60 Hours (Self-Paced)',
    statusBadge: 'Multi-Language Pathway',
    description: 'Develop practical language fluency through structured courses in reading, writing, pronunciation, vocabulary, grammar, listening, and real-world conversation across world languages.',
    syllabus: [
      { id: 'lang-track-1', courseId: 'arabic-language-learning', number: '01', title: 'Arabic Language Learning', desc: 'Alphabet, phonetics, root vocabulary, applied grammar, conversation, and classical reading.' },
      { id: 'lang-track-2', courseId: 'english-language-learning', number: '02', title: 'English Language Learning', desc: 'Phonetics, core vocabulary, social greetings, sentence mechanics, listening comprehension, and fluency.' },
      { id: 'lang-track-3', courseId: 'french-language-learning', number: '03', title: 'French Language Learning', desc: 'Pronunciation, essential vocabulary, greetings, grammar foundations, listening skills, and conversation.' },
      { id: 'lang-track-4', courseId: 'swahili-language-learning', number: '04', title: 'Swahili Language Learning', desc: 'Kiswahili phonetics, vocabulary, greetings, noun classes, sentence structure, and marketplace conversation.' },
      { id: 'lang-track-5', courseId: 'japanese-language-learning', number: '05', title: 'Japanese Language Learning', desc: 'Writing systems (Hiragana, Katakana, Kanji), pronunciation, greetings, numbers, particles, and daily dialogues.' },
      { id: 'lang-track-6', courseId: 'somali-language-learning', number: '06', title: 'Somali Language Learning', desc: 'Latin script (1972), unique pharyngeal sounds (X, C) & DH, vowel lengths, greetings, family, numbers, verbs, and market dialogues.' }
    ],
    features: ['Multi-Language Curriculum', 'Grammar & Vocabulary Drills', 'Reading & Conversational Practice', 'Verified Certificate of Completion'],
    actionLabel: 'Explore Language Track'
  }
];

/**
 * Thematic Course Card Header Illustrations
 * Crisp SVG illustrations tailored to each educational discipline.
 * Palette: Forest Green #173F38, Warm Ivory #F1E8D8, Soft Gold #D4A94F, White #FFFFFF.
 */
function CourseCardIllustration({ course }) {
  const cat = String(course.category || '').toLowerCase();
  const id = String(course.id || '').toLowerCase();

  // 1. Full-Stack / Frontend / Backend / Web Technology
  if (cat.includes('professional') || cat.includes('technol') || id.includes('fullstack') || id.includes('frontend') || id.includes('backend')) {
    return (
      <div className="relative w-full h-36 bg-gradient-to-br from-[#173F38] via-[#0E2C27] to-[#123630] overflow-hidden flex items-center justify-center p-4">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4A94F_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Code Window Illustration */}
        <div className="relative z-10 w-full max-w-[240px] rounded-xl bg-black/40 border border-[#D4A94F]/30 p-3 shadow-lg backdrop-blur-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="text-[10px] font-mono text-[#D4A94F] font-bold">
              {id.includes('backend') ? 'server.js' : id.includes('fullstack') ? 'app.tsx' : 'index.html'}
            </span>
          </div>
          <div className="font-mono text-[11px] text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[#D4A94F]">const</span>
              <span className="text-emerald-300">app</span>
              <span>=</span>
              <span className="text-cyan-300">buildFuture()</span>;
            </div>
            <div className="text-slate-400 pl-3 text-[10px]">
              // Verified Web Competency
            </div>
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#D4A94F]/20 rounded-full blur-xl pointer-events-none" />
      </div>
    );
  }

  // 2. Data & Analytics / SQL / Power BI / Spreadsheets
  if (cat.includes('data') || id.includes('sql') || id.includes('power-bi') || id.includes('python')) {
    return (
      <div className="relative w-full h-36 bg-gradient-to-br from-[#123630] via-[#173F38] to-[#1F4E46] overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#D4A94F_1px,transparent_1px),linear-gradient(to_bottom,#D4A94F_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* Analytics & Metrics Visual */}
        <div className="relative z-10 w-full max-w-[240px] rounded-xl bg-black/40 border border-[#D4A94F]/30 p-3 shadow-lg">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#D4A94F] mb-2 border-b border-white/10 pb-1.5">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-[#D4A94F]" />
              <span>COMMERCIAL ANALYTICS</span>
            </span>
            <span className="text-emerald-300 font-bold">+28.4%</span>
          </div>
          {/* Mini Bar Chart Mockup */}
          <div className="flex items-end gap-2 h-10 pt-2 px-1 justify-between">
            <div className="w-4 bg-white/30 rounded-t h-4" />
            <div className="w-4 bg-white/40 rounded-t h-6" />
            <div className="w-4 bg-[#D4A94F]/70 rounded-t h-7" />
            <div className="w-4 bg-[#D4A94F] rounded-t h-9 shadow-glow" />
            <div className="w-4 bg-emerald-400 rounded-t h-10 shadow-glow" />
          </div>
        </div>

        <div className="absolute -top-6 -left-6 w-24 h-24 bg-emerald-400/15 rounded-full blur-xl pointer-events-none" />
      </div>
    );
  }

  // 3. Islamic Studies (Qur'an, Tajweed, Hadith, Tafsir, Salah, Aqeedah, Duas)
  if (cat.includes('islamic')) {
    return (
      <div className="relative w-full h-36 bg-gradient-to-br from-[#173F38] via-[#0E2C27] to-[#19453E] overflow-hidden flex items-center justify-center p-4">
        {/* Subtle Islamic Geometric Radial Motif */}
        <div className="absolute inset-0 opacity-15 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-36 h-36 text-[#D4A94F]" fill="currentColor">
            <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" opacity="0.3" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Classical Calligraphic / Book Stand Visual */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-1.5 text-center">
          <div className="w-12 h-12 rounded-2xl bg-black/40 border border-[#D4A94F]/50 flex items-center justify-center text-[#D4A94F] shadow-lg">
            <BookMarked className="w-6 h-6 text-[#D4A94F]" />
          </div>
          <span className="text-[11px] font-serif font-bold text-[#F1E8D8] tracking-widest uppercase">
            Qur'anic &amp; Classical Sciences
          </span>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#D4A94F]/20 text-[#D4A94F] border border-[#D4A94F]/40">
            100% Free • Open Access
          </span>
        </div>

        <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-[#D4A94F]/20 rounded-full blur-xl pointer-events-none" />
      </div>
    );
  }

  // 4. International Languages (Arabic, English, French, Swahili, Japanese, Somali)
  if (cat.includes('language') || id.includes('language')) {
    return (
      <div className="relative w-full h-36 bg-gradient-to-br from-[#173F38] via-[#1C4B43] to-[#123630] overflow-hidden flex items-center justify-center p-4">
        {/* Multilingual Glyph Field */}
        <div className="absolute inset-0 flex items-center justify-between px-6 opacity-20 text-xl font-bold text-[#D4A94F] select-none pointer-events-none">
          <span>ض</span>
          <span>Aa</span>
          <span>あ</span>
          <span>Bonjour</span>
          <span>Habari</span>
        </div>

        <div className="relative z-10 flex items-center gap-3 bg-black/35 border border-[#D4A94F]/40 px-4 py-2.5 rounded-2xl shadow-lg backdrop-blur-xs">
          <div className="w-10 h-10 rounded-xl bg-[#D4A94F]/20 flex items-center justify-center text-[#D4A94F] font-bold">
            <Globe className="w-5 h-5 text-[#D4A94F]" />
          </div>
          <div className="text-left">
            <span className="text-xs font-bold text-white block">Applied Language Pathway</span>
            <span className="text-[10px] text-[#F1E8D8] opacity-80 block">Reading • Grammar • Fluency</span>
          </div>
        </div>

        <div className="absolute -top-6 -right-6 w-24 h-24 bg-cyan-400/15 rounded-full blur-xl pointer-events-none" />
      </div>
    );
  }

  // 5. Business & Entrepreneurship
  if (cat.includes('business')) {
    return (
      <div className="relative w-full h-36 bg-gradient-to-br from-[#173F38] via-[#1B4840] to-[#10332D] overflow-hidden flex items-center justify-center p-4">
        <div className="relative z-10 flex items-center gap-3 bg-black/35 border border-[#D4A94F]/40 px-4 py-2.5 rounded-2xl shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-[#D4A94F]/20 flex items-center justify-center text-[#D4A94F]">
            <Briefcase className="w-5 h-5 text-[#D4A94F]" />
          </div>
          <div className="text-left">
            <span className="text-xs font-bold text-white block">Commercial Growth &amp; Strategy</span>
            <span className="text-[10px] text-[#F1E8D8] opacity-80 block">Enterprise &amp; Digital Commerce</span>
          </div>
        </div>
      </div>
    );
  }

  // 6. Career Skills / Cybersecurity / General Fallback
  return (
    <div className="relative w-full h-36 bg-gradient-to-br from-[#173F38] via-[#0E2C27] to-[#123630] overflow-hidden flex items-center justify-center p-4">
      <div className="relative z-10 flex items-center gap-3 bg-black/35 border border-[#D4A94F]/40 px-4 py-2.5 rounded-2xl shadow-lg">
        <div className="w-10 h-10 rounded-xl bg-[#D4A94F]/20 flex items-center justify-center text-[#D4A94F]">
          <Compass className="w-5 h-5 text-[#D4A94F]" />
        </div>
        <div className="text-left">
          <span className="text-xs font-bold text-white block">Career Readiness &amp; Mastery</span>
          <span className="text-[10px] text-[#F1E8D8] opacity-80 block">Practical Professional Skills</span>
        </div>
      </div>
    </div>
  );
}

// Normalizes URL parameter or slug to standard category names
export function normalizeCategory(param) {
  if (!param) return 'All';
  const decoded = decodeURIComponent(param).trim();
  const lower = decoded.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (lower === 'all' || lower === '') return 'All';
  if (lower.includes('project') || lower.includes('arena') || lower.includes('practice')) return 'Projects';
  if (lower.includes('foundation') || lower.includes('html') || lower.includes('css') || lower.includes('javascript') || lower.includes('pathway') || lower.includes('fullstack') || lower.includes('frontend') || lower.includes('backend') || lower.includes('bundle') || lower.includes('web') || lower.includes('tech') || lower.includes('code')) {
    return 'Technology';
  }
  if (lower.includes('data') || lower.includes('powerbi') || lower.includes('sql') || lower.includes('analytics') || lower.includes('bi')) {
    return 'Data & Analytics';
  }
  if (lower.includes('cyber') || lower.includes('security')) {
    return 'Technology';
  }
  if (lower.includes('international') || lower.includes('arabic') || lower.includes('language') || lower.includes('swahili') || lower.includes('french') || lower.includes('english') || lower.includes('japanese') || lower.includes('somali')) {
    return 'International Languages';
  }
  if (lower.includes('career') || lower.includes('skill') || lower.includes('job') || lower.includes('comm')) {
    return 'Career Skills';
  }
  if (lower.includes('islamic') || lower.includes('quran') || lower.includes('tajweed') || lower.includes('hadith') || lower.includes('tafsir') || lower.includes('salah') || lower.includes('aqeedah')) {
    return 'Islamic Studies';
  }
  if (lower.includes('business') || lower.includes('entrepreneur') || lower.includes('marketing') || lower.includes('freelanc')) {
    return 'Business';
  }
  return 'All';
}

// Category Matcher: accurately handles both umbrella categories and specialized categories
function matchesCategory(course, selectedCategory) {
  if (!selectedCategory || selectedCategory === 'All') return true;
  if (selectedCategory === 'Projects') return false; // Handled in dedicated projects block

  const cat = String(course.category || '').toLowerCase().trim();
  const sel = selectedCategory.toLowerCase().trim();

  if (cat === sel) return true;

  // Technology encompasses Professional Pathways, Web Dev, Cybersecurity
  if (sel === 'technology' || sel === 'professional development pathways' || sel === 'web development foundations') {
    return cat === 'technology' || 
           cat === 'professional development pathways' || 
           cat === 'cybersecurity' ||
           ['fullstack-developer-bundle', 'frontend-developer-zero-to-job-ready', 'backend-developer-zero-to-job-ready', 'cybersecurity-fundamentals'].includes(course.id);
  }
  // Data & Analytics
  if (sel === 'data & analytics') {
    return cat === 'data & analytics' || (cat === 'technology' && (course.id.includes('data') || course.id.includes('power-bi') || course.id.includes('sql') || course.id.includes('python')));
  }
  // Languages
  if (sel === 'international languages') {
    return cat === 'international languages' || cat === 'languages & arabic' || cat === 'languages';
  }
  // Islamic Studies
  if (sel === 'islamic studies') {
    return cat === 'islamic studies';
  }
  // Business
  if (sel === 'business' || sel === 'business & entrepreneurship') {
    return cat === 'business & entrepreneurship' || cat === 'business';
  }
  // Career Skills
  if (sel === 'career skills') {
    return cat === 'career skills';
  }

  return false;
}

// Search Matcher for courses
function matchesSearch(course, query) {
  if (!query || !query.trim()) return true;
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);

  const haystack = [
    course.title,
    course.subtitle,
    course.description,
    course.category,
    course.subCategory,
    course.level,
    course.author,
    course.instructor,
    Array.isArray(course.keywords) ? course.keywords.join(' ') : '',
    Array.isArray(course.tags) ? course.tags.join(' ') : ''
  ].join(' ').toLowerCase();

  return terms.every(term => haystack.includes(term));
}

// Project category matcher
function matchesProjectCategory(selectedCategory) {
  return selectedCategory === 'All' || selectedCategory === 'Projects' || selectedCategory === 'Technology';
}

// Project search matcher
function matchesProjectSearch(project, query) {
  if (!query || !query.trim()) return true;
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);

  const haystack = [
    project.title,
    project.description,
    project.category,
    project.difficulty,
    Array.isArray(project.skillsLearned) ? project.skillsLearned.join(' ') : '',
    Array.isArray(project.techStack) ? project.techStack.join(' ') : ''
  ].join(' ').toLowerCase();

  return terms.every(term => haystack.includes(term));
}

export default function BookCatalogPage() {
  const { user, isEnrolledIn } = useAuth();
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [courses, setCourses] = useState(() => Array.from(new Map(coursesData.map(c => [c.id, c])).values()));
  const [projects, setProjects] = useState(() => practiceProjectsData);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const controlsRef = useRef(null);
  const isUserClickRef = useRef(false);

  // Smoothly scroll the target category section near the top, with proper spacing below the navigation header
  const scrollToCategorySection = useCallback((catId, immediate = false) => {
    const doScroll = () => {
      let targetEl = null;
      if (catId === 'International Languages') {
        targetEl = document.getElementById('international-languages-section') || document.getElementById('courses-grid-section');
      } else if (catId === 'Projects') {
        targetEl = document.getElementById('practice-arena-section') || document.getElementById('practice-projects-section');
      } else {
        targetEl = document.getElementById('courses-grid-section') || document.getElementById('catalog-content');
      }

      const controlsBar = controlsRef.current || document.querySelector('[data-sticky-controls="true"]');
      if (!controlsBar) return;

      const navHeight = 80; // Standard fixed navbar height (h-20)
      const controlsHeight = controlsBar.getBoundingClientRect().height;
      const totalHeaderOffset = navHeight + controlsHeight + 16; // 16px clean breathing buffer

      let targetScrollY;
      if (targetEl) {
        const elRect = targetEl.getBoundingClientRect();
        targetScrollY = window.scrollY + elRect.top - totalHeaderOffset;
      } else {
        targetScrollY = controlsBar.offsetTop - navHeight;
      }

      window.scrollTo({
        top: Math.max(0, Math.round(targetScrollY)),
        behavior: immediate ? 'auto' : 'smooth'
      });
    };

    if (immediate) {
      doScroll();
    } else {
      setTimeout(doScroll, 40);
    }
  }, []);

  // Synchronize category & search query with URL parameter
  useEffect(() => {
    const rawCategory = categorySlug || searchParams.get('category');
    if (rawCategory) {
      const normalized = normalizeCategory(rawCategory);
      setSelectedCategory(normalized);
      // If arriving from an external category link (not an in-page pill click),
      // scroll cleanly to the selected category section
      if (!isUserClickRef.current && normalized !== 'All') {
        scrollToCategorySection(normalized);
      }
    } else if (categorySlug === undefined && !searchParams.get('category')) {
      setSelectedCategory('All');
    }

    isUserClickRef.current = false;

    const rawQ = searchParams.get('q');
    if (rawQ !== null) {
      setSearchQuery(rawQ);
    }
  }, [categorySlug, searchParams, scrollToCategorySection]);

  // Synchronize filter updates with URL parameters
  const updateUrlParams = (newCategory, newQuery) => {
    const updated = new URLSearchParams(searchParams);

    if (newCategory && newCategory !== 'All') {
      updated.set('category', newCategory);
    } else {
      updated.delete('category');
    }

    updated.delete('level');

    if (newQuery && newQuery.trim()) {
      updated.set('q', newQuery.trim());
    } else {
      updated.delete('q');
    }

    setSearchParams(updated, { replace: true });
  };

  const handleSelectCategory = (catId) => {
    isUserClickRef.current = true;
    setSelectedCategory(catId);
    updateUrlParams(catId, searchQuery);
    scrollToCategorySection(catId);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    updateUrlParams(selectedCategory, query);
  };

  const handleResetAllFilters = () => {
    isUserClickRef.current = true;
    setSelectedCategory('All');
    setSearchQuery('');
    setSearchParams({}, { replace: true });
    scrollToCategorySection('All');
  };

  // Fetch catalog & projects data from backend (background hydration)
  useEffect(() => {
    async function loadCatalog() {
      try {
        const data = await api.books.getAll();
        const loadedCourses = (data && (data.courses || data.books)) || [];
        if (loadedCourses.length > 0) {
          const uniqueCourses = Array.from(new Map(loadedCourses.map(c => [c.id, c])).values());
          setCourses(uniqueCourses);
        }
        if (data && data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
          const uniqueProjects = Array.from(new Map(data.projects.map(p => [p.id, p])).values());
          setProjects(uniqueProjects);
        }
      } catch (err) {
        console.error('Failed to refresh catalog data:', err);
      }
    }

    loadCatalog();
  }, []);

  // Filter Courses by Category and Search Query
  const filteredCourses = useMemo(() => {
    const matched = courses.filter((course) => {
      if (course.hideFromCatalog) return false;
      return matchesCategory(course, selectedCategory) &&
             matchesSearch(course, searchQuery);
    });
    return Array.from(new Map(matched.map(c => [c.id, c])).values());
  }, [courses, selectedCategory, searchQuery]);

  const availableCourses = filteredCourses.filter(c => !c.isComingSoon && c.status !== 'coming_soon');
  const comingSoonCourses = filteredCourses.filter(c => c.isComingSoon || c.status === 'coming_soon');

  // Filter Live Tracks by Category
  const filteredLiveTracks = LIVE_TRACKS.filter((track) => {
    if (selectedCategory === 'All' || selectedCategory === 'International Languages') {
      if (searchQuery && !matchesSearch({ title: track.fullTitle, subtitle: track.subtitle, description: track.description, category: track.category }, searchQuery)) {
        return false;
      }
      return true;
    }
    return false;
  });

  // Filter Practice Projects by Category and Search Query
  const filteredProjects = projects.filter((project) => {
    return matchesProjectCategory(selectedCategory) &&
           matchesProjectSearch(project, searchQuery);
  });

  const shouldShowProjects = selectedCategory === 'Projects' || 
    (selectedCategory === 'All' && !searchQuery) || 
    (selectedCategory === 'Technology' && !searchQuery) || 
    (searchQuery && filteredProjects.length > 0);

  const totalResultsCount = availableCourses.length + comingSoonCourses.length + (shouldShowProjects ? filteredProjects.length : 0);
  const hasAnyResults = totalResultsCount > 0 || filteredLiveTracks.length > 0;

  // Category counts calculation
  const getCategoryCount = (catId) => {
    const visibleCourses = courses.filter(c => !c.hideFromCatalog);
    if (catId === 'All') return new Set(visibleCourses.map(c => c.id)).size + (projects ? projects.length : 0);
    if (catId === 'Projects') return projects ? projects.length : 0;
    const matchingCourses = visibleCourses.filter(c => matchesCategory(c, catId));
    return new Set(matchingCourses.map(c => c.id)).size;
  };

  return (
    <div className="min-h-screen bg-[#F1E8D8] text-slate-800 selection:bg-[#D4A94F] selection:text-[#173F38]">
      
      {/* =========================================================================
          1. HERO SECTION (Deep Forest Green #173F38 with Gold Accents)
         ========================================================================= */}
      <section className="relative bg-[#173F38] text-white overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20 border-b border-[#0F2D28] shadow-md">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4A94F]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#0E2925] rounded-full blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-[#E2D9C8] mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-[#D4A94F] font-semibold">Course Catalog</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A94F]/15 border border-[#D4A94F]/30 text-[#D4A94F] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FAHMRISE ACADEMIC CURRICULUM</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Explore Courses &amp; Professional Pathways
            </h1>

            <p className="text-base sm:text-lg text-[#F1E8D8] opacity-90 leading-relaxed font-normal">
              Self-paced, hands-on curriculums designed for practical excellence. Explore modern web engineering, commercial data analytics, classical Islamic sciences, and world languages.
            </p>
          </div>

          {/* Value Highlights Row */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#E2D9C8]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4A94F]" />
              <strong className="text-white">26</strong> Curated Courses
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <strong className="text-white">10</strong> Interactive Sandboxes
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4A94F]" />
              <strong className="text-white">Verified</strong> Cryptographic Credentials
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <strong className="text-white">24/7</strong> Socratic AI Mentorship
            </span>
          </div>

        </div>
      </section>


      {/* =========================================================================
          2. CONTROLS BAR: SEARCH & CATEGORY PILLS (Sticky Navigation)
         ========================================================================= */}
      <section
        ref={controlsRef}
        data-sticky-controls="true"
        className="sticky top-20 z-30 bg-[#F1E8D8]/95 backdrop-blur-md border-b border-[#E2D9C8] shadow-xs"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3.5">
          
          {/* Top Row: Search Input + Active Results Summary */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input Box */}
            <div className="relative w-full sm:max-w-xl">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by course title, topic, or keyword (e.g. React, SQL, Tajweed, Arabic)..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-white border border-[#E2D9C8] rounded-2xl text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#173F38] focus:ring-2 focus:ring-[#173F38]/10 shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  aria-label="Clear search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Result Indicator Badge */}
            <div className="text-xs text-slate-600 font-medium self-start sm:self-auto flex items-center gap-2">
              <span>Showing <strong className="text-[#173F38]">{totalResultsCount}</strong> {totalResultsCount === 1 ? 'educational resource' : 'educational resources'}</span>
              {searchQuery && (
                <button
                  onClick={handleResetAllFilters}
                  className="text-xs text-[#173F38] font-bold underline hover:text-[#D4A94F] transition-colors ml-1"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row: Category Filter Navigation Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const Icon = getCategoryIcon(cat.id);
              const count = getCategoryCount(cat.id);

              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 shrink-0 cursor-pointer border
                    ${isSelected 
                      ? 'bg-[#173F38] text-[#D4A94F] border-[#173F38] shadow-sm' 
                      : 'bg-white text-slate-700 hover:bg-[#FAF7F2] hover:text-[#173F38] border-[#E2D9C8]'}`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D4A94F]' : 'text-slate-500'}`} />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-white/15 text-[#D4A94F]' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          3. MAIN CATALOG BODY (Courses Grid & Dedicated Tracks)
         ========================================================================= */}
      <main id="catalog-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        
        {loading ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-500">
            <div className="w-9 h-9 border-3 border-[#173F38] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold text-[#173F38]">Loading FAHMRISE curriculum...</p>
          </div>
        ) : !hasAnyResults ? (
          /* Empty Search & Filter State */
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E2D9C8] p-8 max-w-xl mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#173F38]/10 text-[#173F38] flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8 text-[#173F38]" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-serif font-bold text-[#173F38]">No courses found</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                We couldn't find any courses or projects in <strong>"{selectedCategory}"</strong>
                {searchQuery ? ` matching "${searchQuery}"` : ''}.
              </p>
            </div>
            <button
              onClick={handleResetAllFilters}
              className="px-6 py-2.5 rounded-xl bg-[#173F38] hover:bg-[#1E5047] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* 1. International Languages Spotlight Track (Visible on 'All' or 'International Languages') */}
            {filteredLiveTracks.length > 0 && (
              <section
                id="international-languages-section"
                className="bg-white rounded-3xl border-2 border-[#173F38]/20 p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden scroll-mt-48"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173F38]/10 border border-[#173F38]/20 text-[#173F38] text-xs font-bold uppercase tracking-wider">
                      <Globe className="w-3.5 h-3.5 text-[#173F38]" />
                      <span>Specialized Multilingual Track</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#173F38]">
                      International Languages: Arabic, French, Swahili &amp; More
                    </h2>

                    <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                      Master world languages through structured phonetics, root vocabulary, conversational dialogues, and real-time grammar drills. Includes Arabic, English, French, Swahili, Japanese, and Somali.
                    </p>

                    {/* Supported World Languages Tags */}
                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        Supported Languages:
                      </span>
                      <div className="flex flex-wrap items-center gap-2" aria-label="Supported International Languages">
                        {[
                          { name: 'Arabic', id: 'arabic-language-learning' },
                          { name: 'English', id: 'english-language-learning' },
                          { name: 'French', id: 'french-language-learning' },
                          { name: 'Swahili', id: 'swahili-language-learning' },
                          { name: 'Japanese', id: 'japanese-language-learning' },
                          { name: 'Somali', id: 'somali-language-learning' }
                        ].map(({ name, id }) => (
                          <Link
                            key={name}
                            to={`/courses/${id}`}
                            data-testid={`language-tag-${name.toLowerCase()}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F1E8D8] text-slate-800 hover:text-[#173F38] text-xs font-semibold border border-[#E2D9C8] hover:border-[#173F38]/40 shadow-2xs transition-all group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A94F] group-hover:scale-125 transition-transform" />
                            <span>{name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end gap-4 bg-[#FAF7F2] p-6 rounded-2xl border border-[#E2D9C8]">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pathway Tuition</span>
                      <span className="text-xl font-serif font-bold text-[#173F38]">KSh 5,000</span>
                      <span className="text-xs text-slate-500 block">per individual language track</span>
                    </div>

                    <Link
                      to="/tracks/international-languages"
                      className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#173F38] hover:bg-[#1E5047] text-white font-bold text-xs shadow-md transition-all"
                    >
                      <span>Explore Languages Track</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D4A94F]" />
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* 2. Practice Arena Spotlight (When 'Projects' is selected) */}
            {selectedCategory === 'Projects' && (
              <section
                id="practice-arena-section"
                className="bg-white rounded-3xl border-2 border-[#173F38]/20 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 scroll-mt-48"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173F38]/10 text-[#173F38] text-xs font-bold uppercase tracking-wider">
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>In-Browser Hands-On Coding</span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-[#173F38]">
                    Practice Arena: 10 Progressive JavaScript Projects
                  </h2>
                  <p className="text-sm text-slate-600 max-w-2xl">
                    Write real HTML, CSS, and JavaScript with live browser preview, automated grading assertion suites, and 24/7 AI tutor guidance.
                  </p>
                </div>

                <Link
                  to="/practice"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#173F38] hover:bg-[#1E5047] text-white font-bold text-xs shadow-md transition-all flex-shrink-0"
                >
                  <Code2 className="w-4 h-4 text-[#D4A94F]" />
                  <span>Launch Practice Arena</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </section>
            )}

            {/* 3. Available Courses Grid */}
            {availableCourses.length > 0 && (
              <section id="courses-grid-section" className="space-y-6 scroll-mt-48">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2D9C8] pb-4">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#173F38]">
                      {selectedCategory === 'All' ? 'All Academic Courses' : `${selectedCategory} Courses`}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      Structured digital curriculums with hands-on exercises, quizzes, and verified certificates.
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-slate-700 border border-[#E2D9C8] self-start sm:self-auto">
                    {availableCourses.length} {availableCourses.length === 1 ? 'Course Available' : 'Courses Available'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {availableCourses.map((course) => {
                    const enrolled = isEnrolledIn(course.id);
                    const isFree = course.isFree || course.price === 0;

                    return (
                      <article
                        key={course.id}
                        data-course-id={course.id}
                        className="group flex flex-col justify-between bg-white rounded-3xl border border-[#E2D9C8] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D4A94F] transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div>
                          {/* Thematic Illustration Header */}
                          <div className="relative">
                            <CourseCardIllustration course={course} />

                            {/* Overlay Badges */}
                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 truncate max-w-[150px]">
                                {course.category}
                              </span>

                              {enrolled ? (
                                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-600 text-white border border-emerald-400 shadow-sm flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 text-white" />
                                  <span>Enrolled</span>
                                </span>
                              ) : isFree ? (
                                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#173F38] text-[#D4A94F] border border-[#D4A94F]/40 shadow-sm">
                                  100% Free
                                </span>
                              ) : (
                                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#FAF7F2] text-[#173F38] border border-[#E2D9C8] shadow-sm">
                                  {course.level || 'All Levels'}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Card Content Area */}
                          <div className="p-6 space-y-3">
                            {/* Course Title */}
                            <h3 className="text-xl font-serif font-bold text-[#173F38] group-hover:text-[#0E2C27] transition-colors leading-snug">
                              <Link to={enrolled ? `/reader/${course.id}` : `/courses/${course.id}`}>
                                {course.title}
                              </Link>
                            </h3>

                            {/* Subtitle / Description */}
                            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                              {course.subtitle || course.description}
                            </p>

                            {/* Metadata Specs Row */}
                            <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#F1E8D8] text-[11px] text-slate-500">
                              <div className="flex items-center gap-1.5 truncate">
                                <BookOpen className="w-3.5 h-3.5 text-[#173F38] flex-shrink-0" />
                                <span className="truncate">{course.totalLessons || (course.lessonsSummary?.length) || 10} Lessons</span>
                              </div>
                              <div className="flex items-center gap-1.5 truncate">
                                <Clock className="w-3.5 h-3.5 text-[#173F38] flex-shrink-0" />
                                <span className="truncate">{course.estimatedHours || '20 Hours'}</span>
                              </div>
                              <div className="flex items-center gap-1.5 truncate">
                                <Sparkles className="w-3.5 h-3.5 text-[#D4A94F] flex-shrink-0" />
                                <span className="truncate">{course.level || 'All Levels'}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card Action Footer */}
                        <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3">
                          {/* Price Display */}
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              {course.paymentType === 'one_time' || course.id === 'frontend-developer-zero-to-job-ready'
                                ? 'One-Time Tuition'
                                : 'Tuition'}
                            </span>
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                              <span data-testid="course-price" className={`text-lg sm:text-xl font-serif font-bold ${isFree ? 'text-emerald-700' : 'text-[#173F38]'}`}>
                                {isFree ? 'Free' : course.price > 0 ? `${course.currency || 'KSh'} ${course.price.toLocaleString()}` : (course.priceDisplay || 'Free')}
                              </span>
                              {!isFree && course.priceUSD && (
                                <span className="text-[10px] text-slate-400">
                                  (~${course.priceUSD})
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {enrolled ? (
                              <Link
                                to={`/reader/${course.id}`}
                                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition-all"
                              >
                                <span>Continue</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            ) : (
                              <Link
                                to={`/courses/${course.id}`}
                                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#173F38] hover:bg-[#0E2C27] text-white text-xs font-bold shadow-sm transition-all group-hover:border group-hover:border-[#D4A94F]"
                              >
                                <span>View Course</span>
                                <ChevronRight className="w-3.5 h-3.5 text-[#D4A94F]" />
                              </Link>
                            )}
                          </div>
                        </div>

                      </article>
                    );
                  })}
                </div>
              </section>
            )}

            {/* 4. Upcoming Courses Section */}
            {comingSoonCourses.length > 0 && (
              <section id="upcoming-courses-section" className="space-y-6 pt-6 border-t border-[#E2D9C8] scroll-mt-48">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#173F38]">
                      Upcoming Curriculum Releases
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      New specialized courses currently in pedagogical development.
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20 self-start sm:self-auto">
                    Planned for Upcoming Release
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {comingSoonCourses.map((course) => (
                    <article
                      key={course.id}
                      className="group flex flex-col justify-between bg-white rounded-3xl border border-[#E2D9C8] overflow-hidden shadow-xs hover:border-[#D4A94F] transition-all"
                    >
                      <div>
                        <div className="relative">
                          <CourseCardIllustration course={course} />
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20">
                              {course.category}
                            </span>
                            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-500/90 text-white shadow-sm">
                              Coming Soon
                            </span>
                          </div>
                        </div>

                        <div className="p-6 space-y-3">
                          <h3 className="text-xl font-serif font-bold text-[#173F38]">
                            {course.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                            {course.subtitle || course.description}
                          </p>
                        </div>
                      </div>

                      <div className="p-6 pt-0 flex items-center justify-between gap-2 border-t border-[#F1E8D8] mt-2">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tuition</span>
                          <span className="text-sm font-serif font-bold text-slate-700">Price to be announced</span>
                        </div>
                        <Link
                          to={`/courses/${course.id}`}
                          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#173F38] text-xs font-bold transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* 5. Practice Arena Projects (10 JavaScript Projects) */}
            {shouldShowProjects && filteredProjects.length > 0 && (
              <section id="practice-projects-section" className="space-y-6 pt-6 border-t border-[#E2D9C8] scroll-mt-48">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="w-5 h-5 text-[#173F38]" />
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#173F38]">
                        {selectedCategory === 'Projects' ? 'All Practice Arena Projects' : 'Interactive Hands-On Coding Projects'}
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      Build, test, and run real web applications inside the browser Practice Arena.
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-slate-700 border border-[#E2D9C8] self-start sm:self-auto">
                    {filteredProjects.length} Coding Projects
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((proj) => {
                    const skills = proj.skillsLearned || proj.techStack || ['HTML5', 'CSS3', 'JavaScript', 'DOM API'];
                    const num = proj.id.replace('project-', '');

                    return (
                      <article
                        key={proj.id}
                        className="flex flex-col justify-between bg-white rounded-3xl border border-[#E2D9C8] p-6 shadow-xs hover:shadow-xl hover:border-[#D4A94F] transition-all space-y-4 group"
                      >
                        <div className="space-y-3">
                          {/* Header / Badges */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-mono font-bold text-[#173F38] bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#E2D9C8]">
                              Project #{num}
                            </span>
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                              proj.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                              proj.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                              'bg-purple-50 text-purple-800 border border-purple-200'
                            }`}>
                              {proj.difficulty}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-serif font-bold text-[#173F38] group-hover:text-[#0E2C27] transition-colors">
                            {proj.title}
                          </h3>

                          {/* Description */}
                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                            {proj.description}
                          </p>

                          {/* Tech Stack Chips */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {skills.slice(0, 4).map((tech, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF7F2] text-slate-700 border border-[#E2D9C8]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Footer / CTA */}
                        <div className="pt-3 border-t border-[#F1E8D8] flex items-center justify-between gap-2">
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Terminal className="w-3.5 h-3.5 text-[#173F38]" />
                            <span>In-Browser Runner</span>
                          </span>

                          <Link
                            to={`/practice/${proj.id}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#173F38] hover:bg-[#0E2C27] text-white text-xs font-bold shadow-sm transition-all"
                          >
                            <Code2 className="w-3.5 h-3.5 text-[#D4A94F]" />
                            <span>Launch Project</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

          </div>
        )}

      </main>

    </div>
  );
}

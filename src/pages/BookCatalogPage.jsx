import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { coursesData, practiceProjectsData } from '../data/coursesData';
import { 
  BookOpen, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Star, 
  Layers, 
  Code2, 
  ChevronRight,
  ChevronDown,
  TrendingUp,
  Globe,
  Briefcase,
  BookMarked,
  Compass,
  Info,
  FolderGit2,
  Terminal,
  Search,
  X,
  Shield
} from 'lucide-react';

// Custom Crisp React Atom Icon
function ReactIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="currentColor">
      <circle cx="0" cy="0" r="2.05" />
      <g stroke="currentColor" strokeWidth="1.1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

// Category Configuration & Metadata
const CATEGORIES = [
  { id: 'All', label: 'All Categories' },
  { id: 'Professional Development Pathways', label: 'Professional Pathways' },
  { id: 'Data & Analytics', label: 'Data & Analytics' },
  { id: 'Cybersecurity', label: 'Cybersecurity' },
  { id: 'Islamic Studies', label: 'Islamic Studies' },
  { id: 'International Languages', label: 'International Languages' },
  { id: 'Business & Entrepreneurship', label: 'Business & Entrepreneurship' },
  { id: 'Career Skills', label: 'Career Skills' },
  { id: 'Projects', label: 'Practice Arena' }
];

// Category Icons Mapping
function getCategoryIcon(catId) {
  switch (catId) {
    case 'Professional Development Pathways': return Layers;
    case 'Web Development Foundations': return Layers;
    case 'Data & Analytics': return TrendingUp;
    case 'Cybersecurity': return Shield;
    case 'Islamic Studies': return BookMarked;
    case 'International Languages': return Globe;
    case 'Business & Entrepreneurship': return Briefcase;
    case 'Career Skills': return Sparkles;
    case 'Projects': return FolderGit2;
    case 'Technology': return Code2;
    case 'Business': return Briefcase;
    default: return Layers;
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
    subtitle: 'Learn Languages From Around the World',
    category: 'International Languages',
    categoryAliases: ['International Languages', 'Languages & Arabic', 'Languages'],
    level: 'Beginner to Advanced',
    estimatedHours: '40 – 60 Hours (Self-Paced)',
    statusBadge: 'Multi-Language Pathway',
    accentGradient: 'from-cyan-600 via-teal-700 to-slate-900',
    borderClass: 'border-cyan-500/30 hover:border-cyan-400/60',
    iconBg: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
    iconType: 'languages',
    description: 'Develop practical language skills through structured courses in reading, writing, pronunciation, vocabulary, grammar, listening, and conversation across world languages.',
    syllabus: [
      {
        id: 'lang-track-1',
        courseId: 'arabic-language-learning',
        number: '01',
        title: 'Arabic Language Learning',
        desc: 'Alphabet, phonetics, root vocabulary, applied grammar, conversation, and classical reading.'
      },
      {
        id: 'lang-track-2',
        courseId: 'english-language-learning',
        number: '02',
        title: 'English Language Learning',
        desc: 'Phonetics, core vocabulary, social greetings, sentence mechanics, listening comprehension, and fluency.'
      },
      {
        id: 'lang-track-3',
        courseId: 'french-language-learning',
        number: '03',
        title: 'French Language Learning',
        desc: 'Pronunciation, essential vocabulary, greetings, grammar foundations, listening skills, and conversation.'
      },
      {
        id: 'lang-track-4',
        courseId: 'swahili-language-learning',
        number: '04',
        title: 'Swahili Language Learning',
        desc: 'Kiswahili phonetics, vocabulary, greetings, noun classes, sentence structure, and marketplace conversation.'
      },
      {
        id: 'lang-track-5',
        courseId: 'japanese-language-learning',
        number: '05',
        title: 'Japanese Language Learning',
        desc: 'Writing systems (Hiragana, Katakana, Kanji), pronunciation, greetings, numbers, particles, and daily dialogues.'
      },
      {
        id: 'lang-track-6',
        courseId: 'somali-language-learning',
        number: '06',
        title: 'Somali Language Learning',
        desc: 'Latin script (1972), unique pharyngeal sounds (X, C) & DH, vowel lengths, greetings, family, numbers, verbs, and market dialogues.'
      }
    ],
    plannedRelease: 'Live & Upcoming Tracks',
    targetAudience: 'Learners wishing to master global languages through structured, practical instruction.',
    features: ['Multi-Language Curriculum', 'Grammar & Vocabulary Drills', 'Reading & Conversational Practice', 'Verified Certificate of Completion'],
    actionLabel: 'Explore Language Pathways',
    infoMessage: 'Develop practical language skills with structured modules and active learning pathways.'
  }
];

// Helper to normalize URL parameters or slugs to standard category names
export function normalizeCategory(param) {
  if (!param) return 'All';
  const decoded = decodeURIComponent(param).trim();
  const lower = decoded.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (lower === 'all' || lower === '') {
    return 'All';
  }
  if (lower.includes('project') || lower.includes('arena') || lower.includes('practice')) {
    return 'Projects';
  }
  if (lower.includes('foundation') || lower.includes('html') || lower.includes('css') || lower.includes('javascript') || lower.includes('pathway') || lower.includes('fullstack') || lower.includes('frontend') || lower.includes('backend') || lower.includes('bundle') || lower.includes('web') || lower.includes('tech') || lower.includes('code')) {
    return 'Professional Development Pathways';
  }
  if (lower.includes('data') || lower.includes('powerbi') || lower.includes('sql') || lower.includes('analytics') || lower.includes('bi')) {
    return 'Data & Analytics';
  }
  if (lower.includes('cyber') || lower.includes('security')) {
    return 'Cybersecurity';
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
    return 'Business & Entrepreneurship';
  }
  return 'All';
}

// Strict Category Matcher — each category displays only its own courses with backwards compatibility
function matchesCategory(course, selectedCategory) {
  if (!selectedCategory || selectedCategory === 'All') return true;
  if (selectedCategory === 'Projects') return false; // Handled in dedicated projects block

  const cat = String(course.category || '').toLowerCase().trim();
  const sel = selectedCategory.toLowerCase().trim();

  if (cat === sel) return true;

  // Professional Development Pathways (Full-Stack, Frontend, Backend Flagship Pathways)
  if (sel === 'professional development pathways' || sel === 'web development foundations') {
    return ['fullstack-developer-bundle', 'frontend-developer-zero-to-job-ready', 'backend-developer-zero-to-job-ready'].includes(course.id);
  }
  // Data & Analytics
  if (sel === 'data & analytics') {
    return cat === 'data & analytics' || (cat === 'technology' && (course.id.includes('data') || course.id.includes('power-bi') || course.id.includes('sql') || course.id.includes('python')));
  }
  // Cybersecurity
  if (sel === 'cybersecurity') {
    return cat === 'cybersecurity' || (cat === 'technology' && course.id.includes('cyber'));
  }
  // Languages
  if (sel === 'international languages') {
    return cat === 'international languages' || cat === 'languages & arabic' || cat === 'languages';
  }
  // Islamic Studies
  if (sel === 'islamic studies') {
    return cat === 'islamic studies';
  }
  // Business & Entrepreneurship
  if (sel === 'business & entrepreneurship' || sel === 'business') {
    return cat === 'business & entrepreneurship' || cat === 'business';
  }
  // Career Skills
  if (sel === 'career skills') {
    return cat === 'career skills';
  }
  // Legacy Technology selection
  if (sel === 'technology') {
    return cat === 'technology' || cat === 'professional development pathways' || cat === 'data & analytics' || cat === 'cybersecurity';
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

  const [courses, setCourses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [enrolledTracks, setEnrolledTracks] = useState({});

  // Synchronize category & search query with URL parameter
  useEffect(() => {
    const rawCategory = categorySlug || searchParams.get('category');
    if (rawCategory) {
      const normalized = normalizeCategory(rawCategory);
      setSelectedCategory(normalized);
    } else if (categorySlug === undefined && !searchParams.get('category')) {
      setSelectedCategory('All');
    }

    const rawQ = searchParams.get('q');
    if (rawQ !== null) {
      setSearchQuery(rawQ);
    }
  }, [categorySlug, searchParams]);

  // Synchronize filter updates with URL parameters
  const updateUrlParams = (newCategory, newQuery) => {
    const updated = new URLSearchParams(searchParams);

    if (newCategory && newCategory !== 'All') {
      updated.set('category', newCategory);
    } else {
      updated.delete('category');
    }

    // Always clean up obsolete level query param
    updated.delete('level');

    if (newQuery && newQuery.trim()) {
      updated.set('q', newQuery.trim());
    } else {
      updated.delete('q');
    }

    setSearchParams(updated, { replace: true });
  };

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    updateUrlParams(cat, searchQuery);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    updateUrlParams(selectedCategory, query);
  };

  const handleResetAllFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSearchParams({}, { replace: true });
  };

  // Initialize track exploration from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fahmrise_active_tracks');
      if (saved) {
        setEnrolledTracks(JSON.parse(saved));
      }
    } catch (e) {
      // Safe fallback
    }
  }, []);

  // Fetch catalog & projects data from backend
  useEffect(() => {
    async function loadCatalog() {
      try {
        setLoading(true);
        const data = await api.books.getAll();
        const loadedCourses = (data && (data.courses || data.books)) || [];
        const sourceCourses = loadedCourses.length > 0 ? loadedCourses : coursesData;
        const uniqueCourses = Array.from(new Map(sourceCourses.map(c => [c.id, c])).values());
        setCourses(uniqueCourses);
        if (data && data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
          const uniqueProjects = Array.from(new Map(data.projects.map(p => [p.id, p])).values());
          setProjects(uniqueProjects);
        } else {
          setProjects(practiceProjectsData);
        }
      } catch (err) {
        console.error('Failed to load catalog data:', err);
        const uniqueCourses = Array.from(new Map(coursesData.map(c => [c.id, c])).values());
        setCourses(uniqueCourses);
        setProjects(practiceProjectsData);
      } finally {
        setLoading(false);
      }
    }

    loadCatalog();
  }, []);

  // 1. Filter Courses by Category and Search Query (guaranteed unique by ID)
  const filteredCourses = React.useMemo(() => {
    const matched = courses.filter((course) => {
      if (course.hideFromCatalog || course.id === 'data-analysis-spreadsheets') return false;
      return matchesCategory(course, selectedCategory) &&
             matchesSearch(course, searchQuery);
    });
    return Array.from(new Map(matched.map(c => [c.id, c])).values());
  }, [courses, selectedCategory, searchQuery]);

  const availableCourses = filteredCourses.filter(c => !c.isComingSoon && c.status !== 'coming_soon');
  const comingSoonCourses = filteredCourses.filter(c => c.isComingSoon || c.status === 'coming_soon');

  // 2. Filter Live Tracks by Category (Display on All Categories view or International Languages)
  const filteredLiveTracks = LIVE_TRACKS.filter((track) => {
    if (selectedCategory === 'All' || selectedCategory === 'International Languages') {
      if (searchQuery && !matchesSearch({ title: track.fullTitle, subtitle: track.subtitle, description: track.description, category: track.category }, searchQuery)) {
        return false;
      }
      return true;
    }
    return false;
  });

  // 3. Filter Practice Projects by Category and Search Query
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

  // Category counts calculation (guaranteed unique course counts)
  const getCategoryCount = (catId) => {
    const visibleCourses = courses.filter(c => !c.hideFromCatalog && c.id !== 'data-analysis-spreadsheets');
    if (catId === 'All') return new Set(visibleCourses.map(c => c.id)).size + (projects ? projects.length : 0);
    if (catId === 'Projects') return projects ? projects.length : 0;
    const matchingCourses = visibleCourses.filter(c => matchesCategory(c, catId));
    return new Set(matchingCourses.map(c => c.id)).size;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 sm:py-10 px-3 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 w-full min-w-0">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 px-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FAHMRISE Curriculum & Course Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white break-words">
            Understand. Learn. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Rise.</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Explore interactive courses, live specialized tracks, and real-world coding projects across Web & Software Engineering, Islamic Studies, International Languages, Business, and Career Skills.
          </p>
        </div>

        {/* Category Navigation, Search, and Experience Level Filters */}
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl space-y-4 w-full">
          
          {/* 1. Category Navigation Pills (Horizontal Desktop & Scrollable Mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const Icon = getCategoryIcon(cat.id);
              const count = getCategoryCount(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-glow font-extrabold'
                      : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
                  }`}
                  aria-pressed={isSelected}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-emerald-400'}`} />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isSelected
                      ? 'bg-slate-950/20 text-slate-950 font-black'
                      : 'bg-slate-900 text-slate-400 border border-slate-700/60'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 2. Controls Bar: Search Input and Mobile Category Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
            
            {/* Search Input */}
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search courses, topics, keywords..."
                className="w-full bg-slate-950/90 border border-slate-800 hover:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-100 text-xs sm:text-sm rounded-xl pl-10 pr-9 py-2.5 outline-none transition-all placeholder:text-slate-500 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Category Dropdown (Responsive backup for small screens) */}
            <div className="relative sm:hidden w-full">
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => handleSelectCategory(e.target.value)}
                className="w-full appearance-none bg-slate-950/90 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 pr-8 outline-none"
                aria-label="Category Select"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-slate-900 text-slate-100">
                    {cat.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-400 pointer-events-none" />
            </div>

          </div>
        </div>

        {/* Catalog Body */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm">Loading FAHMRISE catalog...</p>
          </div>
        ) : !hasAnyResults ? (
          /* Clean Empty Category & Filter State */
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800/60 space-y-4 px-4 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mx-auto text-slate-400">
              <BookOpen className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-bold text-white">No courses or projects found</h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                No educational resources matched category <strong>"{selectedCategory}"</strong>
                {searchQuery ? ` matching "${searchQuery}"` : ''}.
              </p>
            </div>
            <button
              onClick={handleResetAllFilters}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-sm cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            
            {/* 1. Projects Spotlight Header (when Projects Category is active) */}
            {selectedCategory === 'Projects' && (
              <div className="bg-gradient-to-r from-violet-950/60 via-slate-900 to-slate-950 border border-violet-500/30 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-bold">
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>Practice Arena • 10 Real-World Projects</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Hands-On Front-End & JavaScript Projects
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    Build real browser applications with multi-file workspaces (HTML, CSS, JavaScript), real-time DOM sandboxes, automated test assertion suites, and 24/7 AI Tutor assistance.
                  </p>
                </div>
                <Link
                  to="/practice"
                  className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all shadow-glow flex items-center justify-center gap-2 flex-shrink-0"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Launch Practice Arena</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {/* 2. International Languages Category Hero (when International Languages Category is active) */}
            {selectedCategory === 'International Languages' && (
              <div className="bg-gradient-to-r from-cyan-950/70 via-slate-900 to-slate-950 border border-cyan-500/30 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                    <Globe className="w-3.5 h-3.5" />
                    <span>International Languages</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Learn Languages From Around the World
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    Develop practical language skills through structured courses in reading, writing, pronunciation, vocabulary, grammar, listening, and conversation.
                  </p>
                </div>
                <Link
                  to="/tracks/international-languages"
                  className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-glow flex items-center justify-center gap-2 flex-shrink-0"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Track Overview</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {/* 3. Available Courses Section */}
            {availableCourses.length > 0 && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-400" />
                    <span>Available Courses</span>
                  </h2>
                  <span className="text-xs text-slate-400 font-medium">
                    Showing {availableCourses.length} {availableCourses.length === 1 ? 'Course' : 'Courses'}
                    {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
                  {availableCourses.map((course) => {
                    const enrolled = isEnrolledIn(course.id);
                    return (
                      <div
                        key={course.id}
                        data-course-id={course.id}
                        className="flex flex-col bg-slate-900/70 border border-slate-800/90 rounded-2xl overflow-hidden hover:border-emerald-500/50 hover:shadow-2xl transition-all group min-w-0 w-full"
                      >
                        {/* Card Header with Category Gradient */}
                        <div className={`p-4 sm:p-5 bg-gradient-to-br ${course.coverColor || 'from-emerald-700 to-slate-900'} relative`}>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-950/60 text-white backdrop-blur border border-white/10 truncate max-w-[150px]">
                              {course.category}
                            </span>
                            {enrolled ? (
                              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Enrolled
                              </span>
                            ) : (
                              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                                {course.coverBadge || course.level}
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-xs text-slate-200 line-clamp-2 mt-1 opacity-90">
                            {course.subtitle}
                          </p>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4 min-w-0">
                          <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 break-words">
                            {course.description}
                          </p>

                          {/* Metadata Specs */}
                          <div className="grid grid-cols-3 gap-1 sm:gap-2 py-2.5 sm:py-3 border-y border-slate-800/80 text-[10px] sm:text-[11px] text-slate-400">
                            <div className="flex items-center gap-1 sm:gap-1.5 truncate">
                              <BookOpen className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                              <span className="truncate">{course.totalLessons || (course.lessonsSummary?.length) || 10} Lessons</span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-1.5 truncate">
                              <Clock className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                              <span className="truncate">{course.estimatedHours || '5 Hours'}</span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-1.5 truncate">
                              <Sparkles className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                              <span className="truncate">{course.level || 'All Levels'}</span>
                            </div>
                          </div>

                          {/* Footer / CTA */}
                          <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                            <div className="min-w-0">
                              <span className="text-[11px] text-slate-400 font-semibold block">
                                {course.paymentType === 'one_time' || course.id === 'frontend-developer-zero-to-job-ready'
                                  ? 'One-Time Complete Course'
                                  : 'Course Price'}
                              </span>
                              <div className="flex items-baseline gap-1.5 flex-wrap">
                                <span className="text-base sm:text-lg font-black text-emerald-400">
                                  {course.isFree || course.price === 0 ? 'Free' : course.price > 0 ? `${course.currency || 'KSh'} ${course.price.toLocaleString()}` : (course.priceDisplay || 'Price to be announced')}
                                </span>
                                {course.paymentType === 'one_time' || course.id === 'frontend-developer-zero-to-job-ready' ? (
                                  <span className="text-[10px] text-emerald-300 font-bold bg-emerald-950/90 px-1.5 py-0.5 rounded border border-emerald-500/40">
                                    One-Time
                                  </span>
                                ) : course.isFree || course.price === 0 ? null : (
                                  <span className="text-[10px] text-slate-400">
                                    / mo
                                  </span>
                                )}
                                {course.priceUSD && course.price > 0 && (
                                  <span className="text-[10px] text-slate-500">
                                    (~${course.priceUSD})
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                              {enrolled ? (
                                <Link
                                  to={`/reader/${course.id}`}
                                  className="px-3.5 sm:px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-glow flex items-center gap-1"
                                >
                                  <span>Continue</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                              ) : (
                                <Link
                                  to={`/courses/${course.id}`}
                                  className="px-3.5 sm:px-4 py-2 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-xs font-bold transition-all border border-slate-700 flex items-center gap-1"
                                >
                                  <span>View Course</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. Upcoming Courses Section (e.g. Coming Soon Language tracks) */}
            {comingSoonCourses.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-800/80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span>Upcoming Language Courses</span>
                  </h2>
                  <span className="text-xs text-blue-300 font-semibold bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                    Planned for Upcoming Release
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
                  {comingSoonCourses.map((course) => (
                    <div
                      key={course.id}
                      className="flex flex-col bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all group min-w-0 w-full"
                    >
                      {/* Header */}
                      <div className={`p-4 sm:p-5 bg-gradient-to-br ${course.coverColor || 'from-blue-700 to-slate-900'} relative`}>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-950/60 text-white backdrop-blur border border-white/10 truncate">
                            {course.category}
                          </span>
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-950/90 text-blue-300 border border-blue-500/40">
                            Coming Soon
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {course.title}
                        </h3>
                        <p className="text-xs text-slate-200 line-clamp-2 mt-1 opacity-90">
                          {course.subtitle}
                        </p>
                      </div>

                      {/* Body */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 min-w-0">
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                          {course.description}
                        </p>

                        {/* Syllabus Preview */}
                        {course.syllabus && course.syllabus.length > 0 && (
                          <div className="space-y-1.5 py-2.5 border-y border-slate-800/80 text-[11px]">
                            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Planned Syllabus:</span>
                            <ul className="space-y-1 text-slate-300">
                              {course.syllabus.slice(0, 3).map((mod, idx) => (
                                <li key={idx} className="flex items-start gap-1.5 text-xs">
                                  <span className="text-blue-400 font-bold">•</span>
                                  <span className="truncate">{mod.title}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Footer */}
                        <div className="pt-2 flex items-center justify-between gap-2">
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Tuition</span>
                            <span className="text-sm font-semibold text-slate-300">
                              Price to be announced
                            </span>
                          </div>
                          <Link
                            to={`/courses/${course.id}`}
                            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all border border-slate-700 flex items-center gap-1"
                          >
                            <span>View Details</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


            {/* 4. Dedicated Practice Projects Section */}
            {shouldShowProjects && filteredProjects.length > 0 && (
              <div className="space-y-5 pt-2">
                <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="w-5 h-5 text-violet-400" />
                      <h2 className="text-lg sm:text-xl font-bold text-white">
                        {selectedCategory === 'Projects' ? 'All Practice Arena Projects' : 'Related Hands-On Projects'}
                      </h2>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Build, test, and execute real applications inside the isolated in-browser Practice Arena.
                    </p>
                  </div>
                  <span className="text-xs text-violet-400 font-semibold bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full w-fit">
                    {filteredProjects.length} Projects Available
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
                  {filteredProjects.map((proj) => {
                    const skills = proj.skillsLearned || proj.techStack || ['HTML5', 'CSS3', 'JavaScript', 'DOM API'];
                    const num = proj.id.replace('project-', '');

                    return (
                      <div
                        key={proj.id}
                        className="flex flex-col bg-slate-900/70 border border-slate-800/90 rounded-2xl p-4 sm:p-5 hover:border-violet-500/50 hover:shadow-2xl transition-all group min-w-0 w-full justify-between space-y-4"
                      >
                        <div className="space-y-3">
                          {/* Header / Badges */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-mono font-black text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-lg border border-violet-500/20">
                              Project #{num}
                            </span>
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                              proj.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' :
                              proj.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30' :
                              'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                            }`}>
                              {proj.difficulty}
                            </span>
                          </div>

                          {/* Title & Category */}
                          <div>
                            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                              {proj.category}
                            </span>
                            <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors mt-0.5">
                              {proj.title}
                            </h3>
                          </div>

                          {/* Description */}
                          <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                            {proj.description}
                          </p>

                          {/* Skills / Tech Stack Chips */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {skills.slice(0, 4).map((tech, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/80 text-slate-300 border border-slate-800"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Footer */}
                        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Terminal className="w-3.5 h-3.5 text-slate-400" />
                            <span>Code Runner</span>
                          </span>

                          <Link
                            to={`/practice/${proj.id}`}
                            className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all shadow-glow flex items-center gap-1.5"
                          >
                            <Code2 className="w-3.5 h-3.5" />
                            <span>Launch Project</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

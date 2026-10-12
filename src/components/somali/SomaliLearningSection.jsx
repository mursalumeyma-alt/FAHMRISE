import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Sparkles,
  MessageSquare,
  Layers,
  FileText,
  Volume2,
  Award,
  Search,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ExternalLink,
  RotateCcw,
  Compass,
  Check,
  X,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Globe2,
  ShieldCheck,
  Clock,
  Filter
} from 'lucide-react';
import {
  SOMALI_LEARNING_CATEGORIES,
  SOMALI_LEARNING_LESSONS,
  SOMALI_EXTERNAL_REFERENCES
} from '../../data/somaliLearningData';

// Icon mapping helper
const CATEGORY_ICONS = {
  all: Sparkles,
  beginner: Compass,
  vocabulary: BookOpen,
  speaking: MessageSquare,
  grammar: Layers,
  'reading-writing': FileText,
  'listening-pronunciation': Volume2,
  'quizzes-practice': Award
};

export default function SomaliLearningSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [activeLesson, setActiveLesson] = useState(null);

  // Interactive Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Filter lessons based on category, search query, and level
  const filteredLessons = useMemo(() => {
    return SOMALI_LEARNING_LESSONS.filter((lesson) => {
      // Category filter
      if (selectedCategory !== 'all' && lesson.categoryId !== selectedCategory) {
        return false;
      }

      // Level filter
      if (selectedLevel !== 'all') {
        const levelLower = (lesson.level || '').toLowerCase();
        if (selectedLevel === 'beginner' && !levelLower.includes('beginner') && !levelLower.includes('a1')) {
          return false;
        }
        if (selectedLevel === 'intermediate' && !levelLower.includes('intermediate') && !levelLower.includes('a2') && !levelLower.includes('b1')) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = lesson.title.toLowerCase().includes(q);
        const matchesSomaliTitle = lesson.somaliTitle.toLowerCase().includes(q);
        const matchesSummary = lesson.summary.toLowerCase().includes(q);
        const matchesCategory = lesson.categoryName.toLowerCase().includes(q) || lesson.categorySomali.toLowerCase().includes(q);
        const matchesTags = (lesson.tags || []).some((t) => t.toLowerCase().includes(q));

        if (!matchesTitle && !matchesSomaliTitle && !matchesSummary && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery, selectedLevel]);

  // Handle opening a lesson modal
  const handleOpenLesson = (lesson) => {
    setActiveLesson(lesson);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  // Quiz answer selection
  const handleSelectQuizOption = (questionId, optionIndex) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  // Quiz score calculation
  const quizScore = useMemo(() => {
    if (!activeLesson?.questions || !quizSubmitted) return null;
    let correct = 0;
    activeLesson.questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return {
      score: correct,
      total: activeLesson.questions.length,
      percentage: Math.round((correct / activeLesson.questions.length) * 100)
    };
  }, [activeLesson, quizAnswers, quizSubmitted]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-12 pb-16">
      
      {/* 1. Header & Section Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950/40 to-slate-900 border border-sky-900/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <span role="img" aria-label="Somalia Flag">🇸🇴</span>
              <span>Barashada Af-Soomaaliga</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Somali Learning
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore authentic Somali language education structured across beginner fundamentals, practical vocabulary, real-world dialogues, grammar principles, reading comprehension, pronunciation, and interactive quizzes.
            </p>
            <div className="pt-1 flex items-center gap-3">
              <a
                href="https://www.learnable.education/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md transition-all group"
              >
                <span>Visit Learnable</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-xl font-black text-sky-400">7</span>
              <p className="text-[11px] font-semibold text-slate-400 mt-0.5">Core Categories</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-xl font-black text-emerald-400">24+</span>
              <p className="text-[11px] font-semibold text-slate-400 mt-0.5">Lessons & Units</p>
            </div>
            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-xl font-black text-amber-400">100%</span>
              <p className="text-[11px] font-semibold text-slate-400 mt-0.5">Free Access</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Category Navigation Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-sky-400" />
            <span>Learning Categories</span>
          </span>
          <span className="text-xs text-slate-500">
            Showing {filteredLessons.length} lessons
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none custom-scrollbar">
          {SOMALI_LEARNING_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || Sparkles;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-glow font-extrabold'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-sky-500/30 text-sky-200' : 'bg-slate-800 text-slate-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Search Bar & Level Filtering Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Somali lessons, greetings, vocabulary, grammar rules, or dialogues..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5 text-sky-400" />
            <span>Level:</span>
          </div>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 focus:outline-none focus:border-sky-500 cursor-pointer"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner (A1)</option>
            <option value="intermediate">Intermediate (A2-B1)</option>
          </select>
        </div>
      </div>

      {/* 4. Lesson Cards Grid */}
      {filteredLessons.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No Somali lessons matched your search</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query or selecting a different category from the category tabs above.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedLevel('all');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-bold transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLessons.map((lesson) => {
            const Icon = CATEGORY_ICONS[lesson.categoryId] || BookOpen;

            return (
              <div
                key={lesson.id}
                className="group rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-900 transition-all p-6 flex flex-col justify-between space-y-4 shadow-lg hover:shadow-sky-950/30 relative overflow-hidden"
              >
                <div className="space-y-3">
                  {/* Top Metadata Badge Row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{lesson.categoryName}</span>
                    </span>

                    <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{lesson.duration}</span>
                    </span>
                  </div>

                  {/* Title & Somali Subtitle */}
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                      {lesson.title}
                    </h3>
                    <p className="text-xs font-semibold text-sky-400/90 mt-0.5">
                      {lesson.somaliTitle}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {lesson.summary}
                  </p>

                  {/* Tags */}
                  {lesson.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {lesson.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-950 text-slate-400 border border-slate-850"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Card Action */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400">
                    {lesson.level}
                  </span>

                  <button
                    onClick={() => handleOpenLesson(lesson)}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md group-hover:gap-2 transition-all cursor-pointer"
                  >
                    <span>{lesson.categoryId === 'quizzes-practice' ? 'Take Quiz' : 'Start Lesson'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. External Reference Resources */}
      <div className="rounded-3xl bg-slate-950 border border-slate-850 p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-850 pb-3">
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-sky-400" />
            <h4 className="text-sm font-bold text-white">Somali Lessons & Educational References</h4>
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Reference Link</span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          For learners interested in supplemental digital learning tools, linguistic archives, and self-paced study modules, explore these external educational references.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {SOMALI_EXTERNAL_REFERENCES.map((ref, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-200">
                    {ref.name}
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {ref.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{ref.description}</p>
              </div>
              <a
                href={ref.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all self-start group"
              >
                <span>{ref.actionText || 'Explore Resource'}</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Interactive Lesson / Quiz Modal */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                    {activeLesson.categoryName} • {activeLesson.categorySomali}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                    {activeLesson.level}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mt-1">
                  {activeLesson.title}
                </h3>
                <p className="text-xs font-semibold text-sky-300/90">
                  {activeLesson.somaliTitle}
                </p>
              </div>

              <button
                onClick={() => setActiveLesson(null)}
                className="p-2 rounded-2xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Content (Switch by Lesson Type) */}
            <div className="space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
              
              {/* Introduction */}
              {activeLesson.content?.introduction && (
                <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-200">
                  <p className="leading-relaxed">{activeLesson.content.introduction}</p>
                </div>
              )}

              {/* Items List (Greetings & Phrases) */}
              {activeLesson.content?.items && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Key Vocabulary & Phrases
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {activeLesson.content.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-950 border border-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{item.somali || item.question}</span>
                            {item.phonetic && (
                              <span className="text-[11px] font-mono text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded-md">
                                {item.phonetic}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-300 mt-0.5">
                            {item.english || item.translationQ}
                          </p>
                          {item.answer && (
                            <div className="mt-1.5 p-2 rounded-xl bg-slate-900 border border-slate-800">
                              <span className="font-bold text-emerald-400">A: {item.answer}</span>
                              <p className="text-[11px] text-slate-400">{item.translationA}</p>
                            </div>
                          )}
                        </div>
                        {item.notes && (
                          <span className="text-[11px] text-slate-400 italic bg-slate-900 px-2.5 py-1 rounded-xl shrink-0 self-start sm:self-center">
                            {item.notes}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vocabulary Table */}
              {activeLesson.content?.tableData && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Vocabulary Word Bank
                  </h4>
                  <div className="overflow-x-auto rounded-2xl border border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                        <tr>
                          <th className="p-3">Somali Word</th>
                          <th className="p-3">Phonetic</th>
                          <th className="p-3">English</th>
                          <th className="p-3">Example Usage</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-850 bg-slate-900">
                        {activeLesson.content.tableData.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-850/60 transition-colors">
                            <td className="p-3 font-bold text-white">{row.word}</td>
                            <td className="p-3 font-mono text-sky-400 text-[11px]">{row.phonetic}</td>
                            <td className="p-3 text-slate-300">{row.english}</td>
                            <td className="p-3 text-slate-400 text-[11px]">{row.example}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Dialogue Scripts */}
              {activeLesson.content?.dialogue && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Practical Spoken Dialogue
                  </h4>
                  <div className="space-y-2.5 p-4 rounded-2xl bg-slate-950 border border-slate-850">
                    {activeLesson.content.dialogue.map((line, idx) => (
                      <div key={idx} className="space-y-0.5 border-b border-slate-900 pb-2 last:border-none">
                        <span className="text-[11px] font-bold text-sky-400">{line.speaker}:</span>
                        <p className="text-xs font-semibold text-white">"{line.text}"</p>
                        <p className="text-[11px] text-slate-400 italic">({line.translation})</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grammar Rules */}
              {activeLesson.content?.rules && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Grammar Rules & Formations
                  </h4>
                  {activeLesson.content.rules.map((rule, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-2">
                      <h5 className="text-xs font-bold text-emerald-400">{rule.ruleName}</h5>
                      <p className="text-xs text-slate-300">{rule.explanation}</p>
                      <div className="space-y-1.5 pt-1">
                        {rule.examples.map((ex, exIdx) => (
                          <div key={exIdx} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px]">
                            <span className="font-bold text-white">{ex.somali}</span>
                            <span className="text-slate-400 ml-2">→ {ex.english}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Reading Passage & Comprehension */}
              {activeLesson.content?.passage && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Reading Passage (Far-Soomaali)
                  </h4>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-slate-200 leading-relaxed">
                      {activeLesson.content.passage}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-850 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">English Translation</span>
                    <p className="text-xs text-slate-400 italic leading-relaxed">
                      {activeLesson.content.englishTranslation}
                    </p>
                  </div>

                  {activeLesson.content.comprehensionQuestions && (
                    <div className="space-y-2 pt-2">
                      <h5 className="text-xs font-bold text-sky-400">Comprehension Checks:</h5>
                      {activeLesson.content.comprehensionQuestions.map((cq, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                          <p className="font-bold text-white text-xs">{idx + 1}. {cq.q}</p>
                          <p className="text-[11px] text-emerald-400 font-semibold">{cq.a}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Phoneme Articulation Guides */}
              {activeLesson.content?.phonemes && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Phonetic Articulation Guide
                  </h4>
                  <div className="space-y-3">
                    {activeLesson.content.phonemes.map((ph, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-300 font-black text-sm flex items-center justify-center">
                            {ph.letter}
                          </span>
                          <div>
                            <span className="font-bold text-white text-xs">{ph.name}</span>
                            <span className="text-[11px] font-mono text-sky-400 ml-2">IPA: {ph.ipa}</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-300">{ph.guide}</p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {ph.examples.map((ex, exIdx) => (
                            <span key={exIdx} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
                              {ex}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Quiz Engine */}
              {activeLesson.questions && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                      <Award className="w-4 h-4" />
                      <span>{activeLesson.title} ({activeLesson.questions.length} Questions)</span>
                    </span>

                    {quizSubmitted && quizScore && (
                      <span className={`text-xs font-black px-3 py-1 rounded-full ${
                        quizScore.percentage >= 80
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        Score: {quizScore.score} / {quizScore.total} ({quizScore.percentage}%)
                      </span>
                    )}
                  </div>

                  <div className="space-y-5">
                    {activeLesson.questions.map((q, qIdx) => {
                      const selectedOpt = quizAnswers[q.id];
                      const isAnswered = selectedOpt !== undefined;
                      const isCorrect = isAnswered && selectedOpt === q.correctIndex;

                      return (
                        <div
                          key={q.id}
                          className="p-5 rounded-2xl bg-slate-950 border border-slate-850 space-y-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h5 className="text-xs sm:text-sm font-bold text-white">
                              {qIdx + 1}. {q.question}
                            </h5>
                            {quizSubmitted && (
                              <span>
                                {isCorrect ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                                )}
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-1 gap-2 pt-1">
                            {q.options.map((opt, optIdx) => {
                              const isThisSelected = selectedOpt === optIdx;
                              let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850';

                              if (quizSubmitted) {
                                if (optIdx === q.correctIndex) {
                                  btnStyle = 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200 font-bold';
                                } else if (isThisSelected && !isCorrect) {
                                  btnStyle = 'bg-rose-950/60 border-rose-500/50 text-rose-300';
                                } else {
                                  btnStyle = 'bg-slate-900/60 border-slate-850 text-slate-500 opacity-60';
                                }
                              } else if (isThisSelected) {
                                btnStyle = 'bg-sky-500/20 border-sky-500/50 text-sky-200 font-bold';
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleSelectQuizOption(q.id, optIdx)}
                                  disabled={quizSubmitted}
                                  className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                                >
                                  <span>{opt}</span>
                                  {isThisSelected && !quizSubmitted && (
                                    <div className="w-2 h-2 rounded-full bg-sky-400" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {quizSubmitted && (
                            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                              <span className="font-bold text-sky-400">Explanation:</span>
                              <p className="text-slate-400">{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    {quizSubmitted ? (
                      <button
                        onClick={() => {
                          setQuizAnswers({});
                          setQuizSubmitted(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Try Again</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setQuizSubmitted(true)}
                        disabled={Object.keys(quizAnswers).length === 0}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-bold shadow-glow flex items-center gap-2 transition-all disabled:opacity-50"
                      >
                        <Check className="w-4 h-4" />
                        <span>Submit Answers & Check Results</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-[11px] text-slate-500">
                FAHMRISE Somali Learning Curriculum
              </span>
              <button
                onClick={() => setActiveLesson(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
              >
                Close Lesson
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

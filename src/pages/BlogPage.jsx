import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Tag, 
  Sparkles, 
  Code2, 
  Layers, 
  ChevronRight, 
  GraduationCap,
  Filter,
  Terminal,
  Check,
  CheckCircle2
} from 'lucide-react';
import { BLOG_CATEGORIES, BLOG_POSTS } from '../data/blogData';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: BLOG_POSTS.length };
    BLOG_CATEGORIES.forEach(cat => {
      if (cat !== 'All') {
        counts[cat] = BLOG_POSTS.filter(post => post.category === cat).length;
      }
    });
    return counts;
  }, []);

  // Filtered posts based on category and search query
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = q === '' ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.author.name.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured post (the first featured one or first post)
  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find(post => post.featured) || BLOG_POSTS[0];
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 selection:bg-[#E5B869] selection:text-[#0B2F2D]">
      
      {/* =========================================================================
          1. BLOG HERO & HEADER SECTION (Deep Teal Background)
         ========================================================================= */}
      <section className="relative bg-[#0B2F2D] text-white overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20 border-b border-[#072120]">
        {/* Subtle Ambient Light Gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#124542] rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#E5B869]/10 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#A2C4C1] mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-[#E5B869] font-medium">Educational Journal &amp; Articles</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5B869]/15 border border-[#E5B869]/30 text-[#E5B869] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FAHMRISE Educational Journal &amp; Tutorials</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Insights, Tutorials &amp; Practical Guides
            </h1>

            <p className="text-base sm:text-lg text-[#D1E0DE] leading-relaxed">
              In-depth articles exploring web engineering, database architecture, Qur’anic sciences, language acquisition, and the science of active learning.
            </p>
          </div>

          {/* Search Bar Input */}
          <div className="mt-8 max-w-2xl relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tutorials, topics, or authors (e.g. SQL, Tajweed, Full-Stack, Socratic)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#E5B869] shadow-xl backdrop-blur-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded bg-slate-800"
              >
                Clear
              </button>
            )}
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. CATEGORY PILL FILTER BAR
         ========================================================================= */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mr-2 flex-shrink-0">
              <Filter className="w-3.5 h-3.5 text-[#0B2F2D]" />
              <span>Topic:</span>
            </div>
            {BLOG_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              const count = categoryCounts[category] || 0;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 flex-shrink-0
                    ${isSelected 
                      ? 'bg-[#0B2F2D] text-[#E5B869] shadow-sm' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'}`}
                >
                  <span>{category}</span>
                  {count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-[#E5B869]' : 'bg-slate-200 text-slate-600'}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. MAIN CONTENT: FEATURED + ARTICLE GRID
         ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Featured Post Card (Visible when 'All' selected and no active search) */}
        {selectedCategory === 'All' && !searchQuery && featuredPost && (
          <section className="mb-14">
            <div className="text-xs font-bold text-[#0B2F2D] uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#E5B869]" />
              <span>Featured Article</span>
            </div>

            <div className="bg-white border-2 border-[#0B2F2D]/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-8 space-y-4">
                  {/* Category Pill + Badges */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-[#0B2F2D] text-[#E5B869] text-xs font-bold uppercase tracking-wider">
                      {featuredPost.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{featuredPost.readTime}</span>
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{featuredPost.publishedDate}</span>
                    </span>
                  </div>

                  {/* Headline */}
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0B2F2D] tracking-tight hover:text-[#06423F] transition-colors">
                    <Link to={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  {/* Author Attribution */}
                  <div className="pt-2 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#0B2F2D] text-[#E5B869] font-bold text-xs flex items-center justify-center">
                      FR
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{featuredPost.author.name}</h4>
                      <p className="text-[11px] text-slate-500">{featuredPost.author.role}</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end gap-6 bg-[#FAF8F5] p-6 rounded-2xl border border-slate-200">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Theme</span>
                    <p className="text-sm font-semibold text-[#0B2F2D]">
                      Active Inquiry • Digital Curriculums • Cryptographic Credentials
                    </p>
                  </div>

                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0B2F2D] hover:bg-[#124542] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4 text-[#E5B869]" />
                  </Link>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* Section Heading & Grid Count */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#0B2F2D]">
              {selectedCategory === 'All' ? 'All Educational Articles' : `${selectedCategory} Articles`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-10 sm:p-14 text-center space-y-4 max-w-xl mx-auto shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-500">
              <BookOpen className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-xl font-serif font-bold text-[#0B2F2D]">
                {searchQuery 
                  ? 'No matching articles found' 
                  : `New ${selectedCategory} Articles Coming Soon`}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {searchQuery ? (
                  <>We couldn't find any articles matching "<strong>{searchQuery}</strong>". Try searching for topics like "SQL", "JavaScript", or "Tajweed".</>
                ) : (
                  <>In-depth educational guides for <strong>{selectedCategory}</strong> are currently in curriculum preparation. In the meantime, explore our structured courses in this discipline.</>
                )}
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0B2F2D] text-white text-xs font-bold hover:bg-[#124542] transition-colors cursor-pointer"
              >
                View All Articles
              </button>
              {!searchQuery && (
                <Link
                  to={`/courses?category=${encodeURIComponent(selectedCategory)}`}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FAF8F5] text-[#0B2F2D] text-xs font-bold border border-slate-300 hover:bg-slate-100 transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#E5B869]" />
                  <span>Browse {selectedCategory} Courses</span>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col justify-between bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-[#E5B869]/70 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div>
                  {/* Top Meta: Category + Read Time */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 group-hover:bg-[#0B2F2D] group-hover:text-[#E5B869] text-[11px] font-bold uppercase tracking-wider transition-colors">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-serif font-bold text-[#0B2F2D] group-hover:text-[#06423F] transition-colors leading-snug">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 mt-2.5 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer: Author + Read Link */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#0B2F2D]/10 text-[#0B2F2D] text-[10px] font-bold flex items-center justify-center">
                      FR
                    </div>
                    <div className="leading-tight">
                      <p className="text-xs font-semibold text-slate-800 truncate max-w-[120px]">{post.author.name}</p>
                      <p className="text-[10px] text-slate-400">{post.publishedDate}</p>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0B2F2D] group-hover:text-[#E5B869] transition-colors"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* =========================================================================
            4. PRACTICE ARENA CALLOUT (Light Professional Technology Design)
           ========================================================================= */}
        <section className="mt-16 bg-[#F1F5F9] border border-slate-200/90 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Messaging & Action Buttons */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Uppercase Small Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/90 border border-blue-200 text-[#2563EB] text-[11px] font-bold tracking-widest uppercase">
                <Code2 className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>PUT THEORY INTO PRACTICE</span>
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#172554] tracking-tight leading-tight">
                Ready to code what you read?
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-xl">
                Don't stop at reading tutorials. Launch our interactive in-browser Practice Arena to build real projects, execute live test suites, and strengthen your problem-solving skills.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  to="/practice"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Open Practice Arena</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#172554] hover:text-[#2563EB] font-bold text-sm border-2 border-[#2563EB] shadow-xs hover:shadow transition-all"
                >
                  <BookOpen className="w-4 h-4 text-[#2563EB]" />
                  <span>Explore Full Curriculums</span>
                </Link>
              </div>

              {/* Micro-features row */}
              <div className="pt-3 flex flex-wrap items-center gap-5 text-xs text-[#64748B]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>10 Real-World JS Projects</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                  <span>Automated Instant Tests</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                  <span>Zero Setup Required</span>
                </span>
              </div>

            </div>

            {/* Right Column: Clean Modern Coding Workspace Visual */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200/90 rounded-2xl shadow-md overflow-hidden">
                {/* Editor Window Top Bar */}
                <div className="px-4 py-3 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <div className="ml-2 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-mono font-medium text-slate-700 shadow-2xs">
                      <Terminal className="w-3 h-3 text-[#2563EB]" />
                      <span>practice_arena.js</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-200">
                    JavaScript
                  </span>
                </div>

                {/* Editor Code Body */}
                <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 bg-white overflow-x-auto space-y-1">
                  <p className="text-slate-400">// In-browser live execution</p>
                  <p>
                    <span className="text-[#2563EB] font-semibold">function</span> <span className="text-indigo-600 font-semibold">buildProject</span>(problem) &#123;
                  </p>
                  <p className="pl-4">
                    <span className="text-[#2563EB] font-semibold">const</span> solution = <span className="text-emerald-700">codeInBrowser</span>(problem);
                  </p>
                  <p className="pl-4">
                    <span className="text-[#2563EB] font-semibold">return</span> verifyTestSuite(solution);
                  </p>
                  <p>&#125;</p>
                </div>

                {/* Live Output & Test Case Status Box */}
                <div className="p-3.5 bg-slate-50 border-t border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                      <span>All 3 Test Cases Passed</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">100% Score</span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-[11px] font-mono text-slate-600 space-y-1">
                    <div className="flex items-center justify-between text-slate-500">
                      <span>✓ Case 1: Initial state &amp; DOM mounted</span>
                      <span className="text-emerald-600 font-semibold">OK (4ms)</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500">
                      <span>✓ Case 2: Event listener dispatched</span>
                      <span className="text-emerald-600 font-semibold">OK (5ms)</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500">
                      <span>✓ Case 3: Expected result computed</span>
                      <span className="text-emerald-600 font-semibold">OK (3ms)</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

      </main>

    </div>
  );
}

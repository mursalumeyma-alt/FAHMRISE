import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  BarChart3, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Bot, 
  ChevronRight, 
  Rocket, 
  Cpu, 
  Briefcase, 
  FolderGit2,
  TrendingUp,
  Globe,
  Clock,
  Terminal,
  Play,
  Check
} from 'lucide-react';
import AiTutorDrawer from '../components/ai/AiTutorDrawer';
import { BLOG_POSTS } from '../data/blogData';

// Custom Crisp Bilingual Icon: "A 文"
function LanguagesBilingualIcon({ className = "w-6 h-6" }) {
  return (
    <span className={`${className} inline-flex items-center justify-center font-bold text-sm tracking-tight select-none`}>
      <span className="font-extrabold">A</span>
      <span className="text-xs ml-0.5 opacity-90">文</span>
    </span>
  );
}

export default function HomePage() {
  const [aiTutorOpen, setAiTutorOpen] = useState(false);

  // 4 Featured Courses Matching the Visual Reference Exactly
  const referenceFeaturedCourses = [
    {
      id: "web-development",
      title: "Web Development",
      topics: "HTML • CSS • JavaScript",
      badge: "Beginner",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
      iconBg: "bg-[#0B2F2D]",
      icon: <Code2 className="w-6 h-6 text-white" />,
      link: "/courses/frontend-developer-zero-to-job-ready"
    },
    {
      id: "data-analysis",
      title: "Data Analysis",
      topics: "Excel • Power BI • SQL",
      badge: "Intermediate",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
      iconBg: "bg-[#4F46E5]",
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      link: "/courses/data-analysis-spreadsheets"
    },
    {
      id: "islamic-studies",
      title: "Islamic Studies",
      topics: "Quran • Hadith • Tafsir",
      badge: "All Levels",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
      iconBg: "bg-[#059669]",
      icon: <BookOpen className="w-6 h-6 text-white" />,
      link: "/courses?category=Islamic%20Studies"
    },
    {
      id: "languages",
      title: "Languages",
      topics: "Arabic • English • Kiswahili",
      badge: "Beginner",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200/80",
      iconBg: "bg-[#D97706]",
      icon: <LanguagesBilingualIcon className="w-6 h-6 text-white" />,
      link: "/tracks/international-languages"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-[#E5B869] selection:text-[#0B2F2D]">
      
      {/* =========================================================================
          1. HERO SECTION (Deep Teal Background with Student Image)
         ========================================================================= */}
      <section className="relative bg-[#0B2F2D] text-white overflow-hidden pt-12 pb-16 md:pt-18 md:pb-24 lg:pt-20 lg:pb-28">
        {/* Subtle Ambient Light Gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#124542] rounded-full blur-3xl opacity-30 pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#E5B869]/10 rounded-full blur-3xl opacity-30 pointer-events-none -z-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 md:space-y-7 text-center lg:text-left">
              
              {/* Gold Uppercase Subtitle */}
              <div className="inline-flex items-center gap-2">
                <span className="text-[#E5B869] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase">
                  WELCOME TO FAHMRISE
                </span>
              </div>

              {/* Main Headline (Elegant Serif) */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.12]">
                Learn Today,<br />
                Build Tomorrow
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg lg:text-xl text-[#D1E0DE] leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Quality education, flexible learning and endless opportunities — all in one place.
              </p>

              {/* Gold "Explore Courses" Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#E5B869] hover:bg-[#d9ab58] text-[#0B2F2D] font-bold text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <button
                  onClick={() => setAiTutorOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 transition-all"
                >
                  <Bot className="w-4 h-4 text-[#E5B869]" />
                  <span>Try AI Tutor (24/7)</span>
                </button>
              </div>

              {/* Value Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#A2C4C1]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#E5B869]" />
                  <span>Flexible &amp; Self-Paced</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Interactive Sandboxes</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#E5B869]" />
                  <span>Verified Certificates</span>
                </span>
              </div>

            </div>

            {/* Right Visual Column (Student in Teal Hijab with Laptop) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group max-w-sm sm:max-w-md w-full">
                
                {/* Decorative Background Glow / Border Frame */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#E5B869]/30 via-transparent to-[#124542]/40 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500" />

                {/* Arched / Rounded Container Frame */}
                <div className="relative overflow-hidden rounded-3xl border-2 border-[#E5B869]/50 bg-[#072120] shadow-2xl">
                  <img
                    src="/fahmrise-hero-student.png"
                    alt="FAHMRISE student learning at desk with laptop and notebook"
                    className="w-full h-auto object-cover object-center transform group-hover:scale-[1.02] transition duration-500"
                    width="299"
                    height="224"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          2. FEATURED COURSES SECTION (Warm Cream Background)
         ========================================================================= */}
      <section className="bg-[#FAF8F5] py-16 md:py-20 lg:py-24 border-b border-[#EAE2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header: Left Heading & Right "View All Courses" Link */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B2F2D]">
                Featured Courses
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Explore our core learning disciplines designed for practical excellence.
              </p>
            </div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0B2F2D] hover:text-[#06423F] transition-colors group self-start sm:self-auto"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {referenceFeaturedCourses.map((course) => (
              <Link
                key={course.id}
                to={course.link}
                className="group flex flex-col justify-between bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-[#E5B869]/80 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div>
                  {/* Top Row: Icon on Left, Pill Badge on Right */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl ${course.iconBg} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                      {course.icon}
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${course.badgeColor}`}>
                      {course.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#0B2F2D] group-hover:text-[#06423F] transition-colors">
                    {course.title}
                  </h3>

                  {/* Subtitle / Topics */}
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {course.topics}
                  </p>
                </div>

                {/* Bottom Row: Circular Arrow Button */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-[#0B2F2D] transition-colors">
                    Start Learning
                  </span>
                  <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#E5B869] text-slate-700 group-hover:text-[#0B2F2D] flex items-center justify-center transition-colors shadow-sm">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          3. ABOUT & WHY FAHMRISE (id="about")
         ========================================================================= */}
      <section id="about" className="py-16 md:py-24 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="text-xs font-bold text-[#D97706] uppercase tracking-[0.2em]">
              OUR COMMITMENT TO EXCELLENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B2F2D]">
              Why Learn With FAHMRISE?
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We bring together rigorous digital and multidisciplinary education with modern interactive technology, making mastery accessible to every learner worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE2D5] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0B2F2D] text-[#E5B869] flex items-center justify-center font-bold">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0B2F2D]">Practical Competency</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Learn by authoring code, building database queries, and solving realistic problem sets rather than passive lectures.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE2D5] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0B2F2D] text-[#E5B869] flex items-center justify-center font-bold">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0B2F2D]">Socratic AI Tutor</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Receive personalized guidance, debugging assistance, and concept breakdowns whenever you encounter a learning blocker.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE2D5] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0B2F2D] text-[#E5B869] flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0B2F2D]">Practice Arena</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Work through 10 full browser-based JavaScript and web projects with live rendering and test grading.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE2D5] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0B2F2D] text-[#E5B869] flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0B2F2D]">Verified Credentials</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Earn cryptographic certificates of completion that can be publicly validated by employers and institutions.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          4. PRACTICE ARENA & INTERACTIVE CODE PREVIEW (Programiz-inspired)
         ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#FAF8F5] border-b border-[#EAE2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B2F2D] text-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden border border-[#165b57]">
            
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5B869]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#124542] rounded-full blur-2xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              
              {/* Left Column: Description & CTAs */}
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold text-[#E5B869] uppercase tracking-widest inline-flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>INTERACTIVE CODE PRACTICE</span>
                </span>
                
                <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
                  Learn by Coding in Your Browser with Instant Tests
                </h3>
                
                <p className="text-sm sm:text-base text-[#D1E0DE] leading-relaxed">
                  Passive video watching creates the illusion of skill. In FAHMRISE, you solve realistic code challenges, write real JavaScript and SQL, and get immediate automated test feedback on every execution.
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    to="/practice"
                    className="px-6 py-3.5 rounded-xl bg-[#E5B869] hover:bg-[#d9ab58] text-[#0B2F2D] font-bold text-sm shadow-md transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>Launch Practice Arena (10 Projects)</span>
                  </Link>
                  <Link
                    to="/fullstack-projects"
                    className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-all flex items-center gap-2"
                  >
                    <Rocket className="w-4 h-4 text-[#E5B869]" />
                    <span>Full Stack Projects</span>
                  </Link>
                </div>

                <div className="pt-3 flex items-center gap-6 text-xs text-[#A2C4C1]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Instant Automated Grading</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E5B869]" />
                    <span>Zero Setup Required</span>
                  </span>
                </div>
              </div>

              {/* Right Column: Realistic Interactive Code Sandbox Mockup */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
                  {/* Window Bar */}
                  <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 font-mono text-xs text-slate-400">practice_exercise.js</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                      JavaScript • ES2026
                    </span>
                  </div>

                  {/* Code Editor Body */}
                  <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950 overflow-x-auto">
                    <p className="text-slate-500">// Problem: Calculate gross margin percentage</p>
                    <p className="mt-1">
                      <span className="text-purple-400">function</span> <span className="text-amber-300">calculateGrossMargin</span>(revenue, cogs) &#123;
                    </p>
                    <p className="pl-4 text-slate-400">
                      <span className="text-purple-400">if</span> (revenue &lt;= 0) <span className="text-purple-400">return</span> <span className="text-emerald-300">'0.0%'</span>;
                    </p>
                    <p className="pl-4">
                      <span className="text-purple-400">const</span> grossProfit = revenue - cogs;
                    </p>
                    <p className="pl-4">
                      <span className="text-purple-400">return</span> ((grossProfit / revenue) * 100).<span className="text-blue-300">toFixed</span>(1) + <span className="text-emerald-300">'%'</span>;
                    </p>
                    <p>&#125;</p>
                  </div>

                  {/* Test Feedback Bar */}
                  <div className="p-3.5 bg-slate-900/90 border-t border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="font-semibold flex items-center gap-1.5 text-emerald-400">
                        <Check className="w-4 h-4 text-emerald-400 font-bold" />
                        <span>All 2 Test Cases Passed (12ms)</span>
                      </span>
                      <span className="text-[10px] text-slate-400">100% Correct</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 pl-5">
                      ✓ calculateGrossMargin(1000, 400) == "60.0%"
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          5. LATEST FROM THE BLOG (Programiz-inspired Educational Articles)
         ========================================================================= */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D97706] uppercase tracking-[0.2em] mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>EDUCATIONAL JOURNAL &amp; TUTORIALS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B2F2D]">
                Latest from the FAHMRISE Blog
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">
                Practical engineering roadmaps, SQL optimization guides, and learning science insights written by our academic team.
              </p>
            </div>

            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0B2F2D] hover:text-[#06423F] transition-colors group self-start sm:self-auto"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <article
                key={post.id}
                className="group flex flex-col justify-between bg-[#FAF8F5] border border-[#EAE2D5] rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-[#E5B869] transition-all duration-300 transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-white text-[#0B2F2D] text-[11px] font-bold uppercase tracking-wider border border-slate-200">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0B2F2D] group-hover:text-[#06423F] transition-colors leading-snug">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 mt-2.5 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    {post.publishedDate}
                  </span>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0B2F2D] group-hover:text-[#E5B869] transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>


      {/* Socratic AI Tutor Drawer */}
      <AiTutorDrawer
        isOpen={aiTutorOpen}
        onClose={() => setAiTutorOpen(false)}
        currentLesson={{ 
          title: "FAHMRISE Learning Platform", 
          summary: "Explore courses, practice real projects, and develop verified skills." 
        }}
      />

    </div>
  );
}

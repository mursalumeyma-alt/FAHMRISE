import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Code2, 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Zap, 
  Award, 
  Smartphone, 
  Play, 
  ChevronRight, 
  Flame, 
  Globe, 
  Terminal, 
  Layers, 
  TrendingUp, 
  Cpu, 
  BookMarked, 
  Briefcase,
  FolderGit2
} from 'lucide-react';
import Badge from '../components/common/Badge';
import AiTutorDrawer from '../components/ai/AiTutorDrawer';

// Custom Crisp React Atom Icon
function ReactIcon({ className = "w-6 h-6" }) {
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

export default function HomePage() {
  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [demoCode, setDemoCode] = useState(`// FAHMRISE Interactive Learning\nconst student = {\n  goal: "Master Full-Stack Web Development",\n  courses: ["HTML From Zero", "CSS From Zero", "JavaScript From Zero"],\n  projects: 10,\n  status: "Rising"\n};\nconsole.log("Welcome to FAHMRISE!");`);

  const featuredCourses = [
    {
      id: "fullstack-developer-bundle",
      title: "Full-Stack Developer From Zero to Job-Ready",
      subtitle: "Complete 2-Course Programme: Frontend React + Backend Node.js, Express, PostgreSQL & Docker.",
      badge: "Full-Stack Master Track • Save KSh 5,000",
      price: 45000,
      paymentType: "one_time",
      color: "from-blue-700 via-indigo-900 to-emerald-900",
      lessons: 20,
      hours: "90-135 Hours (9-12 Mos)",
      category: "Technology"
    },
    {
      id: "data-analytics-professional-programme",
      title: "Data Analytics & Business Intelligence Professional Programme",
      subtitle: "Complete 5-Course Master Track: Spreadsheets, Power BI, SQL, Python & Career Portfolio.",
      badge: "5-Course Master Track • Save KSh 12,000",
      price: 35000,
      paymentType: "one_time",
      color: "from-teal-600 via-indigo-900 to-slate-950",
      lessons: 48,
      hours: "100-130 Hours (4-6 Mos)",
      category: "Technology"
    },
    {
      id: "frontend-developer-zero-to-job-ready",
      title: "Frontend Developer From Zero to Job-Ready",
      subtitle: "Web history, HTML, CSS, JavaScript, Git, React, TypeScript, Next.js & career prep.",
      badge: "Flagship • 10 Modules",
      price: 20000,
      paymentType: "one_time",
      color: "from-blue-600 to-indigo-800",
      lessons: 10,
      hours: "40-60 Hours (6 Mos)",
      category: "Technology"
    },
    {
      id: "backend-developer-zero-to-job-ready",
      title: "Backend Developer From Zero to Job-Ready",
      subtitle: "Server architecture, Node.js, Express, SQL, databases, JWT auth, security, testing & Docker.",
      badge: "Flagship • 10 Modules",
      price: 30000,
      paymentType: "one_time",
      color: "from-emerald-700 to-slate-900",
      lessons: 10,
      hours: "50-75 Hours (6-9 Mos)",
      category: "Technology"
    },
    {
      id: "data-analysis-spreadsheets",
      title: "Data Analysis & Spreadsheet Mastery",
      subtitle: "Organise, analyse, and present data using spreadsheets, Pivot Tables & executive reporting.",
      badge: "Core Track • 10 Modules",
      price: 8000,
      paymentType: "one_time",
      color: "from-teal-600 to-emerald-900",
      lessons: 10,
      hours: "20-30 Hours",
      category: "Technology"
    },
    {
      id: "power-bi-business-intelligence",
      title: "Power BI & Business Intelligence",
      subtitle: "Connect data, build Star Schemas, write DAX formulas & create executive dashboards.",
      badge: "BI Specialization • 10 Modules",
      price: 12000,
      paymentType: "one_time",
      color: "from-amber-600 to-yellow-800",
      lessons: 10,
      hours: "25-35 Hours",
      category: "Technology"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-emerald-600/15 via-teal-500/10 to-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Understand. Learn. Rise.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
              Empower Your Mind.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400">
                Rise Through Knowledge.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              FAHMRISE delivers practical, high-impact digital skills and multidisciplinary courses with Socratic AI guidance, in-browser practice, and verified certifications.
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/courses"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-base shadow-glow flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Course Catalog</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/practice"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-base border border-slate-800 hover:border-emerald-500/40 flex items-center justify-center gap-2.5 transition-all"
              >
                <Code2 className="w-5 h-5 text-emerald-400" />
                <span>Practice Arena (10 Projects)</span>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> M-Pesa STK Push & Card Access
              </span>
              <span className="flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-teal-400" /> 24/7 Socratic AI Tutor
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" /> Verified Course Certificates
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MULTIDISCIPLINARY DISCIPLINES BAR */}
      <section className="border-y border-slate-900 bg-slate-950/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
            Multidisciplinary Learning Categories on FAHMRISE
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {/* 1. Technology & Code */}
            <Link 
              to="/courses?category=Technology"
              className="flex flex-col items-center p-3.5 sm:p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-emerald-500/50 hover:bg-slate-900/80 text-center space-y-2 transition-all group"
            >
              <Cpu className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">Technology</span>
              <span className="text-[10px] text-emerald-400 font-semibold">10 Courses Live</span>
            </Link>

            {/* 2. Projects */}
            <Link 
              to="/courses?category=Projects"
              className="flex flex-col items-center p-3.5 sm:p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-violet-500/50 hover:bg-slate-900/80 text-center space-y-2 transition-all group"
            >
              <FolderGit2 className="w-6 h-6 text-violet-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-white group-hover:text-violet-300 transition-colors">Projects</span>
              <span className="text-[10px] text-violet-400 font-semibold">10 Projects Live</span>
            </Link>

            {/* 3. Islamic Studies */}
            <Link 
              to="/courses?category=Islamic%20Studies"
              className="flex flex-col items-center p-3.5 sm:p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-teal-500/50 hover:bg-slate-900/80 text-center space-y-2 transition-all group"
            >
              <BookMarked className="w-6 h-6 text-teal-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-white group-hover:text-teal-300 transition-colors">Islamic Studies</span>
              <span className="text-[10px] text-teal-400 font-semibold">6 Courses Live</span>
            </Link>

            {/* 4. Business & Ventures */}
            <Link 
              to="/courses?category=Business"
              className="flex flex-col items-center p-3.5 sm:p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-amber-500/50 hover:bg-slate-900/80 text-center space-y-2 transition-all group"
            >
              <Briefcase className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">Business</span>
              <span className="text-[10px] text-amber-400 font-semibold">3 Courses Live</span>
            </Link>

            {/* 5. International Languages */}
            <Link 
              to="/courses?category=International%20Languages"
              className="flex flex-col items-center p-3.5 sm:p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-cyan-500/50 hover:bg-slate-900/80 text-center space-y-2 transition-all group"
            >
              <Globe className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">International Languages</span>
              <span className="text-[10px] text-cyan-400 font-semibold">6 Language Tracks</span>
            </Link>

            {/* 6. Career Skills */}
            <Link 
              to="/courses?category=Career%20Skills"
              className="flex flex-col items-center p-3.5 sm:p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-rose-500/50 hover:bg-slate-900/80 text-center space-y-2 transition-all group"
            >
              <TrendingUp className="w-6 h-6 text-rose-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors">Career Skills</span>
              <span className="text-[10px] text-rose-400 font-semibold">3 Courses Live</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED WEB DEVELOPMENT COURSES */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Comprehensive Curriculum
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Featured Technology & Engineering Tracks
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Master frontend engineering, scalable backend microservices, database design, cybersecurity, and applied data analysis with hands-on practice.
            </p>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>View Full Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 hover:shadow-2xl transition-all group"
            >
              <div className={`p-6 bg-gradient-to-br ${course.color} relative`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-950/60 text-white backdrop-blur">
                    {course.badge}
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-black text-white">
                      KSh {course.price.toLocaleString()}
                    </span>
                    <span className="block text-[10px] text-slate-300 font-medium">
                      {course.paymentType === 'one_time' ? 'One-Time' : '/ month'}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-200 mt-1 opacity-90">
                  {course.subtitle}
                </p>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>{course.lessons} In-depth Lessons</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Certificate Included</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Lifetime Access</span>
                  <Link
                    to={`/courses/${course.id}`}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-glow transition-all flex items-center gap-1"
                  >
                    <span>View Course</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PRACTICE ARENA SPOTLIGHT (10 REAL JS PROJECTS) */}
      <section className="py-16 bg-slate-900/40 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Hands-On Mastery
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Practice Arena: 10 Real JavaScript Projects
            </h2>
            <p className="text-slate-400 text-sm">
              Level up progressively from beginner DOM widgets to complex full-stack API apps.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { num: "01", name: "Interactive To-Do List", lvl: "Beginner" },
              { num: "02", name: "Modern Calculator", lvl: "Beginner" },
              { num: "03", name: "Rock Paper Scissors", lvl: "Beginner" },
              { num: "04", name: "Timed Quiz App", lvl: "Intermediate" },
              { num: "05", name: "Random Joke (REST API)", lvl: "Intermediate" },
              { num: "06", name: "Live Weather Explorer", lvl: "Intermediate" },
              { num: "07", name: "Expense Tracker", lvl: "Intermediate" },
              { num: "08", name: "Movie Search App", lvl: "Advanced" },
              { num: "09", name: "E-Commerce Cart", lvl: "Advanced" },
              { num: "10", name: "Analytics Dashboard", lvl: "Capstone" }
            ].map((proj) => (
              <Link
                key={proj.num}
                to={`/practice/project-${parseInt(proj.num)}`}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all group flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">{proj.num}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">{proj.lvl}</span>
                </div>
                <p className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 transition-colors">
                  {proj.name}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/practice"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold shadow-glow transition-all"
            >
              <Code2 className="w-4 h-4" />
              <span>Launch Practice Arena</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. THE 4-STEP FAHMRISE LEARNING CYCLE */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            The FAHMRISE Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Understand. Learn. Rise.
          </h2>
          <p className="text-slate-400 text-sm">
            Our 4-step pedagogical cycle ensures long-term skill retention and real-world execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              1
            </div>
            <h3 className="text-lg font-bold text-white">1. Understand</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Read concise, structured chapters crafted with real-world analogies and clear visual mental models.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold">
              2
            </div>
            <h3 className="text-lg font-bold text-white">2. AI Tutor Support</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stuck on a syntax bug or concept? Ask the FAHMRISE AI Tutor for Socratic hints, code inspection, and voice explanations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              3
            </div>
            <h3 className="text-lg font-bold text-white">3. Practice & Build</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Write code in browser, execute real test cases, test DOM outputs in real-time, and pass checkpoint quizzes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
              4
            </div>
            <h3 className="text-lg font-bold text-white">4. Rise</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete capstone projects, earn verified credentials, build your digital portfolio, and advance your career.
            </p>
          </div>
        </div>
      </section>

      {/* AI Tutor Drawer Trigger */}
      <AiTutorDrawer
        isOpen={aiTutorOpen}
        onClose={() => setAiTutorOpen(false)}
        currentLesson={{ title: "FAHMRISE Web Overview", summary: "Introduction to HTML, CSS, JavaScript, and practice projects." }}
      />

    </div>
  );
}

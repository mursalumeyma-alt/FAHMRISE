import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom';
import { 
  BookOpen, 
  Code2, 
  Bot, 
  Award, 
  CheckCircle2, 
  Clock, 
  Star, 
  ShieldCheck, 
  ChevronRight, 
  Lock, 
  Sparkles, 
  Users, 
  FileCode, 
  ArrowRight,
  Zap,
  Play,
  Rocket,
  Globe,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CoursesDB } from '../data/coursesData';
import Badge from '../components/common/Badge';

export default function BookProductPage() {
  const { bookId } = useParams();
  const targetId = (bookId || 'html-from-zero').trim();
  const { user, isEnrolledIn, refreshEnrollments } = useAuth();
  const navigate = useNavigate();

  // Instant local resolution to prevent stuck spinners
  const initialLocalCourse = CoursesDB.getCourseById(targetId) || null;
  const [course, setCourse] = useState(initialLocalCourse);
  const [loading, setLoading] = useState(!initialLocalCourse);
  const [loadError, setLoadError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [activeTab, setActiveTab] = useState('curriculum'); // curriculum, outcomes, details, projects

  const isComingSoon = course ? Boolean(course.isComingSoon || course.status === 'coming_soon' || course.price === null) : false;
  const isEnrolled = isEnrolledIn(targetId);
  const isFree = course ? (!isComingSoon && (course.price === 0 || !course.requiresPayment || course.isFree || course.category === 'Islamic Studies' || (course.category === 'International Languages' && course.price === 0))) : false;

  // Always reset scroll to the top of the course product page on mount or ID change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [targetId]);

  useEffect(() => {
    let isMounted = true;

    async function loadCourse() {
      // 1. Resolve local canonical course first
      const localCourse = CoursesDB.getCourseById(targetId);
      if (localCourse && isMounted) {
        setCourse(localCourse);
        setLoading(false);
      } else if (!localCourse && isMounted) {
        setLoading(true);
      }
      setLoadError(null);

      // 2. Fetch fresh API data in background
      try {
        const data = await api.books.getById(targetId);
        if (isMounted) {
          const resolvedCourse = (data && (data.course || data.book)) || localCourse;
          if (resolvedCourse) {
            setCourse(resolvedCourse);
          } else if (!localCourse) {
            setLoadError('Course details could not be found.');
          }
        }
      } catch (err) {
        console.warn('API fetch for course syllabus notice:', err.message);
        if (isMounted && !localCourse) {
          setLoadError(err.message || 'Failed to load course syllabus.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCourse();

    return () => {
      isMounted = false;
    };
  }, [targetId, retryCount]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading course syllabus...</span>
        </div>
      </div>
    );
  }

  if (!course) {
    const raw = String(targetId || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    let redirectToCategory = null;
    if (raw.includes('react') || raw.includes('frontend') || raw.includes('html') || raw.includes('css') || raw.includes('javascript') || raw.includes('backend') || raw.includes('fullstack') || raw.includes('sql') || raw.includes('python') || raw.includes('powerbi') || raw.includes('cyber')) {
      redirectToCategory = 'Technology';
    } else if (raw.includes('arabic') || raw.includes('language') || raw.includes('international') || raw.includes('swahili') || raw.includes('french') || raw.includes('english') || raw.includes('japanese') || raw.includes('somali')) {
      redirectToCategory = 'International Languages';
    } else if (raw.includes('career') || raw.includes('skill')) {
      redirectToCategory = 'Career Skills';
    } else if (raw.includes('project')) {
      redirectToCategory = 'Projects';
    } else if (raw.includes('islamic') || raw.includes('hadith') || raw.includes('quran') || raw.includes('tajweed')) {
      redirectToCategory = 'Islamic Studies';
    } else if (raw.includes('business')) {
      redirectToCategory = 'Business';
    } else if (raw.includes('tech')) {
      redirectToCategory = 'Technology';
    }

    if (redirectToCategory) {
      return <Navigate to={`/courses?category=${encodeURIComponent(redirectToCategory)}`} replace />;
    }

    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4 px-4 text-center">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 max-w-md w-full space-y-3 shadow-2xl">
          <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
          <h2 className="text-lg font-bold">Course Not Found</h2>
          <p className="text-xs text-slate-400">
            {loadError || `We couldn't locate a course matching "${targetId}". Please verify the link or browse our catalog.`}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setRetryCount(k => k + 1)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Loading</span>
            </button>
            <Link to="/courses" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold text-xs shadow-glow transition-all">
              Browse Course Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleEnrollClick = async () => {
    if (isComingSoon) {
      navigate('/courses?category=International%20Languages');
      return;
    }
    if (isEnrolled) {
      navigate(`/reader/${course.id}`);
    } else if (isFree) {
      if (!user) {
        navigate(`/login?redirect=/reader/${course.id}`);
      } else {
        try {
          await api.books.enrollFree(course.id);
          if (refreshEnrollments) await refreshEnrollments();
        } catch (e) {
          // Proceed to reader
        }
        navigate(`/reader/${course.id}`);
      }
    } else if (!user) {
      navigate(`/login?redirect=/checkout/${course.id}`);
    } else {
      navigate(`/checkout/${course.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link to="/" className="hover:text-emerald-400">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/courses" className="hover:text-emerald-400">Courses</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white font-medium">{course.title}</span>
        </div>

        {/* Top Product Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Course Information & Tabs */}
          <div className="lg:col-span-8 space-y-8">
            
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="primary" size="sm">{course.level || 'Beginner'}</Badge>
                <Badge variant="amber" size="sm">{course.category}</Badge>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{course.rating || '4.95'} ({course.reviewsCount || 420} ratings)</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {course.subtitle}
              </p>

              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl text-xs text-slate-400 flex flex-wrap items-center gap-6">
                <div>
                  <span className="text-slate-500 block">Author</span>
                  <span className="font-semibold text-slate-200">{course.author || 'FAHMRISE Academic Team'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Lessons</span>
                  <span className="font-semibold text-slate-200">{course.totalLessons || (course.lessons?.length) || 10} Chapters</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Estimated Time</span>
                  <span className="font-semibold text-slate-200">{course.estimatedHours || '5 Hours'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Platform</span>
                  <span className="font-semibold text-emerald-400">FAHMRISE Web & Mobile</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-800 space-x-6 text-sm">
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`pb-3 font-semibold transition-colors border-b-2 ${
                  activeTab === 'curriculum'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Curriculum & Syllabus
              </button>
              <button
                onClick={() => setActiveTab('outcomes')}
                className={`pb-3 font-semibold transition-colors border-b-2 ${
                  activeTab === 'outcomes'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Learning Outcomes
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 font-semibold transition-colors border-b-2 ${
                  activeTab === 'details'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Prerequisites & Audience
              </button>
              {(course.fullstackProjects || course.id === 'fullstack-developer-bundle') && (
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`pb-3 font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
                    activeTab === 'projects'
                      ? 'border-emerald-500 text-emerald-400'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Rocket className="w-4 h-4 text-emerald-400" />
                  <span>Full Stack Projects (6)</span>
                </button>
              )}
            </div>

            {/* Tab 1: Curriculum & Syllabus */}
            {activeTab === 'curriculum' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2">
                  <span>{(course.lessons || []).length} structured chapters with practice challenges and quizzes</span>
                  <span className="text-emerald-400 font-semibold">Lesson 1 Free Preview</span>
                </div>

                {(course.lessons || []).length === 0 ? (
                  <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
                    <BookOpen className="w-8 h-8 text-slate-600 mx-auto" />
                    <h4 className="text-sm font-bold text-white">Syllabus In Preparation</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      {isComingSoon 
                        ? 'This course is currently in curriculum development. Check back soon for released modules.'
                        : 'The structured lessons for this course are being finalized. Check back shortly.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {(course.lessons || []).map((lesson, idx) => (
                      <div
                        key={lesson.id}
                        className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-mono text-xs font-bold text-slate-300">
                            {lesson.number || idx + 1}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-100">
                              {lesson.title}
                            </h4>
                            <p className="text-xs text-slate-400">
                              {lesson.subtitle || lesson.summary}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-xs text-slate-500 hidden sm:inline">{lesson.readingTime || '12 min'}</span>
                          {lesson.number === 1 || isEnrolled ? (
                            <Link
                              to={`/reader/${course.id}/${lesson.id}`}
                              className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold border border-emerald-500/30 flex items-center gap-1"
                            >
                              <Play className="w-3 h-3" />
                              <span>{lesson.number === 1 ? 'Preview' : 'Read'}</span>
                            </Link>
                          ) : (
                            <span className="p-1.5 text-slate-600">
                              <Lock className="w-4 h-4" />
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Learning Outcomes */}
            {activeTab === 'outcomes' && (
              <div className="space-y-4 animate-in fade-in">
                <h3 className="text-base font-bold text-white">What You Will Master:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(course.learningOutcomes || []).map((outcome, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300 leading-relaxed">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Prerequisites & Audience */}
            {activeTab === 'details' && (
              <div className="space-y-6 animate-in fade-in text-xs text-slate-300 leading-relaxed">
                <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">Target Audience:</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    {(course.targetAudience || []).map((aud, idx) => (
                      <li key={idx}>{aud}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">Prerequisites:</h4>
                  <p className="text-slate-400">{course.prerequisites || 'Zero prior background required.'}</p>
                </div>
              </div>
            )}

            {/* Tab 4: 6 Full Stack Projects */}
            {activeTab === 'projects' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Rocket className="w-4 h-4 text-emerald-400" />
                      <span>6 Progressive Full Stack Projects with Live Deployment</span>
                    </h3>
                    <p className="text-xs text-slate-300">
                      Build from semantic layouts to authenticated REST APIs, SQL databases, and cloud deployment.
                    </p>
                  </div>
                  <Link
                    to="/fullstack-projects"
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-glow hover:bg-emerald-400 transition-all flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span>Open Projects Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(CoursesDB.getFullstackProjects() || []).map((p) => (
                    <Link
                      key={p.id}
                      to={`/fullstack-projects/${p.id}`}
                      className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between space-y-2 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="w-5 h-5 rounded bg-slate-800 text-[11px] font-mono font-bold text-slate-300 flex items-center justify-center">
                          {p.projectNumber}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                          p.level === 'Beginner' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                          p.level === 'Intermediate' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                          'bg-purple-500/20 text-purple-300 border-purple-500/30'
                        }`}>
                          {p.level}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {p.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">
                          {p.shortDescription}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                        <span>{p.estimatedHours}</span>
                        <span className="text-emerald-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          <span>Inspect Project</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Pricing & Enrollment Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl backdrop-blur">
              
              {/* Cover Header */}
              <div className={`p-6 rounded-xl bg-gradient-to-br ${course.coverColor || 'from-emerald-700 to-slate-900'} text-white space-y-2 text-center`}>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-950/60">
                  {course.coverBadge || course.level}
                </span>
                <h3 className="text-xl font-bold">{course.title}</h3>
                <p className="text-xs opacity-90">{course.subtitle}</p>
              </div>

              {/* Price Display */}
              <div className="space-y-2">
                <span className="text-xs text-slate-400 font-semibold block">
                  {isComingSoon
                    ? 'Course Availability'
                    : isFree
                    ? 'Course Tuition'
                    : course.paymentType === 'one_time' || course.id === 'frontend-developer-zero-to-job-ready'
                    ? 'One-Time Complete Course Tuition'
                    : 'Course Tuition'}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-emerald-400">
                    {isComingSoon ? 'To Be Announced' : isFree ? 'FREE' : course.price > 0 ? `${course.currency || 'KSh'} ${course.price.toLocaleString()}` : 'FREE'}
                  </span>
                  {isComingSoon ? (
                    <span className="text-[11px] font-bold text-blue-300 bg-blue-950/90 px-2 py-0.5 rounded border border-blue-500/40">
                      Coming Soon
                    </span>
                  ) : isFree ? (
                    <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-500/40">
                      100% Free Access
                    </span>
                  ) : course.priceUSD ? (
                    <span className="text-sm text-slate-400">
                      (~${course.priceUSD} USD)
                    </span>
                  ) : null}
                </div>

                {isComingSoon ? (
                  <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-300 space-y-1">
                    <p className="font-bold">
                      Planned for Upcoming Release.
                    </p>
                    <p className="text-[11px] text-slate-300">
                      This course is currently in curriculum development. Check back soon or explore our available active courses.
                    </p>
                  </div>
                ) : isFree ? (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 space-y-1">
                    <p className="font-bold">
                      100% Free Access — No Payment Required.
                    </p>
                    <p className="text-[11px] text-slate-300">
                      Includes all {course.totalLessons || (course.lessons?.length) || 7} modules, reflection exercises, quizzes, and verified certificate of completion.
                    </p>
                  </div>
                ) : course.paymentType === 'one_time' || course.id === 'frontend-developer-zero-to-job-ready' ? (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 space-y-1">
                    <p className="font-bold">
                      KSh {course.price?.toLocaleString()} — One-time payment for the complete course.
                    </p>
                    <p className="text-[11px] text-slate-300">
                      Recommended duration: <strong className="text-white">{course.recommendedDuration || '6 months'}</strong>. Includes all {course.totalLessons || (course.lessons?.length) || 10} modules, projects, quizzes, and certificate with lifetime flexible access.
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
                    <p className="font-semibold text-slate-300">
                      Full access with 24/7 AI tutor and verified certificate.
                    </p>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <div>
                <button
                  onClick={handleEnrollClick}
                  className={`w-full py-4 rounded-xl font-extrabold text-sm shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isComingSoon
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                  }`}
                >
                  {isComingSoon ? (
                    <>
                      <span>Coming Soon — Back to Catalog</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  ) : isEnrolled ? (
                    <>
                      <span>Continue Learning</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : isFree ? (
                    <>
                      <span>Enrol for Free & Start Learning</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Enroll & Unlock Course</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Course Features List */}
              <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                <p className="font-semibold text-white">This course includes:</p>
                {(course.includes || [
                  `${course.totalLessons || 10} in-depth interactive lessons`,
                  'Hands-on practice exercises with instant testing',
                  'Checkpoint quizzes with detailed explanations',
                  '24/7 FAHMRISE AI Tutor with Voice speech',
                  'Official Verified Certificate of Completion',
                  'Lifetime updates & mobile access'
                ]).map((inc, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>

              {/* Safe Payment Trust Guarantee */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Safaricom M-Pesa STK & Card</span>
                </div>
                <p>Instant activation upon verified payment. Safe server-side checkout.</p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

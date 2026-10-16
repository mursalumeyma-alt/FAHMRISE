import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { 
  Code2, 
  Server, 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Github, 
  Terminal, 
  Layers, 
  Globe, 
  Activity, 
  Check, 
  Copy, 
  ChevronRight, 
  Rocket, 
  Search, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Lock, 
  RefreshCw, 
  FileCode, 
  Folder, 
  BookOpen,
  HelpCircle,
  AlertTriangle,
  Send,
  Zap,
  Info
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CoursesDB } from '../data/coursesData';
import Badge from '../components/common/Badge';

export default function FullStackProjectsPage() {
  const { projectId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(projectId || 'fsp-01-personal-portfolio');
  const [activeProject, setActiveProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'milestones', 'structure', 'testing', 'deployment', 'submit'
  const [filterLevel, setFilterLevel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Submission & Probe Form State
  const [repoUrl, setRepoUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [healthUrl, setHealthUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [probing, setProbing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [probeResult, setProbeResult] = useState(null);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [userSubmissions, setUserSubmissions] = useState({});

  // Checklist state saved in localStorage
  const [completedChecklist, setCompletedChecklist] = useState({});

  // Load all projects and current submissions
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await api.fullstackProjects.getAll();
        const list = res.projects || CoursesDB.getFullstackProjects() || [];
        setProjects(list);

        // Determine active project from URL param or default
        const targetId = projectId || searchParams.get('id') || 'fsp-01-personal-portfolio';
        const found = list.find(p => p.id === targetId || p.slug === targetId) || list[0];
        setActiveProject(found);
        setSelectedProjectId(found?.id || 'fsp-01-personal-portfolio');

        // Populate submission state if user is logged in
        if (user) {
          try {
            const subRes = await api.fullstackProjects.getMySubmissions();
            if (subRes && Array.isArray(subRes.submissions)) {
              const map = {};
              subRes.submissions.forEach(s => {
                map[s.projectId] = s;
              });
              setUserSubmissions(map);

              // Pre-fill form if existing submission
              if (found && map[found.id]) {
                const existing = map[found.id];
                setRepoUrl(existing.repoUrl || '');
                setLiveUrl(existing.liveUrl || '');
                setHealthUrl(existing.healthUrl || '');
                setNotes(existing.notes || '');
              }
            }
          } catch (e) {
            console.warn('Failed to load user submissions:', e);
          }
        }
      } catch (err) {
        console.error('Failed to load full stack projects:', err);
        const fallback = CoursesDB.getFullstackProjects() || [];
        setProjects(fallback);
        setActiveProject(fallback[0] || null);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [projectId, user]);

  // Update selected project handler
  const handleSelectProject = (proj) => {
    setActiveProject(proj);
    setSelectedProjectId(proj.id);
    navigate(`/fullstack-projects/${proj.id}`, { replace: true });
    setProbeResult(null);
    setSubmitMessage(null);

    // Pre-fill submission form if already submitted
    const existing = userSubmissions[proj.id];
    if (existing) {
      setRepoUrl(existing.repoUrl || '');
      setLiveUrl(existing.liveUrl || '');
      setHealthUrl(existing.healthUrl || '');
      setNotes(existing.notes || '');
    } else {
      setRepoUrl('');
      setLiveUrl('');
      setHealthUrl(proj.deploymentGuide?.healthCheckEndpoint ? `https://your-api.onrender.com${proj.deploymentGuide.healthCheckEndpoint}` : '');
      setNotes('');
    }
  };

  // Toggle checklist item
  const toggleChecklistItem = (itemIdx) => {
    const key = `${selectedProjectId}_item_${itemIdx}`;
    const next = { ...completedChecklist, [key]: !completedChecklist[key] };
    setCompletedChecklist(next);
    try {
      localStorage.setItem('fahmrise_fsp_checklist', JSON.stringify(next));
    } catch (e) {}
  };

  // Initialize checklist from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fahmrise_fsp_checklist');
      if (saved) setCompletedChecklist(JSON.parse(saved));
    } catch (e) {}
  }, []);

  // Handle Live Deployment Probe
  const handleProbeDeployment = async (e) => {
    e?.preventDefault();
    if (!liveUrl.trim()) {
      setProbeResult({
        success: false,
        error: 'Please enter a valid Live Deployment URL before probing.'
      });
      return;
    }

    setProbing(true);
    setProbeResult(null);
    setSubmitMessage(null);

    try {
      const res = await api.fullstackProjects.verifyDeployment(selectedProjectId, {
        liveUrl: liveUrl.trim(),
        healthUrl: healthUrl.trim() || undefined
      });
      setProbeResult(res);
    } catch (err) {
      setProbeResult({
        success: false,
        verified: false,
        error: err.message || 'Live probe failed. Server may be offline or unreachable.'
      });
    } finally {
      setProbing(false);
    }
  };

  // Handle Project Submission
  const handleSubmitProject = async (e) => {
    e?.preventDefault();
    if (!user) {
      navigate('/login?redirect=/fullstack-projects/' + selectedProjectId);
      return;
    }

    if (!repoUrl.trim() || !liveUrl.trim()) {
      setSubmitMessage({
        type: 'error',
        text: 'Both GitHub Repository URL and Live Deployment URL are required.'
      });
      return;
    }

    setSubmitting(true);
    setSubmitMessage(null);

    try {
      const res = await api.fullstackProjects.submitProject(selectedProjectId, {
        repoUrl: repoUrl.trim(),
        liveUrl: liveUrl.trim(),
        healthUrl: healthUrl.trim() || undefined,
        notes: notes.trim(),
        checklist: completedChecklist
      });

      if (res && res.success) {
        setUserSubmissions(prev => ({
          ...prev,
          [selectedProjectId]: res.submission
        }));
        setSubmitMessage({
          type: res.verified ? 'success' : 'warning',
          text: res.message
        });
        if (res.submission?.verificationDetails) {
          setProbeResult({
            success: true,
            verified: res.verified,
            ...res.submission.verificationDetails
          });
        }
      } else {
        setSubmitMessage({
          type: 'error',
          text: res.error || 'Submission failed. Please check your URLs.'
        });
      }
    } catch (err) {
      setSubmitMessage({
        type: 'error',
        text: err.message || 'Submission error. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Filter projects by level and search
  const filteredProjects = projects.filter(p => {
    const matchesLevel = filterLevel === 'All' || p.level.toLowerCase() === filterLevel.toLowerCase();
    const matchesSearch = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.level.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const currentSubmission = userSubmissions[selectedProjectId];
  const isVerifiedLive = currentSubmission?.status === 'deployed_verified';
  const isPendingVerification = currentSubmission?.status === 'pending_verification';

  // Overall verified count
  const verifiedCount = Object.values(userSubmissions).filter(s => s.status === 'deployed_verified').length;

  if (loading && !activeProject) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="font-semibold">Loading Full Stack Projects Pathway...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      
      {/* Hero Header */}
      <div className="border-b border-slate-800/80 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumb & Track Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Link to="/courses" className="hover:text-emerald-400 transition-colors">Courses</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <Link to="/courses/fullstack-developer-bundle" className="hover:text-emerald-400 transition-colors">Full-Stack Track</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-emerald-400 font-semibold">Practical Projects & Deployment</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
                <Rocket className="w-3.5 h-3.5 text-emerald-400" />
                <span>6 Production Projects</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 shadow-sm">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>Mandatory Live Deployment Probing</span>
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="max-w-3xl space-y-3">
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Full Stack Development Projects</span>
              <span className="text-xs uppercase px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold tracking-wider">
                Capstone Pathway
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Progress from semantic client layouts to distributed REST APIs, authenticated relational databases, rate-limited payments, and live cloud deployment. Every project requires a verified public URL.
            </p>
          </div>

          {/* Progress Banner */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Certification Deployment Progress</span>
              </div>
              <p className="text-xs text-slate-400">
                {verifiedCount} of 6 projects verified live in production. Passing local builds are not certified until deployed.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-full sm:w-48 bg-slate-950 rounded-full h-3 p-0.5 border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(verifiedCount / 6) * 100}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 whitespace-nowrap">
                {Math.round((verifiedCount / 6) * 100)}%
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  filterLevel === lvl
                    ? 'bg-emerald-500 text-slate-950 shadow-glow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {lvl} {lvl === 'All' ? '(6)' : lvl === 'Beginner' ? '(2)' : lvl === 'Intermediate' ? '(2)' : '(2)'}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic, tech, or project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* 2-Column Layout: Project Navigator (Left) + Detail & Verifier Workspace (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 6 Projects List (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-semibold">
              <span>Learning Path Projects</span>
              <span>{filteredProjects.length} available</span>
            </div>

            <div className="space-y-3">
              {filteredProjects.map((p) => {
                const isSelected = activeProject?.id === p.id;
                const sub = userSubmissions[p.id];
                const isVerified = sub?.status === 'deployed_verified';
                const isPending = sub?.status === 'pending_verification';

                const levelBadgeClass = 
                  p.level === 'Beginner' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                  p.level === 'Intermediate' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                  'bg-purple-500/20 text-purple-300 border-purple-500/30';

                return (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProject(p)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all text-left space-y-2.5 relative group ${
                      isSelected
                        ? 'bg-slate-900 border-emerald-500 shadow-glow'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-mono text-xs font-bold text-slate-300">
                          {p.projectNumber}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${levelBadgeClass}`}>
                          {p.level}
                        </span>
                      </div>

                      {/* Status Badge */}
                      {isVerified ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Live Verified</span>
                        </span>
                      ) : isPending ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>Pending Probe</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-slate-500">
                          Unsubmitted
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className={`text-sm font-bold group-hover:text-emerald-400 transition-colors ${
                        isSelected ? 'text-emerald-400' : 'text-white'
                      }`}>
                        {p.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">
                        {p.shortDescription}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800/60">
                      <span>{p.estimatedHours}</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Local Reference Code Path Banner */}
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300 font-bold">
                <Folder className="w-4 h-4 text-amber-400" />
                <span>Reference Project Blueprints</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                All 6 reference projects are pre-built inside your local workspace at:
              </p>
              <div className="p-2 rounded bg-slate-950 border border-slate-800/80 font-mono text-[10px] text-emerald-300 break-all">
                somaivo/fullstack-projects/
              </div>
              <p className="text-slate-500 text-[10px]">
                Inspect clean client code, server routes, database migrations, and .env templates.
              </p>
            </div>

          </div>

          {/* Right Column: Selected Project Interactive Detail Workspace (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {activeProject ? (
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur">
                
                {/* Project Header Banner */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200 font-mono font-bold text-xs">
                        Project #{activeProject.projectNumber}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${
                        activeProject.level === 'Beginner' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                        activeProject.level === 'Intermediate' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                        'bg-purple-500/20 text-purple-300 border-purple-500/30'
                      }`}>
                        {activeProject.level} Level
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {activeProject.estimatedHours}
                      </span>
                    </div>

                    {/* Live Verification Badge */}
                    {isVerifiedLive ? (
                      <div className="px-3 py-1 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Live Deployment Verified ✓</span>
                      </div>
                    ) : isPendingVerification ? (
                      <div className="px-3 py-1 rounded-xl bg-amber-950 border border-amber-800 text-amber-300 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        <span>Live Probe Pending / Action Required</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveTab('submit')}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5 text-slate-400" />
                        <span>Not Yet Deployed — Submit Live URL</span>
                      </button>
                    )}
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {activeProject.title}
                    </h2>
                    <p className="text-sm text-emerald-400/90 font-medium mt-1">
                      {activeProject.tagline}
                    </p>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {activeProject.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex items-center gap-1 border-b border-slate-800 overflow-x-auto pb-px">
                  {[
                    { id: 'overview', label: 'Overview & Objectives', icon: BookOpen },
                    { id: 'milestones', label: 'Milestones & Hints', icon: Sparkles },
                    { id: 'structure', label: 'Starter Architecture', icon: Folder },
                    { id: 'testing', label: 'Testing Checklist', icon: CheckCircle2 },
                    { id: 'deployment', label: 'Deployment Guide', icon: Rocket },
                    { id: 'submit', label: 'Submit & Verify Live', icon: Globe }
                  ].map(t => {
                    const Icon = t.icon;
                    const isActive = activeTab === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        className={`flex items-center gap-2 px-3.5 py-2.5 border-b-2 text-xs font-bold transition-all whitespace-nowrap ${
                          isActive
                            ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                            : 'border-transparent text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab 1: Overview & Objectives */}
                {activeTab === 'overview' && (
                  <div className="space-y-6 animate-in fade-in">
                    
                    {/* Prerequisites */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Prerequisites</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activeProject.prerequisites?.map((prereq, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-2 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                            <span>{prereq}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Learning Objectives */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Learning Objectives</h4>
                      <div className="space-y-2">
                        {activeProject.learningObjectives?.map((obj, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-200 leading-relaxed">{obj}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features Breakdown */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Required Application Features</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {activeProject.features?.map((feat, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/70 flex items-start gap-2.5">
                            <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-300">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Local Workspace Link */}
                    <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-emerald-300">Working Local Codebase Available</p>
                        <p className="text-[11px] text-slate-400">
                          Complete reference project located in: <code className="text-emerald-400">fullstack-projects/0{activeProject.projectNumber}-...</code>
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('structure')}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-colors whitespace-nowrap"
                      >
                        Inspect Architecture →
                      </button>
                    </div>

                  </div>
                )}

                {/* Tab 2: Milestones & Hints */}
                {activeTab === 'milestones' && (
                  <div className="space-y-6 animate-in fade-in">
                    
                    {/* Milestones list */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Implementation Milestones</h4>
                      {activeProject.milestones?.map((m) => (
                        <div key={m.step} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-xs font-bold flex items-center justify-center">
                              {m.step}
                            </span>
                            <h5 className="text-sm font-bold text-white">{m.title}</h5>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed pl-8">
                            {m.instructions}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Hints and Explanations (Architectural Guidance) */}
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Engineering Principles & Architecture Explanations</span>
                      </h4>
                      <p className="text-xs text-slate-400">
                        Read these insights carefully. Professional software engineers focus on understanding tradeoffs, data modeling, and security constraints rather than copy-pasting code.
                      </p>

                      <div className="space-y-3">
                        {activeProject.hintsAndExplanations?.map((hint, idx) => (
                          <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
                            <h5 className="text-xs font-bold text-amber-300 flex items-center gap-2">
                              <Info className="w-3.5 h-3.5" />
                              <span>{hint.topic}</span>
                            </h5>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {hint.explanation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* Tab 3: Starter Structure & Blueprints */}
                {activeTab === 'structure' && (
                  <div className="space-y-6 animate-in fade-in">
                    
                    {/* Suggested File Structure */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Project Directory Layout</h4>
                        <span className="text-[11px] text-slate-500 font-mono">Standard Production Tree</span>
                      </div>
                      <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre leading-relaxed">
                        {activeProject.suggestedStructure}
                      </pre>
                    </div>

                    {/* Environment Variables Reference */}
                    {activeProject.deploymentGuide?.envVariables?.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Required Environment Variables (.env)</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs text-left border-collapse">
                            <thead>
                              <tr className="border-b border-slate-800 text-slate-400">
                                <th className="py-2 px-3 font-semibold">Variable Name</th>
                                <th className="py-2 px-3 font-semibold">Required</th>
                                <th className="py-2 px-3 font-semibold">Description & Production Example</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60">
                              {activeProject.deploymentGuide.envVariables.map((env, idx) => (
                                <tr key={idx} className="hover:bg-slate-900/40">
                                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">{env.key}</td>
                                  <td className="py-2.5 px-3">
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                      env.required ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-400'
                                    }`}>
                                      {env.required ? 'Yes' : 'Optional'}
                                    </span>
                                  </td>
                                  <td className="py-2.5 px-3 text-slate-300">{env.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Health Check Code Reference */}
                    {activeProject.deploymentGuide?.healthCheckEndpoint && (
                      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Activity className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Required Health Check Route Implementation</span>
                          </h5>
                          <span className="text-[10px] font-mono text-emerald-400">{activeProject.deploymentGuide.healthCheckEndpoint}</span>
                        </div>
                        <p className="text-xs text-slate-400">
                          Cloud hosts (Render, AWS, Fly.io) and FAHMRISE's verifier require this endpoint to confirm that your server process is active and database is connected.
                        </p>
                        <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-200 overflow-x-auto whitespace-pre">
{`app.get('${activeProject.deploymentGuide.healthCheckEndpoint}', (req, res) => {
  res.status(200).json({
    status: 'ok',
    project: '${activeProject.slug}',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});`}
                        </pre>
                      </div>
                    )}

                  </div>
                )}

                {/* Tab 4: Testing Checklist */}
                {activeTab === 'testing' && (
                  <div className="space-y-6 animate-in fade-in">
                    
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Quality Assurance & Security Checklist</h4>
                      <p className="text-xs text-slate-400">
                        Check off each item locally before proceeding with cloud deployment. These tests prevent common bugs and security vulnerabilities.
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {activeProject.testingChecklist?.map((checkItem, idx) => {
                        const isDone = completedChecklist[`${selectedProjectId}_item_${idx}`];
                        return (
                          <div
                            key={idx}
                            onClick={() => toggleChecklistItem(idx)}
                            className={`cursor-pointer p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                              isDone
                                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                                : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 border ${
                              isDone
                                ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                                : 'border-slate-700 bg-slate-900'
                            }`}>
                              {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <span className={`text-xs leading-relaxed select-none ${isDone ? 'line-through text-slate-400' : ''}`}>
                              {checkItem}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                      <span>Progress is saved automatically in your browser session.</span>
                      <button
                        onClick={() => setActiveTab('deployment')}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                      >
                        Ready for Deployment →
                      </button>
                    </div>

                  </div>
                )}

                {/* Tab 5: Deployment Guide & Troubleshooting */}
                {activeTab === 'deployment' && (
                  <div className="space-y-6 animate-in fade-in">
                    
                    {/* Deployment Steps */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Production Deployment Steps</h4>
                        <span className="text-xs text-emerald-400 font-bold">{activeProject.deploymentGuide?.provider}</span>
                      </div>
                      <div className="space-y-2">
                        {activeProject.deploymentGuide?.steps?.map((stepText, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{stepText}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Troubleshooting Guide */}
                    <div className="space-y-3 pt-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>Common Deployment Pitfalls & Solutions</span>
                      </h4>
                      <div className="space-y-3">
                        {activeProject.troubleshootingGuide?.map((item, idx) => (
                          <div key={idx} className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 space-y-2">
                            <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
                              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>{item.issue}</span>
                            </div>
                            <div className="pl-5 space-y-1 text-xs">
                              <p className="text-slate-400">
                                <strong className="text-slate-300">Underlying Cause:</strong> {item.cause}
                              </p>
                              <p className="text-emerald-300 font-medium">
                                <strong className="text-slate-300">Resolution:</strong> {item.solution}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between">
                      <div className="text-xs text-slate-300">
                        <p className="font-bold text-white">App is deployed and accessible via public domain?</p>
                        <p className="text-slate-400 text-[11px]">Proceed to the verifier tab to probe your live deployment URL.</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('submit')}
                        className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-glow hover:bg-emerald-400"
                      >
                        Run Live Probe →
                      </button>
                    </div>

                  </div>
                )}

                {/* Tab 6: Submit & Verify Live Deployment */}
                {activeTab === 'submit' && (
                  <div className="space-y-6 animate-in fade-in">
                    
                    {/* Mandatory Deployment Policy Banner */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 border border-amber-500/40 space-y-2">
                      <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                        <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span>FAHMRISE Live Deployment Verification Standard</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        In accordance with FAHMRISE engineering certification policy, <strong>a passing local build is not sufficient</strong> for project completion. The platform executes an active HTTP network probe against your public deployment URL and health endpoint. If services are offline, asleep, or misconfigured, status remains pending until verified.
                      </p>
                    </div>

                    {/* Existing Submission Status Card */}
                    {currentSubmission && (
                      <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Submission Status</span>
                          {isVerifiedLive ? (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Live Deployment Verified</span>
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-amber-400" />
                              <span>Pending Live Verification</span>
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                          <div>
                            <span className="text-slate-500 block">Repository:</span>
                            <a 
                              href={currentSubmission.repoUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-emerald-400 font-mono hover:underline flex items-center gap-1 mt-0.5 truncate"
                            >
                              <Github className="w-3.5 h-3.5 flex-shrink-0" />
                              <span className="truncate">{currentSubmission.repoUrl}</span>
                            </a>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Live Application:</span>
                            <a 
                              href={currentSubmission.liveUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-emerald-400 font-mono hover:underline flex items-center gap-1 mt-0.5 truncate"
                            >
                              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                              <span className="truncate">{currentSubmission.liveUrl}</span>
                            </a>
                          </div>
                        </div>

                        {currentSubmission.verifiedAt && (
                          <p className="text-[11px] text-slate-500 border-t border-slate-800/80 pt-2">
                            Verified on: {new Date(currentSubmission.verifiedAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Submission Form */}
                    <form onSubmit={handleSubmitProject} className="space-y-4">
                      
                      {/* GitHub Repo URL */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Github className="w-3.5 h-3.5 text-slate-400" />
                          <span>GitHub Repository URL *</span>
                        </label>
                        <input
                          type="url"
                          required
                          placeholder="https://github.com/your-username/my-fahmrise-project"
                          value={repoUrl}
                          onChange={(e) => setRepoUrl(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                        />
                        <p className="text-[11px] text-slate-500">Public repository containing all project source code and README.</p>
                      </div>

                      {/* Live Deployment URL */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-slate-400" />
                          <span>Live Public Application URL *</span>
                        </label>
                        <input
                          type="url"
                          required
                          placeholder="https://my-app.onrender.com or https://my-portfolio.vercel.app"
                          value={liveUrl}
                          onChange={(e) => setLiveUrl(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                        />
                        <p className="text-[11px] text-slate-500">Public HTTPS endpoint where your client or full stack application is running.</p>
                      </div>

                      {/* Health Check Endpoint */}
                      {activeProject.deploymentGuide?.healthCheckEndpoint && (
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Activity className="w-3.5 h-3.5 text-slate-400" />
                            <span>Backend API Health Check URL (Optional / Recommended)</span>
                          </label>
                          <input
                            type="url"
                            placeholder="https://my-api.onrender.com/api/health"
                            value={healthUrl}
                            onChange={(e) => setHealthUrl(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                          />
                          <p className="text-[11px] text-slate-500">The verifier will test this endpoint for HTTP 200 and latency.</p>
                        </div>
                      )}

                      {/* Learner Notes / Reflection */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>Learner Engineering Notes / Key Tradeoffs</span>
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Describe the architectural choices you made, security measures implemented, or challenges resolved during deployment..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 resize-none"
                        />
                      </div>

                      {/* Action Buttons: Probe & Submit */}
                      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={handleProbeDeployment}
                          disabled={probing || !liveUrl.trim()}
                          className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          {probing ? (
                            <>
                              <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                              <span>Probing Live Domain...</span>
                            </>
                          ) : (
                            <>
                              <Activity className="w-4 h-4 text-emerald-400" />
                              <span>Test & Probe Live URL</span>
                            </>
                          )}
                        </button>

                        <button
                          type="submit"
                          disabled={submitting || !repoUrl.trim() || !liveUrl.trim()}
                          className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-extrabold text-xs shadow-glow flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          {submitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                              <span>Submitting & Verifying...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Submit Project for Certification</span>
                            </>
                          )}
                        </button>
                      </div>

                    </form>

                    {/* Submit Feedback Message */}
                    {submitMessage && (
                      <div className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
                        submitMessage.type === 'success' ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200' :
                        submitMessage.type === 'warning' ? 'bg-amber-950/60 border-amber-500/50 text-amber-200' :
                        'bg-rose-950/60 border-rose-500/50 text-rose-200'
                      }`}>
                        {submitMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> :
                         submitMessage.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" /> :
                         <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />}
                        <div className="space-y-1">
                          <p className="font-bold">{submitMessage.text}</p>
                        </div>
                      </div>
                    )}

                    {/* Live Probe Diagnostics Card */}
                    {probeResult && (
                      <div className={`p-5 rounded-2xl border space-y-3 ${
                        probeResult.verified ? 'bg-emerald-950/40 border-emerald-500/40' : 'bg-slate-950 border-slate-800'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Activity className="w-4 h-4 text-emerald-400" />
                            <span>Live HTTP Probe Diagnostics</span>
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            probeResult.verified ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {probeResult.verified ? 'PROBE PASSED (HTTP 200)' : 'PROBE INCOMPLETE / PENDING'}
                          </span>
                        </div>

                        {probeResult.liveProbe && (
                          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400 font-mono text-[11px] truncate max-w-[280px]">
                                {probeResult.liveProbe.url}
                              </span>
                              <span className={`font-bold ${probeResult.liveProbe.online ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {probeResult.liveProbe.online ? `HTTP ${probeResult.liveProbe.statusCode || 200} OK` : 'Unreachable'}
                              </span>
                            </div>
                            {probeResult.liveProbe.latencyMs && (
                              <p className="text-[11px] text-slate-500">
                                Response Latency: <strong className="text-slate-300 font-mono">{probeResult.liveProbe.latencyMs}ms</strong>
                              </p>
                            )}
                            {probeResult.liveProbe.error && (
                              <p className="text-[11px] text-rose-400 font-mono">
                                Error: {probeResult.liveProbe.error}
                              </p>
                            )}
                          </div>
                        )}

                        {probeResult.healthProbe && (
                          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400 font-mono text-[11px] truncate max-w-[280px]">
                                {probeResult.healthProbe.url}
                              </span>
                              <span className={`font-bold ${probeResult.healthProbe.online ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {probeResult.healthProbe.online ? `HTTP ${probeResult.healthProbe.statusCode || 200} OK` : 'Health Check Failed'}
                              </span>
                            </div>
                            {probeResult.healthProbe.latencyMs && (
                              <p className="text-[11px] text-slate-500">
                                Health Check Latency: <strong className="text-slate-300 font-mono">{probeResult.healthProbe.latencyMs}ms</strong>
                              </p>
                            )}
                            {probeResult.healthProbe.error && (
                              <p className="text-[11px] text-rose-400 font-mono">
                                Error: {probeResult.healthProbe.error}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Remaining Steps Checklist if incomplete */}
                        {probeResult.remainingSteps?.length > 0 && (
                          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-2">
                            <h5 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Required Steps to Complete Live Deployment:</span>
                            </h5>
                            <ul className="space-y-1 text-xs text-slate-300">
                              {probeResult.remainingSteps.map((step, sIdx) => (
                                <li key={sIdx} className="flex items-start gap-2">
                                  <span className="text-amber-400 mt-0.5">•</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      </div>
                    )}

                  </div>
                )}

              </div>
            ) : (
              <div className="p-12 text-center text-slate-400 bg-slate-900/40 rounded-3xl border border-slate-800">
                <Rocket className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-sm">Select a project on the left to inspect architecture, blueprints, and verify live deployment.</p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

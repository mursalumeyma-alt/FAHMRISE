import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Download, 
  Play, 
  Sparkles, 
  ChevronLeft, 
  ArrowRight, 
  Bot, 
  RotateCcw,
  Check
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import CodeEditor from '../components/practice/CodeEditor';
import LivePreview from '../components/practice/LivePreview';
import AiTutorDrawer from '../components/ai/AiTutorDrawer';
import Badge from '../components/common/Badge';

export default function MiniProjectPage() {
  const { user } = useAuth();
  const { progress, submitProject } = useProgress();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [project, setProject] = useState(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [checklist, setChecklist] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const bookData = await api.books.getById('html-from-zero');
        setBook(bookData.book);
        setProject(bookData.book.miniProject);
        
        // If user already submitted before, load their code
        if (progress?.projectSubmission?.code) {
          setCode(progress.projectSubmission.code);
          setIsSubmitted(true);
        } else {
          setCode(bookData.book.miniProject.starterCode || '');
        }

        // Initialize checklist
        setChecklist(bookData.book.miniProject.checklist || []);
      } catch (err) {
        console.error('Failed to load project:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [progress]);

  // Run DOM validation checks on project code
  const evaluateProject = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(code || '', 'text/html');

    const updatedChecklist = [
      {
        id: 'req-1',
        label: 'Include standard <!DOCTYPE html> and <html> with lang attribute',
        completed: /<!DOCTYPE\s+html>/i.test(code || '') && (doc.documentElement.getAttribute('lang') !== null || code.includes('lang='))
      },
      {
        id: 'req-2',
        label: 'Page title inside <head> <title>',
        completed: doc.getElementsByTagName('title').length > 0 && (doc.querySelector('title')?.textContent.trim().length > 0)
      },
      {
        id: 'req-3',
        label: 'Header element (<header>) with main <h1> heading containing your name',
        completed: doc.getElementsByTagName('header').length > 0 && doc.getElementsByTagName('h1').length > 0
      },
      {
        id: 'req-4',
        label: 'Main element (<main>) containing an informative bio paragraph (<p>)',
        completed: doc.getElementsByTagName('main').length > 0 && doc.getElementsByTagName('p').length > 0
      },
      {
        id: 'req-5',
        label: 'Profile image (<img>) with valid src and descriptive alt attribute',
        completed: Array.from(doc.getElementsByTagName('img')).some(img => img.hasAttribute('src') && img.hasAttribute('alt') && img.getAttribute('alt').trim().length > 0)
      },
      {
        id: 'req-6',
        label: 'List of digital skills (<ul> or <ol>) with at least 3 list items (<li>)',
        completed: doc.getElementsByTagName('li').length >= 3
      },
      {
        id: 'req-7',
        label: 'At least one clickable link (<a>) with href attribute',
        completed: Array.from(doc.getElementsByTagName('a')).some(a => a.hasAttribute('href'))
      },
      {
        id: 'req-8',
        label: 'Footer element (<footer>) with copyright or closing text',
        completed: doc.getElementsByTagName('footer').length > 0
      }
    ];

    setChecklist(updatedChecklist);
    return updatedChecklist;
  };

  useEffect(() => {
    if (code) {
      evaluateProject();
    }
  }, [code]);

  const handleSubmit = async () => {
    const evaluated = evaluateProject();
    const allPassed = evaluated.every(item => item.completed);

    if (!allPassed) {
      alert('Please complete all 8 criteria in the checklist before submitting your capstone project.');
      return;
    }

    setSubmitting(true);
    try {
      await submitProject(code, evaluated);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error submitting project:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'personal-profile-somaivo.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleResetStarter = () => {
    if (window.confirm('Reset project back to starter template?')) {
      if (project) {
        setCode(project.starterCode || '');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading project workspace...</span>
        </div>
      </div>
    );
  }

  const passedCount = checklist.filter(c => c.completed).length;
  const isAllPassed = checklist.length > 0 && passedCount === checklist.length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* Top Header */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                CAPSTONE PROJECT
              </span>
              {isSubmitted && (
                <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-800">
                  VERIFIED & COMPLETED ✓
                </span>
              )}
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Build Your Personal Profile Page
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            title="Download your HTML file"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export HTML</span>
          </button>

          <button
            onClick={() => setAiTutorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-glow transition-all"
          >
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">Ask AI Tutor</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 space-y-6 flex flex-col">
        
        {/* Requirements Checklist Bar */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Project Requirements Checklist</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                The automated checker scans your HTML code in real time as you edit. Pass all 8 items to submit.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400">
                {passedCount} / {checklist.length} Passed
              </span>

              <button
                onClick={handleSubmit}
                disabled={!isAllPassed || submitting}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-glow transition-all disabled:opacity-40 disabled:hover:bg-emerald-500 flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{isSubmitted ? 'Update & Re-Submit' : 'Submit Capstone Project'}</span>
              </button>
            </div>
          </div>

          {/* Checklist Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
            {checklist.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${
                  item.completed
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                {item.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0 mt-0.5" />
                )}
                <span className="leading-snug">{item.label}</span>
              </div>
            ))}
          </div>

          {isSubmitted && (
            <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Project verified and recorded in your learning profile!</span>
              </div>
              <Link
                to="/profile"
                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg whitespace-nowrap"
              >
                View Your Certificate →
              </Link>
            </div>
          )}
        </div>

        {/* Code Editor & Live Sandboxed Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[460px]">
          <div className="h-full min-h-[420px]">
            <CodeEditor
              code={code}
              onChange={setCode}
              onReset={handleResetStarter}
            />
          </div>
          <div className="h-full min-h-[420px]">
            <LivePreview code={code} />
          </div>
        </div>

      </div>

      {/* Floating AI Tutor */}
      <AiTutorDrawer
        isOpen={aiTutorOpen}
        onClose={() => setAiTutorOpen(false)}
        currentExercise={{ title: 'Capstone Project: Personal Profile Page' }}
        userCode={code}
      />
    </div>
  );
}

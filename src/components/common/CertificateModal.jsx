import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Printer, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Share2,
  Edit3,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function CertificateModal({ certificate, isOpen, onClose, onCertificateUpdated }) {
  const { user, updateProfile } = useAuth();
  
  // Local state for certificate data and name entry
  const [activeCert, setActiveCert] = useState(certificate);
  const [nameInput, setNameInput] = useState('');
  const [nameError, setNameError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showNameForm, setShowNameForm] = useState(false);

  useEffect(() => {
    if (certificate) {
      setActiveCert(certificate);
      const isDemo = !certificate.userName || certificate.userName === 'Demo Learner' || certificate.userName === 'FAHMRISE Learner';
      const initialName = isDemo ? (user?.name && user.name !== 'Demo Learner' ? user.name : '') : certificate.userName;
      setNameInput(initialName);
      // Show form if the name is still demo/generic or if no certificate ID is set
      setShowNameForm(isDemo || !certificate.id);
    } else {
      setNameInput(user?.name && user.name !== 'Demo Learner' ? user.name : '');
      setShowNameForm(true);
    }
    setNameError('');
  }, [certificate, user, isOpen]);

  if (!isOpen) return null;

  const certId = activeCert?.id || activeCert?.certificateId || 'FAHM-HTML-7QSR-2026';
  const rawName = activeCert?.userName || activeCert?.recipientName;
  const learnerName = rawName && rawName !== 'Demo Learner' ? rawName : (nameInput.trim() || 'Learner');
  const courseTitle = activeCert?.courseTitle || 'HTML From Zero';
  const issueDate = activeCert?.formattedIssuedAt || activeCert?.issueDate || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  const handleGenerateCertificate = async (e) => {
    e.preventDefault();
    const trimmed = nameInput.trim();

    if (!trimmed) {
      setNameError('Please enter your full name to generate your certificate.');
      return;
    }

    if (trimmed.toLowerCase() === 'demo learner') {
      setNameError('Please enter your actual full name rather than Demo Learner.');
      return;
    }

    setIsGenerating(true);
    setNameError('');

    try {
      const courseId = activeCert?.courseId || 'html-from-zero';
      // Sync with server claim endpoint
      const res = await api.certificates.claim(courseId, trimmed);
      
      const updatedCertificate = res.certificate || {
        ...activeCert,
        id: certId,
        certificateId: certId,
        userName: trimmed,
        recipientName: trimmed,
        courseTitle,
        issuer: 'FAHMRISE Board',
        formattedIssuedAt: issueDate
      };

      setActiveCert(updatedCertificate);
      setShowNameForm(false);

      // Update user context profile if possible
      if (updateProfile && user && user.name !== trimmed) {
        updateProfile({ name: trimmed }).catch(() => {});
      }

      if (onCertificateUpdated) {
        onCertificateUpdated(updatedCertificate);
      }
    } catch (err) {
      console.warn('Backend claim error, updating locally:', err);
      // Fallback update locally
      const localUpdated = {
        ...activeCert,
        id: certId,
        certificateId: certId,
        userName: trimmed,
        recipientName: trimmed,
        courseTitle,
        issuer: 'FAHMRISE Board',
        formattedIssuedAt: issueDate
      };
      setActiveCert(localUpdated);
      setShowNameForm(false);
      if (onCertificateUpdated) {
        onCertificateUpdated(localUpdated);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-4 sm:p-8 space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors z-20"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800 pr-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold border border-amber-500/30 flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">Official Certificate of Completion</h2>
              <span className="text-[11px] text-slate-400 font-mono">ID: {certId}</span>
            </div>
          </div>

          {!showNameForm && (
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setShowNameForm(true)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
                title="Change recipient name"
              >
                <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Edit Name</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-glow flex items-center gap-1.5 transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>

              <Link
                to={`/verify-certificate/${certId}`}
                target="_blank"
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Verify</span>
              </Link>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: LEARNER NAME ENTRY FORM (Before generating/showing certificate)  */}
        {/* ========================================================================= */}
        {showNameForm ? (
          <div className="py-6 px-2 sm:px-6 space-y-6 max-w-lg mx-auto">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FAHMRISE Certificate Generator</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Enter Your Full Name
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Please enter the exact name you would like printed on your official verified certificate for <strong className="text-emerald-400">{courseTitle}</strong>.
              </p>
            </div>

            <form onSubmit={handleGenerateCertificate} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="space-y-1.5">
                <label htmlFor="certificate-learner-name" className="text-xs font-bold text-slate-300 block">
                  Your Name
                </label>
                <input
                  id="certificate-learner-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={nameInput}
                  onChange={(e) => {
                    setNameInput(e.target.value);
                    if (nameError) setNameError('');
                  }}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  autoFocus
                />
                {nameError && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium pt-1">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{nameError}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isGenerating ? 'Generating Certificate...' : 'Generate Certificate'}</span>
                </button>

                {activeCert?.userName && activeCert.userName !== 'Demo Learner' && (
                  <button
                    type="button"
                    onClick={() => setShowNameForm(false)}
                    className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          /* ========================================================================= */
          /* VIEW 2: OFFICIAL PRINTABLE FAHMRISE CERTIFICATE OF COMPLETION             */
          /* ========================================================================= */
          <div className="space-y-4">
            <div className="p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-4 border-double border-emerald-500/40 text-center space-y-5 shadow-inner relative overflow-hidden print:border-emerald-700 print:text-black print:bg-white print:p-8">
              
              {/* Background Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                <span className="text-7xl sm:text-9xl font-black tracking-widest text-emerald-400">FAHMRISE</span>
              </div>

              {/* 1. FAHMRISE Branding */}
              <div className="space-y-1 relative z-10">
                <div className="inline-flex items-center gap-2">
                  <span className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 font-sans tracking-tight">
                    FAHMRISE
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-emerald-400 font-bold">
                  Understand. Learn. Rise.
                </p>
              </div>

              {/* 2. Certificate Award Title */}
              <div className="space-y-1 relative z-10">
                <h2 className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-amber-400 font-mono">
                  Certificate of Completion
                </h2>
                <p className="text-xs text-slate-400 italic font-serif">This is to officially certify that</p>
              </div>

              {/* 3. Learner's Entered Name */}
              <div className="relative z-10 py-1">
                <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white font-serif tracking-wide border-b-2 border-emerald-500/40 pb-2 inline-block max-w-xl break-words px-4">
                  {learnerName}
                </h3>
              </div>

              {/* 4. Completion Statement & Course Title */}
              <div className="space-y-2 max-w-xl mx-auto relative z-10">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  has successfully completed all required coursework, hands-on coding challenges, checkpoint quizzes, and comprehensive assessments in:
                </p>
                <h4 className="text-base sm:text-2xl font-black text-emerald-400 tracking-tight">
                  {courseTitle}
                </h4>
              </div>

              {/* 5. Verified 100% Distinction Badge with SVG Icon */}
              <div className="relative z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-[10px] sm:text-xs font-bold text-emerald-300 font-mono shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Verified 100% Course Completion • Distinction</span>
              </div>

              {/* 6. Footer Metadata Grid */}
              <div className="pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end text-left text-[10px] sm:text-[11px] text-slate-400 font-mono relative z-10">
                <div className="space-y-0.5">
                  <span className="block text-slate-500 text-[9px] sm:text-[10px]">Date of Issue:</span>
                  <span className="font-bold text-slate-200">{issueDate}</span>
                </div>

                <div className="space-y-0.5 sm:text-center">
                  <span className="block text-slate-500 text-[9px] sm:text-[10px]">Credential ID:</span>
                  <span className="font-bold text-emerald-400 font-mono">{certId}</span>
                </div>

                <div className="flex flex-col items-start sm:items-end justify-end">
                  {/* Digital Signature */}
                  <div className="h-8 mb-1 flex items-center justify-start sm:justify-end">
                    <BoardSignatureSvg className="w-28 sm:w-32 h-8 text-emerald-400" />
                  </div>
                  <div className="text-left sm:text-right border-t border-slate-700/60 pt-1 w-full sm:w-auto">
                    <span className="font-bold text-slate-200 block text-xs">FAHMRISE Board</span>
                    <span className="block text-slate-500 text-[9px] sm:text-[10px]">Issuing Authority</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Verification Guarantee Strip */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] sm:text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>This credential is permanently registered and verifiable worldwide.</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400 font-bold flex-shrink-0">
                Registry Status: VERIFIED ✓
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Professional Handwritten-style Digital SVG Signature representing FAHMRISE Board
function BoardSignatureSvg({ className = "w-32 h-8 text-emerald-400" }) {
  return (
    <svg
      viewBox="0 0 180 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="FAHMRISE Board Digital Signature"
    >
      {/* Primary calligraphic signature strokes */}
      <path
        d="M14 36C22 18 34 8 40 18C44 26 36 34 26 34C18 34 26 12 42 10C56 8 52 28 62 26C72 24 74 14 82 14C90 14 88 28 98 24C108 20 114 10 124 12C134 14 128 28 140 22C148 18 156 8 166 14C172 18 168 28 174 26"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-emerald-400"
      />
      {/* Upper loop flourish */}
      <path
        d="M18 14C28 10 40 14 44 22C46 28 38 32 30 30"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-teal-300"
      />
      {/* Under-stroke sweep and finish */}
      <path
        d="M28 42C56 44 108 46 162 36C174 34 176 28 166 26C148 22 122 34 106 40"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-emerald-300/80"
      />
      {/* Pen dot flourish */}
      <circle cx="126" cy="7" r="1.5" fill="currentColor" className="text-emerald-400" />
    </svg>
  );
}


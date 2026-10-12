import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  User, 
  BookOpen, 
  ArrowLeft, 
  Sparkles,
  Printer,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';
import { api } from '../services/api';

export default function CertificateVerifyPage() {
  const { certificateId } = useParams();
  const [cert, setCert] = useState(null);
  const [isRevoked, setIsRevoked] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function verify() {
      if (!certificateId) {
        setError('No certificate ID specified.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const data = await api.certificates.verifyCertificate(certificateId);
        if (data.certificate) {
          setCert(data.certificate);
          setIsRevoked(Boolean(data.isRevoked || data.certificate.status === 'revoked'));
          setVerificationMessage(data.verificationMessage || '');
        } else {
          setError(data.error || 'This certificate could not be verified in the registry.');
        }
      } catch (err) {
        setError(err.message || 'Certificate verification failed.');
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, [certificateId]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full space-y-8">
        
        {/* Top Back Link */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to FAHMRISE</span>
          </Link>
          <span className="text-xs font-mono text-emerald-400 font-bold">Official Credential Verification</span>
        </div>

        {loading ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center space-y-4 shadow-xl">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-slate-400">Verifying credential against FAHMRISE Official Registry...</p>
          </div>
        ) : error || !cert ? (
          <div className="bg-slate-900 border border-rose-900/60 rounded-3xl p-8 sm:p-10 text-center space-y-5 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto">
              <XCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Certificate Not Found or Invalid</h2>
              <p className="text-xs text-rose-300 font-mono">ID: {certificateId}</p>
            </div>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              We could not find an authentic certificate matching this ID. Please confirm the exact credential ID from the recipient.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-glow transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse FAHMRISE Curriculum</span>
            </Link>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
            
            {/* Revocation Warning Alert if Revoked */}
            {isRevoked ? (
              <div className="p-5 bg-red-950/60 border-2 border-red-500 rounded-2xl text-red-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span>OFFICIAL REVOCATION NOTICE</span>
                </div>
                <p className="leading-relaxed">
                  {verificationMessage || `This certificate was revoked by the FAHMRISE Board on ${cert.revokedAt ? new Date(cert.revokedAt).toLocaleDateString('en-GB') : 'record'}. Reason: ${cert.revokedReason || 'Administrative audit revocation'}`}
                </p>
              </div>
            ) : (
              /* Status Header for Valid Cert */
              <div className="text-center space-y-3 pb-6 border-b border-slate-800">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>OFFICIAL VERIFIED CREDENTIAL ✓</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  FAHMRISE Certificate of Completion
                </h1>
                <p className="text-xs text-slate-400 font-mono">
                  Registry ID: <span className="text-emerald-400 font-bold">{cert.certificateId || cert.id}</span>
                </p>
              </div>
            )}

            {/* Credential Data Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Recipient Name</span>
                </span>
                <p className="text-base font-bold text-white">{cert.userName || cert.recipientName || 'Learner'}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Date of Issue</span>
                </span>
                <p className="text-base font-bold text-white">{cert.formattedIssuedAt || new Date(cert.issuedAt).toLocaleDateString('en-GB')}</p>
              </div>

              <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                  <span>Completed Course</span>
                </span>
                <p className="text-lg font-extrabold text-emerald-400">{cert.courseTitle}</p>
                <p className="text-[11px] text-slate-400">Category: {cert.category || 'Technology'} • {cert.grade || 'Full Mastery'}</p>
              </div>
            </div>

            {/* Verification Guarantee Details */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-950 to-teal-950/40 border border-emerald-500/30 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <SparkCheckIcon className="w-4 h-4" />
                <span>Authentication Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                This learner has completed 100% of curriculum milestones, interactive coding challenges, quizzes, and assessments verified by the FAHMRISE automated evaluation system.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-[10px] text-slate-500 font-mono border-t border-slate-800 gap-2">
                <div className="flex items-center gap-2">
                  <BoardSignatureSvg className="w-24 h-6 text-emerald-400" />
                  <span>Issuer: {cert.issuer || 'FAHMRISE Board'}</span>
                </div>
                <span>Tagline: Understand. Learn. Rise.</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Verification Record</span>
              </button>

              <Link
                to="/courses"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-glow transition-all"
              >
                Explore FAHMRISE Courses →
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

function SparkCheckIcon(props) {
  return <CheckCircle2 {...props} />;
}

function BoardSignatureSvg({ className = "w-28 h-7 text-emerald-400" }) {
  return (
    <svg
      viewBox="0 0 180 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="FAHMRISE Board Digital Signature"
    >
      <path
        d="M14 36C22 18 34 8 40 18C44 26 36 34 26 34C18 34 26 12 42 10C56 8 52 28 62 26C72 24 74 14 82 14C90 14 88 28 98 24C108 20 114 10 124 12C134 14 128 28 140 22C148 18 156 8 166 14C172 18 168 28 174 26"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-emerald-400"
      />
      <path
        d="M18 14C28 10 40 14 44 22C46 28 38 32 30 30"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-teal-300"
      />
      <path
        d="M28 42C56 44 108 46 162 36C174 34 176 28 166 26C148 22 122 34 106 40"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-emerald-300/80"
      />
      <circle cx="126" cy="7" r="1.5" fill="currentColor" className="text-emerald-400" />
    </svg>
  );
}

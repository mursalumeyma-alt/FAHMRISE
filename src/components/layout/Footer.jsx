import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, Globe, Code2 } from 'lucide-react';
import Modal from '../common/Modal';

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm">
      {/* Upper Footer: Mission & Disciplines */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center p-0.5 shadow-sm">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center font-black text-emerald-400 text-sm">
                  F
                </div>
              </div>
              <span className="text-xl font-black text-white tracking-tight">FAHMRISE</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Understand. Learn. Rise. Empowering global and African learners with high-impact digital skills, Islamic studies, business, and career mastery.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
              <span>26 Interactive Courses &amp; Pathways Live</span>
            </div>
          </div>

          {/* Technology Courses */}
          <div>
            <h4 className="font-bold text-white mb-4 text-xs uppercase tracking-wider text-emerald-400">
              Technology &amp; Coding
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/courses/fullstack-developer-bundle" className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-medium">
                  <span>Full-Stack Developer: Zero to Job-Ready</span>
                </Link>
              </li>
              <li>
                <Link to="/courses/frontend-developer-zero-to-job-ready" className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-medium">
                  <span>Frontend Developer: Zero to Job-Ready</span>
                </Link>
              </li>
              <li>
                <Link to="/courses/backend-developer-zero-to-job-ready" className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-medium">
                  <span>Backend Developer: Zero to Job-Ready</span>
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/practice" className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-emerald-400 opacity-80 flex-shrink-0" aria-hidden="true" />
                  <span>Practice Arena (10 Projects)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Multidisciplinary Tracks */}
          <div>
            <h4 className="font-bold text-white mb-4 text-xs uppercase tracking-wider text-teal-300">
              Learning Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/courses?category=Professional%20Development%20Pathways" className="flex items-center justify-between text-slate-300 hover:text-emerald-400 transition-colors">
                  <span>Professional Pathways</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">3 Courses</span>
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Cybersecurity" className="flex items-center justify-between text-slate-300 hover:text-emerald-400 transition-colors">
                  <span>Cybersecurity</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">1 Course</span>
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Data%20%26%20Analytics" className="flex items-center justify-between text-slate-300 hover:text-emerald-400 transition-colors">
                  <span>Data &amp; Analytics</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">6 Courses</span>
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Islamic%20Studies" className="flex items-center justify-between text-slate-300 hover:text-emerald-400 transition-colors">
                  <span>Islamic Studies</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">6 Courses</span>
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Business%20%26%20Entrepreneurship" className="flex items-center justify-between text-slate-300 hover:text-emerald-400 transition-colors">
                  <span>Business &amp; Entrepreneurship</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">3 Courses</span>
                </Link>
              </li>
              <li>
                <Link to="/tracks/international-languages" className="flex items-center justify-between text-slate-300 hover:text-emerald-400 transition-colors">
                  <span>International Languages</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">6 Languages</span>
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Career%20Skills" className="flex items-center justify-between text-slate-300 hover:text-emerald-400 transition-colors">
                  <span>Career Skills</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">1 Course</span>
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-900">
                <Link to="/become-a-coach" className="flex items-center justify-between text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                  <span>Become a FAHMRISE Coach</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">Apply</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Architecture & Verification */}
          <div className="space-y-3">
            <h4 className="font-bold text-white mb-4 text-xs uppercase tracking-wider text-amber-400">
              Platform &amp; Verification
            </h4>
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>Verified Credentials</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Cryptographically signed certificates of completion, interactive browser sandboxes, and verified learning milestones.
              </p>
            </div>

            <div className="pt-1">
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" aria-hidden="true" />
                <span>FAHMRISE Global &amp; African Learning</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400">
            &copy; {new Date().getFullYear()} FAHMRISE Platform. Understand. Learn. Rise. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setPrivacyOpen(true)}
              className="text-slate-400 hover:text-white transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Privacy Notice
            </button>
            <button 
              onClick={() => setTermsOpen(true)}
              className="text-slate-400 hover:text-white transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Terms of Use
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Notice Modal */}
      <Modal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        title="FAHMRISE Privacy Policy & Data Security"
      >
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
          <p className="font-semibold text-white">Your Privacy on FAHMRISE:</p>
          <p>1. <strong>Minimal Data Collection</strong>: We only collect your name, email address, and learning progress to save your course state and issue verified certificates.</p>
          <p>2. <strong>Account Protection</strong>: Passwords are encrypted using industry-standard bcrypt hashing with strict token-based session verification.</p>
          <p>3. <strong>User Isolation</strong>: Your private learning progress, project submissions, and quiz results are strictly isolated to your authenticated account.</p>
          <p>4. <strong>AI Data Safety</strong>: Your queries to the FAHMRISE AI Tutor are processed securely without exposing sensitive account data.</p>
          <div className="pt-2">
            <button
              onClick={() => setPrivacyOpen(false)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold cursor-pointer"
            >
              Close Privacy Notice
            </button>
          </div>
        </div>
      </Modal>

      {/* Terms of Use Modal */}
      <Modal
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
        title="FAHMRISE Terms of Service"
      >
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
          <p className="font-semibold text-white">Welcome to FAHMRISE!</p>
          <p>1. <strong>Educational Content</strong>: All lessons, project specifications, and quizzes across Technology, Islamic Studies, Business, Languages, and Career Skills are crafted for practical competency.</p>
          <p>2. <strong>AI Tutor Guidance</strong>: The FAHMRISE AI Tutor is an automated Socratic learning mentor designed to assist students 24/7.</p>
          <p>3. <strong>Verified Certificates</strong>: Certificate verification is cryptographically confirmed against the registry upon successful course completion.</p>
          <div className="pt-2">
            <button
              onClick={() => setTermsOpen(false)}
              className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      </Modal>
    </footer>
  );
}

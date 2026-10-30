import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ShieldCheck, Sparkles, Globe, ArrowRight } from 'lucide-react';
import Modal from '../common/Modal';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { getWhatsAppChatUrl } from '../../config/contactConfig';

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <footer className="bg-[#0B2F2D] text-slate-300 text-sm border-t border-[#072120]">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* 1. FAHMRISE Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/fahmrise-gold-emblem.png"
                alt="FAHMRISE Gold Emblem"
                className="w-10 h-10 object-contain drop-shadow"
              />
              <div>
                <span className="text-2xl font-serif font-bold text-[#E5B869] tracking-tight leading-none block">
                  FAHMRISE
                </span>
                <span className="text-[10px] font-bold text-[#E5B869] uppercase tracking-[0.2em] leading-none mt-1 block">
                  LEARNING WITHOUT LIMITS
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#C4D9D7] leading-relaxed">
              Empowering learners worldwide with quality education, practical skills and endless opportunities.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <a 
                href="mailto:fahmrise.contact@gmail.com" 
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#E5B869] hover:text-[#f3cca0] transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>fahmrise.contact@gmail.com</span>
              </a>
              <a 
                href={getWhatsAppChatUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#25D366] hover:text-[#20ba5a] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="text-[#C4D9D7] hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-[#C4D9D7] hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/practice" className="text-[#C4D9D7] hover:text-white transition-colors">
                  Practice
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-[#C4D9D7] hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a href="/#about" className="text-[#C4D9D7] hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-[#C4D9D7] hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Categories */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/courses/frontend-developer-zero-to-job-ready" className="text-[#C4D9D7] hover:text-white transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/courses/data-analysis-spreadsheets" className="text-[#C4D9D7] hover:text-white transition-colors">
                  Data Analysis
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Islamic%20Studies" className="text-[#C4D9D7] hover:text-white transition-colors">
                  Islamic Studies
                </Link>
              </li>
              <li>
                <Link to="/tracks/international-languages" className="text-[#C4D9D7] hover:text-white transition-colors">
                  Languages
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Business" className="text-[#C4D9D7] hover:text-white transition-colors">
                  Business
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Career%20Skills" className="text-[#C4D9D7] hover:text-white transition-colors">
                  Career Skills
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Trust & Credentials */}
          <div className="space-y-4">
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Platform &amp; Trust
            </h4>
            
            <div className="p-3.5 bg-black/20 rounded-xl border border-white/10 text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#E5B869] font-bold">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Verified Credentials</span>
              </div>
              <p className="text-[11px] text-[#C4D9D7] leading-relaxed">
                Cryptographically signed certificates, browser coding sandboxes, and self-contained interactive curriculums.
              </p>
            </div>

            <div className="p-3.5 bg-black/20 rounded-xl border border-white/10 text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                <span>24/7 Socratic AI Tutor</span>
              </div>
              <p className="text-[11px] text-[#C4D9D7] leading-relaxed">
                Immediate hints, concept breakdowns, and code guidance whenever you need assistance.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-[#A2C4C1]">
            &copy; {new Date().getFullYear()} FAHMRISE. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="font-bold tracking-[0.2em] text-[#E5B869] text-[11px] uppercase">
              LEARNING WITHOUT LIMITS
            </span>
            <button 
              onClick={() => setPrivacyOpen(true)}
              className="text-[#C4D9D7] hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setTermsOpen(true)}
              className="text-[#C4D9D7] hover:text-white transition-colors cursor-pointer"
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
        title="FAHMRISE Privacy Policy & Data Protection"
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
              Close Privacy Policy
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
              className="w-full py-2 bg-[#E5B869] hover:bg-[#d9ab58] text-[#0B2F2D] rounded-xl font-bold cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      </Modal>
    </footer>
  );
}

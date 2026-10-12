import React, { useState } from 'react';
import { 
  HelpCircle, 
  Coins, 
  ArrowRight,
  HeartHandshake
} from 'lucide-react';
import CoachApplicationModal from '../components/coach/CoachApplicationModal';

export default function BecomeCoachPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const faqs = [
    {
      q: "Who can apply to become a FAHMRISE Coach?",
      a: "We welcome passionate, qualified instructors in Qur'an recitation & Tajweed, Arabic language (grammar, conversation, morphology), Islamic studies, software engineering, and modern career/business skills. Whether you have formal degrees, Ijazah certifications, or deep industry experience, we encourage you to apply."
    },
    {
      q: "How are the coaching rates decided?",
      a: "Applicants propose their preferred rate and teaching format during the application process. Final terms and scheduling are confirmed with FAHMRISE academic administrators upon review and approval."
    },
    {
      q: "Is my application data kept private?",
      a: "Yes. All personal contact information, qualifications, and proposed rates are strictly confidential and only visible to authorized FAHMRISE academic administrators."
    },
    {
      q: "When will my coach profile become active?",
      a: "Profiles are not automatically published. Our academic team reviews every application to ensure curriculum alignment and quality standards before granting verified coach privileges."
    },
    {
      q: "How do payouts work in Kenya and East Africa?",
      a: "Coaching earnings will be disbursed transparently in Kenyan Shillings (KSh) through supported mobile money (M-Pesa) and direct bank transfers."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      
      {/* Page Hero */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            FAHMRISE Educator Program
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Empower the Next Generation. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Become a FAHMRISE Coach.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Share your knowledge, inspire learners, and earn by teaching what you know. We welcome qualified and passionate coaches in technology, Arabic, Qur’an recitation and Tajweed, Islamic studies, and business.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-xl shadow-emerald-950/50 flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <Coins className="w-4 h-4" />
              <span>Apply to Become a Coach</span>
            </button>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">Everything you need to know about coaching</h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono text-sm">0{idx + 1}.</span> {faq.q}
              </h4>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-8 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/30 rounded-3xl">
          <h4 className="text-xl font-bold text-white mb-2">Ready to inspire learners worldwide?</h4>
          <p className="text-slate-300 text-sm mb-6 max-w-lg mx-auto">
            Submit your application today. Our academic review committee will review your proposal and get in touch with you.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/40 inline-flex items-center gap-2"
          >
            <span>Express Your Interest Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Modal */}
      <CoachApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

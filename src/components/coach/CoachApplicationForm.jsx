import React, { useState, useEffect } from 'react';
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Mail, 
  Phone, 
  Award, 
  BookOpen, 
  DollarSign, 
  Sparkles,
  Users,
  ShieldCheck,
  Briefcase,
  HelpCircle
} from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

// Standard Suggested Coaching Starting Prices per Category (approved baselines)
export const COACH_STARTING_PRICES = [
  {
    category: "Qur’an Recitation & Tajweed",
    oneToOne: "KSh 1,500",
    smallGroup: "KSh 500",
    hint: "KSh 1,500 (1-on-1, 60 min) or KSh 500 (Small Group)"
  },
  {
    category: "Arabic Language (Grammar & Conversation)",
    oneToOne: "KSh 1,500",
    smallGroup: "KSh 500",
    hint: "KSh 1,500 (1-on-1, 60 min) or KSh 500 (Small Group)"
  },
  {
    category: "Islamic Studies",
    oneToOne: "KSh 1,500",
    smallGroup: "KSh 500",
    hint: "KSh 1,500 (1-on-1, 60 min) or KSh 500 (Small Group)"
  },
  {
    category: "Technology & Software Engineering",
    oneToOne: "KSh 2,500",
    smallGroup: "KSh 1,000",
    hint: "KSh 2,500 (1-on-1, 60 min) or KSh 1,000 (Small Group)"
  },
  {
    category: "Modern Career Skills & Business",
    oneToOne: "KSh 2,000",
    smallGroup: "KSh 750",
    hint: "KSh 2,000 (1-on-1, 60 min) or KSh 750 (Small Group)"
  },
  {
    category: "Other Specialized Areas",
    oneToOne: "Custom quote",
    smallGroup: "Custom quote",
    hint: "Propose custom rate based on expertise & duration"
  }
];

export default function CoachApplicationForm({ onSuccess, isModal = false }) {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    expertise: 'Qur’an Recitation & Tajweed',
    qualifications: '',
    preferredFormat: 'Both One-to-One and Small Group',
    preferredPrice: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Pre-fill user data if available
    setFormData(prev => ({
      ...prev,
      fullName: user?.name || prev.fullName,
      email: user?.email || prev.email,
      phone: user?.phone || prev.phone
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const activePricing = COACH_STARTING_PRICES.find(p => p.category === formData.expertise) ||
    COACH_STARTING_PRICES.find(p => formData.expertise?.startsWith(p.category.split(' ')[0]));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Field 1: Full Name (required)
    if (!formData.fullName.trim()) {
      setError('Full Name is required.');
      return;
    }

    // Field 2: Email Address (required & format valid)
    if (!formData.email.trim()) {
      setError('Email Address is required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please provide a valid email address (e.g. coach@domain.com).');
      return;
    }

    // Field 4: Area of Expertise (required)
    if (!formData.expertise.trim()) {
      setError('Please select your Area of Expertise.');
      return;
    }

    // Field 5: Qualifications or Relevant Experience (required)
    if (!formData.qualifications.trim()) {
      setError('Please describe your Qualifications or Relevant Experience.');
      return;
    }

    // Field 6: Preferred Coaching Format (required)
    if (!formData.preferredFormat.trim()) {
      setError('Please select your Preferred Coaching Format.');
      return;
    }

    // Field 7: Preferred Price (in KSh) (required)
    if (!formData.preferredPrice.trim()) {
      setError('Please enter your Preferred Price (in KSh).');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        areaOfExpertise: formData.expertise,
        expertise: formData.expertise,
        qualifications: formData.qualifications.trim(),
        coachingFormat: formData.preferredFormat,
        preferredFormat: formData.preferredFormat,
        preferredPrice: formData.preferredPrice.trim(),
        priceUnit: 'in KSh',
        proposal: formData.qualifications.trim(),
        teachingProposal: formData.qualifications.trim()
      };

      await api.coaches.apply(payload);
      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Coach application submission error:', err);
      setError(err.data?.error || err.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 sm:p-12 text-center rounded-3xl bg-slate-900/90 border border-emerald-500/40 shadow-2xl space-y-6">
        <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle className="w-9 h-9" />
        </div>
        
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">Application Received</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome to the Review Process, {formData.fullName}!
          </h3>
          <p className="text-slate-300 max-w-lg mx-auto text-sm leading-relaxed">
            Your application to become a FAHMRISE Coach has been securely recorded. Our Academic & Curriculum Review Committee will examine your credentials.
          </p>
        </div>

        <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800 text-left text-xs sm:text-sm text-slate-300 space-y-2.5 max-w-lg mx-auto">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Next Steps in Your Onboarding:</span>
          </div>
          <ul className="space-y-1.5 text-slate-400 pl-6 list-disc">
            <li>Review committee verifies qualifications and subject alignment within 2-3 business days.</li>
            <li>We will reach out to you via <strong className="text-slate-200">{formData.email}</strong> to finalize session rates and profile scheduling.</li>
            <li>Applicant records are strictly confidential and payouts are disbursed transparently in Kenyan Shillings (KSh).</li>
          </ul>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              setFormData({
                fullName: user?.name || '',
                email: user?.email || '',
                phone: user?.phone || '',
                expertise: 'Qur’an Recitation & Tajweed',
                qualifications: '',
                preferredFormat: 'Both One-to-One and Small Group',
                preferredPrice: ''
              });
            }}
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors border border-slate-700"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${isModal ? '' : 'max-w-3xl mx-auto'}`}>
      
      {/* Header & Introduction */}
      <div className="space-y-2 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          Apply to Become a FAHMRISE Coach
        </h2>
        <p className="text-sm sm:text-base text-emerald-400 font-medium">
          Share your mastery, inspire learners, and earn in KSh.
        </p>
      </div>

      {/* 1. Standard Suggested Coaching Prices Table */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900/95 via-slate-900 to-amber-950/20 border border-amber-500/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Standard Suggested Coaching Prices
              </h4>
              <p className="text-xs text-amber-300/90 font-medium">
                One clear starting price per category instead of price ranges
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
            Approved Starting Baselines
          </span>
        </div>

        {/* Category Pricing Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70 shadow-inner">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90 text-[11px] uppercase tracking-wider text-slate-400">
                <th className="py-3 px-3.5 sm:px-4 font-bold text-slate-300">Coaching Category</th>
                <th className="py-3 px-3.5 sm:px-4 font-bold text-right text-amber-200">
                  One-to-One <span className="font-normal lowercase text-slate-400 block text-[10px]">(per 60-minute session)</span>
                </th>
                <th className="py-3 px-3.5 sm:px-4 font-bold text-right text-teal-200">
                  Small Group <span className="font-normal lowercase text-slate-400 block text-[10px]">(per learner, per session)</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {COACH_STARTING_PRICES.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3.5 sm:px-4 text-slate-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="font-semibold text-xs sm:text-sm">{item.category}</span>
                  </td>
                  <td className="py-2.5 px-3.5 sm:px-4 text-right font-mono font-bold text-amber-300 whitespace-nowrap text-xs sm:text-sm">
                    {item.oneToOne}
                  </td>
                  <td className="py-2.5 px-3.5 sm:px-4 text-right font-mono font-bold text-teal-300 whitespace-nowrap text-xs sm:text-sm">
                    {item.smallGroup}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Required Disclaimers */}
        <div className="space-y-2 pt-1">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200/95 leading-relaxed">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              These are suggested starting prices, not guaranteed earnings or compulsory prices. Coaches may propose a different rate, subject to FAHMRISE review and approval.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5 text-[11px] text-slate-400 leading-relaxed">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-300">Clearly labeled:</strong> Suggested rates are for planning purposes, not guaranteed earnings. Official rates and bookings are finalized upon application review.
            </p>
          </div>
        </div>

        {/* Platform Commission & Transparent Split */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/30 via-slate-950/80 to-teal-950/30 border border-emerald-500/30 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h5 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                FAHMRISE Platform Commission & Payout Model
              </h5>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono font-bold">
              70% Coach / 30% Platform Split
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-lg">
              <span className="text-emerald-400 font-bold block mb-0.5">70% Coach Payout</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Coaches receive 70% of gross tuition, paid out in Kenyan Shillings (KSh) via M-Pesa or direct bank transfer.
              </p>
            </div>
            <div className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-lg">
              <span className="text-teal-400 font-bold block mb-0.5">30% Platform Fee</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Retained to cover student acquisition, M-Pesa processing, and live interactive video infrastructure.
              </p>
            </div>
            <div className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-lg">
              <span className="text-cyan-400 font-bold block mb-0.5">Zero Upfront Cost</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                100% free to apply. No recurring listing fees or subscriptions required to become a FAHMRISE Coach.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-5">
        
        {error && (
          <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/40 text-xs sm:text-sm text-red-200 flex items-center gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* 1. Full Name* & 2. Email Address* */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-emerald-400">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Ustadh Ahmed Hassan"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Email Address <span className="text-emerald-400">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* 3. Phone Number (optional) & 4. Area of Expertise* */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Phone Number <span className="text-slate-500 font-normal lowercase">(optional)</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+254 7XX XXX XXX"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Area of Expertise <span className="text-emerald-400">*</span>
            </label>
            <div className="relative">
              <BookOpen className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer"
              >
                <option value="Qur’an Recitation & Tajweed">Qur’an Recitation & Tajweed</option>
                <option value="Arabic Language (Grammar & Conversation)">Arabic Language (Grammar & Conversation)</option>
                <option value="Islamic Studies">Islamic Studies</option>
                <option value="Technology & Software Engineering">Technology & Software Engineering</option>
                <option value="Modern Career Skills & Business">Modern Career Skills & Business</option>
                <option value="Other Specialized Area">Other Specialized Area</option>
              </select>
            </div>
          </div>
        </div>

        {/* 5. Qualifications or Relevant Experience* */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Qualifications or Relevant Experience <span className="text-emerald-400">*</span>
          </label>
          <div className="relative">
            <Award className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <textarea
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              rows="3"
              placeholder="Describe your degrees, Ijazah certifications, teaching background, industry experience, or subjects taught..."
              required
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            ></textarea>
          </div>
        </div>

        {/* 6. Preferred Coaching Format* & 7. Preferred Price (in KSh)* */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Preferred Coaching Format <span className="text-emerald-400">*</span>
            </label>
            <div className="relative">
              <Users className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                name="preferredFormat"
                value={formData.preferredFormat}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer"
              >
                <option value="Both One-to-One and Small Group">Both One-to-One and Small Group</option>
                <option value="One-to-One Coaching Only">One-to-One Coaching Only</option>
                <option value="Small Group Coaching Only">Small Group Coaching Only</option>
                <option value="Specialized Workshops / Masterclasses">Specialized Workshops / Masterclasses</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Preferred Price (in KSh) <span className="text-emerald-400">*</span>
            </label>
            <div className="relative">
              <span className="text-xs font-bold text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 font-mono">
                KSh
              </span>
              <input
                type="text"
                name="preferredPrice"
                value={formData.preferredPrice}
                onChange={handleChange}
                placeholder="e.g. 1,500 / session or 500 / learner"
                required
                className="w-full pl-12 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
              />
            </div>
            {activePricing && (
              <p className="text-[11px] text-amber-300/90 mt-1.5 flex items-center gap-1.5 leading-tight">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  Suggested baseline for {formData.expertise}: <strong className="text-white font-mono">{activePricing.hint}</strong>. You may propose your custom rate.
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Encrypted & confidential review</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/50 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Submitting Application...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Application</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}

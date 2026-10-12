import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Mail, 
  Phone, 
  Award, 
  BookOpen, 
  DollarSign, 
  Clock, 
  FileText,
  Sparkles,
  Users,
  ShieldCheck
} from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function CoachApplicationModal({ isOpen, onClose, defaultExpertise = '', defaultFormat = 'both' }) {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    expertise: 'Quran recitation and Tajweed',
    qualifications: '',
    preferredFormat: 'both',
    preferredPrice: '',
    proposal: '',
    availability: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [rateInfo, setRateInfo] = useState(null);

  useEffect(() => {
    if (isOpen) {
      // Pre-fill user information if signed in
      setFormData(prev => ({
        ...prev,
        fullName: user?.name || prev.fullName,
        email: user?.email || prev.email,
        phone: user?.phone || prev.phone,
        expertise: defaultExpertise || prev.expertise || 'Quran recitation and Tajweed',
        preferredFormat: defaultFormat || prev.preferredFormat || 'both'
      }));
      setError('');
      setSuccess(false);

      // Fetch live rate suggestions
      api.coaches.getRates()
        .then(res => {
          if (res?.data) {
            setRateInfo(res.data);
          }
        })
        .catch(() => {});
    }
  }, [isOpen, user, defaultExpertise, defaultFormat]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side validations
    if (!formData.fullName.trim() || !formData.email.trim()) {
      setError('Please provide your full name and email address.');
      return;
    }

    if (!formData.qualifications.trim()) {
      setError('Please share your qualifications or relevant teaching experience.');
      return;
    }

    if (!formData.preferredPrice.trim()) {
      setError('Please indicate your preferred rate in Kenyan Shillings (KSh).');
      return;
    }

    if (!formData.proposal.trim()) {
      setError('Please provide a short introduction or coaching proposal.');
      return;
    }

    setLoading(true);
    try {
      await api.coaches.apply({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        expertise: formData.expertise,
        qualifications: formData.qualifications.trim(),
        preferredFormat: formData.preferredFormat,
        preferredPrice: formData.preferredPrice.trim(),
        proposal: formData.proposal.trim(),
        availability: formData.availability.trim()
      });

      setSuccess(true);
    } catch (err) {
      console.error('Coach application error:', err);
      setError(err.data?.error || err.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/15 backdrop-blur-md rounded-xl">
              <Sparkles className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Apply to Become a FAHMRISE Coach</h2>
              <p className="text-xs text-emerald-100/90 font-medium">Share your mastery, inspire learners, and earn in KSh</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-emerald-100 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {success ? (
            <div className="text-center py-8 px-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white">Application Received!</h3>
              <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. Your coach application has been submitted to the FAHMRISE Academic & Review Committee.
              </p>
              
              <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-xl text-left text-xs text-slate-300 space-y-2 max-w-md mx-auto">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" /> Next Steps in Review Process:
                </div>
                <ul className="list-disc pl-5 space-y-1 text-slate-400">
                  <li>Our academic review team evaluates qualifications within 2-3 business days.</li>
                  <li>We will contact you at <strong className="text-slate-200">{formData.email}</strong> to finalize session rates and profile onboarding.</li>
                  <li>Your coach profile is kept private until official approval.</li>
                </ul>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-colors shadow-lg shadow-emerald-900/30"
                >
                  Close & Return to Learning
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Guidance / Planning Rates Disclaimer */}
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3 text-xs text-amber-200">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-amber-300">Suggested Planning Rates in Kenyan Shillings (KSh):</p>
                  <p className="text-slate-300">
                    • 1-on-1: <span className="text-amber-200 font-mono">KSh 500 – 1,500 / hr</span> &nbsp;|&nbsp; 
                    • Small Group: <span className="text-amber-200 font-mono">KSh 200 – 500 / learner</span> &nbsp;|&nbsp; 
                    • Specialized: Propose your custom rate below.
                  </p>
                  <p className="text-[11px] text-amber-400/80 italic">
                    * Clearly labeled: Suggested rates are for planning purposes, not guaranteed earnings. Official rates and bookings are finalized upon application review.
                  </p>
                </div>
              </div>

              {error && (
                <div className="p-3.5 bg-red-500/15 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
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
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Phone and Area of Expertise */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Phone Number <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+254 7XX XXX XXX"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Area of Expertise <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      name="expertise"
                      value={formData.expertise}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    >
                      <option value="Quran recitation and Tajweed">Qur’an Recitation & Tajweed</option>
                      <option value="Arabic Language (Grammar & Conversation)">Arabic Language (Grammar & Conversation)</option>
                      <option value="Islamic Studies">Islamic Studies</option>
                      <option value="Technology & Software Engineering">Technology & Software Engineering</option>
                      <option value="Modern Career Skills & Business">Modern Career Skills & Business</option>
                      <option value="Other Specialized Area">Other Specialized Area</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Qualifications */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Qualifications or Relevant Experience <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <Award className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <textarea
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Describe your degrees, Ijazah, teaching background, certifications, or professional experience..."
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  ></textarea>
                </div>
              </div>

              {/* Coaching Format & Rate Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Preferred Coaching Format <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      name="preferredFormat"
                      value={formData.preferredFormat}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    >
                      <option value="both">Both One-to-One and Small Group</option>
                      <option value="one_to_one">One-to-One Coaching Only</option>
                      <option value="small_group">Small Group Coaching Only</option>
                      <option value="specialized">Specialized Workshops / Masterclasses</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Preferred Price (in KSh) <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="text-xs font-bold text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2">KSh</span>
                    <input
                      type="text"
                      name="preferredPrice"
                      value={formData.preferredPrice}
                      onChange={handleChange}
                      placeholder="e.g. KSh 1,000/hr or KSh 350/session"
                      required
                      className="w-full pl-12 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Short Proposal / Introduction */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Short Introduction & Proposal <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <textarea
                    name="proposal"
                    value={formData.proposal}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Briefly describe what you will teach, your pedagogy, and how you will help learners rise..."
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  ></textarea>
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Availability & Hours per Week <span className="text-slate-400 font-normal">(e.g. Weekday evenings, 6 hrs/week)</span>
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    placeholder="e.g. Monday - Thursday 6 PM - 9 PM EAT (10 hrs/wk)"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-emerald-900/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
          )}
        </div>

      </div>
    </div>
  );
}

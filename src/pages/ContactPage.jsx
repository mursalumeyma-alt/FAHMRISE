import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Send, 
  ChevronRight, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { api } from '../services/api';
import { 
  CONTACT_CONFIG, 
  isWhatsAppConfigured, 
  isRealWhatsAppConfigured,
  getWhatsAppChatUrl 
} from '../config/contactConfig';

/**
 * Official WhatsApp SVG Brand Icon
 */
export function WhatsAppIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

export default function ContactPage() {
  // Always scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Email Copy State
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // WhatsApp configuration & click-to-chat URL
  const isRealConfigured = isRealWhatsAppConfigured();
  const whatsappUrl = getWhatsAppChatUrl();

  const handleCopyEmail = async () => {
    let success = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(CONTACT_CONFIG.email);
        success = true;
      }
    } catch (e) {
      // Fallback below
    }

    if (!success) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = CONTACT_CONFIG.email;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch (err) {
        console.warn('Clipboard copy failed:', err);
      }
    }

    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic Validation
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.subject.trim()) {
      setErrorMessage('Please provide a subject for your message.');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMessage('Your message must be at least 10 characters long.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await api.contact.sendMessage(formData);
      if (response && response.success) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMessage(response.error || 'Failed to send message. Please try again or email us directly.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setErrorMessage(
        err.message || 'Unable to connect to the FAHMRISE support service. Please try again or reach us via email at fahmrise.contact@gmail.com.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmitSuccess(false);
    setErrorMessage(null);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 selection:bg-[#E5B869] selection:text-[#0B2F2D]">
      
      {/* =========================================================================
          1. HERO HEADER SECTION (Deep Teal #0B2F2D with Gold Accents)
         ========================================================================= */}
      <section className="relative bg-[#0B2F2D] text-white overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20 border-b border-[#072120] shadow-md">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E5B869]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#165b57]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#C4D9D7] mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-[#E5B869] font-semibold">Contact Us</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5B869]/15 border border-[#E5B869]/30 text-[#E5B869] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FAHMRISE SUPPORT &amp; INQUIRIES</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Contact FAHMRISE
            </h1>

            <p className="text-base sm:text-lg text-[#FAF8F5] opacity-90 leading-relaxed font-normal">
              Have questions about our curriculums, pricing, technical setup, or certifications? Our academic and student support team is here to assist you.
            </p>
          </div>

          {/* Quick Value Row */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#C4D9D7]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E5B869]" />
              <strong className="text-white">Email:</strong> fahmrise.contact@gmail.com
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <strong className="text-white">Location:</strong> Nairobi, Kenya
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E5B869]" />
              <strong className="text-white">Response:</strong> Within 24 hours
            </span>
          </div>

        </div>
      </section>


      {/* =========================================================================
          2. MAIN CONTENT: CONTACT CHANNELS & INTERACTIVE FORM
         ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* -------------------------------------------------------------------
              LEFT COLUMN (5 Cols): DIRECT CONTACT CHANNELS (WhatsApp + Email)
             ------------------------------------------------------------------- */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. WhatsApp Contact Section */}
            <div 
              data-testid="whatsapp-contact-section"
              className="bg-white rounded-3xl border border-[#E2D9C8] p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Green ambient decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] flex-shrink-0">
                    <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#25D366]/10 text-[#075E54] border border-[#25D366]/30">
                    WhatsApp Support
                  </span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-xl font-serif font-bold text-[#0B2F2D]">
                    Instant WhatsApp Chat
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Connect directly with our admissions and technical advisors for instant guidance and enrollment support.
                  </p>
                </div>

                {/* Primary WhatsApp Click-to-Chat Button */}
                <div className="pt-2 space-y-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="whatsapp-chat-button"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#1caa52] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer select-none"
                    onClick={(e) => {
                      if (!whatsappUrl) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                    <span>Chat with FAHMRISE on WhatsApp</span>
                    <ExternalLink className="w-4 h-4 opacity-80 flex-shrink-0 ml-1" />
                  </a>

                  <div className="space-y-1.5 text-center sm:text-left">
                    <span className="text-[11px] text-slate-500 block text-center">
                      Opens WhatsApp in a new tab or the WhatsApp application
                    </span>

                    {/* Status note regarding WhatsApp number */}
                    {!isRealConfigured ? (
                      <div 
                        data-testid="whatsapp-status-note"
                        className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9C8] text-left text-xs text-slate-600 space-y-1.5"
                      >
                        <div className="flex items-center gap-2 font-bold text-[#0B2F2D] text-xs">
                          <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                          <span>Click-to-chat URL: <code className="font-mono text-[#0B2F2D]">{whatsappUrl?.split('?')[0]}</code></span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Note: The real FAHMRISE WhatsApp phone number is required to replace the <code className="font-mono text-slate-700 font-bold">254XXXXXXXXX</code> placeholder.
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-700 font-semibold pt-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Official Dedicated Support Line Active</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Email Contact Section */}
            <div 
              data-testid="email-contact-section"
              className="bg-white rounded-3xl border border-[#E2D9C8] p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#0B2F2D]/10 border border-[#0B2F2D]/20 flex items-center justify-center text-[#0B2F2D] flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#0B2F2D]" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FAF8F5] text-slate-700 border border-[#E2D9C8]">
                    Official Support Channel
                  </span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-xl font-serif font-bold text-[#0B2F2D]">
                    Email Inquiries &amp; Admissions
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    For course syllabus inquiries, verified credential checks, corporate partnerships, and technical support.
                  </p>
                </div>

                {/* Email Address Display Box */}
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E2D9C8] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Support Email
                    </span>
                    <a
                      href={`mailto:${CONTACT_CONFIG.email}`}
                      data-testid="contact-email-link"
                      className="font-mono text-sm font-bold text-[#0B2F2D] hover:text-[#E5B869] transition-colors break-all"
                    >
                      {CONTACT_CONFIG.email}
                    </a>
                  </div>
                </div>

                {/* Email Actions: Copy and Open Client */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {/* Button 1: Copy Email Address */}
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    data-testid="copy-email-button"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF8F5] text-slate-800 text-xs font-bold border border-[#E2D9C8] hover:border-[#0B2F2D] shadow-2xs transition-all cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-500" />
                        <span>Copy Email Address</span>
                      </>
                    )}
                  </button>

                  {/* Button 2: Open Email Application */}
                  <a
                    href={`mailto:${CONTACT_CONFIG.email}`}
                    data-testid="open-email-app-button"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B2F2D] hover:bg-[#165b57] text-white text-xs font-bold shadow-2xs transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 text-[#E5B869]" />
                    <span>Open Email App</span>
                  </a>
                </div>
              </div>
            </div>

            {/* 3. Office & Response Time Details */}
            <div className="bg-[#FAF8F5] rounded-3xl border border-[#E2D9C8] p-6 space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#0B2F2D] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block mb-0.5">Operating Hours</strong>
                  <span>{CONTACT_CONFIG.officeHours}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0B2F2D] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block mb-0.5">Headquarters</strong>
                  <span>{CONTACT_CONFIG.location} — Serving learners across East Africa and globally.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block mb-0.5">Verified Response Guarantee</strong>
                  <span>All academic inquiries receive a response from our designated faculty within 24 hours.</span>
                </div>
              </div>
            </div>

          </div>


          {/* -------------------------------------------------------------------
              RIGHT COLUMN (7 Cols): INTERACTIVE CONTACT FORM
             ------------------------------------------------------------------- */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#E2D9C8] p-6 sm:p-10 shadow-sm relative">
              
              {/* Form Title */}
              <div className="space-y-2 mb-8 border-b border-[#E2D9C8] pb-6">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0B2F2D] uppercase tracking-wider">
                  <MessageSquare className="w-4 h-4 text-[#E5B869]" />
                  <span>Send a Direct Message</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2F2D]">
                  How can we help your learning journey?
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Fill in your details below and our academic support team will review your message and reply promptly.
                </p>
              </div>

              {/* Success Notification Feedback */}
              {submitSuccess ? (
                <div 
                  data-testid="contact-success-banner"
                  className="p-8 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-center space-y-4 animate-in fade-in"
                >
                  <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-serif font-bold text-emerald-950">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting FAHMRISE. Your inquiry has been received by our student support team. We will review it and reply to your email shortly.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                /* Form Fields */
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Error Notification Feedback */}
                  {errorMessage && (
                    <div 
                      data-testid="contact-error-banner"
                      className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-3 animate-in fade-in"
                    >
                      <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1 flex-1">
                        <strong className="block font-semibold">Message Submission Notice:</strong>
                        <p>{errorMessage}</p>
                        <p className="pt-1">
                          You can also email us directly at{' '}
                          <a href={`mailto:${CONTACT_CONFIG.email}`} className="font-bold underline text-rose-900">
                            {CONTACT_CONFIG.email}
                          </a>.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Sarah Kamau"
                        disabled={submitting}
                        className="w-full px-4 py-3 bg-white border border-[#E2D9C8] rounded-xl text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#0B2F2D] focus:ring-2 focus:ring-[#0B2F2D]/10 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. sarah@example.com"
                        disabled={submitting}
                        className="w-full px-4 py-3 bg-white border border-[#E2D9C8] rounded-xl text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#0B2F2D] focus:ring-2 focus:ring-[#0B2F2D]/10 transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700">
                      Subject / Topic <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Course enrollment, certificate verification, or general question"
                      disabled={submitting}
                      className="w-full px-4 py-3 bg-white border border-[#E2D9C8] rounded-xl text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#0B2F2D] focus:ring-2 focus:ring-[#0B2F2D]/10 transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700">
                        Your Message <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {formData.message.length} characters (min 10)
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please share details about your inquiry, learning background, or any question you have..."
                      disabled={submitting}
                      className="w-full p-4 bg-white border border-[#E2D9C8] rounded-xl text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#0B2F2D] focus:ring-2 focus:ring-[#0B2F2D]/10 transition-all resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      data-testid="contact-submit-button"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#0B2F2D] hover:bg-[#165b57] disabled:bg-slate-400 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-[#E5B869]" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#E5B869]" />
                          <span>Send Message to FAHMRISE</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                    By submitting this form, your inquiry is recorded in our student support desk. We respect your privacy and never share your contact details.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>
      </main>

    </div>
  );
}

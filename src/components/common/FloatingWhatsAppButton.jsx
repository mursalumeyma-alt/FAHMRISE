import React, { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { getWhatsAppChatUrl, isRealWhatsAppConfigured, CONTACT_CONFIG } from '../../config/contactConfig';
import { MessageCircle, X, ExternalLink, Mail, Phone, AlertCircle } from 'lucide-react';

/**
 * Mobile-Responsive Floating WhatsApp Contact Button for FAHMRISE
 * - Fixed bottom-right positioning with high z-index.
 * - Mobile responsive padding and dimensions.
 * - If official business number is configured, opens WhatsApp click-to-chat directly.
 * - If unconfigured (placeholder), opens a friendly modal requesting the real number rather than inventing one.
 */
export default function FloatingWhatsAppButton() {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const isConfigured = isRealWhatsAppConfigured();
  const chatUrl = getWhatsAppChatUrl();

  const handleClick = (e) => {
    if (!isConfigured) {
      e.preventDefault();
      setShowConfigModal(true);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <aside
        aria-label="Contact options"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 group"
      >
        {/* Hover / Tooltip Pill on Desktop */}
        <div className="hidden sm:flex items-center px-3 py-1.5 rounded-full bg-slate-900/95 border border-emerald-500/30 text-white text-xs font-semibold shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-x-2 group-hover:translate-x-0">
          <span className="w-2 h-2 rounded-full bg-[#25D366] mr-2 animate-pulse"></span>
          <span>Chat on WhatsApp</span>
        </div>

        {/* WhatsApp Circular Button */}
        <a
          href={isConfigured ? chatUrl : '#'}
          target={isConfigured ? "_blank" : undefined}
          rel={isConfigured ? "noopener noreferrer" : undefined}
          onClick={handleClick}
          aria-label="Chat with FAHMRISE on WhatsApp"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-white flex items-center justify-center shadow-2xl shadow-emerald-950/60 border-2 border-white/20 transition-all duration-200 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
        >
          <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8" />
        </a>
      </aside>

      {/* Modal shown if official WhatsApp number is not yet configured */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative text-left">
            <button
              onClick={() => setShowConfigModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 flex items-center justify-center">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">WhatsApp Support</h3>
                <p className="text-xs text-slate-400">FAHMRISE Direct Student Inquiry</p>
              </div>
            </div>

            <div className="p-4 bg-amber-950/40 border border-amber-500/30 rounded-2xl space-y-2 text-xs text-amber-200">
              <div className="flex items-center gap-2 font-bold text-amber-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Official Business Number Required</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                The official FAHMRISE WhatsApp phone number is currently in configuration (<code className="font-mono text-amber-300 font-bold">254XXXXXXXXX</code>). Per security policy, we do not invent a placeholder phone number.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <p className="font-semibold text-white">To reach the FAHMRISE team immediately:</p>
              <div className="space-y-2">
                <a
                  href={`mailto:${CONTACT_CONFIG.email}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 text-slate-200 hover:text-white transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>Email: <strong>{CONTACT_CONFIG.email}</strong></span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>

                <a
                  href="/contact"
                  onClick={() => setShowConfigModal(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 text-slate-200 hover:text-white transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageCircle className="w-4 h-4 text-teal-400" />
                    <span>Submit Inquiry via <strong>Contact Form</strong></span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

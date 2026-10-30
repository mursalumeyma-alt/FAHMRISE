import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, ArrowRight } from 'lucide-react';

/**
 * WelcomePromoModal
 * 
 * First-visit promotional card inspired by Programiz PRO's clean engagement patterns.
 * - Non-blocking floating card (bottom-right on desktop, bottom-anchored banner on mobile)
 * - Honors localStorage dismissal ('fahmrise_welcome_dismissed')
 * - Highly configurable via props for future offers
 */
export default function WelcomePromoModal({
  storageKey = 'fahmrise_welcome_dismissed',
  delayMs = 1200,
  badge = 'WELCOME TO FAHMRISE!',
  headline = 'Be among the first learners to experience a better way to learn.',
  body = 'Discover our learning opportunities and explore our courses.',
  buttonText = 'Explore Courses',
  buttonLink = '/courses',
  dismissText = 'Maybe later',
  logoSrc = '/fahmrise-gold-emblem.png'
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or interacted
    try {
      const dismissed = localStorage.getItem(storageKey);
      if (dismissed === 'true') {
        return;
      }
    } catch (e) {
      // localStorage may fail in private mode
    }

    const timer = setTimeout(() => {
      setIsRendered(true);
      // Small tick for CSS transition
      requestAnimationFrame(() => setIsVisible(true));
    }, delayMs);

    return () => clearTimeout(timer);
  }, [storageKey, delayMs]);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(storageKey, 'true');
    } catch (e) {
      // silently handle
    }
    setTimeout(() => setIsRendered(false), 300);
  };

  const handleActionClick = () => {
    try {
      localStorage.setItem(storageKey, 'true');
    } catch (e) {
      // silently handle
    }
    setIsVisible(false);
    setTimeout(() => setIsRendered(false), 300);
  };

  if (!isRendered) return null;

  return (
    <aside
      aria-label="Welcome announcement"
      className={`fixed z-50 transition-all duration-300 ease-out 
        bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95 pointer-events-none'}`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#0B2F2D] text-white border-2 border-[#E5B869]/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-5 sm:p-6">
        
        {/* Subtle Decorative Ambient Lighting */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#E5B869]/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-[#165b57] rounded-full blur-xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          aria-label="Dismiss notification"
          className="absolute top-3.5 right-3.5 p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content Body */}
        <div className="flex items-start gap-3.5 relative z-10">
          {/* Logo / Icon */}
          <div className="w-11 h-11 rounded-xl bg-black/25 border border-[#E5B869]/40 flex items-center justify-center flex-shrink-0 p-1.5 shadow-inner">
            <img
              src={logoSrc}
              alt="FAHMRISE"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex-1 pr-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E5B869]/20 border border-[#E5B869]/40 text-[#E5B869] text-[10px] font-bold tracking-wider uppercase mb-1.5">
              <Sparkles className="w-3 h-3 text-[#E5B869]" />
              <span>{badge}</span>
            </div>

            {/* Headline */}
            <h4 className="text-base font-serif font-bold text-white tracking-tight leading-snug">
              {headline}
            </h4>

            {/* Body */}
            <p className="text-xs text-[#C4D9D7] mt-1.5 leading-relaxed font-normal">
              {body}
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between gap-3 relative z-10">
          <button
            onClick={handleDismiss}
            className="text-xs text-white/70 hover:text-white font-medium px-2 py-1.5 rounded transition-colors"
          >
            {dismissText}
          </button>

          <Link
            to={buttonLink}
            onClick={handleActionClick}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#E5B869] hover:bg-[#d9ab58] text-[#0B2F2D] text-xs font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </aside>
  );
}

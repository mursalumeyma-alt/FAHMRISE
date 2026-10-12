import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Square, VolumeX } from 'lucide-react';

/**
 * Strips markdown and formats technical HTML tags for smooth, natural speech.
 */
export function cleanTextForSpeech(text) {
  if (!text) return '';
  const cleaned = text
    // Replace multiline code blocks with natural speech cue
    .replace(/```[\s\S]*?```/g, ' Code snippet provided on screen. ')
    // Replace inline code with clear pronunciation
    .replace(/`<\/?([a-zA-Z0-9_-]+)[^`]*>`/g, ' $1 tag ')
    .replace(/`([^`]+)`/g, ' $1 ')
    // Remove markdown headers
    .replace(/#{1,6}\s+/g, '')
    // Remove bold and italics
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/~~(.*?)~~/g, '$2')
    // Remove links
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove blockquote markers
    .replace(/^>\s+/gm, '')
    // Remove bullet points
    .replace(/^[-*+]\s+/gm, '')
    // Remove icons/emojis that could sound awkward in TTS
    .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
    // Normalize spaces
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned || text;
}

/**
 * Accessible Text-to-Speech Button Component for Somaivo AI Tutor.
 * Uses native browser Web Speech API (window.speechSynthesis).
 */
export default function AiVoiceButton({ text, messageId, activeSpeakingId, onStartSpeaking, onStopSpeaking }) {
  const [isSupported, setIsSupported] = useState(true);
  const [voices, setVoices] = useState([]);
  const isSpeakingThis = activeSpeakingId === messageId;

  // Detect Web Speech API support and pre-cache voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    const loadVoices = () => {
      try {
        const availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices && availableVoices.length > 0) {
          setVoices(availableVoices);
        }
      } catch (err) {
        console.warn('Could not load speech voices:', err);
      }
    };

    loadVoices();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleToggleSpeak = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!isSupported || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this web browser.');
      return;
    }

    // If currently speaking this message, stop it immediately
    if (isSpeakingThis) {
      window.speechSynthesis.cancel();
      if (window._somaivoActiveUtterance) {
        window._somaivoActiveUtterance = null;
      }
      if (onStopSpeaking) onStopSpeaking();
      return;
    }

    // Cancel any ongoing speech first & ensure queue is unpaused
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const speechText = cleanTextForSpeech(text);
    if (!speechText || !speechText.trim()) return;

    // Create Utterance
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = 'en-US';
    utterance.rate = 0.95; // Slightly measured, clear pace for digital skills learners
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Pick natural English voice if available
    const currentVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
    if (currentVoices && currentVoices.length > 0) {
      const naturalVoice = currentVoices.find(v => 
        v.lang.startsWith('en') && 
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Jenny') || v.name.includes('Guy') || v.name.includes('David') || v.name.includes('Zira'))
      ) || currentVoices.find(v => v.lang.startsWith('en'));

      if (naturalVoice) {
        utterance.voice = naturalVoice;
      }
    }

    // Prevent Chromium garbage collection bug by keeping active window reference
    window._somaivoActiveUtterance = utterance;

    utterance.onstart = () => {
      if (onStartSpeaking) onStartSpeaking(messageId);
    };

    utterance.onend = () => {
      window._somaivoActiveUtterance = null;
      if (onStopSpeaking) onStopSpeaking();
    };

    utterance.onerror = (event) => {
      window._somaivoActiveUtterance = null;
      if (event.error !== 'canceled' && event.error !== 'interrupted') {
        console.warn('Speech synthesis playback error:', event.error);
      }
      if (onStopSpeaking) onStopSpeaking();
    };

    // Use a small delay after cancel() to ensure browser audio pipeline is ready
    setTimeout(() => {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.speak(utterance);
    }, 25);
  };

  // If browser does not support Web Speech API
  if (!isSupported) {
    return (
      <span 
        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] text-slate-500 bg-slate-900/50 border border-slate-800"
        title="Web Speech API is not supported in this browser"
      >
        <VolumeX className="w-3 h-3 text-slate-600" />
        <span>Voice unavailable</span>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggleSpeak}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
        isSpeakingThis
          ? 'bg-emerald-500 text-slate-950 shadow-glow animate-pulse'
          : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-700/70 hover:border-emerald-500/40'
      }`}
      aria-label={isSpeakingThis ? 'Stop voice readout' : 'Listen to AI response with voice text-to-speech'}
      title={isSpeakingThis ? 'Stop Voice' : 'Listen to response (Voice TTS)'}
    >
      {isSpeakingThis ? (
        <>
          <Square className="w-3 h-3 fill-current text-slate-950" />
          <span className="text-[10px] font-extrabold uppercase tracking-wide">Stop Voice</span>
          {/* Animated sound wave bars */}
          <span className="flex items-end gap-0.5 h-3 ml-0.5">
            <span className="w-0.5 h-2 bg-slate-950 animate-bounce rounded-full" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 h-3 bg-slate-950 animate-bounce rounded-full" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 h-2 bg-slate-950 animate-bounce rounded-full" style={{ animationDelay: '300ms' }} />
          </span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] font-medium text-slate-300 group-hover:text-white">Listen</span>
        </>
      )}
    </button>
  );
}

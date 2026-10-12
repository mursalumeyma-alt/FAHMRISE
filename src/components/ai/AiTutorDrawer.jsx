import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, Send, Sparkles, X, Lightbulb, AlertTriangle, RefreshCw, MessageSquare, ChevronDown, Check, Copy, ArrowDown, User } from 'lucide-react';
import { api } from '../../services/api';
import AiVoiceButton from './AiVoiceButton';

export default function AiTutorDrawer({ isOpen, onClose, currentLesson, currentExercise, userCode, initialMode }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: `👋 **Welcome! I'm your FAHMRISE AI Tutor.**\n\n*Understand. Learn. Rise.* I'm here to guide you through **${currentLesson?.title || 'this study topic'}**. Ask me questions, request hints on exercises, or ask me to explain errors in simple terms!\n\n*What would you like to explore today?*`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [activeSpeakingId, setActiveSpeakingId] = useState(null);
  
  // Dedicated internal scroll container ref
  const chatContainerRef = useRef(null);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [hasNewUnseenMessage, setHasNewUnseenMessage] = useState(false);

  // Safely scroll internal chat container without touching outer window
  const scrollToTarget = useCallback((targetTop, smooth = true) => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: targetTop,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }
  }, []);

  const scrollToBottom = useCallback((smooth = true) => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto'
      });
      setIsNearBottom(true);
      setHasNewUnseenMessage(false);
    }
  }, []);

  // Monitor internal scroll position
  const handleChatScroll = () => {
    const container = chatContainerRef.current;
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const nearBottom = scrollHeight - scrollTop - clientHeight < 120;
    setIsNearBottom(nearBottom);
    if (nearBottom) {
      setHasNewUnseenMessage(false);
    }
  };

  // Scroll to bottom once when drawer opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        scrollToBottom(false);
      }, 60);
      return () => clearTimeout(timer);
    } else {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setActiveSpeakingId(null);
      }
    }
  }, [isOpen, scrollToBottom]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // If opened with initialMode='hint'
  useEffect(() => {
    if (isOpen && initialMode === 'hint' && currentExercise) {
      handleSendPrompt('Give me a small hint for this exercise without giving away the full answer.');
    }
  }, [isOpen, initialMode, currentExercise]);

  const quickPrompts = [
    { label: '💡 Give me a hint', prompt: 'Can you give me a small hint on this challenge?' },
    { label: '❓ Explain this lesson simply', prompt: `Can you explain the main concept of ${currentLesson?.title || 'this lesson'} in simple terms with an analogy?` },
    { label: '🔍 Common beginner errors', prompt: 'What are the most common beginner mistakes with this topic and how do I avoid them?' }
  ];

  const handleSend = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    setLoading(true);

    const questionId = 'user_' + Date.now();
    const botPlaceholderId = 'bot_' + Date.now();

    setMessages(prev => [
      ...prev,
      {
        id: questionId,
        role: 'user',
        text: userText,
        timestamp: new Date()
      },
      {
        id: botPlaceholderId,
        role: 'assistant',
        text: '...',
        loading: true,
        timestamp: new Date()
      }
    ]);

    setTimeout(() => {
      if (chatContainerRef.current) {
        const questionEl = document.getElementById(`drawer-msg-${questionId}`);
        if (questionEl) {
          questionEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          scrollToBottom(true);
        }
      }
    }, 50);

    try {
      const data = await api.ai.chat({
        message: userText,
        currentLesson,
        currentExercise,
        userCode,
        mode: 'chat'
      });

      setMessages(prev =>
        prev.map(msg =>
          msg.id === botPlaceholderId
            ? { ...msg, text: data.reply, loading: false }
            : msg
        )
      );

      setTimeout(() => {
        if (chatContainerRef.current) {
          const answerEl = document.getElementById(`drawer-msg-${botPlaceholderId}`);
          if (answerEl) {
            const containerRect = chatContainerRef.current.getBoundingClientRect();
            const answerRect = answerEl.getBoundingClientRect();

            if (answerRect.bottom > containerRect.bottom || isNearBottom) {
              answerEl.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
          }
        }
      }, 50);
    } catch (err) {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === botPlaceholderId
            ? {
                ...msg,
                text: '⚠️ I encountered an error connecting to FAHMRISE AI Tutor. Please try asking again.',
                loading: false,
                isError: true
              }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendPrompt = (promptText) => {
    setInput(promptText);
  };

  const copyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-slate-950/98 backdrop-blur-xl border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      
      {/* Header */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">FAHMRISE AI Tutor</h3>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800">
                Voice Ready
              </span>
            </div>
            <p className="text-[10px] text-slate-400 truncate max-w-[200px]">
              {currentLesson?.title || 'Socratic Learning Assistant'}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          title="Close drawer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div
        ref={chatContainerRef}
        onScroll={handleChatScroll}
        className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-800 relative"
      >
        {messages.map((msg) => {
          const isBot = msg.role === 'assistant';
          return (
            <div
              key={msg.id}
              id={`drawer-msg-${msg.id}`}
              className={`flex gap-2.5 text-xs ${isBot ? 'items-start' : 'items-start flex-row-reverse'}`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isBot ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-300'
              }`}>
                {isBot ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
              </div>

              <div className={`max-w-[85%] rounded-2xl p-3 space-y-1.5 ${
                isBot
                  ? 'bg-slate-900 border border-slate-800 text-slate-200'
                  : 'bg-emerald-500 text-slate-950 font-medium'
              }`}>
                {msg.loading ? (
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" />
                    <span>Thinking...</span>
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none text-xs leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </div>
                )}

                {isBot && !msg.loading && (
                  <div className="flex items-center gap-2 pt-1.5 border-t border-slate-800/60 text-[10px] text-slate-400">
                    <AiVoiceButton
                      text={msg.text}
                      messageId={msg.id}
                      activeSpeakingId={activeSpeakingId}
                      setActiveSpeakingId={setActiveSpeakingId}
                    />
                    <button
                      onClick={() => copyText(msg.text, msg.id)}
                      className="px-1.5 py-0.5 rounded bg-slate-800/60 hover:bg-slate-800 text-slate-300 flex items-center gap-1"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating latest answer button */}
      {!isNearBottom && (
        <div className="px-4 py-1 flex justify-end">
          <button
            onClick={() => scrollToBottom(true)}
            className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold shadow-lg flex items-center gap-1 hover:bg-emerald-400 transition-all"
          >
            <ArrowDown className="w-3 h-3" />
            <span>Latest Answer</span>
          </button>
        </div>
      )}

      {/* Quick Prompts */}
      <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-900 flex items-center gap-1.5 overflow-x-auto scrollbar-none flex-shrink-0">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendPrompt(qp.prompt)}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 whitespace-nowrap"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-2 flex-shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask FAHMRISE AI Tutor..."
          disabled={loading}
          className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-glow flex items-center justify-center disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, Send, Sparkles, RefreshCw, AlertTriangle, HelpCircle, Code2, BookOpen, ArrowDown, User, Copy, Check } from 'lucide-react';
import { api } from '../services/api';
import Alert from '../components/common/Alert';
import Badge from '../components/common/Badge';
import AiVoiceButton from '../components/ai/AiVoiceButton';

export default function AiTutorPage() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: `👋 **Welcome! I am your dedicated FAHMRISE AI Tutor.**\n\n*Understand. Learn. Rise.* I specialize in answering questions across HTML, CSS, JavaScript, Web APIs, Islamic Studies, and Career Skills. Ask me anything about syntax, debugging, concepts, or project architectures!\n\n*How can I help you today?*`,
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

  // Safely scroll internal chat container without moving the browser window
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

  // Scroll to bottom on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom(false);
    }, 60);
    return () => clearTimeout(timer);
  }, [scrollToBottom]);

  // Clean up any speaking on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

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

    // Immediately place user question followed directly by the bot answer container
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

    // Keep internal container scrolled to show the newly submitted question
    setTimeout(() => {
      if (chatContainerRef.current) {
        const questionEl = document.getElementById(`msg-${questionId}`);
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
        mode: 'chat'
      });

      setMessages(prev =>
        prev.map(msg =>
          msg.id === botPlaceholderId
            ? { ...msg, text: data.reply, loading: false }
            : msg
        )
      );

      // When the answer arrives, keep it visible in the chat area
      setTimeout(() => {
        if (chatContainerRef.current) {
          const answerEl = document.getElementById(`msg-${botPlaceholderId}`);
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
                text: '⚠️ I encountered an issue generating a response. Please try asking again.',
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

  const copyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const suggestedQuestions = [
    "What is the difference between <div> and <span>?",
    "How does CSS Flexbox work for centering elements?",
    "Explain JavaScript async/await with a simple example.",
    "What is the Document Object Model (DOM)?"
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden">
      
      {/* Top Header */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 py-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-white">FAHMRISE AI Tutor</h1>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Online
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Understand. Learn. Rise. Socratic guidance with voice audio.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-4 flex flex-col relative overflow-hidden">
        
        {/* Dedicated Fixed Scrollable Messages Viewport */}
        <div
          ref={chatContainerRef}
          onScroll={handleChatScroll}
          className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-[380px] max-h-[calc(100vh-280px)] scrollbar-thin scrollbar-thumb-slate-800"
        >
          {messages.map((msg) => {
            const isBot = msg.role === 'assistant';
            return (
              <div
                key={msg.id}
                id={`msg-${msg.id}`}
                className={`flex gap-3 text-xs sm:text-sm ${isBot ? 'items-start' : 'items-start flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isBot ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-300'
                }`}>
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[85%] rounded-2xl p-4 space-y-2 ${
                  isBot
                    ? 'bg-slate-900 border border-slate-800/80 text-slate-200'
                    : 'bg-emerald-500 text-slate-950 font-medium'
                }`}>
                  {msg.loading ? (
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                      <span>FAHMRISE AI Tutor is thinking...</span>
                    </div>
                  ) : (
                    <div className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                    </div>
                  )}

                  {/* Actions for Bot answers: Listen & Copy */}
                  {isBot && !msg.loading && (
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
                      <AiVoiceButton
                        text={msg.text}
                        messageId={msg.id}
                        activeSpeakingId={activeSpeakingId}
                        setActiveSpeakingId={setActiveSpeakingId}
                      />
                      <button
                        onClick={() => copyText(msg.text, msg.id)}
                        className="px-2 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 flex items-center gap-1"
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

        {/* Floating "Scroll to latest answer" button */}
        {!isNearBottom && (
          <button
            onClick={() => scrollToBottom(true)}
            className="absolute bottom-20 right-8 px-3 py-1.5 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold shadow-lg flex items-center gap-1.5 hover:bg-emerald-400 transition-all z-20 animate-bounce"
          >
            <ArrowDown className="w-3.5 h-3.5" />
            <span>Latest Answer</span>
          </button>
        )}

        {/* Suggested Question Chips */}
        <div className="py-2 flex items-center gap-2 overflow-x-auto scrollbar-none flex-shrink-0">
          <span className="text-[11px] text-slate-500 flex-shrink-0 font-medium">Try:</span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(q);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-[11px] text-slate-300 whitespace-nowrap transition-colors flex-shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Input Form */}
        <form onSubmit={handleSend} className="pt-2 flex items-center gap-2 flex-shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask FAHMRISE AI Tutor any question (e.g. 'What is a closure in JS?')..."
            disabled={loading}
            className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-glow flex items-center justify-center transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
}

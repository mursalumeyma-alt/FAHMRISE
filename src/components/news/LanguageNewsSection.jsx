import React, { useState, useEffect } from 'react';
import { 
  Globe2, 
  ExternalLink, 
  RefreshCw, 
  Clock, 
  ShieldCheck, 
  Newspaper, 
  Sparkles,
  ArrowRight,
  Radio,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { api } from '../../services/api';
import SomaliLearningSection from '../somali/SomaliLearningSection';

export default function LanguageNewsSection({ selectedLangId = 'somali-language-learning' }) {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Map track/course ID to language key
  const getLanguageKey = (id) => {
    if (!id) return 'somali';
    const lower = id.toLowerCase();
    if (lower.includes('somali')) return 'somali';
    if (lower.includes('swahili') || lower.includes('kiswahili')) return 'swahili';
    if (lower.includes('arabic')) return 'arabic';
    if (lower.includes('french')) return 'french';
    if (lower.includes('japanese')) return 'japanese';
    if (lower.includes('english')) return 'english';
    return 'somali';
  };

  const currentLangKey = getLanguageKey(selectedLangId);

  // If Somali is selected, render dedicated Somali Learning Section (no news headlines)
  if (currentLangKey === 'somali') {
    return <SomaliLearningSection />;
  }

  const fetchNews = async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const data = await api.news.getByLanguage(currentLangKey);
      setNewsData(data);
    } catch (err) {
      console.warn(`Could not load resources for ${currentLangKey}:`, err.message);
      setError(err.message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [selectedLangId]);

  const provider = newsData?.provider || {
    provider: currentLangKey === 'somali' ? 'Learnable' : 'World Learning & News Portal',
    websiteUrl: currentLangKey === 'somali' ? 'https://www.learnable.education' : 'https://www.learnable.education',
    actionText: currentLangKey === 'somali' ? 'Explore Learnable Educational Resources' : 'Explore Learning Resources',
    nativeActionText: currentLangKey === 'somali' ? "Ka Faa'iidayso Barashada Learnable" : 'Open Learning Portal',
    description: currentLangKey === 'somali' 
      ? 'Explore interactive educational learning resources, STEM modules, and self-paced study materials on Learnable.' 
      : 'Authentic learning and reading resources.',
    flag: currentLangKey === 'somali' ? '🇸🇴' : '🌍',
    badgeColor: 'sky'
  };

  const articles = newsData?.articles || [];
  const isLive = newsData?.liveAvailable && articles.length > 0;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-12">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-sky-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Educational Resources & Language Immersion
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Access verified educational portals, open study materials, and authentic reading resources to accelerate real-world fluency.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => fetchNews(true)}
            disabled={isRefreshing || loading}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50 border border-slate-700/80 cursor-pointer"
            title="Refresh resource feed"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-sky-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>

          <a
            href={provider.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all group"
          >
            <span>{provider.actionText || 'Explore Learnable Educational Resources'}</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Main Educational / News Resource Card */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Decorative ambient gradient */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Source Branding & Official Portal Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950/80 border border-slate-850">
          <div className="flex items-center gap-3.5">
            <span className="text-3xl sm:text-4xl shrink-0" role="img" aria-label="Flag">
              {provider.flag}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-white">
                  {provider.provider}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Educational Resource</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 max-w-xl">
                {provider.description}
              </p>
            </div>
          </div>

          <a
            href={provider.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 hover:border-sky-500/40 flex items-center justify-center gap-2 transition-all shrink-0"
          >
            <Globe2 className="w-4 h-4 text-sky-400" />
            <span>Open {provider.provider}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Live Articles Grid OR Clear Direct Fallback */}
        {loading && !newsData ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-3 text-slate-400">
            <RefreshCw className="w-6 h-6 animate-spin text-sky-400" />
            <span className="text-xs font-medium">Connecting to verified resources from {provider.provider}...</span>
          </div>
        ) : isLive ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                <span>Live Headlines & Reading Practice</span>
              </span>
              {newsData.lastUpdated && (
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>Updated: {new Date(newsData.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.map((article, idx) => (
                <a
                  key={idx}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-950 transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-semibold text-sky-300 group-hover:text-sky-200">
                        {article.source}
                      </span>
                      {article.pubDate && (
                        <span>
                          {new Date(article.pubDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white leading-snug line-clamp-3">
                      {article.title}
                    </h3>
                    {article.description && (
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {article.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-xs text-slate-400 group-hover:text-sky-300">
                    <span className="font-medium text-[11px]">Read on {article.source}</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : (
          /* Graceful Direct Link Banner (No fake headlines or fabricated dates) */
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-850 text-center space-y-4 py-8">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-base font-bold text-white">
                Explore {provider.provider} Educational Resources
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Access interactive learning materials, self-paced study modules, and curriculum tools directly on the official {provider.provider} platform.
              </p>
            </div>
            <div>
              <a
                href={provider.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-extrabold shadow-glow transition-all"
              >
                <span>{provider.actionText || 'Explore Learnable Educational Resources'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Pedagogical Reading Immersion Tip */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-850/80 flex items-start gap-3 text-xs text-slate-400">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-200">Language Immersion Tip:</strong> Engaging with authentic educational materials and articles reinforces your active vocabulary and contextual comprehension. Spend 10 minutes daily exploring these resources!
          </p>
        </div>

      </div>

    </section>
  );
}

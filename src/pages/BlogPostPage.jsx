import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  Check, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  Copy, 
  CheckCheck,
  ChevronRight,
  Code2
} from 'lucide-react';
import { getBlogPostBySlug, BLOG_POSTS } from '../data/blogData';

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getBlogPostBySlug(slug);

  const [copiedCodeIndex, setCopiedCodeIndex] = useState(null);
  const [shareCopied, setShareCopied] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6 text-slate-800">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#0B2F2D]">Article Not Found</h2>
          <p className="text-sm text-slate-600">
            The article you are looking for may have been moved or updated.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/blog"
              className="py-3 px-4 rounded-xl bg-[#0B2F2D] text-white font-bold text-sm hover:bg-[#124542] transition-colors"
            >
              Browse All Blog Articles
            </Link>
            <Link
              to="/courses"
              className="py-2.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
            >
              Explore FAHMRISE Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Related posts (excluding current post)
  const relatedPosts = BLOG_POSTS
    .filter(p => p.id !== post.id && (p.category === post.category || p.featured))
    .slice(0, 3);

  const handleCopyCode = (codeText, index) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 selection:bg-[#E5B869] selection:text-[#0B2F2D]">
      
      {/* =========================================================================
          1. ARTICLE HEADER (Deep Teal Background)
         ========================================================================= */}
      <header className="relative bg-[#0B2F2D] text-white overflow-hidden pt-10 pb-14 md:pt-14 md:pb-18 border-b border-[#072120]">
        {/* Subtle Ambient Light Gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#124542] rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#E5B869]/10 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex flex-wrap items-center gap-2 text-xs text-[#A2C4C1]">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-[#E5B869] font-medium">{post.category}</span>
          </nav>

          {/* Category Pill + Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#E5B869] text-[#0B2F2D] text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
            {post.coverBadge && (
              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium border border-white/20">
                {post.coverBadge}
              </span>
            )}
            <span className="text-xs text-[#A2C4C1] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
            <span className="text-xs text-[#A2C4C1] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.publishedDate}</span>
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Article Excerpt */}
          <p className="text-base sm:text-lg text-[#D1E0DE] leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author Attribution & Share Action */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#E5B869] text-[#0B2F2D] font-bold text-sm flex items-center justify-center shadow-md">
                FR
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{post.author.name}</h4>
                <p className="text-xs text-[#A2C4C1]">{post.author.role}</p>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/15 transition-colors"
            >
              {shareCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#E5B869]" />
                  <span>Share Article</span>
                </>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* =========================================================================
          2. ARTICLE BODY CONTENT
         ========================================================================= */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <article className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-sm space-y-8">
          
          {post.content.map((block, idx) => {
            if (block.type === 'heading') {
              return (
                <div key={idx} className="pt-4 first:pt-0">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2F2D] tracking-tight pb-2 border-b-2 border-[#E5B869]/40 inline-block">
                    {block.text}
                  </h2>
                </div>
              );
            }

            if (block.type === 'paragraph') {
              return (
                <p key={idx} className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  {block.text}
                </p>
              );
            }

            if (block.type === 'list') {
              return (
                <ul key={idx} className="space-y-3 pl-2 sm:pl-4">
                  {block.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-[#E5B869] mt-2.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            if (block.type === 'callout') {
              return (
                <div key={idx} className="p-6 rounded-2xl bg-[#0B2F2D]/5 border-l-4 border-[#0B2F2D] space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0B2F2D] uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-[#E5B869]" />
                    <span>{block.title || 'Key Principle'}</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {block.text}
                  </p>
                </div>
              );
            }

            if (block.type === 'code') {
              const isCopied = copiedCodeIndex === idx;
              return (
                <div key={idx} className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 text-slate-100 shadow-lg">
                  <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono uppercase font-bold text-slate-300">
                      {block.language || 'code'}
                    </span>
                    <button
                      onClick={() => handleCopyCode(block.code, idx)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                    >
                      {isCopied ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed text-emerald-300 bg-slate-900">
                    <code>{block.code}</code>
                  </pre>
                </div>
              );
            }

            return null;
          })}

          {/* Related Course Callout Card */}
          {post.relatedCourse && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border-2 border-[#E5B869]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2F2D] uppercase tracking-wider">
                    <BookOpen className="w-4 h-4 text-[#E5B869]" />
                    <span>Recommended Course for this Topic</span>
                  </div>
                  <h4 className="text-xl font-serif font-bold text-[#0B2F2D]">
                    {post.relatedCourse.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Explore the full interactive curriculum with hands-on exercises, quizzes, and verified certification.
                  </p>
                </div>

                <Link
                  to={post.relatedCourse.path}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0B2F2D] hover:bg-[#124542] text-white font-bold text-sm shadow-md transition-all flex-shrink-0"
                >
                  <span>Explore Course</span>
                  <ArrowRight className="w-4 h-4 text-[#E5B869]" />
                </Link>
              </div>
            </div>
          )}

          {/* Back to Blog Navigation Button */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0B2F2D] hover:text-[#06423F] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all educational articles</span>
            </Link>

            <Link
              to="/practice"
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors"
            >
              <Code2 className="w-4 h-4" />
              <span>Launch Practice Arena</span>
            </Link>
          </div>

        </article>

        {/* =========================================================================
            3. MORE EDUCATIONAL ARTICLES SECTION
           ========================================================================= */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-serif font-bold text-[#0B2F2D]">
                  More Educational Articles
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Continue learning with our latest guides and technical tutorials.
                </p>
              </div>
              <Link
                to="/blog"
                className="text-xs font-bold text-[#0B2F2D] hover:text-[#06423F] transition-colors"
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.slug}`}
                  className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#E5B869] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-[#E5B869] bg-[#0B2F2D] px-2 py-0.5 rounded-full uppercase">
                      {related.category}
                    </span>
                    <h4 className="text-base font-serif font-bold text-[#0B2F2D] group-hover:text-[#06423F] transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {related.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{related.readTime}</span>
                    <span className="text-[#0B2F2D] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>

    </div>
  );
}

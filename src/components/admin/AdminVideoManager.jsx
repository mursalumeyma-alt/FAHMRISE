import React, { useState, useEffect, useMemo } from 'react';
import { 
  Video, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  RefreshCw, 
  Edit3, 
  Eye, 
  ExternalLink, 
  Copy, 
  Check, 
  Layers, 
  Clock, 
  Tv, 
  Info, 
  Sparkles,
  ChevronDown,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { api } from '../../services/api';
import { CoursesDB } from '../../data/coursesData';

// Helper to extract 11-char YouTube ID if user pastes full URL
function extractYouTubeId(raw) {
  if (!raw) return '';
  const str = String(raw).trim();
  const shortMatch = str.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (shortMatch && shortMatch[1]) {
    return shortMatch[1];
  }
  return str;
}

function isValidYouTubeId(id) {
  if (!id) return false;
  return /^[\w-]{11}$/.test(String(id).trim());
}

function buildLocalVideoAnalysis(courses) {
  const allVideos = [];
  const idMap = new Map();

  courses.forEach(course => {
    const courseId = course.id;
    const courseTitle = course.title || course.id;
    const category = course.category || 'General';

    (course.lessons || []).forEach(lesson => {
      if (lesson.videoLesson) {
        const v = lesson.videoLesson;
        const vidId = (v.videoId || '').trim();

        let moduleName = '';
        if (course.modules && Array.isArray(course.modules)) {
          const parentModule = course.modules.find(m => 
            Array.isArray(m.lessons) && m.lessons.some(ml => ml.id === lesson.id)
          );
          if (parentModule) {
            moduleName = parentModule.title || `Module ${parentModule.number}`;
          }
        }
        if (!moduleName && lesson.title && lesson.title.toLowerCase().startsWith('module')) {
          const parts = lesson.title.split(':');
          moduleName = parts[0].trim();
        }

        const videoItem = {
          courseId,
          courseTitle,
          courseCategory: category,
          moduleName,
          lessonId: lesson.id,
          lessonNumber: lesson.number,
          lessonTitle: lesson.title,
          lessonSubtitle: lesson.subtitle || '',
          videoId: vidId,
          title: (v.title || '').trim(),
          channel: (v.channel || '').trim(),
          duration: (v.duration || '').trim(),
          badge: v.badge || 'Needs Review',
          watchUrl: vidId ? `https://www.youtube.com/watch?v=${vidId}` : '',
          embedUrl: vidId ? `https://www.youtube-nocookie.com/embed/${vidId}` : '',
          alternativeSource: v.alternativeSource || '',
          sourceName: v.sourceName || ''
        };

        allVideos.push(videoItem);
        if (vidId) {
          if (!idMap.has(vidId)) idMap.set(vidId, []);
          idMap.get(vidId).push(videoItem);
        }
      }
    });
  });

  let verifiedCount = 0;
  let needsReviewCount = 0;
  let brokenIdCount = 0;
  let missingMetadataCount = 0;
  let affectedByRepeats = 0;

  const analyzedVideos = allVideos.map(item => {
    const vidId = item.videoId;
    const occurrences = vidId ? (idMap.get(vidId) || []) : [];
    const isRepeated = occurrences.length > 1;
    if (isRepeated) affectedByRepeats++;

    const repeatedIn = isRepeated
      ? occurrences
          .filter(o => !(o.courseId === item.courseId && o.lessonId === item.lessonId))
          .map(o => ({
            courseId: o.courseId,
            courseTitle: o.courseTitle,
            lessonId: o.lessonId,
            lessonNumber: o.lessonNumber,
            lessonTitle: o.lessonTitle
          }))
      : [];

    const isBroken = !isValidYouTubeId(vidId);
    if (isBroken) brokenIdCount++;

    const missingFields = [];
    if (!item.title) missingFields.push('title');
    if (!item.channel) missingFields.push('channel');
    if (!item.duration) missingFields.push('duration');
    const isMissingMetadata = missingFields.length > 0;
    if (isMissingMetadata) missingMetadataCount++;

    const isVerified = item.badge === 'Verified Reference Video';
    if (isVerified) verifiedCount++;
    else needsReviewCount++;

    return {
      ...item,
      isRepeated,
      repeatedCount: occurrences.length,
      repeatedIn,
      isBroken,
      isMissingMetadata,
      missingFields,
      status: isVerified ? 'Verified' : 'Needs Review'
    };
  });

  const repeatedUniqueIds = Array.from(idMap.entries()).filter(([k, list]) => list.length > 1).length;

  return {
    videos: analyzedVideos,
    stats: {
      totalVideos: analyzedVideos.length,
      verifiedCount,
      needsReviewCount,
      uniqueVideoIds: idMap.size,
      repeatedIdCount: repeatedUniqueIds,
      affectedByRepeats,
      brokenIdCount,
      missingMetadataCount
    }
  };
}

export default function AdminVideoManager() {
  const [videos, setVideos] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' | 'Verified' | 'Needs Review'
  const [selectedIssue, setSelectedIssue] = useState('all'); // 'all' | 'has_issues' | 'repeated' | 'broken' | 'missing_meta'
  const [copiedId, setCopiedId] = useState(null);

  // Modals
  const [editModal, setEditModal] = useState({
    open: false,
    item: null,
    videoId: '',
    title: '',
    channel: '',
    duration: '',
    status: 'Needs Review',
    saving: false,
    error: null,
    urlAutoCleaned: false
  });

  const [previewModal, setPreviewModal] = useState({
    open: false,
    item: null
  });

  // Load videos on mount
  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const res = await api.admin.getVideos();
      if (res && res.success) {
        setVideos(res.videos || []);
        setStats(res.stats || null);
      } else {
        throw new Error(res?.error || 'Failed to load video catalog.');
      }
    } catch (err) {
      console.warn('Backend API getVideos error, falling back to local database:', err);
      try {
        const localCourses = CoursesDB.getAllCourses();
        if (localCourses && localCourses.length > 0) {
          const fallbackData = buildLocalVideoAnalysis(localCourses);
          setVideos(fallbackData.videos);
          setStats(fallbackData.stats);
          setError(`Note: Live backend syncing unavailable (${err.message}). Showing catalog in offline fallback mode.`);
          return;
        }
      } catch (localErr) {
        console.error('Local fallback failed:', localErr);
      }
      setError(err.message || 'Error connecting to video catalog API.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  // Copy to clipboard helper
  const handleCopy = (text, id) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Distinct course options for dropdown
  const courseOptions = useMemo(() => {
    const map = new Map();
    videos.forEach(v => {
      if (!map.has(v.courseId)) {
        map.set(v.courseId, { id: v.courseId, title: v.courseTitle, category: v.courseCategory, count: 0 });
      }
      map.get(v.courseId).count++;
    });
    return Array.from(map.values()).sort((a, b) => a.title.localeCompare(b.title));
  }, [videos]);

  // Filtered video list
  const filteredVideos = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return videos.filter(v => {
      // Course filter
      if (selectedCourse !== 'all' && v.courseId !== selectedCourse) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'all' && v.status !== selectedStatus) {
        return false;
      }

      // Issue filter
      if (selectedIssue === 'has_issues') {
        if (!v.isRepeated && !v.isBroken && !v.isMissingMetadata) return false;
      } else if (selectedIssue === 'repeated') {
        if (!v.isRepeated) return false;
      } else if (selectedIssue === 'broken') {
        if (!v.isBroken) return false;
      } else if (selectedIssue === 'missing_meta') {
        if (!v.isMissingMetadata) return false;
      }

      // Search query
      if (q) {
        const matchesCourse = v.courseTitle.toLowerCase().includes(q) || v.courseId.toLowerCase().includes(q);
        const matchesLesson = v.lessonTitle.toLowerCase().includes(q) || v.lessonId.toLowerCase().includes(q);
        const matchesVideo = (v.title && v.title.toLowerCase().includes(q)) || 
                             (v.videoId && v.videoId.toLowerCase().includes(q)) ||
                             (v.channel && v.channel.toLowerCase().includes(q));
        const matchesModule = v.moduleName && v.moduleName.toLowerCase().includes(q);
        if (!matchesCourse && !matchesLesson && !matchesVideo && !matchesModule) {
          return false;
        }
      }

      return true;
    });
  }, [videos, searchQuery, selectedCourse, selectedStatus, selectedIssue]);

  // Open Edit Modal
  const openEdit = (item) => {
    setEditModal({
      open: true,
      item,
      videoId: item.videoId || '',
      title: item.title || '',
      channel: item.channel || '',
      duration: item.duration || '',
      status: item.status === 'Verified' ? 'Verified' : 'Needs Review',
      saving: false,
      error: null,
      urlAutoCleaned: false
    });
  };

  // Handle Video ID Input Change with Auto-Clean
  const handleVideoIdChange = (e) => {
    const val = e.target.value;
    const cleaned = extractYouTubeId(val);
    const wasUrl = cleaned !== val && cleaned.length === 11;
    setEditModal(prev => ({
      ...prev,
      videoId: cleaned,
      urlAutoCleaned: wasUrl
    }));
  };

  // Submit Video Edit
  const handleSaveVideo = async (e) => {
    e.preventDefault();
    const { item, videoId, title, channel, duration, status } = editModal;
    if (!item) return;

    setEditModal(prev => ({ ...prev, saving: true, error: null }));

    try {
      const cleanId = extractYouTubeId(videoId);
      const payload = {
        videoId: cleanId,
        title: title.trim(),
        channel: channel.trim(),
        duration: duration.trim(),
        badge: status === 'Verified' ? 'Verified Reference Video' : 'Needs Review',
        status: status === 'Verified' ? 'Verified' : 'Needs Review'
      };

      const res = await api.admin.updateVideo(item.courseId, item.lessonId, payload);
      if (res && res.success) {
        setSuccessMsg(`Video updated for "${item.lessonTitle}". Watch & Embed links synchronized.`);
        setTimeout(() => setSuccessMsg(null), 4000);
        setEditModal({ open: false, item: null, videoId: '', title: '', channel: '', duration: '', status: 'Needs Review', saving: false, error: null, urlAutoCleaned: false });
        // Refresh video list to recalculate duplicate checks & warnings
        await fetchVideos(true);
      } else {
        throw new Error(res?.error || 'Failed to save video changes.');
      }
    } catch (err) {
      console.error('Error updating video:', err);
      setEditModal(prev => ({ ...prev, saving: false, error: err.message || 'Failed to update video.' }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Introduction */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>YouTube Video Manager</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
                    Admin Only
                  </span>
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                  Inspect, verify, preview, and update embedded YouTube references across all 26 courses.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchVideos(true)}
              disabled={refreshing || loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm"
              title="Refresh video catalog and re-run validation checks"
            >
              <RefreshCw className={`w-4 h-4 text-emerald-400 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Scanning...' : 'Re-scan Catalog'}</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Overview */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-slate-800/80">
            {/* Total Videos */}
            <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 block">Total Lessons</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xl sm:text-2xl font-black text-white">{stats.totalVideos}</span>
                <span className="text-[11px] text-slate-500">videos</span>
              </div>
            </div>

            {/* Verified Videos */}
            <div className="p-3.5 bg-emerald-950/20 rounded-2xl border border-emerald-500/20">
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Verified
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xl sm:text-2xl font-black text-emerald-300">{stats.verifiedCount}</span>
                <span className="text-[11px] text-emerald-400/70">
                  {Math.round((stats.verifiedCount / (stats.totalVideos || 1)) * 100)}%
                </span>
              </div>
            </div>

            {/* Needs Review */}
            <div className="p-3.5 bg-amber-950/20 rounded-2xl border border-amber-500/20">
              <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                Needs Review
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xl sm:text-2xl font-black text-amber-300">{stats.needsReviewCount}</span>
                <span className="text-[11px] text-amber-400/70">pending</span>
              </div>
            </div>

            {/* Repeated IDs */}
            <div className="p-3.5 bg-purple-950/20 rounded-2xl border border-purple-500/20">
              <span className="text-[11px] font-semibold text-purple-400 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                Repeated IDs
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xl sm:text-2xl font-black text-purple-300">{stats.repeatedIdCount}</span>
                <span className="text-[11px] text-purple-400/70">IDs ({stats.affectedByRepeats} lessons)</span>
              </div>
            </div>

            {/* Broken / Invalid IDs */}
            <div className="p-3.5 bg-rose-950/20 rounded-2xl border border-rose-500/20">
              <span className="text-[11px] font-semibold text-rose-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                Broken / Missing
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xl sm:text-2xl font-black text-rose-300">{stats.brokenIdCount}</span>
                <span className="text-[11px] text-rose-400/70">flagged</span>
              </div>
            </div>

            {/* Missing Metadata */}
            <div className="p-3.5 bg-orange-950/20 rounded-2xl border border-orange-500/20">
              <span className="text-[11px] font-semibold text-orange-400 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-orange-400" />
                Missing Meta
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xl sm:text-2xl font-black text-orange-300">{stats.missingMetadataCount}</span>
                <span className="text-[11px] text-orange-400/70">items</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 flex items-center justify-between shadow-lg animate-in fade-in">
          <div className="flex items-center gap-3 text-sm font-medium">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-emerald-300 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Error Notification */}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3 text-sm font-medium">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-rose-400 hover:text-rose-300 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Text Search */}
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by course, lesson, title, channel, video ID..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Course Dropdown */}
          <div className="relative">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 appearance-none pr-8 cursor-pointer"
            >
              <option value="all">All Courses ({videos.length} videos)</option>
              {courseOptions.map(c => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.count})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 appearance-none pr-8 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Verified">Verified Only ({stats?.verifiedCount || 0})</option>
              <option value="Needs Review">Needs Review ({stats?.needsReviewCount || 0})</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Issue Quick Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            Filter by Issue:
          </span>
          <button
            onClick={() => setSelectedIssue('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedIssue === 'all'
                ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-950'
            }`}
          >
            All Lessons ({videos.length})
          </button>
          <button
            onClick={() => setSelectedIssue('has_issues')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedIssue === 'has_issues'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-rose-300 hover:bg-slate-950'
            }`}
          >
            Has Any Warning
          </button>
          <button
            onClick={() => setSelectedIssue('repeated')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedIssue === 'repeated'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-purple-300 hover:bg-slate-950'
            }`}
          >
            Repeated IDs ({stats?.affectedByRepeats || 0} lessons)
          </button>
          <button
            onClick={() => setSelectedIssue('broken')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedIssue === 'broken'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-rose-300 hover:bg-slate-950'
            }`}
          >
            Broken / Invalid ID ({stats?.brokenIdCount || 0})
          </button>
          <button
            onClick={() => setSelectedIssue('missing_meta')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedIssue === 'missing_meta'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-amber-300 hover:bg-slate-950'
            }`}
          >
            Missing Metadata ({stats?.missingMetadataCount || 0})
          </button>

          {(searchQuery || selectedCourse !== 'all' || selectedStatus !== 'all' || selectedIssue !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCourse('all');
                setSelectedStatus('all');
                setSelectedIssue('all');
              }}
              className="ml-auto text-slate-400 hover:text-white underline text-xs"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Video References Table / Cards */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium">Scanning course video registry & running audits...</p>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="py-20 text-center px-4">
            <div className="w-14 h-14 rounded-full bg-slate-800/80 text-slate-500 flex items-center justify-center mx-auto mb-3">
              <Video className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-white">No video references matched your filters</h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or clearing course and issue filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Course & Module</th>
                  <th className="py-3.5 px-4">Lesson</th>
                  <th className="py-3.5 px-4">YouTube Reference</th>
                  <th className="py-3.5 px-4">Status & Health Warnings</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredVideos.map((item) => (
                  <tr 
                    key={`${item.courseId}-${item.lessonId}`} 
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Course & Module Column */}
                    <td className="py-4 px-4 sm:px-6 align-top">
                      <div className="space-y-1 max-w-[220px]">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 inline-block truncate max-w-full">
                          {item.courseCategory}
                        </span>
                        <div className="font-bold text-white text-xs sm:text-sm leading-snug truncate" title={item.courseTitle}>
                          {item.courseTitle}
                        </div>
                        {item.moduleName && (
                          <div className="text-[11px] text-teal-400 font-semibold truncate" title={item.moduleName}>
                            {item.moduleName}
                          </div>
                        )}
                        <span className="text-[10px] text-slate-500 font-mono block">
                          {item.courseId}
                        </span>
                      </div>
                    </td>

                    {/* Lesson Column */}
                    <td className="py-4 px-4 align-top">
                      <div className="space-y-1 max-w-[220px]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shrink-0">
                            #{item.lessonNumber}
                          </span>
                          <span className="font-semibold text-white text-xs sm:text-sm leading-snug line-clamp-2" title={item.lessonTitle}>
                            {item.lessonTitle}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          ID: {item.lessonId}
                        </span>
                      </div>
                    </td>

                    {/* YouTube Reference Column */}
                    <td className="py-4 px-4 align-top">
                      <div className="space-y-1.5 max-w-[280px]">
                        {/* Video ID pill */}
                        <div className="flex items-center gap-1.5">
                          <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${
                            item.isBroken
                              ? 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                              : 'bg-slate-950 text-emerald-400 border-slate-800'
                          }`}>
                            <Tv className="w-3 h-3 text-slate-400" />
                            {item.videoId || '<Missing ID>'}
                          </span>
                          {item.videoId && (
                            <button
                              onClick={() => handleCopy(item.videoId, `id-${item.courseId}-${item.lessonId}`)}
                              className="text-slate-500 hover:text-slate-300 p-1"
                              title="Copy Video ID"
                            >
                              {copiedId === `id-${item.courseId}-${item.lessonId}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}
                        </div>

                        {/* Video Title */}
                        <div className="text-xs text-slate-200 font-medium line-clamp-2" title={item.title}>
                          {item.title || <span className="text-rose-400 italic">No Title Provided</span>}
                        </div>

                        {/* Channel & Duration */}
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                          {item.channel ? (
                            <span className="truncate max-w-[140px] text-slate-300">
                              📺 {item.channel}
                            </span>
                          ) : (
                            <span className="text-rose-400 italic">No Channel</span>
                          )}

                          {item.duration && (
                            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                              ⏱ {item.duration}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Status & Health Warnings Column */}
                    <td className="py-4 px-4 align-top">
                      <div className="space-y-2">
                        {/* Verification Status */}
                        <div>
                          {item.status === 'Verified' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Verified Reference</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                              <span>Needs Review</span>
                            </span>
                          )}
                        </div>

                        {/* Warning Flags */}
                        <div className="space-y-1">
                          {/* Repeated Video ID Warning */}
                          {item.isRepeated && (
                            <div className="p-1.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-[11px] text-purple-300 flex items-start gap-1.5 max-w-[240px]">
                              <Layers className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                              <div className="min-w-0">
                                <span className="font-bold">Repeated ID:</span> Shared by {item.repeatCount} lessons
                                <div className="text-[10px] text-purple-400/80 truncate mt-0.5">
                                  Also in: {item.repeatedIn.map(r => r.courseTitle).filter((v, i, a) => a.indexOf(v) === i).join(', ')}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Broken / Invalid ID */}
                          {item.isBroken && (
                            <div className="p-1.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-[11px] text-rose-300 flex items-center gap-1.5 max-w-[240px]">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                              <span className="font-bold">{item.brokenReason}</span>
                            </div>
                          )}

                          {/* Missing Metadata */}
                          {item.isMissingMetadata && (
                            <div className="p-1.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-[11px] text-amber-300 flex items-center gap-1.5 max-w-[240px]">
                              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <span>Missing: {item.missingFields.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="py-4 px-4 align-top text-right">
                      <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-1.5">
                        {/* Edit Button */}
                        <button
                          onClick={() => openEdit(item)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 text-xs font-semibold transition-all shadow-sm"
                          title="Edit Video ID, Title, Channel, Duration, Status"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Edit</span>
                        </button>

                        {/* Preview Player */}
                        {item.videoId && (
                          <button
                            onClick={() => setPreviewModal({ open: true, item })}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 text-xs font-semibold transition-all shadow-sm"
                            title="Preview Embedded Player"
                          >
                            <Eye className="w-3.5 h-3.5 text-teal-400" />
                            <span>Preview</span>
                          </button>
                        )}

                        {/* Open on YouTube */}
                        {item.videoId && (
                          <a
                            href={item.watchUrl || `https://www.youtube.com/watch?v=${item.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-all"
                            title="Open directly on YouTube"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
                            <span className="hidden sm:inline">YouTube</span>
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editModal.open && editModal.item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-8 animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Edit YouTube Video Reference</h3>
                  <p className="text-xs text-slate-400">
                    {editModal.item.courseTitle} • #{editModal.item.lessonNumber} {editModal.item.lessonTitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditModal(prev => ({ ...prev, open: false }))}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveVideo} className="p-6 space-y-5">
              {/* Context Summary */}
              <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs grid grid-cols-2 gap-2 text-slate-400">
                <div>
                  <span className="font-semibold text-slate-500 block">Course ID:</span>
                  <span className="font-mono text-slate-300">{editModal.item.courseId}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 block">Lesson ID:</span>
                  <span className="font-mono text-slate-300">{editModal.item.lessonId}</span>
                </div>
              </div>

              {/* Duplicate ID Warning inside Modal */}
              {editModal.item.isRepeated && (
                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/40 text-purple-300 text-xs space-y-1.5">
                  <div className="font-bold flex items-center gap-2 text-purple-200">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span>Multi-Lesson Video Reference Notice</span>
                  </div>
                  <p className="text-purple-300/90 leading-relaxed">
                    This video ID is currently shared across {editModal.item.repeatCount} lessons (including in{' '}
                    {editModal.item.repeatedIn.map(r => r.courseTitle).filter((v, i, a) => a.indexOf(v) === i).join(', ')}).
                  </p>
                  <p className="text-purple-400 font-semibold text-[11px] pt-1 border-t border-purple-500/30">
                    ✓ Safety Guarantee: Saving changes here will ONLY update this specific lesson ({editModal.item.lessonId}). Other lessons sharing this ID will remain completely untouched.
                  </p>
                </div>
              )}

              {/* URL Auto Clean Alert */}
              {editModal.urlAutoCleaned && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Detected full YouTube URL: Automatically extracted clean 11-character video ID.</span>
                </div>
              )}

              {/* Video ID Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-200">
                    YouTube Video ID <span className="text-rose-400">*</span>
                  </label>
                  <span className={`text-[11px] font-mono ${
                    isValidYouTubeId(editModal.videoId) ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {isValidYouTubeId(editModal.videoId) ? '✓ Valid 11-char ID' : '11 characters required'}
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={editModal.videoId}
                  onChange={handleVideoIdChange}
                  placeholder="e.g. CBYhVcO4WgI or paste https://www.youtube.com/watch?v=..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  You can enter just the 11-character ID or paste any YouTube URL (watch, embed, short link).
                </p>
              </div>

              {/* Video Title */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1.5">
                  Video Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editModal.title}
                  onChange={(e) => setEditModal(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Official video lecture or practical demonstration title"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              {/* Channel and Duration Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1.5">
                    Channel Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editModal.channel}
                    onChange={(e) => setEditModal(prev => ({ ...prev, channel: e.target.value }))}
                    placeholder="e.g. freeCodeCamp.org, Y Combinator, etc."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1.5">
                    Duration <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editModal.duration}
                    onChange={(e) => setEditModal(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g. 15:30 or 01:20:45"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>

              {/* Verification Status Selector */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1.5">
                  Verification Status <span className="text-rose-400">*</span>
                </label>
                <select
                  value={editModal.status}
                  onChange={(e) => setEditModal(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 cursor-pointer"
                >
                  <option value="Needs Review">Needs Review (Unchecked / Pending Scholarly or Technical Audit)</option>
                  <option value="Verified">Verified Reference Video (Manually Confirmed & Appropriate)</option>
                </select>
                <p className="text-[11px] text-amber-400/90 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Only select "Verified" if you have checked the primary source and confirmed zero musical or inappropriate backgrounds.</span>
                </p>
              </div>

              {/* Synchronized URLs Preview */}
              <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-slate-300 block">Generated Synchronized Links:</span>
                <div className="font-mono text-slate-400 space-y-1 text-[11px]">
                  <div>
                    <span className="text-slate-500">Watch URL: </span>
                    <span className="text-emerald-400">{editModal.videoId ? `https://www.youtube.com/watch?v=${editModal.videoId}` : '<Enter video ID>'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Embed URL: </span>
                    <span className="text-teal-400">{editModal.videoId ? `https://www.youtube-nocookie.com/embed/${editModal.videoId}` : '<Enter video ID>'}</span>
                  </div>
                </div>
              </div>

              {/* Live Preview Embed */}
              {isValidYouTubeId(editModal.videoId) && (
                <div>
                  <span className="text-xs font-bold text-slate-300 block mb-2 flex items-center justify-between">
                    <span>Live Embedded Player Preview:</span>
                    <a
                      href={`https://www.youtube.com/watch?v=${editModal.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold text-[11px]"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Test on YouTube</span>
                    </a>
                  </span>
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-inner">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${editModal.videoId}`}
                      title={editModal.title || 'Video Preview'}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Error in modal */}
              {editModal.error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs">
                  {editModal.error}
                </div>
              )}

              {/* Modal Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditModal(prev => ({ ...prev, open: false }))}
                  disabled={editModal.saving}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editModal.saving || !isValidYouTubeId(editModal.videoId)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-bold shadow-glow transition-all"
                >
                  {editModal.saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving & Persisting...</span>
                    </>
                  ) : (
                    <span>Save & Persist Video</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK PREVIEW MODAL */}
      {previewModal.open && previewModal.item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95">
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div className="min-w-0 pr-4">
                <h3 className="text-base sm:text-lg font-bold text-white truncate">
                  {previewModal.item.title || previewModal.item.lessonTitle}
                </h3>
                <p className="text-xs text-slate-400 truncate">
                  {previewModal.item.courseTitle} • #{previewModal.item.lessonNumber} {previewModal.item.lessonTitle}
                </p>
              </div>
              <button
                onClick={() => setPreviewModal({ open: false, item: null })}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Embed */}
            <div className="relative aspect-video bg-black w-full">
              <iframe
                src={previewModal.item.embedUrl || `https://www.youtube-nocookie.com/embed/${previewModal.item.videoId}`}
                title={previewModal.item.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Details & Meta */}
            <div className="p-5 space-y-3 bg-slate-900">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-emerald-400">
                    ID: {previewModal.item.videoId}
                  </span>
                  <span className="text-slate-400">
                    Channel: <strong className="text-white">{previewModal.item.channel || 'N/A'}</strong>
                  </span>
                  <span className="text-slate-400">
                    Duration: <strong className="text-white">{previewModal.item.duration || 'N/A'}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={previewModal.item.watchUrl || `https://www.youtube.com/watch?v=${previewModal.item.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open on YouTube</span>
                  </a>

                  <button
                    onClick={() => {
                      const it = previewModal.item;
                      setPreviewModal({ open: false, item: null });
                      openEdit(it);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Metadata</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

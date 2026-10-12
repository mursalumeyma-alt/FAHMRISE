import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, Edit3, Save, X, Check, FileText, Sparkles } from 'lucide-react';
import { api } from '../../services/api';

/**
 * Private Personal Notes Component for Learners
 * Keeps user notes scoped to the specific course, chapter, and small lesson.
 */
export default function LessonNotes({ bookId, chapterId, smallLessonId }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newNoteText, setNewNoteText] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [saveStatus, setSaveStatus] = useState(null);

  // Load notes for current lesson
  useEffect(() => {
    let isMounted = true;

    async function loadNotes() {
      setLoading(true);
      try {
        const token = localStorage.getItem('fahmrise_token') || localStorage.getItem('somaivo_token');
        if (token) {
          const res = await api.notes.get({ bookId, chapterId, smallLessonId });
          if (isMounted && res.notes) {
            setNotes(res.notes);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Could not fetch remote notes, checking local cache:', err);
      }

      // Local storage fallback
      try {
        const localKey = `fahmrise_notes_${bookId}_${chapterId}_${smallLessonId}`;
        const cached = JSON.parse(localStorage.getItem(localKey) || '[]');
        if (isMounted) setNotes(cached);
      } catch (e) {
        if (isMounted) setNotes([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadNotes();
    return () => { isMounted = false; };
  }, [bookId, chapterId, smallLessonId]);

  // Sync to localStorage
  const syncLocal = (updatedNotes) => {
    try {
      const localKey = `fahmrise_notes_${bookId}_${chapterId}_${smallLessonId}`;
      localStorage.setItem(localKey, JSON.stringify(updatedNotes));
    } catch (e) {
      console.warn('LocalStorage quota error:', e);
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const tempNote = {
      id: 'note_' + Date.now(),
      bookId,
      chapterId,
      smallLessonId,
      content: newNoteText.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const nextNotes = [tempNote, ...notes];
    setNotes(nextNotes);
    syncLocal(nextNotes);
    setNewNoteText('');
    setIsAdding(false);
    setSaveStatus('Note saved!');
    setTimeout(() => setSaveStatus(null), 3000);

    // Save to server
    try {
      const res = await api.notes.save(tempNote);
      if (res.note) {
        setNotes(prev => prev.map(n => n.id === tempNote.id ? res.note : n));
      }
    } catch (err) {
      console.warn('Saved note locally only (offline/guest):', err);
    }
  };

  const handleStartEdit = (note) => {
    setEditingNoteId(note.id);
    setEditingContent(note.content);
  };

  const handleSaveEdit = async (noteId) => {
    if (!editingContent.trim()) return;

    const nextNotes = notes.map(n => n.id === noteId ? { ...n, content: editingContent.trim(), updatedAt: new Date().toISOString() } : n);
    setNotes(nextNotes);
    syncLocal(nextNotes);
    setEditingNoteId(null);
    setSaveStatus('Note updated!');
    setTimeout(() => setSaveStatus(null), 3000);

    try {
      await api.notes.save({ id: noteId, bookId, chapterId, smallLessonId, content: editingContent.trim() });
    } catch (err) {
      console.warn('Updated note locally:', err);
    }
  };

  const handleDeleteNote = async (noteId) => {
    const nextNotes = notes.filter(n => n.id !== noteId);
    setNotes(nextNotes);
    syncLocal(nextNotes);

    try {
      await api.notes.delete(noteId);
    } catch (err) {
      console.warn('Deleted note locally:', err);
    }
  };

  return (
    <div className="mt-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              Personal Study Notes
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Private notes saved to this lesson
            </p>
          </div>
        </div>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" /> Add Note
          </button>
        )}
      </div>

      <div className="p-6">
        {saveStatus && (
          <div className="mb-4 p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{saveStatus}</span>
          </div>
        )}

        {/* Add Note Form */}
        {isAdding && (
          <form onSubmit={handleCreateNote} className="mb-6 space-y-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              New Study Note
            </label>
            <textarea
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              rows={3}
              placeholder="Write your personal reflections, key mnemonics, or questions here..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-y"
              autoFocus
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {newNoteText.length} characters
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setIsAdding(false); setNewNoteText(''); }}
                  type="button"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newNoteText.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-semibold transition-all shadow-md shadow-emerald-600/20"
                >
                  <Save className="w-3.5 h-3.5" /> Save Note
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Notes List */}
        {loading ? (
          <p className="text-xs text-slate-500 py-2">Loading notes...</p>
        ) : notes.length === 0 && !isAdding ? (
          <div className="text-center py-6 border border-dashed border-slate-850 rounded-xl bg-slate-950/30">
            <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-400">No notes for this lesson yet</p>
            <p className="text-xs text-slate-500 mt-1">Capture your insights to reinforce your learning and retention.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => {
              const isEditing = editingNoteId === note.id;
              const formattedDate = new Date(note.updatedAt || note.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <div
                  key={note.id}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/80 transition-all"
                >
                  {isEditing ? (
                    <div className="space-y-3">
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-y"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingNoteId(null)}
                          type="button"
                          className="px-3 py-1 rounded-lg text-xs text-slate-400 hover:text-slate-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveEdit(note.id)}
                          type="button"
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
                        >
                          <Save className="w-3 h-3" /> Update
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                        {note.content}
                      </p>
                      <div className="mt-3 flex items-center justify-between border-t border-slate-850 pt-2 text-xs text-slate-500">
                        <span>{formattedDate}</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleStartEdit(note)}
                            type="button"
                            className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
                            title="Edit note"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            type="button"
                            className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1"
                            title="Delete note"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

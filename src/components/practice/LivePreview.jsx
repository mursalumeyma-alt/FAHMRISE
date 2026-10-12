import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, ExternalLink, RefreshCw, Eye } from 'lucide-react';

export default function LivePreview({ code }) {
  const [viewport, setViewport] = useState('desktop'); // desktop, tablet, mobile
  const [refreshKey, setRefreshKey] = useState(0);

  const getViewportWidth = () => {
    if (viewport === 'mobile') return 'max-w-[375px] border-x border-slate-700 shadow-2xl';
    if (viewport === 'tablet') return 'max-w-[640px] border-x border-slate-700 shadow-2xl';
    return 'w-full';
  };

  // Wrapped srcdoc with subtle default typography styling so plain HTML looks clean
  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
          (function() {
            var store = new Map();
            var session = new Map();
            function createStorage() {
              return {
                getItem: function(k) { return store.has(String(k)) ? store.get(String(k)) : null; },
                setItem: function(k, v) { store.set(String(k), String(v)); },
                removeItem: function(k) { store.delete(String(k)); },
                clear: function() { store.clear(); },
                key: function(i) { var keys = Array.from(store.keys()); return keys[i] || null; },
                get length() { return store.size; }
              };
            }
            try {
              var ls = createStorage();
              Object.defineProperty(window, 'localStorage', { get: function() { return ls; }, configurable: true });
              Object.defineProperty(window, 'sessionStorage', { get: function() { return ls; }, configurable: true });
            } catch(e) {}
          })();
        </script>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            margin: 1.25rem;
            color: #1e293b;
            line-height: 1.6;
            background-color: #ffffff;
          }
          img { max-width: 100%; height: auto; border-radius: 6px; }
          a { color: #0284c7; }
          input, textarea, select, button {
            font-family: inherit;
            margin-top: 0.25rem;
            margin-bottom: 0.75rem;
            padding: 0.4rem 0.6rem;
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            display: block;
          }
          button {
            background-color: #059669;
            color: white;
            border: none;
            cursor: pointer;
            font-weight: 600;
          }
          button:hover { background-color: #047857; }
          header, nav, main, section, article, aside, footer {
            padding: 0.5rem 0;
          }
        </style>
      </head>
      <body>
        ${code || '<p style="color:#94a3b8; font-style:italic;">Your live preview will render here as you type...</p>'}
      </body>
    </html>
  `;

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
      {/* Preview Top Bar */}
      <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-slate-300">Live Browser Preview</span>
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewport === 'desktop' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'
            }`}
            title="Desktop View (100%)"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewport === 'tablet' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'
            }`}
            title="Tablet View (640px)"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewport === 'mobile' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setRefreshKey(k => k + 1)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
            title="Refresh Preview"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Sandboxed Preview Frame */}
      <div className="flex-1 bg-slate-950/40 p-2 flex items-center justify-center overflow-auto">
        <div className={`h-full bg-white rounded-xl transition-all duration-300 overflow-hidden flex flex-col ${getViewportWidth()}`}>
          {/* Simulated Browser URL bar */}
          <div className="bg-slate-100 px-3 py-1.5 border-b border-slate-200 flex items-center gap-2 text-[10px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="truncate">localhost:3000/fahmrise-sandbox</span>
          </div>

          <iframe
            key={refreshKey}
            srcDoc={srcDoc}
            title="FAHMRISE Live Preview"
            sandbox="allow-scripts"
            className="w-full flex-1 border-none bg-white"
          />
        </div>
      </div>
    </div>
  );
}

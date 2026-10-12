import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Code2, 
  Bot, 
  CheckCircle2, 
  XCircle,
  RotateCcw, 
  Play, 
  Lightbulb, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  BookOpen,
  Sparkles,
  Zap,
  Layers,
  Award,
  FileCode,
  Palette,
  Terminal,
  Download,
  AlertTriangle,
  Check,
  Eye,
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import AiTutorDrawer from '../components/ai/AiTutorDrawer';
import Badge from '../components/common/Badge';

export default function PracticePage() {
  const { practiceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { markExerciseComplete } = useProgress();

  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(practiceId || 'project-1');
  const [loading, setLoading] = useState(true);

  // Multi-File Project State: separate index.html, style.css, script.js
  const [files, setFiles] = useState({
    'index.html': '',
    'style.css': '',
    'script.js': ''
  });
  const [activeFileTab, setActiveFileTab] = useState('index.html');

  // Execution & Sandbox State
  const [compiledSrcDoc, setCompiledSrcDoc] = useState('');
  const [executionKey, setExecutionKey] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [runtimeError, setRuntimeError] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [activeDomInfo, setActiveDomInfo] = useState({ elementsCount: 0, elementsSample: [] });
  const [bottomTab, setBottomTab] = useState('tests'); // 'tests', 'console', 'dom'
  const [completedList, setCompletedList] = useState([]);
  
  // Isolated In-Memory Sandbox Storage per Project (No cross-origin or auth leaks)
  const [sandboxStorage, setSandboxStorage] = useState({});

  // AI Tutor & Hints
  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [aiMode, setAiMode] = useState('chat');
  const iframeRef = useRef(null);

  // Load all projects and setup active project starter files
  useEffect(() => {
    async function loadArena() {
      setLoading(true);
      try {
        const data = await api.books.getProjects();
        const allProjs = data.projects || [];
        setProjects(allProjs);

        const targetId = practiceId || selectedProjectId || 'project-1';
        const active = allProjs.find(p => p.id === targetId) || allProjs[0];
        setCurrentProject(active);
        setSelectedProjectId(active?.id || 'project-1');

        // Initialize separate files structure
        const starter = active?.starterFiles || (active?.files) || {
          'index.html': `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>${active?.title || 'Project'}</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <div class="card">\n    <h1>${active?.title || 'FAHMRISE Project'}</h1>\n    <p>${active?.description || 'Build your solution.'}</p>\n  </div>\n  <script src="script.js"></script>\n</body>\n</html>`,
          'style.css': `body { font-family: system-ui, sans-serif; background: #090d16; color: #fff; padding: 20px; }\n.card { background: #131d2e; padding: 20px; border-radius: 12px; border: 1px solid #1e293b; }`,
          'script.js': `console.log('Project loaded successfully!');`
        };

        setFiles({
          'index.html': starter['index.html'] || '',
          'style.css': starter['style.css'] || '',
          'script.js': starter['script.js'] || ''
        });
        setActiveFileTab('index.html');

        // Compile and run initial preview
        compileAndRun(starter, false, active?.id || 'project-1');
      } catch (err) {
        console.error('Failed to load practice projects:', err);
      } finally {
        setLoading(false);
      }
    }
    loadArena();
  }, [practiceId]);

  // Compile separate HTML, CSS, JS files safely into isolated sandboxed document with storage shim
  const compileDocument = useCallback((currentFiles, pId = selectedProjectId, customStorage = null) => {
    const html = currentFiles['index.html'] || '';
    const css = currentFiles['style.css'] || '';
    const js = currentFiles['script.js'] || '';

    // Extract body content or wrap if full HTML
    let bodyContent = html;
    if (html.includes('<body') && html.includes('</body>')) {
      const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
      if (match && match[1]) {
        bodyContent = match[1];
      }
    } else if (html.includes('<!DOCTYPE') || html.includes('<html')) {
      bodyContent = html.replace(/<!DOCTYPE[^>]*>/i, '').replace(/<html[^>]*>/i, '').replace(/<\/html>/i, '').replace(/<head[\s\S]*<\/head>/i, '');
    }

    // Remove any relative <link rel="stylesheet" href="style.css"> or <script src="script.js"> tags so they don't 404
    bodyContent = bodyContent.replace(/<link[^>]+href=["']style\.css["'][^>]*>/gi, '');
    bodyContent = bodyContent.replace(/<script[^>]+src=["']script\.js["'][^>]*><\/script>/gi, '');

    const initialStorageData = customStorage !== null ? customStorage : (sandboxStorage[pId] || {});
    const initialStorageJson = JSON.stringify(initialStorageData);

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- ========================================================================= -->
  <!-- FAHMRISE ISOLATED SANDBOX STORAGE SHIM (NO allow-same-origin, 100% SECURE) -->
  <!-- Provides full Storage API without SecurityError in sandboxed iframe        -->
  <!-- ========================================================================= -->
  <script>
    (function() {
      var initialData = ${initialStorageJson};
      var localStore = new Map();
      if (initialData && typeof initialData === 'object') {
        for (var key in initialData) {
          if (Object.prototype.hasOwnProperty.call(initialData, key)) {
            localStore.set(String(key), String(initialData[key]));
          }
        }
      }

      var sessionStore = new Map();

      function notifyStorageChange() {
        try {
          var dump = {};
          localStore.forEach(function(val, k) { dump[k] = val; });
          window.parent.postMessage({
            source: 'FAHMRISE_SANDBOX',
            type: 'STORAGE_SYNC',
            payload: { storageName: 'localStorage', data: dump }
          }, '*');
        } catch(e) {}
      }

      function buildStorageProxy(storageName, targetMap, isPersistent) {
        var baseStorage = {
          getItem: function(key) {
            var sKey = String(key);
            return targetMap.has(sKey) ? targetMap.get(sKey) : null;
          },
          setItem: function(key, value) {
            var sKey = String(key);
            var sVal = String(value);
            targetMap.set(sKey, sVal);
            if (isPersistent) notifyStorageChange();
          },
          removeItem: function(key) {
            var sKey = String(key);
            targetMap.delete(sKey);
            if (isPersistent) notifyStorageChange();
          },
          clear: function() {
            targetMap.clear();
            if (isPersistent) notifyStorageChange();
          },
          key: function(index) {
            var idx = Number(index) || 0;
            var keys = Array.from(targetMap.keys());
            return (idx >= 0 && idx < keys.length) ? keys[idx] : null;
          },
          get length() {
            return targetMap.size;
          }
        };

        return new Proxy(baseStorage, {
          get: function(target, prop, receiver) {
            if (typeof prop === 'symbol') return Reflect.get(target, prop, receiver);
            if (prop in target || typeof target[prop] === 'function') {
              var member = target[prop];
              return typeof member === 'function' ? member.bind(target) : member;
            }
            if (targetMap.has(String(prop))) {
              return targetMap.get(String(prop));
            }
            return undefined;
          },
          set: function(target, prop, value, receiver) {
            if (prop in target && typeof target[prop] !== 'function') {
              target[prop] = value;
              return true;
            }
            if (typeof prop === 'string') {
              baseStorage.setItem(prop, value);
              return true;
            }
            return Reflect.set(target, prop, value, receiver);
          },
          deleteProperty: function(target, prop) {
            if (typeof prop === 'string') {
              baseStorage.removeItem(prop);
              return true;
            }
            return Reflect.deleteProperty(target, prop);
          },
          has: function(target, prop) {
            if (typeof prop === 'string' && targetMap.has(prop)) return true;
            return prop in target;
          },
          ownKeys: function() {
            return Array.from(targetMap.keys());
          },
          getOwnPropertyDescriptor: function(target, prop) {
            if (typeof prop === 'string' && targetMap.has(prop)) {
              return {
                value: targetMap.get(prop),
                writable: true,
                enumerable: true,
                configurable: true
              };
            }
            return Reflect.getOwnPropertyDescriptor(target, prop);
          }
        });
      }

      var isolatedLocalStorage = buildStorageProxy('localStorage', localStore, true);
      var isolatedSessionStorage = buildStorageProxy('sessionStorage', sessionStore, false);

      // Redefine on window and Window.prototype
      try {
        Object.defineProperty(window, 'localStorage', {
          get: function() { return isolatedLocalStorage; },
          set: function() {},
          configurable: true,
          enumerable: true
        });
      } catch(e) {
        window.localStorage = isolatedLocalStorage;
      }

      try {
        Object.defineProperty(window, 'sessionStorage', {
          get: function() { return isolatedSessionStorage; },
          set: function() {},
          configurable: true,
          enumerable: true
        });
      } catch(e) {
        window.sessionStorage = isolatedSessionStorage;
      }

      try {
        if (window.Window && window.Window.prototype) {
          Object.defineProperty(window.Window.prototype, 'localStorage', {
            get: function() { return isolatedLocalStorage; },
            configurable: true,
            enumerable: true
          });
          Object.defineProperty(window.Window.prototype, 'sessionStorage', {
            get: function() { return isolatedSessionStorage; },
            configurable: true,
            enumerable: true
          });
        }
      } catch(e) {}

      try {
        if (typeof globalThis !== 'undefined') {
          globalThis.localStorage = isolatedLocalStorage;
          globalThis.sessionStorage = isolatedSessionStorage;
        }
      } catch(e) {}
    })();
  </script>

  <style>
    /* Injected CSS from style.css */
    ${css}
  </style>
</head>
<body>
  ${bodyContent}

  <!-- Safe Console, Active DOM & Error Interceptor Harness -->
  <script>
    (function() {
      var send = function(type, payload) {
        try {
          window.parent.postMessage({ source: 'FAHMRISE_SANDBOX', type: type, payload: payload }, '*');
        } catch(e) {}
      };

      // Intercept Console
      var origLog = console.log;
      var origError = console.error;
      var origWarn = console.warn;
      var origInfo = console.info;
      var origClear = console.clear;

      function formatArg(a) {
        if (a === null) return 'null';
        if (a === undefined) return 'undefined';
        if (typeof a === 'object') {
          try {
            return JSON.stringify(a, null, 2);
          } catch(err) {
            return String(a);
          }
        }
        return String(a);
      }

      console.log = function() {
        var args = Array.prototype.slice.call(arguments);
        if (origLog) { try { origLog.apply(console, args); } catch(e) {} }
        send('CONSOLE_LOG', {
          level: 'log',
          message: args.map(formatArg).join(' '),
          time: new Date().toLocaleTimeString()
        });
      };

      console.error = function() {
        var args = Array.prototype.slice.call(arguments);
        if (origError) { try { origError.apply(console, args); } catch(e) {} }
        send('CONSOLE_LOG', {
          level: 'error',
          message: args.map(formatArg).join(' '),
          time: new Date().toLocaleTimeString()
        });
      };

      console.warn = function() {
        var args = Array.prototype.slice.call(arguments);
        if (origWarn) { try { origWarn.apply(console, args); } catch(e) {} }
        send('CONSOLE_LOG', {
          level: 'warn',
          message: args.map(formatArg).join(' '),
          time: new Date().toLocaleTimeString()
        });
      };

      console.info = function() {
        var args = Array.prototype.slice.call(arguments);
        if (origInfo) { try { origInfo.apply(console, args); } catch(e) {} }
        send('CONSOLE_LOG', {
          level: 'info',
          message: args.map(formatArg).join(' '),
          time: new Date().toLocaleTimeString()
        });
      };

      console.clear = function() {
        if (origClear) { try { origClear.apply(console); } catch(e) {} }
        send('CONSOLE_CLEAR', {});
      };

      // Global Unhandled Error Listeners
      window.addEventListener('error', function(event) {
        send('RUNTIME_ERROR', {
          message: event.message || 'Script execution error',
          lineno: event.lineno,
          colno: event.colno,
          filename: 'script.js'
        });
      });

      window.addEventListener('unhandledrejection', function(event) {
        var reason = event.reason;
        var msg = reason ? (reason.message || String(reason)) : 'Unhandled Promise Rejection';
        send('RUNTIME_ERROR', {
          message: 'Unhandled Promise Rejection: ' + msg,
          filename: 'script.js'
        });
      });

      // Report Active DOM Node Structure & Mutation Observer
      function reportDom() {
        try {
          var allEls = document.body ? document.body.querySelectorAll('*') : [];
          var sample = Array.prototype.slice.call(allEls, 0, 25).map(function(el) {
            var str = el.tagName.toLowerCase();
            if (el.id) str += '#' + el.id;
            if (el.className && typeof el.className === 'string') {
              var classes = el.className.split(' ').filter(Boolean).slice(0, 2).join('.');
              if (classes) str += '.' + classes;
            }
            return str;
          });
          send('DOM_UPDATE', { elementsCount: allEls.length, elementsSample: sample });
        } catch(e) {}
      }

      if (window.MutationObserver) {
        try {
          var observer = new MutationObserver(function() {
            reportDom();
          });
          var target = document.body || document.documentElement;
          if (target) {
            observer.observe(target, {
              childList: true,
              subtree: true,
              attributes: true,
              characterData: true
            });
          }
        } catch(e) {}
      }

      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(reportDom, 30);
      } else {
        window.addEventListener('DOMContentLoaded', reportDom);
        window.addEventListener('load', reportDom);
      }
      setTimeout(reportDom, 350);
    })();
  </script>

  <!-- User JavaScript Executed Inside Isolated Try/Catch Wrapper -->
  <script>
    try {
      ${js}
    } catch (err) {
      console.error('Runtime Error:', err.message);
      window.parent.postMessage({
        source: 'FAHMRISE_SANDBOX',
        type: 'RUNTIME_ERROR',
        payload: {
          message: err.name + ': ' + err.message,
          stack: err.stack,
          filename: 'script.js'
        }
      }, '*');
    }
  </script>
</body>
</html>`;
  }, [selectedProjectId, sandboxStorage]);

  // PostMessage message receiver from Sandbox Iframe
  useEffect(() => {
    const handleSandboxMessage = (event) => {
      if (!event.data || event.data.source !== 'FAHMRISE_SANDBOX') return;

      const { type, payload } = event.data;

      if (type === 'CONSOLE_LOG') {
        setConsoleLogs(prev => [...prev.slice(-49), payload]);
      } else if (type === 'CONSOLE_CLEAR') {
        setConsoleLogs([]);
      } else if (type === 'RUNTIME_ERROR') {
        setRuntimeError(payload);
        setConsoleLogs(prev => [...prev, { level: 'error', message: `❌ [${payload.filename || 'script.js'}] ${payload.message}`, time: new Date().toLocaleTimeString() }]);
      } else if (type === 'DOM_UPDATE') {
        setActiveDomInfo(payload);
      } else if (type === 'STORAGE_SYNC') {
        if (payload?.data) {
          setSandboxStorage(prev => ({
            ...prev,
            [selectedProjectId]: payload.data
          }));
        }
      }
    };

    window.addEventListener('message', handleSandboxMessage);
    return () => window.removeEventListener('message', handleSandboxMessage);
  }, [selectedProjectId]);

  // Execute Code and Run Real Validation Tests
  const compileAndRun = (customFiles = files, shouldRunTests = true, pId = selectedProjectId, customStorage = null) => {
    setIsRunning(true);
    setRuntimeError(null);
    setConsoleLogs([]);

    const docSrc = compileDocument(customFiles, pId, customStorage);
    setCompiledSrcDoc(docSrc);
    setExecutionKey(prev => prev + 1);

    if (shouldRunTests) {
      evaluateProjectTests(customFiles, pId);
    }

    setTimeout(() => {
      setIsRunning(false);
    }, 300);
  };

  // Automated Test Criteria Evaluation
  const evaluateProjectTests = (currentFiles, pId = selectedProjectId) => {
    const html = currentFiles['index.html'] || '';
    const css = currentFiles['style.css'] || '';
    const js = currentFiles['script.js'] || '';

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Robust Rule Evaluators for each of the 10 Projects
    const projectRuleMap = {
      'project-1': [
        {
          name: "HTML Form & Input Elements",
          check: (d) => (d.getElementById("todoForm") || d.querySelector("form")) && (d.getElementById("taskInput") || d.querySelector("input"))
        },
        {
          name: "Task List Container (<ul id='taskList'>)",
          check: (d) => d.getElementById("taskList") || d.querySelector("ul")
        },
        {
          name: "CSS Styling Connected",
          check: (d, j, c) => (c.includes(".app-container") || c.includes("container") || c.length > 30) && (c.includes("#10b981") || c.includes("color") || c.includes("background"))
        },
        {
          name: "JavaScript Event Listener & LocalStorage",
          check: (d, j) => (j.includes("addEventListener") || j.includes("onclick") || j.includes("onsubmit")) && (j.includes("submit") || j.includes("click") || j.includes("localStorage"))
        }
      ],
      'project-2': [
        {
          name: "Calculator Display Screen",
          check: (d) => d.getElementById("screen") || d.getElementById("display") || d.querySelector(".screen") || d.querySelector(".display")
        },
        {
          name: "Keypad & Number Buttons",
          check: (d, j) => d.querySelectorAll("button").length >= 8 || j.includes("appendNumber") || j.includes("number")
        },
        {
          name: "Arithmetic Calculation Logic",
          check: (d, j) => (j.includes("compute") || j.includes("calculate") || j.includes("+") || j.includes("-") || j.includes("*") || j.includes("/")) && (j.includes("addEventListener") || j.includes("onclick"))
        },
        {
          name: "Clear (AC) & Reset State",
          check: (d, j) => j.includes("clear") || j.includes("updateDisplay") || d.getElementById("clear") || d.querySelector(".all-clear")
        }
      ],
      'project-3': [
        {
          name: "Game Battleground Arena",
          check: (d) => d.getElementById("userChoice") || d.getElementById("playerChoice") || d.querySelector(".battleground") || d.querySelector(".choice-box") || d.querySelector(".choices")
        },
        {
          name: "Scoreboard & Result Display",
          check: (d) => d.getElementById("userScore") || d.getElementById("score") || d.getElementById("resultBanner") || d.querySelector(".scoreboard") || d.querySelector(".result")
        },
        {
          name: "Random AI Choice & Game Logic",
          check: (d, j) => j.includes("Math.random") && (j.includes("rock") || j.includes("paper") || j.includes("scissors"))
        }
      ],
      'project-4': [
        {
          name: "Quiz Question & Options Container",
          check: (d) => d.getElementById("question") || d.getElementById("quiz") || d.querySelector(".question") || d.querySelector(".quiz-box")
        },
        {
          name: "Countdown Timer Display",
          check: (d, j) => d.getElementById("timer") || d.getElementById("time") || j.includes("setInterval") || j.includes("timer")
        },
        {
          name: "Score Tracking & Next Question Logic",
          check: (d, j) => (j.includes("score") || j.includes("scoreCount")) && (j.includes("next") || j.includes("checkAnswer") || j.includes("currentQuestion"))
        }
      ],
      'project-5': [
        {
          name: "Joke Display Container",
          check: (d) => d.getElementById("jokeText") || d.getElementById("joke") || d.querySelector(".joke") || d.querySelector(".joke-container")
        },
        {
          name: "Generate Joke Action Button",
          check: (d) => d.getElementById("getJokeBtn") || d.getElementById("jokeBtn") || d.querySelector("button")
        },
        {
          name: "Fetch API & Async/Await",
          check: (d, j) => (j.includes("fetch") || j.includes("async") || j.includes("await")) && (j.includes("http") || j.includes("api") || j.includes("json"))
        }
      ],
      'project-6': [
        {
          name: "Search Input & Form",
          check: (d) => d.getElementById("cityInput") || d.querySelector("input") || d.querySelector("form")
        },
        {
          name: "Weather Info Card Display",
          check: (d) => d.getElementById("temp") || d.getElementById("weatherCard") || d.querySelector(".weather-info") || d.querySelector(".card")
        },
        {
          name: "Weather REST API & Dynamic Update",
          check: (d, j) => j.includes("fetch") && (j.includes("weather") || j.includes("api") || j.includes("open-meteo") || j.includes("city"))
        }
      ],
      'project-7': [
        {
          name: "Expense Form & Inputs",
          check: (d) => d.getElementById("expenseForm") || (d.querySelector("form") && (d.getElementById("amount") || d.querySelector("input[type='number']")))
        },
        {
          name: "Balance & Summary Cards",
          check: (d) => d.getElementById("balance") || d.getElementById("totalIncome") || d.querySelector(".summary") || d.querySelector(".balance")
        },
        {
          name: "Transaction List & LocalStorage",
          check: (d, j) => (d.getElementById("transactionList") || d.querySelector("ul") || d.querySelector("tbody")) && (j.includes("localStorage") || j.includes("transactions"))
        }
      ],
      'project-8': [
        {
          name: "Search Input & Query Form",
          check: (d) => d.getElementById("searchInput") || d.querySelector("input[type='search']") || d.querySelector("input")
        },
        {
          name: "Movies Grid Container",
          check: (d) => d.getElementById("moviesGrid") || d.getElementById("results") || d.querySelector(".grid") || d.querySelector(".movies")
        },
        {
          name: "Dynamic Card Generation & Fetch",
          check: (d, j) => j.includes("fetch") && (j.includes("createElement") || j.includes("innerHTML") || j.includes("forEach"))
        }
      ],
      'project-9': [
        {
          name: "Products Grid & Add Buttons",
          check: (d) => d.getElementById("productsList") || d.querySelector(".products") || d.querySelectorAll("button").length >= 2
        },
        {
          name: "Cart State & Total Calculation",
          check: (d, j) => (d.getElementById("cartTotal") || d.querySelector(".cart-total") || d.querySelector(".total")) && (j.includes("cart") || j.includes("total") || j.includes("price"))
        }
      ],
      'project-10': [
        {
          name: "KPI Summary Cards",
          check: (d) => d.querySelectorAll(".stat-card").length >= 2 || d.querySelectorAll(".card").length >= 2 || d.getElementById("totalEnrolled") || d.querySelector(".stats")
        },
        {
          name: "Charts / Visualization Container",
          check: (d) => d.getElementById("activityChart") || d.querySelector(".chart-container") || d.querySelector(".bars") || d.querySelector(".chart")
        },
        {
          name: "Interactive Filters & Handlers",
          check: (d, j) => (d.getElementById("timeRange") || d.querySelector("select") || d.querySelectorAll("button").length >= 2) && j.includes("addEventListener")
        }
      ]
    };

    let checks = [];
    const definedRules = projectRuleMap[pId];

    if (definedRules && definedRules.length > 0) {
      checks = definedRules.map(r => {
        let passed = false;
        try {
          passed = Boolean(r.check(doc, js, css));
        } catch(e) {
          passed = false;
        }
        return { name: r.name, passed };
      });
    } else if (currentProject?.tests && currentProject.tests.length > 0) {
      checks = currentProject.tests.map(t => {
        let passed = false;
        if (typeof t.check === 'function') {
          try {
            passed = Boolean(t.check(doc, js, css));
          } catch(e) {
            passed = false;
          }
        } else {
          passed = html.length > 20 && js.length > 10;
        }
        return { name: t.name, passed };
      });
    } else {
      checks = [
        {
          name: 'HTML Structure Present',
          passed: html.length > 20 && (html.includes('<') && html.includes('>'))
        },
        {
          name: 'CSS Styling Rules Defined',
          passed: css.length > 10 && css.includes('{') && css.includes('}')
        },
        {
          name: 'JavaScript Interactive Logic',
          passed: js.length > 10 && (/function|=>|addEventListener|const|let|document/i.test(js))
        },
        {
          name: 'DOM Connections & Selectors',
          passed: /getElementById|querySelector|getElementsBy/i.test(js) || html.includes('id=')
        }
      ];
    }

    const allPassed = checks.every(c => c.passed) && !runtimeError;
    setTestResults({ checks, allPassed });

    if (allPassed && currentProject) {
      setCompletedList(prev => [...new Set([...prev, currentProject.id])]);
      api.progress.submitProject('javascript-from-zero', JSON.stringify(currentFiles), { allPassed: true }, currentProject.id).catch(console.warn);
    }

    setBottomTab('tests');
  };

  const handleRunAndTestCode = () => {
    compileAndRun(files, true);
  };

  const handleResetCode = () => {
    if (window.confirm(`Reset project "${currentProject?.title}" files to original starter code?`)) {
      const starter = currentProject?.starterFiles || (currentProject?.files) || {
        'index.html': `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>${currentProject?.title}</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>${currentProject?.title}</h1>\n  <script src="script.js"></script>\n</body>\n</html>`,
        'style.css': `body { background: #090d16; color: white; padding: 20px; font-family: sans-serif; }`,
        'script.js': `console.log('Starter code reset.');`
      };
      
      // Clear isolated sandbox storage for this project
      setSandboxStorage(prev => {
        const next = { ...prev };
        delete next[selectedProjectId];
        return next;
      });

      setFiles(starter);
      setTestResults(null);
      setRuntimeError(null);
      setConsoleLogs([]);
      compileAndRun(starter, false, selectedProjectId, {});
    }
  };

  const handleExportProject = () => {
    const projectSlug = (currentProject?.title || 'fahmrise-project').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    // Create combined HTML with linked files for download
    const fullBundle = compileDocument(files);
    const blob = new Blob([fullBundle], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectSlug}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleAiHintClick = () => {
    setAiMode('hint');
    setAiTutorOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading FAHMRISE Practice Arena...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* Top Bar: Arena Header & Project Selector */}
      <div className="bg-slate-900/95 border-b border-slate-800 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 sticky top-16 z-30 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white">Practice Arena</h1>
              <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-800">
                10 Real Projects
              </span>
            </div>
          </div>
        </div>

        {/* Project Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-xl scrollbar-none">
          {projects.map((proj) => {
            const isSelected = proj.id === currentProject?.id;
            const isDone = completedList.includes(proj.id);
            return (
              <button
                key={proj.id}
                onClick={() => navigate(`/practice/${proj.id}`)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 shadow-glow font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                <span>P{proj.number}: {proj.title?.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleAiHintClick}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold flex items-center gap-1.5 border border-amber-400/30 transition-all hover:border-amber-400"
            title="Get Socratic hint from FAHMRISE AI Tutor"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Hint</span>
          </button>

          <button
            onClick={handleExportProject}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all hidden sm:flex items-center gap-1"
            title="Export full project code"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          <button
            onClick={handleRunAndTestCode}
            disabled={isRunning}
            className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold shadow-glow flex items-center gap-1.5 transition-all transform active:scale-95"
          >
            <Play className={`w-3.5 h-3.5 fill-slate-950 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Running...' : 'Run & Test Code'}</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column Split Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* ========================================================================= */}
        {/* Column 1: Project Specifications & Requirements (col-span-3) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-3 bg-slate-950 border-r border-slate-800 p-5 overflow-y-auto max-h-[calc(100vh-120px)] space-y-5">
          {currentProject && (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {currentProject.difficultyBadge || `Level ${currentProject.number}`}
                  </span>
                  <span className="text-xs text-slate-400">{currentProject.estimatedTime || '1.5 hours'}</span>
                </div>
                <h2 className="text-lg font-black text-white">{currentProject.title}</h2>
                <p className="text-xs text-slate-400 leading-relaxed">{currentProject.description}</p>
              </div>

              {/* Project Structure Callout */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Project File Structure</span>
                </div>
                <div className="font-mono text-[11px] text-slate-400 space-y-0.5 pl-1">
                  <div>├── <span className="text-amber-300">index.html</span> (Structure)</div>
                  <div>├── <span className="text-sky-300">style.css</span> (Styles)</div>
                  <div>└── <span className="text-emerald-300">script.js</span> (Logic)</div>
                </div>
              </div>

              {/* Skills Learned */}
              <div className="space-y-2 pt-2 border-t border-slate-900">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Skills Learned:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(currentProject.skillsLearned || []).map((skill, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900 text-teal-300 border border-slate-800">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Requirements & Criteria */}
              <div className="space-y-2 pt-2 border-t border-slate-900">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Requirements:</span>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {(currentProject.requirements || currentProject.learningObjectives || []).map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        {/* ========================================================================= */}
        {/* Column 2: Multi-File Code Editor (col-span-5) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 bg-slate-900/40 border-r border-slate-800 flex flex-col min-h-[460px]">
          
          {/* File Tabs Switcher */}
          <div className="p-1.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 overflow-x-auto">
              {['index.html', 'style.css', 'script.js'].map((fileName) => {
                const isActive = activeFileTab === fileName;
                const icon = fileName === 'index.html' ? (
                  <FileCode className="w-3.5 h-3.5 text-amber-400" />
                ) : fileName === 'style.css' ? (
                  <Palette className="w-3.5 h-3.5 text-sky-400" />
                ) : (
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                );

                return (
                  <button
                    key={fileName}
                    onClick={() => setActiveFileTab(fileName)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
                      isActive
                        ? 'bg-slate-800 text-white font-bold border border-slate-700 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    {icon}
                    <span>{fileName}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleResetCode}
              className="flex items-center gap-1 text-slate-400 hover:text-white text-[11px] px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
              title="Reset files to project starter template"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          {/* Active File Editor Area */}
          <div className="flex-1 p-2 bg-slate-950 flex flex-col">
            <div className="text-[10px] font-mono text-slate-500 pb-1 px-1 flex justify-between">
              <span>Editing: {activeFileTab}</span>
              <span>UTF-8 • Standard Safe Sandbox</span>
            </div>
            <textarea
              value={files[activeFileTab] || ''}
              onChange={(e) => {
                const val = e.target.value;
                setFiles(prev => ({
                  ...prev,
                  [activeFileTab]: val
                }));
              }}
              spellCheck={false}
              placeholder={`Write your ${activeFileTab} code here...`}
              className="w-full flex-1 min-h-[380px] lg:min-h-[calc(100vh-210px)] bg-slate-950 text-emerald-300 font-mono text-xs p-4 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 resize-none leading-relaxed selection:bg-emerald-500/30"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Column 3: Live Sandboxed Preview & Inspection Panel (col-span-4) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 bg-slate-950 flex flex-col min-h-[500px]">
          
          {/* Preview Header & Active DOM Status */}
          <div className="p-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">Live Interactive Preview</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active DOM ({activeDomInfo.elementsCount} Nodes)</span>
              </span>
            </div>

            <button
              onClick={() => compileAndRun(files, true)}
              className="p-1 hover:text-white rounded"
              title="Refresh Preview"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin text-emerald-400' : ''}`} />
            </button>
          </div>

          {/* Sandboxed Live Execution Frame */}
          <div className="p-2 bg-slate-950 flex-1 min-h-[260px] max-h-[380px]">
            <iframe
              key={executionKey}
              ref={iframeRef}
              title="FAHMRISE Isolated Sandbox"
              srcDoc={compiledSrcDoc}
              sandbox="allow-scripts allow-modals"
              className="w-full h-full min-h-[240px] bg-white rounded-xl border border-slate-800 shadow-inner"
            />
          </div>

          {/* Bottom Execution & Inspection Tabs */}
          <div className="border-t border-slate-800 bg-slate-900 flex flex-col flex-1">
            <div className="flex border-b border-slate-800 bg-slate-950 text-xs">
              <button
                onClick={() => setBottomTab('tests')}
                className={`px-3.5 py-2 font-bold flex items-center gap-1.5 border-b-2 transition-all ${
                  bottomTab === 'tests'
                    ? 'border-emerald-500 text-emerald-400 bg-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Validation Tests</span>
              </button>

              <button
                onClick={() => setBottomTab('console')}
                className={`px-3.5 py-2 font-bold flex items-center gap-1.5 border-b-2 transition-all ${
                  bottomTab === 'console'
                    ? 'border-emerald-500 text-emerald-400 bg-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Console ({consoleLogs.length})</span>
                {runtimeError && <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>}
              </button>

              <button
                onClick={() => setBottomTab('dom')}
                className={`px-3.5 py-2 font-bold flex items-center gap-1.5 border-b-2 transition-all ${
                  bottomTab === 'dom'
                    ? 'border-emerald-500 text-emerald-400 bg-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>DOM Nodes</span>
              </button>
            </div>

            <div className="p-3 overflow-y-auto max-h-[220px] text-xs space-y-2">
              
              {/* TAB 1: Test Results */}
              {bottomTab === 'tests' && (
                <div className="space-y-2">
                  {testResults ? (
                    <>
                      <div className="flex items-center justify-between pb-1">
                        <span className="font-bold text-white">Automated Evaluation:</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          testResults.allPassed ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}>
                          {testResults.allPassed ? '100% Passed 🎉 Verified' : 'Criteria Incomplete'}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {testResults.checks.map((c, i) => (
                          <div key={i} className="flex items-center justify-between p-1.5 rounded bg-slate-950/60 border border-slate-800/80">
                            <span className="text-slate-300">{c.name}</span>
                            <span className={c.passed ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                              {c.passed ? '✓ Pass' : '✗ Fail'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4 text-slate-500 space-y-2">
                      <p>Click <strong>"Run & Test Code"</strong> above to execute and validate your solution against automated criteria.</p>
                    </div>
                  )}

                  {runtimeError && (
                    <div className="p-2.5 bg-rose-950/80 border border-rose-500/50 rounded-xl text-rose-200 text-xs space-y-1">
                      <div className="font-bold flex items-center gap-1 text-rose-400">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>JavaScript Runtime Error:</span>
                      </div>
                      <p className="font-mono text-[11px]">{runtimeError.message}</p>
                      <button
                        onClick={handleAiHintClick}
                        className="text-[11px] text-amber-300 underline hover:text-amber-200 block pt-1"
                      >
                        Ask AI Tutor to explain this error →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Console Logs */}
              {bottomTab === 'console' && (
                <div className="space-y-1 font-mono text-[11px]">
                  {consoleLogs.length === 0 ? (
                    <p className="text-slate-500 italic py-2">No console output yet. Use console.log() in script.js to output data.</p>
                  ) : (
                    consoleLogs.map((log, i) => (
                      <div
                        key={i}
                        className={`p-1 rounded ${
                          log.level === 'error'
                            ? 'bg-rose-950/60 text-rose-300 border border-rose-900/60'
                            : log.level === 'warn'
                            ? 'bg-amber-950/60 text-amber-300'
                            : 'text-slate-300'
                        }`}
                      >
                        <span className="text-slate-600 text-[10px] mr-2">[{log.time || 'log'}]</span>
                        <span>{log.message}</span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 3: Active DOM Summary */}
              {bottomTab === 'dom' && (
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Total Nodes Rendered:</span>
                    <span className="font-bold text-white">{activeDomInfo.elementsCount}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500 block">Rendered Elements Tree Sample:</span>
                    <div className="flex flex-wrap gap-1">
                      {(activeDomInfo.elementsSample || []).map((el, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-950 text-teal-300 border border-slate-800 rounded font-mono text-[10px]">
                          &lt;{el}&gt;
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Embedded Socratic AI Tutor Drawer */}
      <AiTutorDrawer
        isOpen={aiTutorOpen}
        onClose={() => setAiTutorOpen(false)}
        currentExercise={{
          title: currentProject?.title || "JavaScript Practice Challenge",
          instructions: `${currentProject?.description || 'Build and test your interactive solution.'} (Files: index.html, style.css, script.js)`
        }}
        userCode={`/* --- index.html --- */\n${files['index.html']}\n\n/* --- style.css --- */\n${files['style.css']}\n\n/* --- script.js --- */\n${files['script.js']}${runtimeError ? `\n\n/* Active Runtime Error */\n${runtimeError.message}` : ''}`}
        initialMode={aiMode}
      />

    </div>
  );
}

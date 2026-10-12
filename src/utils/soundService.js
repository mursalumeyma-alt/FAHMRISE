/**
 * Sound and Pronunciation Engine for FAHMRISE
 * Provides high-fidelity, authentic audio for Arabic letters, Makharij articulation points,
 * comparison pairs, and Qur'anic recitation (Sheikh Mahmoud Khalil Al-Husary).
 * 
 * Multi-tiered robust architecture:
 * Tier 1: Server proxy stream `/api/audio/stream?text=...` (CORS-safe & cached)
 * Tier 2: Direct Quranic CDNs for verses (EveryAyah 128kbps Husary)
 * Tier 3: Browser SpeechSynthesis (Arabic voice ar-SA / ar) fallback when offline
 * Tier 4: Clear error dispatch without faking playback
 * 
 * Global singleton ensures only one audio plays at a time.
 */

// Singleton state
let activeAudio = null;
let activeCallbacks = null;

const QURAN_VERSES_MAP = {
  'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ': 'https://everyayah.com/data/Husary_128kbps/001001.mp3',
  'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ': 'https://everyayah.com/data/Husary_128kbps/001002.mp3',
  'الرَّحْمَٰنِ الرَّحِيمِ': 'https://everyayah.com/data/Husary_128kbps/001003.mp3',
  'مَالِكِ يَوْمِ الدِّينِ': 'https://everyayah.com/data/Husary_128kbps/001004.mp3',
  'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ': 'https://everyayah.com/data/Husary_128kbps/001005.mp3',
  'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ': 'https://everyayah.com/data/Husary_128kbps/001006.mp3',
  'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ': 'https://everyayah.com/data/Husary_128kbps/001007.mp3',
  'قُلْ هُوَ اللَّهُ أَحَدٌ': 'https://everyayah.com/data/Husary_128kbps/112001.mp3',
  'اللَّهُ الصَّمَدُ': 'https://everyayah.com/data/Husary_128kbps/112002.mp3',
  'لَمْ يَلِدْ وَلَمْ يُولَدْ': 'https://everyayah.com/data/Husary_128kbps/112003.mp3',
  'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ': 'https://everyayah.com/data/Husary_128kbps/112004.mp3',
  'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ': 'https://everyayah.com/data/Husary_128kbps/113001.mp3',
  'قُلْ أَعُوذُ بِرَبِّ النَّاسِ': 'https://everyayah.com/data/Husary_128kbps/114001.mp3',
  'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ': 'https://everyayah.com/data/Husary_128kbps/108001.mp3'
};

/**
 * Get authentic audio URL for any Arabic text, letter name, or Quran reference
 */
export function getAudioUrlForText(arabicText, options = {}) {
  if (!arabicText) return null;

  const trimmed = arabicText.trim();

  // 1. Direct custom audioUrl if provided
  if (options.audioUrl) {
    return options.audioUrl;
  }

  // 2. Specific Qur'anic verses by Sheikh Mahmoud Khalil Al-Husary (EveryAyah 128kbps)
  if (QURAN_VERSES_MAP[trimmed]) {
    return QURAN_VERSES_MAP[trimmed];
  }

  // 3. Reliable server stream proxy endpoint
  const backendBase = import.meta.env.VITE_API_URL || '';
  return `${backendBase}/api/audio/stream?text=${encodeURIComponent(trimmed)}`;
}

/**
 * Fallback Web Speech synthesis for Arabic
 */
function playArabicWebSpeech(text, callbacks = {}, playbackRate = 1.0) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (callbacks.onError) callbacks.onError(new Error('Audio synthesis not supported on this device.'));
    return false;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = playbackRate * 0.85;
    utterance.lang = 'ar-SA';

    const voices = window.speechSynthesis.getVoices() || [];
    const arVoice = voices.find(v => v.lang.startsWith('ar') || v.name.toLowerCase().includes('arabic'));
    if (arVoice) {
      utterance.voice = arVoice;
    }

    utterance.onstart = () => {
      if (callbacks.onStart) callbacks.onStart();
      if (callbacks.onLoading) callbacks.onLoading(false);
    };

    utterance.onend = () => {
      if (callbacks.onEnd) callbacks.onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Web Speech error:', e);
      if (callbacks.onLoading) callbacks.onLoading(false);
      if (callbacks.onError) callbacks.onError(e);
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('Failed Web Speech synthesis:', err);
    if (callbacks.onError) callbacks.onError(err);
    return false;
  }
}

/**
 * Play sound with singleton management, loading events, and error handling
 */
export function playPronunciation(textOrUrl, callbacks = {}, playbackRate = 1.0) {
  stopAllAudio();

  const isUrl = textOrUrl.startsWith('http://') || textOrUrl.startsWith('https://') || textOrUrl.startsWith('/api/');
  const targetUrl = isUrl ? textOrUrl : getAudioUrlForText(textOrUrl);
  const rawText = isUrl ? '' : textOrUrl;

  if (!targetUrl && !rawText) {
    if (callbacks.onError) callbacks.onError(new Error('No valid audio text or URL provided.'));
    return null;
  }

  try {
    if (callbacks.onLoading) {
      callbacks.onLoading(true);
    }

    const audio = new Audio(targetUrl);
    audio.playbackRate = playbackRate || 1.0;
    activeAudio = audio;
    activeCallbacks = callbacks;

    let hasStarted = false;

    audio.addEventListener('canplaythrough', () => {
      if (callbacks.onLoading) callbacks.onLoading(false);
    });

    audio.addEventListener('play', () => {
      hasStarted = true;
      if (callbacks.onStart) callbacks.onStart();
      if (callbacks.onLoading) callbacks.onLoading(false);
    });

    audio.addEventListener('ended', () => {
      if (callbacks.onEnd) callbacks.onEnd();
      activeAudio = null;
      activeCallbacks = null;
    });

    audio.addEventListener('error', (err) => {
      console.warn('Primary audio stream failed for:', targetUrl, err);
      activeAudio = null;

      // Tier 3 fallback: Web Speech API
      if (rawText && rawText.length < 200) {
        const fallbackSuccess = playArabicWebSpeech(rawText, callbacks, playbackRate);
        if (!fallbackSuccess && callbacks.onError) {
          callbacks.onError(new Error('Unable to play audio stream. Please check connection and retry.'));
        }
      } else {
        if (callbacks.onLoading) callbacks.onLoading(false);
        if (callbacks.onError) callbacks.onError(new Error('Unable to load audio stream. Please retry.'));
      }
    });

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Audio play catch handler:', err);
        // If autoplay blocked or fetch failed, fallback
        if (rawText && rawText.length < 200) {
          playArabicWebSpeech(rawText, callbacks, playbackRate);
        } else {
          if (callbacks.onLoading) callbacks.onLoading(false);
          if (callbacks.onError) callbacks.onError(err);
        }
      });
    }

    return audio;
  } catch (err) {
    console.error('Failed to initialize audio object:', err);
    if (rawText) {
      playArabicWebSpeech(rawText, callbacks, playbackRate);
    } else {
      if (callbacks.onError) callbacks.onError(err);
    }
    return null;
  }
}

/**
 * Stop any currently playing audio immediately
 */
export function stopAllAudio() {
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch (e) {}
    activeAudio = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }

  if (activeCallbacks && activeCallbacks.onEnd) {
    activeCallbacks.onEnd();
  }
  activeCallbacks = null;
}

/**
 * Check if audio is currently playing
 */
export function isAudioPlaying() {
  return !!activeAudio && !activeAudio.paused;
}

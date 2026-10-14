// FAHMRISE - International Languages Track Data
// Comprehensive curriculum and interactive learning data for English, French, Swahili, and Arabic.

export const INTERNATIONAL_LANGUAGES_TRACK = {
  id: 'international-languages',
  trackTitle: 'International Languages Track',
  heading: 'Learn Languages From Around the World',
  description: 'Develop practical language skills through structured courses in reading, writing, pronunciation, vocabulary, grammar, listening, and conversation across world languages.',
  category: 'International Languages',
  languages: [
    {
      id: 'arabic-language-learning',
      courseId: 'arabic-language-learning',
      language: 'Arabic',
      nativeTitle: 'العَرَبِيَّة',
      flag: '🇸🇦',
      title: 'Arabic Language Learning',
      subtitle: 'Learn Arabic letters, pronunciation, vocabulary, grammar, reading, and conversation through a dedicated language-learning curriculum.',
      description: 'Develop practical language skills through structured lessons in reading, writing, pronunciation, vocabulary, grammar, listening, and conversation across world languages.',
      status: 'available',
      isAvailable: true,
      isComingSoon: false,
      badge: 'Separate Upgrade • Arabic Track',
      badgeColor: 'emerald',
      price: 5000,
      priceDisplay: 'KSh 5,000 (Separate Upgrade)',
      estimatedHours: '40 – 60 Hours',
      totalLessons: 37,
      totalModules: 5,
      level: 'Beginner to Intermediate',
      coverColor: 'from-cyan-700 via-teal-800 to-slate-900',
      actionUrl: '/reader/arabic-language-learning',
      courseUrl: '/courses/arabic-language-learning',
      syllabusSummary: [
        'Arabic Alphabet, Vowels & Phonetics (Huruf & Makharij)',
        'Essential Vocabulary & Triliteral Root System',
        'Applied Grammar & Morphology (Nahw & Sarf)',
        'Everyday Conversational Fluency & Dialogues',
        'Reading Classical Texts & Sacred Literature'
      ]
    },
    {
      id: 'english-language-learning',
      courseId: 'english-language-learning',
      language: 'English',
      nativeTitle: 'English',
      flag: '🇬🇧',
      title: 'English Language Learning',
      subtitle: 'Master English phonetics, essential vocabulary, everyday greetings, sentence structure, listening comprehension, and conversational fluency.',
      description: 'Develop confident English communication skills through structured lessons in pronunciation, vocabulary building, social greetings, sentence mechanics, listening comprehension, and practical conversation.',
      status: 'available',
      isAvailable: true,
      isComingSoon: false,
      badge: 'Available Now • Video Course',
      badgeColor: 'blue',
      price: 5000,
      priceDisplay: 'KSh 5,000 / month ($39)',
      estimatedHours: '30 – 45 Hours',
      totalLessons: 6,
      totalModules: 6,
      level: 'Beginner to Intermediate',
      coverColor: 'from-blue-700 via-indigo-800 to-slate-900',
      actionUrl: '/reader/english-language-learning',
      courseUrl: '/courses/english-language-learning',
      syllabusSummary: [
        'Alphabet, Phonetics & Essential Sounds (44 Phonemes)',
        'Core Vocabulary, Numbers & Everyday Objects',
        'Greetings, Introductions & Social Expressions',
        'Sentence Building & Core Grammar Foundations',
        'Listening Comprehension & Auditory Skills',
        'Practical Real-World Conversations & Fluency'
      ]
    },
    {
      id: 'french-language-learning',
      courseId: 'french-language-learning',
      language: 'French',
      nativeTitle: 'Français',
      flag: '🇫🇷',
      title: 'French Language Learning',
      subtitle: 'Learn French pronunciation, essential vocabulary, everyday greetings, grammar foundations, listening skills, and practical conversation.',
      description: 'Acquire authentic French language skills through structured video lessons covering the French alphabet, accents, nasal vowels, core vocabulary, social greetings, noun genders, and regular verb conjugations.',
      status: 'available',
      isAvailable: true,
      isComingSoon: false,
      badge: 'Available Now • Video Course',
      badgeColor: 'sky',
      price: 5000,
      priceDisplay: 'KSh 5,000 / month ($39)',
      estimatedHours: '30 – 45 Hours',
      totalLessons: 6,
      totalModules: 6,
      level: 'Beginner to Intermediate',
      coverColor: 'from-sky-700 via-blue-800 to-slate-900',
      actionUrl: '/reader/french-language-learning',
      courseUrl: '/courses/french-language-learning',
      syllabusSummary: [
        'French Alphabet, Phonetics & Accents (é, è, ê, ç)',
        'Essential French Vocabulary & Numbers 1-100',
        'French Greetings & Polite Social Expressions',
        'Sentence Building & French Grammar (-ER Verbs)',
        'French Listening Comprehension & Auditory Practice',
        'Practical French Conversations & Daily Scenarios'
      ]
    },
    {
      id: 'swahili-language-learning',
      courseId: 'swahili-language-learning',
      language: 'Kiswahili',
      nativeTitle: 'Kiswahili',
      flag: '🇰🇪',
      title: 'Swahili Language Learning',
      subtitle: 'Improve Kiswahili pronunciation, essential vocabulary, greetings, noun classes, sentence structure, and confident daily conversation.',
      description: 'Learn Kiswahili—the major lingua franca of East Africa. Master Swahili alphabet sounds, core vocabulary, respectful greetings (Shikamoo, Hujambo, Habari), noun classes (Ngeli), verb tense markers, and everyday conversations.',
      status: 'available',
      isAvailable: true,
      isComingSoon: false,
      badge: 'Available Now • Video Course',
      badgeColor: 'amber',
      price: 5000,
      priceDisplay: 'KSh 5,000 / month ($39)',
      estimatedHours: '25 – 40 Hours',
      totalLessons: 6,
      totalModules: 6,
      level: 'Beginner to Intermediate',
      coverColor: 'from-amber-700 via-emerald-800 to-slate-900',
      actionUrl: '/reader/swahili-language-learning',
      courseUrl: '/courses/swahili-language-learning',
      syllabusSummary: [
        'Kiswahili Alphabet, Sounds & Syllable Stress Rules',
        'Core Swahili Vocabulary, Family & Numbers 1-1000',
        'Swahili Greetings (Habari, Hujambo, Shikamoo) & Etiquette',
        'Sentence Building, Noun Classes (Ngeli) & Tense Markers',
        'Swahili Listening Comprehension & Spoken Nuance',
        'Practical Swahili Conversations & Marketplace Scenarios'
      ]
    },
    {
      id: 'japanese-language-learning',
      courseId: 'japanese-language-learning',
      language: 'Japanese',
      nativeTitle: '日本語',
      flag: '🇯🇵',
      title: 'Japanese Language Learning',
      subtitle: 'Master Hiragana, Katakana, foundational Kanji, essential vocabulary, greetings, grammar particles, and conversational fluency.',
      description: 'Acquire authentic Japanese language skills through structured lessons in writing systems (Hiragana, Katakana, Kanji), pronunciation, social etiquette, sentence structure (SOV), particles, and real-world conversations.',
      status: 'available',
      isAvailable: true,
      isComingSoon: false,
      badge: 'Available Now • Video Course',
      badgeColor: 'rose',
      price: 5000,
      priceDisplay: 'KSh 5,000 / month ($39)',
      estimatedHours: '40 – 60 Hours',
      totalLessons: 10,
      totalModules: 10,
      level: 'Beginner to Intermediate',
      coverColor: 'from-rose-700 via-red-800 to-slate-900',
      actionUrl: '/reader/japanese-language-learning',
      courseUrl: '/courses/japanese-language-learning',
      syllabusSummary: [
        'Introduction to Japanese & Writing Systems (Hiragana, Katakana, Kanji)',
        'Hiragana Characters & Phonetics (46 Sounds, Dakuten)',
        'Katakana Characters & Foreign Loanwords (Gairaigo)',
        'Basic Kanji & Recognition (Radicals, Onyomi & Kunyomi)',
        'Greetings & Self-Introductions (Aisatsu & Jikoshoukai)',
        'Numbers, Dates, and Time (Counting, Days, Clock Time)',
        'Everyday Japanese Vocabulary (Family, Food, Home)',
        'Sentence Structure & Core Particles (SOV, wa, o, ga, ni, de)',
        'Asking and Answering Simple Questions (ka, nani, doko, itsu)',
        'Everyday Conversations & Review (Café, Shopping, Directions)'
      ]
    },
    {
      id: 'somali-language-learning',
      courseId: 'somali-language-learning',
      language: 'Somali',
      nativeTitle: 'Af-Soomaali',
      flag: '🇸🇴',
      title: 'Somali Language Learning',
      subtitle: 'Learn Somali alphabet, unique guttural and pharyngeal sounds, essential vocabulary, greetings, grammar, and daily conversational fluency.',
      description: 'Learn Af-Soomaali—the expressive language of the Horn of Africa. Master the 1972 Latin script, pharyngeals (X, C) and retroflex DH, vowel length distinctions, respectful greetings, family terms, numbers, common verbs, and market dialogues.',
      status: 'available',
      isAvailable: true,
      isComingSoon: false,
      badge: 'Available Now • Video Course',
      badgeColor: 'sky',
      price: 5000,
      priceDisplay: 'KSh 5,000 / month ($39)',
      estimatedHours: '40 – 60 Hours',
      totalLessons: 10,
      totalModules: 10,
      level: 'Beginner to Intermediate',
      coverColor: 'from-sky-700 via-blue-800 to-slate-900',
      actionUrl: '/reader/somali-language-learning',
      courseUrl: '/courses/somali-language-learning',
      syllabusSummary: [
        'Introduction to the Somali Language & Latin Script (1972)',
        'Somali Alphabet & Pronunciation (X, C, Q, KH, DH & Vowels)',
        'Greetings & Polite Expressions (Iska warran, Nabad, Mahadsanid)',
        'Introducing Yourself & Family (Magacaygu waa..., Qoyska)',
        'Numbers, Days, Dates, & Time (Tirada, Maalmaha, Saacadda)',
        'Everyday Somali Vocabulary (Guri, Shaah, Bariis, Suuq)',
        'Common Verbs & Sentence Building (Tag, Cun, Cab, Qor)',
        'Asking & Answering Simple Questions (Maxaa, Xaggee, Miyaa)',
        'Everyday Conversations & Scenarios (Suuqa & Maqaayadda)',
        'Reading Practice, Maahmaahyo Proverbs & Review'
      ]
    }
  ]
};

// =========================================================================
// 1. ENGLISH TRACK DATA
// =========================================================================
export const ENGLISH_TRACK_DATA = {
  id: 'english-language-learning',
  aliases: ['english-language-skills', 'english', 'learn-english'],
  trackTitle: 'International Languages: English',
  title: 'English Language Learning',
  nativeTitle: 'English',
  flag: '🇬🇧',
  badge: 'Available Now • Video Course',
  subtitle: 'Master English phonetics, essential vocabulary, everyday greetings, sentence structure, listening comprehension, and conversational fluency.',
  trackDescription: 'Develop confident English communication skills through structured lessons in pronunciation, vocabulary building, social greetings, sentence mechanics, listening comprehension, and practical conversation.',
  tagline: 'Understand. Learn. Rise.',
  category: 'International Languages',
  subCategory: 'English Language',
  level: 'Beginner to Intermediate',
  estimatedHours: '30 – 45 Hours',
  price: 5000,
  priceDisplay: 'KSh 5,000 / month ($39)',
  targetAudience: 'Designed for learners and professionals seeking clear pronunciation, expanded vocabulary, and natural conversational fluency.',
  
  learningOutcomes: [
    'Master the 44 phonetic sounds of English, vowel distinctions, and clear syllable stress.',
    'Build an active working vocabulary of over 1,200 essential words and everyday idiomatic expressions.',
    'Confidently engage in social greetings, introductions, workplace discussions, and real-world dialogues.'
  ],

  stats: {
    modulesCount: 6,
    totalLessons: 6,
    vocabularyCount: 1200,
    activeFlashcards: 40,
    practiceQuestions: 20,
    passagesCount: 3
  },

  dailyWords: [
    {
      id: 'en-dw-1',
      word: 'Opportunity',
      phonetic: '/ˌɒp.əˈtjuː.nə.ti/',
      translation: 'A set of circumstances that makes it possible to do something',
      category: 'Professional & Growth',
      usage: 'Learning global languages creates immense career opportunities.',
      breakdown: 'Noun from Latin "opportunitas". Plural: opportunities.'
    },
    {
      id: 'en-dw-2',
      word: 'Resilience',
      phonetic: '/rɪˈzɪl.jəns/',
      translation: 'The capacity to recover quickly from difficulties; toughness',
      category: 'Virtue & Character',
      usage: 'Consistent practice builds linguistic confidence and resilience.',
      breakdown: 'Derived from Latin "resilire" meaning to rebound or spring back.'
    },
    {
      id: 'en-dw-3',
      word: 'Collaboration',
      phonetic: '/kəˌlæb.əˈreɪ.ʃən/',
      translation: 'The action of working with someone to produce or create something',
      category: 'Workplace Fluency',
      usage: 'Effective collaboration requires active listening and clear composition.',
      breakdown: 'Noun formed from prefix "col-" (together) + "laborare" (to work).'
    },
    {
      id: 'en-dw-4',
      word: 'Perspective',
      phonetic: '/pəˈspɛk.tɪv/',
      translation: 'A particular attitude toward or way of regarding something; a point of view',
      category: 'Critical Thinking',
      usage: 'Reading widely broadens your cultural and intellectual perspective.',
      breakdown: 'From Latin "perspicere" meaning to look closely or perceive clearly.'
    },
    {
      id: 'en-dw-5',
      word: 'Articulate',
      phonetic: '/ɑːˈtɪk.jʊ.lət/',
      translation: 'Having or showing the ability to speak fluently and coherently',
      category: 'Communication',
      usage: 'She presented an articulate overview of the international project.',
      breakdown: 'Adjective and verb from Latin "articulus" (joint or distinct part).'
    }
  ],

  modules: [
    {
      id: 'en-mod-1',
      number: 1,
      title: 'Alphabet, Phonetics & Essential Sounds',
      subtitle: '26 letters, 44 phonemes, short/long vowels, and word stress rules.',
      readingTime: '15 min',
      flashcards: [
        { id: 'efc-1', group: 'Phonetics', front: 'Schwa (/ə/)', phonetic: '/ə/', back: 'The most common unstressed vowel sound in English (e.g., about, banana).' },
        { id: 'efc-2', group: 'Phonetics', front: 'Voiced /ð/ vs Unvoiced /θ/', phonetic: '/ð/ vs /θ/', back: 'This /ðɪs/ (voiced) vs Think /θɪŋk/ (unvoiced).' },
        { id: 'efc-3', group: 'Phonetics', front: 'Diphthong', phonetic: '/ˈdɪf.θɒŋ/', back: 'A gliding vowel sound combining two sounds in one syllable (e.g. coin /ɔɪ/, eye /aɪ/).' }
      ],
      lessons: [
        {
          id: 'en-1',
          number: 1,
          title: 'English Alphabet, Phonetics & Essential Sounds',
          subtitle: 'Mastering the 26 letters, 44 phonetic sounds, vowels, consonant pairs, and syllable stress.',
          readingTime: '15 min',
          explanation: 'English contains 26 letters but 44 distinct phonetic sounds (phonemes). Master short vowels, long vowels, diphthongs, and consonant pairs.'
        }
      ]
    },
    {
      id: 'en-mod-2',
      number: 2,
      title: 'Core Vocabulary, Numbers & Everyday Objects',
      subtitle: 'High-frequency nouns, counting systems, time expressions, and family words.',
      readingTime: '15 min',
      flashcards: [
        { id: 'efc-4', group: 'Vocabulary', front: 'Ordinal Numbers', phonetic: '/ˈɔː.dɪ.nəl/', back: 'First (1st), Second (2nd), Third (3rd), Fourteenth (14th) — used for dates and order.' },
        { id: 'efc-5', group: 'Vocabulary', front: 'Collocation', phonetic: '/ˌkɒl.əˈkeɪ.ʃən/', back: 'Words that naturally co-occur together (e.g. "make a decision" NOT "do a decision").' }
      ],
      lessons: [
        {
          id: 'en-2',
          number: 2,
          title: 'Core Vocabulary, Numbers & Everyday Objects',
          subtitle: 'Building a versatile active vocabulary covering daily objects, time, numbers, and common actions.',
          readingTime: '15 min',
          explanation: 'Learn high-frequency words that make up 80% of daily English speech, including time expressions, numbers, and family terms.'
        }
      ]
    },
    {
      id: 'en-mod-3',
      number: 3,
      title: 'Greetings, Introductions & Social Expressions',
      subtitle: 'Formal vs. informal salutations, introducing oneself, small talk, and polite conventions.',
      readingTime: '15 min',
      practiceQuestions: [
        {
          id: 'en-gq-1',
          question: 'What is the most polite and professional way to ask someone to repeat what they said?',
          options: ['What?', 'Pardon me, could you please repeat that?', 'Huh?', 'Say that again.'],
          correctIndex: 1,
          explanation: '"Pardon me, could you please repeat that?" is standard polite English.'
        }
      ],
      lessons: [
        {
          id: 'en-3',
          number: 3,
          title: 'Greetings, Introductions & Social Expressions',
          subtitle: 'Navigating polite introductions, formal vs. informal greetings, small talk, and social etiquette.',
          readingTime: '15 min',
          explanation: 'Master how to open conversations gracefully in formal and casual settings.'
        }
      ]
    },
    {
      id: 'en-mod-4',
      number: 4,
      title: 'Sentence Building & Core Grammar Foundations',
      subtitle: 'Subject-Verb-Object word order, present/past tenses, auxiliary verbs, and negation.',
      readingTime: '18 min',
      practiceQuestions: [
        {
          id: 'en-gq-2',
          question: 'Which of the following sentences is grammatically correct in the Past Simple tense?',
          options: ['Did you saw the report?', 'Did you see the report?', 'Did you seen the report?', 'Did you seeing the report?'],
          correctIndex: 1,
          explanation: 'When using "Did" for past questions, the main verb stays in its base form ("see").'
        }
      ],
      lessons: [
        {
          id: 'en-4',
          number: 4,
          title: 'Sentence Building & Core Grammar Foundations',
          subtitle: 'Understanding English word order (SVO), parts of speech, verb tenses, questions, and negative forms.',
          readingTime: '18 min',
          explanation: 'Construct clear, grammatically sound English sentences using the SVO formula and correct verb tenses.'
        }
      ]
    },
    {
      id: 'en-mod-5',
      number: 5,
      title: 'Listening Comprehension & Auditory Skills',
      subtitle: 'Understanding connected speech, weak forms, linking sounds, and natural speech pacing.',
      readingTime: '15 min',
      lessons: [
        {
          id: 'en-5',
          number: 5,
          title: 'Listening Comprehension & Auditory Skills',
          subtitle: 'Deciphering natural spoken English, connected speech, elision, linking sounds, and fast dialogue.',
          readingTime: '15 min',
          explanation: 'Train your ears to understand native English speech through connected speech rules and stress patterns.'
        }
      ]
    },
    {
      id: 'en-mod-6',
      number: 6,
      title: 'Practical Real-World Conversations & Fluency',
      subtitle: 'Everyday dialogues for restaurants, shopping, directions, travel, and meetings.',
      readingTime: '20 min',
      interactiveDialogueScenario: {
        title: 'Ordering at a Restaurant & Polite Dining',
        setting: 'Downtown Café • London',
        steps: [
          {
            speaker: 'Server',
            prompt: 'Good afternoon! Are you ready to order lunch?',
            options: [
              { text: 'Give me pasta now.', isCorrect: false, feedback: 'Too direct. Use "I would like..., please".' },
              { text: 'Yes, please! I would like the grilled fish with vegetables.', isCorrect: true, feedback: 'Excellent! Polite and natural formulation.' },
              { text: 'I want food.', isCorrect: false, feedback: 'Too vague and impolite.' }
            ]
          },
          {
            speaker: 'Server',
            prompt: 'Would you like sparkling or still water to drink?',
            options: [
              { text: 'A glass of sparkling water, please.', isCorrect: true, feedback: 'Perfect choice and polite response.' },
              { text: 'Water.', isCorrect: false, feedback: 'Always add "please" for courteous communication.' }
            ]
          }
        ]
      },
      lessons: [
        {
          id: 'en-6',
          number: 6,
          title: 'Practical Real-World Conversations & Fluency',
          subtitle: 'Navigating workplace interactions, ordering in restaurants, asking directions, travel, and everyday dialogue.',
          readingTime: '20 min',
          explanation: 'Synthesize your skills into real-world fluency with authentic conversational models.'
        }
      ]
    }
  ]
};

// =========================================================================
// 2. FRENCH TRACK DATA
// =========================================================================
export const FRENCH_TRACK_DATA = {
  id: 'french-language-learning',
  aliases: ['french-language', 'french', 'learn-french'],
  trackTitle: 'International Languages: French',
  title: 'French Language Learning',
  nativeTitle: 'Français',
  flag: '🇫🇷',
  badge: 'Available Now • Video Course',
  subtitle: 'Learn French pronunciation, essential vocabulary, everyday greetings, grammar foundations, listening skills, and practical conversation.',
  trackDescription: 'Acquire authentic French language skills through structured video lessons covering the French alphabet, accents, nasal vowels, core vocabulary, social greetings, noun genders, and regular verb conjugations.',
  tagline: 'Understand. Learn. Rise.',
  category: 'International Languages',
  subCategory: 'French Language',
  level: 'Beginner to Intermediate',
  estimatedHours: '30 – 45 Hours',
  price: 5000,
  priceDisplay: 'KSh 5,000 / month ($39)',
  targetAudience: 'Designed for beginners seeking to read, understand, and speak authentic French with confidence.',

  learningOutcomes: [
    'Master French phonetics, accent marks (é, è, ê, ç), nasal vowels, and liaison rules.',
    'Build a vocabulary of over 1,000 essential French words covering numbers, family, and daily life.',
    'Conduct fluent French greetings and conjugate regular -ER verbs in the present tense.'
  ],

  stats: {
    modulesCount: 6,
    totalLessons: 6,
    vocabularyCount: 1000,
    activeFlashcards: 40,
    practiceQuestions: 20,
    passagesCount: 3
  },

  dailyWords: [
    {
      id: 'fr-dw-1',
      word: 'Bonjour',
      phonetic: '/bɔ̃.ʒuʁ/',
      translation: 'Good morning / Hello',
      category: 'Salutations',
      usage: 'Bonjour Madame, comment allez-vous aujourd’hui ?',
      breakdown: 'Compound word from "bon" (good) + "jour" (day). The universal daytime greeting in French.'
    },
    {
      id: 'fr-dw-2',
      word: 'Merci',
      phonetic: '/mɛʁ.si/',
      translation: 'Thank you',
      category: 'Politesse',
      usage: 'Merci beaucoup pour votre aide précieuse.',
      breakdown: 'Derived from Old French "mercit" meaning grace or favor.'
    },
    {
      id: 'fr-dw-3',
      word: 'S’il vous plaît',
      phonetic: '/sil vu plɛ/',
      translation: 'Please (formal / polite)',
      category: 'Politesse',
      usage: 'Un café et un croissant, s’il vous plaît.',
      breakdown: 'Literally "if it pleases you". Use "s’il te plaît" only with friends and children.'
    },
    {
      id: 'fr-dw-4',
      word: 'Enchanté(e)',
      phonetic: '/ɑ̃.ʃɑ̃.te/',
      translation: 'Pleased to meet you / Delighted',
      category: 'Faire connaissance',
      usage: 'Enchanté de faire votre connaissance !',
      breakdown: 'Past participle of "enchanter". Add an extra "e" when written by/for a woman.'
    },
    {
      id: 'fr-dw-5',
      word: 'La famille',
      phonetic: '/la fa.mij/',
      translation: 'The family',
      category: 'Vocabulaire',
      usage: 'Ma famille habite dans une belle maison.',
      breakdown: 'Feminine noun with the silent final "e" and soft double "ll" pronounced like /j/.'
    }
  ],

  modules: [
    {
      id: 'fr-mod-1',
      number: 1,
      title: 'French Alphabet, Phonetics & Accents',
      subtitle: '26 letters, 5 accent marks (é, è, ê, ç, ë), nasal vowels, and liaison rules.',
      readingTime: '15 min',
      flashcards: [
        { id: 'ffc-1', group: 'Phonétique', front: 'Accent Aigu (é)', phonetic: '/e/', back: 'Appears only on E (été, café, étudiant). Creates a closed /e/ sound.' },
        { id: 'ffc-2', group: 'Phonétique', front: 'Cédille (ç)', phonetic: '/s/', back: 'Makes "c" sound like a soft "s" before a, o, u (français, garçon).' },
        { id: 'ffc-3', group: 'Phonétique', front: 'Lettre H', phonetic: '/aʃ/', back: 'Always silent in standard French (l’homme, l’hôtel).' }
      ],
      lessons: [
        {
          id: 'fr-1',
          number: 1,
          title: 'French Alphabet, Phonetics & Accents',
          subtitle: 'Mastering the 26 French letters, unique vowel sounds, nasal vowels, accent marks, and liaison.',
          readingTime: '15 min',
          explanation: 'Master French pronunciation, the 5 accents (aigu, grave, circonflexe, cédille, tréma), and silent final letters.'
        }
      ]
    },
    {
      id: 'fr-mod-2',
      number: 2,
      title: 'Essential French Vocabulary & Numbers',
      subtitle: 'Counting 1-100, days of the week, months, family relations, and everyday objects.',
      readingTime: '15 min',
      flashcards: [
        { id: 'ffc-4', group: 'Vocabulaire', front: 'Quatre-vingts (80)', phonetic: '/katʁ.vɛ̃/', back: '80 in standard French (literally 4 × 20).' },
        { id: 'ffc-5', group: 'Vocabulaire', front: 'Jours de la semaine', phonetic: '/ʒuʁ də la sə.mɛn/', back: 'Lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche.' }
      ],
      lessons: [
        {
          id: 'fr-2',
          number: 2,
          title: 'Essential French Vocabulary & Numbers',
          subtitle: 'Mastering numbers from 1 to 100, days of the week, months, family members, colors, and daily objects.',
          readingTime: '15 min',
          explanation: 'Build your core French vocabulary with numbers, calendar terms, and common objects.'
        }
      ]
    },
    {
      id: 'fr-mod-3',
      number: 3,
      title: 'French Greetings & Polite Social Expressions',
      subtitle: 'Formal Bonjour/Bonsoir, casual Salut, Tu vs. Vous (vouvoiement), and etiquette.',
      readingTime: '15 min',
      practiceQuestions: [
        {
          id: 'fr-gq-1',
          question: 'Which greeting is used in French when meeting someone in the evening?',
          options: ['Bonjour', 'Bonsoir', 'Bonne nuit', 'À demain'],
          correctIndex: 1,
          explanation: '"Bonsoir" is used for greetings in the evening ("Bonne nuit" is only for going to bed).'
        }
      ],
      lessons: [
        {
          id: 'fr-3',
          number: 3,
          title: 'French Greetings & Polite Social Expressions',
          subtitle: 'Navigating Bonjour, Bonsoir, Salut, introducing yourself (Je m\'appelle), and French politeness etiquette.',
          readingTime: '15 min',
          explanation: 'Master social greetings and polite conventions in Francophone cultures.'
        }
      ]
    },
    {
      id: 'fr-mod-4',
      number: 4,
      title: 'Sentence Building & French Grammar Foundations',
      subtitle: 'Noun genders (un/une, le/la), subject pronouns, and regular -ER verb conjugation in Présent.',
      readingTime: '18 min',
      practiceQuestions: [
        {
          id: 'fr-gq-2',
          question: 'What is the present tense ending for "Nous" with regular -ER verbs?',
          options: ['-ez', '-ons', '-ent', '-es'],
          correctIndex: 1,
          explanation: 'The ending for "Nous" with regular -ER verbs is always "-ons" (e.g., Nous parlons).'
        }
      ],
      lessons: [
        {
          id: 'fr-4',
          number: 4,
          title: 'Sentence Building & French Grammar Foundations',
          subtitle: 'Mastering Subject-Verb-Object word order, noun genders, articles, and regular -ER verb conjugation.',
          readingTime: '18 min',
          explanation: 'Understand the mechanics of French verb conjugation, noun genders, and negative sentence construction.'
        }
      ]
    },
    {
      id: 'fr-mod-5',
      number: 5,
      title: 'French Listening Comprehension & Auditory Practice',
      subtitle: 'Training your ear for spoken French, liaisons, vowel elisions, and natural contractions.',
      readingTime: '15 min',
      lessons: [
        {
          id: 'fr-5',
          number: 5,
          title: 'French Listening Comprehension & Auditory Practice',
          subtitle: 'Training your ear for spoken French, liaisons, vowel elisions, and natural spoken contractions.',
          readingTime: '15 min',
          explanation: 'Decipher spoken French rhythms, nasal vowels, and common conversational contractions.'
        }
      ]
    },
    {
      id: 'fr-mod-6',
      number: 6,
      title: 'Practical French Conversations & Daily Scenarios',
      subtitle: 'Real dialogues for ordering at a café, shopping at a boulangerie, asking directions, and travel.',
      readingTime: '20 min',
      interactiveDialogueScenario: {
        title: 'At the Parisian Bakery (À la Boulangerie)',
        setting: 'Boulangerie Traditionnelle • Paris',
        steps: [
          {
            speaker: 'Boulangère',
            prompt: 'Bonjour Monsieur ! Que désirez-vous aujourd’hui ?',
            options: [
              { text: 'Donne-moi du pain.', isCorrect: false, feedback: 'Too rude. Use polite formulas.' },
              { text: 'Bonjour Madame ! Une baguette tradition et deux croissants, s’il vous plaît.', isCorrect: true, feedback: 'Parfait ! Polite and precise French phrasing.' },
              { text: 'Je veux manger.', isCorrect: false, feedback: 'Impolite formulation.' }
            ]
          },
          {
            speaker: 'Boulangère',
            prompt: 'Voilà ! Ce sera tout ? Ça fait 3 euros 80.',
            options: [
              { text: 'Voici 4 euros, gardez la monnaie ! Bonne journée !', isCorrect: true, feedback: 'Très bien ! Friendly and courteous conclusion.' },
              { text: 'Au revoir.', isCorrect: false, feedback: 'Add polite closing remarks.' }
            ]
          }
        ]
      },
      lessons: [
        {
          id: 'fr-6',
          number: 6,
          title: 'Practical French Conversations & Daily Scenarios',
          subtitle: 'Full dialogues for ordering at a café, shopping at a boulangerie, booking a hotel, and everyday conversations.',
          readingTime: '20 min',
          explanation: 'Engage in authentic real-world dialogues across French cafes, stores, and transport.'
        }
      ]
    }
  ]
};

// =========================================================================
// 3. SWAHILI TRACK DATA
// =========================================================================
export const SWAHILI_TRACK_DATA = {
  id: 'swahili-language-learning',
  aliases: ['swahili-language-skills', 'swahili', 'kiswahili-skills', 'learn-swahili'],
  trackTitle: 'International Languages: Swahili',
  title: 'Swahili Language Learning',
  nativeTitle: 'Kiswahili',
  flag: '🇰🇪',
  badge: 'Available Now • Video Course',
  subtitle: 'Improve Kiswahili pronunciation, essential vocabulary, greetings, noun classes, sentence structure, and confident daily conversation.',
  trackDescription: 'Learn Kiswahili—the major lingua franca of East Africa. Master Swahili alphabet sounds, core vocabulary, respectful greetings (Shikamoo, Hujambo, Habari), noun classes (Ngeli), verb tense markers, and everyday conversations.',
  tagline: 'Understand. Learn. Rise.',
  category: 'International Languages',
  subCategory: 'Swahili Language',
  level: 'Beginner to Intermediate',
  estimatedHours: '25 – 40 Hours',
  price: 5000,
  priceDisplay: 'KSh 5,000 / month ($39)',
  targetAudience: 'Designed for beginners, travelers, and professionals wanting to communicate fluently in East Africa.',

  learningOutcomes: [
    'Pronounce all Kiswahili vowels and consonant clusters with standard penultimate stress.',
    'Master essential Kiswahili vocabulary for numbers, family, food, market goods, and travel.',
    'Engage fluently in cultural greetings (Hujambo/Sijambo, Habari, Shikamoo) and sentence building.'
  ],

  stats: {
    modulesCount: 6,
    totalLessons: 6,
    vocabularyCount: 1000,
    activeFlashcards: 40,
    practiceQuestions: 20,
    passagesCount: 3
  },

  dailyWords: [
    {
      id: 'sw-dw-1',
      word: 'Jambo / Hujambo',
      phonetic: '/ˈdʒa.mbo / hu.ˈdʒa.mbo/',
      translation: 'Hello / How are you?',
      category: 'Salamu',
      usage: 'Hujambo rafiki yangu? — Sijambo, asante!',
      breakdown: 'Standard greeting. Reply: "Sijambo" (I am fine / I have no issue).'
    },
    {
      id: 'sw-dw-2',
      word: 'Karibu',
      phonetic: '/ka.ˈri.bu/',
      translation: 'Welcome / You are welcome / Near',
      category: 'Ukarimu',
      usage: 'Karibu sana nyumbani kwetu!',
      breakdown: 'Key expression of East African hospitality. Plural: "Karibuni".'
    },
    {
      id: 'sw-dw-3',
      word: 'Asante',
      phonetic: '/a.ˈsan.te/',
      translation: 'Thank you',
      category: 'Shukrani',
      usage: 'Asante sana kwa ukarimu wako.',
      breakdown: 'Plural: "Asanteni". "Asante sana" = Thank you very much.'
    },
    {
      id: 'sw-dw-4',
      word: 'Elimu',
      phonetic: '/e.ˈli.mu/',
      translation: 'Education / Knowledge',
      category: 'Maadili',
      usage: 'Elimu ni mwanga wa maisha.',
      breakdown: 'Derived from Arabic "‘Ilm". Central to the FAHMRISE ethos.'
    },
    {
      id: 'sw-dw-5',
      word: 'Amani',
      phonetic: '/a.ˈma.ni/',
      translation: 'Peace / Tranquility',
      category: 'Hekima',
      usage: 'Tunawatakia watu wote amani na furaha.',
      breakdown: 'From root denoting safety, security, and peaceful coexistence.'
    }
  ],

  modules: [
    {
      id: 'sw-mod-1',
      number: 1,
      title: 'Kiswahili Alphabet, Sounds & Syllable Stress',
      subtitle: '5 pure vowels (A, E, I, O, U), consonant combinations, and penultimate syllable stress.',
      readingTime: '15 min',
      flashcards: [
        { id: 'sfc-1', group: 'Sauti', front: 'Kanuni ya Mkazo (Stress)', phonetic: '/m.ˈka.zo/', back: 'Stress almost ALWAYS falls on the second-to-last (penultimate) syllable (ki-swa-HI-li).' },
        { id: 'sfc-2', group: 'Sauti', front: 'Irabu Safi (Pure Vowels)', phonetic: '/i.ˈra.bu/', back: 'A (/ah/), E (/eh/), I (/ee/), O (/oh/), U (/oo/) — always consistent.' }
      ],
      lessons: [
        {
          id: 'sw-1',
          number: 1,
          title: 'Kiswahili Alphabet, Sounds & Syllable Stress',
          subtitle: 'Mastering the 5 pure Kiswahili vowels, consonant pairs, and the universal penultimate stress rule.',
          readingTime: '15 min',
          explanation: 'Understand pure Swahili vowels and the universal rule that stresses the second-to-last syllable.'
        }
      ]
    },
    {
      id: 'sw-mod-2',
      number: 2,
      title: 'Core Swahili Vocabulary, Family & Numbers',
      subtitle: 'Numbers 1-1000, days of the week (Jumamosi = Day 1), and family relations.',
      readingTime: '15 min',
      flashcards: [
        { id: 'sfc-3', group: 'Msamiati', front: 'Nambari 1-5', phonetic: '/na.m.ˈba.ri/', back: 'Moja (1), Mbili (2), Tatu (3), Nne (4), Tano (5).' },
        { id: 'sfc-4', group: 'Msamiati', front: 'Jumamosi (Saturday)', phonetic: '/dʒu.ma.ˈmo.si/', back: 'The first day of the week in Swahili calendar culture.' }
      ],
      lessons: [
        {
          id: 'sw-2',
          number: 2,
          title: 'Core Swahili Vocabulary, Family & Numbers',
          subtitle: 'Building foundational Kiswahili vocabulary: numbers 1-100, days of the week, family members, and everyday objects.',
          readingTime: '15 min',
          explanation: 'Build vocabulary covering numbers, calendar days, family relations, and common items.'
        }
      ]
    },
    {
      id: 'sw-mod-3',
      number: 3,
      title: 'Swahili Greetings (Habari, Hujambo, Shikamoo) & Etiquette',
      subtitle: 'Respectful elder greetings (Shikamoo/Marahaba), news greetings, and welcoming warmth.',
      readingTime: '15 min',
      practiceQuestions: [
        {
          id: 'sw-gq-1',
          question: 'What is the correct response when someone greets you with "Hujambo?"',
          options: ['Marahaba!', 'Sijambo!', 'Kwaheri!', 'Asante!'],
          correctIndex: 1,
          explanation: '"Sijambo!" is the matching grammatical response to "Hujambo?".'
        }
      ],
      lessons: [
        {
          id: 'sw-3',
          number: 3,
          title: 'Swahili Greetings (Habari, Hujambo, Shikamoo) & Etiquette',
          subtitle: 'Navigating polite social greetings, greeting elders (Shikamoo), time greetings, and cultural warmth in East Africa.',
          readingTime: '15 min',
          explanation: 'Master the 4 core greeting types and social etiquette across East Africa.'
        }
      ]
    },
    {
      id: 'sw-mod-4',
      number: 4,
      title: 'Sentence Building, Noun Classes (Ngeli) & Tense Markers',
      subtitle: 'Subject prefixes (Ni-, U-, A-), tense markers (-NA-, -LI-, -TA-, -ME-), and noun classes.',
      readingTime: '18 min',
      practiceQuestions: [
        {
          id: 'sw-gq-2',
          question: 'Which infix indicates past tense in Kiswahili?',
          options: ['-NA-', '-LI-', '-TA-', '-ME-'],
          correctIndex: 1,
          explanation: '"-LI-" indicates past tense (e.g., Nilisoma = I read/studied).'
        }
      ],
      lessons: [
        {
          id: 'sw-4',
          number: 4,
          title: 'Sentence Building, Noun Classes (Ngeli) & Tense Markers',
          subtitle: 'Mastering the agglutinative verb structure: Subject Prefix + Tense Marker + Verb Root.',
          readingTime: '18 min',
          explanation: 'Learn how to construct Swahili sentences using subject prefixes, tense infixes, and verb roots.'
        }
      ]
    },
    {
      id: 'sw-mod-5',
      number: 5,
      title: 'Swahili Listening Comprehension & Spoken Nuance',
      subtitle: 'Understanding native pacing, question words (Wapi, Lini, Nani), and Methali proverbs.',
      readingTime: '15 min',
      lessons: [
        {
          id: 'sw-5',
          number: 5,
          title: 'Swahili Listening Comprehension & Spoken Nuance',
          subtitle: 'Developing an ear for fast spoken Swahili, conversational contractions, and wise Swahili proverbs (Methali).',
          readingTime: '15 min',
          explanation: 'Tune your listening to spoken Swahili and decode famous Methali proverbs.'
        }
      ]
    },
    {
      id: 'sw-mod-6',
      number: 6,
      title: 'Practical Swahili Conversations & Daily Scenarios',
      subtitle: 'Bargaining at the sokoni (market), matatu transport, restaurant dining, and introductions.',
      readingTime: '20 min',
      interactiveDialogueScenario: {
        title: 'Bargaining at the Sokoni (Market)',
        setting: 'Soko Kuu • Nairobi / Dar es Salaam',
        steps: [
          {
            speaker: 'Muuzaji (Seller)',
            prompt: 'Habari za leo rafiki yangu! Karibu, matunda ni safi sana leo.',
            options: [
              { text: 'Sitaki kulipa pesa.', isCorrect: false, feedback: 'Impolite.' },
              { text: 'Asante kaka! Embe hili zuri ni bei gani?', isCorrect: true, feedback: 'Safi sana! Polite and natural market greeting.' },
              { text: 'Ondoka hapa.', isCorrect: false, feedback: 'Rude response.' }
            ]
          },
          {
            speaker: 'Muuzaji (Seller)',
            prompt: 'Embe moja ni shilingi themanini tu.',
            options: [
              { text: 'Ni ghali kidogo, tafadhali nipunguzie nitachukua matano!', isCorrect: true, feedback: 'Hongera! Friendly and customary bargaining formulation.' },
              { text: 'Gharama sana sitaki.', isCorrect: false, feedback: 'Ask for a reduction politely instead.' }
            ]
          }
        ]
      },
      lessons: [
        {
          id: 'sw-6',
          number: 6,
          title: 'Practical Swahili Conversations & Daily Scenarios',
          subtitle: 'Navigating the marketplace (Sokoni), public transport (Matatu), restaurants, and social introductions.',
          readingTime: '20 min',
          explanation: 'Apply Swahili in lively real-world marketplace and travel dialogues.'
        }
      ]
    }
  ]
};

// =========================================================================
// 4. ARABIC TRACK DATA
// =========================================================================
export const ARABIC_TRACK_DATA = {
  id: 'arabic-language-learning',
  aliases: ['international-languages', 'languages', 'arabic', 'arabic-language-mastery', 'arabic-language-learning'],
  trackTitle: 'International Languages: Arabic',
  title: 'Arabic Language Learning',
  nativeTitle: 'العَرَبِيَّة',
  flag: '🇸🇦',
  arabicTitle: 'العَرَبِيَّة',
  badge: 'Separate Upgrade • Arabic Track',
  subtitle: 'Learn Arabic letters, pronunciation, vocabulary, grammar, reading, and conversation through a dedicated language-learning curriculum.',
  trackDescription: 'Develop practical language skills through structured courses in reading, writing, pronunciation, vocabulary, grammar, listening, and conversation.',
  tagline: 'Understand. Learn. Rise.',
  category: 'International Languages',
  subCategory: 'Arabic Language',
  level: 'Beginner to Intermediate',
  estimatedHours: '40 – 60 Hours (Self-Paced)',
  price: 5000,
  priceDisplay: 'KSh 5,000 (Separate Upgrade)',
  targetAudience: 'Designed for beginners seeking practical reading, comprehension, and conversational fluency in Arabic from zero.',
  
  learningOutcomes: [
    'Master the 28 Arabic letters, Harakat (short vowels), Tanween, Sukoon, Shaddah, and anatomical articulation points (Makharij al-Huruf).',
    'Build a robust high-frequency vocabulary foundation with triliteral root recognition and active interactive flashcards.',
    'Understand core applied grammar (Nahw & Sarf) and engage in everyday Modern Standard Arabic dialogues.'
  ],

  stats: {
    modulesCount: 5,
    totalLessons: 37,
    vocabularyCount: 1000,
    activeFlashcards: 60,
    practiceQuestions: 25,
    passagesCount: 4
  },

  dailyWords: [
    {
      id: 'ar-dw-1',
      word: 'كِتَابٌ',
      arabic: 'كِتَابٌ',
      transliteration: 'Kitāb',
      translation: 'Book / Scripture',
      english: 'Book / Scripture',
      root: 'ك - ت - ب (K-T-B)',
      category: 'Qur’anic Essential',
      usage: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ',
      usageTrans: 'Dhalika al-kitabu la rayba feeh',
      usageEnglish: 'This is the Book about which there is no doubt. (Surah Al-Baqarah 2:2)',
      breakdown: 'Derived from root K-T-B meaning to write or compile. "Kitāb" refers to anything written, specifically divine revelation.'
    },
    {
      id: 'ar-dw-2',
      word: 'عِلْمٌ',
      arabic: 'عِلْمٌ',
      transliteration: '‘Ilm',
      translation: 'Knowledge / Science',
      english: 'Knowledge / Science',
      root: 'ع - ل - م (‘-L-M)',
      category: 'Wisdom & Learning',
      usage: 'وَقُل رَّبِّ زِدْنِي عِلْمًا',
      usageTrans: 'Wa qul Rabbi zidnee ‘ilma',
      usageEnglish: 'And say, "My Lord, increase me in knowledge." (Surah Ta-Ha 20:114)',
      breakdown: 'Noun from root ‘-L-M meaning to know, mark, or distinguish. The cornerstone of understanding in FAHMRISE ("Understand. Learn. Rise.").'
    },
    {
      id: 'ar-dw-3',
      word: 'سَلَامٌ',
      arabic: 'سَلَامٌ',
      transliteration: 'Salām',
      translation: 'Peace / Safety / Greeting',
      english: 'Peace / Safety / Greeting',
      root: 'س - ل - م (S-L-M)',
      category: 'Daily Greeting & Qur’an',
      usage: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
      usageTrans: 'As-Salāmu ‘alaykum wa rahmatullāh',
      usageEnglish: 'Peace be upon you and the mercy of Allah.',
      breakdown: 'Noun from root S-L-M denoting wholeness, security, and tranquility. Shares the root with "Islām" and "Muslim".'
    }
  ],

  modules: [
    {
      id: 'module-1',
      number: 1,
      title: 'Arabic Alphabet, Vowels & Phonetics',
      subtitle: 'Letter recognition, cursive connectivity, short/long vowels, and Makharij articulation.',
      readingTime: '45 min',
      flashcards: [
        { id: 'afc-1', group: 'Huruf', front: 'ب (Bā’)', transliteration: 'Bā’', back: 'Voiced bilabial stop formed by closing both lips together.' },
        { id: 'afc-2', group: 'Huruf', front: 'ع (‘Ayn)', transliteration: '‘Ayn', back: 'Voiced pharyngeal fricative articulated from the middle of the throat.' }
      ],
      practiceQuestions: [
        {
          id: 'ar-gq-1',
          question: 'How many consonant letters are in the standard Arabic alphabet?',
          options: ['24 letters', '28 letters', '30 letters', '32 letters'],
          correctIndex: 1,
          explanation: 'The Arabic alphabet consists of 28 distinct consonant letters.'
        }
      ],
      lessons: [
        { id: 'm1-l1', number: 1, title: 'Introduction to the Arabic Writing System', readingTime: '5 min', explanation: 'RTL orientation, 28 consonants, and cursive baseline connectivity.' },
        { id: 'm1-l2', number: 2, title: 'Letter Shapes and Dot Variations', readingTime: '6 min', explanation: 'Visual discrimination and skeletal groupings across letter forms.' }
      ]
    },
    {
      id: 'module-2',
      number: 2,
      title: 'Essential Vocabulary & Triliteral Roots',
      subtitle: 'High-frequency root derivations, nouns, plurals, and semantic patterns.',
      readingTime: '50 min',
      lessons: [
        { id: 'm2-l1', number: 1, title: 'The Triliteral Root System Architecture', readingTime: '6 min', explanation: 'How 3-letter roots generate vast networks of derived nouns and verbs.' }
      ]
    },
    {
      id: 'module-3',
      number: 3,
      title: 'Applied Grammar & Morphology (Nahw & Sarf)',
      subtitle: 'Nominal and verbal sentence structures, cases (I\'rab), and verb conjugations.',
      readingTime: '55 min',
      lessons: [
        { id: 'm3-l1', number: 1, title: 'The 3 Parts of Speech: Ism, Fi\'l, Harf', readingTime: '6 min', explanation: 'Classifying all Arabic words into Noun/Adjective, Verb, and Particle.' }
      ]
    },
    {
      id: 'module-4',
      number: 4,
      title: 'Everyday Conversational Fluency & Dialogues',
      subtitle: 'Social greetings, introductions, directions, market bargaining, and dining.',
      readingTime: '45 min',
      interactiveDialogueScenario: {
        title: 'At the Arabic Souq (Market)',
        setting: 'Old Souq • Cairo / Damascus',
        steps: [
          {
            speaker: 'Bā’i‘ (Seller)',
            prompt: 'Marhaban bik! Kayfa usā‘iduk al-yawm?',
            options: [
              { text: 'A‘tini al-qamis.', isCorrect: false, feedback: 'Add polite courtesies.' },
              { text: 'Ahlan bik! Bi-kam hādhā al-qamīṣ min faḍlik?', isCorrect: true, feedback: 'Mumtaz! Polite and accurate Arabic marketplace inquiry.' }
            ]
          }
        ]
      },
      lessons: [
        { id: 'm4-l1', number: 1, title: 'Greetings, Politeness & Social Etiquette', readingTime: '7 min', explanation: 'Standard greetings, polite courtesy formulas, and introductions.' }
      ]
    },
    {
      id: 'module-5',
      number: 5,
      title: 'Reading Classical Texts & Sacred Literature',
      subtitle: 'Morphological breakdown, root extraction, and authentic classical passage analysis.',
      readingTime: '50 min',
      lessons: [
        { id: 'm5-l1', number: 1, title: 'Reading Classical Prose: Principles & Syntax Flow', readingTime: '7 min', explanation: 'Analyzing classical Arabic syntax, verb-initial structures, and rhetorical devices.' }
      ]
    }
  ]
};


// =========================================================================
// 5. JAPANESE TRACK DATA
// =========================================================================
export const JAPANESE_TRACK_DATA = {
  id: 'japanese-language-learning',
  aliases: ['japanese-language', 'japanese', 'learn-japanese', 'nihongo'],
  trackTitle: 'International Languages: Japanese',
  title: 'Japanese Language Learning',
  nativeTitle: '日本語',
  flag: '🇯🇵',
  badge: 'Available Now • Video Course',
  subtitle: 'Master Hiragana, Katakana, foundational Kanji, essential vocabulary, greetings, grammar particles, and conversational fluency.',
  trackDescription: 'Acquire authentic Japanese language skills through structured lessons in writing systems (Hiragana, Katakana, Kanji), pronunciation, social etiquette, sentence structure (SOV), particles, and real-world conversations.',
  tagline: 'Understand. Learn. Rise.',
  category: 'International Languages',
  subCategory: 'Japanese Language',
  level: 'Beginner to Intermediate',
  estimatedHours: '40 – 60 Hours',
  price: 5000,
  priceDisplay: 'KSh 5,000 / month ($39)',
  targetAudience: 'Designed for beginners starting Japanese from scratch, JLPT N5 candidates, anime enthusiasts, and travelers.',

  learningOutcomes: [
    'Read and write all 46 Hiragana and 46 Katakana characters along with dakuten and combinations.',
    'Recognize and write foundational Kanji radicals and high-frequency characters.',
    'Master Japanese greetings, bowing etiquette, and polite self-introductions (Jikoshoukai).',
    'Count numbers, express calendar dates, and tell time in Japanese accurately.',
    'Build a foundational vocabulary of over 1,000 essential Japanese words and daily expressions.',
    'Construct sentences using Subject-Object-Verb (SOV) order and core particles (は, を, が, に, で, と).',
    'Form and answer questions with interrogatives (何, どこ, いつ, だれ, どうして, いくら).',
    'Conduct practical conversations for dining, shopping, asking for directions, and travel.'
  ],

  stats: {
    modulesCount: 10,
    totalLessons: 10,
    vocabularyCount: 1000,
    activeFlashcards: 40,
    practiceQuestions: 20,
    passagesCount: 3
  },

  dailyWords: [
    {
      id: 'ja-dw-1',
      word: '絆 (Kizuna)',
      phonetic: '/kizɯna/',
      translation: 'Bonds of friendship and connection between people',
      category: 'Culture & Connection',
      usage: 'Nihonjin wa kizuna o taisetsu ni shimasu (Japanese people cherish deep bonds).',
      breakdown: 'Kanji representing enduring human emotional bonds and community ties.'
    },
    {
      id: 'ja-dw-2',
      word: '木漏れ日 (Komorebi)',
      phonetic: '/komoɾebi/',
      translation: 'Sunlight filtering through the leaves of trees',
      category: 'Nature & Aesthetics',
      usage: 'Mori no komorebi ga kirei desu (The sunlight filtering through the forest is beautiful).',
      breakdown: 'Compound of 木 (tree) + 漏れ (filtering/leaking) + 日 (sunlight).'
    },
    {
      id: 'ja-dw-3',
      word: '改善 (Kaizen)',
      phonetic: '/kaizen/',
      translation: 'Continuous improvement / positive change',
      category: 'Growth & Philosophy',
      usage: 'Mainichi kaizen o kokorogakemasu (Aim for continuous daily improvement).',
      breakdown: 'Kanji 改 (change) + 善 (good / betterment).'
    },
    {
      id: 'ja-dw-4',
      word: '一期一会 (Ichigo Ichie)',
      phonetic: '/it͡ɕiɡo it͡ɕie/',
      translation: 'Treasure every encounter, for it will never recur',
      category: 'Wisdom & Philosophy',
      usage: 'Deai o ichigo ichie to omou (Cherish every encounter as once in a lifetime).',
      breakdown: 'Classic Four-character idiom (Yojijukugo) from the Japanese tea ceremony.'
    },
    {
      id: 'ja-dw-5',
      word: '思いやり (Omoiyari)',
      phonetic: '/omoiyaɾi/',
      translation: 'Thoughtfulness, empathy, and consideration for others',
      category: 'Social Harmony',
      usage: 'Omoiyari no kokoro o motsu (Have a compassionate, considerate heart).',
      breakdown: 'Derived from omou (to think/feel) + yaru (to direct towards others).'
    }
  ],

  modules: [
    {
      id: 'ja-mod-1',
      number: 1,
      title: 'Introduction to Japanese & Writing Systems',
      subtitle: 'Overview of Japanese language structure, Hiragana, Katakana, Kanji, and Romaji.',
      readingTime: '20 min',
      flashcards: [
        { id: 'jfc-1', group: 'Writing Systems', front: 'Hiragana (ひらがな)', phonetic: '/çiɾaɡana/', back: 'Curved phonetic script used for native words and grammatical particles.' },
        { id: 'jfc-2', group: 'Writing Systems', front: 'Katakana (カタカナ)', phonetic: '/katakana/', back: 'Angular phonetic script used for foreign loanwords and names.' },
        { id: 'jfc-3', group: 'Writing Systems', front: 'Kanji (漢字)', phonetic: '/kandʑi/', back: 'Ideographic characters adopted from Chinese that represent meanings and concepts.' }
      ],
      lessons: [
        {
          id: 'ja-1',
          number: 1,
          title: 'Introduction to Japanese & Its Writing Systems',
          subtitle: 'Understanding the three Japanese writing systems: Hiragana, Katakana, and Kanji.',
          readingTime: '20 min',
          explanation: 'Japanese blends three scripts: Hiragana for native grammar, Katakana for foreign words, and Kanji for core concepts.'
        }
      ]
    },
    {
      id: 'ja-mod-2',
      number: 2,
      title: 'Hiragana Characters & Phonetics',
      subtitle: 'Mastering the 46 basic Hiragana syllables, dakuten, handakuten, and contracted sounds.',
      readingTime: '25 min',
      flashcards: [
        { id: 'jfc-4', group: 'Hiragana', front: 'Dakuten (゛)', phonetic: '/dakɯten/', back: 'Two small dots that voice consonants: K→G, S→Z, T→D, H→B.' },
        { id: 'jfc-5', group: 'Hiragana', front: 'Handakuten (゜)', phonetic: '/handakɯten/', back: 'Small circle that turns H into P (pa, pi, pu, pe, po).' }
      ],
      lessons: [
        {
          id: 'ja-2',
          number: 2,
          title: 'Hiragana Characters & Phonetics',
          subtitle: 'Mastering the 46 basic Hiragana syllables, dakuten, handakuten, and combination sounds.',
          readingTime: '25 min',
          explanation: 'Learn the 46 foundation characters of Japanese reading and writing in the Gojuon grid.'
        }
      ]
    },
    {
      id: 'ja-mod-3',
      number: 3,
      title: 'Katakana Characters & Foreign Loanwords',
      subtitle: 'Mastering the 46 Katakana characters, long vowel marks, and reading loanwords (Gairaigo).',
      readingTime: '25 min',
      flashcards: [
        { id: 'jfc-6', group: 'Katakana', front: 'Chōonpu (ー)', phonetic: '/t͡ɕoːonpɯ/', back: 'The horizontal vowel extender dash used in Katakana loanwords (e.g. コーヒー = kōhī).' }
      ],
      lessons: [
        {
          id: 'ja-3',
          number: 3,
          title: 'Katakana Characters & Foreign Loanwords',
          subtitle: 'Mastering the 46 Katakana characters, long vowel marks, and reading loanwords (Gairaigo).',
          readingTime: '25 min',
          explanation: 'Read international loanwords, food menus, technology terms, and names in angular Katakana.'
        }
      ]
    },
    {
      id: 'ja-mod-4',
      number: 4,
      title: 'Basic Kanji & Recognition',
      subtitle: 'Understanding Kanji roots, Onyomi vs Kunyomi readings, stroke order, and foundational characters.',
      readingTime: '25 min',
      flashcards: [
        { id: 'jfc-7', group: 'Kanji', front: 'Onyomi (音読み)', phonetic: '/onjomi/', back: 'Chinese-derived reading, commonly used in multi-kanji compound words.' },
        { id: 'jfc-8', group: 'Kanji', front: 'Kunyomi (訓読み)', phonetic: '/kɯnjomi/', back: 'Native Japanese reading, used when a Kanji stands alone or with okurigana.' }
      ],
      lessons: [
        {
          id: 'ja-4',
          number: 4,
          title: 'Basic Kanji & Recognition',
          subtitle: 'Understanding Kanji roots, Onyomi vs Kunyomi readings, stroke order, and foundational characters.',
          readingTime: '25 min',
          explanation: 'Discover how Kanji pictographs convey meaning and how to recognize foundational numbers and elements.'
        }
      ]
    },
    {
      id: 'ja-mod-5',
      number: 5,
      title: 'Greetings & Self-Introductions',
      subtitle: 'Essential daily greetings, bowing etiquette, polite self-introductions (Jikoshoukai), and honorifics.',
      readingTime: '20 min',
      practiceQuestions: [
        {
          id: 'ja-gq-1',
          question: 'What is the appropriate phrase for introducing yourself to someone for the first time?',
          options: ['Konnichiwa', 'Hajimemashite', 'Arigatou', 'Sayounara'],
          correctIndex: 1,
          explanation: '"Hajimemashite" is the dedicated first-meeting greeting in Japanese.'
        }
      ],
      lessons: [
        {
          id: 'ja-5',
          number: 5,
          title: 'Greetings & Self-Introductions',
          subtitle: 'Essential daily greetings, bowing etiquette, polite self-introductions (Jikoshoukai), and honorifics.',
          readingTime: '20 min',
          explanation: 'Learn the complete polite self-introduction formula and essential daily etiquette.'
        }
      ]
    },
    {
      id: 'ja-mod-6',
      number: 6,
      title: 'Numbers, Dates, and Time',
      subtitle: 'Counting systems from 1 to 10,000, Japanese counters, days of the week, months, and clock time.',
      readingTime: '25 min',
      lessons: [
        {
          id: 'ja-6',
          number: 6,
          title: 'Numbers, Dates, and Time',
          subtitle: 'Counting systems from 1 to 10,000, Japanese counters, days of the week, months, and clock time.',
          readingTime: '25 min',
          explanation: 'Tell time, express prices, state dates and days of the week using the decimal numbering system.'
        }
      ]
    },
    {
      id: 'ja-mod-7',
      number: 7,
      title: 'Everyday Japanese Vocabulary',
      subtitle: 'High-frequency vocabulary for family, food, home items, transportation, and daily activities.',
      readingTime: '25 min',
      lessons: [
        {
          id: 'ja-7',
          number: 7,
          title: 'Everyday Japanese Vocabulary',
          subtitle: 'High-frequency vocabulary for family, food, home items, transportation, and daily activities.',
          readingTime: '25 min',
          explanation: 'Master high-frequency nouns and verbs for daily living, family, food, and transit.'
        }
      ]
    },
    {
      id: 'ja-mod-8',
      number: 8,
      title: 'Sentence Structure & Core Particles',
      subtitle: 'SOV word order, the copula です (desu), and vital particles: は (wa), を (o), が (ga), に (ni), で (de), と (to).',
      readingTime: '30 min',
      practiceQuestions: [
        {
          id: 'ja-gq-2',
          question: 'In Japanese Subject-Object-Verb (SOV) order, where does the verb always appear?',
          options: ['At the beginning', 'In the middle', 'At the very end of the sentence', 'Before the subject'],
          correctIndex: 2,
          explanation: 'Japanese strictly places the main verb at the very end of the sentence.'
        }
      ],
      lessons: [
        {
          id: 'ja-8',
          number: 8,
          title: 'Sentence Structure & Core Particles',
          subtitle: 'SOV word order, the copula です (desu), and vital particles: は (wa), を (o), が (ga), に (ni), で (de), と (to).',
          readingTime: '30 min',
          explanation: 'Master Japanese sentence architecture and postpositional particles that define grammatical roles.'
        }
      ]
    },
    {
      id: 'ja-mod-9',
      number: 9,
      title: 'Asking and Answering Simple Questions',
      subtitle: 'Forming questions with the particle か (ka), and question words: 何 (nani), どこ (doko), いつ (itsu), 誰 (dare).',
      readingTime: '25 min',
      lessons: [
        {
          id: 'ja-9',
          number: 9,
          title: 'Asking and Answering Simple Questions',
          subtitle: 'Forming questions with the particle か (ka), and question words: 何 (nani), どこ (doko), いつ (itsu), 誰 (dare).',
          readingTime: '25 min',
          explanation: 'Form polite questions naturally using interrogative pronouns and the sentence-ending particle ka.'
        }
      ]
    },
    {
      id: 'ja-mod-10',
      number: 10,
      title: 'Everyday Conversations & Review',
      subtitle: 'Practical dialogues for ordering food at a café, shopping, asking for directions, and course review.',
      readingTime: '30 min',
      interactiveDialogueScenario: {
        title: 'Ordering at a Tokyo Café',
        setting: 'Shibuya Café • Tokyo',
        steps: [
          {
            speaker: "Ten'in (Clerk)",
            prompt: 'Irasshaimase! Go-chuumon wa o-kimari desu ka?',
            options: [
              { text: 'Aisu kōhī o hitotsu kudasai.', isCorrect: true, feedback: 'Subarashii! Polite and accurate ordering expression.' },
              { text: 'Mizu wa nai desu.', isCorrect: false, feedback: 'Use "[Item] o kudasai" to place your order politely.' }
            ]
          }
        ]
      },
      lessons: [
        {
          id: 'ja-10',
          number: 10,
          title: 'Everyday Conversations & Review',
          subtitle: 'Practical dialogues for ordering food at a café, shopping, asking for directions, and course review.',
          readingTime: '30 min',
          explanation: 'Apply your Japanese in real-world café ordering, transit navigation, shopping, and review.'
        }
      ]
    }
  ]
};

// =========================================================================
// 6. SOMALI TRACK DATA
// =========================================================================
export const SOMALI_TRACK_DATA = {
  id: 'somali-language-learning',
  aliases: ['somali-language', 'somali', 'learn-somali', 'af-somali'],
  trackTitle: 'International Languages: Somali',
  title: 'Somali Language Learning',
  nativeTitle: 'Af-Soomaali',
  flag: '🇸🇴',
  badge: 'Available Now • Video Course',
  subtitle: 'Learn Somali alphabet, unique guttural and pharyngeal sounds, essential vocabulary, greetings, grammar, and daily conversational fluency.',
  trackDescription: 'Develop authentic Af-Soomaali communication skills through structured lessons in the 1972 Latin alphabet, pharyngeal sounds (X, C), retroflex DH, respectful greetings, family terms, numbers, common verbs, and market dialogues.',
  tagline: 'Understand. Learn. Rise.',
  category: 'International Languages',
  subCategory: 'Somali Language',
  level: 'Beginner to Intermediate',
  estimatedHours: '40 – 60 Hours',
  price: 5000,
  priceDisplay: 'KSh 5,000 / month ($39)',
  targetAudience: 'Designed for beginners starting Af-Soomaali, heritage learners reconnecting with their roots, and professionals working in East Africa.',

  learningOutcomes: [
    'Master the 21 Somali consonants and pronounce unique sounds accurately (X, C, Q, KH, DH).',
    'Distinguish clearly between short vowels and long vowels (AA, EE, II, OO, UU).',
    'Use everyday Somali greetings (Iska warran, Nabad miyaa, Subax wanaagsan, Mahadsanid, Fadlan).',
    'Introduce yourself and describe your family fluently in Af-Soomaali.',
    'Count numbers from 1 to 1,000, tell time (Saacadda), and name the days of the week.',
    'Build a rich working vocabulary of over 1,000 everyday Somali words.',
    'Form correct Somali sentences using common verbs (Tag, Cun, Cab, Qor) and verbal markers.',
    'Ask and answer questions with interrogatives (Maxaa, Xaggee, Goorma, Yaa, Sidee, Miyaa).',
    'Participate confidently in conversations at the market (Suuqa) and restaurants (Maqaayadda).'
  ],

  newsSource: {
    id: 'somali-learning',
    provider: 'Somali Learning',
    nativeProvider: 'Barashada Af-Soomaaliga',
    websiteUrl: 'https://www.learnable.education/',
    actionText: 'Explore Somali Learning Curriculum',
    nativeActionText: "Ka Faa'iidayso Barashada Af-Soomaaliga",
    description: 'Comprehensive Somali language education covering beginner fundamentals, vocabulary, speaking dialogues, grammar principles, reading, pronunciation, and quizzes.',
    flag: '🇸🇴'
  },

  stats: {
    modulesCount: 10,
    totalLessons: 10,
    vocabularyCount: 1000,
    activeFlashcards: 40,
    practiceQuestions: 20,
    passagesCount: 3
  },

  dailyWords: [
    {
      id: 'so-dw-1',
      word: 'Aqoon',
      phonetic: '/æqɔːn/',
      translation: 'Knowledge / Education / Wisdom',
      category: 'Education & Wisdom',
      usage: "Aqoon la'aan waa iftiin la'aan (Without knowledge, there is no light).",
      breakdown: 'Foundational Somali noun for learning, scholarship, and intellectual mastery.'
    },
    {
      id: 'so-dw-2',
      word: 'Gobanimo',
      phonetic: '/ɡɔbænimɔ/',
      translation: 'Nobility, dignity, virtue, and generosity of spirit',
      category: 'Character & Culture',
      usage: 'Gobanimo waa dhaqan wanaagsan (Nobility of character is good conduct).',
      breakdown: 'Derived from "gob" (noble/generous person) + abstract suffix "-nimo".'
    },
    {
      id: 'so-dw-3',
      word: 'Wadajir',
      phonetic: '/wædædʒir/',
      translation: 'Solidarity, unity, and working together',
      category: 'Community & Strength',
      usage: 'Gacmo wadajir bay wax ku gooyaan (Hands united accomplish great things).',
      breakdown: 'Compound of "wada" (together) + "jir" (being/existence).'
    },
    {
      id: 'so-dw-4',
      word: 'Samir',
      phonetic: '/sæmir/',
      translation: 'Patience, endurance, and fortitude',
      category: 'Virtue',
      usage: 'Samirku waa furaha guusha (Patience is the key to victory).',
      breakdown: 'Core virtue celebrated across Somali poetry and oral wisdom.'
    },
    {
      id: 'so-dw-5',
      word: 'Dhiirran',
      phonetic: '/ɖiːrræn/',
      translation: 'Courage, boldness, and high aspiration',
      category: 'Leadership & Mindset',
      usage: 'Dhalinyaradu waa inay dhiirranaadaan (Youth should be courageous and aspiring).',
      breakdown: 'Adjective expressing inner confidence, bravery, and resolve.'
    }
  ],

  modules: [
    {
      id: 'so-mod-1',
      number: 1,
      title: 'Introduction to the Somali Language',
      subtitle: 'Overview of Af-Soomaali, the Cushitic language family, history, and official Latin script.',
      readingTime: '20 min',
      flashcards: [
        { id: 'sfc-1', group: 'Origins', front: 'Far Soomaali (1972)', phonetic: '/fær soːmɑːli/', back: 'The standardized Somali Latin script created by Shire Jama Ahmed in 1972.' },
        { id: 'sfc-2', group: 'Language Family', front: 'Cushitic', phonetic: '/kʊˈʃɪtɪk/', back: 'The Afroasiatic branch to which the Somali language belongs.' }
      ],
      lessons: [
        {
          id: 'so-1',
          number: 1,
          title: 'Introduction to the Somali Language',
          subtitle: 'Overview of Af-Soomaali, the Cushitic language family, history, and official Latin script.',
          readingTime: '20 min',
          explanation: 'Explore the history, geography, oral poetry tradition, and 1972 Latin script of the Somali language.'
        }
      ]
    },
    {
      id: 'so-mod-2',
      number: 2,
      title: 'Somali Alphabet & Pronunciation',
      subtitle: '21 consonants, unique sounds (X, C, Q, KH, DH), and short vs. long vowel distinctions (AA, EE, II, OO, UU).',
      readingTime: '25 min',
      flashcards: [
        { id: 'sfc-3', group: 'Phonetics', front: 'X (Pharyngeal H)', phonetic: '/ħ/', back: 'Unvoiced pharyngeal fricative sound produced in the middle of the throat.' },
        { id: 'sfc-4', group: 'Phonetics', front: 'C (Voiced Pharyngeal)', phonetic: '/ʕ/', back: 'Voiced pharyngeal fricative squeeze sound (as in Caano / Cali).' },
        { id: 'sfc-5', group: 'Phonetics', front: 'DH (Retroflex D)', phonetic: '/ɖ/', back: 'Voiced retroflex stop produced by curling the tongue tip against the hard palate.' }
      ],
      lessons: [
        {
          id: 'so-2',
          number: 2,
          title: 'Somali Alphabet & Pronunciation',
          subtitle: '21 consonants, unique sounds (X, C, Q, KH, DH), and short vs. long vowel distinctions (AA, EE, II, OO, UU).',
          readingTime: '25 min',
          explanation: 'Master the 21 consonants, unique pharyngeal letters, and single vs. double vowel lengths.'
        }
      ]
    },
    {
      id: 'so-mod-3',
      number: 3,
      title: 'Greetings & Polite Expressions',
      subtitle: 'Social greetings (Iska warran, Nabad miyaa, Subax wanaagsan), polite requests (Fadlan), and gratitude (Mahadsanid).',
      readingTime: '20 min',
      practiceQuestions: [
        {
          id: 'so-gq-1',
          question: 'What is the standard polite reply to the greeting "Nabad miyaa?" (Is there peace?)',
          options: ['Maya', 'Waa nabad', 'Fadlan', 'Nabad gelyo'],
          correctIndex: 1,
          explanation: '"Waa nabad" (It is peace) is the traditional Somali response.'
        }
      ],
      lessons: [
        {
          id: 'so-3',
          number: 3,
          title: 'Greetings & Polite Expressions',
          subtitle: 'Social greetings (Iska warran, Nabad miyaa, Subax wanaagsan), polite requests (Fadlan), and gratitude (Mahadsanid).',
          readingTime: '20 min',
          explanation: 'Master warm social greetings, time-of-day salutations, and polite expressions of gratitude.'
        }
      ]
    },
    {
      id: 'so-mod-4',
      number: 4,
      title: 'Introducing Yourself & Family',
      subtitle: 'Self-introductions (Magacaygu waa...), origin, residence, and vocabulary for parents and siblings.',
      readingTime: '25 min',
      lessons: [
        {
          id: 'so-4',
          number: 4,
          title: 'Introducing Yourself & Family',
          subtitle: 'Self-introductions (Magacaygu waa...), origin, residence, and vocabulary for parents and siblings.',
          readingTime: '25 min',
          explanation: 'Introduce yourself, state your background and residence, and discuss family members (Qoyska).'
        }
      ]
    },
    {
      id: 'so-mod-5',
      number: 5,
      title: 'Numbers, Days, Dates, & Time',
      subtitle: 'Counting from 1 to 1000, the 7 days of the week (Maalmaha todobaadka), calendar terms, and clock time.',
      readingTime: '25 min',
      lessons: [
        {
          id: 'so-5',
          number: 5,
          title: 'Numbers, Days, Dates, & Time',
          subtitle: 'Counting from 1 to 1000, the 7 days of the week (Maalmaha todobaadka), calendar terms, and clock time.',
          readingTime: '25 min',
          explanation: 'Count accurately, tell the time of day, and name days of the week in Somali.'
        }
      ]
    },
    {
      id: 'so-mod-6',
      number: 6,
      title: 'Everyday Somali Vocabulary',
      subtitle: 'High-frequency vocabulary for home (Guriga), food (Cunto), tea (Shaah), market (Suuq), and school.',
      readingTime: '25 min',
      lessons: [
        {
          id: 'so-6',
          number: 6,
          title: 'Everyday Somali Vocabulary',
          subtitle: 'High-frequency vocabulary for home (Guriga), food (Cunto), tea (Shaah), market (Suuq), and school.',
          readingTime: '25 min',
          explanation: 'Expand your practical vocabulary for home objects, Somali culinary staples, and public locations.'
        }
      ]
    },
    {
      id: 'so-mod-7',
      number: 7,
      title: 'Common Verbs & Sentence Building',
      subtitle: 'Action verbs (Tag, Cun, Cab, Qor, Akhri), subject pronouns, and forming basic affirmative and negative sentences.',
      readingTime: '30 min',
      practiceQuestions: [
        {
          id: 'so-gq-2',
          question: 'How do you say "I am going" in Somali?',
          options: ['Waan cunayaa', 'Waan tagayaa', 'Waan qorayaa', 'Waan cabayaa'],
          correctIndex: 1,
          explanation: '"Waan tagayaa" means "I am going" (from the root verb "Tag").'
        }
      ],
      lessons: [
        {
          id: 'so-7',
          number: 7,
          title: 'Common Verbs & Sentence Building',
          subtitle: 'Action verbs (Tag, Cun, Cab, Qor, Akhri), subject pronouns, and forming basic affirmative and negative sentences.',
          readingTime: '30 min',
          explanation: 'Construct complete sentences with action verbs, pronouns, and present and past markers.'
        }
      ]
    },
    {
      id: 'so-mod-8',
      number: 8,
      title: 'Asking & Answering Simple Questions',
      subtitle: 'Question words (Maxaa, Xaggee, Goorma, Yaa, Sidee) and the question marker Miyaa / Ma.',
      readingTime: '25 min',
      lessons: [
        {
          id: 'so-8',
          number: 8,
          title: 'Asking & Answering Simple Questions',
          subtitle: 'Question words (Maxaa, Xaggee, Goorma, Yaa, Sidee) and the question marker Miyaa / Ma.',
          readingTime: '25 min',
          explanation: 'Ask and answer questions confidently using question pronouns and interrogative markers.'
        }
      ]
    },
    {
      id: 'so-mod-9',
      number: 9,
      title: 'Everyday Conversations & Scenarios',
      subtitle: 'Market bargaining at the suuq, ordering food at maqaayad, and asking for directions.',
      readingTime: '30 min',
      interactiveDialogueScenario: {
        title: 'Ordering at a Somali Maqaayad',
        setting: 'Maqaayad • Mogadishu / Hargeisa',
        steps: [
          {
            speaker: 'Keliyeha (Waiter)',
            prompt: 'Subax wanaagsan! Maxaan kuu keenaa saaka?',
            options: [
              { text: 'Fadlan ii keen canjeero, suqaar, iyo koob shaah cad ah.', isCorrect: true, feedback: 'Aad u wanaagsan! Polite and authentic order.' },
              { text: 'Cunto ma hayo.', isCorrect: false, feedback: 'Use "Fadlan ii keen..." to order food politely.' }
            ]
          }
        ]
      },
      lessons: [
        {
          id: 'so-9',
          number: 9,
          title: 'Everyday Conversations & Scenarios',
          subtitle: 'Market bargaining at the suuq, ordering food at maqaayad, and asking for directions.',
          readingTime: '30 min',
          explanation: 'Practice real-world dialogues for market bargaining, restaurant dining, and asking for directions.'
        }
      ]
    },
    {
      id: 'so-mod-10',
      number: 10,
      title: 'Reading Practice & Course Review',
      subtitle: 'Short reading comprehension passages, traditional Somali proverbs (Maahmaahyo), and course review.',
      readingTime: '30 min',
      lessons: [
        {
          id: 'so-10',
          number: 10,
          title: 'Reading Practice & Course Review',
          subtitle: 'Short reading comprehension passages, traditional Somali proverbs (Maahmaahyo), and course review.',
          readingTime: '30 min',
          explanation: 'Read short cultural texts, explore traditional wisdom proverbs (Maahmaahyo), and review the complete course.'
        }
      ]
    }
  ]
};

// Map of all language tracks for dynamic lookup
export const ALL_LANGUAGE_TRACKS = {
  'english-language-learning': ENGLISH_TRACK_DATA,
  'french-language-learning': FRENCH_TRACK_DATA,
  'swahili-language-learning': SWAHILI_TRACK_DATA,
  'arabic-language-learning': ARABIC_TRACK_DATA,
  'japanese-language-learning': JAPANESE_TRACK_DATA,
  'somali-language-learning': SOMALI_TRACK_DATA
};

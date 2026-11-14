/**
 * FAHMRISE — AHKAMU AL TAJWEUED
 * Chapter 11: Final Tajweed Examination & Certification (الاختبار النهائي وشهادة إتمام التجويد)
 * 
 * 24 Comprehensive Questions across 6 Core Sections:
 * 1. Makharij Mastery (مخارج الحروف)
 * 2. Noon Sakinah & Tanween (أحكام النون الساكنة والتنوين)
 * 3. Meem Sakinah & Qalqalah (أحكام الميم الساكنة والقلقلة)
 * 4. Madd Timing & Tafkhim/Tarqiq (أحكام المد والتفخيم والترقيق)
 * 5. Complete Tajweed Knowledge (صفات الحروف والوقف والابتداء وأحكام التاء)
 * 6. Practical Recitation Assessment (التطبيق العملي في الآيات القرآنية)
 * 
 * Passing Threshold: 80% (Minimum 20 / 24 correct answers required)
 */

export const EXAM_SECTIONS = [
  {
    id: 'makharij',
    number: 1,
    title: 'Makharij Mastery',
    arabicTitle: 'مخارج الحروف',
    subtitle: 'Points of articulation and anatomical letter origin',
    icon: 'Layers',
    questionIndices: [0, 1, 2, 3]
  },
  {
    id: 'noon-sakinah',
    number: 2,
    title: 'Noon Sakinah & Tanween',
    arabicTitle: 'أحكام النون الساكنة والتنوين',
    subtitle: 'The four fundamental rules: Izhar, Idgham, Iqlab, and Ikhfa',
    icon: 'Sparkles',
    questionIndices: [4, 5, 6, 7]
  },
  {
    id: 'meem-qalqalah',
    number: 3,
    title: 'Meem Sakinah & Qalqalah',
    arabicTitle: 'الميم الساكنة والقلقلة',
    subtitle: 'The three Meem rules, articulation precautions, and echoing levels',
    icon: 'Volume2',
    questionIndices: [8, 9, 10, 11]
  },
  {
    id: 'madd-tafkhim',
    number: 4,
    title: 'Madd Timing & Tafkhim/Tarqiq',
    arabicTitle: 'المدود والتفخيم والترقيق',
    subtitle: 'Elongation counts, heavy and light letters, and conditional rules',
    icon: 'Award',
    questionIndices: [12, 13, 14, 15]
  },
  {
    id: 'complete-knowledge',
    number: 5,
    title: 'Complete Tajweed Knowledge',
    arabicTitle: 'صفات الحروف والوقف',
    subtitle: 'Sifat Al-Huruf, Waqf stop symbols, Ibtida, and Ta Marbutah',
    icon: 'BookOpen',
    questionIndices: [16, 17, 18, 19]
  },
  {
    id: 'recitation',
    number: 6,
    title: 'Practical Recitation Assessment',
    arabicTitle: 'التطبيق العملي في الآيات',
    subtitle: 'Real-world identification of rules in authentic Qur\'anic verses',
    icon: 'CheckCircle2',
    questionIndices: [20, 21, 22, 23]
  }
];

export const EXAM_QUESTIONS = [
  // SECTION 1: Makharij Mastery (Questions 1 - 4)
  {
    id: 'makharij-q1',
    sectionId: 'makharij',
    sectionNumber: 1,
    sectionTitle: 'Makharij Mastery (مخارج الحروف)',
    question: 'According to Imam Ibn al-Jazari, what are the five major general articulation zones (المخارج العامة) of the Arabic sound system?',
    arabicPrompt: 'المخارج العامة الخمسة للحروف العربية',
    options: [
      'Al-Jawf (Oral Cavity), Al-Halq (Throat), Al-Lisan (Tongue), Ash-Shafatan (Lips), and Al-Khayshum (Nasal Cavity)',
      'Al-Ra\'s (Head), Al-Halq (Throat), Al-Sadr (Chest), Al-Asnan (Teeth), and Al-Lisan (Tongue)',
      'Al-Fam (Mouth), Al-Anf (Nose), Al-Udhun (Ear), Al-Hanjar (Larynx), and Al-Lisan (Tongue)',
      'Al-Madd (Elongation), Al-Ghunnah (Nasalization), Al-Hams (Whisper), Al-Jahr (Vocalness), and Al-Qalqalah (Echo)'
    ],
    correctAnswer: 0,
    explanation: 'The classical consensus established by Imam Al-Khalil and verified by Imam Ibn al-Jazari identifies 5 general articulation areas (المخارج العامة) containing 17 specific articulation points: 1) Al-Jawf (open interior cavity), 2) Al-Halq (throat), 3) Al-Lisan (tongue), 4) Ash-Shafatan (lips), and 5) Al-Khayshum (nasal passage).'
  },
  {
    id: 'makharij-q2',
    sectionId: 'makharij',
    sectionNumber: 1,
    sectionTitle: 'Makharij Mastery (مخارج الحروف)',
    question: 'The six throat letters are divided across three anatomical depths. Which letter pair articulates specifically from the middle of the throat (وسط الحلق)?',
    arabicPrompt: 'حروف وسط الحلق',
    options: [
      'Hamzah (ء) and Hā\' (هـ)',
      '\'Ayn (ع) and Ḥā\' (ح)',
      'Ghayn (غ) and Khā\' (خ)',
      'Qāf (ق) and Kāf (ك)'
    ],
    correctAnswer: 1,
    explanation: '\'Ayn (ع) and Ḥā\' (ح) articulate from the middle of the throat (Wasat Al-Halq) by constriction of the epiglottis. In contrast, Hamzah (ء) and Hā\' (هـ) originate from the deepest throat (Aqsa Al-Halq), while Ghayn (غ) and Khā\' (خ) originate from the closest/uppermost throat (Adna Al-Halq).'
  },
  {
    id: 'makharij-q3',
    sectionId: 'makharij',
    sectionNumber: 1,
    sectionTitle: 'Makharij Mastery (مخارج الحروف)',
    question: 'How does the articulation point of Ḍād (ض) anatomically differ from Ẓā\' (ظ)?',
    arabicPrompt: 'الفرق المخرجي الدقيق بين حرفي الضاد (ض) والظاء (ظ)',
    options: [
      'Ḍād articulates from one or both lateral edges of the tongue against the upper molars, whereas Ẓā\' articulates from the tip of the tongue contacting the edges of the upper two front incisors',
      'Both letters articulate identically from the tip of the tongue against the upper gum line',
      'Ḍād articulates from the back of the throat while Ẓā\' articulates from the lips',
      'Ḍād uses the center of the tongue against the hard palate while Ẓā\' uses the nasal cavity'
    ],
    correctAnswer: 0,
    explanation: 'Ḍād (ض) has one of the most distinctive articulation points in human phonetics: the lateral edge or edges of the tongue (حافة اللسان) pressing against the upper molars, accompanied by elongation (Istitalah). Ẓā\' (ظ) is one of the three gingival/tip letters (Al-Huruf Al-Lithaweeyah: ظ، ذ، ث), produced from the tongue tip touching the edges of the upper front incisors.'
  },
  {
    id: 'makharij-q4',
    sectionId: 'makharij',
    sectionNumber: 1,
    sectionTitle: 'Makharij Mastery (مخارج الحروف)',
    question: 'Which letter articulates by pressing the inner wet margin of the lower lip against the edges of the upper two front incisors?',
    arabicPrompt: 'مخرج بطن الشفة السفلى مع أطراف الثنايا العليا',
    options: [
      'Fā\' (ف)',
      'Bā\' (ب)',
      'Mīm (م)',
      'Wāw (و)'
    ],
    correctAnswer: 0,
    explanation: 'Fā\' (ف) articulates exclusively from the inner belly of the lower lip contacting the edges of the two upper central incisors (بطن الشفة السفلى مع أطراف الثنايا العليا). Bā\' and Mīm articulate by closing both lips together, while vowelized/unvowelized Wāw articulates by rounding both lips with a central opening.'
  },

  // SECTION 2: Noon Sakinah & Tanween (Questions 5 - 8)
  {
    id: 'noon-q5',
    sectionId: 'noon-sakinah',
    sectionNumber: 2,
    sectionTitle: 'Noon Sakinah & Tanween (أحكام النون الساكنة والتنوين)',
    question: 'In the phrases «مِنْ أَهْلِ» and «أَنْعَمْتَ», which rule of Noon Sakinah applies and how must the Noon be pronounced?',
    arabicPrompt: 'مِنْ أَهْلِ الْكِتَابِ — صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ',
    options: [
      'Izhar Halqi (إظهار حلقي) — pronounce the Noon clearly from its natural makhraj without any extended nasal ghunnah',
      'Idgham with Ghunnah — merge the Noon into the following letter with a 2-count delay',
      'Ikhfa Haqiqi — conceal the Noon in the nasal cavity with full mouth opening',
      'Iqlab — convert the Noon into a light Meem sound'
    ],
    correctAnswer: 0,
    explanation: 'When Noon Sakinah or Tanween is followed by one of the six throat letters (ء، هـ، ع، ح، غ، خ), it must be pronounced with Izhar Halqi (throat clarity): articulated clearly from the tongue tip and upper gums without any additional lengthening of the natural Ghunnah.'
  },
  {
    id: 'noon-q6',
    sectionId: 'noon-sakinah',
    sectionNumber: 2,
    sectionTitle: 'Noon Sakinah & Tanween (أحكام النون الساكنة والتنوين)',
    question: 'The six letters of Idgham are gathered in the mnemonic «يَرْمَلُونَ». Which two letters require complete merging WITHOUT Ghunnah (إدغام بغير غنة)?',
    arabicPrompt: 'حروف الإدغام بغير غنة',
    options: [
      'Lām (ل) and Rā\' (ر)',
      'Yā\' (ي) and Nūn (ن)',
      'Mīm (م) and Wāw (و)',
      'All six letters require Ghunnah'
    ],
    correctAnswer: 0,
    explanation: 'Idgham without Ghunnah occurs exclusively before Lām (ل) and Rā\' (ر) (e.g. «مِن لَّدُنْهُ», «مِن رَّبِّهِمْ»). In contrast, the remaining four letters grouped in «يَنْمُو» (Yā\', Nūn, Mīm, Wāw) require Idgham WITH a sustained 2-count Ghunnah.'
  },
  {
    id: 'noon-q7',
    sectionId: 'noon-sakinah',
    sectionNumber: 2,
    sectionTitle: 'Noon Sakinah & Tanween (أحكام النون الساكنة والتنوين)',
    question: 'When does Iqlab (الإقلاب) occur, and what are its three exact phonetic stages in recitation?',
    arabicPrompt: 'حكم الإقلاب وخطوات تطبيقه: مِن بَعْدِ — أَنبِئْهُم',
    options: [
      'When Noon Sakinah or Tanween is followed by Bā\' (ب); 1) convert the Noon into a Meem, 2) conceal the Meem, 3) sustain a 2-count Ghunnah without tight lip clamping',
      'When Noon Sakinah is followed by Mīm; merge completely with a 4-count pause',
      'When Tanween occurs at the end of an ayah; convert into an Alif',
      'When Meem Sakinah is followed by Bā\'; pronounce clearly with Izhar'
    ],
    correctAnswer: 0,
    explanation: 'Iqlab occurs when Noon Sakinah or Tanween is followed by the single letter Bā\' (ب). The three classical steps are: 1) Changing the Noon into an unwritten Meem (قلب النون ميماً), 2) Concealing the Meem by gently bringing the lips together without pressing firmly (إخفاء الميم), and 3) Pronouncing an audible 2-count nasal Ghunnah (غنة حركتين).'
  },
  {
    id: 'noon-q8',
    sectionId: 'noon-sakinah',
    sectionNumber: 2,
    sectionTitle: 'Noon Sakinah & Tanween (أحكام النون الساكنة والتنوين)',
    question: 'In Ikhfa Haqiqi (15 letters), what determines whether the 2-count Ghunnah is pronounced heavy (Mufakhkham) or light (Muraqqaq)?',
    arabicPrompt: 'تفخيم وترقيق غنة الإخفاء الحقيقي: مِن قَبْلُ vs مِن كِتَابٍ',
    options: [
      'The Ghunnah follows the heaviness of the following letter: heavy before the 5 heavy Ikhfa letters (ص، ض، ط، ظ، ق) and light before the other 10 letters',
      'The Ghunnah is always heavy regardless of the following letter',
      'The Ghunnah is always light regardless of the following letter',
      'The vowel on the letter preceding the Noon determines the heaviness'
    ],
    correctAnswer: 0,
    explanation: 'In Ikhfa Haqiqi, the tongue prepares at the exact point of articulation of the upcoming letter while the sound resonates in the nasal cavity. When followed by a heavy letter (ص ض ط ظ ق), the back of the tongue elevates, causing the Ghunnah to sound heavy (e.g. «مِن قَبْلُ», «مِن صَلْصَالٍ»). Before the 10 light letters, the tongue remains lowered, making the Ghunnah light (e.g. «مِن كِتَابٍ», «أَنتُمْ»).'
  },

  // SECTION 3: Meem Sakinah & Qalqalah (Questions 9 - 12)
  {
    id: 'meem-q9',
    sectionId: 'meem-qalqalah',
    sectionNumber: 3,
    sectionTitle: 'Meem Sakinah & Qalqalah (الميم الساكنة والقلقلة)',
    question: 'Meem Sakinah (مْ) has only three rules. What are they and how many Arabic letters belong to each rule?',
    arabicPrompt: 'أحكام الميم الساكنة الثلاثة وتوزيع الحروف عليها',
    options: [
      'Ikhfa Shafawi (1 letter: ب), Idgham Shafawi (1 letter: م), and Izhar Shafawi (remaining 26 letters)',
      'Izhar Halqi (6 letters), Idgham (6 letters), and Ikhfa (15 letters)',
      'Iqlab (1 letter), Qalqalah (5 letters), and Madd (3 letters)',
      'Tafkhim (7 letters), Tarqiq (20 letters), and Jawaz (1 letter)'
    ],
    correctAnswer: 0,
    explanation: 'Meem Sakinah has exactly 3 rules: 1) Ikhfa Shafawi when followed by Bā\' (ب) with a 2-count Ghunnah, 2) Idgham Shafawi / Idgham Mithlayn Saghir when followed by another Mīm (م) with a 2-count Ghunnah, and 3) Izhar Shafawi when followed by any of the remaining 26 letters.'
  },
  {
    id: 'meem-q10',
    sectionId: 'meem-qalqalah',
    sectionNumber: 3,
    sectionTitle: 'Meem Sakinah & Qalqalah (الميم الساكنة والقلقلة)',
    question: 'Imam Al-Jamzuri warns in Tuhfat al-Atfal to be especially vigilant NOT to accidentally conceal (Ikhfa) Meem Sakinah before which two letters?',
    arabicPrompt: 'واحذر لدى واو وفا أن تختفي / لقربها والاتحاد فاعرف',
    options: [
      'Wāw (و) and Fā\' (ف)',
      'Alif (ا) and Hamzah (ء)',
      'Qāf (ق) and Kāf (ك)',
      'Tā\' (ت) and Dāl (د)'
    ],
    correctAnswer: 0,
    explanation: 'Due to proximity in articulation with Fā\' (lower lip to upper teeth) and sharing the exact same lip origin with Wāw (both lips), reciters frequently fall into the mistake of slurring or concealing the Meem. Al-Jamzuri explicitly cautioned: "واحذر لدى واو وفا أن تختفي / لقربها والاتحاد فاعرف" (Beware of concealing Meem before Wāw and Fā\' due to proximity and sharing of articulation).'
  },
  {
    id: 'meem-q11',
    sectionId: 'meem-qalqalah',
    sectionNumber: 3,
    sectionTitle: 'Meem Sakinah & Qalqalah (الميم الساكنة والقلقلة)',
    question: 'What are the five letters of Qalqalah (قلقلة), what is their mnemonic phrase, and under what mandatory condition does Qalqalah occur?',
    arabicPrompt: 'حروف القلقلة وشرط حدوثها',
    options: [
      'Qāf, Ṭā\', Bā\', Jīm, Dāl (قُطْبُ جَدٍّ) — strictly when the letter carries a Sukoon (is Sakin)',
      'Yā\', Rā\', Mīm, Lām, Wāw, Nūn (يَرْمَلُونَ) — when vowelled with Fat-hah',
      'Khā\', Ṣād, Ḍād, Ghayn, Ṭā\', Qāf, Ẓā\' (خُصَّ ضَغْطٍ قِظْ) — when carrying a Shaddah',
      'Alif, Wāw, Yā\' (حروف المد) — when prolonged for 4 counts'
    ],
    correctAnswer: 0,
    explanation: 'The five Qalqalah letters are combined in the classical mnemonic «قُطْبُ جَدٍّ» (Qaf, Taa, Ba, Jeem, Dal). Qalqalah—the echoing, rebounding vibration produced by releasing built-up pressure—activates ONLY when one of these five letters is in a state of Sukoon (سكون), whether original in the word or temporary due to stopping.'
  },
  {
    id: 'meem-q12',
    sectionId: 'meem-qalqalah',
    sectionNumber: 3,
    sectionTitle: 'Meem Sakinah & Qalqalah (الميم الساكنة والقلقلة)',
    question: 'Which of the following ranks the three levels of Qalqalah from strongest acoustic resonance to lightest with correct Qur\'anic examples?',
    arabicPrompt: 'مراتب القلقلة الثلاث: الأكبر — الكبرى — الصغرى',
    options: [
      'Akbar (Stopping on a doubled/shaddah letter, e.g. «وَتَبَّ», «بِالْحَقِّ») > Kubra (Stopping on a single sakin letter, e.g. «الْفَلَقِ», «أَحَدٌ») > Sughra (Sakin in the middle of a word/verse, e.g. «خَلَقْنَا», «يَقْطَعُونَ»)',
      'Sughra (at the end) > Kubra (in the middle) > Akbar (at the beginning)',
      'All occurrences of Qalqalah have identical acoustic intensity and cannot be ranked',
      'Akbar (in Madd letters) > Kubra (in Tanween) > Sughra (in Noon Sakinah)'
    ],
    correctAnswer: 0,
    explanation: 'Classical Tajweed scholars categorize Qalqalah into three acoustic levels: 1) Akbar (Greatest): stopping on a doubled/mushaddad letter (holding the shaddah then releasing with maximum clarity, e.g. «وَتَبَّ»), 2) Kubra (Major): stopping on a single sakin letter at the end of a word (e.g. «مَا خَلَقْ»), and 3) Sughra (Minor): a light, brisk rebound on a sakin letter in the middle of a word or continuous speech (e.g. «يَجْعَلُونَ»).'
  },

  // SECTION 4: Madd Timing & Tafkhim/Tarqiq (Questions 13 - 16)
  {
    id: 'madd-q13',
    sectionId: 'madd-tafkhim',
    sectionNumber: 4,
    sectionTitle: 'Madd Timing & Tafkhim/Tarqiq (المدود والتفخيم والترقيق)',
    question: 'What is the structural difference and obligatory ruling between Madd Muttasil (المتصل) and Madd Munfasil (المنفصل)?',
    arabicPrompt: 'الفرق بين المد المتصل والمد المنفصل وحكم كل منهما',
    options: [
      'Muttasil: Madd letter and Hamzah are inside the SAME single word (e.g. «جَاءَ», «السَّمَاءِ») — Wajib (obligatory 4–5 counts). Munfasil: Madd letter is at the end of one word and Hamzah at the start of the next (e.g. «إِنَّا أَعْطَيْنَاكَ») — Ja\'iz (permissible 4–5 counts)',
      'Muttasil is 2 counts while Munfasil is 6 counts',
      'Muttasil occurs only due to Sukoon while Munfasil occurs only due to Hamzah',
      'Both occur only within the same word and both are strictly 2 counts'
    ],
    correctAnswer: 0,
    explanation: 'Madd Muttasil (Connected Elongation) occurs when the Madd letter and Hamzah are united in one single word; its elongation is Wajib (compulsory 4 or 5 counts in Hafs). Madd Munfasil (Separated Elongation) occurs across two separate words, making its elongation Ja\'iz (permissible 4 or 5 counts in Shatibiyyah, or 2 counts in Tayyibah).'
  },
  {
    id: 'madd-q14',
    sectionId: 'madd-tafkhim',
    sectionNumber: 4,
    sectionTitle: 'Madd Timing & Tafkhim/Tarqiq (المدود والتفخيم والترقيق)',
    question: 'In words like «الضَّالِّينَ» and «الْحَاقَّةُ», what type of Madd occurs and what is its exact mandatory duration?',
    arabicPrompt: 'نوع ومقدار المد في «وَلَا الضَّالِّينَ» و«الْحَاقَّةُ»',
    options: [
      'Madd Lazim (المد اللازم) — Compulsory 6 counts (حركات 6) due to an original permanent Sukoon / Shaddah following the Madd letter',
      'Madd Asli (المد الأصلي) — 2 counts',
      'Madd Munfasil (المد المنفصل) — 4 counts',
      'Madd Aridh li-Sukun (المد العارض للسكون) — Optional 2, 4, or 6 counts'
    ],
    correctAnswer: 0,
    explanation: 'Madd Lazim (Compulsory Elongation) occurs when a Madd letter is followed by an original, permanent Sukoon (here incorporated into a doubled/mushaddad letter: Lām in «الضَّالِّينَ» and Qāf in «الْحَاقَّةُ»). All recitation imams unanimously mandate holding it for the full duration of 6 counts (6 Harakat).'
  },
  {
    id: 'madd-q15',
    sectionId: 'madd-tafkhim',
    sectionNumber: 4,
    sectionTitle: 'Madd Timing & Tafkhim/Tarqiq (المدود والتفخيم والترقيق)',
    question: 'Which seven Arabic letters are permanently heavy (Tafkhim / Isti\'la) under all vowel conditions, elevating the back of the tongue toward the palate?',
    arabicPrompt: 'حروف الاستعلاء والتفخيم الدائم السبعة',
    options: [
      'Khā\', Ṣād, Ḍād, Ghayn, Ṭā\', Qāf, Ẓā\' — grouped in «خُصَّ ضَغْطٍ قِظْ»',
      'Qāf, Ṭā\', Bā\', Jīm, Dāl — grouped in «قُطْبُ جَدٍّ»',
      'Yā\', Rā\', Mīm, Lām, Wāw, Nūn — grouped in «يَرْمَلُونَ»',
      'Hamzah, Hā\', \'Ayn, Ḥā\', Ghayn, Khā\' — the six throat letters'
    ],
    correctAnswer: 0,
    explanation: 'The seven letters of «خُصَّ ضَغْطٍ قِظْ» (Kha, Saad, Daad, Ghayn, Taa, Qaf, Zhaa) possess the intrinsic quality of Isti\'la (elevation of the posterior tongue). They are pronounced heavy (Mufakhkham) in all positions and with all vowels, with the four Itbaq letters (ط، ض، ص، ظ) exhibiting the strongest heaviness.'
  },
  {
    id: 'madd-q16',
    sectionId: 'madd-tafkhim',
    sectionNumber: 4,
    sectionTitle: 'Madd Timing & Tafkhim/Tarqiq (المدود والتفخيم والترقيق)',
    question: 'When is the letter Lām (ل) pronounced heavy (Mufakhkham) in the Majestic Name of Allah («اللَّه» / «اللَّهُمَّ»)?',
    arabicPrompt: 'حكم لام لفظ الجلالة (اللَّه) تفخيماً وترقيقاً',
    options: [
      'When the letter preceding the Name of Allah carries a Fat-hah (َ) or Ḍammah (ُ) (e.g. «قَالَ اللَّهُ», «نَصْرُ اللَّهِ»); it is light only when preceded by a Kasrah (ِ) (e.g. «بِسْمِ اللَّهِ»)',
      'The Lām of Allah is always pronounced light in every Quranic context',
      'The Lām is heavy only when preceded by a Kasrah',
      'The Lām is heavy only when followed by another heavy letter'
    ],
    correctAnswer: 0,
    explanation: 'The Lām in Lafz Al-Jalalah (لفظ الجلالة: اللَّه / اللَّهُمَّ) is uniquely characterized by conditional heaviness: if preceded by a Fat-hah (َ) or Ḍammah (ُ), it is pronounced heavy (Tafkhim). If preceded by an original or temporary Kasrah (ِ), it must be pronounced light (Tarqiq, as in «بِسْمِ اللَّهِ»).'
  },

  // SECTION 5: Complete Tajweed Knowledge (Questions 17 - 20)
  {
    id: 'complete-q17',
    sectionId: 'complete-knowledge',
    sectionNumber: 5,
    sectionTitle: 'Complete Tajweed Knowledge (صفات الحروف والوقف والابتداء)',
    question: 'The characteristic of Hams (الهَمْس) involves the continuation of breath during letter pronunciation due to weak reliance on the makhraj. What are its 10 letters?',
    arabicPrompt: 'حروف صفة الهمس العشرة في بيت ابن الجزري',
    options: [
      '«فَحَثَّهُ شَخْصٌ سَكَتَ» (Fā\', Ḥā\', Thā\', Hā\', Shīn, Khā\', Ṣād, Sīn, Kāf, Tā\')',
      '«أَجِدْ قَطٍ بَكَتْ»',
      '«لِنْ عُمَر»',
      '«خُصَّ ضَغْطٍ قِظْ»'
    ],
    correctAnswer: 0,
    explanation: 'The 10 letters of Hams (whisper/continuation of airflow) are combined in Imam Ibn al-Jazari\'s famous mnemonic: «فَحَثَّهُ شَخْصٌ سَكَتَ». All remaining 18 Arabic letters possess the opposing characteristic of Jahr (الجهر - trapping and cessation of breath).'
  },
  {
    id: 'complete-q18',
    sectionId: 'complete-knowledge',
    sectionNumber: 5,
    sectionTitle: 'Complete Tajweed Knowledge (صفات الحروف والوقف والابتداء)',
    question: 'Which letters possess the whistling quality (الصفير) and which letter is uniquely characterized by continuous extension along its edge (الاستطالة)?',
    arabicPrompt: 'صفتا الصفير والاستطالة',
    options: [
      'Safir (Whistle) belongs to (Ṣād ص, Zāy ز, Sīn س); Istitalah (Elongation) belongs exclusively to Ḍād (ض)',
      'Safir belongs to (Qāf, Kāf); Istitalah belongs to (Lām, Rā\')',
      'Safir belongs to (Thā\', Dhāl, Ẓā\'); Istitalah belongs to (Shīn)',
      'Safir belongs to (Mīm, Nūn); Istitalah belongs to (Wāw, Yā\')'
    ],
    correctAnswer: 0,
    explanation: 'As-Safir (الصفير - a sharp whistling acoustic tone resembling a bird) is an intrinsic attribute of Ṣād (ص), Zāy (ز), and Sīn (س). Al-Istitalah (الاستطالة - the gradual forward extension of sound and tongue contact from the molar edge to the premolar) belongs solely to the letter Ḍād (ض).'
  },
  {
    id: 'complete-q19',
    sectionId: 'complete-knowledge',
    sectionNumber: 5,
    sectionTitle: 'Complete Tajweed Knowledge (صفات الحروف والوقف والابتداء)',
    question: 'In standard Qur\'anic printings (Mushaf), what do the stopping symbols (مـ) and (لا) indicate to the reciter?',
    arabicPrompt: 'علامات الوقف في المصحف الشريف: علامتا (مـ) و(لا)',
    options: [
      '(مـ) denotes a Compulsory/Mandatory Stop (وقف لازم) to avoid distorting theological meaning; (لا) denotes a Prohibited Stop (لا تقف) where stopping breaks the sentence structure',
      '(مـ) denotes an optional pause; (لا) denotes repeating the entire surah',
      '(مـ) denotes Meem Sakinah; (لا) denotes reciting without any breath',
      '(مـ) denotes 6 counts elongation; (لا) denotes zero counts elongation'
    ],
    correctAnswer: 0,
    explanation: 'The small horizontal meem (مـ) signifies Waqf Lazim (Mandatory Stop), where continuing would connect two unrelated sentences and corrupt the meaning (e.g. Surah Yasin 36:76). The sign (لا) signifies Waqf Mamnu\' (Prohibited Stop), because stopping leaves the grammatical clause incomplete and potentially misleading.'
  },
  {
    id: 'complete-q20',
    sectionId: 'complete-knowledge',
    sectionNumber: 5,
    sectionTitle: 'Complete Tajweed Knowledge (صفات الحروف والوقف والابتداء)',
    question: 'When pausing or stopping on a word ending with Tā\' Marbūṭah (ة / ـة), such as «الْقَارِعَةُ» or «رَحْمَةً», how must it be vocalized?',
    arabicPrompt: 'حكم الوقف على التاء المربوطة (ة): الْقَارِعَةُ — رَحْمَةً',
    options: [
      'It converts completely into a pure Hā\' Sakinah (هْ) with gentle Hams breath',
      'It is pronounced as a clear Tā\' Sakinah (تْ)',
      'It is pronounced with a 2-count Tanween sound',
      'It is dropped silently without any audible sound'
    ],
    correctAnswer: 0,
    explanation: 'In Qur\'anic recitation and Arabic phonology, stopping on Tā\' Marbūṭah (ة) requires transforming it into a voiceless Hā\' Sakinah (هْ) with gentle breath continuation (Hams). This distinguishes it from open Tā\' Mabsūṭah (ت), which remains a clear Tā\' Sakinah with an explosive whisper upon pause.'
  },

  // SECTION 6: Practical Recitation Assessment (Questions 21 - 24)
  {
    id: 'recitation-q21',
    sectionId: 'recitation',
    sectionNumber: 6,
    sectionTitle: 'Practical Recitation Assessment (التطبيق العملي في الآيات القرآنية)',
    question: 'In the verses «قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ», what Tajweed rules apply to the Lām of «اللَّهُ» and the final Dāl of «أَحَدٌ» when pausing?',
    arabicPrompt: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ',
    options: [
      'Tafkhim (heaviness) of the Lām due to the preceding Fat-hah on «هُوَ», and Qalqalah Kubra on the Dāl when pausing on «أَحَدْ»',
      'Tarqiq (lightness) of the Lām and no Qalqalah on the Dāl',
      'Idgham of Noon and Madd Lazim on the Name of Allah',
      'Ikhfa Shafawi on Huwa and Iqlab on Ahad'
    ],
    correctAnswer: 0,
    explanation: 'In «هُوَ اللَّهُ», the word «هُوَ» ends with a Fat-hah (وَ), requiring the Lām of Allah to be pronounced with heaviness (Tafkhim). When stopping at the verse boundary on «أَحَدٌ», the tanween drops and the Dāl becomes sakin, triggering Qalqalah Kubra (Major Echo) at the verse end.'
  },
  {
    id: 'recitation-q22',
    sectionId: 'recitation',
    sectionNumber: 6,
    sectionTitle: 'Practical Recitation Assessment (التطبيق العملي في الآيات القرآنية)',
    question: 'In the verse «مِن شَرِّ مَا خَلَقَ», identify the two prominent Tajweed rules applied on «مِن شَرِّ» and «خَلَقَ» (upon pause):',
    arabicPrompt: 'مِن شَرِّ مَا خَلَقَ — سورة الفلق',
    options: [
      'Ikhfa Haqiqi with light Ghunnah on «مِن شَرِّ» (Noon before Shīn), and Qalqalah Kubra with Tafkhim of Qāf on «خَلَقْ» upon stopping',
      'Izhar Halqi on «مِن شَرِّ» and Madd Muttasil on «خَلَقَ»',
      'Idgham without Ghunnah on «مِن شَرِّ» and Iqlab on «خَلَقَ»',
      'Meem Sakinah Izhar on «مِن شَرِّ» and Tarqiq of Qāf on «خَلَقَ»'
    ],
    correctAnswer: 0,
    explanation: 'In «مِن شَرِّ», Noon Sakinah is followed by Shīn (ش), one of the 15 Ikhfa letters; since Shīn is a light letter, the 2-count Ghunnah is Muraqqaq (light). In «خَلَقَ», pausing renders the final Qāf (ق) sakin, activating Qalqalah Kubra with full posterior tongue elevation (Tafkhim).'
  },
  {
    id: 'recitation-q23',
    sectionId: 'recitation',
    sectionNumber: 6,
    sectionTitle: 'Practical Recitation Assessment (التطبيق العملي في الآيات القرآنية)',
    question: 'In the verse «تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ», which rules apply sequentially to «يَدَا أَبِي», «لَهَبٍ وَ», and the final «وَتَبَّ» upon pause?',
    arabicPrompt: 'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ — سورة المسد',
    options: [
      'Madd Munfasil (4–5 counts) on «يَدَا أَبِي», Idgham with Ghunnah on «لَهَبٍ وَ», and Qalqalah Akbar (highest level on doubled Bā\') on «وَتَبَّ»',
      'Madd Muttasil, Izhar Halqi, and Qalqalah Sughra',
      'Madd Asli, Iqlab, and Madd Lazim',
      'Madd Aridh, Idgham without Ghunnah, and Ikhfa Shafawi'
    ],
    correctAnswer: 0,
    explanation: '«يَدَا أَبِي» features Madd Munfasil (Alif at the end of «يَدَا» and Hamzah starting «أَبِي»). «لَهَبٍ وَ» applies Idgham with a 2-count Ghunnah (Tanween followed by Wāw). Pausing on «وَتَبَّ» stops on a doubled/mushaddad Bā\', representing Qalqalah Akbar—the highest intensity of echoing articulation.'
  },
  {
    id: 'recitation-q24',
    sectionId: 'recitation',
    sectionNumber: 6,
    sectionTitle: 'Practical Recitation Assessment (التطبيق العملي في الآيات القرآنية)',
    question: 'In the verse «الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ», which comprehensive sequence of rules appears sequentially?',
    arabicPrompt: 'الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ — سورة قريش',
    options: [
      'Madd Munfasil («الَّذِي أَ»), Qalqalah Sughra («أَطْ»), Idgham Shafawi («ـهُم مِّن»), Ikhfa Haqiqi («مِّن جُوعٍ»), Idgham with Ghunnah («جُوعٍ وَ»), Madd Badal («وَآمَنَهُم»), Idgham Shafawi («ـهُم مِّنْ»), Izhar Halqi («مِّنْ خَوْفٍ»), and Madd Leen upon pause («خَوْفْ»)',
      'Only Izhar Halqi applied repeatedly across every single word',
      'Only Qalqalah and Madd Lazim with no nasal Ghunnah rules',
      'No Tajweed rules apply to short surahs like Surah Quraysh'
    ],
    correctAnswer: 0,
    explanation: 'This magnificent ayah synthesizes virtually all foundational rules taught across the course: Madd Munfasil («الَّذِي أَ»), Qalqalah Sughra on Ṭā\' («أَطْ»), Meem Sakinah Idgham Shafawi («ـهُم مِّن»), Noon Sakinah Ikhfa before Jīm («مِّن جُوعٍ»), Tanween Idgham with Ghunnah before Wāw («جُوعٍ وَ»), Madd Badal («آمَنَهُم»), second Idgham Shafawi, Noon Sakinah Izhar Halqi before throat letter Khā\' («مِّنْ خَوْفٍ»), and Madd Leen when pausing on «خَوْفْ» (2, 4, or 6 counts).'
  }
];

export const PASSING_PERCENTAGE = 80;
export const TOTAL_QUESTIONS = EXAM_QUESTIONS.length; // 24
export const PASSING_MINIMUM_CORRECT = Math.ceil((PASSING_PERCENTAGE / 100) * TOTAL_QUESTIONS); // 20

/**
 * Calculates score, percentage, pass/fail status, and section-by-section breakdown.
 * @param {Object} submittedAnswers - Map of { [questionId or questionIndex]: selectedOptionIndex }
 * @returns {Object} detailed score results
 */
export function gradeExam(submittedAnswers) {
  let score = 0;
  const sectionBreakdown = {};

  EXAM_SECTIONS.forEach(sec => {
    sectionBreakdown[sec.id] = {
      sectionId: sec.id,
      number: sec.number,
      title: sec.title,
      arabicTitle: sec.arabicTitle,
      total: sec.questionIndices.length,
      correct: 0,
      percentage: 0
    };
  });

  const questionResults = EXAM_QUESTIONS.map((q, idx) => {
    const submitted = submittedAnswers[q.id] !== undefined 
      ? submittedAnswers[q.id] 
      : submittedAnswers[idx];

    const isAnswered = submitted !== undefined && submitted !== null;
    const isCorrect = isAnswered && parseInt(submitted, 10) === parseInt(q.correctAnswer, 10);

    if (isCorrect) {
      score += 1;
      if (sectionBreakdown[q.sectionId]) {
        sectionBreakdown[q.sectionId].correct += 1;
      }
    }

    return {
      index: idx,
      id: q.id,
      sectionId: q.sectionId,
      sectionTitle: q.sectionTitle,
      question: q.question,
      arabicPrompt: q.arabicPrompt,
      options: q.options,
      correctAnswer: q.correctAnswer,
      submittedAnswer: isAnswered ? parseInt(submitted, 10) : null,
      isCorrect,
      explanation: q.explanation
    };
  });

  Object.values(sectionBreakdown).forEach(sec => {
    sec.percentage = Math.round((sec.correct / sec.total) * 100);
  });

  const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);
  const passed = percentage >= PASSING_PERCENTAGE;

  return {
    score,
    total: TOTAL_QUESTIONS,
    percentage,
    passed,
    passingThreshold: PASSING_PERCENTAGE,
    passingMinimumCorrect: PASSING_MINIMUM_CORRECT,
    sectionBreakdown,
    questionResults
  };
}

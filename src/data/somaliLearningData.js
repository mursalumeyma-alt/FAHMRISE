// FAHMRISE — Somali Learning Curriculum & Reference Data
// Comprehensive educational data for Af-Soomaali language learners across 7 distinct categories.

export const SOMALI_LEARNING_CATEGORIES = [
  { id: 'all', name: 'All Categories', somaliName: 'Dhammaan Qaybaha', icon: 'Sparkles', count: 24 },
  { id: 'beginner', name: 'Beginner Somali', somaliName: 'Soomaali Bilow ah', icon: 'Compass', count: 4 },
  { id: 'vocabulary', name: 'Vocabulary', somaliName: 'Eraybixin & Erayo Cusub', icon: 'BookOpen', count: 5 },
  { id: 'speaking', name: 'Speaking & Conversation', somaliName: 'Wadahadal & Hadal-wadag', icon: 'MessageSquare', count: 4 },
  { id: 'grammar', name: 'Grammar', somaliName: 'Naxwaha Af-Soomaaliga', icon: 'Layers', count: 4 },
  { id: 'reading-writing', name: 'Reading & Writing', somaliName: 'Akhriska & Qoraalka', icon: 'FileText', count: 3 },
  { id: 'listening-pronunciation', name: 'Listening & Pronunciation', somaliName: 'Dhageysiga & Dhawaaqa', icon: 'Volume2', count: 2 },
  { id: 'quizzes-practice', name: 'Quizzes & Practice', somaliName: 'Kedis & Layliyo', icon: 'Award', count: 2 }
];

export const SOMALI_LEARNING_LESSONS = [
  // =========================================================================
  // 1. BEGINNER SOMALI (4 lessons)
  // =========================================================================
  {
    id: 'so-beg-1',
    categoryId: 'beginner',
    categoryName: 'Beginner Somali',
    categorySomali: 'Soomaali Bilow ah',
    title: 'Somali Greetings & Polite Expressions',
    somaliTitle: 'Barashada Salaanta & Hadallada Asluubta Leh',
    level: 'Beginner (A1)',
    duration: '15 min',
    summary: 'Master standard greetings, respectful responses, and time-of-day greetings in everyday Af-Soomaali.',
    tags: ['Greetings', 'Salaan', 'Basics', 'Daily Expressions'],
    content: {
      introduction: 'In Somali culture, greetings are warm and respectful. A conversation always begins with an inquiry into well-being before discussing any business or topic.',
      items: [
        { somali: 'Iska warran?', phonetic: '/is.kæ wær.ræn/', english: 'How are you? / What is your news?', notes: 'Most common informal greeting across all Somali regions.' },
        { somali: 'Fiican / Aad baan u fiicanahay', phonetic: '/fiː.ʕæn / æːd bɑːn u fiː.ʕæ.næ.hæj/', english: 'Fine / I am very well', notes: 'Standard positive response.' },
        { somali: 'Nabad miyaa?', phonetic: '/næ.bæd mi.jæː/', english: 'Is it peace? (How are things?)', notes: 'Traditional peace-based greeting.' },
        { somali: 'Waa nabad', phonetic: '/wæː næ.bæd/', english: 'It is peace (Everything is well)', notes: 'Appropriate response to "Nabad miyaa?".' },
        { somali: 'Subax wanaagsan', phonetic: '/su.bæħ wæ.næːɡ.sæn/', english: 'Good morning', notes: 'Used from sunrise until noon.' },
        { somali: 'Galab wanaagsan', phonetic: '/ɡæ.læb wæ.næːɡ.sæn/', english: 'Good afternoon', notes: 'Used from midday to dusk.' },
        { somali: 'Habeen wanaagsan', phonetic: '/ħæ.beːn wæ.næːɡ.sæn/', english: 'Good evening / Good night', notes: 'Used after sunset and when parting at night.' },
        { somali: 'Mahadsanid / Aad baad u mahadsantahay', phonetic: '/mæ.ħæd.sæ.nid/', english: 'Thank you / Thank you very much', notes: 'Expresses sincere gratitude.' },
        { somali: 'Adaa mudan', phonetic: '/æ.dæː mu.dæn/', english: "You are welcome / You deserve it", notes: 'Polite response to thank you.' },
        { somali: 'Nabadgelyo', phonetic: '/næ.bæd.ɡɛl.jɔ/', english: 'Goodbye / Go in peace', notes: 'Standard farewell.' }
      ],
      keyTakeaway: 'Always remember: Somali greetings emphasize peace (Nabad) and mutual respect (Gobanimo).'
    }
  },
  {
    id: 'so-beg-2',
    categoryId: 'beginner',
    categoryName: 'Beginner Somali',
    categorySomali: 'Soomaali Bilow ah',
    title: 'Self-Introductions & Personal Background',
    somaliTitle: 'Isku Barashada & Sheegista Magaca',
    level: 'Beginner (A1)',
    duration: '20 min',
    summary: 'Learn how to state your name, origin, occupation, and residence in authentic Somali phrases.',
    tags: ['Introductions', 'Isbarasho', 'Identity', 'A1'],
    content: {
      introduction: 'Introducing yourself clearly helps create meaningful connections when interacting with Somali speakers worldwide.',
      items: [
        { somali: 'Magacaygu waa Axmed', phonetic: '/mæ.ɡæ.ʕæj.ɡu wæː æħ.mɛd/', english: 'My name is Ahmed', notes: 'Template: Magacaygu waa [Name].' },
        { somali: 'Magacaa? / Magacaa la yiraahdaa?', phonetic: '/mæ.ɡæ.ʕæː / mæ.ɡæ.ʕæː læ ji.ræːħ.dæː/', english: 'What is your name? / What are you called?', notes: 'Direct and friendly question.' },
        { somali: 'Waxaan ka imid Soomaaliya / Kenya', phonetic: '/wæ.ħæːn kæ i.mid soː.mɑː.li.jæ/', english: 'I come from Somalia / Kenya', notes: 'Template: Waxaan ka imid [Place].' },
        { somali: 'Waxaan ku noolahay Nairobi / Muqdisho', phonetic: '/wæ.ħæːn ku noː.læ.hæj nɑj.roː.bi/', english: 'I live in Nairobi / Mogadishu', notes: 'Expresses current residence.' },
        { somali: 'Waxaan ahay arday / macallin', phonetic: '/wæ.ħæːn æ.hæj ær.dæj / mæ.ʕæl.lin/', english: 'I am a student / teacher', notes: 'Stating occupation.' },
        { somali: 'Waan ku faraxsanahay barashadaada', phonetic: '/wæːn ku fæ.ræħ.sæ.næ.hæj bæ.ræ.ʃæ.dæː.dæ/', english: 'Pleased to meet you / Delighted to make your acquaintance', notes: 'Warm closing remark after introduction.' }
      ],
      dialogue: [
        { speaker: 'Hodan', text: 'Asc walaal, magacaygu waa Hodan. Magacaa?', translation: 'Peace be upon you sibling, my name is Hodan. What is your name?' },
        { speaker: 'Khaalid', text: 'Wcs Hodan, magacaygu waa Khaalid. Waan ku faraxsanahay barashadaada.', translation: 'Peace upon you Hodan, my name is Khalid. Pleased to meet you.' },
        { speaker: 'Hodan', text: 'Xaggee baad ka timid?', translation: 'Where do you come from?' },
        { speaker: 'Khaalid', text: 'Waxaan ka imid Hargeysa, laakiin waxaan ku noolahay Muqdisho.', translation: 'I come from Hargeisa, but I live in Mogadishu.' }
      ]
    }
  },
  {
    id: 'so-beg-3',
    categoryId: 'beginner',
    categoryName: 'Beginner Somali',
    categorySomali: 'Soomaali Bilow ah',
    title: 'Everyday Words & Core Expressions',
    somaliTitle: 'Erayada Maalinlaha ah & Hadallada Muhiimka ah',
    level: 'Beginner (A1)',
    duration: '15 min',
    summary: 'Essential affirmations, negations, polite requests, and conversational connectors in daily life.',
    tags: ['Everyday Words', 'Erayo', 'Vocabulary', 'Core'],
    content: {
      introduction: 'These small daily words form the connective tissue of everyday spoken Somali.',
      items: [
        { somali: 'Haa', phonetic: '/hæː/', english: 'Yes', notes: 'Affirmative response.' },
        { somali: 'Maya', phonetic: '/mæ.jæ/', english: 'No', notes: 'Negative response.' },
        { somali: 'Fadlan', phonetic: '/fæd.læn/', english: 'Please', notes: 'Polite request marker.' },
        { somali: 'Waa hagaag', phonetic: '/wæː hæ.ɡæːɡ/', english: 'Alright / OK / Very well', notes: 'Agreement marker.' },
        { somali: 'Waan ka xumahay / Iga raalli ahow', phonetic: '/wæːn kæ ħu.mæ.hæj / i.ɡæ ræːl.li æ.hɔw/', english: 'I am sorry / Excuse me', notes: 'Polite apology or seeking attention.' },
        { somali: 'Waan fahmay', phonetic: '/wæːn fæh.mæj/', english: 'I understood', notes: 'Affirming comprehension.' },
        { somali: 'Ma fahmin / Fadlan ku celi', phonetic: '/mæ fæh.min / fæd.læn ku ʕɛ.li/', english: 'I did not understand / Please repeat', notes: 'Requesting repetition.' },
        { somali: 'Wax dhib ah ma leh', phonetic: '/wæħ ðib æh mæ lɛh/', english: 'No problem / It is no trouble', notes: 'Reassuring expression.' }
      ]
    }
  },
  {
    id: 'so-beg-4',
    categoryId: 'beginner',
    categoryName: 'Beginner Somali',
    categorySomali: 'Soomaali Bilow ah',
    title: 'Simple Sentence Construction',
    somaliTitle: 'Dhisidda Weeraha Fudud',
    level: 'Beginner (A1)',
    duration: '20 min',
    summary: 'Learn how demonstratives (Kani/Tani) and declarative particles (Waa) create basic Somali sentences.',
    tags: ['Sentences', 'Weero', 'Beginner', 'Structure'],
    content: {
      introduction: 'Somali uses the declarative marker "Waa" to link subjects with predicates and identify items clearly.',
      items: [
        { somali: 'Kani waa buug', phonetic: '/kæ.ni wæː buːɡ/', english: 'This (masc.) is a book', notes: 'Kani is used for masculine singular nouns.' },
        { somali: 'Tani waa qalin', phonetic: '/tæ.ni wæː qæ.lin/', english: 'This (fem.) is a pen', notes: 'Tani is used for feminine singular nouns.' },
        { somali: 'Kani waa gurigayga', phonetic: '/kæ.ni wæː ɡu.ri.ɡæj.ɡæ/', english: 'This is my house', notes: 'Gurigayga = Guri (house) + -gayga (my masc.).' },
        { somali: 'Cuntadu waa macaan', phonetic: '/ʕun.tæ.du wæː mæ.ʕæːn/', english: 'The food is delicious', notes: 'Cunto (food) + -du (the fem.) + waa (is) + macaan (sweet/delicious).' },
        { somali: 'Maanta waa maalin wanaagsan', phonetic: '/mæːn.tæ wæː mæː.lin wæ.næːɡ.sæn/', english: 'Today is a good day', notes: 'Expresses a positive daily reflection.' }
      ]
    }
  },

  // =========================================================================
  // 2. VOCABULARY (5 lessons)
  // =========================================================================
  {
    id: 'so-voc-1',
    categoryId: 'vocabulary',
    categoryName: 'Vocabulary',
    categorySomali: 'Eraybixin & Erayo Cusub',
    title: 'Family & Kinship Terms',
    somaliTitle: 'Qoyska, Qaraabada & Xiriirka Qoyska',
    level: 'Beginner (A1-A2)',
    duration: '25 min',
    summary: 'Learn the rich vocabulary used to address parents, siblings, extended family, and maternal/paternal relatives.',
    tags: ['Family', 'Qoys', 'Kinship', 'Vocabulary'],
    content: {
      introduction: 'Kinship is deeply cherished in Somali culture. Notice how maternal and paternal aunts and uncles have specific dedicated words.',
      tableHeaders: ['Somali Word', 'Phonetic', 'English Meaning', 'Example Usage'],
      tableData: [
        { word: 'Aabbe', phonetic: '/æːb.bɛ/', english: 'Father', example: 'Aabbahay waa qof naxariis badan (My father is a kind person).' },
        { word: 'Hooyo', phonetic: '/hoː.jɔ/', english: 'Mother', example: 'Hooyaday waxay joogtaa guriga (My mother is at home).' },
        { word: 'Walaal', phonetic: '/wæ.lɑːl/', english: 'Brother / Sister / Sibling', example: 'Walaal ii dhiib buugga (Brother/Sister, pass me the book).' },
        { word: 'Walaal lab', phonetic: '/wæ.lɑːl læb/', english: 'Brother (specifically male)', example: 'Waxaan leeyahay laba walaalo lab ah (I have two brothers).' },
        { word: 'Walaal dheddig', phonetic: '/wæ.lɑːl ðɛd.diɡ/', english: 'Sister (specifically female)', example: 'Walaashay waxay dhigataa jaamacadda (My sister studies at university).' },
        { word: 'Wiil', phonetic: '/wiːl/', english: 'Boy / Son', example: 'Wiilku wuxuu akhrinayaa qoraal (The boy is reading a text).' },
        { word: 'Gabadh / Gabar', phonetic: '/ɡæ.bæð / ɡæ.bær/', english: 'Girl / Daughter', example: 'Gabadhu waa ardayad fiican (The girl is a good student).' },
        { word: 'Awoowe', phonetic: '/æ.woː.wɛ/', english: 'Grandfather', example: 'Awoowahay wuxuu nooga sheekeeyay taariikh (My grandfather told us history).' },
        { word: 'Ayeeyo', phonetic: '/æ.jeː.jɔ/', english: 'Grandmother', example: 'Ayeeyaday waxay samaysay shaah macaan (My grandmother made delicious tea).' },
        { word: 'Adeer', phonetic: '/æ.deːr/', english: 'Paternal Uncle (father\'s brother)', example: 'Adeerkay wuxuu degan yahay Muqdisho (My paternal uncle lives in Mogadishu).' },
        { word: 'Eedo', phonetic: '/eː.dɔ/', english: 'Paternal Aunt (father\'s sister)', example: 'Eedaday waxay noo keentay hadiyad (My paternal aunt brought us a gift).' },
        { word: 'Abti', phonetic: '/æb.ti/', english: 'Maternal Uncle (mother\'s brother)', example: 'Abtigay waa ganacsade (My maternal uncle is a merchant).' },
        { word: 'Habaryar', phonetic: '/ħæ.bær.jær/', english: 'Maternal Aunt (mother\'s sister)', example: 'Habaryartay waa dhakhtarad (My maternal aunt is a doctor).' }
      ]
    }
  },
  {
    id: 'so-voc-2',
    categoryId: 'vocabulary',
    categoryName: 'Vocabulary',
    categorySomali: 'Eraybixin & Erayo Cusub',
    title: 'Food, Drinks & Somali Cuisine',
    somaliTitle: 'Cuntada, Cabitaanka & Cuntooyinka Soomaalida',
    level: 'Beginner (A1-A2)',
    duration: '20 min',
    summary: 'Discover vocabulary for staple Somali dishes, meats, spiced teas, tropical fruits, and dining etiquette.',
    tags: ['Food', 'Cunto', 'Drinks', 'Cuisine'],
    content: {
      introduction: 'Somali cuisine is a vibrant fusion of East African, Arab, and Italian influences, characterized by fragrant spices like cardamom and cloves.',
      tableHeaders: ['Somali Term', 'Phonetic', 'English Meaning', 'Cultural Context'],
      tableData: [
        { word: 'Bariis', phonetic: '/bæ.riːs/', english: 'Rice', example: 'Bariis iyo hilib geel waa cunto caan ah (Rice and camel meat is a famous meal).' },
        { word: 'Baasto', phonetic: '/bæːs.tɔ/', english: 'Pasta / Spaghetti', example: 'Baasto suugo leh (Pasta with rich spiced tomato sauce).' },
        { word: 'Canjeero / Laxoox', phonetic: '/ʕæn.dʒeː.rɔ / læ.ħoːħ/', english: 'Somali flatbread / sourdough crepe', example: 'Canjeero iyo beer subaxdii (Canjeero and liver in the morning).' },
        { word: 'Hilib geel', phonetic: '/ħi.lib ɡeːl/', english: 'Camel meat', example: 'Hilibka geelu aad buu u nafaqo badan yahay (Camel meat is very nutritious).' },
        { word: 'Hilib ari', phonetic: '/ħi.lib æ.ri/', english: 'Goat / Mutton meat', example: 'Hilib ari oo duban (Roast goat meat).' },
        { word: 'Kalluun', phonetic: '/kæl.luːn/', english: 'Fish / Seafood', example: 'Kalluun cusub oo laga keenay xeebta (Fresh fish brought from the coast).' },
        { word: 'Shaah caano leh', phonetic: '/ʃæːħ ʕæː.nɔ lɛh/', english: 'Spiced milk tea (Cardamom & Cloves)', example: 'Shaah caraf badan oo sanjabiil leh (Fragrant spiced tea with ginger).' },
        { word: 'Caano geel', phonetic: '/ʕæː.nɔ ɡeːl/', english: 'Camel milk', example: 'Caano geel oo cusub (Fresh camel milk).' },
        { word: 'Muus', phonetic: '/muːs/', english: 'Banana (eaten with main dishes)', example: 'Bariis iyo muus (Rice eaten traditionally with a fresh banana).' },
        { word: 'Cambe', phonetic: '/ʕæm.bɛ/', english: 'Mango', example: 'Casiir cambe oo qabow (Cold mango juice).' }
      ]
    }
  },
  {
    id: 'so-voc-3',
    categoryId: 'vocabulary',
    categoryName: 'Vocabulary',
    categorySomali: 'Eraybixin & Erayo Cusub',
    title: 'School, Education & Classroom Objects',
    somaliTitle: 'Dugsiga, Waxbarashada & Qalabka Fasalka',
    level: 'Beginner (A1-A2)',
    duration: '20 min',
    summary: 'Essential terminology for students, teachers, study materials, subjects, and academic environments.',
    tags: ['School', 'Dugsi', 'Education', 'Classroom'],
    content: {
      introduction: 'Education (Waxbarasho) and knowledge (Aqoon) are central themes in Somali poetry and intellectual traditions.',
      tableHeaders: ['Somali Word', 'Phonetic', 'English Meaning', 'Sample Sentence'],
      tableData: [
        { word: 'Dugsi / Iskuul', phonetic: '/duɡ.si / is.kuːl/', english: 'School', example: 'Ardaydu waxay aadaan dugsiga subaxdii (Students go to school in the morning).' },
        { word: 'Jaamacad', phonetic: '/dʒæː.mæ.ʕæd/', english: 'University', example: 'Waxay wax ka barataa jaamacadda (She studies at the university).' },
        { word: 'Macallin', phonetic: '/mæ.ʕæl.lin/', english: 'Teacher (male)', example: 'Macallinku wuxuu sharxayaa casharka (The teacher explains the lesson).' },
        { word: 'Macallimad', phonetic: '/mæ.ʕæl.li.mæd/', english: 'Teacher (female)', example: 'Macallimaddu waxay caawisay ardayda (The female teacher helped the students).' },
        { word: 'Arday / Ardayad', phonetic: '/ær.dæj / ær.dæ.jæd/', english: 'Student (male / female)', example: 'Ardayda fariidka ah waxay akhrisaa buugaag (The bright student reads books).' },
        { word: 'Buug', phonetic: '/buːɡ/', english: 'Book', example: 'Fadlan fur buuggaaga bogga tobnaad (Please open your book to page ten).' },
        { word: 'Qalin', phonetic: '/qæ.lin/', english: 'Pen / Pencil', example: 'Qalinkani wuxuu qorayaa si fiican (This pen writes well).' },
        { word: 'Fasalka', phonetic: '/fæ.sæl.kæ/', english: 'The classroom', example: 'Fasalkayagu waa ballaaran yahay (Our classroom is spacious).' },
        { word: 'Imtixaan', phonetic: '/im.ti.ħæːn/', english: 'Exam / Test', example: 'Waxaan u diyaar garoobeynaa imtixaanka (We are preparing for the exam).' }
      ]
    }
  },
  {
    id: 'so-voc-4',
    categoryId: 'vocabulary',
    categoryName: 'Vocabulary',
    categorySomali: 'Eraybixin & Erayo Cusub',
    title: 'Travel, Transit & Directional Terms',
    somaliTitle: 'Safarka, Gaadiidka & Tilmaamaha Jihooyinka',
    level: 'Intermediate (A2-B1)',
    duration: '25 min',
    summary: 'Navigate airports, roads, buses, tickets, and directions across Somali-speaking cities and regions.',
    tags: ['Travel', 'Safar', 'Transit', 'Directions'],
    content: {
      introduction: 'Whether traveling by road, air, or sea, these transit terms empower you to navigate journeys smoothly.',
      tableHeaders: ['Somali Word', 'Phonetic', 'English Meaning', 'Practical Example'],
      tableData: [
        { word: 'Baabuur / Gaari', phonetic: '/bæː.buːr / ɡæː.ri/', english: 'Car / Motor Vehicle', example: 'Baabuurka wuxuu u socdaa magaalada (The car is heading to town).' },
        { word: 'Diyaarad', phonetic: '/di.jæː.ræd/', english: 'Airplane', example: 'Diyaaraddu waxay caga-dhigatay garoonka (The plane landed at the airport).' },
        { word: 'Garoonka diyaaradaha', phonetic: '/ɡæ.roːn.kæ di.jæː.ræ.dæ.hæ/', english: 'Airport', example: 'Garoonka diyaaradaha ee Aadan Cadde (Aden Adde International Airport).' },
        { word: 'Waddo / Jid', phonetic: '/wæd.dɔ / dʒid/', english: 'Road / Street', example: 'Waddadani waa mid toos ah (This road is straight).' },
        { word: 'Safar', phonetic: '/sæ.fær/', english: 'Journey / Travel', example: 'Safar wanaagsan iyo nabadgelyo (Have a safe journey and goodbye).' },
        { word: 'Tigidh', phonetic: '/ti.ɡið/', english: 'Ticket', example: 'Miyaad goosatay tigidhkii? (Have you booked/bought the ticket?).' },
        { word: 'Baasaboor', phonetic: '/bæː.sæ.boːr/', english: 'Passport', example: 'Fadlan tus saraakiisha baasaboorkaaga (Please show the officers your passport).' },
        { word: 'Midig / Bidix', phonetic: '/mi.diɡ / bi.diħ/', english: 'Right / Left', example: 'Midigta u leexo marka aad gaarto isgoyska (Turn right when you reach the junction).' },
        { word: 'Toos / Hore', phonetic: '/toːs / hɔ.rɛ/', english: 'Straight / Forward', example: 'Toos u soco hal kilomitir (Walk straight for one kilometer).' }
      ]
    }
  },
  {
    id: 'so-voc-5',
    categoryId: 'vocabulary',
    categoryName: 'Vocabulary',
    categorySomali: 'Eraybixin & Erayo Cusub',
    title: 'Daily Life, Home & Commerce',
    somaliTitle: 'Nolosha Maalinlaha ah, Guriga & Ganacsiga',
    level: 'Beginner to Intermediate (A2)',
    duration: '20 min',
    summary: 'Key words for home items, the market (Suuqa), money, time telling, and daily routines.',
    tags: ['Daily Life', 'Home', 'Market', 'Commerce'],
    content: {
      introduction: 'Daily life in bustling urban centers like Mogadishu, Hargeisa, Garowe, or Nairobi requires key commercial and household terms.',
      tableHeaders: ['Somali Word', 'Phonetic', 'English Meaning', 'Daily Context'],
      tableData: [
        { word: 'Guri', phonetic: '/ɡu.ri/', english: 'House / Home', example: 'Gurigayagu wuxuu ku yaallaa xaafadda (Our home is in the neighborhood).' },
        { word: 'Albaab / Daaqad', phonetic: '/æl.bæːb / dæː.qæd/', english: 'Door / Window', example: 'Fadlan xir albaabka marka aad baxdo (Please close the door when you leave).' },
        { word: 'Suuqa', phonetic: '/suː.qæ/', english: 'The Market / Bazaar', example: 'Waxaan u socdaa suuqa Bakaaraha (I am heading to Bakara Market).' },
        { word: 'Lacag', phonetic: '/læ.ʕæɡ/', english: 'Money / Currency', example: 'Immisa ayay qiimaheedu tahay? (How much does it cost in money?).' },
        { word: 'Qiimo', phonetic: '/qiː.mɔ/', english: 'Price / Value', example: 'Qiimaha wax yar iiga dhim (Reduce the price a little for me).' },
        { word: 'Saacad', phonetic: '/sæː.ʕæd/', english: 'Clock / Hour / Time', example: 'Waa immisadii saacaddu? (What time is it on the clock?).' },
        { word: 'Dhar', phonetic: '/ðær/', english: 'Clothes / Garments', example: 'Dhar cusub oo loogu talagalay ciidda (New clothes intended for Eid).' }
      ]
    }
  },

  // =========================================================================
  // 3. SPEAKING AND CONVERSATION (4 lessons)
  // =========================================================================
  {
    id: 'so-spk-1',
    categoryId: 'speaking',
    categoryName: 'Speaking & Conversation',
    categorySomali: 'Wadahadal & Hadal-wadag',
    title: 'Essential Questions & Answers',
    somaliTitle: 'Su\'aalaha Caadiga ah & Jawaabahooda',
    level: 'Beginner (A1-A2)',
    duration: '20 min',
    summary: 'Master the 6 primary interrogatives in Somali: Maxaa (What), Xaggee (Where), Goorma (When), Yaa (Who), Sidee (How), and Sabab (Why).',
    tags: ['Questions', 'Su\'aalo', 'Answers', 'Speaking'],
    content: {
      introduction: 'Asking clear questions and delivering accurate answers is the key to fluid conversational Somali.',
      items: [
        { question: 'Maxaad samaynaysaa?', answer: 'Waxaan akhrinayaa cashar.', translationQ: 'What are you doing?', translationA: 'I am reading a lesson.' },
        { question: 'Xaggee baad u socotaa?', answer: 'Waxaan u socdaa xafiiska.', translationQ: 'Where are you going?', translationA: 'I am going to the office.' },
        { question: 'Goormaad timid?', answer: 'Waxaan imid saaka.', translationQ: 'When did you arrive?', translationA: 'I arrived this morning.' },
        { question: 'Yaa guriga jooga?', answer: 'Hooyaday iyo walaalkay baa jooga.', translationQ: 'Who is at home?', translationA: 'My mother and brother are at home.' },
        { question: 'Sidee tahay xaaladdu?', answer: 'Alxamdulillaah, wax walba waa hagaag.', translationQ: 'How is the situation?', translationA: 'Praise be to God, everything is fine.' },
        { question: 'Maxaad u baratay Af-Soomaaliga?', answer: 'Sababtoo ah waa luqad qurux badan.', translationQ: 'Why did you learn Somali?', translationA: 'Because it is a beautiful language.' }
      ]
    }
  },
  {
    id: 'so-spk-2',
    categoryId: 'speaking',
    categoryName: 'Speaking & Conversation',
    categorySomali: 'Wadahadal & Hadal-wadag',
    title: 'Market Bargaining & Shopping Dialogue',
    somaliTitle: 'Wadahadal Suuqa & Gorgortanka Ganacsiga',
    level: 'Intermediate (A2-B1)',
    duration: '25 min',
    summary: 'A complete practical dialogue between a buyer and a fruit vendor in a traditional Somali market.',
    tags: ['Market', 'Shopping', 'Dialogue', 'Speaking'],
    content: {
      introduction: 'Friendly bargaining (Gorgortan) is standard and enjoyable in open-air Somali markets.',
      dialogue: [
        { speaker: 'Macmiil (Customer)', text: 'Asc walaal, iska warran?', translation: 'Peace be upon you sibling, how are you?' },
        { speaker: 'Ganacsade (Vendor)', text: 'Wcs macaamiil, soo dhowow! Maxaan kuu qabtaa maanta?', translation: 'Peace upon you customer, welcome! What can I get for you today?' },
        { speaker: 'Macmiil', text: 'Waxaan rabaa kiilo cambe ah iyo xabbo qaraha ah. Immisa waaye?', translation: 'I want a kilo of mangoes and one watermelon. How much is it?' },
        { speaker: 'Ganacsade', text: 'Kiilada cambaha waa $2, qaraxuna waa $3. Wadarta waa $5.', translation: 'A kilo of mangoes is $2, and the watermelon is $3. Total is $5.' },
        { speaker: 'Macmiil', text: 'Aad bay u qaali tahay walaal! $4 ma iiga dhigi kartaa labadaba?', translation: 'That is a bit expensive sibling! Could you make it $4 for both?' },
        { speaker: 'Ganacsade', text: 'Waa hagaag macaamiil, adiga dartaa $4 ayaan kaa qaadayaa.', translation: 'Alright customer, for your sake I will accept $4.' },
        { speaker: 'Macmiil', text: 'Mahadsanid walaal, gacan wanaagsan.', translation: 'Thank you sibling, have good sales!' }
      ]
    }
  },
  {
    id: 'so-spk-3',
    categoryId: 'speaking',
    categoryName: 'Speaking & Conversation',
    categorySomali: 'Wadahadal & Hadal-wadag',
    title: 'Ordering Food at a Somali Restaurant',
    somaliTitle: 'Dalbashada Cuntada Makhaayadda Soomaalida',
    level: 'Beginner to Intermediate (A2)',
    duration: '20 min',
    summary: 'Authentic dialogue for entering a restaurant, checking the daily menu, ordering tea, and asking for the bill.',
    tags: ['Restaurant', 'Dining', 'Makhaayad', 'Ordering'],
    content: {
      introduction: 'Somali restaurants are social hubs where people gather over aromatic spiced tea (Shaah cadareey) and meals.',
      dialogue: [
        { speaker: 'Macmiil (Diner)', text: 'Iga raalli ahow walaal, maxaa cunto ah oo diyaarsan maanta?', translation: 'Excuse me brother, what food is prepared today?' },
        { speaker: 'Adeege (Waiter)', text: 'Waxaan haynaa bariis iyo hilib geel, baasto kalluun leh, iyo muufo.', translation: 'We have rice with camel meat, pasta with fish, and fresh flatbread.' },
        { speaker: 'Macmiil', text: 'Fadlan ii keen saxan bariis iyo hilib geel ah, iyo muus cusub.', translation: 'Please bring me a plate of rice with camel meat, and a fresh banana.' },
        { speaker: 'Adeege', text: 'Cabitaan maxaad jeceshahay inaad cabto?', translation: 'What drink would you like to have?' },
        { speaker: 'Macmiil', text: 'Koob shaah caano leh oo sanjabiil leh ii keen cuntada kadib.', translation: 'Bring me a cup of spiced milk tea with ginger after the meal.' },
        { speaker: 'Adeege', text: 'Waa hagaag mudane, daqiiqado kadib waa diyaar.', translation: 'Very well sir, it will be ready in a few minutes.' }
      ]
    }
  },
  {
    id: 'so-spk-4',
    categoryId: 'speaking',
    categoryName: 'Speaking & Conversation',
    categorySomali: 'Wadahadal & Hadal-wadag',
    title: 'Asking for Directions & Navigating the City',
    somaliTitle: 'Weydiinta Jihooyinka & Socodka Magaalada',
    level: 'Intermediate (A2-B1)',
    duration: '20 min',
    summary: 'Practical phrases for asking landmarks, distances, turns, and finding your way in Somali towns.',
    tags: ['Directions', 'Jihooyinka', 'City', 'Navigation'],
    content: {
      introduction: 'Locals are very helpful when you ask for directions with polite phrases like "Fadlan i caawi" (Please help me).',
      dialogue: [
        { speaker: 'Socoto (Traveler)', text: 'Asc walaal, fadlan xaggee bay ku taallaa masaajidka weyn?', translation: 'Peace be upon you sibling, please where is the big mosque located?' },
        { speaker: 'Qof deegaanka ah (Local)', text: 'Wcs walaal. Toos u soco ilaa aad ka gaarto laydhka waddada.', translation: 'Peace upon you. Walk straight until you reach the traffic lights.' },
        { speaker: 'Socoto', text: 'Markaan gaaro laydhka, xaggee baan u leexanayaa?', translation: 'When I reach the lights, which way do I turn?' },
        { speaker: 'Qof deegaanka ah', text: 'Midigta u leexo, masaajidku wuxuu ku yaallaa dhanka bidix.', translation: 'Turn right, the mosque is located on the left side.' },
        { speaker: 'Socoto', text: 'Aad baad u mahadsantahay walaal!', translation: 'Thank you very much sibling!' }
      ]
    }
  },

  // =========================================================================
  // 4. GRAMMAR (4 lessons)
  // =========================================================================
  {
    id: 'so-grm-1',
    categoryId: 'grammar',
    categoryName: 'Grammar',
    categorySomali: 'Naxwaha Af-Soomaaliga',
    title: 'Sentence Structure & Focus Particles (Waa, Baa, Ayaa)',
    somaliTitle: 'Qaab-dhismeedka Weerta & Erayada Tilmaanta',
    level: 'Intermediate (A2-B1)',
    duration: '30 min',
    summary: 'Understand the standard Subject-Object-Verb (SOV) order and how Somali focus particles emphasize specific sentence parts.',
    tags: ['Grammar', 'SOV', 'Focus Particles', 'Naxwe'],
    content: {
      introduction: 'Unlike English (SVO), Somali follows a Subject-Object-Verb (SOV) word order and relies on "focus markers" (Meeleynta Xoogga) to indicate what is new or emphasized.',
      rules: [
        {
          ruleName: '1. Declarative Focus: "Waa"',
          explanation: 'Places general declarative focus on the verb or entire statement. It is often translated as "is/are" or acts as an affirmative assertion.',
          examples: [
            { somali: 'Cali waa macallin.', english: 'Ali is a teacher.' },
            { somali: 'Waxbarashadu waa iftiin.', english: 'Education is light.' }
          ]
        },
        {
          ruleName: '2. Subject / Noun Focus: "Baa" and "Ayaa"',
          explanation: '"Baa" and "Ayaa" are interchangeable particles that emphasize the preceding noun or pronoun as the primary subject/agent.',
          examples: [
            { somali: 'Axmed baa yimid.', english: 'It was Ahmed who came (Ahmed came).' },
            { somali: 'Ardayda ayaa ku guuleysatay imtixaanka.', english: 'It was the students who succeeded in the exam.' }
          ]
        },
        {
          ruleName: '3. Standard SOV Word Order',
          explanation: 'In full sentences, the subject comes first, followed by the object, and finally the conjugated verb at the end.',
          examples: [
            { somali: 'Wiilku (S) buug (O) buu akhriyay (V).', english: 'The boy read a book.' }
          ]
        }
      ]
    }
  },
  {
    id: 'so-grm-2',
    categoryId: 'grammar',
    categoryName: 'Grammar',
    categorySomali: 'Naxwaha Af-Soomaaliga',
    title: 'Personal Pronouns (Magacuyaallada)',
    somaliTitle: 'Magacuyaallada Qofeed ee Af-Soomaaliga',
    level: 'Beginner to Intermediate (A1-A2)',
    duration: '25 min',
    summary: 'Master full independent subject pronouns, short emphatic clitics, and inclusive vs. exclusive "we" (Innaga vs. Annaga).',
    tags: ['Pronouns', 'Magacuyaallo', 'Grammar', 'Basics'],
    content: {
      introduction: 'Somali possesses a distinctive feature in the 1st person plural: "Innaga" (inclusive: you and us) versus "Annaga" (exclusive: us, but not you).',
      tableHeaders: ['Independent Pronoun', 'Short Clitic', 'English Equivalent', 'Example Sentence'],
      tableData: [
        { word: 'Aniga', phonetic: '/æ.ni.ɡæ/', english: 'I / Me', example: 'Anigu waxaan ahay arday (I am a student).' },
        { word: 'Adiga', phonetic: '/æ.di.ɡæ/', english: 'You (singular)', example: 'Adigu waxaad tahay macallin fiican (You are a good teacher).' },
        { word: 'Isaga', phonetic: '/i.sæ.ɡæ/', english: 'He / Him', example: 'Isagu wuxuu joogaa guriga (He is at home).' },
        { word: 'Iyada', phonetic: '/i.jæ.dæ/', english: 'She / Her', example: 'Iyadu waxay qoraysaa warqad (She is writing a letter).' },
        { word: 'Innaga', phonetic: '/in.næ.ɡæ/', english: 'We / Us (Inclusive: speaker + listener)', example: 'Innagu dhammaanteen waan wada soconnaa (All of us together are going).' },
        { word: 'Annaga', phonetic: '/æn.næ.ɡæ/', english: 'We / Us (Exclusive: speaker + others, not listener)', example: 'Annagu waxaan ka nimid magaalada (We came from the city).' },
        { word: 'Idinka', phonetic: '/i.din.kæ/', english: 'You (plural)', example: 'Idinku maxaad doonaysaan? (What do you all want?).' },
        { word: 'Iyaga', phonetic: '/i.jæ.ɡæ/', english: 'They / Them', example: 'Iyagu waxay ciyaarayaan kubbad (They are playing football).' }
      ]
    }
  },
  {
    id: 'so-grm-3',
    categoryId: 'grammar',
    categoryName: 'Grammar',
    categorySomali: 'Naxwaha Af-Soomaaliga',
    title: 'Verbs & Primary Tenses (Falka & Xilliyada)',
    somaliTitle: 'Falka & Xilliyada: Joogto, Soo-dhaafay & Soo-socda',
    level: 'Intermediate (A2-B1)',
    duration: '30 min',
    summary: 'Learn present continuous, simple past, and future tense conjugations using common root verbs.',
    tags: ['Verbs', 'Tenses', 'Xilliyo', 'Conjugation'],
    content: {
      introduction: 'Somali verbs conjugate by adding specific suffix markers corresponding to tense and person.',
      rules: [
        {
          ruleName: '1. Present Continuous (Xilliga Joogtada ah - "-anayaa")',
          explanation: 'Used for actions happening right now.',
          examples: [
            { somali: 'Waxaan cunayaa bariis.', english: 'I am eating rice.' },
            { somali: 'Wuxuu akhrinayaa buug.', english: 'He is reading a book.' }
          ]
        },
        {
          ruleName: '2. Past Tense (Xilliga Soo-dhaafay - "-ay / -tay")',
          explanation: 'Used for completed actions.',
          examples: [
            { somali: 'Shalay waxaan tagay suuqa.', english: 'Yesterday I went to the market.' },
            { somali: 'Maryan waxay qortay cashar.', english: 'Maryan wrote a lesson.' }
          ]
        },
        {
          ruleName: '3. Future Tense (Xilliga Soo-socda - "doonaa / doontaa")',
          explanation: 'Formed using the auxiliary verb "doon" (to intend/will).',
          examples: [
            { somali: 'Berri waxaan aadi doonaa dugsiga.', english: 'Tomorrow I will go to school.' },
            { somali: 'Waxaan baran doonnaa naxwaha.', english: 'We will learn grammar.' }
          ]
        }
      ]
    }
  },
  {
    id: 'so-grm-4',
    categoryId: 'grammar',
    categoryName: 'Grammar',
    categorySomali: 'Naxwaha Af-Soomaaliga',
    title: 'Noun Genders & Definite Articles (Lab & Dheddig)',
    somaliTitle: 'Jinsiga Magacyada & Qodobka (K-class & T-class)',
    level: 'Intermediate (A2-B1)',
    duration: '25 min',
    summary: 'Discover how masculine nouns take K-suffix articles (-ka, -ga, -ha) and feminine nouns take T-suffix articles (-ta, -da, -sha).',
    tags: ['Gender', 'Articles', 'Qodobka', 'Morphology'],
    content: {
      introduction: 'Every noun in Somali is either Masculine (Lab) or Feminine (Dheddig). The definite article ("the") is attached as an ending suffix.',
      rules: [
        {
          ruleName: 'Masculine Nouns (K-Series Article)',
          explanation: 'Take suffixes like -ka, -ga, or -ha depending on the final root sound.',
          examples: [
            { somali: 'Nin (Man) → Ninka (The man)', english: 'Standard -ka suffix.' },
            { somali: 'Guri (House) → Guriga (The house)', english: 'Vowel endings trigger -ga.' },
            { somali: 'Buug (Book) → Buugga (The book)', english: 'Consonant assimilation to -ga.' }
          ]
        },
        {
          ruleName: 'Feminine Nouns (T-Series Article)',
          explanation: 'Take suffixes like -ta, -da, or -sha depending on the root sound.',
          examples: [
            { somali: 'Gabar (Girl) → Gabarta (The girl)', english: 'Standard -ta suffix.' },
            { somali: 'Magaalo (City) → Magaalada (The city)', english: 'Vowel endings trigger -da.' },
            { somali: 'Ul (Stick) → Usha (The stick)', english: 'L-ending assimilates to -sha.' }
          ]
        }
      ]
    }
  },

  // =========================================================================
  // 5. READING AND WRITING (3 lessons)
  // =========================================================================
  {
    id: 'so-rdw-1',
    categoryId: 'reading-writing',
    categoryName: 'Reading & Writing',
    categorySomali: 'Akhriska & Qoraalka',
    title: 'Somali Orthography & Spelling Rules',
    somaliTitle: 'Far-Soomaaliga & Xeerarka Higgaadda',
    level: 'Beginner to Intermediate (A1-B1)',
    duration: '25 min',
    summary: 'The 1972 official Latin alphabet: 21 consonants, 5 short vowels, and 5 corresponding long double vowels.',
    tags: ['Orthography', 'Spelling', 'Far Soomaali', 'Alphabet'],
    content: {
      introduction: 'Standardized in 1972 under Shire Jama Ahmed, the Somali Latin script is completely phonetic: each letter represents one distinct sound.',
      alphabetBreakdown: {
        consonants: ['B', 'T', 'J', 'X', 'KH', 'D', 'R', 'S', 'SH', 'DH', 'C', 'G', 'F', 'Q', 'K', 'L', 'M', 'N', 'W', 'H', 'Y'],
        shortVowels: ['A', 'E', 'I', 'O', 'U'],
        longVowels: ['AA', 'EE', 'II', 'OO', 'UU']
      },
      spellingRules: [
        'Long vowels are always written as double letters (e.g. "Caano", "Bariis", "Suuq").',
        'Vowel length changes word meaning completely: "Qor" (Write) vs "Qoor" (Neck); "Bari" (East) vs "Bariis" (Rice).',
        'No accent marks or special diacritics are needed—all sounds are represented by standard Latin characters.'
      ]
    }
  },
  {
    id: 'so-rdw-2',
    categoryId: 'reading-writing',
    categoryName: 'Reading & Writing',
    categorySomali: 'Akhriska & Qoraalka',
    title: 'Reading Comprehension: Daily Life in Mogadishu',
    somaliTitle: 'Qormo Akhris: Nolol-maalmeedka Muqdisho',
    level: 'Intermediate (A2-B1)',
    duration: '25 min',
    summary: 'Read a short passage about a morning in Mogadishu, followed by comprehension questions and vocabulary breakdown.',
    tags: ['Reading', 'Akhris', 'Comprehension', 'Mogadishu'],
    content: {
      passage: `Muqdisho waa magaalo taariikhi ah oo ku taal xeebta Badweynta Hindiya. Subax kasta marka ay qorraxdu soo baxdo, dadku waxay u toosaan shaqada iyo waxbarashada. Suuqyada sida Suuqa Bakaaraha iyo Suuqa Xamarweyne waxaa ka buuxa ganacsato iyo macaamiil iibsanaya khudaar, miro, iyo kalluun cusub. Ardaydu waxay u cararaan dugsiyada iyagoo wata buugaagtooda iyo qalmaantooda. Galabtiina, dhalinyaradu waxay ku kulmaan xeebta Liido si ay ugu nastaan una daawadaan mowjadaha badda.`,
      englishTranslation: `Mogadishu is a historic city located on the coast of the Indian Ocean. Every morning when the sun rises, people awaken for work and education. Markets like Bakara Market and Hamar Weyne are filled with traders and customers buying vegetables, fruits, and fresh fish. Students rush to schools carrying their books and pens. In the afternoon, young people meet at Lido Beach to relax and watch the ocean waves.`,
      comprehensionQuestions: [
        { q: 'Xaggee bay ku taallaa magaalada Muqdisho?', a: 'Waxay ku taallaa xeebta Badweynta Hindiya (It is located on the Indian Ocean coast).' },
        { q: 'Maxaa laga iibsadaa suuqyada subaxdii?', a: 'Khudaar, miro, iyo kalluun cusub (Vegetables, fruits, and fresh fish).' },
        { q: 'Xaggee bay dhalinyaradu u nastaan galabtii?', a: 'Xeebta Liido (Lido Beach).' }
      ]
    }
  },
  {
    id: 'so-rdw-3',
    categoryId: 'reading-writing',
    categoryName: 'Reading & Writing',
    categorySomali: 'Akhriska & Qoraalka',
    title: 'Writing Exercises & Sentence Building',
    somaliTitle: 'Layliyo Qoraal & Dhisidda Qoraalka',
    level: 'Intermediate (B1)',
    duration: '20 min',
    summary: 'Practice writing short personal reflections, daily schedules, and compound sentences using connectors (iyo, laakiin, sababtoo ah).',
    tags: ['Writing', 'Qoraal', 'Composition', 'Exercises'],
    content: {
      connectors: [
        { word: 'Iyo', meaning: 'And', example: 'Waxaan iibsaday buug iyo qalin (I bought a book and a pen).' },
        { word: 'Laakiin', meaning: 'But / However', example: 'Waan rabay inaan imaado, laakiin waan mashquulsanaa (I wanted to come, but I was busy).' },
        { word: 'Sababtoo ah', meaning: 'Because', example: 'Aad baan u faraxsanahay sababtoo ah waxaan ku guuleystay imtixaanka (I am very happy because I passed the exam).' },
        { word: 'Marka', meaning: 'When / While', example: 'Marka aad timaado, i soo wac (When you arrive, call me).' }
      ],
      writingPrompt: 'Qor 3 weedhood oo aad ku sharxayso qoyskaaga ama waxa aad samaysay shalay (Write 3 sentences describing your family or what you did yesterday).'
    }
  },

  // =========================================================================
  // 6. LISTENING AND PRONUNCIATION (2 lessons)
  // =========================================================================
  {
    id: 'so-lsp-1',
    categoryId: 'listening-pronunciation',
    categoryName: 'Listening & Pronunciation',
    categorySomali: 'Dhageysiga & Dhawaaqa',
    title: 'Distinctive Somali Consonant Sounds (C, X, Q, DH, KH)',
    somaliTitle: 'Dhawaaqyada Gaarka ah ee Shibbanayaasha Soomaaliga',
    level: 'All Levels (A1-B2)',
    duration: '20 min',
    summary: 'In-depth articulation guide for pharyngeal (C, X), retroflex (DH), and uvular (Q, KH) phonemes.',
    tags: ['Pronunciation', 'Phonetics', 'Dhawaaq', 'Articulation'],
    content: {
      introduction: 'Somali features beautiful and expressive throat and tongue positions that give the language its rich rhythm.',
      phonemes: [
        {
          letter: 'C',
          ipa: '[ʕ]',
          name: 'Voiced Pharyngeal Fricative',
          guide: 'Produced by tightening the throat muscles and vibrating the vocal cords. Identical to the Arabic letter Ayn (ع).',
          examples: ['Caano (Milk)', 'Cali (Ali)', 'Cunto (Food)', 'Cilmi (Knowledge)']
        },
        {
          letter: 'X',
          ipa: '[ħ]',
          name: 'Voiceless Pharyngeal Fricative',
          guide: 'A deep, raspy "H" sound made from the mid-throat, like blowing warm breath onto cold glass. Identical to Arabic Haa (ح).',
          examples: ['Xidid (Root)', 'Xalay (Last night)', 'Xasan (Hassan)', 'Xornimo (Freedom)']
        },
        {
          letter: 'Q',
          ipa: '[q]',
          name: 'Voiceless Uvular Stop',
          guide: 'Produced at the very back of the throat by touching the back of the tongue against the uvula. Similar to Arabic Qaaf (ق).',
          examples: ['Qalin (Pen)', 'Qorrax (Sun)', 'Qurux (Beauty)', 'Qoys (Family)']
        },
        {
          letter: 'DH',
          ipa: '[ɖ]',
          name: 'Voiced Retroflex Stop',
          guide: 'Produced by curling the tip of the tongue backwards against the hard roof of the mouth and releasing.',
          examples: ['Dhabar (Back)', 'Dhalasho (Birth)', 'Dhibic (Raindrop)', 'Dhul (Earth/Land)']
        },
        {
          letter: 'KH',
          ipa: '[x]',
          name: 'Voiceless Velar Fricative',
          guide: 'A clearing-the-throat sound, like the "ch" in Scottish "loch" or German "Bach". Identical to Arabic Khaa (خ).',
          examples: ['Khudaar (Vegetables)', 'Khafiif (Light/Gentle)', 'Khad (Ink)']
        }
      ]
    }
  },
  {
    id: 'so-lsp-2',
    categoryId: 'listening-pronunciation',
    categoryName: 'Listening & Pronunciation',
    categorySomali: 'Dhageysiga & Dhawaaqa',
    title: 'Short vs. Long Vowel Contrasts & Minimal Pairs',
    somaliTitle: 'Farqiga Shaqallada Gaaban & Kuwa Dhaadheer',
    level: 'Beginner to Intermediate',
    duration: '20 min',
    summary: 'Train your auditory discrimination between short single vowels and prolonged double vowels in authentic minimal pairs.',
    tags: ['Vowels', 'Minimal Pairs', 'Listening', 'Rhythm'],
    content: {
      introduction: 'Holding a vowel sound twice as long in Somali changes the definition entirely. Practice these auditory pairs:',
      minimalPairs: [
        { pair1: 'Bari (East / Morning prayer)', pair2: 'Bariis (Rice)', contrast: 'Short /a, i/ vs. Long /ii/' },
        { pair1: 'Qor (Write / Carve)', pair2: 'Qoor (Neck)', contrast: 'Short /o/ vs. Long /oo/' },
        { pair1: 'Kala (Apart / Separate)', pair2: 'Kalaal (Cutlery / Utensils)', contrast: 'Short /a/ vs. Long /aa/' },
        { pair1: 'Deg (Settle / Land)', pair2: 'Deeq (Gift / Donation)', contrast: 'Short /e/ vs. Long /ee/' },
        { pair1: 'Lug (Leg / Foot)', pair2: 'Luuq (Alley / Lane)', contrast: 'Short /u/ vs. Long /uu/' }
      ]
    }
  },

  // =========================================================================
  // 7. QUIZZES AND PRACTICE (2 interactive exercise sets)
  // =========================================================================
  {
    id: 'so-qzp-1',
    categoryId: 'quizzes-practice',
    categoryName: 'Quizzes & Practice',
    categorySomali: 'Kedis & Layliyo',
    title: 'Foundational Somali Knowledge Quiz',
    somaliTitle: 'Kediska Aasaaska Af-Soomaaliga (Layli 1)',
    level: 'Beginner (A1)',
    duration: '10 min',
    summary: 'Test your understanding of greetings, essential vocabulary, and simple grammar particles with instant explanations.',
    tags: ['Quiz', 'Interactive', 'Practice', 'A1'],
    questions: [
      {
        id: 'q1',
        question: 'What is the correct polite response when someone asks you "Iska warran?" (How are you?)',
        options: [
          'Aad baan u fiicanahay (I am very well)',
          'Magacaygu waa Axmed (My name is Ahmed)',
          'Nabadgelyo (Goodbye)',
          'Subax wanaagsan (Good morning)'
        ],
        correctIndex: 0,
        explanation: '"Aad baan u fiicanahay" (I am very well) or simply "Fiican" is the standard response to "Iska warran?".'
      },
      {
        id: 'q2',
        question: 'Which of the following is the specific Somali word for your mother\'s brother (Maternal Uncle)?',
        options: [
          'Adeer',
          'Abti',
          'Eedo',
          'Habaryar'
        ],
        correctIndex: 1,
        explanation: '"Abti" is specifically your maternal uncle (mother\'s brother), whereas "Adeer" is your paternal uncle (father\'s brother).'
      },
      {
        id: 'q3',
        question: 'Which letter in the Somali alphabet represents the voiced pharyngeal fricative sound [ʕ] as in "Caano" (Milk)?',
        options: [
          'X',
          'Q',
          'C',
          'DH'
        ],
        correctIndex: 2,
        explanation: 'In the 1972 Somali Latin script, the letter "C" represents the voiced pharyngeal sound [ʕ] (equivalent to Arabic Ayn).'
      },
      {
        id: 'q4',
        question: 'Choose the correct definite form for the masculine noun "Guri" (House):',
        options: [
          'Gurida',
          'Guriga',
          'Gurita',
          'Gurisha'
        ],
        correctIndex: 1,
        explanation: 'Masculine nouns ending in a vowel take the "-ga" suffix (Guriga = The house).'
      },
      {
        id: 'q5',
        question: 'What does the Somali sentence "Waxaan ku noolahay Muqdisho" mean in English?',
        options: [
          'I come from Mogadishu',
          'I am going to Mogadishu',
          'I live in Mogadishu',
          'I work in Mogadishu'
        ],
        correctIndex: 2,
        explanation: '"Waxaan ku noolahay" translates directly to "I live in" (Noolahay = to live/reside).'
      }
    ]
  },
  {
    id: 'so-qzp-2',
    categoryId: 'quizzes-practice',
    categoryName: 'Quizzes & Practice',
    categorySomali: 'Kedis & Layliyo',
    title: 'Intermediate Grammar & Conversational Practice',
    somaliTitle: 'Layliga Naxwaha & Wadahadalka (Layli 2)',
    level: 'Intermediate (A2-B1)',
    duration: '15 min',
    summary: 'Evaluate your mastery of verb tenses, pronouns, market bargaining phrases, and reading comprehension.',
    tags: ['Quiz', 'Grammar', 'Intermediate', 'Practice'],
    questions: [
      {
        id: 'q6',
        question: 'Which pronoun represents the inclusive "We" (including both speaker and listener) in Somali?',
        options: [
          'Annaga',
          'Innaga',
          'Iyaga',
          'Idinka'
        ],
        correctIndex: 1,
        explanation: '"Innaga" is the inclusive 1st person plural (all of us together, speaker + listener), whereas "Annaga" excludes the listener.'
      },
      {
        id: 'q7',
        question: 'Complete the past tense sentence: "Shalay Axmed suuqa..." (Yesterday Ahmed ... to the market)',
        options: [
          'tagayaa',
          'tagay',
          'tigi doonaa',
          'tegi'
        ],
        correctIndex: 1,
        explanation: '"Tagay" is the 3rd person masculine past tense for the verb "tag" (to go).'
      },
      {
        id: 'q8',
        question: 'When a vendor says "Wadarta waa $5" in the market, what does "Wadarta" mean?',
        options: [
          'The change / balance',
          'The total amount',
          'The discount',
          'The receipt'
        ],
        correctIndex: 1,
        explanation: '"Wadarta" means "the total" or "the sum" in commercial and daily Somali.'
      },
      {
        id: 'q9',
        question: 'Which word acts as a contrastive connector meaning "Because" in Somali?',
        options: [
          'Laakiin',
          'Sababtoo ah',
          'Iyo',
          'Haddii'
        ],
        correctIndex: 1,
        explanation: '"Sababtoo ah" translates directly to "Because" (Sabab = cause/reason).'
      },
      {
        id: 'q10',
        question: 'What is the English meaning of the traditional wisdom proverb: "Aqoon la\'aan waa iftiin la\'aan"?',
        options: [
          'Patience is the key to victory',
          'Without knowledge, there is no light',
          'Unity is strength',
          'A journey begins with one step'
        ],
        correctIndex: 1,
        explanation: '"Aqoon la\'aan waa iftiin la\'aan" is one of the most celebrated Somali educational proverbs meaning "Without knowledge, there is no light".'
      }
    ]
  }
];

// Clean, Ad-Free Somali Language Learning Classes & Educational References
export const SOMALI_EXTERNAL_REFERENCES = [
  {
    name: 'Wikivoyage Open Somali Phrasebook',
    websiteUrl: 'https://en.wikivoyage.org/wiki/Somali_phrasebook',
    description: '100% ad-free, open educational phrasebook covering phonetics, pronunciation, everyday greetings, numbers, market bargaining, dining, and essential grammar.',
    badge: 'Ad-Free Open Guide',
    category: 'Free Phrasebook',
    actionText: 'Explore Phrasebook'
  },
  {
    name: 'Omniglot Somali Script & Language Guide',
    websiteUrl: 'https://www.omniglot.com/writing/somali.htm',
    description: 'Clean, encyclopedic breakdown of the 1972 Latin Far-Soomaali alphabet, unique pharyngeal sounds (C, X, Q, DH, KH), and audio recordings.',
    badge: 'Alphabet & Phonetics',
    category: 'Linguistic Guide',
    actionText: 'Explore Alphabet'
  },
  {
    name: 'Wiktionary Somali Core Vocabulary',
    websiteUrl: 'https://en.wiktionary.org/wiki/Appendix:Somali_Swadesh_list',
    description: '100% ad-free, non-profit linguistic database of fundamental Somali vocabulary with IPA phonetics and root etymology.',
    badge: 'Ad-Free Vocabulary',
    category: 'Vocabulary Bank',
    actionText: 'Open Word List'
  },
  {
    name: 'Somali with Abzi Video Classes',
    websiteUrl: 'https://www.youtube.com/@Somaliwithabzi',
    description: 'Clean, dedicated video course playlist covering Somali phonetics, beginner conversations, and everyday dialogues.',
    badge: 'Free Video Lessons',
    category: 'Video Classes',
    actionText: 'Watch Classes'
  },
  {
    name: 'Learnable Educational Platform',
    websiteUrl: 'https://www.learnable.education/',
    description: 'Interactive digital learning resources and self-paced study tools with a clean interface.',
    badge: 'General Education',
    category: 'Digital Tools',
    actionText: 'Visit Learnable'
  }
];


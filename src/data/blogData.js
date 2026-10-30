/**
 * ============================================================================
 * FAHMRISE Educational Blog & Tutorial Articles Dataset
 * ============================================================================
 * High-quality educational articles across Technology, Data Analytics,
 * Learning Tips, Islamic Studies, Career Skills, and Platform Announcements.
 * ============================================================================
 */

export const BLOG_CATEGORIES = [
  'All',
  'Technology',
  'Data & Analytics',
  'Islamic Studies',
  'International Languages',
  'Business',
  'Career Skills',
  'Learning Tips',
  'Announcements'
];

export const BLOG_POSTS = [
  {
    id: 'welcome-to-fahmrise-2-0',
    slug: 'welcome-to-fahmrise-2-0',
    title: 'Welcome to FAHMRISE: Interactive Sandboxes, Socratic AI Mentorship, and Verified Credentials',
    category: 'Announcements',
    readTime: '4 min read',
    publishedDate: 'October 28, 2026',
    author: {
      name: 'FAHMRISE Academic Team',
      role: 'Platform Operations & Curriculum'
    },
    excerpt: 'Explore how FAHMRISE combines structured digital curriculums, personalized Socratic AI guidance, practical learning experiences, and verified completion certificates to help you learn without limits.',
    coverBadge: 'Platform Update',
    featured: true,
    relatedCourse: {
      id: 'fullstack-developer-bundle',
      title: 'Full-Stack Developer: Zero to Job-Ready',
      path: '/courses/fullstack-developer-bundle'
    },
    content: [
      {
        type: 'paragraph',
        text: 'Education in the digital era should not be confined to passive video lectures where learners copy code line-by-line without understanding the underlying mechanics. Today, we are proud to introduce FAHMRISE — an empowering online learning platform designed around active inquiry, hands-on practice, and verified competency.'
      },
      {
        type: 'heading',
        text: 'The Three Pillars of the FAHMRISE Methodology'
      },
      {
        type: 'paragraph',
        text: 'Our pedagogical model is built around three core principles that bridge the gap between theory and real-world execution:'
      },
      {
        type: 'list',
        items: [
          '1. Understand: Conceptual depth through real-world analogies, mental models, and concise structured chapters.',
          '2. Practice & Build: In-browser code sandboxes, interactive DOM previews, and automated grading test suites.',
          '3. Rise: Socratic AI guidance, capstone projects, and cryptographically signed certificates of completion.'
        ]
      },
      {
        type: 'callout',
        title: '24/7 Socratic AI Mentorship',
        text: 'Unlike standard chatbots that simply supply answers, the FAHMRISE AI Tutor acts as a Socratic mentor. When you hit a bug in CSS Flexbox or SQL joins, it provides diagnostic hints, asks guiding questions, and helps you formulate the solution yourself.'
      },
      {
        type: 'heading',
        text: 'Multidisciplinary Learning Under One Roof'
      },
      {
        type: 'paragraph',
        text: 'From full-stack web engineering and business intelligence dashboards to Qur’anic Tajweed and international language tracks in Arabic and Swahili, FAHMRISE unites essential technical skills with foundational cultural and ethical disciplines.'
      }
    ]
  },
  {
    id: 'modern-fullstack-developer-roadmap-2026',
    slug: 'modern-fullstack-developer-roadmap-2026',
    title: 'The Modern Full-Stack Developer Roadmap in 2026: From Fundamentals to Cloud Microservices',
    category: 'Technology',
    readTime: '7 min read',
    publishedDate: 'October 25, 2026',
    author: {
      name: 'FAHMRISE Engineering Team',
      role: 'Software Architecture Faculty'
    },
    excerpt: 'A comprehensive roadmap for ambitious software developers in 2026. Learn how to progress methodically from semantic HTML and modern JavaScript to React, Node.js, PostgreSQL, and Docker.',
    coverBadge: 'Tutorial & Guide',
    featured: false,
    relatedCourse: {
      id: 'frontend-developer-zero-to-job-ready',
      title: 'Frontend Developer: Zero to Job-Ready',
      path: '/courses/frontend-developer-zero-to-job-ready'
    },
    content: [
      {
        type: 'paragraph',
        text: 'The web development ecosystem has evolved dramatically. Modern full-stack engineering demands a solid foundation in core web standards before adopting complex frameworks and build tools.'
      },
      {
        type: 'heading',
        text: 'Phase 1: Web Fundamentals (Semantic HTML & Modern CSS)'
      },
      {
        type: 'paragraph',
        text: 'Begin with accessible, semantic HTML5 elements (<main>, <article>, <section>, <nav>). Master CSS Layout using Flexbox for one-dimensional layouts and CSS Grid for two-dimensional component architectures. Avoid relying on CSS frameworks until you understand the cascade, specificity, and responsive media queries.'
      },
      {
        type: 'heading',
        text: 'Phase 2: JavaScript Mastery & Asynchronous Execution'
      },
      {
        type: 'paragraph',
        text: 'JavaScript is the runtime engine of the web. Focus deeply on scope, closures, array methods (.map, .filter, .reduce), the Event Loop, Promises, and async/await syntax before jumping into React.'
      },
      {
        type: 'code',
        language: 'javascript',
        code: `// Modern Asynchronous Fetch Pattern with Error Boundaries
async function fetchLearnerCourse(courseId) {
  try {
    const response = await fetch(\`/api/courses/\${courseId}\`);
    if (!response.ok) {
      throw new Error(\`Course fetch failed: \${response.status}\`);
    }
    const data = await response.json();
    return data.course;
  } catch (error) {
    console.error('Network or parsing error:', error.message);
    throw error;
  }
}`
      },
      {
        type: 'heading',
        text: 'Phase 3: Scalable Backend Services & Relational Databases'
      },
      {
        type: 'paragraph',
        text: 'On the server side, master Node.js and Express RESTful design. Learn SQL database normalization, ACID transactions, and indexed query design with PostgreSQL rather than relying solely on NoSQL data stores.'
      }
    ]
  },
  {
    id: 'understanding-sql-execution-mechanics',
    slug: 'understanding-sql-execution-mechanics',
    title: 'Understanding SQL Execution Mechanics: How Relational Databases Actually Run Queries',
    category: 'Data & Analytics',
    readTime: '8 min read',
    publishedDate: 'October 21, 2026',
    author: {
      name: 'FAHMRISE Data Science Team',
      role: 'Database & Analytics Faculty'
    },
    excerpt: 'Demystifying the relational database lifecycle: lexical analysis, query optimization, execution plans, index scans vs. table scans, and how to write high-performance SQL.',
    coverBadge: 'Deep Dive',
    featured: false,
    relatedCourse: {
      id: 'data-analysis-spreadsheets',
      title: 'Data Analytics & Spreadsheets',
      path: '/courses/data-analysis-spreadsheets'
    },
    content: [
      {
        type: 'paragraph',
        text: 'SQL is a declarative language: you describe what data you want, not how the computer must physically retrieve it from disk. To write fast, reliable queries, you must understand the logical execution pipeline of the database engine.'
      },
      {
        type: 'heading',
        text: 'The Logical Execution Order of a SQL Query'
      },
      {
        type: 'paragraph',
        text: 'While SQL queries are written starting with SELECT, the database engine processes clauses in an entirely different sequence:'
      },
      {
        type: 'list',
        items: [
          '1. FROM & JOIN: Locate source tables and compute Cartesian products or join conditions.',
          '2. WHERE: Filter rows based on predicate conditions before any grouping occurs.',
          '3. GROUP BY: Aggregate matching rows into summary groups based on common keys.',
          '4. HAVING: Filter aggregated groups using summary conditions (e.g. COUNT(*) > 5).',
          '5. SELECT: Project requested columns and compute expressions or aliases.',
          '6. DISTINCT: Eliminate duplicate rows from the projected result set.',
          '7. ORDER BY: Sort the final result set (the most expensive memory operation).',
          '8. LIMIT / OFFSET: Slice the final window of rows to return to the client.'
        ]
      },
      {
        type: 'callout',
        title: 'Why You Cannot Use SELECT Aliases in WHERE Clauses',
        text: 'Because the WHERE clause executes at Step 2 before SELECT expressions are evaluated at Step 5, the database engine does not yet recognize column aliases created in SELECT. Understanding this sequence prevents common syntax errors.'
      }
    ]
  },
  {
    id: 'socratic-method-in-technical-education',
    slug: 'socratic-method-in-technical-education',
    title: 'The Socratic Method in Technical Education: Why Asking Better Questions Beats Memorization',
    category: 'Learning Tips',
    readTime: '5 min read',
    publishedDate: 'October 17, 2026',
    author: {
      name: 'FAHMRISE Pedagogy Lab',
      role: 'Educational Psychology & Learning Science'
    },
    excerpt: 'Discover why passive video watching produces the tutorial illusion, and how active inquiry, cognitive disequilibrium, and in-browser debugging accelerate real mastery.',
    coverBadge: 'Learning Science',
    featured: false,
    relatedCourse: {
      id: 'practice',
      title: 'Practice Arena: 10 Real Projects',
      path: '/practice'
    },
    content: [
      {
        type: 'paragraph',
        text: 'Many aspiring programmers spend months watching video tutorials, feeling confident while following along, only to feel paralyzed when confronted with an empty code editor. In cognitive psychology, this phenomenon is known as the "Illusion of Competence".'
      },
      {
        type: 'heading',
        text: 'Passive Recognition vs. Active Recall'
      },
      {
        type: 'paragraph',
        text: 'Recognizing someone else\'s code requires minimal cognitive exertion. In contrast, retrieving a syntax rule or designing an algorithm from memory builds durable synaptic connections. This is why the Socratic method remains the most effective pedagogical tool in software engineering.'
      },
      {
        type: 'list',
        items: [
          'Step 1: Confront a realistic problem with constraints.',
          'Step 2: Generate an initial hypothesis and write code.',
          'Step 3: Observe runtime failure or test case failure.',
          'Step 4: Receive Socratic hints that guide you to diagnose the root cause.'
        ]
      }
    ]
  },
  {
    id: 'foundations-of-tajweed-makharij-and-sifaat',
    slug: 'foundations-of-tajweed-makharij-and-sifaat',
    title: 'Foundations of Tajweed: Understanding Makharij and Sifaat for Clear Recitation',
    category: 'Islamic Studies',
    readTime: '6 min read',
    publishedDate: 'October 14, 2026',
    author: {
      name: 'Ustadh Abdullah Omar',
      role: 'Faculty of Qur’anic Sciences'
    },
    excerpt: 'An accessible introduction to the five major articulation points (Makharij) and essential permanent characteristics (Sifaat) required for authentic and beautiful Qur’an recitation.',
    coverBadge: 'Qur’anic Sciences',
    featured: false,
    relatedCourse: {
      id: 'quran-tajweed-from-zero',
      title: 'Qur’an Recitation & Tajweed',
      path: '/courses/quran-tajweed-from-zero'
    },
    content: [
      {
        type: 'paragraph',
        text: 'The science of Tajweed (تجويد) linguistically means betterment and perfection. Technically, it refers to giving every Arabic letter its rightful articulation point (Makhraj) and its intrinsic characteristics (Sifah) during recitation.'
      },
      {
        type: 'heading',
        text: 'The Five Major Articulation Areas (Al-Makharij Al-Kulliyyah)'
      },
      {
        type: 'list',
        items: [
          '1. Al-Jawf (The Oral & Throat Cavity): Source of the three prolonged vowel letters (Alif, Waw, Yaa).',
          '2. Al-Halq (The Throat): Divided into bottom, middle, and top throat, producing throat letters (Hamzah, Haa, \'Ayn, Haa, Ghayn, Khaa).',
          '3. Al-Lisaan (The Tongue): The most extensive articulation organ, producing 18 distinct Arabic consonants.',
          '4. Ash-Shafatayn (The Lips): Source of Baa, Meem, Waw, and Faa.',
          '5. Al-Khayshum (The Nasal Cavity): Origin of the resonant Ghunnah sound.'
        ]
      },
      {
        type: 'callout',
        title: 'Free & Accessible to All Learners',
        text: 'All six canonical Islamic Studies courses on FAHMRISE — including Tajweed, Hadith, Tafsir, Salah, Aqeedah, and Adab — are completely free and openly accessible to all learners worldwide.'
      }
    ]
  },
  {
    id: 'building-a-job-ready-tech-portfolio',
    slug: 'building-a-job-ready-tech-portfolio',
    title: 'Building a Job-Ready Tech Portfolio in 2026: 5 Real Projects That Employers Value',
    category: 'Career Skills',
    readTime: '6 min read',
    publishedDate: 'October 10, 2026',
    author: {
      name: 'FAHMRISE Career Services',
      role: 'Talent & Industry Partnerships'
    },
    excerpt: 'Move beyond generic tutorial clones. Discover five commercial-grade projects that demonstrate database modeling, authentication, security, and full-stack deployment to hiring managers.',
    coverBadge: 'Career Guide',
    featured: false,
    relatedCourse: {
      id: 'fullstack-projects',
      title: 'Full Stack Projects & Deployment',
      path: '/fullstack-projects'
    },
    content: [
      {
        type: 'paragraph',
        text: 'Tech recruiters and senior engineering managers review hundreds of developer portfolios every week. The easiest way to get rejected is showcasing identical tutorial projects like simple to-do lists or unstyled calculator clones.'
      },
      {
        type: 'heading',
        text: 'What Technical Employers Actually Look For'
      },
      {
        type: 'list',
        items: [
          '1. Full-Stack Data Persistence: A database schema with relationships, foreign keys, and indexes.',
          '2. Security & RBAC: Token-based authentication (JWT/bcrypt), role-based route guards, and input sanitization.',
          '3. Real-World API Integration: Handling webhooks, payment callbacks, or third-party REST services.',
          '4. Live Cloud Deployment: Running live on public infrastructure with HTTPS, domain routing, and CI/CD pipelines.',
          '5. Clean Code Architecture: Modular project structure, clear documentation, and error handling.'
        ]
      }
    ]
  }
];

export function getBlogPostBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().trim();
  return BLOG_POSTS.find(post => post.slug === cleanSlug || post.id === cleanSlug) || null;
}

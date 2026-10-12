import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';

// Suppress console.warn/error during test
const origWarn = console.warn;
const origError = console.error;
console.warn = () => {};
console.error = () => {};

async function testAllPages() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'silent'
  });

  const pages = [
    './src/pages/HomePage.jsx',
    './src/pages/BookCatalogPage.jsx',
    './src/pages/BookProductPage.jsx',
    './src/pages/ArabicTrackPage.jsx',
    './src/pages/BecomeCoachPage.jsx',
    './src/pages/DashboardPage.jsx',
    './src/pages/ReaderPage.jsx',
    './src/pages/PracticePage.jsx',
    './src/pages/QuizPage.jsx',
    './src/pages/MiniProjectPage.jsx',
    './src/pages/ProfilePage.jsx',
    './src/pages/AiTutorPage.jsx',
    './src/pages/LoginPage.jsx',
    './src/pages/SignupPage.jsx',
    './src/pages/ForgotPasswordPage.jsx',
    './src/pages/ResetPasswordPage.jsx',
    './src/pages/CertificateVerifyPage.jsx',
    './src/pages/AdminPage.jsx',
    './src/pages/InstructorDashboardPage.jsx',
    './src/pages/CheckoutPage.jsx',
    './src/components/layout/Navbar.jsx',
    './src/components/layout/Footer.jsx',
    './src/components/ai/AiTutorDrawer.jsx',
    './src/components/arabic/LetterShapeVisualizer.jsx',
    './src/components/coach/CoachApplicationModal.jsx'
  ];

  delete globalThis.document;
  delete globalThis.window;
  globalThis.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  };

  let passed = 0;
  let failed = 0;
  const failures = [];

  for (const pagePath of pages) {
    try {
      const module = await vite.ssrLoadModule(pagePath);
      const Component = module.default;
      if (!Component) {
        throw new Error(`No default export found in ${pagePath}`);
      }
      
      const { MemoryRouter } = await vite.ssrLoadModule('react-router-dom');
      const { AuthProvider } = await vite.ssrLoadModule('./src/context/AuthContext.jsx');
      const { ProgressProvider } = await vite.ssrLoadModule('./src/context/ProgressContext.jsx');
      
      const tree = React.createElement(
        AuthProvider,
        null,
        React.createElement(
          ProgressProvider,
          null,
          React.createElement(
            MemoryRouter,
            { initialEntries: ['/'] },
            React.createElement(Component, { isOpen: true, onClose: () => {} })
          )
        )
      );
      const html = renderToString(tree);
      process.stdout.write(`✅ ${pagePath}\n`);
      passed++;
    } catch (err) {
      process.stdout.write(`❌ ${pagePath}\n`);
      failures.push({ pagePath, error: err.stack || err.message });
      failed++;
    }
  }

  await vite.close();
  process.stdout.write(`\n=========================================\n`);
  process.stdout.write(`TOTAL: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}\n`);
  process.stdout.write(`=========================================\n`);

  if (failures.length > 0) {
    process.stdout.write(`\nFAILURES DETAILS:\n`);
    for (const f of failures) {
      process.stdout.write(`\n--- ${f.pagePath} ---\n${f.error}\n`);
    }
    process.exit(1);
  }
}

testAllPages();

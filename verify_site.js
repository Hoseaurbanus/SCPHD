const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:3000';
const OUT = '/tmp/screenshots';
fs.mkdirSync(OUT, { recursive: true });

const PAGES = [
  { name: 'home', action: null },
  { name: 'about', action: async (p) => { await p.click('text=About'); await p.waitForTimeout(600); } },
  { name: 'programs', action: async (p) => { await p.click('text=Programs'); await p.waitForTimeout(600); } },
  { name: 'donate', action: async (p) => { await p.click('text=Donate'); await p.waitForTimeout(600); } },
  { name: 'contact', action: async (p) => { await p.click('text=Contact'); await p.waitForTimeout(600); } },
  { name: 'login', action: async (p) => { await p.click('text=Sign In'); await p.waitForTimeout(600); } },
];

(async () => {
  const browser = await chromium.launch();
  const issues = [];

  // Desktop viewport
  const desktopCtx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const dp = await desktopCtx.newPage();
  dp.on('console', msg => { if (msg.type() === 'error') issues.push(`[console error] ${msg.text()}`); });
  dp.on('pageerror', err => issues.push(`[page error] ${err.message}`));

  await dp.goto(BASE, { waitUntil: 'networkidle' });
  await dp.waitForTimeout(1500);

  for (const { name, action } of PAGES) {
    if (action) {
      await dp.goto(BASE, { waitUntil: 'domcontentloaded' });
      await dp.waitForTimeout(400);
      await action(dp);
    }
    await dp.waitForTimeout(500);
    await dp.screenshot({ path: `${OUT}/${name}_desktop.png`, fullPage: true });
  }

  // Mobile viewport (375px iPhone SE)
  const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  const mp = await mobileCtx.newPage();
  mp.on('pageerror', err => issues.push(`[mobile error] ${err.message}`));

  for (const { name, action } of PAGES) {
    await mp.goto(BASE, { waitUntil: 'domcontentloaded' });
    await mp.waitForTimeout(400);
    if (action) await action(mp);
    await mp.waitForTimeout(500);
    await mp.screenshot({ path: `${OUT}/${name}_mobile.png`, fullPage: true });
  }

  // Tablet viewport (768px iPad)
  const tabCtx = await browser.newContext({ viewport: { width: 768, height: 1024 }, hasTouch: true });
  const tp = await tabCtx.newPage();
  for (const pg of ['home', 'programs']) {
    await tp.goto(BASE, { waitUntil: 'domcontentloaded' });
    await tp.waitForTimeout(400);
    if (pg === 'programs') { await tp.click('text=Programs'); await tp.waitForTimeout(600); }
    await tp.screenshot({ path: `${OUT}/${pg}_tablet.png`, fullPage: true });
  }

  // Interactive tests
  // 1. Mobile menu
  await mp.goto(BASE, { waitUntil: 'domcontentloaded' });
  await mp.waitForTimeout(500);
  await mp.click('[aria-label="Toggle menu"]');
  await mp.waitForTimeout(400);
  await mp.screenshot({ path: `${OUT}/mobile_menu_open.png` });

  // 2. Programs filter
  await dp.goto(BASE, { waitUntil: 'domcontentloaded' });
  await dp.click('text=Programs');
  await dp.waitForTimeout(600);
  await dp.click('text=Healthcare');
  await dp.waitForTimeout(400);
  await dp.screenshot({ path: `${OUT}/programs_filtered.png`, fullPage: false });

  // 3. Program modal
  await dp.click('.cursor-pointer >> nth=0');
  await dp.waitForTimeout(400);
  await dp.screenshot({ path: `${OUT}/program_modal.png` });
  await dp.keyboard.press('Escape');

  // 4. Donate flow
  await dp.goto(BASE, { waitUntil: 'domcontentloaded' });
  await dp.click('text=Donate');
  await dp.waitForTimeout(600);
  await dp.click('text=Continue →');
  await dp.waitForTimeout(300);
  await dp.screenshot({ path: `${OUT}/donate_step2.png` });

  // 5. Login form
  await dp.goto(BASE, { waitUntil: 'domcontentloaded' });
  await dp.click('text=Sign In');
  await dp.waitForTimeout(600);
  await dp.screenshot({ path: `${OUT}/login_desktop.png` });
  await dp.click('text=Create Account');
  await dp.waitForTimeout(400);
  await dp.screenshot({ path: `${OUT}/login_register.png` });

  // 6. FAQ accordion
  await dp.click('text=Contact');
  await dp.waitForTimeout(600);
  await dp.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.7));
  await dp.waitForTimeout(300);
  await dp.click('text=How is my donation used?');
  await dp.waitForTimeout(400);
  await dp.screenshot({ path: `${OUT}/faq_open.png` });

  // 7. Portal
  await dp.goto(BASE, { waitUntil: 'domcontentloaded' });
  await dp.click('text=Sign In');
  await dp.waitForTimeout(600);
  // Submit login
  await dp.fill('input[type="email"]', 'test@test.com');
  await dp.fill('input[type="password"]', 'password123');
  await dp.click('button[type="submit"]');
  await dp.waitForTimeout(2500); // wait for redirect
  await dp.screenshot({ path: `${OUT}/portal_dashboard.png` });
  // Try portal tabs
  await dp.click('text=My Missions');
  await dp.waitForTimeout(400);
  await dp.screenshot({ path: `${OUT}/portal_missions.png` });
  await dp.click('text=My Impact');
  await dp.waitForTimeout(400);
  await dp.screenshot({ path: `${OUT}/portal_impact.png` });

  await browser.close();

  console.log('ISSUES:', issues.length ? issues.join('\n') : 'none');
  console.log('Screenshots saved to', OUT);
  fs.readdirSync(OUT).forEach(f => console.log(' -', f));
})();

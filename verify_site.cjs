const { chromium } = require('playwright');
const fs = require('fs');

const BASE = 'http://localhost:3000';
const OUT = '/tmp/screenshots';
fs.mkdirSync(OUT, { recursive: true });

const safe = async (label, fn) => {
  try { await fn(); } catch(e) { console.log(`⚠ SKIP [${label}]: ${e.message.split('\n')[0]}`); }
};

(async () => {
  const browser = await chromium.launch();
  const issues = [];

  // ── DESKTOP ─────────────────────────────────────────────────
  const dCtx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const dp = await dCtx.newPage();
  dp.on('pageerror', e => issues.push(`PAGE_ERROR: ${e.message}`));
  dp.on('console', m => { if (m.type()==='error') issues.push(`CONSOLE_ERROR: ${m.text()}`); });

  await dp.goto(BASE, { waitUntil: 'networkidle' });
  await dp.waitForTimeout(1500);
  await dp.screenshot({ path: `${OUT}/01_home_desktop.png`, fullPage: true });

  await safe('about', async () => {
    await dp.click('nav button:has-text("About")');
    await dp.waitForTimeout(700);
    await dp.screenshot({ path: `${OUT}/02_about_desktop.png`, fullPage: true });
  });

  await safe('programs', async () => {
    await dp.click('nav button:has-text("Programs")');
    await dp.waitForTimeout(700);
    await dp.screenshot({ path: `${OUT}/03_programs_desktop.png`, fullPage: true });
    // filter
    await dp.click('button:has-text("Healthcare")');
    await dp.waitForTimeout(400);
    await dp.screenshot({ path: `${OUT}/04_programs_filtered.png` });
    // card click
    await dp.locator('article').first().click();
    await dp.waitForTimeout(500);
    await dp.screenshot({ path: `${OUT}/05_program_modal.png` });
    await dp.keyboard.press('Escape');
  });

  await safe('donate', async () => {
    await dp.click('nav button:has-text("Donate")');
    await dp.waitForTimeout(700);
    await dp.screenshot({ path: `${OUT}/06_donate_desktop.png`, fullPage: true });
    await dp.locator('button:has-text("Continue")').first().click();
    await dp.waitForTimeout(400);
    await dp.screenshot({ path: `${OUT}/07_donate_step2.png` });
  });

  await safe('contact', async () => {
    await dp.click('nav button:has-text("Contact")');
    await dp.waitForTimeout(700);
    await dp.screenshot({ path: `${OUT}/08_contact_desktop.png`, fullPage: true });
    await dp.locator('text=How is my donation used?').click();
    await dp.waitForTimeout(400);
    await dp.screenshot({ path: `${OUT}/09_faq_open.png` });
  });

  await safe('login', async () => {
    await dp.click('button:has-text("Sign In")');
    await dp.waitForTimeout(700);
    await dp.screenshot({ path: `${OUT}/10_login_desktop.png` });
    await dp.click('button:has-text("Create Account")');
    await dp.waitForTimeout(400);
    await dp.screenshot({ path: `${OUT}/11_login_register.png` });
    // sign in + portal
    await dp.click('button:has-text("Sign In"):not([type])');
    await dp.waitForTimeout(300);
    await dp.fill('input[type="email"]', 'test@test.com');
    await dp.fill('input[type="password"]', 'pass1234');
    await dp.click('button[type="submit"]');
    await dp.waitForTimeout(3000);
    await dp.screenshot({ path: `${OUT}/12_portal_dashboard.png` });
    // portal tabs
    for (const tab of ['Missions', 'Impact', 'Resources', 'Profile']) {
      await safe(`portal-${tab}`, async () => {
        await dp.click(`button:has-text("${tab}")`);
        await dp.waitForTimeout(400);
        await dp.screenshot({ path: `${OUT}/13_portal_${tab.toLowerCase()}.png` });
      });
    }
  });

  // ── MOBILE 375px ────────────────────────────────────────────
  const mCtx = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  const mp = await mCtx.newPage();
  mp.on('pageerror', e => issues.push(`MOBILE_ERROR: ${e.message}`));

  await mp.goto(BASE, { waitUntil: 'networkidle' });
  await mp.waitForTimeout(1200);
  await mp.screenshot({ path: `${OUT}/20_home_mobile.png`, fullPage: true });

  await safe('mobile-menu', async () => {
    await mp.click('[aria-label="Toggle menu"]');
    await mp.waitForTimeout(400);
    await mp.screenshot({ path: `${OUT}/21_mobile_menu_open.png` });
  });

  const mobilePages = [
    { name: 'about', text: 'About' },
    { name: 'programs', text: 'Programs' },
    { name: 'donate', text: 'Donate Now' },
    { name: 'contact', text: 'Contact' },
  ];
  for (const { name, text } of mobilePages) {
    await safe(`mobile-${name}`, async () => {
      await mp.goto(BASE, { waitUntil: 'domcontentloaded' });
      await mp.waitForTimeout(400);
      await mp.click('[aria-label="Toggle menu"]');
      await mp.waitForTimeout(300);
      await mp.locator(`button:has-text("${text}")`).first().click();
      await mp.waitForTimeout(700);
      await mp.screenshot({ path: `${OUT}/m_${name}.png`, fullPage: true });
    });
  }

  await safe('mobile-login', async () => {
    await mp.goto(BASE, { waitUntil: 'domcontentloaded' });
    await mp.click('[aria-label="Toggle menu"]');
    await mp.waitForTimeout(300);
    await mp.click('button:has-text("Sign In")');
    await mp.waitForTimeout(700);
    await mp.screenshot({ path: `${OUT}/m_login.png` });
    await mp.fill('input[type="email"]', 'test@test.com');
    await mp.fill('input[type="password"]', 'pass1234');
    await mp.click('button[type="submit"]');
    await mp.waitForTimeout(3000);
    await mp.screenshot({ path: `${OUT}/m_portal.png` });
  });

  // ── TABLET 768px ────────────────────────────────────────────
  const tCtx = await browser.newContext({ viewport: { width: 768, height: 1024 }, hasTouch: true });
  const tp = await tCtx.newPage();
  tp.on('pageerror', e => issues.push(`TABLET_ERROR: ${e.message}`));
  await tp.goto(BASE, { waitUntil: 'networkidle' });
  await tp.waitForTimeout(1000);
  await tp.screenshot({ path: `${OUT}/30_home_tablet.png`, fullPage: true });
  await safe('tablet-about', async () => {
    await tp.click('nav button:has-text("About")');
    await tp.waitForTimeout(600);
    await tp.screenshot({ path: `${OUT}/31_about_tablet.png`, fullPage: true });
  });
  await safe('tablet-donate', async () => {
    await tp.click('nav button:has-text("Donate")');
    await tp.waitForTimeout(600);
    await tp.screenshot({ path: `${OUT}/32_donate_tablet.png`, fullPage: true });
  });

  await browser.close();

  console.log('\n=== RUNTIME ISSUES ===');
  if (issues.length === 0) console.log('  None');
  else issues.forEach(i => console.log(' ', i));
  console.log('\n=== SCREENSHOTS ===');
  fs.readdirSync(OUT).sort().forEach(f => console.log(' ', f));
})();

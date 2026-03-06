import puppeteer from 'puppeteer';
const url = process.argv[2] || 'http://localhost:3000';
const scrollY = parseInt(process.argv[3] || '0');
const dir = './temporary screenshots';

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 20000 });
await page.evaluate(() => document.querySelectorAll('.fade-up').forEach(el => el.classList.add('in')));
await page.evaluate((y) => window.scrollTo(0, y), scrollY);
await new Promise(r => setTimeout(r, 300));
const n = Date.now();
const path = `${dir}/section-${n}.png`;
await page.screenshot({ path, fullPage: false });
await browser.close();
console.log(`Saved: ${path}`);

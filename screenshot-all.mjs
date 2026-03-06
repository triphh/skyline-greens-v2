import puppeteer from 'puppeteer';
import fs from 'fs';

const url = 'http://localhost:3000';
const dir = './temporary screenshots';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 20000 });
await page.evaluate(() => document.querySelectorAll('.fade-up').forEach(el => el.classList.add('in')));
await new Promise(r => setTimeout(r, 500));

const sections = [0, 900, 1800, 2700, 3600, 4500];
for (const y of sections) {
  await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
  await new Promise(r => setTimeout(r, 200));
  const ts = Date.now();
  await page.screenshot({ path: `${dir}/v2-${y}-${ts}.png`, fullPage: false });
  console.log(`Captured y=${y}`);
}

await browser.close();
console.log('Done');

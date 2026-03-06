import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
await page.evaluate(() => document.querySelectorAll('.fade-up').forEach(el => el.classList.add('in')));
const h = await page.evaluate(() => document.body.scrollHeight);
console.log('Page height:', h);
await browser.close();

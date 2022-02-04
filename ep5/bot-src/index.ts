import { config as configureEnv } from 'dotenv';
import puppeteer from 'puppeteer'; // Documentation: https://pptr.dev/
import crypto from 'crypto';
import TypeRealistic from './lib/realistic-typing';

configureEnv(); // Load environment from .env file

const main = async () => {
  const browser = await puppeteer.launch({
    headless: false, // Setting this to true will hide the browser's GUI
  });
  const page = await browser.newPage();
  console.log('Navigating to site');
  await page.goto(process.env.SITE_URL ?? 'http://localhost:3000');

  console.log('Typing email');
  const emailInput = await page.$('input[name="email"]');
  await TypeRealistic(emailInput, 'jasonn@referralcandy.com');

  console.log('Typing password');
  const password = crypto.randomBytes(16).toString('hex');
  const passwordInput = await page.$('input[name="password"]');
  console.log('Password to type', password);
  await TypeRealistic(passwordInput, password);
  await passwordInput.press('Enter');
  console.log('Loggin in');

  await page.waitForNavigation({
    waitUntil: 'networkidle2', // waits for all the scripts to load
  });
  const newUrl = await page.url();
  console.log('Dashboard URL', newUrl);

  await browser.close();
};

main();

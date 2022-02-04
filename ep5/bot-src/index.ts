import { config as configureEnv } from 'dotenv';
import puppeteer, { ElementHandle } from 'puppeteer'; // Documentation: https://pptr.dev/
import crypto from 'crypto';

configureEnv(); // Load environment from .env file

type Realism = 'TYPO' | 'CLEARALL';

const typeRealistic = async (
  elementHandle: ElementHandle,
  input: string,
  minDelay: number = 25,
  maxDelay: number = 150
) => {
  const realismType: Realism =
    Math.round(Math.random()) == 0 ? 'TYPO' : 'CLEARALL';
  let typoIndex = Math.floor(Math.random() * (input.length - 1));

  for (let i = 0; i < input.length; i++) {
    const realisticDelay = Math.floor(Math.random() * maxDelay) + minDelay;

    if (i == typoIndex) {
      if (realismType === 'TYPO') {
        await elementHandle.type(crypto.randomBytes(1).toString('hex')[0], {
          delay: realisticDelay,
        });
        await elementHandle.press('Backspace', { delay: realisticDelay });
        await elementHandle.type(input[i], {
          delay: realisticDelay,
        });
      } else if (realismType === 'CLEARALL') {
        for (let j = 0; j < i; j++) {
          await elementHandle.press('Backspace', { delay: realisticDelay });
        }
        typoIndex = -1;
        i = 0;
      }
    } else {
      await elementHandle.type(input[i], {
        delay: realisticDelay,
      });
    }
  }
};

const main = async () => {
  const browser = await puppeteer.launch({
    headless: false, // Setting this to true will hide the browser's GUI
  });
  const page = await browser.newPage();
  console.log('Navigating to site');
  await page.goto(process.env.SITE_URL ?? 'http://localhost:3000');

  console.log('Typing email');
  const emailInput = await page.$('input[name="email"]');
  await typeRealistic(emailInput, 'jasonn@referralcandy.com');

  console.log('Typing password');
  const password = crypto.randomBytes(16).toString('hex');
  const passwordInput = await page.$('input[name="password"]');
  console.log('Password to type', password);
  await typeRealistic(passwordInput, password);
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

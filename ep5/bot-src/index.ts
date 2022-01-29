import { config as configureEnv } from "dotenv";
import puppeteer from "puppeteer"; // Documentation: https://pptr.dev/

configureEnv(); // Load environment from .env file

const main = async() => {
  const browser = await puppeteer.launch({
    headless: false // Setting this to true will hide the browser's GUI
  })
  const page = await browser.newPage();
  await page.goto(process.env.SITE_URL ?? 'http://localhost:3000')
  await page.screenshot({
    path: `./${process.env.OUTPUT_DIR}/${Date.now()}.png`,
    fullPage: true
  })

  await browser.close()
}

main()

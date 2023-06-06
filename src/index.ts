import puppeteer from 'puppeteer';

const url = 'https://s4n-soccer.vercel.app';
const login = `${url}/login`
const user = process.env.FOOTBALL_USER ?? '';
const pass = process.env.FOOTBALL_PASS ?? '';

async function run () {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto(login);
    const mailElement = await page.waitForSelector('#input-username');
    const passwordElement = await page.waitForSelector('#input-password');
    const submit = await page.waitForSelector('button[type="submit"]');
    
    await mailElement?.type(user);
    await passwordElement?.type(pass);
    
    await submit?.click();

    await page.waitForSelector('.mat-toolbar');
    await page.waitForSelector('#maincontent');
    await page.waitForSelector('.event-card');

    const signUp = await page.waitForSelector('.float-start.mat-primary');
    
    if(signUp) {
      console.log('>>> signup exists');
      await signUp.click();
      console.log('>>> signed up')
    } else {
      console.log('>>> go to players page');
      const gotoEvent = await page.waitForSelector('button[color="primary"]');
      await gotoEvent?.click();

      const signupButton = await page.waitForSelector('.ng-star-inserted');
      await signupButton?.click();
    }

    await page.waitForSelector('.mat-warn');
    await page.screenshot({path: 'screenshot.png'});
    browser.close();
}
run();
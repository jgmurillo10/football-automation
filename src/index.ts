import puppeteer from 'puppeteer';

const url = 'https://s4n-soccer.vercel.app';
const login = `${url}/login`
const user = process.env.USER ?? '';
const pass = process.env.PASS ?? '';

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

    await page.screenshot({path: 'screenshot.png'});
    browser.close();
}
run();
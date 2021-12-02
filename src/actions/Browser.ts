import puppeteer, { Page } from 'puppeteer';

export default class Browser {
  
  public async launchPuppeteer() {
    try {
      const browser = await puppeteer.launch({ headless: false })
      return browser;
    } catch (err) {
      console.log(err);
      throw "Error while launching puppeteer";
    }
  }

  public async launchBrowser(browser: puppeteer.Browser): Promise<Page> {
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1366, height: 768 });
      return page;
    } catch (err) {
      throw "Error while launching browser";
    }
  }
}

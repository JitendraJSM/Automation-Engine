const { getBrowser } = require("../utils/getBrowser.js");
const PageClass = require("./PageClass.js");
class BrowserInstanceClass {
  constructor(app) {
    this.app = app;
  }

  // 1. Start / Open this.state.nextProfileNumber / Connect to browser
  async initializeBrowser() {
    try {
      console.log(`Initializing browser...`);

      this.state.browserOptions = {
        profileTarget: this.state.nextAvailableChromeProfile,
      };

      // Initialize browser and page
      const result = await getBrowser(this.state.browserOptions);
      this.browser = result.browser;
      this.page = new PageClass(result.page);

      return this;
    } catch (error) {
      console.error("Failed to initialize browser:", error);
      throw error;
    }
  }

  // 2.

  async printAllPagesURLs() {
    let pages = await this.browser.pages();

    // Replace each page object with its URL
    pages = await Promise.all(pages.map(async (page) => await page.url()));
    console.log(`pages : ${pages}`);
  }
}
module.exports = BrowserInstanceClass;

// -- All The Functions related to Chrome Browser --
// === Interface ===
module.exports = {
  initializeBrowser,
  printAllPagesURLs,
};
// === Implementation ===

// 1. Start / Open this.state.nextProfileNumber / Connect to browser
async function initializeBrowser() {
  let { getBrowser } = require("../utils/getBrowser.js");
  let hookMethodsOnPage = require("../functionsLibrary/pageHookFunctions.js");
  try {
    console.log(`Initializing browser...`);

    this.state.browserOptions = {
      profileTarget: this.state.nextAvailableChromeProfile,
    };

    // Initialize browser and page
    const result = await getBrowser(this.state.browserOptions);
    this.browser = result.browser;
    this.page = result.page;
    hookMethodsOnPage.call(this, this.page);

    return true;
  } catch (error) {
    console.error("Failed to initialize browser:", error);
    throw error;
  }
}

async function printAllPagesURLs() {
  let pages = await this.browser.pages();

  // Replace each page object with its URL
  pages = await Promise.all(pages.map(async (page) => await page.url()));
  console.log(`pages : ${pages}`);
}

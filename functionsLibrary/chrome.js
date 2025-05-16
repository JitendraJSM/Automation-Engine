const hookMethodsOnPage = require("../functionsLibrary/pageHookFunctions.js");
// -- All The Functions related to Chrome Browser --
// === Interface ===
module.exports = {
  initializeBrowser,
  printAllPagesURLs,
  ReconnectBrowser,
  checkChromeProfileOwner,
};
// === Implementation ===

// 1. Start / Open this.state.nextProfileNumber / Connect to browser
async function initializeBrowser() {
  let { getBrowser } = require("../utils/getBrowser.js");

  try {
    console.log(`Initializing browser...`);

    this.state.browserOptions = {
      profileTarget: this.state.nextAvailableChromeProfile,
    };

    // Initialize browser and page
    const result = await getBrowser(this.state.browserOptions);
    this.browser = result.browser;
    // this.popUpFunctions.popUpHandler.call(this);

    this.page = result.page;
    hookMethodsOnPage.call(this, this.page);

    // Extra code that is not neccessary but useful
    const context = this.browser.defaultBrowserContext();
    await context.overridePermissions("https://www.youtube.com/", []);

    return true;
  } catch (error) {
    console.error("Failed to initialize browser:", error);
    throw error;
  }
}
// 2. Delete this.browser and Reconnect to browser
async function ReconnectBrowser() {
  let { getBrowser } = require("../utils/getBrowser.js");

  try {
    console.log(`Reconnecting browser...`);

    if (this.browser) delete this.browser;

    this.state.browserOptions = {
      profileTarget: this.state.nextAvailableChromeProfile,
    };

    // Initialize browser and page
    const result = await getBrowser(this.state.browserOptions);
    this.browser = result.browser;
    // this.popUpFunctions.popUpHandler.call(this);

    this.page = result.page;
    hookMethodsOnPage.call(this, this.page);

    // Extra code that is not neccessary but useful
    const context = this.browser.defaultBrowserContext();
    await context.overridePermissions("https://www.youtube.com/", []);

    return true;
  } catch (error) {
    console.error("Failed to initialize browser:", error);
    throw error;
  }
}

// 3. Check currently opend chrome profileOwner
async function checkChromeProfileOwner() {
  if (!this.browser) {
    console.log(`Browser not initialized to check profileOwner`);
    return;
  }
  if (this.page.url() !== "https://www.youtube.com/");
  await this.page.navigateTo("https://www.youtube.com/");
  await this.page.waitForPageLoad();
  await this.page.clickNotClickable("#avatar-btn");

  let name = await (await this.page.locator("#account-name").waitHandle()).evaluate((el) => el.innerText);
  let email = await (await this.page.locator("#email").waitHandle()).evaluate((el) => el.innerText);
  console.log(`Profile Owner: ${name} (${email})`);
}

async function printAllPagesURLs() {
  let pages = await this.browser.pages();

  // Replace each page object with its URL
  pages = await Promise.all(pages.map(async (page) => await page.url()));
  console.log(`pages : ${pages}`);
}

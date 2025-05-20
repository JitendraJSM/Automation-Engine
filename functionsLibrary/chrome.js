const hookMethodsOnPage = require("../functionsLibrary/pageHookFunctions.js");
// -- All The Functions related to Chrome Browser --

// === Implementation ===

// 1. Start / Open this.state.nextProfileNumber / Connect to browser
const initializeBrowser = async function () {
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
};
// 2. Delete this.browser and Reconnect to browser
const ReconnectBrowser = async function () {
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
};

// 3. Check currently opend chrome profileOwner
const checkChromeProfileOwner = async function () {
  if (!this.browser) {
    console.log(`Browser not initialized to check profileOwner`);
    return;
  }
  // 1. Getting Current Profile Owner name and Email
  if (this.page.url() !== "https://www.youtube.com/");
  await this.page.navigateTo("https://www.youtube.com/");
  await this.page.waitForPageLoad();
  await this.page.clickNotClickable("#avatar-btn");

  const name = await (await this.page.locator("#account-name").waitHandle()).evaluate((el) => el.innerText);
  const email = await (await this.page.locator("#email").waitHandle()).evaluate((el) => el.innerText);
  await this.utils.randomDelay(1, 0.5);
  // 2. Getting Current Profile number
  await this.page.navigateTo("chrome://version/");
  await this.page.waitForPageLoad();
  const path = await this.page.getText("#profile_path");
  const currentProfileTArget = 1 * path.split(" ")[1];
  this.state.nextAvailableChromeProfile = currentProfileTArget;

  if (!name || !email || !currentProfileTArget) {
    console.log(`Profile Owner not found`);
    return;
  }
  this.state.isCheckChromeProfileOwnerExecuted = true;
  this.state.profileOwner = name;
  this.state.profileOwnerEmail = email;
  this.state.profileTarget = currentProfileTArget;
  console.log(`Profile Owner: ${name} (${email} & ${currentProfileTArget}.)`);
};

const printAllPagesURLs = async function () {
  let pages = await this.browser.pages();

  // Replace each page object with its URL
  pages = await Promise.all(pages.map(async (page) => await page.url()));
  console.log(`pages : ${pages}`);
};

// === Interface ===
const catchAsync = require("../utils/catchAsync.js");
module.exports = {
  initializeBrowser: catchAsync(initializeBrowser),
  printAllPagesURLs: catchAsync(printAllPagesURLs),
  ReconnectBrowser: catchAsync(ReconnectBrowser),
  checkChromeProfileOwner: catchAsync(checkChromeProfileOwner),
};

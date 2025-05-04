// Requiremented methods on page objects:
/* 
  

  2. getElementByText(text, options) 
              - waitForPageLoad()
              - waits for element to be visible on the page "options.timeOut"
              - returns element if element is found,
              - returns false if element is not found within "options.timeOut"
              - throws an error if "options.continueOnError" is set to "true"
              Note - this method waits and returns the first element that has the text exactly or partially matches the argument text.
              - if parent element of text is known then pass that as options.parentElement. (for specificity.)
*/
// If Proxy create random errors, then use different approach.
// === Interface ===
module.exports = hookMethodsOnPage;

// === Implementation ===
async function hookMethodsOnPage(page) {
  page.waitForPageLoad = waitForPageLoad.bind(this);
  page.navigateTo = navigateTo.bind(this);
  page.waitForElementRobust = waitForElementRobust.bind(this);
  page.getText = getText.bind(this);
  page.typeHuman = typeHuman.bind(this);
  page.checkVisibilityBeforeClick = checkVisibilityBeforeClick.bind(this);
  page.clickNotClickable = clickNotClickable.bind(this);
  page.waitForURLChange = waitForURLChange.bind(this);
}

/*  1. waitForPageLoad(options)
              - if already loaded, returns true immediately
              - waits for page to be loaded "options.timeOut"
              - returns true if page is loaded,
              - returns false if page is not loaded in "options.timeOut" 
              - throws an error if "options.continueOnError" is set to "true" */
async function waitForPageLoad(timeout = 120000) {
  return await this.page.waitForFunction(
    () => document.readyState === "complete",
    { timeout } // Set timeout to 10 minutes in rare coditions.
  );
}

async function navigateTo(url) {
  try {
    console.log(`app.page.navigateTo(${url}) called.`);

    await this.page.goto(url, {
      waitUntil: "networkidle0", // Wait until network is idle
      timeout: 300000, // 5 minutes Timeout in milliseconds
      // referer: "https://www.google.com", // Custom referer header
      // userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", // Custom user agent
      // ignoreHTTPSErrors: true, // Ignore HTTPS errors
      domContentLoaded: true, // Wait for DOMContentLoaded event
      // defaultViewport: { width: 1920, height: 1080 }, // Custom viewport settings
    });
    console.log(`Completed Navigation to ${this.page.url()}`);
  } catch (error) {
    console.log(`Error in app.page.navigateTo(${url}) is as: ${error.message}`);
  }
}
// ==========================================================================
async function waitForElementRobust(textOrSelector, options) {
  let selectorString = options?.text
    ? `::-p-text(${textOrSelector})`
    : textOrSelector;
  console.log(`textOrSelector is : ${textOrSelector}`);
  console.log(`options are : ${options}`);
  // console.log(`waitForElementRobust function called for ${selectorString}.`);
  const element = await this.page.locator(selectorString).waitHandle();
  if (!element) {
    console.log(`Element not found: ${selectorString}`);
    return false;
  } else return element;
  /*    return await utils.robustPolling(
      async (page, textOrSelector) => {
        const element = await page.locator(textOrSelector).waitHandle();
        if (!element) throw Error("Element not found.");

        const boundingBox = await element.boundingBox();
        if (boundingBox) {
          return true; // Exit on success
        } else throw Error(`Bounding not found: ${textOrSelector}.`);
      },
      options,
      this,
      textOrSelector
    );*/
}

/**
 * Attempts to click on an element that is not immediately clickable on a page.
 *
 * This method waits for the page to fully load + randomDelay(0.75), and then
 * utilizes robust polling to repeatedly try clicking on the specified element until successful.
 *
 * The element can be specified either by a selector string or directly as an element handle.
 * The method logs the action upon a successful click.
 *
 * @param {string|object} textOrSelectorOrElement - The selector string or element handle to click.
 * @throws Will throw an error if the element cannot be found or its bounding box is not available.
 */
async function clickNotClickable(textOrSelectorOrElement, options) {
  await this.page.waitForPageLoad();
  await this.utils.randomDelay(0.75);

  const waitSearchnClick = async (page, textOrSelectorOrElement, options) => {
    let element =
      typeof textOrSelectorOrElement === "string"
        ? await page.waitForElementRobust(
            textOrSelectorOrElement,
            parentElement,
            ...options
          )
        : textOrSelectorOrElement;
    if (!element) throw Error("Element not found.");

    const boundingBox = await element.boundingBox();
    if (boundingBox) {
      const { x, y, width, height } = boundingBox;
      await page.mouse.click(x + width / 2, y + height / 2);
      // await page.log("act", `Clicked on ${textOrSelectorOrElement} done.`);
      return true; // Exit on success
    } else throw Error(`Bounding not found: ${textOrSelectorOrElement}.`);
  };
  console.log(parentElement);
  await this.utils.robustPolling(
    waitSearchnClick,
    {
      maxAttempts: 9,
      delayMs: 3000,
      timeoutMs: 30000,
      retryCondition: (result) => result === true,
    },
    this.page,
    textOrSelectorOrElement,
    parentElement,
    options
  );
  await this.page.waitForPageLoad();
}
// ==========================================================================
async function getText(selector) {
  console.log(`Get Text Function Called`);
  const el = await this.page.locator(selector).waitHandle();
  const text = await this.page.evaluate((element) => element.textContent, el);
  console.log(text);
}

async function typeHuman(selector, stringToType) {
  const options = {
    backspaceMaximumDelayInMs: 750 * 2,
    backspaceMinimumDelayInMs: 750,
    chanceToKeepATypoInPercent: 0, // This controls whether to keep a typo
    maximumDelayInMs: 650,
    minimumDelayInMs: 150,
    typoChanceInPercent: 0.5,
  };

  await this.page.waitForPageLoad();

  const inputField = await this.page.locator(selector).waitHandle();
  // await inputField.focus();

  // Clear the input field
  await inputField.evaluate((el) => (el.value = ""));

  for (let char of stringToType) {
    // Simulate typing delay
    const delay =
      Math.floor(
        Math.random() *
          (options.maximumDelayInMs - options.minimumDelayInMs + 1)
      ) + options.minimumDelayInMs;

    // Introduce a typo based on the typo chance
    let typedChar = char;
    if (Math.random() * 100 < options.typoChanceInPercent) {
      // Generate a random character to simulate a typo
      typedChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Random lowercase letter

      // Decide whether to keep the typo based on chanceToKeepATypoInPercent
      if (Math.random() * 100 < options.chanceToKeepATypoInPercent) {
        // Keep the typo as is
        await inputField.type(typedChar, { delay });
        continue; // Skip correcting this character
      } else {
        // If not keeping the typo, type the incorrect character
        await inputField.type(typedChar, { delay });

        // Simulate backspacing to remove the typo
        const backspaceDelay =
          Math.floor(
            Math.random() *
              (options.backspaceMaximumDelayInMs -
                options.backspaceMinimumDelayInMs +
                1)
          ) + options.backspaceMinimumDelayInMs;
        await utils.delay(backspaceDelay);

        // Type backspace to remove the last character (the typo)
        await inputField.press("Backspace", { delay: backspaceDelay });

        // Type the correct character
        await inputField.type(char, { delay });
        continue;
      }
    }

    // Type the character normally
    await inputField.type(typedChar, { delay });
  }
}

async function checkVisibilityBeforeClick(selector) {
  return await this.page.evaluate((selector) => {
    const subBTN = Array.from(document.querySelectorAll(selector)).find((el) =>
      el.checkVisibility()
    );
    // subBTN.click();
    // return subBTN.textContent;
    return subBTN;
  }, selector);
}

/**
 * Waits for the page URL to change from the given beforePageURL.
 *
 * The method will continuously poll the page URL until it changes or the specified timeout is reached.
 * If the timeout is reached, it will log an error and return false.
 * If the URL changes, it will wait for page load and returns the new URL.
 *
 * @param {string} beforePageURL - The URL of the page that it should wait for a change from.
 * @param {number} maxAttempts - The maximum number of attempts to check the page URL. Default is 5.
 * @param {number} delayMs - The delay in milliseconds between each attempt. Default is 3000.
 * @param {number} timeoutMs - The timeout in milliseconds after which the method will return false. Default is 30000.
 * @returns {(string | false)} The new URL if the URL changed, false otherwise.
 */
async function waitForURLChange(
  beforePageURL,
  maxAttempts = 5,
  delayMs = 3000,
  timeoutMs = 30000
) {
  let flag;
  try {
    flag = await utils.robustPolling(
      async () => {
        if (this.url() !== beforePageURL) {
          await this.waitForPageLoad();
          return this.url();
        } else return false;
      },
      {
        maxAttempts: 5,
        delayMs: 3000,
        timeoutMs: 30000,
        // retryCondition: (result) => result === true,   //uncommenting this creates an undetectable bug
      }
    );
  } catch (error) {
    console.log(`--------- Error in waitForURLChange ---------`);
    console.log(`beforePageURL: ${beforePageURL}`);
    console.log(`this.url(): ${this.url()}`);
    console.log(`error: ${error}`);
    console.log(`--------- Error in waitForURLChange ---------`);
    flag = false;
  } finally {
    return flag;
  }
}

/*
// ==== 👇🏻 Event Handler 👇🏻 ====
async function addEventHandlerOnPage() {
  // Listen for the 'load' event
  this.on("load", async () => {
    console.log("Page loaded, taking screenshot...");
    try {
      this.log("nav", `Page loaded, Page URL: ${this.url()}`);

      await this.screenshot({
        path: `./Data/Screenshots/${utils.getDateTime().split(",")[0]}__${
          this.pageNavigationList.length
        }.png`,
        fullPage: true,
      });
    } catch (error) {
      console.log(`Error taking screenshot: ${error.message}`);
      this.log("err", error.message);
    }
  });
}

// ------- Logging ------
async function log(type = "act", message) {
  // "act" = Action, "nav" = Navigation, "err" = Error
  let prefix = "";
  if (type === "act") {
    prefix = `Action ${this.actionList.length}`;
    this.actionList.push(message);
  } else if (type === "nav") {
    prefix = `Navigation ${this.pageNavigationList.length}`;
    this.pageNavigationList.push(this.url());
  } else if (type === "err") {
    prefix = `⚠️ Error ${this.errorList.length}`;
    this.errorList.push(message);
  }
  // const pathToLogFile = `./Data/Logs/${
  //   utils.getDateTime().split(",")[0]
  // }_log.txt`;
  // fs.appendFileSync(pathToLogFile, `${prefix}: ${message}\n`);
  await utils.log(`${prefix}: ${message}`);
}
*/

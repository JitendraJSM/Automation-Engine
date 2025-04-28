const fs = require("fs");
const utils = require("../utils/utils.js");
class PageClass {
  /* Static Properties Examples 
  //    static IDselectors = ["#moreButton"];  // Not Needed OLD property
  //    static pageURL = "https://www.iana.org/help/example-domains";      // OLD property
  */

  constructor(page) {
    console.log(`Page Getting Wrapped -----`);

    this.page = page; // Neccessary for Proxy

    // == Automation data ==
    this.actionList = [];
    this.pageNavigationList = [];
    this.errorList = [];
    this.value = 333;

    this.wrapedPages = []; // objects created by wraping class over page object like ChromeProfile.class.js, FacebookProfile.class.js etc.

    /* Instance Properties Examples
    this.pageName = "ianaPage";
    this.pageURL = "https://www.iana.org/help/example-domains";
    this.currentStateIndex = 0;
    this.automationQueue = [
      {
        selector: "h1",
        action: "getText",
        actionType: "pageFunction",
      },
      {
        selector: "a ::-p-text(IANA-managed Reserved Domains)",
        action: "navigateTo",
        actionType: "pageFunction",
        navigator: true,
      },
    ];
    this.currentState = this.automationQueue[this.currentStateIndex];
    */

    // Create a proxy to delegate method calls
    return new Proxy(this, {
      get(target, prop) {
        // Check if the property exists on the page instance
        if (typeof target.page[prop] === "function") {
          return (...args) => target.page[prop](...args);
        } else if (target.page[prop] !== undefined) {
          // Return the property from target.page if it exists
          return target.page[prop];
        }
        // Otherwise, return the property from target
        return target[prop];
      },
    });
  }

  //  ===== 👇🏻 Methods 👇🏻 =====
  async getText(selector) {
    console.log(`Get Text Function Called`);
    const el = await this.locator(selector).waitHandle();
    const text = await this.evaluate((element) => element.textContent, el);
    console.log(text);
  }

  async pageName() {
    console.log(`pageName function from PageClass called.`);
    return module.exports.name;
  }
  async OnlyPageClassModuleFunction() {
    console.log(`Yes, i am a method defined in Page class module.`);
  }
  async navigateTo(url) {
    try {
      console.log(`navigateTo Function Called`);
      this.goto(url);
      console.log(`going to ${url}`);
      return true;
    } catch (error) {
      console.log(`Error in navigateTo: ${error.message}`);
    }
  }

  async waitForPageLoad(timeout = 30000) {
    return await this.waitForFunction(
      () => document.readyState === "complete",
      { timeout } // Set timeout to 10 seconds
    );
  }

  async typeHuman(selector, stringToType) {
    const options = {
      backspaceMaximumDelayInMs: 750 * 2,
      backspaceMinimumDelayInMs: 750,
      chanceToKeepATypoInPercent: 0, // This controls whether to keep a typo
      maximumDelayInMs: 650,
      minimumDelayInMs: 150,
      typoChanceInPercent: 0.5,
    };

    await this.waitForPageLoad();

    const inputField = await this.locator(selector).waitHandle();
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

  async checkVisibilityBeforeClick(selector) {
    return await this.page.evaluate((selector) => {
      const subBTN = Array.from(document.querySelectorAll(selector)).find(
        (el) => el.checkVisibility()
      );
      // subBTN.click();
      // return subBTN.textContent;
      return subBTN;
    }, selector);
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
   * @param {string|object} selectorOrElement - The selector string or element handle to click.
   * @throws Will throw an error if the element cannot be found or its bounding box is not available.
   */
  async clickNotClickable(selectorOrElement) {
    await this.waitForPageLoad();
    await utils.randomDelay(0.75);

    await utils.robustPolling(
      async (page, selectorOrElement) => {
        let element =
          typeof selectorOrElement === "string"
            ? await page.locator(selectorOrElement).waitHandle()
            : selectorOrElement;
        if (!element) throw Error("Element not found.");

        const boundingBox = await element.boundingBox();
        if (boundingBox) {
          const { x, y, width, height } = boundingBox;
          await page.mouse.click(x + width / 2, y + height / 2);
          await page.log("act", `Clicked on ${selectorOrElement} done.`);
          return true; // Exit on success
        } else throw Error(`Bounding not found: ${selectorOrElement}.`);
      },
      {
        maxAttempts: 9,
        delayMs: 3000,
        timeoutMs: 30000,
        retryCondition: (result) => result === true,
      },
      this,
      selectorOrElement
    );
    await this.waitForPageLoad();
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
  async waitForURLChange(
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

  // ==== 👇🏻 Event Handler 👇🏻 ====
  async addEventHandlerOnPage() {
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
  async log(type = "act", message) {
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
}
module.exports = PageClass;

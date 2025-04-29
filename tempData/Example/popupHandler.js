const utils = require("../utils/utils.js");
const db = require("../modules/data.module.js");

async function popupHandler(page) {
  try {
    console.log(`----------Popup Handler called.---------`);
    process.env.ENVIRONMENT = "DEV";
    let { browser, page } =
      await require("../modules/browser.module.js").getBrowser(db.options);
    let flag = await utils.robustPolling(
      async () => {
        let pages = await browser.pages();
        if (pages.length > 1) return true;
        else return false;
      },
      {
        maxAttempts: 19,
        delayMs: 3000,
        timeoutMs: 60000,
        retryCondition: (result) => result === true,
      }
    );
    await utils.randomDelay(1.5, 1.0);
    if (flag) {
      let SignInPage = (await browser.pages()).find((p) =>
        p
          .url()
          .includes(
            "chrome://signin-dice-web-intercept.top-chrome/chrome-signin"
          )
      );
      await SignInPage.locator(
        "chrome-signin-app >>> #acceppt-button-content"
      ).click();
    }
  } catch (error) {
    console.log(`Error in popup Handler: ${error.message}`);
    // Do Somthing here
  }
}

module.exports.popupHandler = popupHandler;

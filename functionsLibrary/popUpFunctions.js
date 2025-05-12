// === Interface ===
module.exports = {
  privacySandboxHandler,
  popUpHandler,
};

// === Implementation ===

async function privacySandboxHandler() {
  console.log(`Privacy Sandbox handler called`);
  // If chrome is already opened, then only 1 attempt is needed
  let maxAttempts = this.state.isChromeAlreadyOpened ? 1 : 15;

  const isSinglePageOpened = async () => {
    let pages = await this.browser.pages();
    if (pages.length > 1) return true;
    else return false;
  };

  let flag = await this.monitor.robustPolling(isSinglePageOpened, {
    maxAttempts: maxAttempts,
    delayMs: 2000,
    timeoutMs: 60000,
    rejectOnEnd: false,
    retryCondition: (result) => result === true,
    endMSG: "Only 1 page found, means Privacy Sandbox Popup is not opened.",
  });
  console.log(`flag: ${flag ? `more than 1 page found` : `only 1 page found`}`);
  await this.utils.randomDelay(1.5, 1.0);
  // ============================================================
  if (flag) {
    // 3. Check for Pivacy SandBox Popup
    let privacySandBoxPage = (await this.browser.pages()).find((p) => p.url() === "chrome://privacy-sandbox-dialog/notice");
    if (privacySandBoxPage) {
      await privacySandBoxPage.locator("privacy-sandbox-notice-dialog-app >>> #ackButton").click();
      console.log(`Privacy SandBox Popup Closed`);
    }

    // 4. Check for SignIn Popup
    /*    let SignInPage = (await browser.pages()).find((p) =>
      p
        .url()
        .includes("chrome://signin-dice-web-intercept.top-chrome/chrome-signin")
    );
    SignInPage &&
      (await SignInPage.locator(
        "chrome-signin-app >>> #acceppt-button-content"
      ).click());*/
  }
  // ============================================================
}

async function popUpHandler() {
  // await privacySandboxHandler();
  console.log(`Popup handler attached to browser.`);
  // await privacySandboxHandler.call(this);
  // For Detection of a new page that can be a popup
  let handlers = {
    // url:"selectorStringToClick"
    "chrome://privacy-sandbox-dialog/notice": "privacy-sandbox-notice-dialog-app >>> #ackButton",
    "chrome://signin-dice-web-intercept.top-chrome/chrome-signin": "chrome-signin-app >>> #accept-button",
  };

  this.browser.on("targetcreated", async (target) => {
    if (target.type() === "page") {
      // const newPage = await target.page();
      // console.log("New page created:", await newPage.url());
      let newPopupPage;
      Object.keys(handlers).forEach(async (url) => {
        console.log(`-=-==-=-=-==-=-=-=-=-=-=-=-=-=-=-=`);
        console.log(`checking for: ${url}`);
        await this.page.listAllPages();

        newPopupPage = (await this.browser.pages()).find((p) => p.url() === url);
        if (newPopupPage) console.log(`Popup detected: ${url}`);
        let selector = handlers[url];
        console.log(`let's Click ${selector}`);
        console.log(`-=-==-=-=-==-=- newPopupPage: ${newPopupPage} -=-=-=-=-=-=-=-=-=-=`);
        // await newPopupPage.locator(selector).click();

        // if (newPage.url().includes(url)) {
        //   console.log(`Popup detected: ${url}`);
        //   let selector = handlers[url];
        //   // await newPage.locator(selector).click();
        //   console.log(`let's Click ${selector}`);
        //   // console.log(`Popup Closed: ${url}`);
        // }
      });
      return newPopupPage;
    }
  });
}

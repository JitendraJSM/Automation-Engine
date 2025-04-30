async function privacySandboxHandler() {
  console.log(`Privacy Sandbox handler called`);

  console.log(this);
  const privacyPopUp = "chrome://privacy-sandbox-dialog/notice";
  const isSinglePageOpened = async () => {
    let pages = await this.browser.pages();
    if (pages.length > 1) return true;
    else return false;
  };

  let flag = await this.monitor.robustPolling(isSinglePageOpened, {
    // maxAttempts: 15,
    maxAttempts: 2,
    delayMs: 2000,
    timeoutMs: 60000,
    rejectOnEnd: false,
    retryCondition: (result) => result === true,
    endMSG: "Only 1 page found, means Privacy Sandbox Popup is not opened.",
  });
  console.log(`flag: ${flag}`);
  await this.utils.randomDelay(1.5, 1.0);
  // ============================================================
  if (flag) {
    // 3. Check for Pivacy SandBox Popup
    let privacySandBoxPage = (await this.browser.pages()).find(
      (p) => p.url() === "chrome://privacy-sandbox-dialog/notice"
    );
    await privacySandBoxPage
      .locator("privacy-sandbox-notice-dialog-app >>> #ackButton")
      .click();
    console.log(`Privacy SandBox Popup Closed`);

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
module.exports.privacySandboxHandler = privacySandboxHandler;

async function popUpHandler() {
  // await privacySandboxHandler();
  // console.log(`Popup handler called`);
  // await privacySandboxHandler.call(this);
  // For a one-time detection of a new page
  //   browser.once("targetcreated", async (target) => {
  //     if (target.type() === "page") {
  //       const newPage = await target.page();
  //       console.log("New page created:", await newPage.url());
  //       return newPage;
  //     }
  //   });
}
module.exports.popUpHandler = popUpHandler;

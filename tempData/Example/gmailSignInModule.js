const { timeout } = require("puppeteer-core");
const utils = require("../utils/utils.js");

// This copy is for new Page module
// gmailSignIn() returns one of these["Signed In", "newPage", "Try again" or"false"]
module.exports.gmailSignIn = async function (page, account) {
  try {
    console.log(`gmailSignIn Started.`);
    // await page.goto("https://accounts.google.com/signup/v2/webcreateaccount");
    let gmailString = account.gmail;
    if (!gmailString)
      throw Error(`\x1b[31m⚠ ⚠ Gmail String is not provided.\x1b[0m`);
    let passwordString = account.password;
    if (!passwordString)
      throw Error(`\x1b[31m⚠ ⚠ Password String is not provided.\x1b[0m`);

    await page.waitForPageLoad();
    await utils.randomDelay(1.0, 0.85);

    // await googleSearch(page, "Youtube");          // even after adding time googleSearch sometime just disconnects the page Target. Maybe the reason is "Keyboard press event"
    // await new Promise((resolve) => setTimeout(resolve, 3000)); // Commenting this line creates a bigger bug, i.e. page gets disconnected at this point.
    await page.goto("https://www.youtube.com/", { timeout: 120000 });
    await page.waitForPageLoad();

    await page.clickNotClickable('[aria-label="Sign in"]');

    await page.clickNotClickable("#identifierId");

    await page.typeHuman("#identifierId", gmailString);

    await page.clickNotClickable("span ::-p-text(Next)");
    await utils.randomDelay(0.85);

    await page.clickNotClickable('input[type="password"]');

    await page.typeHuman('input[type="password"]', passwordString);
    await utils.randomDelay();

    await page.clickNotClickable('input[aria-labelledby="selectionc1"]'); // Show password Checkbox
    await utils.randomDelay(0.85);

    let beforePageURL = page.url();
    await page.clickNotClickable("span ::-p-text(Next)");

    // await page.clickNotClickable(` ::-p-text(${gmailString})`); // if Asked
    // await page.waitForPageLoad();

    // Wait until the page's Url changes.
    beforePageURL = await page.waitForURLChange(beforePageURL);
    await utils.randomDelay(0.85);

    if (page.url().includes("passkeyenrollment")) {
      console.log(`Page URL includes passkeyenrollment`);
      await page.clickNotClickable("span ::-p-text(Not now)");
    }

    beforePageURL = await page.waitForURLChange(beforePageURL);
    await utils.randomDelay(0.85);

    // Popup to handle generally comes here, before recovery options page.

    if (page.url().includes("recoveryoptions")) {
      console.log(`Page URL includes recoveryoptions`);
      // await page.clickNotClickable("span ::-p-text(Cancel)");
      await page.typeHuman('input[type="email"]', "rec1to100@gmail.com");
      await page.clickNotClickable("span ::-p-text(Save)");
    }

    beforePageURL = await page.waitForURLChange(beforePageURL);
    await utils.randomDelay(0.85);

    if (page.url().includes("cardIndex=1")) {
      console.log(`Page URL includes cardIndex=1`);
      await page.clickNotClickable("span ::-p-text(Not now)");

      beforePageURL = await page.waitForURLChange(beforePageURL);
    }

    if (page.url().includes("youtube.com")) {
      console.log(`Signed in completed successfully.`);
      let flag = await require("../MicroModules/popupHandler.js").popupHandler(
        page
      );
      return "Signed In";
    }
    console.log(`new type of page detected, url: ${page.url()}`);

    return "newPage";
  } catch (err) {
    console.log("Gmail Sign In Error with message:", err.message);
    if (err.message.includes("the page has been closed")) return "Try again";
    // console.log(err);
    return false;
  }
};

module.exports.checkGmail = async function (page) {
  let gmail;
  let title = await utils.robustPolling(
    async (page) => {
      await page.goto("https://mail.google.com/", {
        waitUntil: "networkidle2",
      });

      await page.waitForPageLoad();
      let pageTitle = await page.evaluate(() => document.title);
      return pageTitle;
    },
    {
      timeout: 180000,
      maxAttempts: 5,
      delayMs: 5000,
      retryCondition: (result) => result.includes("Gmail"),
    },
    page
  );
  if (title.includes("@gmail.com"))
    gmail = title.split(" ").find((str) => str.includes("@gmail.com"));
  else gmail = "Profile not Signed In yet.";
  return gmail;
};

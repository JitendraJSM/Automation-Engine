require("dotenv").config();
const utils = require("./utils/utils.js");
const db = require("./modules/data.module.js");
const PageClass = require("./Classes/PageClass.js");

async function tester1() {
  let machine = await utils.getCurrentMachineName();
}
// tester1();
// await page.locator('span:text("@")').click(); // This will click on the first span starting with '@'

async function tester() {
  console.log(`\x1b[32m======== Tester modules started. ========\x1b[0m`);
  // process.env.ENVIRONMENT = "DEV";
  let { browser, page } =
    await require("./modules/browser.module.js").getBrowser(db.options);

  page = new PageClass(page);
  //   ================= 👇🏻 Testing Logic 👇🏻 =============
  console.log(`page.url()`, page.url());
  // await page.goto("https://youtube.com/shorts/b0o-eViWuqc?si=k1kr4D8PQ_uptHAV");
  await page.waitForPageLoad();
  console.log(`okay page loaded, Now click`);

  // Locate the span element with text starting with "@"
  const subBTN = await page.checkVisibilityBeforeClick(
    '[aria-label^="Subscribe"], [aria-label^="Current setting"]'
  );
  await page.clickNotClickable(subBTN);

  // const el = await page.locator("a ::-p-text(RFC)");
  // This will click on the first span starting with '@'

  console.log(`After Clicking`, val);

  //   ================= 👆🏻 Testing Logic 👆🏻 =============
  console.log(`\x1b[32m======== Tester modules completed. ========\x1b[0m`);
}
tester();

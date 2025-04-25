// Here below given code snippet is just for example:
async function pptrConnect(wsUrl, initialURL) {
  if (!wsUrl) {
    wsUrl = await readWSfromFile();
  }

  if (!initialURL) {
    initialURL = process.env.INITIAL_URL;
  }
  // try {
  const browser = await puppeteer.connect({
    browserWSEndpoint: wsUrl,
    defaultViewport: false,
  });

  const pages = await browser.pages();
  let page;
  if (process.env.ENVIRONMENT === "development") page = pages[0];
  else {
    page =
      pages.find((p) => p.url().includes(initialURL)) ||
      pages.find(
        (p) => p.url() === "about:blank" || p.url() === "chrome://new-tab-page/"
      );

    if (!page) {
      console.log("No blank page or Chat Page found, Opening a new Page.");
      page = await browser.newPage();
    }
  }
  if (
    process.env.ALWAYS_OPEN_WITH_INITIAL_URL !== "false" ||
    !page.url().includes(initialURL)
  )
    await page.goto(initialURL, {
      waitUntil: ["load", "domcontentloaded", "networkidle0"],
      timeout: 60000,
    });
  // pages.forEach(async (p) => p.url().includes(page.url()) || (await p.close())); // Close all other pages

  await page.bringToFront();
  //   require("../utils/pageUtils.js")(page); //hookMethodsOnPage(page);

  console.log("Puppeteer Connected.");
  return { browser, page };
  // } catch (error) {
  //   console.log(`Error in pptrConnect function : `, error.message);
  //   console.log(error);
  // }
}

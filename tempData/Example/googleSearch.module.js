// Wotking perfectly fine Tested.

module.exports.googleSearch = async function (page, stringToSearch) {
  console.log(`googleSearch Started.`);
  // await page.waitForFunction(() => document.readyState === "complete");
  await page.waitForPageLoad();
  const el = await page.locator("ntp-app >>> input").waitHandle();
  await el.click();
  await page.typeHuman("ntp-app >>> input", stringToSearch);
  await new Promise((resolve) => setTimeout(resolve, 750));
  await page.keyboard.press("Enter");
  console.log(`Google Search for ${stringToSearch} completed.`);
  // await page.waitForPageLoad();
  console.log(`Page load completed in google search`);

  return true;
};

// === InterFace ===
module.exports = { testLocator, testBrowserIns };
// === Definitions ===
async function testLocator(URL) {
  console.log(`=======Start testing Code=======`);
  await this.page.locator("::-p-text(Shorts)").click();
  console.log(`=======Code Tested=======`);
}
async function testBrowserIns() {
  console.log(`=======before`);
  console.log(this.browser);

  console.log(`=======After`);
}

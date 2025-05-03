// Some Basic Functions need to be implemented here
// 1. Go to Youtube
// === Interface ===
module.exports = { clickOnShortsBTN };

// === Definitions ===
async function clickOnShortsBTN() {
  return this.page.clickNotClickable("Shorts", "span.title");
}
async function randomTrendingVideo() {
  await this.page.goto(videosURL);
  await this.page.waitForPageLoad();
}

// Some Basic Functions need to be implemented here
// 1. Go to Youtube
// === Interface ===
module.exports = {};

// === Definitions ===
async function randomTrendingVideo() {
  await this.page.goto(videosURL);
  await this.page.waitForPageLoad();
}

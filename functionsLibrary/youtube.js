// Some Basic Functions need to be implemented here
// 1. Go to Youtube
// === Interface ===
module.exports = { clickShortsBTN, clickLikeBTN };

// === Definitions ===
async function clickShortsBTN() {
  return this.page.clickNotClickable("span.title ::-p-text(Shorts)");
}
async function clickLikeBTN() {
  // This like works for both shorts or video URL
  try {
    let likeBTN = await this.page.waitForElementRobust(
      "button[aria-label^='like' i]"
    );

    const flag = await likeBTN.evaluate((el) =>
      el.getAttribute("aria-pressed")
    );

    if (flag === "true") {
      console.log(`video is already liked.`);
      return "Already liked.";
    }
    console.log(`video is not liked.`);

    await this.page.clickNotClickable(likeBTN);

    return true;
  } catch (error) {
    console.log(`Error message in clickLikeBTN(): ${error.message}`);
    return false;
  }
}

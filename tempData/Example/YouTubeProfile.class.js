const ChromeProfile = require("./ChromeProfile.class.js");
const utils = require("../utils/utils.js");

/*          Description
   1. Checks the url to decides url is channel url / shorts url / video url.
   2. Clicks on like button.
   3. Click to channel name to navigate to that channel.
   4. Waits for channel page banner to load retuns true if loaded else return false.

   Selectors: 
   - Channel name selector on shorts page : "ytd-channel-name#channel-name.style-scope.reel-player-header-renderer";   //<-- not Working hence changed to "span ::-p-text(@)"
   - Channel name selector on channel page : "ytd-channel-name#channel-name.style-scope.ytd-video-owner-renderer";
   - Page Banner selector on channal page : "#page-header-banner";
   - Like button selector on shorts & video page : "button[aria-pressed='false'][aria-label^='like']";
*/

class YoutubeProfile extends ChromeProfile {
  constructor(page) {
    super(page);
  }
  get urlType() {
    if (this.page.url().includes("shorts")) return "shorts";
    if (this.page.url().includes("watch")) return "video";
    if (this.page.url().includes("youtu.be")) return "general";
    return null;
  }

  async post() {
    return `YouTube.post`;
  }
  async like() {
    // This like works for both shorts or video URL
    try {
      let likeBTN = await this.page.locator("button[aria-label^='like']");
      let flag = await this.page.$eval("button[aria-label^='like']", (el) =>
        el.getAttribute("aria-pressed")
      );
      if (flag === "true") {
        console.log(`video is already liked.`);
        return "Already liked.";
      }

      await this.clickNotClickable(likeBTN);
      return true;
    } catch (error) {
      console.log(`Error message in like(): ${error.message}`);
      return false;
    }
  }
  async share() {
    return `YouTube.share`;
  }
  async comment() {
    return `YouTube.comment`;
  }
  async view(videosURL, videoLengthSec = 22, like = true) {
    console.log(`view function called.`);

    await this.goto(videosURL);
    await this.waitForPageLoad();

    await utils.randomDelay(videoLengthSec / 2, videoLengthSec / 2 - 2);
    if (like) await this.like();
    await utils.randomDelay(videoLengthSec / 2, videoLengthSec / 2 - 2);

    console.log(`view function ended.`);
    return true;
  }
  async navigateToChannel(URL) {
    let flag = await this.view(URL);
    if (!flag) return "navigation failed.";
    if (this.urlType === "shorts")
      await this.clickNotClickable("span ::-p-text(@)");
    if (this.urlType === "video")
      await this.clickNotClickable(
        "ytd-channel-name#channel-name.style-scope.ytd-video-owner-renderer"
      );
    await this.waitForPageLoad();
    await this.page.waitForSelector("#page-header-banner");
    await utils.randomDelay(0.85);
    console.log(`navigation to channel completed.`);

    return true;
  }
  async subscribe(url) {
    console.log(`subscribe function called.`);
    await this.navigateToChannel(url);
    await this.page.clickNotClickable(
      "span ::-p-text(Subscribe)"
      // '[aria-label^="Subscribe"], [aria-label^="Current setting"]'
    );
    return this;
  }
}
module.exports = YoutubeProfile;

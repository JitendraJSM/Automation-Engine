const { getBrowser } = require("../utils/getBrowser.js");

async function init() {
  try {
    this.state.browserOptions = {
      profileTarget: this.state.nextAvailableChromeProfile,
    };

    // Initialize browser and page
    const result = await getBrowser(this.state.browserOptions);
    this.browser = result.browser;
    this.page = result.page;

    return this;
  } catch (error) {
    console.error("Failed to initialize browser:", error);
    throw error;
  }
}
module.exports.init = init;

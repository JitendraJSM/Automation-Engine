const { getBrowser } = require("../utils/getBrowser.js");

class BrowserModule {
  constructor() {
    this.browser = null;
    this.page = null;
    this.options = {
      profileTarget: process.env.CHORME_TARGET_PROFILE,
      initialURL: process.env.INITIAL_URL,
      windowSize: [814, 859],
      windowPosition: [793, 0],
      environment: process.env.ENVIRONMENT,
    };
  }

  async init(options = {}) {
    try {
      // Merge provided options with defaults
      this.options = { ...this.options, ...options };

      // Initialize browser and page
      const result = await getBrowser(this.options);
      this.browser = result.browser;
      this.page = result.page;

      return this;
    } catch (error) {
      console.error("Failed to initialize browser:", error);
      throw error;
    }
  }

  async getCurrentPage() {
    if (!this.page) throw new Error("Browser not initialized");
    return this.page;
  }

  async getBrowserInstance() {
    if (!this.browser) throw new Error("Browser not initialized");
    return this.browser;
  }

  async close() {
    try {
      if (this.browser) {
        await this.browser.disconnect();
        this.browser = null;
        this.page = null;
      }
    } catch (error) {
      console.error("Failed to close browser:", error);
      throw error;
    }
  }

  async newPage() {
    try {
      if (!this.browser) throw new Error("Browser not initialized");
      const page = await this.browser.newPage();
      await page.bringToFront();
      return page;
    } catch (error) {
      console.error("Failed to create new page:", error);
      throw error;
    }
  }

  async closePage(page) {
    try {
      if (page && !page.isClosed()) {
        await page.close();
      }
    } catch (error) {
      console.error("Failed to close page:", error);
      throw error;
    }
  }
}

module.exports = BrowserModule;

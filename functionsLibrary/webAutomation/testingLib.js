// === InterFace ===
module.exports = { testNavigation, testBrowserIns };
// === Definitions ===
async function testNavigation() {
  console.log(`=======before===`);
  await this.page.goto("https://www.youtube.com", {
    waitUntil: "networkidle0", // Wait until network is idle
    timeout: 300000, // 5 minutes Timeout in milliseconds
    // referer: "https://www.google.com", // Custom referer header
    // userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", // Custom user agent
    // ignoreHTTPSErrors: true, // Ignore HTTPS errors
    domContentLoaded: true, // Wait for DOMContentLoaded event
    // defaultViewport: { width: 1920, height: 1080 }, // Custom viewport settings
  });
  console.log(`=======After`);
}
async function testBrowserIns() {
  console.log(`=======before`);
  console.log(this.browser);

  console.log(`=======After`);
}

const handlers = {
  // url:"selectorStringToClick"
  "chrome://privacy-sandbox-dialog/notice": "privacy-sandbox-notice-dialog-app >>> #ackButton",
  "chrome://signin-dice-web-intercept.top-chrome/chrome-signin": "chrome-signin-app >>> #accept-button",
};
// === Interface ===
module.exports = {
  // privacySandboxHandler,
  monitorPopUp,
  popUpHandler,
};

// === Implementation ===
// Given below privacySandboxHandler function is working perfectly well but sometimes it is not able to close the popup.
// async function privacySandboxHandler() {
//   console.log(`Privacy Sandbox handler called`);
//   // If chrome is already opened, then only 1 attempt is needed
//   let maxAttempts = this.state.isChromeAlreadyOpened ? 3 : 15;

//   const isSinglePageOpened = async () => {
//     let pages = await this.browser.pages();
//     if (pages.length > 1) return true;
//     else return false;
//   };

//   let flag = await this.monitor.robustPolling(isSinglePageOpened, {
//     maxAttempts: maxAttempts,
//     delayMs: 2000,
//     timeoutMs: 60000,
//     rejectOnEnd: false,
//     retryCondition: (result) => result === true,
//     endMSG: "Only 1 page found, means Privacy Sandbox Popup is not opened.",
//   });
//   console.log(`flag: ${flag ? `more than 1 page found` : `only 1 page found`}`);
//   await this.utils.randomDelay(1.5, 1.0);
//   // ============================================================
//   if (flag) {
//     // 3. Check for Pivacy SandBox Popup
//     let privacySandBoxPage = (await this.browser.pages()).find((p) => p.url() === "chrome://privacy-sandbox-dialog/notice");
//     if (privacySandBoxPage) {
//       await privacySandBoxPage.locator("privacy-sandbox-notice-dialog-app >>> #ackButton").click();
//       console.log(`Privacy SandBox Popup Closed`);
//     }

//     // 4. Check for SignIn Popup
//     /*    let SignInPage = (await browser.pages()).find((p) =>
//       p
//         .url()
//         .includes("chrome://signin-dice-web-intercept.top-chrome/chrome-signin")
//     );
//     SignInPage &&
//       (await SignInPage.locator(
//         "chrome-signin-app >>> #acceppt-button-content"
//       ).click());*/
//   }
//   // ============================================================
// }
// So, I have added a new function with the name as popUpHandler but having monitor called monitorPopU
async function popUpHandler() {
  const monitorPopUpPromise = this.monitor.robustPolling(this.popUpFunctions.monitorPopUp.bind(this), {
    infintiePolling: true,
    intervalMs: 3000, // Check every 5 seconds
  });
  setTimeout(() => {
    monitorPopUpPromise.stop();
  }, 25000);

  monitorPopUpPromise
    .then((result) => {
      console.log("Polling succeeded:", result);
    })
    .catch((err) => {
      console.log("Polling failed:", err);
    });
}

async function monitorPopUp() {
  console.log(`==== List of pages when Monitor PopUp called====`);
  await this.chrome.printAllPagesURLs.call(this);
  console.log(`================================================`);

  for (const url of Object.keys(handlers)) {
    try {
      const popUpPage = (await this.browser.pages()).find((p) => p.url() === url);

      if (popUpPage) {
        await this.utils.randomDelay(1.5, 2); // Add a small delay for stability
        console.log(`Popup Page found: ${popUpPage.url()}`);
        const selector = handlers[url];
        console.log(`Selector: ${selector}`);

        await popUpPage.bringToFront();
        await popUpPage.locator(selector).click();
        console.log(`Popup handled by monitor: ${url}`);
        return popUpPage;
      }
    } catch (error) {
      console.error(`Error handling popup for  ${url}:`, error);
    }
  }
}

// As practically this actually is not working for popup works for pages only.
// async function popUpHandler() {
//   console.log(`Popup handler attached to browser.`);
//   this.browser.on("targetcreated", async (target) => {
//     if (target.type() === "page") {
//       // Use for...of instead of forEach for proper async handling
//       for (const url of Object.keys(handlers)) {
//         try {
//           const popUpPage = (await this.browser.pages()).find((p) => p.url() === url);

//           if (popUpPage) {
//             console.log(`Popup Page found: ${popUpPage.url()}`);
//             const selector = handlers[url];
//             await popUpPage.bringToFront();
//             await popUpPage.locator(selector).click();
//             console.log(`Popup handled by listener attached to browser successfully: ${url}`);
//             return popUpPage;
//           }
//         } catch (error) {
//           console.error(`Error handling popup for ${url}:`, error);
//         }
//       }
//     }
//   });
// }

// As practically this actually is not working for popup works for pages only.

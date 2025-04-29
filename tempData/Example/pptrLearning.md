<!-- This File is copied from "OK win Scraper development for Urgent Deployment" folder so please sync both of these files -->

# NOTE: Most important point is never navigate to any page by url, Always first search from google and then go to that website to perform automation.

# Code / Concepts learned whlile working on this project

1. Check page is loaded or not
   await page.evaluate(() => {
   return document.readyState === 'complete';
   });

2. Wait for page to get loaded completely
   await page.waitForFunction(() => document.readyState === 'complete');
   ===================================================================================
   These notes are the points that i learned about PUPPTEER while developing this project.

3. await page.waitForNetworkIdle({ idleTime: 500 }); is not working as expected.

# locators :- page.locator()

    One of the most useful tool of puppeteer some useful examples are as below:
      1. Given below line waits for a span element that have the text "ecosyst" or doesn't matter start with it or have in mid or
            ends with this text
          await page.locator("span ::-p-text(ecosyst)")

      2.  * When using await page.locator("selectorOfElement"), Puppeteer waits for a visible match.
          * If multiple elements match, only the first visible one will be selected.
          * The non-visible element(s) are ignored in this process.

# request-interception :-

    1.  To Enable request interception
        await page.setRequestInterception(true);

        Note :- Even if you don't need to intercept any request (Only want response), you still need to continue the request using
                  await page.setRequestInterception(true);
                    page.on("request", (request) => {
                    request.continue();
                    });

    2.  Just copy request as fetch(nodejs) and paste in script and excuting again n again won't work
         as each page have different signature of fetch function.  ⚠️⚠️⚠️⚠️⚠️ Hence fetherTest won't worked.

# JSON.parse() Error :-

    1.  let gameListData = JSON.parse(fs.readFileSync("./data/gameListData.json"));
        This will produce error:
                                  SyntaxError: Unexpected end of JSON input
        Solution: is to first check that the file read have some data and then parse that data as below:
                let gameListData = fs.readFileSync("./data/gameListData.json");
                  if (gameListData.length !== 0) {
                    gameListData = JSON.parse(gameListData);
                  } else console.log(`gameListData is empty.`);

    2.  Also remember that .json file should always be an Array of objects even if that Array can be empty.

# Node is either not clickable or not an Element

    This error occurs when the element to click is not loaded or page was loading
        So the main solution is to page for page loading + little extra time
    But some time simple method just caught as bot so i implemented clickNotClickable in utils.js
        This method uses robustPolling Fuction so became more reliable.

# Gmail SignIn Module

    Note when i directly navigate to "https://accounts.google.com/signup/v2/webcreateaccount" and perform automation on that i got caught as bot.
    *** but when i go to same website from chrome search page i can perform automation without getting caught.

# Typing Human

    I have implementes "typeHuman" method in utils.js as "puppeteer-extra-plugin-human-typing" is keep generating error,
    Setting options for this method, i can use typeHuman methods in many ways
    but 2 methods are mostly used that are
      1. On element:
                const passwordLocator = await page.locator('#password').waitHandle();
                await passwordLocator.typeHuman('SuperSecretPassword!', {
                  delay: 100,
                  typoChanceInPercent: 5 // 5% chance of introducing a typo
                });
      2. On Page using selector:
                    await page.typeHuman('#username', 'tomsmith');
                    await page.typeHuman('#password', 'SuperSecretPassword!');

# Updated Proxy for NewPageClass

      class NewPageClass {
        constructor(page) {
          this.page = page; // Neccessary for Proxy

          // Create a proxy to delegate method calls
          return new Proxy(this, {
            get(target, prop) {
              // Check if the property exists on the page instance
              if (typeof target.page[prop] === "function") {
                return (...args) => target.page[prop](...args);
              } else if (target.page[prop] !== undefined) {
                // Return the property from target.page if it exists
                return target.page[prop];
              }
              // Otherwise, return the property from target
              return target[prop];
            },
          });
        }

      }

# What Happen when a promise gets rejected in different situations like with or without 'await', with or without 'trycatch' explain with examples for each?

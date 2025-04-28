module.exports = {
  navigate,
  waitForElement,
  searchElementByText,
  typeHuman,
};

async function navigate(url, argOptions) {
  console.log(`=======before`);
  const defaultOptions = {
    waitUntil: "networkidle0", // Wait until network is idle
    timeout: 300000, // 5 minutes Timeout in milliseconds
    // referer: "https://www.google.com", // Custom referer header
    // userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", // Custom user agent
    // ignoreHTTPSErrors: true, // Ignore HTTPS errors
    domContentLoaded: true, // Wait for DOMContentLoaded event
    // defaultViewport: { width: 1920, height: 1080 }, // Custom viewport settings
  };
  let options = { ...defaultOptions, ...argOptions };
  await this.page.goto(url, options);
  console.log(`=======After`);
}
/* waitForPageLoad get Deprecated as navigate function became better choice with the options
// 1. Proper waiting for page load event
async function waitForPageLoad(timeout = 600000) {
  return await this.page.waitForFunction(
    () => document.readyState === "complete",
    { timeout } // Set timeout to 10 seconds
  );
}
*/

// 2. Wait for element to be present
async function waitForElement(selector, options = {}) {
  const { timeout = 30000 } = options;
  await this.page.waitForSelector(selector, { timeout });
}

// 2. Typing as human just by giving the selector of input element
async function typeHuman(selector, stringToType) {
  const options = {
    backspaceMaximumDelayInMs: 750 * 2,
    backspaceMinimumDelayInMs: 750,
    chanceToKeepATypoInPercent: 0, // page controls whether to keep a typo
    maximumDelayInMs: 650,
    minimumDelayInMs: 150,
    typoChanceInPercent: 0.5,
  };

  await this.page.waitForPageLoad();

  const inputField = await this.page.locator(selector).waitHandle();
  // await inputField.focus();

  // Clear the input field
  await inputField.evaluate((el) => (el.value = ""));

  for (let char of stringToType) {
    // Simulate typing delay
    const delay =
      Math.floor(
        Math.random() *
          (options.maximumDelayInMs - options.minimumDelayInMs + 1)
      ) + options.minimumDelayInMs;

    // Introduce a typo based on the typo chance
    let typedChar = char;
    if (Math.random() * 100 < options.typoChanceInPercent) {
      // Generate a random character to simulate a typo
      typedChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Random lowercase letter

      // Decide whether to keep the typo based on chanceToKeepATypoInPercent
      if (Math.random() * 100 < options.chanceToKeepATypoInPercent) {
        // Keep the typo as is
        await inputField.type(typedChar, { delay });
        continue; // Skip correcting page character
      } else {
        // If not keeping the typo, type the incorrect character
        await inputField.type(typedChar, { delay });

        // Simulate backspacing to remove the typo
        const backspaceDelay =
          Math.floor(
            Math.random() *
              (options.backspaceMaximumDelayInMs -
                options.backspaceMinimumDelayInMs +
                1)
          ) + options.backspaceMinimumDelayInMs;
        await this.utils.delay(backspaceDelay);

        // Type backspace to remove the last character (the typo)
        await inputField.press("Backspace", { delay: backspaceDelay });

        // Type the correct character
        await inputField.type(char, { delay });
        continue;
      }
    }

    // Type the character normally
    await inputField.type(typedChar, { delay });
  }
}

// 3. Get textContent of element using Selector
async function getText(selector) {
  console.log(`Get Text Function Called`);
  const el = await page.locator(selector).waitHandle();
  const text = await page.evaluate((element) => element.textContent, el);
  console.log(text);
}

// 4. Search element by text
const searchElementByText = async (page, searchText, options = {}) => {
  const { exactMatch = false, timeout = 30000 } = options;

  try {
    // Wait for any element containing the text to be present
    await page.waitForFunction(
      (text, exact) => {
        const elements = document.querySelectorAll("*");
        return Array.from(elements).some((element) => {
          const elementText = element.textContent.trim();
          return exact ? elementText === text : elementText.includes(text);
        });
      },
      { timeout },
      searchText,
      exactMatch
    );

    // Find all elements containing the text
    const elements = await page.evaluate(
      (text, exact) => {
        const elements = document.querySelectorAll("*");
        return Array.from(elements)
          .filter((element) => {
            const elementText = element.textContent.trim();
            return exact ? elementText === text : elementText.includes(text);
          })
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              tagName: element.tagName.toLowerCase(),
              text: element.textContent.trim(),
              isVisible:
                rect.width > 0 &&
                rect.height > 0 &&
                window.getComputedStyle(element).visibility !== "hidden",
              attributes: Object.fromEntries(
                Array.from(element.attributes).map((attr) => [
                  attr.name,
                  attr.value,
                ])
              ),
            };
          });
      },
      searchText,
      exactMatch
    );

    return elements;
  } catch (error) {
    if (error.name === "TimeoutError") {
      throw new Error(
        `Timeout: No element found containing text "${searchText}" within ${timeout}ms`
      );
    }
    throw error;
  }
};

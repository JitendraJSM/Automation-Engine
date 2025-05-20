19/05/2025

---

await this.page.locator("::-p-text(RFC 6761)").click();
this above code from perplexity is working

- Note now when ever click on some link (by your code) that triggers navigation then you have to wait for that navigation to complete, so do something for that, like adding event listener for all these events or triger a custom event as due to naviagation page URL changes or create a custom event when network is not idle so that app can wait for network being idle but on youtube like websites network will never become idle.

01/05/2025

- if browser is already opened then get it's profileTarget and store that to state.browserOptions.profileTarget, as that may have the wrong value.

02/05/2025

- As trying to click on shorts btn but there are more than one elements having same text and that's why it's clicking on first one.
- So need to find a robust & Globol solution, but that will be difficult and time consuming.
- temporary solution is the parent element of desired element is "a", But for that we need to find a way to send/parse the arguments from json file to the function.
  <yt-formatted-string class="title style-scope ytd-guide-entry-renderer">Shorts</yt-formatted-string>
  <span class="title style-scope ytd-mini-guide-entry-renderer">Shorts</span> parent "a"
  <span id="title" class="style-scope ytd-rich-shelf-renderer">Shorts</span>
  <span id="title" class="style-scope ytd-rich-shelf-renderer">Shorts</span>

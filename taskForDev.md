await this.page.locator("::-p-text(RFC 6761)").click();
this above code from perplexity is working

- Note now when ever click on some link (by your code) that triggers navigation then you have to wait for that navigation to complete, so do something for that, like adding event listener for all these events or triger a custom event as due to naviagation page URL changes or create a custom event when network is not idle so that app can wait for network being idle but on youtube like websites network will never become idle.

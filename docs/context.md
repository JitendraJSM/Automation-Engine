Trying to create automation library for a project, Which is simmilar to express library, middlewares and next function etc....

## Available Methods

### 1. wait()

Waits for the element to be present in DOM.

```javascript
const dynamicContent = page.locator(".dynamic-content");
await dynamicContent.wait();
```

### 2. scroll()

Scrolls the element into view.

```javascript
const bottomSection = page.locator("#bottom-content");
await bottomSection.scroll();
```

### 3. click()

Clicks the located element.

```javascript
const menuButton = page.locator("#menu-btn");
await menuButton.click();
```

<!-- Which works and which Not -->

```javascript
const submitButton = page.locator("button").filter({ hasText: "Submit" }); //---- Not Working
const submitButton = this.page.locator("a ::-p-text(More information...)"); // But works
const submitButton = this.page.locator("a").filter((el) => el.innerText === "More information..."); // and this works
const submitButton = this.page.locator("text/More info").// and this works
const submitButton = this.page.locator("text/6761").// and this works
```

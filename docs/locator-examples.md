# Puppeteer Locator Examples

Locators in Puppeteer provide a powerful way to interact with elements on a webpage. They automatically retry operations until the target element is ready, making your automation scripts more reliable.

## Introduction

Locators describe a strategy for finding elements and performing actions on them. If an action fails because the element isn't ready, the operation is automatically retried. They handle various preconditions for successful actions automatically.

## Basic Usage

```javascript
// Create a locator
const buttonLocator = page.locator("button.submit-btn");

// Click the button
await buttonLocator.click();
```

## Available Methods

### 1. click()

Clicks the located element.

```javascript
const menuButton = page.locator("#menu-btn");
await menuButton.click();
```

### 2. fill()

Fills form fields like input, textarea, or contenteditable elements.

```javascript
const emailInput = page.locator('input[type="email"]');
await emailInput.fill("user@example.com");
```

### 3. hover()

Moves the mouse over the element.

```javascript
const dropdownTrigger = page.locator(".dropdown-trigger");
await dropdownTrigger.hover();
```

### 4. scroll()

Scrolls the element into view.

```javascript
const bottomSection = page.locator("#bottom-content");
await bottomSection.scroll();
```

### 5. wait()

Waits for the element to be present in DOM.

```javascript
const dynamicContent = page.locator(".dynamic-content");
await dynamicContent.wait();
```

### 6. filter()

Creates an expectation that is evaluated against located values. The filter method supports various options for precise element selection.

```javascript
// Filter by text content
const submitButton = page.locator("button").filter({ hasText: "Submit" });
const partialTextMatch = page
  .locator("div")
  .filter({ hasText: /Product\s+\d+/ }); // Regex support

// Filter by element state
const enabledButton = page.locator("button").filter({ state: "enabled" });
const visibleInputs = page.locator("input").filter({ state: "visible" });
const attachedElements = page.locator("div").filter({ state: "attached" });
const editableFields = page.locator("div").filter({ state: "editable" });

// Filter by attributes
const requiredInputs = page
  .locator("input")
  .filter({ has: page.locator("[required]") });
const blueButtons = page
  .locator("button")
  .filter({ has: page.locator('[style*="blue"]') });

// Combining multiple filters
const activeVisibleLink = page
  .locator("a")
  .filter({ state: "visible" })
  .filter({ hasText: "Active" });

// Custom filter function
const elementsInViewport = page.locator("div").filter(async (element) => {
  const box = await element.boundingBox();
  const viewportHeight = (await page.viewportSize()).height;
  return box && box.y >= 0 && box.y <= viewportHeight;
});

// Filter with not operator
const nonDisabledButtons = page
  .locator("button")
  .filter({ state: "visible", not: { state: "disabled" } });

// Filter by child elements
const listsWithImages = page.locator("ul").filter({ has: page.locator("img") });
const formsWithRequiredFields = page
  .locator("form")
  .filter({ has: page.locator("[required]") });

// Chaining filters with other locator methods
const lastVisibleButton = page
  .locator("button")
  .filter({ state: "visible" })
  .last();

const firstEditableInput = page
  .locator("input")
  .filter({ state: "editable" })
  .first();
```

### 7. map()

Transforms the locator using a provided mapper function.

```javascript
// Get text content of all matching elements
const items = page.locator("li");
const texts = await items.map((element) => element.textContent());
```

### 8. clone()

Creates a copy of the locator.

```javascript
const originalLocator = page.locator(".item");
const clonedLocator = originalLocator.clone();
```

## Advanced Examples

### Chaining Locators

```javascript
// Find a specific item in a list
const listItem = page
  .locator("ul.shopping-list")
  .locator("li")
  .filter({ hasText: "Apple" });

await listItem.click();
```

### Working with Forms

```javascript
// Fill out a login form
const form = page.locator("form#login");
await form.locator('input[name="username"]').fill("myuser");
await form.locator('input[name="password"]').fill("mypassword");
await form.locator('button[type="submit"]').click();
```

### Handling Dynamic Content

```javascript
// Wait for dynamic content and interact with it
const notification = page.locator(".notification");
await notification.wait();
const closeButton = notification.locator(".close-btn");
await closeButton.click();
```

### Complex Filtering

```javascript
// Find a specific table cell
const cell = page
  .locator("table")
  .locator("tr")
  .filter({ hasText: "Product A" })
  .locator("td")
  .filter({ hasText: "$" });

const price = await cell.textContent();
```

## Best Practices

1. **Use Specific Selectors**: Prefer specific selectors over generic ones to ensure reliable element location.

```javascript
// Good
const submitButton = page.locator('button[type="submit"]#save-form');

// Less reliable
const submitButton = page.locator("button");
```

2. **Chain Locators for Complex Selection**: Break down complex element selection into multiple steps.

```javascript
const specificRow = page
  .locator("table#users")
  .locator("tr")
  .filter({ hasText: "John" });
```

3. **Handle Dynamic Content**: Use wait() when dealing with dynamic elements.

```javascript
const dynamicElement = page.locator(".dynamic-content");
await dynamicElement.wait();
await dynamicElement.click();
```

4. **Reuse Locators**: Create locators once and reuse them for better performance.

```javascript
const menuButton = page.locator("#menu");
await menuButton.hover();
await menuButton.click();
```

## Error Handling

```javascript
try {
  const element = page.locator(".potentially-missing");
  await element.wait({ timeout: 5000 });
  await element.click();
} catch (error) {
  console.error("Element not found or not clickable:", error);
}
```

## Selector Types and Examples

### 1. CSS Selectors

CSS selectors are the most common way to locate elements.

```javascript
// By ID
const loginButton = page.locator("#login-button");

// By Class
const menuItems = page.locator(".menu-item");

// By Attribute
const emailInput = page.locator('input[type="email"][required]');
```

### 2. XPath Selectors

XPath selectors are powerful for complex hierarchical selections.

```javascript
// Select by text content
const linkByText = page.locator('//a[text()="About Us"]');

// Select by position
const thirdListItem = page.locator('//ul[@id="menu"]/li[3]');

// Select by contains
const elementWithPartialText = page.locator('//div[contains(@class, "user-")]');
```

### 3. Text Content Selectors

Locate elements by their text content.

```javascript
// Exact text match
const exactText = page.locator('text="Click Me"');

// Partial text match
const partialText = page.locator('text=~"Click"');

// Case-insensitive match
const caseInsensitive = page.locator('text/i="LOGIN"');
```

### 4. Combining Selectors

You can combine different selector types for more precise selection.

```javascript
// CSS with text content
const button = page.locator('button:has-text("Submit")');

// Multiple conditions
const input = page.locator('input[type="text"]:not([disabled])');

// Parent-child relationship
const menuItem = page.locator('nav >> .menu-item >> text="Home"');
```

### 5. Role-based Selectors

Accessibility-first selectors that use ARIA roles.

```javascript
// Select by role
const submitButton = page.locator('role=button[name="Submit"]');

// Select by role with properties
const searchbox = page.locator('role=searchbox[placeholder="Search..."]');

// Select by role in context
const menuButton = page.locator("role=navigation >> role=button");
```

## Selecting Specific Elements from Multiple Matches

When dealing with multiple elements that match the same selector, there are several ways to target a specific element:

### 1. Using nth-child

```javascript
// Select the third button using CSS nth-child
const thirdButton = page.locator("button:nth-child(3)");

// Alternative XPath approach
const thirdButtonXPath = page.locator("(//button)[3]");
```

### 2. Filter by Visibility

```javascript
// Select only visible elements and then the third one
const visibleButtons = page.locator("button").filter({ state: "visible" });
const thirdVisibleButton = visibleButtons.nth(2); // 0-based index

// Combined in one chain
const button = page.locator("button").filter({ state: "visible" }).nth(2);
```

### 3. Filter by Viewport

```javascript
// Find elements that are in viewport
const inViewportButton = page.locator("button").filter(async (element) => {
  const isVisible = await element.isVisible();
  const box = await element.boundingBox();

  return (
    isVisible &&
    box &&
    box.y >= 0 &&
    box.y <= (await page.viewportSize()).height
  );
});
```

This guide covers the main features and best practices for using Puppeteer's Locator API. Locators make web automation more reliable by handling timing and state issues automatically.

## Additional Best Practices and Tips

### 1. Automatic Retry and Timing Handling

Locators automatically handle timing issues by retrying operations until elements are ready:

```javascript
// No need for explicit waits in most cases
const button = page.locator("#dynamic-button");
await button.click(); // Automatically waits and retries
```

### 2. Performance Optimization

Create and reuse locators for better performance:

```javascript
// DO: Create locator once and reuse
const submitButton = page.locator("#submit");
await submitButton.hover();
await submitButton.click();

// DON'T: Create new locator for each operation
await page.locator("#submit").hover();
await page.locator("#submit").click();
```

### 3. Error Recovery

Implement robust error handling with timeouts:

```javascript
// Add timeout for operations that might fail
try {
  await page.locator(".dynamic-element").wait({ timeout: 5000 });
} catch (error) {
  // Handle timeout error
  console.log("Element did not appear within 5 seconds");
}
```

### 4. Selector Stability

- Prefer attributes that are less likely to change (IDs, data-testid)
- Avoid selectors based on text content if the text is likely to change
- Use role-based selectors for better accessibility testing

### 5. Debugging Tips

```javascript
// Check if element exists
const count = await page.locator("button").count();
console.log(`Found ${count} buttons`);

// Get element properties
const isVisible = await page.locator("button").isVisible();
const isEnabled = await page.locator("button").isEnabled();
```

### 6. Shadow DOM Handling

Use pierce selectors to search through shadow roots:

```javascript
// Works - searches all shadow roots
page.locator("pierce/div");

// Doesn't work - partial piercing not supported
page.locator("pierce/div div");
```

### 7. State Management

Locators automatically check element state before actions:

- Visibility in viewport
- Element enabled/disabled state
- Animation completion
- Stable position

### 8. Chaining Best Practices

```javascript
// Break down complex selections
const row = page
  .locator("table")
  .locator("tr")
  .filter({ hasText: "Product" })
  .first();

// Add explicit waits for critical operations
await row.wait();
await row.click();
```

### 9. Common Pitfalls to Avoid

- Don't mix async/await with promise chains
- Don't rely on exact text matches when content might change
- Don't use overly complex selectors when simpler ones work
- Don't forget to handle timeouts for dynamic content

### 10. Testing and Maintenance

```javascript
// Reusable locator function
function getRowByProductName(page, productName) {
  return page.locator("tr").filter({ hasText: productName }).first();
}

// Usage
const productRow = getRowByProductName(page, "Product A");
await productRow.click();
```

These practices will help create more reliable and maintainable automation scripts using Puppeteer's Locator API.

<!-- ----------------------- -->

# Playwright Tests - Product Manager Application

End-to-end and API integration tests for the Product Manager application using Playwright.

## Project Structure

```
playwright-tests/
├── tests/                          # Test files
│   ├── product-manager.spec.js    # UI/E2E tests
│   └── api-integration.spec.js    # API tests
├── playwright.config.js           # Playwright configuration
├── package.json                   # Dependencies
└── README.md                      # This file
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- npm (comes with Node.js)
- The Product Manager application running (both API and React frontend)

## Installation

Navigate to the playwright-tests directory:
```bash
cd playwright-tests
```

Install dependencies:
```bash
npm install
```

Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Prerequisites for Running Tests

Before running the tests, ensure both the API and React frontend are running:

**Terminal 1 - Start the API:**
```bash
cd ../dotnet-react-app/SampleApi
dotnet run
```

**Terminal 2 - Start the React app:**
```bash
cd ../dotnet-react-app/client
npm start
```

### Run All Tests

```bash
npm test
```

### Run Tests in Headed Mode (See Browser)

```bash
npm run test:headed
```

### Run Tests in UI Mode (Interactive)

```bash
npm run test:ui
```

### Run Tests in Debug Mode

```bash
npm run test:debug
```

### Run Specific Test File

```bash
npx playwright test tests/product-manager.spec.js
```

### Run Tests in Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Suites

### 1. UI/E2E Tests (`product-manager.spec.js`)

Tests the React frontend functionality:

- ✅ Display application header
- ✅ Display initial products list
- ✅ Show/hide add product form
- ✅ Add new product
- ✅ Edit existing product
- ✅ Delete product
- ✅ Cancel adding product
- ✅ Display product details correctly
- ✅ Validate required form fields
- ✅ Handle API errors gracefully
- ✅ Toggle form visibility

**Example:**
```bash
npx playwright test tests/product-manager.spec.js
```

### 2. API Integration Tests (`api-integration.spec.js`)

Tests the .NET Core API endpoints directly:

- ✅ Fetch all products
- ✅ Get single product by ID
- ✅ Return 404 for non-existent product
- ✅ Create new product
- ✅ Update existing product
- ✅ Delete product
- ✅ Handle CORS headers
- ✅ Validate product data types

**Example:**
```bash
npx playwright test tests/api-integration.spec.js
```

## Test Reports

After running tests, view the HTML report:

```bash
npm run report
```

This will open an interactive HTML report showing:
- Test results
- Screenshots (on failure)
- Traces (on retry)
- Execution timeline

## Configuration

The [`playwright.config.js`](playwright.config.js) file contains:

- **Base URL**: `http://localhost:3000` (React app)
- **Test Directory**: `./tests`
- **Browsers**: Chromium, Firefox, WebKit
- **Screenshots**: Captured on failure
- **Traces**: Captured on first retry
- **Web Server**: Automatically starts React app if not running

### Modifying Configuration

Edit [`playwright.config.js`](playwright.config.js) to change:

```javascript
use: {
  baseURL: 'http://localhost:3000',  // Change base URL
  trace: 'on-first-retry',           // Trace settings
  screenshot: 'only-on-failure',     // Screenshot settings
}
```

## Writing New Tests

### Basic Test Structure

```javascript
const { test, expect } = require('@playwright/test');

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Your test code here
    await page.click('button');
    await expect(page.locator('h1')).toBeVisible();
  });
});
```

### API Test Structure

```javascript
test('should test API endpoint', async ({ request }) => {
  const response = await request.get('http://localhost:5000/api/products');
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(Array.isArray(data)).toBeTruthy();
});
```

## Common Playwright Commands

### Selectors

```javascript
// By test ID
page.locator('[data-testid="add-product-btn"]')

// By text
page.locator('text=Add New Product')

// By CSS
page.locator('.product-card')

// By role
page.locator('role=button[name="Submit"]')
```

### Actions

```javascript
// Click
await page.click('button');

// Fill input
await page.fill('input[name="name"]', 'Product Name');

// Select option
await page.selectOption('select', 'option-value');

// Wait for element
await page.waitForSelector('.product-card');
```

### Assertions

```javascript
// Visibility
await expect(page.locator('h1')).toBeVisible();

// Text content
await expect(page.locator('h1')).toContainText('Product Manager');

// Count
await expect(page.locator('.product-card')).toHaveCount(5);

// URL
await expect(page).toHaveURL('http://localhost:3000/');
```

## Debugging Tests

### Visual Debugging

```bash
npx playwright test --debug
```

This opens Playwright Inspector where you can:
- Step through tests
- See selectors
- View console logs
- Inspect DOM

### Trace Viewer

If a test fails and trace is enabled:

```bash
npx playwright show-trace trace.zip
```

### Screenshots

Screenshots are automatically captured on failure in `test-results/` directory.

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Troubleshooting

### Tests Failing - API Not Running

Ensure the .NET Core API is running on port 5000:
```bash
cd ../dotnet-react-app/SampleApi
dotnet run
```

### Tests Failing - React App Not Running

Ensure the React app is running on port 3000:
```bash
cd ../dotnet-react-app/client
npm start
```

### Browser Not Found

Install Playwright browsers:
```bash
npx playwright install
```

### Port Already in Use

Change the port in [`playwright.config.js`](playwright.config.js):
```javascript
use: {
  baseURL: 'http://localhost:3001',  // Change port
}
```

### Timeout Issues

Increase timeout in [`playwright.config.js`](playwright.config.js):
```javascript
use: {
  timeout: 30000,  // 30 seconds
}
```

## Best Practices

1. **Use data-testid attributes** for stable selectors
2. **Wait for elements** before interacting
3. **Use meaningful test descriptions**
4. **Keep tests independent** - each test should work in isolation
5. **Clean up test data** after tests
6. **Use Page Object Model** for complex applications
7. **Run tests in parallel** for faster execution

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)

## License

This is a sample test suite for demonstration purposes.
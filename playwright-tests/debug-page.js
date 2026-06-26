const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3001/careers');
  await page.waitForTimeout(2000);
  
  // Get the HTML of the body
  const html = await page.content();
  console.log('=== PAGE HTML (first 2000 chars) ===');
  console.log(html.substring(0, 2000));
  
  // Check if specific elements exist
  const app = await page.locator('[data-testid="app"]').count();
  const hero = await page.locator('[data-testid="hero-section"]').count();
  const values = await page.locator('[data-testid="values-section"]').count();
  
  console.log('\n=== ELEMENT COUNTS ===');
  console.log('app:', app);
  console.log('hero-section:', hero);
  console.log('values-section:', values);
  
  // Take a screenshot
  await page.screenshot({ path: 'debug-screenshot.png', fullPage: true });
  console.log('\n=== Screenshot saved to debug-screenshot.png ===');
  
  await browser.close();
})();

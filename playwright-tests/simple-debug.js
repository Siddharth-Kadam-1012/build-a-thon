const { chromium } = require('playwright');

(async () => {
  console.log('Starting browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to http://localhost:3001/careers...');
  await page.goto('http://localhost:3001/careers');
  
  console.log('Waiting for page to load...');
  await page.waitForTimeout(3000);
  
  console.log('\n=== PAGE TITLE ===');
  console.log(await page.title());
  
  console.log('\n=== CHECKING FOR ELEMENTS ===');
  const app = await page.locator('[data-testid="app"]').count();
  const navbar = await page.locator('[data-testid="navbar"]').count();
  const hero = await page.locator('[data-testid="hero-section"]').count();
  const values = await page.locator('[data-testid="values-section"]').count();
  
  console.log('app element count:', app);
  console.log('navbar element count:', navbar);
  console.log('hero-section element count:', hero);
  console.log('values-section element count:', values);
  
  console.log('\n=== BODY TEXT (first 500 chars) ===');
  const bodyText = await page.locator('body').innerText();
  console.log(bodyText.substring(0, 500));
  
  console.log('\n=== CONSOLE LOGS/ERRORS ===');
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  
  await page.waitForTimeout(1000);
  
  console.log('\n=== Taking screenshot ===');
  await page.screenshot({ path: 'C:\\Users\\SiddharthKadam\\Downloads\\dotnet-react-app\\playwright-tests\\debug-screenshot.png', fullPage: true });
  console.log('Screenshot saved!');
  
  await browser.close();
  console.log('\nDone!');
})();

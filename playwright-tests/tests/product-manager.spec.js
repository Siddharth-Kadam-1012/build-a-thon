const { test, expect } = require('@playwright/test');

/**
 * YourBank – Banking Website UI Tests
 * Covers: Navbar, Hero, Products, Use Cases, Features, FAQ, Testimonials, CTA, Footer
 */
test.describe('YourBank Banking Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the app shell to be present
    await page.waitForSelector('[data-testid="app"]');
  });

  // ── Navbar ───────────────────────────────────────────────────────────────────
  test.describe('Navbar', () => {
    test('should display the YourBank logo', async ({ page }) => {
      const logo = page.locator('[data-testid="nav-logo"]');
      await expect(logo).toBeVisible();
      await expect(logo).toContainText('YourBank');
    });

    test('should display Sign In button', async ({ page }) => {
      await expect(page.locator('[data-testid="signin-btn"]')).toBeVisible();
    });

    test('should display Open Account button in navbar', async ({ page }) => {
      await expect(page.locator('[data-testid="open-account-btn"]')).toBeVisible();
    });

    test('navbar should be sticky (position sticky)', async ({ page }) => {
      const navbar = page.locator('[data-testid="navbar"]');
      await expect(navbar).toBeVisible();
      const position = await navbar.evaluate((el) => window.getComputedStyle(el).position);
      expect(position).toBe('sticky');
    });
  });

  // ── Hero Section ─────────────────────────────────────────────────────────────
  test.describe('Hero Section', () => {
    test('should display the hero section', async ({ page }) => {
      await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
    });

    test('should contain YourBank heading text', async ({ page }) => {
      const heading = page.locator('[data-testid="hero-section"] h1');
      await expect(heading).toContainText('YourBank');
    });

    test('should display the Learn More button in hero', async ({ page }) => {
      await expect(page.locator('[data-testid="hero-learn-more"]')).toBeVisible();
    });

    test('should display the banking card visual', async ({ page }) => {
      await expect(page.locator('[data-testid="hero-card"]')).toBeVisible();
    });

    test('hero heading should mention financial journey', async ({ page }) => {
      const heading = page.locator('[data-testid="hero-section"] h1');
      await expect(heading).toContainText('Financial');
    });
  });

  // ── Products Section ─────────────────────────────────────────────────────────
  test.describe('Products Section', () => {
    test('should display the products section', async ({ page }) => {
      await expect(page.locator('[data-testid="products-section"]')).toBeVisible();
    });

    test('should show "Our Products" eyebrow text', async ({ page }) => {
      const section = page.locator('[data-testid="products-section"]');
      await expect(section).toContainText('Our Products');
    });

    test('should display product cards', async ({ page }) => {
      const productsList = page.locator('[data-testid="products-list"]');
      await expect(productsList).toBeVisible();
      const cards = productsList.locator('[data-testid^="product-card-"]');
      await expect(cards).toHaveCount(3);
    });

    test('first product card should be visible with title', async ({ page }) => {
      const firstCard = page.locator('[data-testid="product-card-0"]');
      await expect(firstCard).toBeVisible();
      const title = firstCard.locator('.product-card-title');
      await expect(title).not.toBeEmpty();
    });

    test('should display Learn All Products button', async ({ page }) => {
      await expect(page.locator('[data-testid="learn-all-products"]')).toBeVisible();
    });
  });

  // ── Use Cases Section ────────────────────────────────────────────────────────
  test.describe('Use Cases Section', () => {
    test('should display the use cases section', async ({ page }) => {
      await expect(page.locator('[data-testid="use-cases-section"]')).toBeVisible();
    });

    test('should show For Individuals and For Business tabs', async ({ page }) => {
      await expect(page.locator('[data-testid="tab-individuals"]')).toBeVisible();
      await expect(page.locator('[data-testid="tab-business"]')).toBeVisible();
    });

    test('For Individuals tab should be active by default', async ({ page }) => {
      const tab = page.locator('[data-testid="tab-individuals"]');
      await expect(tab).toHaveClass(/active/);
    });

    test('individuals content should be visible by default', async ({ page }) => {
      await expect(page.locator('[data-testid="individuals-content"]')).toBeVisible();
    });

    test('clicking For Business tab should show business content', async ({ page }) => {
      await page.click('[data-testid="tab-business"]');
      await expect(page.locator('[data-testid="business-content"]')).toBeVisible();
      await expect(page.locator('[data-testid="individuals-content"]')).not.toBeVisible();
    });

    test('clicking For Individuals tab should show individuals content', async ({ page }) => {
      // Switch to business first
      await page.click('[data-testid="tab-business"]');
      // Then switch back
      await page.click('[data-testid="tab-individuals"]');
      await expect(page.locator('[data-testid="individuals-content"]')).toBeVisible();
    });

    test('should display percentage stats in individuals view', async ({ page }) => {
      const stat0 = page.locator('[data-testid="stat-0"]');
      await expect(stat0).toContainText('78%');
      const stat1 = page.locator('[data-testid="stat-1"]');
      await expect(stat1).toContainText('63%');
      const stat2 = page.locator('[data-testid="stat-2"]');
      await expect(stat2).toContainText('91%');
    });

    test('should display use case service cards', async ({ page }) => {
      const card0 = page.locator('[data-testid="use-case-0"]');
      await expect(card0).toBeVisible();
    });
  });

  // ── Features Section ─────────────────────────────────────────────────────────
  test.describe('Features Section', () => {
    test('should display the features section', async ({ page }) => {
      await expect(page.locator('[data-testid="features-section"]')).toBeVisible();
    });

    test('should show "Our Features" heading', async ({ page }) => {
      await expect(page.locator('[data-testid="features-section"]')).toContainText('Our Features');
    });

    test('should display 6 feature cards', async ({ page }) => {
      const grid = page.locator('[data-testid="features-grid"]');
      const cards = grid.locator('[data-testid^="feature-card-"]');
      await expect(cards).toHaveCount(6);
    });

    test('feature cards should have titles and descriptions', async ({ page }) => {
      const card = page.locator('[data-testid="feature-card-0"]');
      await expect(card.locator('.feature-title')).not.toBeEmpty();
      await expect(card.locator('.feature-desc')).not.toBeEmpty();
    });

    test('should include Smart Security feature', async ({ page }) => {
      await expect(page.locator('[data-testid="features-section"]')).toContainText('Smart Security');
    });

    test('should include Mobile Banking App feature', async ({ page }) => {
      await expect(page.locator('[data-testid="features-section"]')).toContainText('Mobile Banking App');
    });
  });

  // ── FAQ Section ──────────────────────────────────────────────────────────────
  test.describe('FAQ Section', () => {
    test('should display the FAQ section', async ({ page }) => {
      await expect(page.locator('[data-testid="faq-section"]')).toBeVisible();
    });

    test('should show Frequently Asked Questions heading', async ({ page }) => {
      await expect(page.locator('[data-testid="faq-section"]')).toContainText('Frequently Asked Questions');
    });

    test('should display FAQ items', async ({ page }) => {
      const list = page.locator('[data-testid="faq-list"]');
      const items = list.locator('[data-testid^="faq-item-"]');
      await expect(items).toHaveCount(4);
    });

    test('FAQ answers should be hidden by default', async ({ page }) => {
      for (let i = 0; i < 4; i++) {
        await expect(page.locator(`[data-testid="faq-answer-${i}"]`)).not.toBeVisible();
      }
    });

    test('clicking a FAQ question should expand the answer', async ({ page }) => {
      const firstQuestion = page.locator('[data-testid="faq-item-0"] .faq-question');
      await firstQuestion.click();
      await expect(page.locator('[data-testid="faq-answer-0"]')).toBeVisible();
    });

    test('clicking open FAQ again should collapse it', async ({ page }) => {
      const firstQuestion = page.locator('[data-testid="faq-item-0"] .faq-question');
      await firstQuestion.click();
      await expect(page.locator('[data-testid="faq-answer-0"]')).toBeVisible();
      await firstQuestion.click();
      await expect(page.locator('[data-testid="faq-answer-0"]')).not.toBeVisible();
    });

    test('only one FAQ should be open at a time', async ({ page }) => {
      await page.locator('[data-testid="faq-item-0"] .faq-question').click();
      await page.locator('[data-testid="faq-item-1"] .faq-question').click();
      await expect(page.locator('[data-testid="faq-answer-1"]')).toBeVisible();
      await expect(page.locator('[data-testid="faq-answer-0"]')).not.toBeVisible();
    });
  });

  // ── Testimonials Section ─────────────────────────────────────────────────────
  test.describe('Testimonials Section', () => {
    test('should display the testimonials section', async ({ page }) => {
      await expect(page.locator('[data-testid="testimonials-section"]')).toBeVisible();
    });

    test('should show Our Testimonials heading', async ({ page }) => {
      await expect(page.locator('[data-testid="testimonials-section"]')).toContainText('Our Testimonials');
    });

    test('should display 3 testimonial cards', async ({ page }) => {
      const grid = page.locator('[data-testid="testimonials-grid"]');
      const cards = grid.locator('[data-testid^="testimonial-"]');
      await expect(cards).toHaveCount(3);
    });

    test('testimonial cards should have author names', async ({ page }) => {
      const card = page.locator('[data-testid="testimonial-0"]');
      await expect(card.locator('.author-name')).not.toBeEmpty();
    });
  });

  // ── CTA Section ──────────────────────────────────────────────────────────────
  test.describe('CTA Section', () => {
    test('should display the CTA section', async ({ page }) => {
      await expect(page.locator('[data-testid="cta-section"]')).toBeVisible();
    });

    test('should contain YourBank brand in CTA text', async ({ page }) => {
      await expect(page.locator('[data-testid="cta-section"]')).toContainText('YourBank');
    });

    test('should display Open Account CTA button', async ({ page }) => {
      await expect(page.locator('[data-testid="cta-open-account"]')).toBeVisible();
    });
  });

  // ── Footer ───────────────────────────────────────────────────────────────────
  test.describe('Footer', () => {
    test('should display the footer', async ({ page }) => {
      await expect(page.locator('[data-testid="footer"]')).toBeVisible();
    });

    test('footer should contain YourBank brand', async ({ page }) => {
      await expect(page.locator('[data-testid="footer"]')).toContainText('YourBank');
    });

    test('footer should display social links', async ({ page }) => {
      const socialLinks = page.locator('[data-testid="footer"] .social-links');
      await expect(socialLinks).toBeVisible();
    });

    test('footer should display copyright notice', async ({ page }) => {
      await expect(page.locator('[data-testid="footer"]')).toContainText('2024');
    });
  });

  // ── Visual / Theme ───────────────────────────────────────────────────────────
  test.describe('Dark Theme', () => {
    test('page background should be dark', async ({ page }) => {
      const bgColor = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );
      // #1c1c1c → rgb(28, 28, 28)
      expect(bgColor).toBe('rgb(28, 28, 28)');
    });

    test('navbar should have dark background', async ({ page }) => {
      const navBg = await page.locator('[data-testid="navbar"]').evaluate((el) =>
        window.getComputedStyle(el).backgroundColor
      );
      expect(navBg).toBe('rgb(28, 28, 28)');
    });
  });

  // ── Navigation ───────────────────────────────────────────────────────────────
  test.describe('Page Navigation', () => {
    test('all page sections should be present in the DOM', async ({ page }) => {
      const sections = ['hero-section', 'products-section', 'use-cases-section', 'features-section', 'faq-section', 'testimonials-section', 'cta-section', 'footer'];
      for (const s of sections) {
        await expect(page.locator(`[data-testid="${s}"]`), `Missing: ${s}`).toBeAttached();
      }
    });
  });
});

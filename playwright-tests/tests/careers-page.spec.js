const { test, expect } = require('@playwright/test');

/**
 * YourBank Careers Page Tests
 * Covers: Navbar, Hero, Values, Benefits, Job Openings, FAQ, CTA, Footer
 */
test.describe('YourBank Careers Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/careers');
    await page.waitForSelector('[data-testid="app"]');
  });

  // ── Navbar ───────────────────────────────────────────────────────────────────
  test.describe('Navbar', () => {
    test('should display the YourBank logo', async ({ page }) => {
      const logo = page.locator('[data-testid="nav-logo"]');
      await expect(logo).toBeVisible();
      await expect(logo).toContainText('YourBank');
    });

    test('should display Sign Up button', async ({ page }) => {
      await expect(page.locator('[data-testid="signup-btn"]')).toBeVisible();
    });

    test('should display Login button', async ({ page }) => {
      await expect(page.locator('[data-testid="login-btn"]')).toBeVisible();
    });

    test('navbar should be sticky (position sticky)', async ({ page }) => {
      const navbar = page.locator('[data-testid="navbar"]');
      await expect(navbar).toBeVisible();
      const position = await navbar.evaluate((el) => window.getComputedStyle(el).position);
      expect(position).toBe('sticky');
    });

    test('should toggle mobile menu on hamburger click', async ({ page }) => {
      await page.setViewportSize({ width: 600, height: 800 });
      const hamburger = page.locator('[data-testid="menu-toggle"]');
      await hamburger.click();
      const navLinks = page.locator('.nav-links.open');
      await expect(navLinks).toBeVisible();
    });
  });

  // ── Hero Section ─────────────────────────────────────────────────────────────
  test.describe('Hero Section', () => {
    test('should display the hero section', async ({ page }) => {
      await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
    });

    test('should contain "Welcome to YourBank Careers!" heading', async ({ page }) => {
      const heading = page.locator('[data-testid="hero-heading"]');
      await expect(heading).toBeVisible();
      await expect(heading).toContainText('Welcome to');
      await expect(heading).toContainText('YourBank');
      await expect(heading).toContainText('Careers');
    });

    test('should display hero description text', async ({ page }) => {
      const description = page.locator('[data-testid="hero-description"]');
      await expect(description).toBeVisible();
      await expect(description).toContainText('Join our team');
    });

    test('should display the hero image', async ({ page }) => {
      await expect(page.locator('[data-testid="hero-image"]')).toBeVisible();
    });
  });

  // ── Values Section ───────────────────────────────────────────────────────────
  test.describe('Values Section', () => {
    test('should display the values section', async ({ page }) => {
      await expect(page.locator('[data-testid="values-section"]')).toBeVisible();
    });

    test('should show "Our Values" heading', async ({ page }) => {
      const section = page.locator('[data-testid="values-section"]');
      await expect(section).toContainText('Our');
      await expect(section).toContainText('Values');
    });

    test('should display 4 value cards', async ({ page }) => {
      const valuesGrid = page.locator('[data-testid="values-grid"]');
      await expect(valuesGrid).toBeVisible();
      const cards = valuesGrid.locator('[data-testid^="value-card-"]');
      await expect(cards).toHaveCount(4);
    });

    test('value cards should have correct titles', async ({ page }) => {
      await expect(page.locator('[data-testid="value-card-0"]')).toContainText('Integrity');
      await expect(page.locator('[data-testid="value-card-1"]')).toContainText('Customer Centricity');
      await expect(page.locator('[data-testid="value-card-2"]')).toContainText('Collaboration');
      await expect(page.locator('[data-testid="value-card-3"]')).toContainText('Innovation');
    });

    test('each value card should have description text', async ({ page }) => {
      const firstCard = page.locator('[data-testid="value-card-0"]');
      await expect(firstCard).toContainText('honesty');
    });
  });

  // ── Benefits Section ─────────────────────────────────────────────────────────
  test.describe('Benefits Section', () => {
    test('should display the benefits section', async ({ page }) => {
      await expect(page.locator('[data-testid="benefits-section"]')).toBeVisible();
    });

    test('should show "Our Benefits" heading', async ({ page }) => {
      const section = page.locator('[data-testid="benefits-section"]');
      await expect(section).toContainText('Our');
      await expect(section).toContainText('Benefits');
    });

    test('should display 4 benefit cards', async ({ page }) => {
      const benefitsGrid = page.locator('[data-testid="benefits-grid"]');
      await expect(benefitsGrid).toBeVisible();
      const cards = benefitsGrid.locator('[data-testid^="benefit-card-"]');
      await expect(cards).toHaveCount(4);
    });

    test('benefit cards should have correct titles', async ({ page }) => {
      await expect(page.locator('[data-testid="benefit-card-0"]')).toContainText('Competitive Compensation');
      await expect(page.locator('[data-testid="benefit-card-1"]')).toContainText('Health and Wellness');
      await expect(page.locator('[data-testid="benefit-card-2"]')).toContainText('Retirement Planning');
      await expect(page.locator('[data-testid="benefit-card-3"]')).toContainText('Work-Life Balance');
    });

    test('each benefit card should display an icon', async ({ page }) => {
      const firstCard = page.locator('[data-testid="benefit-card-0"]');
      const icon = firstCard.locator('.benefit-icon');
      await expect(icon).toBeVisible();
      await expect(icon).not.toBeEmpty();
    });
  });

  // ── Job Openings Section ─────────────────────────────────────────────────────
  test.describe('Job Openings Section', () => {
    test('should display the jobs section', async ({ page }) => {
      await expect(page.locator('[data-testid="jobs-section"]')).toBeVisible();
    });

    test('should show "Job Openings" heading', async ({ page }) => {
      const section = page.locator('[data-testid="jobs-section"]');
      await expect(section).toContainText('Job Openings');
    });

    test('should display 3 job cards', async ({ page }) => {
      const jobsGrid = page.locator('[data-testid="jobs-grid"]');
      await expect(jobsGrid).toBeVisible();
      const cards = jobsGrid.locator('[data-testid^="job-card-"]');
      await expect(cards).toHaveCount(3);
    });

    test('job card 0 should be Relationship Manager', async ({ page }) => {
      const jobTitle = page.locator('[data-testid="job-title-0"]');
      await expect(jobTitle).toBeVisible();
      await expect(jobTitle).toContainText('Relationship Manager');
    });

    test('job card 1 should be Risk Analyst', async ({ page }) => {
      const jobTitle = page.locator('[data-testid="job-title-1"]');
      await expect(jobTitle).toBeVisible();
      await expect(jobTitle).toContainText('Risk Analyst');
    });

    test('job card 2 should be IT Security Specialist', async ({ page }) => {
      const jobTitle = page.locator('[data-testid="job-title-2"]');
      await expect(jobTitle).toBeVisible();
      await expect(jobTitle).toContainText('IT Security Specialist');
    });

    test('each job card should show location', async ({ page }) => {
      const location0 = page.locator('[data-testid="job-location-0"]');
      await expect(location0).toBeVisible();
      await expect(location0).toContainText('Location: India');
    });

    test('each job card should show department', async ({ page }) => {
      const dept0 = page.locator('[data-testid="job-department-0"]');
      await expect(dept0).toBeVisible();
      await expect(dept0).toContainText('Department:');
    });

    test('each job card should have requirements list', async ({ page }) => {
      const requirements = page.locator('[data-testid="job-requirements-0"]');
      await expect(requirements).toBeVisible();
      const items = requirements.locator('li');
      await expect(items).not.toHaveCount(0);
    });

    test('each job card should have "Apply Now" button', async ({ page }) => {
      await expect(page.locator('[data-testid="apply-btn-0"]')).toBeVisible();
      await expect(page.locator('[data-testid="apply-btn-1"]')).toBeVisible();
      await expect(page.locator('[data-testid="apply-btn-2"]')).toBeVisible();
    });

    test('Relationship Manager should have 5 requirements', async ({ page }) => {
      const requirements = page.locator('[data-testid="job-requirements-0"]');
      const items = requirements.locator('li');
      await expect(items).toHaveCount(5);
    });

    test('Risk Analyst should have 5 requirements', async ({ page }) => {
      const requirements = page.locator('[data-testid="job-requirements-1"]');
      const items = requirements.locator('li');
      await expect(items).toHaveCount(5);
    });

    test('IT Security Specialist should have 5 requirements', async ({ page }) => {
      const requirements = page.locator('[data-testid="job-requirements-2"]');
      const items = requirements.locator('li');
      await expect(items).toHaveCount(5);
    });
  });

  // ── FAQ Section ──────────────────────────────────────────────────────────────
  test.describe('FAQ Section', () => {
    test('should display the FAQ section', async ({ page }) => {
      await expect(page.locator('[data-testid="faq-section"]')).toBeVisible();
    });

    test('should show "Frequently Asked Questions" heading', async ({ page }) => {
      const section = page.locator('[data-testid="faq-section"]');
      await expect(section).toContainText('Frequently');
      await expect(section).toContainText('Asked Questions');
    });

    test('should display 4 FAQ items', async ({ page }) => {
      const faqGrid = page.locator('[data-testid="faq-grid"]');
      await expect(faqGrid).toBeVisible();
      const items = faqGrid.locator('[data-testid^="faq-item-"]');
      await expect(items).toHaveCount(4);
    });

    test('first FAQ should ask about opening an account', async ({ page }) => {
      const faq0 = page.locator('[data-testid="faq-item-0"]');
      await expect(faq0).toContainText('How do I open an account');
    });

    test('second FAQ should ask about loan documents', async ({ page }) => {
      const faq1 = page.locator('[data-testid="faq-item-1"]');
      await expect(faq1).toContainText('documents');
      await expect(faq1).toContainText('loan');
    });

    test('should display "Load All FAQ\'s" button', async ({ page }) => {
      const loadBtn = page.locator('[data-testid="load-all-faq-btn"]');
      await expect(loadBtn).toBeVisible();
      await expect(loadBtn).toContainText("FAQ");
    });
  });

  // ── CTA Section ──────────────────────────────────────────────────────────────
  test.describe('CTA Section', () => {
    test('should display the CTA section', async ({ page }) => {
      await expect(page.locator('[data-testid="cta-section"]')).toBeVisible();
    });

    test('should contain "Start your Career" heading', async ({ page }) => {
      const section = page.locator('[data-testid="cta-section"]');
      await expect(section).toContainText('Start your Career');
      await expect(section).toContainText('YourBank');
    });

    test('should display "Open Account" button', async ({ page }) => {
      const btn = page.locator('[data-testid="cta-open-account-btn"]');
      await expect(btn).toBeVisible();
      await expect(btn).toContainText('Open Account');
    });
  });

  // ── Footer ───────────────────────────────────────────────────────────────────
  test.describe('Footer', () => {
    test('should display the footer', async ({ page }) => {
      await expect(page.locator('[data-testid="footer"]')).toBeVisible();
    });

    test('should display YourBank logo in footer', async ({ page }) => {
      const logo = page.locator('[data-testid="footer-logo"]');
      await expect(logo).toBeVisible();
      await expect(logo).toContainText('YourBank');
    });

    test('should display contact information', async ({ page }) => {
      const contact = page.locator('[data-testid="footer-contact"]');
      await expect(contact).toBeVisible();
      await expect(contact).toContainText('hello@skillbirdge.com');
    });

    test('should display social media buttons', async ({ page }) => {
      const social = page.locator('[data-testid="footer-social"]');
      await expect(social).toBeVisible();
      const buttons = social.locator('.social-btn');
      await expect(buttons).toHaveCount(3);
    });

    test('should display copyright text', async ({ page }) => {
      const footer = page.locator('[data-testid="footer"]');
      await expect(footer).toContainText('YourBank All Rights Reserved');
    });
  });

  // ── Visual/Theme Tests ───────────────────────────────────────────────────────
  test.describe('Theme & Visual', () => {
    test('app should have dark background', async ({ page }) => {
      const app = page.locator('[data-testid="app"]');
      const bgColor = await app.evaluate((el) => window.getComputedStyle(el).backgroundColor);
      // Background should be dark (close to #1c1c1c which is rgb(28, 28, 28))
      expect(bgColor).toMatch(/rgb\(28, 28, 28\)/);
    });

    test('accent color should be applied to highlighted text', async ({ page }) => {
      const accentText = page.locator('.accent-text').first();
      await expect(accentText).toBeVisible();
      const color = await accentText.evaluate((el) => window.getComputedStyle(el).color);
      // Accent color should be lime green (close to #caef45)
      expect(color).toMatch(/rgb\(202, (239|255), (69|51)\)/);
    });

    test('primary action buttons should have accent background', async ({ page }) => {
      const btn = page.locator('[data-testid="cta-open-account-btn"]');
      await expect(btn).toBeVisible();
      const bgColor = await btn.evaluate((el) => window.getComputedStyle(el).backgroundColor);
      // Should have lime green background
      expect(bgColor).toMatch(/rgb\(202, (239|255), (69|51)\)/);
    });
  });

  // ── Scroll & Interaction ─────────────────────────────────────────────────────
  test.describe('Scroll & Interaction', () => {
    test('should be able to scroll through all sections', async ({ page }) => {
      await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
      
      await page.locator('[data-testid="values-section"]').scrollIntoViewIfNeeded();
      await expect(page.locator('[data-testid="values-section"]')).toBeInViewport();
      
      await page.locator('[data-testid="benefits-section"]').scrollIntoViewIfNeeded();
      await expect(page.locator('[data-testid="benefits-section"]')).toBeInViewport();
      
      await page.locator('[data-testid="jobs-section"]').scrollIntoViewIfNeeded();
      await expect(page.locator('[data-testid="jobs-section"]')).toBeInViewport();
      
      await page.locator('[data-testid="faq-section"]').scrollIntoViewIfNeeded();
      await expect(page.locator('[data-testid="faq-section"]')).toBeInViewport();
      
      await page.locator('[data-testid="cta-section"]').scrollIntoViewIfNeeded();
      await expect(page.locator('[data-testid="cta-section"]')).toBeInViewport();
      
      await page.locator('[data-testid="footer"]').scrollIntoViewIfNeeded();
      await expect(page.locator('[data-testid="footer"]')).toBeInViewport();
    });
  });
});

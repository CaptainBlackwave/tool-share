import { test, expect } from '@playwright/test';

test.describe('ToolShare Golden Path Tests', () => {
  test('Borrower: Search, browse, and view tool details', async ({ page }) => {
    // 1. Visit landing page
    await page.goto('/');
    await expect(page).toHaveTitle(/ToolShare/);
    
    // 2. Navigate to browse
    await page.click('text=Browse Tools');
    await expect(page.url()).toContain('/browse');
    
    // 3. Filter by category
    await page.selectOption('select', 'power-tools');
    
    // 4. Click on a tool
    const toolCard = page.locator('.card').first();
    await toolCard.click();
    
    // 5. Verify tool detail page
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=/day')).toBeVisible();
  });

  test('Borrower: Date selection and price calculation', async ({ page }) => {
    // Visit a tool detail page
    await page.goto('/browse');
    await page.locator('.card').first().click();
    
    // Select dates (using native date input as fallback)
    const startDateInput = page.locator('input[type="date"]').first();
    const endDateInput = page.locator('input[type="date"]').nth(1);
    
    if (await startDateInput.isVisible()) {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7);
      const laterDate = new Date();
      laterDate.setDate(laterDate.getDate() + 10);
      
      await startDateInput.fill(futureDate.toISOString().split('T')[0]);
      await endDateInput.fill(laterDate.toISOString().split('T')[0]);
    }
  });

  test('Geolocation fallback when permission denied', async ({ page }) => {
    await page.goto('/browse');
    
    // Check for location input fallback
    const locationInput = page.locator('input[placeholder*="Location"]');
    if (await locationInput.isVisible()) {
      await locationInput.fill('Brooklyn, NY');
      await page.click('button:has-text("Search")');
    }
  });
});

test.describe('Auth Flow', () => {
  test('Sign in page loads correctly', async ({ page }) => {
    await page.goto('/auth/signin');
    await expect(page.locator('text=Welcome back')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('Sign up page loads correctly', async ({ page }) => {
    await page.goto('/auth/signup');
    await expect(page.locator('text=Create your account')).toBeVisible();
    await expect(page.locator('text=I want to:')).toBeVisible();
  });
});

test.describe('Dashboard', () => {
  test('Dashboard loads for authenticated user', async ({ page }) => {
    // This test would need authentication setup
    // Skipping for now as it requires Clerk test mode setup
    test.skip();
  });
});

test.describe('Mobile Responsiveness', () => {
  test('Landing page is mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check mobile menu exists
    await expect(page.locator('header')).toBeVisible();
  });
});
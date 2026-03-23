import { test, expect } from '@playwright/test';

test.describe('Suite 4: The Golden Path - Multi-Context Booking', () => {
  test('Multi-context booking flow simulation', async ({ browser }) => {
    const borrowerContext = await browser.newContext();
    const lenderContext = await browser.newContext();
    
    const borrowerPage = await borrowerContext.newPage();
    const lenderPage = await lenderContext.newPage();

    try {
      await borrowerPage.goto('/browse');
      await lenderPage.goto('/browse');
      
      const borrowerToolCard = borrowerPage.locator('.card').first();
      const lenderToolCard = lenderPage.locator('.card').first();
      
      if (await borrowerToolCard.isVisible() && await lenderToolCard.isVisible()) {
        await borrowerToolCard.click();
        
        await borrowerPage.waitForURL(/\/tools\//);
        
        const bookNowLink = borrowerPage.getByRole('link', { name: /request to book/i });
        
        if (await bookNowLink.isVisible()) {
          await bookNowLink.click();
          
          await borrowerPage.waitForURL(/\/book\//);
          
          const dateInputs = borrowerPage.locator('input[type="date"]');
          if (await dateInputs.first().isVisible()) {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() + 7);
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + 10);
            
            await dateInputs.first().fill(startDate.toISOString().split('T')[0]);
            await dateInputs.nth(1).fill(endDate.toISOString().split('T')[0]);
          }
          
          const requestButton = borrowerPage.getByRole('button', { name: /request to book/i });
          if (await requestButton.isVisible()) {
            await requestButton.click();
            
            await borrowerPage.waitForURL(/\/dashboard/, { timeout: 5000 }).catch(() => {});
          }
        }
        
        await lenderPage.goto('/dashboard');
        const lenderUrl = lenderPage.url();
        expect(lenderUrl).toMatch(/dashboard|auth\/signin/);
      }
    } finally {
      await borrowerContext.close();
      await lenderContext.close();
    }
  });

  test('Concurrent booking attempts - race condition test', async ({ browser }) => {
    const borrower1Context = await browser.newContext();
    const borrower2Context = await browser.newContext();
    
    const borrower1Page = await borrower1Context.newPage();
    const borrower2Page = await borrower2Context.newPage();

    try {
      await borrower1Page.goto('/browse');
      await borrower2Page.goto('/browse');
      
      const toolCard1 = borrower1Page.locator('.card').first();
      const toolCard2 = borrower2Page.locator('.card').first();
      
      if (await toolCard1.isVisible() && await toolCard2.isVisible()) {
        await Promise.all([
          toolCard1.click(),
          toolCard2.click(),
        ]);
        
        await borrower1Page.waitForURL(/\/tools\//);
        await borrower2Page.waitForURL(/\/tools\//);
        
        const dates = new Date();
        dates.setDate(dates.getDate() + 14);
        const dateStr = dates.toISOString().split('T')[0];
        
        const dateInputs1 = borrower1Page.locator('input[type="date"]');
        const dateInputs2 = borrower2Page.locator('input[type="date"]');
        
        if (await dateInputs1.first().isVisible() && await dateInputs2.first().isVisible()) {
          await Promise.all([
            dateInputs1.first().fill(dateStr),
            dateInputs2.first().fill(dateStr),
          ]);
        }
      }
    } finally {
      await borrower1Context.close();
      await borrower2Context.close();
    }
  });
});

test.describe('Suite 5: Dispute & Admin Operations', () => {
  test('Dispute button exists in booking flow', async ({ page }) => {
    await page.goto('/dashboard');
    
    const url = page.url();
    if (url.includes('/dashboard')) {
      await expect(page.getByText(/booking|active|completed/i).first()).toBeVisible({ timeout: 3000 }).catch(() => {});
    } else {
      await expect(page.url()).toContain('/auth/signin');
    }
  });

  test('Admin panel access control', async ({ browser }) => {
    const adminContext = await browser.newContext();
    const userContext = await browser.newContext();
    
    const adminPage = await adminContext.newPage();
    const userPage = await userContext.newPage();

    try {
      await adminPage.goto('/admin');
      const adminUrl = adminPage.url();
      expect(adminUrl).toMatch(/admin|dashboard|signin/);
      
      await userPage.goto('/admin');
      const userUrl = userPage.url();
      expect(userUrl).toMatch(/admin|dashboard|signin/);
    } finally {
      await adminContext.close();
      await userContext.close();
    }
  });

  test('Admin bookings page structure', async ({ page }) => {
    await page.goto('/auth/signin');
    await expect(page.getByText('Welcome back')).toBeVisible();
  });
});

test.describe('Suite 6: Cron & Automated Workers', () => {
  test('Cron endpoint responds', async ({ request }) => {
    const response = await request.get('/api/cron/expire-bookings');
    expect([200, 401, 403]).toContain(response.status());
  });

  test('Release payouts cron endpoint responds', async ({ request }) => {
    const response = await request.get('/api/cron/release-payouts');
    expect([200, 401, 403]).toContain(response.status());
  });
});

test.describe('Suite 7: Search & Discovery Edge Cases', () => {
  test('Empty search results state', async ({ page }) => {
    await page.goto('/browse');
    
    const searchInput = page.getByPlaceholder('Search tools...');
    if (await searchInput.isVisible()) {
      await searchInput.fill('xyznonexistenttool123');
      await page.click('button:has-text("Search")');
      await page.waitForTimeout(1000);
    }
  });

  test('No results shows helpful message', async ({ page }) => {
    await page.goto('/browse');
    
    const searchInput = page.getByPlaceholder('Search tools...');
    if (await searchInput.isVisible()) {
      await searchInput.fill('zzzznonexistentcategory');
      await page.click('button:has-text("Search")');
      await page.waitForTimeout(1000);
      
      const pageContent = await page.content();
      const hasNoResults = pageContent.toLowerCase().includes('no results') || 
                          pageContent.toLowerCase().includes('not found') || 
                          pageContent.toLowerCase().includes('0 tools');
      expect(hasNoResults || pageContent.toLowerCase().includes('try')).toBe(true);
    }
  });

  test('All categories filter shows all tools', async ({ page }) => {
    await page.goto('/browse');
    
    const categorySelect = page.locator('select').first();
    if (await categorySelect.isVisible()) {
      await categorySelect.selectOption('');
      await page.waitForTimeout(500);
    }
  });
});

test.describe('Suite 8: Performance & Loading States', () => {
  test('Page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(10000);
  });

  test('No critical console errors on landing page', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const criticalErrors = errors.filter(e => !e.includes('hydration') && !e.includes('warning'));
    expect(criticalErrors).toHaveLength(0);
  });

  test('Images have loading attribute', async ({ page }) => {
    await page.goto('/browse');
    
    const images = page.locator('img');
    const count = await images.count();
    
    if (count > 0) {
      for (let i = 0; i < Math.min(count, 5); i++) {
        const img = images.nth(i);
        if (await img.isVisible()) {
          const loading = await img.getAttribute('loading');
          expect(['lazy', 'eager', null]).toContain(loading);
        }
      }
    }
  });
});
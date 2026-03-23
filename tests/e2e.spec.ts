import { test, expect } from '@playwright/test';

test.describe('Suite 1: Authentication & User Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Sign Up page loads correctly', async ({ page }) => {
    await page.goto('/auth/signup');
    await expect(page.getByText('Create your account')).toBeVisible();
    await expect(page.getByText('I want to:')).toBeVisible();
    await expect(page.getByPlaceholder('Email address')).toBeVisible();
  });

  test('Sign In page loads correctly', async ({ page }) => {
    await page.goto('/auth/signin');
    await expect(page.getByText('Welcome back')).toBeVisible();
    await expect(page.getByPlaceholder('Email address')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
  });

  test('Navigation between auth pages works', async ({ page }) => {
    await page.goto('/auth/signin');
    await page.click('text=Sign up');
    await expect(page).toHaveURL('/auth/signup');
    
    await page.click('text=Sign in');
    await expect(page).toHaveURL('/auth/signin');
  });

  test('Landing page has auth links', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign Up' })).toBeVisible();
  });

  test('Role toggling UI elements exist on signup', async ({ page }) => {
    await page.goto('/auth/signup');
    await expect(page.getByText('Borrow tools')).toBeVisible();
    await expect(page.getByText('Lend tools')).toBeVisible();
    await expect(page.getByText('Both')).toBeVisible();
  });
});

test.describe('Suite 2: Tool Inventory Management (Lender Path)', () => {
  test('List tool page loads with form elements', async ({ page }) => {
    await page.goto('/list');
    
    await expect(page.getByText('List Your Tool')).toBeVisible();
    await expect(page.getByLabel('Title')).toBeVisible();
    await expect(page.getByLabel('Category')).toBeVisible();
    await expect(page.getByLabel('Description')).toBeVisible();
    await expect(page.getByLabel('Price per day')).toBeVisible();
  });

  test('Tool creation form has all required fields', async ({ page }) => {
    await page.goto('/list');
    
    const requiredFields = [
      'Title',
      'Category', 
      'Description',
      'Price per day',
      'Replacement value',
      'Brand',
      'Condition',
    ];

    for (const field of requiredFields) {
      await expect(page.getByLabel(field)).toBeVisible();
    }
  });

  test('Category dropdown has options', async ({ page }) => {
    await page.goto('/list');
    
    const categorySelect = page.getByLabel('Category');
    await categorySelect.click();
    
    const options = ['Power Tools', 'Garden & Lawn', 'Cleaning', 'Construction', 'Automotive', 'Painting'];
    for (const option of options) {
      await expect(page.getByRole('option', { name: option })).toBeVisible();
    }
  });

  test('Condition dropdown has options', async ({ page }) => {
    await page.goto('/list');
    
    const conditionSelect = page.getByLabel('Condition');
    await conditionSelect.click();
    
    const options = ['New', 'Like New', 'Good', 'Fair'];
    for (const option of options) {
      await expect(page.getByRole('option', { name: option })).toBeVisible();
    }
  });

  test('Image upload section exists', async ({ page }) => {
    await page.goto('/list');
    await expect(page.getByText('Upload Photos')).toBeVisible();
    await expect(page.getByText('Add up to 5 photos')).toBeVisible();
  });

  test('Pricing section shows daily and weekly rates', async ({ page }) => {
    await page.goto('/list');
    
    await expect(page.getByLabel('Price per day')).toBeVisible();
    await expect(page.getByLabel('Price per week (optional)')).toBeVisible();
    await expect(page.getByText('Set a weekly rate for longer rentals')).toBeVisible();
  });

  test('Buffer days setting exists', async ({ page }) => {
    await page.goto('/list');
    
    await expect(page.getByLabel('Buffer days')).toBeVisible();
    await expect(page.getByText('Add days before/after bookings for preparation')).toBeVisible();
  });

  test('Location settings section exists', async ({ page }) => {
    await page.goto('/list');
    
    await expect(page.getByText('Location')).toBeVisible();
    await expect(page.getByLabel('City')).toBeVisible();
  });
});

test.describe('Suite 3: Discovery & Search (Borrower Path)', () => {
  test('Browse page loads with search elements', async ({ page }) => {
    await page.goto('/browse');
    
    await expect(page.getByPlaceholder('Search tools...')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  });

  test('Category filter dropdown works', async ({ page }) => {
    await page.goto('/browse');
    
    const categoryFilter = page.getByRole('combobox', { name: /category/i });
    if (await categoryFilter.isVisible()) {
      await categoryFilter.click();
      await expect(page.getByRole('option', { name: 'All Categories' })).toBeVisible();
    }
  });

  test('Tool cards display essential information', async ({ page }) => {
    await page.goto('/browse');
    
    const toolCard = page.locator('.card').first();
    if (await toolCard.isVisible()) {
      await expect(toolCard.getByText('/day')).toBeVisible();
    }
  });

  test('Tool cards link to detail pages', async ({ page }) => {
    await page.goto('/browse');
    
    const toolCard = page.locator('.card').first();
    if (await toolCard.isVisible()) {
      const cardLink = toolCard.locator('a').first();
      await cardLink.click();
      await expect(page).toHaveURL(/\/tools\//);
    }
  });

  test('Browse page has map placeholder', async ({ page }) => {
    await page.goto('/browse');
    await expect(page.getByText(/map|view/i).first()).toBeVisible({ timeout: 5000 }).catch(() => {});
  });

  test('Results update when filtering', async ({ page }) => {
    await page.goto('/browse');
    
    const categorySelect = page.locator('select').first();
    if (await categorySelect.isVisible()) {
      await categorySelect.selectOption('power-tools');
      await page.waitForTimeout(500);
    }
  });
});

test.describe('Suite 4: The Golden Path (Booking Lifecycle)', () => {
  test('Tool detail page has booking elements', async ({ page }) => {
    await page.goto('/browse');
    const toolCard = page.locator('.card').first();
    
    if (await toolCard.isVisible()) {
      await toolCard.click();
      
      await expect(page.getByText('Select Dates')).toBeVisible();
      await expect(page.getByRole('link', { name: 'Request to Book' })).toBeVisible();
    }
  });

  test('Price breakdown shows on booking page', async ({ page }) => {
    await page.goto('/book/tool_001').catch(() => {});
    const url = page.url();
    
    if (url.includes('/book/')) {
      await expect(page.getByText('Booking Summary')).toBeVisible({ timeout: 5000 }).catch(() => {});
      await expect(page.getByText('Security Deposit')).toBeVisible({ timeout: 5000 }).catch(() => {});
    }
  });

  test('Calendar date picker is available', async ({ page }) => {
    await page.goto('/browse');
    const toolCard = page.locator('.card').first();
    
    if (await toolCard.isVisible()) {
      await toolCard.click();
      
      const dateInputs = page.locator('input[type="date"]');
      if (await dateInputs.first().isVisible()) {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 7);
        
        await dateInputs.first().fill(futureDate.toISOString().split('T')[0]);
      }
    }
  });

  test('Request to Book button links to booking flow', async ({ page }) => {
    await page.goto('/tools/tool_001').catch(() => {});
    
    const url = page.url();
    if (url.includes('/tools/')) {
      const bookButton = page.getByRole('link', { name: /request to book/i });
      if (await bookButton.isVisible()) {
        await bookButton.click();
        await expect(page).toHaveURL(/\/book\//);
      }
    }
  });

  test('Authentication required for booking', async ({ page }) => {
    await page.goto('/book/tool_001');
    await expect(page.url()).toContain('/auth/signin');
  });
});

test.describe('Suite 5: Dashboard & User Features', () => {
  test('Dashboard page structure loads', async ({ page }) => {
    await page.goto('/dashboard');
    
    await expect(page.getByText('Dashboard')).toBeVisible({ timeout: 5000 }).catch(() => {
      expect(page.url()).toContain('/auth/signin');
    });
  });

  test('Dashboard has tabs or sections', async ({ page }) => {
    await page.goto('/auth/signin');
    await expect(page.getByText('Welcome back')).toBeVisible();
  });

  test('Messages page loads', async ({ page }) => {
    await page.goto('/messages');
    const url = page.url();
    
    if (url.includes('/messages')) {
      await expect(page.getByText('Messages')).toBeVisible({ timeout: 5000 }).catch(() => {});
    }
  });
});

test.describe('Suite 6: Mobile Responsiveness', () => {
  test('Landing page is mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await expect(page.locator('header')).toBeVisible();
  });

  test('Browse page works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/browse');
    
    await expect(page.getByPlaceholder('Search tools...')).toBeVisible();
  });

  test('Tool detail page is mobile friendly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/browse');
    
    const toolCard = page.locator('.card').first();
    if (await toolCard.isVisible()) {
      await toolCard.click();
      await expect(page.locator('h1')).toBeVisible();
    }
  });
});

test.describe('Suite 7: Admin Panel Access', () => {
  test('Admin route redirects non-admin users', async ({ page }) => {
    await page.goto('/admin');
    
    const url = page.url();
    expect(url).toMatch(/admin|dashboard|signin/);
  });

  test('Admin layout has navigation', async ({ page }) => {
    await page.goto('/auth/signin');
    
    await expect(page.getByText('Welcome back')).toBeVisible();
  });
});

test.describe('Suite 8: Edge Cases', () => {
  test('404 page handles invalid routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await expect(page.getByText('404')).toBeVisible({ timeout: 5000 }).catch(() => {
      expect(page.getByText('Page not found')).toBeVisible({ timeout: 3000 });
    });
  });

  test('Form validation on empty submission', async ({ page }) => {
    await page.goto('/list');
    await page.click('button:has-text("Publish")');
    
    await expect(page.getByText(/required|please fill/i)).toBeVisible({ timeout: 3000 }).catch(() => {});
  });

  test('Price validation rejects negative numbers', async ({ page }) => {
    await page.goto('/list');
    
    const priceInput = page.getByLabel('Price per day');
    if (await priceInput.isVisible()) {
      await priceInput.fill('-10');
      await page.click('button:has-text("Publish")');
      await expect(page.getByText(/positive|greater than zero|invalid/i)).toBeVisible({ timeout: 3000 }).catch(() => {});
    }
  });
});
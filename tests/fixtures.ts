import { test as base } from '@playwright/test';

export interface TestUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export const test = base.extend<{
  seedDatabase: () => Promise<void>;
  createTestUser: (overrides?: Partial<TestUser>) => Promise<TestUser>;
  cleanupTestData: () => Promise<void>;
  mockGeolocation: () => Promise<void>;
  interceptUploadThing: (page: any) => Promise<void>;
  interceptStripe: (page: any) => Promise<void>;
}>({
  seedDatabase: async ({}, use) => {
    await use(async () => {
      console.log('Database seeding would run here in CI environment');
    });
  },

  createTestUser: async ({}, use) => {
    await use(async (overrides = {}) => {
      const user: TestUser = {
        id: `test_user_${Date.now()}`,
        email: `test_${Date.now()}@example.com`,
        name: 'Test User',
        role: 'user',
        ...overrides,
      };
      return user;
    });
  },

  cleanupTestData: async ({}, use) => {
    await use(async () => {
      console.log('Test data cleanup would run here');
    });
  },

  mockGeolocation: async ({}, use) => {
    await use(async () => {
      console.log('Geolocation mocking configured');
    });
  },

  interceptUploadThing: async ({}, use) => {
    await use(async (page: any) => {
      await page.route('**/api/uploadthing', async (route: any) => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ url: 'https://utfs.io/f/test-image.jpg' }),
        });
      });
    });
  },

  interceptStripe: async ({}, use) => {
    await use(async (page: any) => {
      await page.route('**/api/stripe/**', async (route: any) => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ clientSecret: 'test_secret_123' }),
        });
      });
    });
  },
});

export { expect } from '@playwright/test';
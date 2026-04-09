import dotenv from 'dotenv';

import { defineConfig, devices } from '@playwright/test';
import { getPortalConfig, Portal } from '@constants/env';

/**
 * See https://playwright.dev/docs/test-configuration.
 */

dotenv.config();

const portalConfig = getPortalConfig(null);

const desktopViewport = {
  width: 2520,
  height: 1480,
};

const chromeConfig = {
  ...devices['Desktop Chrome'],
  channel: 'chromium',
  viewport: desktopViewport,
};

const webkitConfig = {
  ...devices['Desktop Safari'],
  viewport: desktopViewport,
};

const deps = {
  dependencies: [process.env.CI ? 'setup' : 'create-entities-main'],
  teardown: undefined,
};

export default defineConfig({
  testDir: portalConfig.testDir,

  /* Global timeout for the whole test run is given 2 hours */
  globalTimeout: 2 * 60 * 60 * 1000,

  /* Each test is given 10 minutes */
  timeout: 10 * 60 * 1000,

  /* Each assertion is given 10 seconds */
  expect: { timeout: 10 * 1000 },
  
  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Parallel tests config */
  workers: process.env.CI ? 10 : undefined,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Limit the number of failures on CI to save resources */
  maxFailures: process.env.CI ? 30 : undefined,

  /* Retry on CI only */
  retries: process.env.CI && portalConfig.name === Portal.SOLOMONO ? 1 : 0,
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'never' }],
    [
      'allure-playwright',
      {
        environmentInfo: {
          OS: process.platform,
          CI: process.env.CI ? 'Yes' : 'No',
          BUILD_ID: process.env.BUILD_ID,
        },
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: getPortalConfig(null).baseUrl,

    /* Each action is given 10 seconds */
    actionTimeout: 10 * 1000,

    /* Each navigation is given 30 seconds */
    navigationTimeout: 30 * 1000,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'off',

    /* Screenshots on failure */
    screenshot: {
      mode: 'on-first-failure',
      fullPage: true,
    },

    /* Set timezone */
    timezoneId: 'UTC',
  },

  /* Configure projects for major browsers */
  projects: (() => {
    const baseProjects = [
      {
        name: 'setup',
        testMatch: '**/global.setup.ts',
      },
      {
        name: 'clean-db',
        testMatch: '**/db.cleanup.ts',
      },
    ];

    const solomonoProject =
      portalConfig.name === Portal.SOLOMONO
        ? [
          {
            name: 'full-flow-chromium',
            testMatch: '**/*.spec.full-flow.ts',
            use: { ...chromeConfig, trace: 'retain-on-failure' as const },
            ...deps,
          },
          {
            name: 'single-chromium',
            testMatch: '**/*.spec.single.ts',
            use: { ...chromeConfig, trace: 'retain-on-failure' as const },
            ...deps,
          },
          {
            name: 'webkit',
            use: { ...webkitConfig, trace: 'on-first-retry' as const },
            ...deps,
          },
          {
            name: 'single-webkit',
            testMatch: '**/*.spec.single.ts',
            use: { ...webkitConfig, trace: 'on-first-retry' as const },
            ...deps,
          },
        ]
        : [];

    const commonProjects = [
      {
        name: 'create-entities-main',
        testMatch: '**/global.create-entities-main.ts',
        dependencies: ['setup'],
        retries: 1,
      },
      {
        name: 'chromium',
        testMatch: '**/*.spec.ts',
        use: { ...chromeConfig, trace: 'retain-on-failure' as const },
        ...deps,
      },
      {
        name: 'debug',
        testDir: './tests',
        testMatch: '**/debug.spec.ts',
        use: { ...chromeConfig, trace: 'off' },
        dependencies: ['setup'],
      },
    ];

    return [...baseProjects, ...solomonoProject, ...commonProjects];
  })(),
});

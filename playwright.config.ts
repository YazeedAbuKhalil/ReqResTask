import { defineConfig, devices } from '@playwright/test';
// import { json } from 'stream/consumers';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  // reporter: [
  //   ['line'],
  //   ['list'],
  //   ['dot'],
  //   ['html'],
  //   ['json', { outputFile: "jsonreportfile.json" }],
  //   ['junit', { outputFile: "junitreportexml.xml" }]
  // ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    extraHTTPHeaders: {
      'x-api-key': 'reqres-free-v1',
    },
    /* Base URL to use in actions like `await page.goto('/')`. */

    screenshot: 'only-on-failure',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',

      use: {

        ...devices['Desktop Chrome']
      },
    },
    // {//Here, the config reads from .env if available, but has a backup value. Very clean setup.
    //   // use:{  baseURL: process.env.BASE_URL || 'https://default-site.com',}
    // }
    // {
    //   name: 'firefox',
    //   workers: 1,
    //   use: {
    //     ...devices['Desktop Firefox'],
    // permissions:['geolocation','camera'],
    // permissions:['notifications'],
    // permissions:['camera'],//allow camera whithout asking
    // permissions:['microphone'],
    // permissions:['clipboard-read']
    // },},

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

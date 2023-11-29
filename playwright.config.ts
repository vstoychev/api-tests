import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    use: {
        baseURL: 'https://reqres.in/api/',
        extraHTTPHeaders: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            //   'Authorization': `token ${process.env.API_TOKEN}`,
        },
    }
});
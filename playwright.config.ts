import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    testDir: './tests',
    webServer: {
        command: 'NODE_OPTIONS=--openssl-legacy-provider npm start',
        port: 3000,
        timeout: 300 * 1000,
        reuseExistingServer: !process.env.CI,
    },
    timeout: 60 * 1000,
    use: {
        baseURL: 'http://localhost:3000',
        screenshot: 'only-on-failure',
    },
};

export default config;

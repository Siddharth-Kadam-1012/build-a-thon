const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

// Resolve node executable path
const nodeExe = process.execPath;
const npmCli = path.join(path.dirname(nodeExe), 'node_modules', 'npm', 'bin', 'npm-cli.js');
const clientDir = path.resolve(__dirname, '../dotnet-react-app/client');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 10000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: `"${nodeExe}" "${npmCli}" start`,
    cwd: clientDir,
    url: 'http://localhost:3001',
    reuseExistingServer: true,
    timeout: 120 * 1000,
    env: {
      BROWSER: 'none',
      PORT: '3001',
    },
  },
});

// Made with Bob

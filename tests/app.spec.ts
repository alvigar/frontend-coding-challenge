import { test, expect } from '@playwright/test';

test.describe('App E2E', () => {
    test.beforeEach(async ({ page }) => {
        page.on('console', msg => console.log(`BROWSER LOAD: ${msg.text()}`));
        // Go to home page
        await page.goto('/');
        // Wait for initial load (user fetch simulation)
        await page.waitForTimeout(1000);
    });

    test('should load home page and display welcome message', async ({ page }) => {
        await expect(page).toHaveTitle(/Webbundle Starter Kit/);
        await expect(page.locator('h1')).toContainText('Welcome!');
    });

    test('should display known issues list', async ({ page }) => {
        await expect(page.getByText('Console error')).toBeVisible();
        await expect(page.getByText('User avatar in app bar is missing')).toBeVisible();
    });

    test('should switch languages', async ({ page }) => {
        // Check initial EN state
        await expect(page.locator('h1')).toContainText('Welcome!');

        // Switch to DE
        await page.click('div[role="button"]:has-text("EN")'); // Open Select
        await page.click('li[data-value="de"]'); // Click DE option

        // Verify DE content
        await expect(page.locator('h1')).toContainText('Willkommen!');

        // Switch back to EN
        await page.click('div[role="button"]:has-text("DE")');
        await page.click('li[data-value="en"]');

        // Verify EN content
        await expect(page.locator('h1')).toContainText('Welcome!');
    });

    test('should display user avatar and menu', async ({ page }) => {
        // Check for initials "AT" (Aria Test from fake store)
        // Wait for the avatar to appear (it relies on async user fetch)
        const avatar = page.locator('.MuiAvatar-root');
        await expect(avatar).toContainText('AT');

        // Open menu
        await avatar.click();

        // Check menu content
        await expect(page.getByText('Aria Test')).toBeVisible();
        await expect(page.getByText('linda.bolt@osapiens.com')).toBeVisible();
        await expect(page.getByText('Logout')).toBeVisible();
    });

    test('should display app header elements', async ({ page }) => {
        // Countdown should be visible
        await expect(page.locator('text=/:[0-9]{2}/')).toBeVisible();
        // Titles
        await expect(page.getByText('SUPPLIER OS APPLICATION')).toBeVisible();
        await expect(page.getByText('BUG BOUNTY CHALLENGE')).toBeVisible();
    });

    test('should fallback to EN for unsupported languages', async ({ browser }) => {
        const context = await browser.newContext({ locale: 'fr-FR' });
        const page = await context.newPage();
        await page.goto('/');

        // Should show EN welcome
        await expect(page.locator('h1')).toContainText('Welcome!');
        // Select should show EN
        await expect(page.locator('.MuiSelect-select')).toHaveText('EN');

        await context.close();
    });
});

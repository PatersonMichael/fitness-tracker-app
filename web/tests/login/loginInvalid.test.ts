import { test, expect } from "@playwright/test";

test("Login page displays invalid credentials when ", async ({ page }) => {
    // Go to http://localhost:3000/
    await page.goto("http://localhost:3000/");

    // Click button:has-text("Login")
    await page.locator('button:has-text("Login")').click();
    await expect(page).toHaveURL("http://localhost:3000/login");

    // Click [placeholder="\@email"]
    await page.locator('[placeholder="\\@email"]').click();

    // Fill [placeholder="\@email"]
    await page.locator('[placeholder="\\@email"]').fill("badlogin@email.com");

    // Click [placeholder="password"]
    await page.locator('[placeholder="password"]').click();

    // Fill [placeholder="password"]
    await page.locator('[placeholder="password"]').fill("test123");

    // Click button:has-text("Login")
    await page.locator('button:has-text("Login")').click();

    // Click text=Invalid Credentials
    await page.locator("text=Invalid Credentials").click();
});

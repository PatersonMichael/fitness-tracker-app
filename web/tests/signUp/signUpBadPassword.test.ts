import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
    // Go to http://localhost:3000/
    await page.goto("http://localhost:3000/");

    // Click button:has-text("Login")
    await page.locator('button:has-text("Login")').click();
    await expect(page).toHaveURL("http://localhost:3000/login");

    // Click text=Sign Up
    await page.locator("text=Sign Up").click();
    await expect(page).toHaveURL("http://localhost:3000/signup");

    // Click button:has-text("Sign Up")
    await page.locator('button:has-text("Sign Up")').click();

    // Fill [placeholder="First name"]
    await page.locator('[placeholder="First name"]').fill("first");

    // Click [placeholder="Last name"]
    await page.locator('[placeholder="Last name"]').click();

    // Fill [placeholder="Last name"]
    await page.locator('[placeholder="Last name"]').fill("last");

    // Click [placeholder="\@email"]
    await page.locator('[placeholder="\\@email"]').click();

    // Fill [placeholder="\@email"]
    await page.locator('[placeholder="\\@email"]').fill("fake@email.com");

    // Click [placeholder="password"]
    await page.locator('[placeholder="password"]').click();

    // Fill [placeholder="password"]
    await page.locator('[placeholder="password"]').fill("badpassword");

    // Click button:has-text("Sign Up")
    await page.locator('button:has-text("Sign Up")').click();

    // Click text=Password must contain at least 8 characters, 1 lowercase, 1 uppercase, 1 number,
    await page
        .locator(
            "text=Password must contain at least 8 characters, 1 lowercase, 1 uppercase, 1 number,"
        )
        .click();
});

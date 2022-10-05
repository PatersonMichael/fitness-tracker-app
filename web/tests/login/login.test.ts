import { test, expect } from "@playwright/test";

test("user successfuly logs in to application", async ({ page }) => {
    // Go to http://localhost:3000/
    await page.goto("http://localhost:3000/");

    // Click button:has-text("Login")
    await page.locator('button:has-text("Login")').click();
    await expect(page).toHaveURL("http://localhost:3000/login");

    // Click [placeholder="\@email"]
    await page.locator('[placeholder="\\@email"]').click();

    // Fill [placeholder="\@email"]
    await page.locator('[placeholder="\\@email"]').fill("testguy@example.org");

    // Click [placeholder="password"]
    await page.locator('[placeholder="password"]').click();

    // Fill [placeholder="password"]
    await page.locator('[placeholder="password"]').fill("test$123");

    // Click button:has-text("Login")
    await page.locator('button:has-text("Login")').click();
    await expect(page).toHaveURL("http://localhost:3000/dashboard");

    // Click button >> nth=0
    await page.locator("button").first().click();

    // Click text=Logout
    await page.locator("text=Logout").click();
    await expect(page).toHaveURL("http://localhost:3000/");
});

import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("A new user is successfully created", async ({ page }) => {
    // const strongPasswordRegex = new RegExp(
    //     "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    // );

    const fakeUser = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        emailAddress: faker.internet.email(),
        password: "Test$123",
    };

    // Go to http://localhost:3000/
    await page.goto("http://localhost:3000/");

    // Click button:has-text("Login")
    await page.locator('button:has-text("Login")').click();
    await expect(page).toHaveURL("http://localhost:3000/login");

    // Click text=Sign Up
    await page.locator("text=Sign Up").click();
    await expect(page).toHaveURL("http://localhost:3000/signup");

    // Click [placeholder="First name"]
    await page.locator('[placeholder="First name"]').click();

    // Fill [placeholder="First name"]
    await page.locator('[placeholder="First name"]').fill(fakeUser.firstName);

    // Click [placeholder="Last name"]
    await page.locator('[placeholder="Last name"]').click();

    // Fill [placeholder="Last name"]
    await page.locator('[placeholder="Last name"]').fill(fakeUser.lastName);

    // Click [placeholder="\@email"]
    await page.locator('[placeholder="\\@email"]').click();

    // Fill [placeholder="\@email"]
    await page.locator('[placeholder="\\@email"]').fill(fakeUser.emailAddress);

    // Click [placeholder="password"]
    await page.locator('[placeholder="password"]').click();

    // Fill [placeholder="password"]
    await page.locator('[placeholder="password"]').fill(fakeUser.password);

    // Click button:has-text("Sign Up")
    await page.locator('button:has-text("Sign Up")').click();
    await expect(page).toHaveURL("http://localhost:3000/login");
});

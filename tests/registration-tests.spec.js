const { test, expect } = require("@playwright/test");

function generateRandomPrefix(length = 5) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}
let emailPrefix;

test.describe("Registration Form Tests", () => {
  test.beforeEach(async ({ page }) => {
    emailPrefix = `aqa_${generateRandomPrefix()}`;
    await page.goto("https://guest:welcome2qauto@qauto.forstudy.space/");
    await page.waitForTimeout(10000);
  });
  // Positive scenario
  test("Successful Registration", async ({ page }) => {
    await page.click("text=Sign up");
    await page.fill('input[name="name"]', "John");
    await page.fill('input[name="lastName"]', "Doe");
    await page.fill('input[name="email"]', `${emailPrefix}-testuser@test.com`);
    await page.fill('input[name="password"]', "Password123");
    await page.fill('input[name="repeatPassword"]', "Password123");
    await page.click("text=Register");

    await expect(page).toHaveURL("https://qauto.forstudy.space/panel/garage");
  });

  test('Empty "Name" field', async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupName").click();
    await page.locator("#signupLastName").fill("Doe");
    await page.getByLabel("Name").fill(`${emailPrefix}-testuser@test.com`);
    await page.getByLabel("Password", { exact: true }).fill("Password123");
    await page.getByLabel("Re-enter password").fill("Password123");
    await page.getByLabel("Password", { exact: true }).click();
    await expect(page.getByRole("paragraph")).toContainText("Name required");

    const borderColor = await page.evaluate(
      () =>
        getComputedStyle(document.querySelector('input[name="name"]'))
          .borderColor
    );
    expect(borderColor).toBe("rgb(220, 53, 69)");
  });

  test('Invalid "Name" data', async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupName").fill("123");
    await page.locator("#signupLastName").fill("Doe");
    await page.getByLabel("Name").fill(`${emailPrefix}-testuser@test.com`);
    await page.getByLabel("Password", { exact: true }).fill("Password123");
    await page.getByLabel("Re-enter password").fill("Password123");
    await expect(page.getByRole("paragraph")).toContainText("Name is invalid");

    const borderColor = await page.evaluate(
      () =>
        getComputedStyle(document.querySelector('input[name="name"]'))
          .borderColor
    );
    expect(borderColor).toBe("rgb(220, 53, 69)");
  });

  test('Wrong "Name" length', async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupName").fill("A");
    await page.locator("#signupLastName").fill("Doe");
    await page.getByLabel("Name").fill(`${emailPrefix}-testuser@test.com`);
    await page.getByLabel("Password", { exact: true }).fill("Password123");
    await page.getByLabel("Re-enter password").fill("Password123");
    await expect(page.getByRole("paragraph")).toContainText(
      "Name has to be from 2 to 20 characters long"
    );

    const borderColor = await page.evaluate(
      () =>
        getComputedStyle(document.querySelector('input[name="name"]'))
          .borderColor
    );
    expect(borderColor).toBe("rgb(220, 53, 69)");
  });

  test('Empty "Last name" field', async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupName").fill("John");
    await page.locator("#signupLastName").click();
    await page.getByLabel("Name").fill(`${emailPrefix}-testuser@test.com`);
    await page.getByLabel("Password", { exact: true }).fill("Password123");
    await page.getByLabel("Re-enter password").fill("Password123");
    await expect(page.getByRole("paragraph")).toContainText(
      "Last name required"
    );

    const borderColor = await page.evaluate(
      () =>
        getComputedStyle(document.querySelector('input[name="lastName"]'))
          .borderColor
    );
    expect(borderColor).toBe("rgb(220, 53, 69)");
  });

  test('Invalid "Last name" data', async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupName").fill("John");
    await page.locator("#signupLastName").fill("123");
    await page.getByLabel("Name").fill(`${emailPrefix}-testuser@test.com`);
    await page.getByLabel("Password", { exact: true }).fill("Password123");
    await page.getByLabel("Re-enter password").fill("Password123");
    await expect(page.getByRole("paragraph")).toContainText(
      "Last name is invalid"
    );

    const borderColor = await page.evaluate(
      () =>
        getComputedStyle(document.querySelector('input[name="lastName"]'))
          .borderColor
    );
    expect(borderColor).toBe("rgb(220, 53, 69)");
  });

  test('Wrong "Last name" length', async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupName").fill("John");
    await page.locator("#signupLastName").fill("A");
    await page.getByLabel("Name").fill(`${emailPrefix}-testuser@test.com`);
    await page.getByLabel("Password", { exact: true }).fill("Password123");
    await page.getByLabel("Re-enter password").fill("Password123");
    await expect(page.getByRole("paragraph")).toContainText(
      "Last name has to be from 2 to 20 characters long"
    );

    const borderColor = await page.evaluate(
      () =>
        getComputedStyle(document.querySelector('input[name="lastName"]'))
          .borderColor
    );
    expect(borderColor).toBe("rgb(220, 53, 69)");
  });

  test('Invalid "Email" format', async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupName").fill("John");
    await page.locator("#signupLastName").fill("Doe");
    await page.getByLabel("Name").fill("invalid-email");
    await page.getByLabel("Password", { exact: true }).fill("Password123");
    await page.getByLabel("Re-enter password").fill("Password123");
    await expect(page.getByRole("paragraph")).toContainText(
      "Email is incorrect"
    );

    const borderColor = await page.evaluate(
      () =>
        getComputedStyle(document.querySelector('input[name="email"]'))
          .borderColor
    );
    expect(borderColor).toBe("rgb(220, 53, 69)");
  });

  test('Empty "Email" field', async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupName").fill("John");
    await page.locator("#signupLastName").fill("Doe");
    await page.getByLabel("Name").click();
    await page.getByLabel("Password", { exact: true }).fill("Password123");
    await page.getByLabel("Re-enter password").fill("Password123");
    await expect(page.getByRole("paragraph")).toContainText("Email required");

    const borderColor = await page.evaluate(
      () =>
        getComputedStyle(document.querySelector('input[name="email"]'))
          .borderColor
    );
    expect(borderColor).toBe("rgb(220, 53, 69)");
  });

  test('Invalid "Password" data - Less than 8 characters', async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupName").fill("John");
    await page.locator("#signupLastName").fill("Doe");
    await page.getByLabel("Name").fill(`${emailPrefix}-testuser@test.com`);
    await page.getByLabel("Password", { exact: true }).fill("Pass1");
    await page.getByLabel("Re-enter password").fill("Pass1");
    await expect(page.getByRole("paragraph")).toContainText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    const borderColor = await page.evaluate(
      () =>
        getComputedStyle(document.querySelector('input[name="password"]'))
          .borderColor
    );
    expect(borderColor).toBe("rgb(220, 53, 69)");
  });

  test('Invalid "Password" data - No capital letter', async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupName").fill("John");
    await page.locator("#signupLastName").fill("Doe");
    await page.getByLabel("Name").fill(`${emailPrefix}-testuser@test.com`);
    await page.getByLabel("Password", { exact: true }).fill("password1");
    await page.getByLabel("Re-enter password").fill("password1");
    await expect(page.getByRole("paragraph")).toContainText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    const borderColor = await page.evaluate(
      () =>
        getComputedStyle(document.querySelector('input[name="password"]'))
          .borderColor
    );
    expect(borderColor).toBe("rgb(220, 53, 69)");
  });

  test('Invalid "Password" data - No digit', async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupName").fill("John");
    await page.locator("#signupLastName").fill("Doe");
    await page.getByLabel("Name").fill(`${emailPrefix}-testuser@test.com`);
    await page.getByLabel("Password", { exact: true }).fill("Password");
    await page.getByLabel("Re-enter password").fill("Password");
    await expect(page.getByRole("paragraph")).toContainText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    const borderColor = await page.evaluate(
      () =>
        getComputedStyle(document.querySelector('input[name="password"]'))
          .borderColor
    );
    expect(borderColor).toBe("rgb(220, 53, 69)");
  });

  test('Empty "Password" field', async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupName").fill("John");
    await page.locator("#signupLastName").fill("Doe");
    await page.getByLabel("Name").fill(`${emailPrefix}-testuser@test.com`);
    await page.getByLabel("Password", { exact: true }).click();
    await page.getByLabel("Re-enter password").fill("Password123");
    await expect(page.getByRole("paragraph")).toContainText(
      "Password required"
    );

    const borderColor = await page.evaluate(
      () =>
        getComputedStyle(document.querySelector('input[name="password"]'))
          .borderColor
    );
    expect(borderColor).toBe("rgb(220, 53, 69)");
  });

  test("Passwords do not match", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupName").fill("John");
    await page.locator("#signupLastName").fill("Doe");
    await page.getByLabel("Name").fill(`${emailPrefix}-testuser@test.com`);
    await page.getByLabel("Password", { exact: true }).fill("Password123");
    await page.getByLabel("Re-enter password").fill("Password321");
    await page.getByLabel("Password", { exact: true }).click();
    await expect(page.getByRole("paragraph")).toContainText(
      "Passwords do not match"
    );

    const borderColor = await page.evaluate(
      () =>
        getComputedStyle(document.querySelector('input[name="repeatPassword"]'))
          .borderColor
    );
    expect(borderColor).toBe("rgb(220, 53, 69)");
  });

  test('Empty "Re-enter password" field', async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupName").fill("John");
    await page.locator("#signupLastName").fill("Doe");
    await page.getByLabel("Name").fill(`${emailPrefix}-testuser@test.com`);
    await page.getByLabel("Password", { exact: true }).fill("Password123");
    await page.getByLabel("Re-enter password").click();
    await page.getByLabel("Password", { exact: true }).click();
    await expect(page.getByRole("paragraph")).toContainText(
      "Re-enter password required"
    );

    const borderColor = await page.evaluate(
      () =>
        getComputedStyle(document.querySelector('input[name="repeatPassword"]'))
          .borderColor
    );
    expect(borderColor).toBe("rgb(220, 53, 69)");
  });

  test('Button "Register" is disabled when fields are empty', async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    const isDisabled = await page
      .getByRole("button", { name: "Register" })
      .isDisabled();
    expect(isDisabled).toBeTruthy();
  });

  test('Button "Register" is enabled when all fields are valid', async ({
    page,
  }) => {
    await page.click("text=Sign up");
    await page.fill('input[name="name"]', "John");
    await page.fill('input[name="lastName"]', "Doe");
    await page.fill('input[name="email"]', `${emailPrefix}-testuser@test.com`);
    await page.fill('input[name="password"]', "Password123");
    await page.fill('input[name="repeatPassword"]', "Password123");

    const isEnabled = await page
      .getByRole("button", { name: "Register" })
      .isEnabled();
    expect(isEnabled).toBeTruthy();
  });
});
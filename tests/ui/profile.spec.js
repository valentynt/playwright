import { test, expect } from "@playwright/test";

test("Check that Sign In button is visible", async ({ page }) => {
  await page.goto("https://qauto.forstudy.space");

  await expect(page.locator("button.header_signin")).toBeVisible();
});

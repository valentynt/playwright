import { test, expect } from "@playwright/test";

test("Login and Mock Profile Response", async ({ page }) => {
  // 1.
  await page.goto("https://qauto.forstudy.space");

  // 2.
  await page.click("button.header_signin");

  // 3.
  await page.fill('input[name="email"]', process.env.LOGIN_EMAIL);
  await page.fill('input[name="password"]', process.env.LOGIN_PASSWORD);

  // 4.
  await page.locator('text="Login"').click();

  // 5.
  await page.waitForURL(`${process.env.BASE_URL}/panel/garage`);

  await page.route(
    "https://qauto.forstudy.space/api/users/profile",
    (route) => {
      route.fulfill({
        contentType: "application/json",
        body: JSON.stringify({
          status: "ok",
          data: {
            userid: 999999,
            photoFilename: "mocked-user.png",
            name: "MockName",
            lastName: "MockLastName",
          },
        }),
      });
    }
  );

  // 6.
  await page.goto("/panel/profile");

  await expect(page.locator("text=MockName")).toBeVisible({ timeout: 10000 });
  await expect(page.locator("text=MockLastName")).toBeVisible({
    timeout: 10000,
  });
});

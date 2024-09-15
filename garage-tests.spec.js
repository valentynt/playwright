const { customTest } = require("./fixtures");
const { expect } = require("@playwright/test");

customTest.describe("Garage Page Tests", () => {
  customTest("User is able to see their garage", async ({ userGaragePage }) => {
    await expect(userGaragePage).toHaveURL(
      process.env.BASE_URL + "/panel/garage"
    );

    const carList = await userGaragePage.locator(".car-list");
    await expect(carList).toBeVisible();
  });
});

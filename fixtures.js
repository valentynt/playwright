const fs = require("fs");
const path = require("path");
const base = require("@playwright/test").test;

const STORAGE_STATE = path.join(__dirname, "storageState.json");

const customTest = base.extend({
  userGaragePage: async ({ page }, use) => {
    if (fs.existsSync(STORAGE_STATE)) {
      await page
        .context()
        .addCookies(JSON.parse(fs.readFileSync(STORAGE_STATE, "utf-8")));
    } else {
      await page.goto(process.env.BASE_URL + "/login");
      await page.click("button.header_signin");
      await page.fill('input[name="email"]', process.env.LOGIN_EMAIL);
      await page.fill('input[name="password"]', process.env.LOGIN_PASSWORD);
      await page.click('button[type="button"].btn.btn-primary');

      await page.waitForURL(process.env.BASE_URL + "/panel/garage");

      const cookies = await page.context().cookies();
      fs.writeFileSync(STORAGE_STATE, JSON.stringify(cookies));
    }

    await use(page);
  },
});

module.exports = { customTest };

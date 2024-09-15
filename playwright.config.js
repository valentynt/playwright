import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config(); // Загрузка переменных окружения

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL,

    httpCredentials: {
      username: process.env.HTTP_USERNAME,
      password: process.env.HTTP_PASSWORD,
    },

    // Остальные настройки
    browserName: "chromium",
    viewport: { width: 1280, height: 720 },
    headless: true,
    video: "retain-on-failure",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    actionTimeout: 10000,
    timeout: 30000,
    launchOptions: {
      slowMo: 50,
      args: ["--start-maximized"],
    },
  },

  workers: 4,
  outputDir: "test-results/",
  reporter: [["html", { open: "never" }]],
});

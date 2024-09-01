import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    // Установка браузера Chromium
    browserName: "chromium",

    // Размер окна браузера
    viewport: { width: 1280, height: 720 },

    // Запуск в режиме без головы (headless)
    headless: true,

    // Запись видео выполнения тестов
    video: "retain-on-failure", // сохранять видео только при ошибках

    // Запись трассировки тестов
    trace: "retain-on-failure", // сохранять трассировку только при ошибках

    // Снимки экрана при ошибках
    screenshot: "only-on-failure",

    // Тайм-аут ожидания для всех действий
    actionTimeout: 10000, // 10 секунд

    // Стандартный тайм-аут для тестов
    timeout: 30000, // 30 секунд

    // Базовый URL для тестов
    baseURL: "https://example.com",

    // Включение сообщений журнала
    launchOptions: {
      slowMo: 50, // замедление выполнения на 50ms для видимости
      args: ["--start-maximized"], // запуск в развернутом окне
    },
  },

  // Конфигурация параллельных тестов
  workers: 4, // Количество параллельно выполняемых тестов

  // Папка для хранения артефактов тестирования
  outputDir: "test-results/",

  // Настройка отчетности
  reporter: [["html", { open: "never" }]],
});

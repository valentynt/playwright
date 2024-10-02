import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

test.describe("Car API Tests", async () => {
  let request;

  test.beforeEach(async ({ request: apiRequest }) => {
    request = apiRequest;

    const authRequest = await request.post("/api/auth/signin", {
      data: {
        email: process.env.LOGIN_EMAIL,
        password: process.env.LOGIN_PASSWORD,
        remember: true,
      },
    });

    expect(authRequest.status()).toBe(200);
  });
});

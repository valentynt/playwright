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

  // Positive 1
  test("should add a new car", async () => {
    const response = await request.post("/api/cars", {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 122,
      },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.data).toHaveProperty("id");
  });

  // Negative 1
  test("should return error when required fields are missing", async () => {
    const response = await request.post("/api/cars", {
      data: {},
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toBe("Car brand id is required");
  });

  // Negative 2
  test("should return error when carBrandId is invalid", async () => {
    const response = await request.post("/api/cars", {
      data: {
        carBrandId: "invalid_id",
        carModelId: 1,
        mileage: 122,
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toBe("Invalid car brand type");
  });
});

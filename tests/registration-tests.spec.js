const { test, expect } = require("@playwright/test");
const { RegistrationPage } = require("./pages/RegistrationPage");

function generateRandomPrefix(length = 5) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

let emailPrefix;
let registrationPage;

test.describe("Registration Form Tests", () => {
  test.beforeEach(async ({ page }) => {
    emailPrefix = `aqa_${generateRandomPrefix()}`;
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigate();
  });

  // Positive scenario
  test("Successful Registration", async ({ page }) => {
    await registrationPage.signUpButton.click();
    await registrationPage.fillRegistrationForm({
      name: "John",
      lastName: "Doe",
      email: `${emailPrefix}-testuser@test.com`,
      password: "Password123",
      repeatPassword: "Password123",
    });
    await registrationPage.submit();

    await expect(page).toHaveURL("https://qauto.forstudy.space/panel/garage");
  });

  // Negative scenarios
  test('Empty "Name" field', async ({ page }) => {
    await registrationPage.signUpButton.click();
    await registrationPage.nameInput.click();
    await registrationPage.fillRegistrationForm({
      lastName: "Doe",
      email: `${emailPrefix}-testuser@test.com`,
      password: "Password123",
      repeatPassword: "Password123",
    });

    const errorMessage = await registrationPage.getErrorMessage();
    expect(errorMessage).toContain("Name required");

    const isInvalid = await registrationPage.isFieldInvalid(
      registrationPage.nameInput
    );
    expect(isInvalid).toBeTruthy();
  });

  test('Invalid "Name" data', async ({ page }) => {
    await registrationPage.signUpButton.click();
    await registrationPage.fillRegistrationForm({
      name: "123",
      lastName: "Doe",
      email: `${emailPrefix}-testuser@test.com`,
      password: "Password123",
      repeatPassword: "Password123",
    });
    await registrationPage.emailInput.click();

    const errorMessage = await registrationPage.getErrorMessage();
    expect(errorMessage).toContain("Name is invalid");

    const isInvalid = await registrationPage.isFieldInvalid(
      registrationPage.nameInput
    );
    expect(isInvalid).toBeTruthy();
  });

  test('Wrong "Name" length', async ({ page }) => {
    await registrationPage.signUpButton.click();
    await registrationPage.fillRegistrationForm({
      name: "A",
      lastName: "Doe",
      email: `${emailPrefix}-testuser@test.com`,
      password: "Password123",
      repeatPassword: "Password123",
    });
    await registrationPage.emailInput.click();

    const errorMessage = await registrationPage.getErrorMessage();
    expect(errorMessage).toContain(
      "Name has to be from 2 to 20 characters long"
    );

    const isInvalid = await registrationPage.isFieldInvalid(
      registrationPage.nameInput
    );
    expect(isInvalid).toBeTruthy();
  });

  test('Empty "Last name" field', async ({ page }) => {
    await registrationPage.signUpButton.click();
    await registrationPage.lastNameInput.click();
    await registrationPage.fillRegistrationForm({
      name: "John",
      email: `${emailPrefix}-testuser@test.com`,
      password: "Password123",
      repeatPassword: "Password123",
    });

    const errorMessage = await registrationPage.getErrorMessage();
    expect(errorMessage).toContain("Last name required");

    const isInvalid = await registrationPage.isFieldInvalid(
      registrationPage.lastNameInput
    );
    expect(isInvalid).toBeTruthy();
  });

  test('Invalid "Last name" data', async ({ page }) => {
    await registrationPage.signUpButton.click();
    await registrationPage.fillRegistrationForm({
      name: "John",
      lastName: "123",
      email: `${emailPrefix}-testuser@test.com`,
      password: "Password123",
      repeatPassword: "Password123",
    });

    const errorMessage = await registrationPage.getErrorMessage();
    expect(errorMessage).toContain("Last name is invalid");

    const isInvalid = await registrationPage.isFieldInvalid(
      registrationPage.lastNameInput
    );
    expect(isInvalid).toBeTruthy();
  });

  test('Wrong "Last name" length', async ({ page }) => {
    await registrationPage.signUpButton.click();
    await registrationPage.fillRegistrationForm({
      name: "John",
      lastName: "A",
      email: `${emailPrefix}-testuser@test.com`,
      password: "Password123",
      repeatPassword: "Password123",
    });

    const errorMessage = await registrationPage.getErrorMessage();
    expect(errorMessage).toContain(
      "Last name has to be from 2 to 20 characters long"
    );

    const isInvalid = await registrationPage.isFieldInvalid(
      registrationPage.lastNameInput
    );
    expect(isInvalid).toBeTruthy();
  });

  test('Invalid "Email" format', async ({ page }) => {
    await registrationPage.signUpButton.click();
    await registrationPage.fillRegistrationForm({
      name: "John",
      lastName: "Doe",
      email: "invalid-email",
      password: "Password123",
      repeatPassword: "Password123",
    });

    const errorMessage = await registrationPage.getErrorMessage();
    expect(errorMessage).toContain("Email is incorrect");

    const isInvalid = await registrationPage.isFieldInvalid(
      registrationPage.emailInput
    );
    expect(isInvalid).toBeTruthy();
  });

  test('Empty "Email" field', async ({ page }) => {
    await registrationPage.signUpButton.click();
    await registrationPage.emailInput.click();
    await registrationPage.fillRegistrationForm({
      name: "John",
      lastName: "Doe",
      password: "Password123",
      repeatPassword: "Password123",
    });

    const errorMessage = await registrationPage.getErrorMessage();
    expect(errorMessage).toContain("Email required");

    const isInvalid = await registrationPage.isFieldInvalid(
      registrationPage.emailInput
    );
    expect(isInvalid).toBeTruthy();
  });

  test('Invalid "Password" data - Less than 8 characters', async ({ page }) => {
    await registrationPage.signUpButton.click();
    await registrationPage.fillRegistrationForm({
      name: "John",
      lastName: "Doe",
      email: `${emailPrefix}-testuser@test.com`,
      password: "Pass1",
      repeatPassword: "Pass1",
    });

    const errorMessage = await registrationPage.getErrorMessage();
    expect(errorMessage).toContain(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    const isInvalid = await registrationPage.isFieldInvalid(
      registrationPage.passwordInput
    );
    expect(isInvalid).toBeTruthy();
  });

  test('Invalid "Password" data - No capital letter', async ({ page }) => {
    await registrationPage.signUpButton.click();
    await registrationPage.fillRegistrationForm({
      name: "John",
      lastName: "Doe",
      email: `${emailPrefix}-testuser@test.com`,
      password: "password1",
      repeatPassword: "password1",
    });

    const errorMessage = await registrationPage.getErrorMessage();
    expect(errorMessage).toContain(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    const isInvalid = await registrationPage.isFieldInvalid(
      registrationPage.passwordInput
    );
    expect(isInvalid).toBeTruthy();
  });

  test('Invalid "Password" data - No digit', async ({ page }) => {
    await registrationPage.signUpButton.click();
    await registrationPage.fillRegistrationForm({
      name: "John",
      lastName: "Doe",
      email: `${emailPrefix}-testuser@test.com`,
      password: "Password",
      repeatPassword: "Password",
    });

    const errorMessage = await registrationPage.getErrorMessage();
    expect(errorMessage).toContain(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    const isInvalid = await registrationPage.isFieldInvalid(
      registrationPage.passwordInput
    );
    expect(isInvalid).toBeTruthy();
  });

  test('Empty "Password" field', async ({ page }) => {
    await registrationPage.signUpButton.click();
    await registrationPage.passwordInput.click();
    await registrationPage.fillRegistrationForm({
      name: "John",
      lastName: "Doe",
      email: `${emailPrefix}-testuser@test.com`,
      repeatPassword: "Password123",
    });

    const errorMessage = await registrationPage.getErrorMessage();
    expect(errorMessage).toContain("Password required");

    const isInvalid = await registrationPage.isFieldInvalid(
      registrationPage.passwordInput
    );
    expect(isInvalid).toBeTruthy();
  });

  test("Passwords do not match", async ({ page }) => {
    await registrationPage.signUpButton.click();
    await registrationPage.fillRegistrationForm({
      name: "John",
      lastName: "Doe",
      email: `${emailPrefix}-testuser@test.com`,
      password: "Password123",
      repeatPassword: "Password321",
    });
    await registrationPage.emailInput.click();

    const errorMessage = await registrationPage.getErrorMessage();
    expect(errorMessage).toContain("Passwords do not match");

    const isInvalid = await registrationPage.isFieldInvalid(
      registrationPage.repeatPasswordInput
    );
    expect(isInvalid).toBeTruthy();
  });

  test('Empty "Re-enter password" field', async ({ page }) => {
    await registrationPage.signUpButton.click();
    await registrationPage.repeatPasswordInput.click();
    await registrationPage.fillRegistrationForm({
      name: "John",
      lastName: "Doe",
      email: `${emailPrefix}-testuser@test.com`,
      password: "Password123",
    });

    const errorMessage = await registrationPage.getErrorMessage();
    expect(errorMessage).toContain("Re-enter password required");

    const isInvalid = await registrationPage.isFieldInvalid(
      registrationPage.repeatPasswordInput
    );
    expect(isInvalid).toBeTruthy();
  });

  test('Button "Register" is disabled when fields are empty', async ({
    page,
  }) => {
    await registrationPage.signUpButton.click();

    const isDisabled = await registrationPage.isRegisterButtonDisabled();
    expect(isDisabled).toBeTruthy();
  });

  test('Button "Register" is enabled when all fields are valid', async ({
    page,
  }) => {
    await registrationPage.signUpButton.click();
    await registrationPage.fillRegistrationForm({
      name: "John",
      lastName: "Doe",
      email: `${emailPrefix}-testuser@test.com`,
      password: "Password123",
      repeatPassword: "Password123",
    });

    const isEnabled = await registrationPage.registerButton.isEnabled();
    expect(isEnabled).toBeTruthy();
  });
});

class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.signUpButton = page.getByRole("button", { name: "Sign up" });
    this.nameInput = page.locator("#signupName");
    this.lastNameInput = page.locator("#signupLastName");
    this.emailInput = page.getByLabel("Name");
    this.passwordInput = page.getByLabel("Password", { exact: true });
    this.repeatPasswordInput = page.getByLabel("Re-enter password");
    this.registerButton = page.getByRole("button", { name: "Register" });
    this.errorMessage = page.locator("div.invalid-feedback p");
  }

  async navigate() {
    await this.page.goto("https://guest:welcome2qauto@qauto.forstudy.space/");
  }

  async fillRegistrationForm({
    name,
    lastName,
    email,
    password,
    repeatPassword,
  }) {
    if (name !== undefined) {
      await this.nameInput.fill(name);
    }
    if (lastName !== undefined) {
      await this.lastNameInput.fill(lastName);
    }
    if (email !== undefined) {
      await this.emailInput.fill(email);
    }
    if (password !== undefined) {
      await this.passwordInput.fill(password);
    }
    if (repeatPassword !== undefined) {
      await this.repeatPasswordInput.fill(repeatPassword);
    }
  }

  async submit() {
    await this.registerButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async isRegisterButtonDisabled() {
    return await this.registerButton.isDisabled();
  }

  async isFieldInvalid(field) {
    return await field.evaluate((element) =>
      element.classList.contains("is-invalid")
    );
  }
}

module.exports = { RegistrationPage };

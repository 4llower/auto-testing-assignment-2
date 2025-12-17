import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export interface TextBoxData {
  fullName: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
}

export class TextBoxPage extends BasePage {
  readonly inputFullName: Locator;
  readonly inputEmail: Locator;
  readonly inputCurrentAddress: Locator;
  readonly inputPermanentAddress: Locator;
  readonly submitButton: Locator;
  readonly outputSection: Locator;
  readonly path = "/text-box";

  constructor(page: Page) {
    super(page);
    this.inputFullName = page.locator("#userName");
    this.inputEmail = page.locator("#userEmail");
    this.inputCurrentAddress = page.locator("#currentAddress");
    this.inputPermanentAddress = page.locator("#permanentAddress");
    this.submitButton = page.locator("#submit");
    this.outputSection = page.locator("#output");
  }

  async openPage(): Promise<void> {
    await this.open(this.path);
  }

  async fillForm(data: TextBoxData): Promise<void> {
    await this.inputFullName.fill(data.fullName);
    await this.inputEmail.fill(data.email);
    await this.inputCurrentAddress.fill(data.currentAddress);
    await this.inputPermanentAddress.fill(data.permanentAddress);
  }

  async validateMandatoryFields(): Promise<void> {
    await this.inputFullName.fill("Invalid Email User");
    await this.inputEmail.fill("invalid-email");
    await this.submitButton.click();
    await expect(this.inputEmail).toHaveClass(/field-error/);
    await expect(this.outputSection).toBeHidden();
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
    await this.outputSection.waitFor({ state: "visible" });
  }

  async assertOutput(data: TextBoxData): Promise<void> {
    await expect(this.outputSection).toBeVisible();
    await expect(this.outputSection.locator("#name")).toHaveText(
      `Name:${data.fullName}`
    );
    await expect(this.outputSection.locator("#email")).toHaveText(
      `Email:${data.email}`
    );
    await expect(this.outputSection.locator("#currentAddress")).toContainText(
      data.currentAddress
    );
    await expect(this.outputSection.locator("#permanentAddress")).toContainText(
      data.permanentAddress
    );
  }
}

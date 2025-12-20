import { Locator, Page } from "@playwright/test";
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

  async getOutputFullName(): Promise<string | null> {
    return this.extractOutputValue("#name", "Name:");
  }

  async getOutputEmail(): Promise<string | null> {
    return this.extractOutputValue("#email", "Email:");
  }

  async getOutputCurrentAddress(): Promise<string | null> {
    return this.extractOutputValue("#currentAddress", "Current Address :");
  }

  async getOutputPermanentAddress(): Promise<string | null> {
    return this.extractOutputValue("#permanentAddress", "Permananet Address :");
  }

  async emailFieldHasError(): Promise<boolean> {
    const classAttr = await this.inputEmail.getAttribute("class");
    return classAttr?.split(/\s+/).includes("field-error") ?? false;
  }

  async isOutputVisible(): Promise<boolean> {
    return this.outputSection.isVisible();
  }

  async fillForm(data: TextBoxData): Promise<void> {
    await this.inputFullName.fill(data.fullName);
    await this.inputEmail.fill(data.email);
    await this.inputCurrentAddress.fill(data.currentAddress);
    await this.inputPermanentAddress.fill(data.permanentAddress);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async waitForOutput(): Promise<void> {
    await this.outputSection.waitFor({ state: "visible" });
  }

  private async extractOutputValue(
    selector: string,
    prefix: string
  ): Promise<string | null> {
    const element = this.outputSection.locator(selector);
    if ((await element.count()) === 0) {
      return null;
    }
    const rawText = await element.textContent();
    if (!rawText) {
      return null;
    }
    const normalized = rawText.trim();
    if (!normalized.startsWith(prefix)) {
      return normalized || null;
    }
    const withoutPrefix = normalized.slice(prefix.length).trim();
    return withoutPrefix || null;
  }
}

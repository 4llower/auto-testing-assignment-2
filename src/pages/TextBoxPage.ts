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

  async fillForm(data: TextBoxData): Promise<void> {}

  async validateMandatoryFields(): Promise<void> {}

  async submit(): Promise<void> {}

  async assertOutput(data: TextBoxData): Promise<void> {}
}

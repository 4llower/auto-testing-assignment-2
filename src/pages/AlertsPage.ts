import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class AlertsPage extends BasePage {
  readonly simpleAlertButton: Locator;
  readonly timerAlertButton: Locator;
  readonly confirmAlertButton: Locator;
  readonly promptAlertButton: Locator;
  readonly confirmResult: Locator;
  readonly promptResult: Locator;
  readonly path = "/alerts";

  constructor(page: Page) {
    super(page);
    this.simpleAlertButton = page.locator("#alertButton");
    this.timerAlertButton = page.locator("#timerAlertButton");
    this.confirmAlertButton = page.locator("#confirmButton");
    this.promptAlertButton = page.locator("#promtButton");
    this.confirmResult = page.locator("#confirmResult");
    this.promptResult = page.locator("#promptResult");
  }

  async openPage(): Promise<void> {
    await this.open(this.path);
  }

  async clickSimpleAlert(): Promise<void> {
    await this.simpleAlertButton.click();
  }

  async clickTimerAlert(): Promise<void> {
    await this.timerAlertButton.click();
  }

  async clickConfirmAlert(): Promise<void> {
    await this.confirmAlertButton.click();
  }

  async clickPromptAlert(): Promise<void> {
    await this.promptAlertButton.click();
  }

  async getConfirmResultText(): Promise<string | null> {
    const text = await this.confirmResult.textContent();
    return text?.trim() ?? null;
  }

  async getPromptResultText(): Promise<string | null> {
    if ((await this.promptResult.count()) === 0) {
      return null;
    }
    const text = await this.promptResult.textContent();
    return text?.trim() ?? null;
  }

  async hasPromptResult(): Promise<boolean> {
    return (await this.promptResult.count()) > 0;
  }
}

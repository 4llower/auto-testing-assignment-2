import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class AlertsPage extends BasePage {
  readonly simpleAlertButton: Locator;
  readonly timerAlertButton: Locator;
  readonly confirmAlertButton: Locator;
  readonly promptAlertButton: Locator;
  readonly path = "/alerts";

  constructor(page: Page) {
    super(page);
    this.simpleAlertButton = page.locator("#alertButton");
    this.timerAlertButton = page.locator("#timerAlertButton");
    this.confirmAlertButton = page.locator("#confirmButton");
    this.promptAlertButton = page.locator("#promtButton");
  }

  async openPage(): Promise<void> {
    await this.open(this.path);
  }

  async triggerSimpleAlert(): Promise<void> {}

  async triggerTimerAlert(): Promise<void> {}

  async triggerConfirmAlert(): Promise<void> {}

  async triggerPromptAlert(): Promise<void> {}

  async assertAlertResult(expected: string): Promise<void> {}
}

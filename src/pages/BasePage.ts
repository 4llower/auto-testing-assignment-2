import { Page } from "@playwright/test";

export abstract class BasePage {
  protected readonly page: Page;
  private adsGuardRegistered = false;

  protected constructor(page: Page) {
    this.page = page;
  }

  async open(path: string): Promise<void> {
    await this.registerAdBlockers();
    await this.page.goto(path);
    await this.removeAdOverlays();
  }

  private async registerAdBlockers(): Promise<void> {
    if (this.adsGuardRegistered) {
      return;
    }

    this.adsGuardRegistered = true;
    const adPatterns = [
      "**/*googleads.g.doubleclick.net/*",
      "**/*adservice.google.com/*",
      "**/*googlesyndication.com/*",
      "**/*doubleclick.net/*",
      "**/*adclick.g.doubleclick.net/*",
    ];

    await Promise.all(
      adPatterns.map((pattern) =>
        this.page.route(pattern, (route) => route.abort())
      )
    );
  }

  private async removeAdOverlays(): Promise<void> {
    const nuisanceSelectors = [
      "#fixedban",
      "#RightSide_Advertisement",
      "#adplus-anchor",
      "iframe[src*='googleads']",
      "iframe[id^='google_ads']",
      "div[id^='google_ads']",
    ];

    for (const selector of nuisanceSelectors) {
      const candidates = this.page.locator(selector);
      if ((await candidates.count()) === 0) {
        continue;
      }

      await candidates.evaluateAll((elements) =>
        elements.forEach((element) => element.remove())
      );
    }

    const hideSelectors = nuisanceSelectors.join(", ");
    if (hideSelectors.length) {
      await this.page.addStyleTag({
        content: `${hideSelectors} { display: none !important; visibility: hidden !important; }`,
      });
    }
  }
}

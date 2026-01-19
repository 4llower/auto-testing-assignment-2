import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class ToolTipsPage extends BasePage {
  readonly buttonTooltip: Locator;
  readonly fieldTooltip: Locator;
  readonly contraryLink: Locator;
  readonly randomTextLink: Locator;
  readonly tooltipContent: Locator;
  readonly path = "/tool-tips";

  constructor(page: Page) {
    super(page);
    this.buttonTooltip = page.locator("#toolTipButton");
    this.fieldTooltip = page.locator("#toolTipTextField");
    this.contraryLink = page.getByRole("link", { name: "Contrary" });
    this.randomTextLink = page.getByRole("link", { name: "1.10.32" });
    this.tooltipContent = page.locator(".tooltip-inner");
  }

  async openPage(): Promise<void> {
    await this.open(this.path);
  }

  async hoverTarget(target: Locator): Promise<void> {
    await target.scrollIntoViewIfNeeded();
    await target.hover({ force: true });
    await target.dispatchEvent("mouseenter");
    await target.dispatchEvent("mouseover");
    await target.dispatchEvent("mousemove");
    await this.tooltipContent.first().waitFor({ state: "visible" });
  }

  async getTooltipText(): Promise<string | null> {
    if ((await this.tooltipContent.count()) === 0) {
      return null;
    }
    const text = await this.tooltipContent.textContent();
    return text?.trim() ?? null;
  }

  async isTooltipVisible(): Promise<boolean> {
    return this.tooltipContent.isVisible();
  }
}

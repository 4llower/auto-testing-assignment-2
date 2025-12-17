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
    this.contraryLink = page.locator("#contraryTex");
    this.randomTextLink = page.locator("#sectionToolTip span:nth-of-type(2)");
    this.tooltipContent = page.locator(".tooltip-inner");
  }

  async openPage(): Promise<void> {
    await this.open(this.path);
  }

  async hoverTarget(target: Locator): Promise<void> {}

  async assertTooltipText(expected: string): Promise<void> {}
}

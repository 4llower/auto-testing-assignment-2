import { expect, Locator, Page } from "@playwright/test";
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
    await target.hover();
    await this.tooltipContent.waitFor({ state: "visible" });
  }

  async assertTooltipText(expected: string): Promise<void> {
    if (!expected) {
      await expect(this.tooltipContent).toBeHidden();
      return;
    }

    const resolved = this.resolveTooltipCopy(expected);
    await expect(this.tooltipContent).toHaveText(resolved);
  }

  private resolveTooltipCopy(targetName: string): string {
    const normalized = targetName.toLowerCase();
    if (normalized === "button") {
      return "You hovered over the Button";
    }
    if (normalized === "text field") {
      return "You hovered over the text field";
    }
    if (normalized === "contrary link") {
      return "You hovered over the Contrary";
    }
    if (normalized === "random text link") {
      return "You hovered over the 1.10.32";
    }
    return "You hovered over the 1st text";
  }
}

import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class SelectMenuPage extends BasePage {
  readonly selectValueInput: Locator;
  readonly selectOneInput: Locator;
  readonly selectValueDisplay: Locator;
  readonly selectOneDisplay: Locator;
  readonly oldStyleSelectMenu: Locator;
  readonly multiSelectInput: Locator;
  readonly standardSelect: Locator;
  readonly path = "/select-menu";

  constructor(page: Page) {
    super(page);
    this.selectValueInput = page.locator("#withOptGroup input");
    this.selectOneInput = page.locator("#selectOne input");
    this.selectValueDisplay = page
      .locator("#withOptGroup")
      .locator("div[class*='singleValue']");
    this.selectOneDisplay = page
      .locator("#selectOne")
      .locator("div[class*='singleValue']");
    this.oldStyleSelectMenu = page.locator("#oldSelectMenu");
    this.multiSelectInput = page.locator("#react-select-4-input");
    this.standardSelect = page.locator("#cars");
  }

  private get multiSelectChips(): Locator {
    return this.multiSelectSection.locator("div[class$='multiValue']");
  }

  private get multiSelectSection(): Locator {
    return this.page
      .locator("#selectMenuContainer p", { hasText: "Multiselect drop down" })
      .locator("xpath=following-sibling::div[1]");
  }

  async openPage(): Promise<void> {
    await this.open(this.path);
  }

  async getGroupValueSelection(): Promise<string | null> {
    const display = this.selectValueDisplay.first();
    if ((await display.count()) === 0) {
      return null;
    }
    const text = await display.textContent();
    const trimmed = text?.trim() ?? "";
    return trimmed || null;
  }

  async getTitleSelection(): Promise<string | null> {
    const display = this.selectOneDisplay.first();
    if ((await display.count()) === 0) {
      return null;
    }
    const text = await display.textContent();
    const trimmed = text?.trim() ?? "";
    return trimmed || null;
  }

  async getOldStyleSelection(): Promise<string | null> {
    const selectedText = await this.oldStyleSelectMenu
      .locator("option:checked")
      .textContent();
    const normalized = selectedText?.trim() ?? "";
    return normalized || null;
  }

  async getMultiSelectSelections(): Promise<string[]> {
    const uiValues = await this.multiSelectChips.allTextContents();
    return uiValues.map((value) => value.trim()).filter(Boolean);
  }

  async selectValue(optionLabel: string): Promise<void> {
    await this.pickReactOption(this.selectValueInput, optionLabel);
  }

  async selectOne(optionLabel: string): Promise<void> {
    await this.pickReactOption(this.selectOneInput, optionLabel);
  }

  async selectOldStyle(optionLabel: string): Promise<void> {
    await this.oldStyleSelectMenu.selectOption({ label: optionLabel });
  }

  async selectMultiple(values: string[]): Promise<void> {
    for (const value of values) {
      await this.multiSelectInput.fill(value);
      await this.multiSelectInput.press("Enter");
    }
  }

  private async pickReactOption(
    trigger: Locator,
    optionLabel: string
  ): Promise<void> {
    await trigger.fill(optionLabel);
    await trigger.press("Enter");
  }
}

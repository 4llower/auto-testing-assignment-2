import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class SelectMenuPage extends BasePage {
  readonly selectValueInput: Locator;
  readonly selectOneInput: Locator;
  readonly oldStyleSelectMenu: Locator;
  readonly multiSelectDropdown: Locator;
  readonly standardSelect: Locator;
  readonly path = "/select-menu";
  private selectedGroupValue?: string;
  private selectedTitle?: string;
  private selectedOldStyle?: string;
  private selectedMulti: string[] = [];

  constructor(page: Page) {
    super(page);
    this.selectValueInput = page.locator("#withOptGroup .css-1hwfws3");
    this.selectOneInput = page.locator("#selectOne .css-1hwfws3");
    this.oldStyleSelectMenu = page.locator("#oldSelectMenu");
    this.multiSelectDropdown = page.locator("#react-select-4-input");
    this.standardSelect = page.locator("#cars");
  }

  async openPage(): Promise<void> {
    await this.open(this.path);
  }

  async selectValue(optionLabel: string): Promise<void> {
    await this.pickReactOption(
      this.selectValueInput,
      "react-select-2",
      optionLabel
    );
    this.selectedGroupValue = optionLabel;
  }

  async selectOne(optionLabel: string): Promise<void> {
    await this.pickReactOption(
      this.selectOneInput,
      "react-select-3",
      optionLabel
    );
    this.selectedTitle = optionLabel;
  }

  async selectOldStyle(optionValue: string): Promise<void> {
    await this.oldStyleSelectMenu.selectOption(optionValue);
    const selectedText = await this.oldStyleSelectMenu
      .locator("option:checked")
      .textContent();
    this.selectedOldStyle = (selectedText ?? optionValue).trim();
  }

  async selectMultiple(values: string[]): Promise<void> {
    this.selectedMulti = [];
    for (const value of values) {
      await this.multiSelectDropdown.fill(value);
      await this.page
        .locator('div[id^="react-select-4-option-"]')
        .filter({ hasText: value })
        .first()
        .click();
      this.selectedMulti.push(value);
    }
  }

  async assertSelections(expected: string[]): Promise<void> {
    const actual: string[] = [];

    if (this.selectedGroupValue) {
      await expect(this.selectValueInput).toContainText(
        this.selectedGroupValue
      );
      actual.push(this.selectedGroupValue);
    }

    if (this.selectedTitle) {
      await expect(this.selectOneInput).toContainText(this.selectedTitle);
      actual.push(this.selectedTitle);
    }

    if (this.selectedOldStyle) {
      const oldStyleValue = this.page.locator("#oldSelectMenu option:checked");
      await expect(oldStyleValue).toHaveText(this.selectedOldStyle);
      actual.push(this.selectedOldStyle);
    }

    if (this.selectedMulti.length) {
      const multiValues = this.page.locator(
        "#selectMenuContainer div.css-12jo7m5"
      );
      await expect(multiValues).toHaveCount(this.selectedMulti.length);
      const uiValues = await multiValues.allTextContents();
      actual.push(...uiValues.map((value) => value.trim()));
    }

    await expect(actual).toEqual(expected);
  }

  private async pickReactOption(
    trigger: Locator,
    idPrefix: string,
    optionLabel: string
  ): Promise<void> {
    await trigger.click();
    await this.page
      .locator(`div[id^="${idPrefix}-option-"]`)
      .filter({ hasText: optionLabel })
      .first()
      .click();
  }
}

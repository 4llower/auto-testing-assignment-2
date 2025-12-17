import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class SelectMenuPage extends BasePage {
  readonly selectValueInput: Locator;
  readonly selectOneInput: Locator;
  readonly oldStyleSelectMenu: Locator;
  readonly multiSelectDropdown: Locator;
  readonly standardSelect: Locator;
  readonly path = "/select-menu";

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

  async selectValue(optionLabel: string): Promise<void> {}

  async selectOne(optionLabel: string): Promise<void> {}

  async selectOldStyle(optionValue: string): Promise<void> {}

  async selectMultiple(values: string[]): Promise<void> {}

  async assertSelections(expected: string[]): Promise<void> {}
}

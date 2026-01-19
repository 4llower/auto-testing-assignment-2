import { expect, test } from "@playwright/test";
import { SelectMenuPage } from "../src/pages/index.js";

test.describe.configure({ mode: "parallel" });

test.describe("Select menu flow", () => {
  test("value dropdown selects grouped option", async ({ page }) => {
    const selectMenuPage = new SelectMenuPage(page);

    await selectMenuPage.openPage();
    await selectMenuPage.selectValue("Group 2, option 1");

    expect(await selectMenuPage.getGroupValueSelection()).toBe(
      "Group 2, option 1"
    );
  });

  test("title dropdown selects single role", async ({ page }) => {
    const selectMenuPage = new SelectMenuPage(page);

    await selectMenuPage.openPage();
    await selectMenuPage.selectOne("Other");

    expect(await selectMenuPage.getTitleSelection()).toBe("Other");
  });

  test("old style select menu chooses color", async ({ page }) => {
    const selectMenuPage = new SelectMenuPage(page);

    await selectMenuPage.openPage();
    await selectMenuPage.selectOldStyle("Green");

    expect(await selectMenuPage.getOldStyleSelection()).toBe("Green");
  });

  test("multi-select dropdown selects required colors", async ({ page }) => {
    const selectMenuPage = new SelectMenuPage(page);
    const values = ["Black", "Blue"];

    await selectMenuPage.openPage();
    await selectMenuPage.selectMultiple(values);

    expect(await selectMenuPage.getMultiSelectSelections()).toEqual(values);
  });

  test("multi-select dropdown selects extended palette", async ({ page }) => {
    const selectMenuPage = new SelectMenuPage(page);
    const values = ["Black", "Blue", "Green"];

    await selectMenuPage.openPage();
    await selectMenuPage.selectMultiple(values);

    expect(await selectMenuPage.getMultiSelectSelections()).toEqual(values);
  });

  test("untouched selects keep default state", async ({ page }) => {
    const selectMenuPage = new SelectMenuPage(page);

    await selectMenuPage.openPage();

    expect(await selectMenuPage.getGroupValueSelection()).toBeNull();
    expect(await selectMenuPage.getTitleSelection()).toBeNull();
    expect(await selectMenuPage.getOldStyleSelection()).toBe("Red");
    expect(await selectMenuPage.getMultiSelectSelections()).toEqual([]);
  });
});

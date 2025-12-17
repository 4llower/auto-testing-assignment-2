import { test } from "@playwright/test";
import { SelectMenuPage } from "../src/pages/index.js";

test.describe.configure({ mode: "parallel" });

const multiSelectSets = [
  { label: "required-colors", values: ["Black", "Blue"] },
  { label: "extended-colors", values: ["Black", "Blue", "Green"] },
];

test.describe("Select menu flow", () => {
  test("selects required dropdown values", async ({ page }) => {
    const selectMenuPage = new SelectMenuPage(page);
    await selectMenuPage.openPage();
    await selectMenuPage.selectValue("Group 2, option 1");
    await selectMenuPage.selectOne("Other");
    await selectMenuPage.selectOldStyle("Green");
    await selectMenuPage.selectMultiple(["Black", "Blue"]);
    await selectMenuPage.assertSelections([
      "Group 2, option 1",
      "Other",
      "Green",
      "Black",
      "Blue",
    ]);
  });

  for (const set of multiSelectSets) {
    test(`runs dataset ${set.label}`, async ({ page }) => {
      const selectMenuPage = new SelectMenuPage(page);
      await selectMenuPage.openPage();
      await selectMenuPage.selectMultiple(set.values);
      await selectMenuPage.assertSelections(set.values);
    });
  }

  test("prevents invalid selection combination", async ({ page }) => {
    const selectMenuPage = new SelectMenuPage(page);
    await selectMenuPage.openPage();
    await selectMenuPage.assertSelections([]);
  });
});

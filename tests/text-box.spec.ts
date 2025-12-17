import { test } from "@playwright/test";
import { TextBoxPage } from "../src/pages/index.js";
import { buildTextBoxData } from "../src/support/dataFactory.js";

test.describe.configure({ mode: "parallel" });

const textBoxDataSets = Array.from({ length: 3 }, (_, index) => ({
  label: `set-${index + 1}`,
  data: buildTextBoxData(),
}));

test.describe("Text box flow", () => {
  for (const set of textBoxDataSets) {
    test(`displays output for ${set.label}`, async ({ page }) => {
      const textBoxPage = new TextBoxPage(page);
      await textBoxPage.openPage();
      await textBoxPage.fillForm(set.data);
      await textBoxPage.submit();
      await textBoxPage.assertOutput(set.data);
    });
  }

  test("rejects invalid email in mandatory field", async ({ page }) => {
    const textBoxPage = new TextBoxPage(page);
    await textBoxPage.openPage();
    await textBoxPage.validateMandatoryFields();
  });
});

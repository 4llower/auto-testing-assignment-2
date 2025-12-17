import { test } from "@playwright/test";
import { AutomationPracticeFormPage } from "../src/pages/index.js";
import { buildPracticeFormData } from "../src/support/dataFactory.js";

test.describe.configure({ mode: "parallel" });

const formDataSets = ["primary", "secondary"].map((label) => ({
  label,
  data: buildPracticeFormData(),
}));

test.describe("Automation practice form", () => {
  for (const set of formDataSets) {
    test(`submits ${set.label} dataset`, async ({ page }) => {
      const formPage = new AutomationPracticeFormPage(page);
      await formPage.openPage();
      await formPage.fillForm(set.data);
      await formPage.submit();
      await formPage.assertSubmission(set.data);
    });
  }

  test("blocks submission when mandatory data missing", async ({ page }) => {
    const formPage = new AutomationPracticeFormPage(page);
    await formPage.openPage();
    await formPage.validateRequiredFields();
  });
});

import { expect, test } from "@playwright/test";
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
      const data = set.data;

      await formPage.openPage();
      await formPage.fillForm(data);
      await formPage.submit();

      await expect(formPage.resultValue("Student Name")).toHaveText(
        `${data.firstName} ${data.lastName}`
      );
      await expect(formPage.resultValue("Student Email")).toHaveText(
        data.email
      );
      await expect(formPage.resultValue("Gender")).toHaveText(data.gender);
      await expect(formPage.resultValue("Mobile")).toHaveText(data.mobile);
      await expect(formPage.resultValue("Subjects")).toHaveText(
        data.subjects.join(", ")
      );
      await expect(formPage.resultValue("Hobbies")).toHaveText(
        data.hobbies.join(", ")
      );
      await expect(formPage.resultValue("Picture")).toHaveText("sample.png");
      await expect(formPage.resultValue("Address")).toHaveText(data.address);
      await expect(formPage.resultValue("State and City")).toHaveText(
        `${data.state} ${data.city}`
      );

      const birthDateCell = formPage.resultValue("Date of Birth");
      await expect(birthDateCell).toContainText(
        data.birthDate.toLocaleString("en-US", { month: "long" })
      );
      await expect(birthDateCell).toContainText(
        data.birthDate.getFullYear().toString()
      );
      await expect(birthDateCell).toContainText(
        data.birthDate.getDate().toString()
      );
    });
  }

  test("blocks submission when mandatory data missing", async ({ page }) => {
    const formPage = new AutomationPracticeFormPage(page);
    await formPage.openPage();
    await formPage.submitButton.click();

    await expect(formPage.form).toHaveClass(/was-validated/);
    await expect(formPage.invalidInputs).not.toHaveCount(0);
    await expect(formPage.modal).toHaveCount(0);
  });
});

import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import { AutomationPracticeFormPage } from "../src/pages/index.js";
import { buildPracticeFormData } from "../src/support/dataFactory.js";

test.describe.configure({ mode: "parallel" });

test.describe("Automation practice form", () => {
  test("displays submitted student name", async ({ page }) => {
    const { formPage, data } = await submitPracticeForm(page);

    expect(await formPage.getResultValueText("Student Name")).toBe(
      `${data.firstName} ${data.lastName}`
    );
  });

  test("displays submitted student email", async ({ page }) => {
    const { formPage, data } = await submitPracticeForm(page);

    expect(await formPage.getResultValueText("Student Email")).toBe(data.email);
  });

  test("displays submitted gender", async ({ page }) => {
    const { formPage, data } = await submitPracticeForm(page);

    expect(await formPage.getResultValueText("Gender")).toBe(data.gender);
  });

  test("displays submitted mobile number", async ({ page }) => {
    const { formPage, data } = await submitPracticeForm(page);

    expect(await formPage.getResultValueText("Mobile")).toBe(data.mobile);
  });

  test("displays submitted subjects", async ({ page }) => {
    const { formPage, data } = await submitPracticeForm(page);

    expect(await formPage.getResultValueText("Subjects")).toBe(
      data.subjects.join(", ")
    );
  });

  test("displays submitted hobbies", async ({ page }) => {
    const { formPage, data } = await submitPracticeForm(page);

    expect(await formPage.getResultValueText("Hobbies")).toBe(
      data.hobbies.join(", ")
    );
  });

  test("displays uploaded picture name", async ({ page }) => {
    const { formPage } = await submitPracticeForm(page);

    expect(await formPage.getResultValueText("Picture")).toBe("sample.png");
  });

  test("displays submitted address", async ({ page }) => {
    const { formPage, data } = await submitPracticeForm(page);

    expect(await formPage.getResultValueText("Address")).toBe(data.address);
  });

  test("displays selected state and city", async ({ page }) => {
    const { formPage, data } = await submitPracticeForm(page);

    expect(await formPage.getResultValueText("State and City")).toBe(
      `${data.state} ${data.city}`
    );
  });

  test("displays submitted birth date", async ({ page }) => {
    const { formPage, data } = await submitPracticeForm(page);

    expect(await formPage.getResultValueText("Date of Birth")).toBe(
      formatBirthDateForResult(data.birthDate)
    );
  });

  test("marks form as validated when submission lacks mandatory data", async ({
    page,
  }) => {
    const formPage = await attemptInvalidSubmission(page);

    expect(await formPage.formHasValidationState()).toBe(true);
  });

  test("highlights invalid inputs when submission fails", async ({ page }) => {
    const formPage = await attemptInvalidSubmission(page);

    expect(await formPage.getInvalidInputCount()).toBeGreaterThan(0);
  });

  test("keeps result modal hidden when submission fails", async ({ page }) => {
    const formPage = await attemptInvalidSubmission(page);

    expect(await formPage.isModalVisible()).toBe(false);
  });
});

async function submitPracticeForm(page: Page) {
  const formPage = new AutomationPracticeFormPage(page);
  const data = buildPracticeFormData();

  await formPage.openPage();
  await formPage.fillForm(data);
  await formPage.submit();

  return { formPage, data } as const;
}

async function attemptInvalidSubmission(page: Page) {
  const formPage = new AutomationPracticeFormPage(page);

  await formPage.openPage();
  await formPage.submitButton.click();

  return formPage;
}

function formatBirthDateForResult(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear().toString();
  return `${day} ${month},${year}`;
}

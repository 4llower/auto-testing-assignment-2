import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import { TextBoxPage } from "../src/pages/index.js";
import { buildTextBoxData } from "../src/support/dataFactory.js";

test.describe.configure({ mode: "parallel" });

test.describe("Text box flow", () => {
  test("displays submitted full name", async ({ page }) => {
    const { textBoxPage, data } = await submitValidForm(page);

    expect(await textBoxPage.getOutputFullName()).toBe(data.fullName);
  });

  test("displays submitted email", async ({ page }) => {
    const { textBoxPage, data } = await submitValidForm(page);

    expect(await textBoxPage.getOutputEmail()).toBe(data.email);
  });

  test("displays submitted current address", async ({ page }) => {
    const { textBoxPage, data } = await submitValidForm(page);

    expect(await textBoxPage.getOutputCurrentAddress()).toBe(
      data.currentAddress
    );
  });

  test("displays submitted permanent address", async ({ page }) => {
    const { textBoxPage, data } = await submitValidForm(page);

    expect(await textBoxPage.getOutputPermanentAddress()).toBe(
      data.permanentAddress
    );
  });

  test("marks invalid email field with error state", async ({ page }) => {
    const textBoxPage = await submitFormWithInvalidEmail(page);

    expect(await textBoxPage.emailFieldHasError()).toBe(true);
  });

  test("keeps output hidden when email validation fails", async ({ page }) => {
    const textBoxPage = await submitFormWithInvalidEmail(page);

    expect(await textBoxPage.isOutputVisible()).toBe(false);
  });
});

async function submitValidForm(page: Page) {
  const textBoxPage = new TextBoxPage(page);
  const data = buildTextBoxData();

  await textBoxPage.openPage();
  await textBoxPage.fillForm(data);
  await textBoxPage.submit();
  await textBoxPage.waitForOutput();

  return { textBoxPage, data } as const;
}

async function submitFormWithInvalidEmail(page: Page) {
  const textBoxPage = new TextBoxPage(page);
  const data = { ...buildTextBoxData(), email: "invalid-email" };

  await textBoxPage.openPage();
  await textBoxPage.fillForm(data);
  await textBoxPage.submit();

  return textBoxPage;
}

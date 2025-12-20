import { expect, test } from "@playwright/test";
import type { Dialog, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { AlertsPage } from "../src/pages/index.js";

test.describe.configure({ mode: "parallel" });

const runWithDialog = async (
  page: Page,
  trigger: () => Promise<void>,
  handler: (dialog: Dialog) => Promise<void>
): Promise<void> => {
  const dialogPromise = page.waitForEvent("dialog");
  const triggerPromise = trigger();
  const dialog = await dialogPromise;
  await handler(dialog);
  await triggerPromise;
};

test.describe("Alerts coverage", () => {
  test("accepts simple alert", async ({ page }) => {
    const alertsPage = new AlertsPage(page);

    await alertsPage.openPage();
    await runWithDialog(
      page,
      () => alertsPage.clickSimpleAlert(),
      (dialog) => dialog.accept()
    );
  });

  test("accepts delayed alert", async ({ page }) => {
    const alertsPage = new AlertsPage(page);

    await alertsPage.openPage();
    await runWithDialog(
      page,
      () => alertsPage.clickTimerAlert(),
      (dialog) => dialog.accept()
    );
  });

  test("accepts confirm alert", async ({ page }) => {
    const alertsPage = new AlertsPage(page);
    await alertsPage.openPage();

    await runWithDialog(
      page,
      () => alertsPage.clickConfirmAlert(),
      (dialog) => dialog.accept()
    );

    expect(await alertsPage.getConfirmResultText()).toBe("You selected Ok");
  });

  test("dismisses confirm alert", async ({ page }) => {
    const alertsPage = new AlertsPage(page);
    await alertsPage.openPage();

    await runWithDialog(
      page,
      () => alertsPage.clickConfirmAlert(),
      (dialog) => dialog.dismiss()
    );

    expect(await alertsPage.getConfirmResultText()).toBe("You selected Cancel");
  });

  test("submits prompt input", async ({ page }) => {
    const alertsPage = new AlertsPage(page);
    const promptInput = faker.word.words(2);

    await alertsPage.openPage();
    await runWithDialog(
      page,
      () => alertsPage.clickPromptAlert(),
      (dialog) => dialog.accept(promptInput)
    );

    expect(await alertsPage.getPromptResultText()).toBe(
      `You entered ${promptInput}`
    );
  });

  test("handles rejected prompt input", async ({ page }) => {
    const alertsPage = new AlertsPage(page);

    await alertsPage.openPage();
    await runWithDialog(
      page,
      () => alertsPage.clickPromptAlert(),
      (dialog) => dialog.dismiss()
    );

    expect(await alertsPage.hasPromptResult()).toBe(false);
  });
});

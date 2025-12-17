import { test } from "@playwright/test";
import { AlertsPage } from "../src/pages/index.js";

test.describe.configure({ mode: "parallel" });

const alertScenarios = [
  {
    name: "simple",
    action: async (page: AlertsPage) => page.triggerSimpleAlert(),
  },
  {
    name: "timer",
    action: async (page: AlertsPage) => page.triggerTimerAlert(),
  },
  {
    name: "confirm",
    action: async (page: AlertsPage) => page.triggerConfirmAlert(),
  },
  {
    name: "prompt",
    action: async (page: AlertsPage) => page.triggerPromptAlert(),
  },
];

test.describe("Alerts coverage", () => {
  for (const scenario of alertScenarios) {
    test(`handles ${scenario.name} alert`, async ({ page }) => {
      const alertsPage = new AlertsPage(page);
      await alertsPage.openPage();
      await scenario.action(alertsPage);
    });
  }

  test("handles rejected prompt input", async ({ page }) => {
    const alertsPage = new AlertsPage(page);
    await alertsPage.openPage();
    await alertsPage.triggerPromptAlert();
    await alertsPage.assertAlertResult("");
  });
});

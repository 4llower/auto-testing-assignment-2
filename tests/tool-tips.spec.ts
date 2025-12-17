import { test } from "@playwright/test";
import { ToolTipsPage } from "../src/pages/index.js";

test.describe.configure({ mode: "parallel" });

const tooltipTargets = [
  { name: "button", ref: (page: ToolTipsPage) => page.buttonTooltip },
  { name: "text field", ref: (page: ToolTipsPage) => page.fieldTooltip },
  { name: "contrary link", ref: (page: ToolTipsPage) => page.contraryLink },
  {
    name: "random text link",
    ref: (page: ToolTipsPage) => page.randomTextLink,
  },
];

test.describe("Tool tips coverage", () => {
  for (const target of tooltipTargets) {
    test(`shows tooltip for ${target.name}`, async ({ page }) => {
      const toolTipsPage = new ToolTipsPage(page);
      await toolTipsPage.openPage();
      await toolTipsPage.hoverTarget(target.ref(toolTipsPage));
      await toolTipsPage.assertTooltipText(target.name);
    });
  }

  test("handles missing tooltip gracefully", async ({ page }) => {
    const toolTipsPage = new ToolTipsPage(page);
    await toolTipsPage.openPage();
    await toolTipsPage.assertTooltipText("");
  });
});

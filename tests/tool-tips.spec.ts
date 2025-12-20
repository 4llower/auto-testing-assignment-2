import { expect, test } from "@playwright/test";
import { ToolTipsPage } from "../src/pages/index.js";

test.describe.configure({ mode: "parallel" });

test.describe("Tool tips coverage", () => {
  test("shows tooltip for button hover", async ({ page }) => {
    const toolTipsPage = new ToolTipsPage(page);

    await toolTipsPage.openPage();
    await toolTipsPage.hoverTarget(toolTipsPage.buttonTooltip);

    expect(await toolTipsPage.getTooltipText()).toBe(
      "You hovered over the Button"
    );
  });

  test("shows tooltip for text field hover", async ({ page }) => {
    const toolTipsPage = new ToolTipsPage(page);

    await toolTipsPage.openPage();
    await toolTipsPage.hoverTarget(toolTipsPage.fieldTooltip);

    expect(await toolTipsPage.getTooltipText()).toBe(
      "You hovered over the text field"
    );
  });

  test("shows tooltip for contrary link hover", async ({ page }) => {
    const toolTipsPage = new ToolTipsPage(page);

    await toolTipsPage.openPage();
    await toolTipsPage.hoverTarget(toolTipsPage.contraryLink);

    expect(await toolTipsPage.getTooltipText()).toBe(
      "You hovered over the Contrary"
    );
  });

  test("shows tooltip for random text link hover", async ({ page }) => {
    const toolTipsPage = new ToolTipsPage(page);

    await toolTipsPage.openPage();
    await toolTipsPage.hoverTarget(toolTipsPage.randomTextLink);

    expect(await toolTipsPage.getTooltipText()).toBe(
      "You hovered over the 1.10.32"
    );
  });

  test("keeps tooltip hidden until a target is hovered", async ({ page }) => {
    const toolTipsPage = new ToolTipsPage(page);

    await toolTipsPage.openPage();

    expect(await toolTipsPage.isTooltipVisible()).toBe(false);
  });
});

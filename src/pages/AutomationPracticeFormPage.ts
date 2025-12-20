import path from "node:path";
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export interface PracticeFormData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  mobile: string;
  birthDate: Date;
  subjects: string[];
  hobbies: string[];
  picturePath: string;
  address: string;
  state: string;
  city: string;
}

export class AutomationPracticeFormPage extends BasePage {
  readonly inputFirstName: Locator;
  readonly inputLastName: Locator;
  readonly inputEmail: Locator;
  readonly inputMobile: Locator;
  readonly inputBirthDate: Locator;
  readonly subjectInput: Locator;
  readonly uploadPicture: Locator;
  readonly inputAddress: Locator;
  readonly stateDropdown: Locator;
  readonly cityDropdown: Locator;
  readonly submitButton: Locator;
  readonly form: Locator;
  readonly modal: Locator;
  readonly resultTable: Locator;
  readonly invalidInputs: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator;
  readonly path = "/automation-practice-form";

  constructor(page: Page) {
    super(page);
    this.inputFirstName = page.locator("#firstName");
    this.inputLastName = page.locator("#lastName");
    this.inputEmail = page.locator("#userEmail");
    this.inputMobile = page.locator("#userNumber");
    this.inputBirthDate = page.locator("#dateOfBirthInput");
    this.subjectInput = page.locator("#subjectsInput");
    this.uploadPicture = page.locator("#uploadPicture");
    this.inputAddress = page.locator("#currentAddress");
    this.stateDropdown = page.locator("#state");
    this.cityDropdown = page.locator("#city");
    this.submitButton = page.locator("#submit");
    this.form = page.locator("#userForm");
    this.modal = page.locator(".modal-content");
    this.resultTable = this.modal.locator("table");
    this.invalidInputs = this.form.locator("input:invalid");
    this.monthSelect = page.locator(".react-datepicker__month-select");
    this.yearSelect = page.locator(".react-datepicker__year-select");
  }

  async openPage(): Promise<void> {
    await this.open(this.path);
  }

  async getResultValueText(label: string): Promise<string | null> {
    const cell = this.resultValue(label);
    if ((await cell.count()) === 0) {
      return null;
    }
    const text = await cell.textContent();
    return text?.trim() ?? null;
  }

  async formHasValidationState(): Promise<boolean> {
    const classAttr = await this.form.getAttribute("class");
    return classAttr?.split(/\s+/).includes("was-validated") ?? false;
  }

  async getInvalidInputCount(): Promise<number> {
    return this.invalidInputs.count();
  }

  async isModalVisible(): Promise<boolean> {
    return this.modal.isVisible();
  }

  async fillForm(data: PracticeFormData): Promise<void> {
    await this.inputFirstName.fill(data.firstName);
    await this.inputLastName.fill(data.lastName);
    await this.inputEmail.fill(data.email);
    await this.page
      .getByLabel(data.gender, { exact: true })
      .check({ force: true });
    await this.inputMobile.fill(data.mobile);
    await this.setBirthDate(data.birthDate);

    for (const subject of data.subjects) {
      await this.subjectInput.fill(subject);
      await this.subjectInput.press("Enter");
    }

    for (const hobby of data.hobbies) {
      await this.page.getByLabel(hobby, { exact: true }).check({ force: true });
    }

    const absolutePicturePath = path.resolve(process.cwd(), data.picturePath);
    await this.uploadPicture.setInputFiles(absolutePicturePath);
    await this.inputAddress.fill(data.address);
    await this.selectState(data.state);
    await this.selectCity(data.city);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
    await this.modal.waitFor({ state: "visible" });
  }

  resultValue(label: string): Locator {
    return this.resultTable
      .locator("tr")
      .filter({ hasText: label })
      .locator("td")
      .last();
  }

  private async setBirthDate(date: Date): Promise<void> {
    await this.inputBirthDate.click();
    await this.monthSelect.selectOption(date.getMonth().toString());
    await this.yearSelect.selectOption(date.getFullYear().toString());
    const day = date.getDate().toString().padStart(2, "0");
    await this.datePickerDay(day).first().click();
  }

  private async selectState(state: string): Promise<void> {
    await this.stateDropdown.click();
    await this.page
      .locator('#stateCity-wrapper div[id^="react-select-3-option-"]')
      .filter({ hasText: state })
      .first()
      .click();
  }

  private async selectCity(city: string): Promise<void> {
    await this.cityDropdown.click();
    await this.page
      .locator('#stateCity-wrapper div[id^="react-select-4-option-"]')
      .filter({ hasText: city })
      .first()
      .click();
  }

  private datePickerDay(day: string): Locator {
    return this.page.locator(
      `.react-datepicker__day--0${day}:not(.react-datepicker__day--outside-month)`
    );
  }
}

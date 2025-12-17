import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export interface PracticeFormData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  mobile: string;
  birthDate: string;
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
  readonly genderRadios: Locator;
  readonly inputMobile: Locator;
  readonly inputBirthDate: Locator;
  readonly subjectInput: Locator;
  readonly hobbyCheckboxes: Locator;
  readonly uploadPicture: Locator;
  readonly inputAddress: Locator;
  readonly stateDropdown: Locator;
  readonly cityDropdown: Locator;
  readonly submitButton: Locator;
  readonly resultTable: Locator;
  readonly path = "/automation-practice-form";

  constructor(page: Page) {
    super(page);
    this.inputFirstName = page.locator("#firstName");
    this.inputLastName = page.locator("#lastName");
    this.inputEmail = page.locator("#userEmail");
    this.genderRadios = page.locator('input[name="gender"]');
    this.inputMobile = page.locator("#userNumber");
    this.inputBirthDate = page.locator("#dateOfBirthInput");
    this.subjectInput = page.locator("#subjectsInput");
    this.hobbyCheckboxes = page.locator('input[type="checkbox"]');
    this.uploadPicture = page.locator("#uploadPicture");
    this.inputAddress = page.locator("#currentAddress");
    this.stateDropdown = page.locator("#state");
    this.cityDropdown = page.locator("#city");
    this.submitButton = page.locator("#submit");
    this.resultTable = page.locator(".modal-content table");
  }

  async openPage(): Promise<void> {
    await this.open(this.path);
  }

  async fillForm(data: PracticeFormData): Promise<void> {}

  async validateRequiredFields(): Promise<void> {}

  async submit(): Promise<void> {}

  async assertSubmission(data: PracticeFormData): Promise<void> {}
}

import { faker } from "@faker-js/faker";
import { PracticeFormData } from "../pages/AutomationPracticeFormPage.js";
import { TextBoxData } from "../pages/TextBoxPage.js";

export const buildPracticeFormData = (): PracticeFormData => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
  mobile: faker.string.numeric(10),
  birthDate: faker.date.past().toISOString(),
  subjects: faker.helpers.arrayElements(["English", "Maths", "Arts"], 2),
  hobbies: faker.helpers.arrayElements(["Sports", "Reading", "Music"], 2),
  picturePath: "fixtures/sample.png",
  address: faker.location.streetAddress(),
  state: "NCR",
  city: "Delhi",
});

export const buildTextBoxData = (): TextBoxData => ({
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  currentAddress: faker.location.streetAddress(),
  permanentAddress: faker.location.streetAddress(),
});

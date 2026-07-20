import { FAKE_EMAIL_PROVIDER } from '@constants/common';
import { IPhone } from '@constants/solomono/contact';
import { PHONE_CODE } from '@constants/solomono/geo';
import { faker } from '@faker-js/faker';

export class FakeSimple {
  static boolean = (probability = 0.5): boolean => faker.datatype.boolean(probability);
  static number = (min: number, max: number): number => faker.number.int({ min, max });
  static numeric = (format: string): string => format.replace(/#/g, () => faker.string.numeric(1));
  static numericString = (min = 1, max = 9, allowLeadingZeros = false): string =>
    faker.string.numeric({ length: { min, max }, allowLeadingZeros });
  static symbolString = (min = 1, max = 9): string => faker.string.symbol({ min, max });
  static sentence = (): string => faker.lorem.sentence();

  static dateInFuture = () => faker.date.future();

  static dateOfBirth = () => {
    let date: Date;
    do {
      date = faker.date.birthdate({ mode: 'age', min: 18, max: 65 });
    } while (date.getUTCMonth() === 1 && date.getUTCDate() === 29);
    return date;
  };

  static price = (min = 700, max = 1500): string => 
    faker.commerce.price({ min, max }); 
  static productDescription = (): string => faker.commerce.productDescription();

  static uuid = (): string => faker.string.uuid();
  static uuidShort = (): string => this.uuid().split('-').pop();

  static firstName = (): string => faker.person.firstName();
  static lastName = (): string => faker.person.lastName();
  static fullName = (): string => `${this.firstName()} ${this.lastName()}`;
  static email = (): string => faker.internet.email({
    firstName: this.uuidShort(),
    lastName: this.uuidShort() + process.env.BUILD_ID,
    provider: FAKE_EMAIL_PROVIDER,
  }); 
  static phoneCode = (): string => PHONE_CODE;
  static phoneNumber = (format = '#########'): IPhone => {
    const phone = this.numeric(format);
    return {
      code: this.phoneCode(),
      number: phone,
      numberWithCodeFormatted: this.phoneCode() + phone,
    };
  };
}

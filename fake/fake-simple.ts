import { faker } from '@faker-js/faker';

export class FakeSimple {
  static boolean = (probability = 0.5): boolean => faker.datatype.boolean(probability);
  static number = (min: number, max: number): number => faker.number.int({ min, max });
  static numericString = (min = 1, max = 9, allowLeadingZeros = false): string =>
    faker.string.numeric({ length: { min, max }, allowLeadingZeros });
  static sentence = (): string => faker.lorem.sentence();

  static price = (min = 700, max = 1500): string => 
    faker.commerce.price({ min, max }); 
  static productDescription = (): string => faker.commerce.productDescription();

  static uuid = (): string => faker.string.uuid();
  static uuidShort = (): string => this.uuid().split('-').pop();

  static firstName = (): string => faker.person.firstName();
  static lastName = (): string => faker.person.lastName();
  static fullName = (): string => `${this.firstName()} ${this.lastName()}`;
}

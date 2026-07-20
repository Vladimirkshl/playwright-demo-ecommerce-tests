import { IPhone } from '@constants/solomono/contact';
import { Utils } from '@utils/utils';
import { FakeSimple } from './fake-simple';

const INVALID_EMAILS = [
  'email..email@example.com',
  'email@example',
  'email@111.222.333.44444',
  'Abc..123@example.com',
  'plainaddress',
  '#@%^%#$@#$@#.com',
  '@exmaple.com',
  'Joe Smith <email@example.com>',
  'email.example.com',
  'email@example@example.com',
  '.email@example.com',
  'email.@example.com',
  'email@example.com (Joe Smith)',
  'email@-example.com',
  'email@example..com',
];

export class FakeSimpleInvalid {
  static email = (): string => Utils.getRandomMember(INVALID_EMAILS);
  static phoneNumber = (): IPhone => 
    FakeSimple.phoneNumber(
      FakeSimple.boolean() 
        ? FakeSimple.numericString(1, 8)
        : FakeSimple.symbolString(1, 7) + FakeSimple.numericString(1, 1)
    );
}

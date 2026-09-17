import { DateFormat } from '@constants/common';
import { IAccount } from '@constants/solomono/my-account/account';
import { FakeSimple } from '@fake/fake-simple';
import { Utils } from '@utils/utils';
import { Fake } from '@fake/solomono/fake';

export const getFakeAccount = (): IAccount => {
  const firstName = FakeSimple.firstName();
  const lastName = FakeSimple.lastName();

  return {
    email: FakeSimple.email(),
    firstName: FakeSimple.firstName(),
    lastName: FakeSimple.lastName(),
    fullName: `${firstName} ${lastName}`,
    dateOfBirth: Utils.getDateTimeFull(FakeSimple.dateOfBirth()),
    phoneNumber: FakeSimple.phoneNumber(),
  };
};

export const getFakeAccountInvalid = (account: IAccount): IAccount => {
  account.email = Fake.simpleInvalid.email();
  account.firstName = '';
  account.lastName = '';
  account.fullName = '';
  account.phoneNumber = Fake.simpleInvalid.phoneNumber();
  account.dateOfBirth.formattedDateOfBirth = Utils.formatDate(FakeSimple.dateInFuture(), DateFormat.dd_MM_yyyy);

  return account;
};

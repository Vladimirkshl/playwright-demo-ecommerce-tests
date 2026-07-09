import { DateFormat } from '@constants/common';
import { IAccount } from '@constants/solomono/my-account/account';
import { FakeSimple } from '@fake/fake-simple';
import { Utils } from '@utils/utils';

export const getFakeAccount = (): IAccount => {
  return {
    email: FakeSimple.email(),
    firstName: FakeSimple.firstName(),
    lastName: FakeSimple.lastName(),
    dateOfBirth: { formattedDateOfBirth: Utils.formatDate(FakeSimple.dateOfBirth(), DateFormat.dd_MM_yyyy) },
    phoneNumber: FakeSimple.phoneNumber(),
  };
};

import { IAccount } from '@constants/solomono/my-account/account';
import { FakeSimpleInvalid } from '@fake/fake-simple-invalid';
import { getFakeAccount, getFakeAccountInvalid } from '@fake/solomono/account';

export class Fake {
  static simpleInvalid = FakeSimpleInvalid;

  static account = () => getFakeAccount();
  static accountInvalid = (account: IAccount) => getFakeAccountInvalid(account);
}

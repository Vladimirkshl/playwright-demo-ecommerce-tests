import { getFakeAccount } from '@fake/solomono/account';

export class Fake {
  static account = () => getFakeAccount();
}

import { By } from '@constants/common';
import { IAccount } from '@constants/solomono/my-account/account';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';

export class Checkout extends PageBase {

  /* ASSERT */

  async assertUserDefault(user: IAccount) {
    await Report.subStep(`Assert [${user.firstName}] default`, async () => {
      await this.input('First Name:', By.LABEL).assertValue(user.firstName);
      await this.input('Last Name:', By.LABEL).assertValue(user.lastName);
      await this.input('Phone number:').assertValue(user.phoneNumber.numberWithCodeFormatted);
      // TODO: continue with other fields
    });
  }
  
}

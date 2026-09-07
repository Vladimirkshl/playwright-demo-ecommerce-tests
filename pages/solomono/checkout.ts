import { IAccount } from '@constants/solomono/my-account/account';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';

export class Checkout extends PageBase {

  /* ASSERT */

  async assertUserDefault(user: IAccount) {
    await Report.subStep(`Assert [${user.firstName}] default`, async () => {
      // TODO: add assert of data in input elements      
    });
  }
  
}

import { MyAccountMenuItem } from '@constants/solomono/pages';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';
import { MyInformation } from '@pages/solomono/my-account/information';
import { MyOrderHistory } from '@pages/solomono/my-account/order-history';

export class MyAccount extends PageBase {
  async getInformationPage() {
    await Report.subStep(`Get [${ MyAccountMenuItem.MY_INFORMATION }] page`, async () => {
      await this.hyperLink(MyAccountMenuItem.MY_INFORMATION).click();
    });

    return new MyInformation(this.page);
  }

  async getOrderHistoryPage() {
    await Report.subStep(`Get [${ MyAccountMenuItem.VIEW_ORDERS_I_HAVE_MADE }] page`, async () => {
      await this.hyperLink(MyAccountMenuItem.VIEW_ORDERS_I_HAVE_MADE).click();
    });

    return new MyOrderHistory(this.page);
  }
}

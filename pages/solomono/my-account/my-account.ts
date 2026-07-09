import { MyAccountMenuItem } from '@constants/solomono/pages';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';
import { MyInformation } from '@pages/solomono/my-account/my-information';

export class MyAccount extends PageBase {
  async getMyInformationPage() {
    await Report.subStep(`Get [${ MyAccountMenuItem.MY_INFORMATION }] page`, async () => {
      await this.hyperLink(MyAccountMenuItem.MY_INFORMATION).click();
    });

    return new MyInformation(this.page);
  }
}

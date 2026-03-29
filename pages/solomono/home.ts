import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';

export class SolomonoHome extends PageBase {

  async init() {
    await Report.subStep('Init Solomono Home', async () => {
      await this.goTo('/');
      await this.h1().assertText('The fastest ecommerce platform');
      await this.assertTitle('Solomono Template demo');
    });
  }
}

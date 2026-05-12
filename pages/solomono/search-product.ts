import { IProduct } from '@constants/solomono/product';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';

export class SearchProduct extends PageBase {

  /* ASSERT */
  
  async assertHeader(product: IProduct) {
    await Report.subStep(`Assert ${product.name} header`, async () => {
      await this.h1().assertText(product.name);
    });
  }
}

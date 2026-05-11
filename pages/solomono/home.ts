import { Placeholder } from '@constants/common';
import { IProduct } from '@constants/solomono/product';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';
import { SearchProduct } from '@pages/solomono/search-product';

export class SolomonoHome extends PageBase {

  async init() {
    await Report.subStep('Init Solomono Home', async () => {
      await this.goTo('/');
      await this.h1().assertText('The fastest ecommerce platform');
      await this.assertTitle('Solomono Template demo');
    });
  }

  async getSearchProduct(product: IProduct): Promise<SearchProduct> {
    await Report.subStep(`Search ${product}`, async () => {
      await this.searchInput().fillSequentially(product.name);
      await this.button(Placeholder.QUICK_FIND).click();
    });

    return new SearchProduct(this.page);
  }
}

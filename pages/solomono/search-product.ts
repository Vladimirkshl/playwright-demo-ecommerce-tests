import { IProduct } from '@constants/solomono/product';
import { Report } from '@utils/report';
import { ProductCard } from '@pages/solomono/propduct-card';

export class SearchProduct extends ProductCard {

  /* ASSERT */
  
  async assertHeader(product: IProduct) {
    await Report.subStep(`Assert ${product.name} header`, async () => {
      await this.h1().assertText(product.name);
    });
  }

}

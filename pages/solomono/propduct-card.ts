import { IProduct } from '@constants/solomono/product';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';

export class ProductCard extends PageBase {
  
  /* ELEMENTS */
  
  private card = (name: string) => this.hyperLink(name).ancestor('div[@class="product "]');
  private label = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.label, `//div[starts-with(., "${product.label}")]`);
  private image = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.image.name, '//img');
  private name = (name: string) => this.hyperLink(name);
  private price = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.fullPrice, `//span[contains(., "${product.fullPrice}")]`);
  private cardButton = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex('Buy', '//button');

  /* ASSERT */

  async assert(product: IProduct) {
    await Report.subStep(`Assert ${product.name} card`, async () => {
      await this.label(product).assertIsVisible();
      await this.image(product).assertIsVisible();
      await this.name(product.name).assertIsVisible();
      await this.price(product).assertIsVisible();
      await this.cardButton(product).assertText('Buy');
    });
  }
}

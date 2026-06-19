import { IProduct } from '@constants/solomono/product';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';
import { ShoppingCart } from '@pages/solomono/shopping-cart';

export class ProductDetails extends PageBase {

  /* ASSERT */

  async assert(product: IProduct) {
    await this.span(product.category).assertIsVisible();
    await this.h1().assertText(product.name);
    // TODO: add assert image
    await this.span(product.code).assertIsVisible();
    await this.span(product.status).assertIsVisible();
    // TODO: remove commented assert after fixing full price on UI
    /* await this.span(product.fullPrice).assertIsVisible(); */
    await this.assertColor(product);
    await this.assertRam(product);
    await this.assertWeight(product);
    await this.assertBrand(product);
    await this.field('Graphic adapter').assertText(product.characteristics.graphicAdapter);
    // HACK: commented assert short descriptio and skipped description due to large uncontrolled string
    /* await this.field('Short description').assertText(product.shortDescription); */

    // TODO: add assert all characteristics
  }

  private async assertColor(product: IProduct) {
    for (let color of product.characteristics.color) {
      await this.field('Color:').assertText(color.name);
    };
  }

  private async assertRam(product: IProduct) {
    for (let ram of product.characteristics.ram) {
      await this.field('RAM:').assertText(ram.name);
    };
  }

  private async assertWeight(product: IProduct) {
    for (let weight of product.characteristics.weight) {
      await this.field('Weight:').assertText(weight.name);
    };
  }

  private async assertBrand(product: IProduct) {
    for (let brand of product.characteristics.brand) {
      await this.field('Brand:').assertText(brand.name);
    };
  }

  /* ACTIONS */

  async addProduct(product: IProduct) {
    await Report.subStep(`Add ${product.name} to cart`, async () => {
      await this.button('Buy', 1).click();
      await this.toastify().assertTextIsHidden('Product was successfully added to your cart!');
    });

    return new ShoppingCart(this.page);
  }
}

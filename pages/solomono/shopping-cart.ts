import { IProduct } from '@constants/solomono/product';
import { PageBase } from '@pages/base/page-base';

export class ShoppingCart extends PageBase {
  
  /* ELEMENTS */

  private card = (name: string) => this.hyperLink(name).inDialog().ancestor('div[contains(@class, "cartContent_body")]');
  private image = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.image.name, '//img');
  private name = (name: string) => this.hyperLink(name).inDialog();
  private price = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.fullPrice, `//div[contains(., "${product.fullPrice}")]`);
  private quantity = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.qty.toString(), '//input[contains(@class, "inputnumber")]');
  private delete = (product: IProduct) => this.card(product.name).innerButton('', 3);

  /* ASSERT */
  
  async assert(product: IProduct) {
    await this.h1().inDialog().assertText('Shopping cart');
    await this.card(product.name).assertIsVisible();
    await this.image(product).assertIsVisible();
    await this.name(product.name).assertIsVisible();
    await this.price(product).assertIsVisible();
    await this.quantity(product).assertToHaveValue(product.qty.toString());
    await this.delete(product).assertIsVisible();
  }

  /* ACTIONS */

  async removeProduct(product: IProduct) {
    await this.delete(product).click();
    await this.header('Your Shopping Cart is empty!').inDialog().assertIsVisible();
  }

}

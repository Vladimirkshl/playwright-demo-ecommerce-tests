import { IProduct } from '@constants/solomono/product';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';

export class ShoppingCart extends PageBase {
  
  /* ELEMENTS */

  private card = (name: string) => this.hyperLink(name).inDialog().ancestor('div[contains(@class, "cartContent_body")]');
  private image = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.image.name, '//img');
  private name = (name: string) => this.hyperLink(name).inDialog();
  private price = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.fullPrice, `//div[contains(., "${product.fullPrice}")]`);
  private quantity = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.cartQty.toString(), '//input[contains(@class, "inputnumber")]');
  private delete = (product: IProduct) => this.card(product.name).innerButton('', 3);
  private totalPrice = () => this.div('Total:').inDialog().innerElementWithoutParentIndex('b', '/b');
  private checkoutButton = () => this.button('Close').inDialog().followingSibling('a[contains(text(), "Checkout")]');

  /* ASSERT */
  
  async assert(product: IProduct) {
    await this.h1().inDialog().assertText('Shopping cart');
    await this.card(product.name).assertIsVisible();
    await this.image(product).assertIsVisible();
    await this.name(product.name).assertIsVisible();
    await this.quantity(product).assertToHaveValue(product.cartQty.toString()); 
    await this.price(product).assertIsVisible();
    await this.delete(product).assertIsVisible();
    await this.assertTotalPrice(product);
    await this.button('Close').inDialog().assertIsVisible();
    await this.checkoutButton().assertIsVisible();
  }

  private async assertTotalPrice(product: IProduct) {
    await this.totalPrice().assertText(product.fullPrice);
  }

  /* ACTIONS */

  async removeProduct(product: IProduct) {
    await Report.subStep(`Remove [${product.name}] from shopping cart`, async () => {
      await this.delete(product).click();
      await this.header('Your Shopping Cart is empty!').inDialog().assertIsVisible();
    });
  }

  async close() {
    await Report.subStep('Close shopping cart dialog', async () => {
      await this.dialog().close();
    });
  }
}

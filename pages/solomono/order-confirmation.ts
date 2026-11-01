import { IOrder, SHIPPING_METHOD_CART } from '@constants/solomono/order';
import { IProduct } from '@constants/solomono/product';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';

export class OrderConfirmation extends PageBase {

  /* ELEMENTS */

  private card = (name: string) => this.div(name).ancestor('div[@class="product-item"]');
  private image = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.image.name, '//img');
  private name = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.name, '//div[@class="product-name"]');
  private price = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.fullPrice, '//span[@class="price-item"]');
  private priceCount = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.fullPrice, '//span[@class="price-count"]');

  private async getOrderId() {
    const header = await this.h1().getText();
    const id = header.match(/Your order №\s*(\d+)\s*has been successfully placed!/)?.[1];

    return id;
  }
  
  /* ASSERT */

  async assertHeader() {
    await Report.subStep(`Assert [${await this.getOrderId()}] order placed header`, async () => {
      await this.h1().assertText(`Your order № ${await this.getOrderId()} has been successfully placed!`);
      await this.p('All further instructions and details for payment have been sent to you by mail').assertIsVisible();
    });
  }

  async assertDetails(order: IOrder) {
    await Report.subStep('Assert [order details] section', async () => {
      await this.field('Order number').assertText(order.api.id);
      await this.field('Buyer').assertText(order.customer.fullName);
      await this.field('Email').assertText(order.customer.email);
      await this.field('Phone').assertText(order.customer.phoneNumber.numberWithCodeFormatted);
      await this.field('City').assertText(order.customer.address.city);
      await this.field('Address').assertText(order.customer.address.street);
      await this.field('Delivery method').assertText(order.shipping.method);
      await this.field('Payment method').assertText(order.paymentMethod);
    });
  }

  async assertProduct(order: IOrder) {
    await Report.subStep('Assert [Products] section', async () => {
      await this.div('Products').assertIsVisible();
      await this.card(order.product.name).assertIsVisible();
      await this.image(order.product).assertIsVisible();
      await this.priceCount(order.product).assertText(`${order.product.fullPrice} x ${order.product.cartQty}`);
      await this.name(order.product).assertText(order.product.name);
      await this.price(order.product).assertText(order.product.fullPrice);
    });
  }

  async assertTotals(order: IOrder) {
    await Report.subStep('Assert [Totals] section', async () => {
      await this.field('Delivery Address:').assertText(order.customer.address.addressFull);
      await this.field('Order Sub-Total:').assertText(order.total.fullPrice);
      await this.field(SHIPPING_METHOD_CART[order.shipping.method]).assertText(order.shipping.price);
      await this.field('Total:').assertText(order.total.totalPrice);
    });
  }

  /* SUBMIT */

  async submit() {
    await Report.subStep('Submit order', async () => {
      await this.button('Continue').click();
    });
  }
}

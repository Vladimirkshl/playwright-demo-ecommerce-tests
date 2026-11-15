import { IOrder } from '@constants/solomono/order';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';

export class OrderDetails extends PageBase {
  
  /* ASSERT */

  async assertHeader(order: IOrder) {
    await Report.subStep('Assert [Order ID] header', async () => {
      await this.h1(2).assertText(`Order #${order.api.id}`);
    });
  }

  async assertTotal(order: IOrder) {
    await Report.subStep(`Assert [order total${order.total.fullPrice} price]`, async () => {
      await this.strong(`Order Total: ${order.total.fullPrice} `).assertIsVisible();
    });
  }

  async assert(order: IOrder) {
    await Report.subStep('Assert [Order details]', async () => {
      await this.assertDeliveryAddress();
      await this.assertShippingMethod(order);
      await this.assertPeymentMethod();
      await this.assertProducts();
    });
  }

  private async assertDeliveryAddress() {
    await Report.subStep('Assert [Delivery address] section', async () => {
      await this.header('Delivery Address').assertIsVisible();
      // TODO: add assert of all data after fixing UI issues
    });
  }

  private async assertShippingMethod(order: IOrder) {
    await Report.subStep('Assert [Shipping method] section', async () => {
      await this.header('Shipping Method').assertIsVisible();
      await this.field('Order Sub-Total:').assertText(order.total.fullPrice);
      await this.field(`${order.shipping.method}:`).assertText(order.shipping.price);
      await this.field('Total:').assertText(order.total.fullPrice);
    });
  }

  private async assertPeymentMethod() {
    await Report.subStep('Assert [Payment method] section', async () => {
      await this.header('Payment Method').assertIsVisible();
      // TODO: add assert of all data after fixing UI issues
    });
  }

  private async assertProducts() {
    await Report.subStep('Assert [Products] section', async () => {
      await this.header('Products').assertIsVisible();
      // TODO: add assert of all data after fixing UI issues
    });
  }
}

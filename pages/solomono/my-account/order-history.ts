import { IOrder } from '@constants/solomono/order';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';

export class MyOrderHistory extends PageBase {

  /* ELEMENTS */

  private view = (id: string) => this.field(id, 6).innerElement('View', '/a[.="View"]');
  private print = (id: string) => this.field(id, 6).innerElement('Print', '/a', 2);

  /* ASSERT */

  async assertHeader() {
    await Report.subStep('Assert [My Order History] header', async () => {
      await this.h1().assertText('My Order History');
    });
  }

  async assert(order: IOrder) {
    await Report.subStep('Assert order', async () => {
      await this.td(order.api.id).assertIsVisible();
      // TODO: develop order date assert
      await this.field(order.api.id, 2).assertText(order.product.cartQty);
      await this.field(order.api.id, 3).assertText(order.total.totalPrice);
      await this.field(order.api.id, 4).assertText(order.status);
      await this.view(order.api.id).assertIsVisible();
      await this.print(order.api.id).assertIsVisible();
    });
  }

  // TODO: add footer assert
}

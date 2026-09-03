import { IOrder } from '@constants/solomono/order';
import { test as base } from '@playwright/test';
import { ProductsFixtures } from '@fixtures/admin/products.fixture';
import { Report } from '@utils/report';
import { Fake } from '@fake/admin/fake';

export interface OrderFixtures extends ProductsFixtures {
  orderFake: IOrder;
}

export const test = base.extend<OrderFixtures>({
  orderFake: async ({ laptopFake }, use) => {
    const order = Fake.order(laptopFake);
    Report.attachJson('Order', laptopFake);
    await use(order);
  },
});

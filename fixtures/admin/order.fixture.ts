import { IOrder } from '@constants/solomono/order';
import { test as base } from '@playwright/test';
import { ProductsFixtures } from '@fixtures/admin/products.fixture';
import { Report } from '@utils/report';
import { Fake } from '@fake/admin/fake';
import { DEMO_LAPTOP } from '@constants/solomono/product';

export interface OrderFixtures extends ProductsFixtures {
  orderFakeToEdit: IOrder;
}

// HACK: DEMO_LAPTOP is used as hardcoded data due to API limitation with creation a product
export const test = base.extend<OrderFixtures>({
  orderFakeToEdit: async ({}, use) => {
    const order = Fake.order(DEMO_LAPTOP);
    Report.attachJson('Order', DEMO_LAPTOP);
    await use(order);
  },
});

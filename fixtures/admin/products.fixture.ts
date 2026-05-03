import { IProduct } from '@constants/solomono/product';
import { Fake } from '@fake/admin/fake';
import { ApiFixtures } from '@fixtures/api.fixture';
import { test as base } from '@playwright/test';
import { Report } from '@utils/report';

export interface ProductsFixtures extends ApiFixtures {
  laptopCreate: () => Promise<IProduct>;
}

export const test = base.extend<ProductsFixtures>({
  laptopCreate: async ({ productApi }, use) => {
    await use(async () => {
      const laptop = await productApi.create(Fake.laptop());
      Report.attachJson('Laptop', laptop);
      return laptop;
    });
  },
});

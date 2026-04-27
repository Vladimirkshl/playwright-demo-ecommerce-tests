import { IProduct } from '@constants/solomono/product';
import { ApiFixtures } from '@fixtures/api.fixture';
import { test as base } from '@playwright/test';

export interface ProductsFixtures extends ApiFixtures {
  laptopCreate: () => Promise<IProduct>;
}

export const test = base.extend<ProductsFixtures>({
  // TODO: Add productApi.create()
  /**
  laptopCreate: async ({ }, use) => {
    await use(async () => {
      const laptop = await productApi.create(Fake.laptop());
      Report.attachJson('Laptop', laptop);
      return laptop;
    });
  },
  */
});

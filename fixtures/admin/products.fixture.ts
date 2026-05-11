import { IProduct } from '@constants/solomono/product';
import { Fake } from '@fake/admin/fake';
import { ApiFixtures } from '@fixtures/api.fixture';
import { test as base } from '@playwright/test';
import { Report } from '@utils/report';

export interface ProductsFixtures extends ApiFixtures {
  laptop: () => Promise<IProduct>;
  laptopFake: IProduct;
}

export const test = base.extend<ProductsFixtures>({
  laptop: async ({ productApi }, use) => {
    await use(async () => {
      const laptop = await productApi.create(Fake.laptop());
      Report.attachJson('Laptop', laptop);
      return laptop;
    });
  },
  
  laptopFake: async ({}, use) => {
    const laptop = Fake.laptop();
    await use(laptop);
  },
});

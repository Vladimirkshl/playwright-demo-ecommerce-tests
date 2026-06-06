import { test as base } from '@playwright/test'; 
import { ProductServiceDb } from '@db/productservice-db';

export interface DbFixtures {
  productServiceDb: ProductServiceDb;
}

export const test = base.extend<DbFixtures>({
  productServiceDb: async ({}, use) => {
    await use(new ProductServiceDb());
  },

}); 

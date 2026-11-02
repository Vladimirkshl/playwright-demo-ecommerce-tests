import { test as base } from '@playwright/test'; 
import { ProductServiceDb } from '@db/productservice-db';
import { OrderServiceDb } from '@db/orderservice-db';

export interface DbFixtures {
  productServiceDb: ProductServiceDb;
  orderServiceDb: OrderServiceDb;
}

export const test = base.extend<DbFixtures>({
  productServiceDb: async ({}, use) => {
    await use(new ProductServiceDb());
  },
  orderServiceDb: async ({}, use) => {
    await use(new OrderServiceDb());
  },
}); 

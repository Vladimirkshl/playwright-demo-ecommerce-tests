import { mergeTests } from '@playwright/test';
import { test as orderFixtures }from '@fixtures/admin/order.fixture';
import { test as productsFixtures } from '@fixtures/admin/products.fixture';

export const test = mergeTests(productsFixtures, orderFixtures); 

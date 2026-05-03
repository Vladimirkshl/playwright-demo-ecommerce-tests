import { mergeTests } from '@playwright/test';
import { test as productsFixtures } from '@fixtures/admin/products.fixture';

export const test = mergeTests(productsFixtures); 

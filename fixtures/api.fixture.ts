import { ProductApi } from '@api/product-api';
import { test as base } from '@playwright/test';
import { ApiUtils } from '@utils/api-utils';

export interface ApiFixtures {
  productApi: ProductApi;
}

const apis = ApiUtils.apis();

export const test = base.extend<ApiFixtures>({
  productApi: async ({}, use) => await use(apis.productApi()),
});

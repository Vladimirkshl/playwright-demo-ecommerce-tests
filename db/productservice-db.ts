import { AUTO_TEST_PREFIX } from '@constants/common';
import { Report } from '@utils/report';
import { DbBase } from '@db/base/db-base';

export class ProductServiceDb extends DbBase {
  constructor() {
    super('productservice-db');
  }

  async cleanup() {
    await Report.subStep('DB: ProductService cleanup', async () => {
      const productIds = (await this.getProductIdsByPrefix()).map(({ ProductId }) => `'${ProductId}'`);

      if (productIds.length > 0) {
        await this.deleteReviewsByIds(productIds);
        await this.deleteProductsByIds(productIds);
      }
    });
  }

  async getProductIdsByPrefix() {
    return await Report.subStep('DB: Get product IDs byt prefix', async () => {
      const query = `SELECT "ProductId" FROM "Products"
                    WHERE ("Name" LIKE '%${AUTO_TEST_PREFIX}%')`;
      return (await this.sendQuery(query)) as { ProductId: string }[] | undefined;
    });
  }

  async deleteProductsByIds(productIds: string[]) {
    return await Report.subStep('DB: Delete products by IDs', async () => {
      const query = `DELETE FROM "Products" WHERE "ProductId" IN (${productIds})`;
      await this.sendQuery(query);
    });
  }

  async deleteReviewsByIds(productIds: string[]) {
    return await Report.subStep('DB: Delete reviews by IDs', async () => {
      const query = `DELETE FROM "Reviews" WHERE "ProductId" IN (${productIds})`;
      await this.sendQuery(query);
    });
  }
}

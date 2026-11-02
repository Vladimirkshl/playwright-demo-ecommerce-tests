import { AUTO_TEST_PREFIX } from '@constants/common';
import { DbBase } from '@db/base/db-base';
import { Report } from '@utils/report';

export class OrderServiceDb extends DbBase {
  constructor() {
    super('orderservice-db');
  }
  
  async cleanup() {
    await Report.subStep('DB: OrderService cleanup', async () => {
      const query = `DELETE FROM "Orders" WHERE "prefix" like %${AUTO_TEST_PREFIX}%`;
      await this.sendQuery(query);
    });
  }
}

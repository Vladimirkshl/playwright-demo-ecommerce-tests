import pg from 'pg';

import { Report } from '@utils/report';

export abstract class DbBase {
  protected pool: pg.Pool;
  protected database: string;
  
  protected constructor(database: string) {
    const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = {
      DB_HOST: process.env[`DB_SERVER_URI_${process.env.ENV.toUpperCase()}`],
      DB_USER: process.env[`DB_USER_ID_${process.env.ENV.toUpperCase()}`],
      DB_PASSWORD: process.env[`DB_PASSWORD_${process.env.ENV.toUpperCase()}`],
      DB_NAME: `${process.env.ENV.toLowerCase()}-${database}`,
    };

    this.database = DB_NAME;

    this.pool = new pg.Pool({
      connectionString: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`,
      idleTimeoutMillis: 180_000,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async connect() {
    if (this.pool.totalCount === 0) await this.pool.connect();
  }

  async sendQuery(query: string): Promise<unknown[]> {
    Report.logStep(`Sending query > ${query}`);
    await this.connect();

    const result = await this.pool.query(query);

    Report.attachJson('Query', {
      query,
      result,
      database: this.database,
    });

    return result.rows;
  }
}

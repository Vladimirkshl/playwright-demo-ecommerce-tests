import { test as pageFixtures } from '@fixtures/page/base.fixture';
import { test as adminFixtures } from '@fixtures/admin/base.fixture';
import { test as solomonoFixtures } from '@fixtures/solomono/base.fixture';
import { test as apiFixtures } from '@fixtures/api.fixture';
import { test as dbFixtures } from '@fixtures/db.fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(pageFixtures, adminFixtures, solomonoFixtures, apiFixtures, dbFixtures);

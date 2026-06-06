import { test as pageFixture } from '@fixtures/page/base.fixture';
import { test as adminFixture } from '@fixtures/admin/base.fixture';
import { test as apiFixture } from '@fixtures/api.fixture';
import { test as dbFixture } from '@fixtures/db.fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(pageFixture, adminFixture, apiFixture, dbFixture);

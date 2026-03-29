import { test as pageFixture } from '@fixtures/page/base.fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(pageFixture);

import { test as accountFixtures } from '@fixtures/solomono/my-account.fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(accountFixtures);

import { test as solomonoPageFixtures } from '@fixtures/page/solomono.fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(solomonoPageFixtures);

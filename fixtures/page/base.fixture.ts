import { test as solomonoPageFixture } from '@fixtures/page/solomono.fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(solomonoPageFixture);

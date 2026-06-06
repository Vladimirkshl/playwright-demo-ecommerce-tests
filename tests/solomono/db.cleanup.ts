import { test } from '@test';

test.describe.configure({ mode: 'serial' });

// HACK: file with fixture data should exist in order to get by tests. API limitation
/*
test('Clean ./TEMP folder with fixture data', async ({}) => {
  FileSystemUtils.deleteTemp();
});
**/

test('Cleanup Product DB records', async ({ productServiceDb }) => {
  await productServiceDb.cleanup();
});

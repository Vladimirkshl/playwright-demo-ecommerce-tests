import { test } from '@test';
import { FileSystemUtils } from '@utils/file-system-utils';

test.describe.configure({ mode: 'serial' });

// HACK: test is skipped because file with fixture data should exist in order to get by tests. API limitation
test.skip('Clean ./TEMP folder with fixture data', async ({}) => {
  FileSystemUtils.deleteTemp();
});

// HACK: dummy database setup as example
test.skip('Cleanup Product DB records', async ({ productServiceDb }) => {
  await productServiceDb.cleanup();
});

import { test } from '@test';
import { FileSystemUtils } from '@utils/file-system-utils';

test.describe.configure({ mode: 'serial' });

test('Clean ./TEMP folder with fixture data', async ({}) => {
  FileSystemUtils.deleteTemp();
});

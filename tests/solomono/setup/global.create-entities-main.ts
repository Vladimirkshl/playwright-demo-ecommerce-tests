import { test } from '@test';
import { FileSystemUtils, TEMP_ENTITY_PATH } from '@utils/file-system-utils';

test.describe.configure({ mode: 'serial' });

test.describe('Global laptops', () => {
  test.skip(FileSystemUtils.doesEntityPathExist(TEMP_ENTITY_PATH.LAPTOP));
  
  test('create', async ({ laptopCreate }) => {
    const laptop = await laptopCreate();
    FileSystemUtils.writeFileTemp(TEMP_ENTITY_PATH.LAPTOP, [laptop]);
  });
});

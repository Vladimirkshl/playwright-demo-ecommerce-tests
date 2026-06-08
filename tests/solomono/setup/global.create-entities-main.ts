import { test } from '@test';
import { FileSystemUtils, TEMP_ENTITY_PATH } from '@utils/file-system-utils';

test.describe.configure({ mode: 'serial' });

// HACK: skipped creating due to api limitation
test.describe.skip('Global laptops', () => {
  test.skip(FileSystemUtils.doesEntityPathExist(TEMP_ENTITY_PATH.LAPTOP));
  
  test('create', async ({ laptop }) => {
    const laptopItem = await laptop();
    FileSystemUtils.writeFileTemp(TEMP_ENTITY_PATH.LAPTOP, [laptopItem]);
  });
});

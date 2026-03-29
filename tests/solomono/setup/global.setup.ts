import { Portal } from '@constants/env';
import { test } from '@test';
import { AuthUtils } from '@utils/auth';
import { FileSystemUtils } from '@utils/file-system-utils';

test.describe.configure({ mode: 'serial' });

test('Solomono authentication', async ({ page }) => {
  const authFilePath = AuthUtils.getAuthFilePath(Portal.SOLOMONO);

  test.skip(
    !process.env.CI && FileSystemUtils.doesPathExist(authFilePath),
    'Skipping authentication (session is valid for 30 days)'
  );

  await AuthUtils.authenticate(page, Portal.SOLOMONO);
});

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

// Example of common session
/**
test('Demo authentication', async ({ page }) => {
  const authFilePath = AuthUtils.getAuthFilePath(Portal.DEMO);
  
  test.skip(
    !process.env.CI && FileSystemUtils.doesPathExist(authFilePath),
    'Skipping authentication (session is valid for 30 days)'
  );

  await AuthUtils.authenticate(page, Portal.DEMO);
});
*/

// Example of setting up BUILD_ID and API_TOKEN
/*
test('Setting up BUILD_ID, ADMIN_API_TOKEN', async ({}) => {
  process.env.BUILD_ID ||= `${process.env.CI ? 'CI_' : ''}${Utils.getCurrentDateTime()}`;
  
  const adminAuthSession = JSON.parse(
    FileSystemUtils.readFile(AuthUtils.getAuthFilePath(Portal.SOLOMONO)) as string
  );
  process.env.ADMIN_API_TOKEN = adminAuthSession.origins[0].localStorage.find(
    (item) => item.name === 'token'
  ).value;

  const demoAdminAuthSession = JSON.parse(
    FileSystemUtils.readFile(AuthUtils.getAuthFilePath(Portal.DEMO)) as string
  );
  process.env.DEMO_ADMIN_API_TOKEN = demoAdminAuthSession.origins[0].localStorage.find(
    (item) => item.name === 'token'
  ).value;
});
  **/

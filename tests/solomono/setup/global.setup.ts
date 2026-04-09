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

// Example of Admin Panel session
/*
test('Admin Panel authentication', async ({ page }) => {
  const authFilePath = AuthUtils.getAuthFilePath(Portal.ADMIN);
  
  test.skip(
    !process.env.CI && FileSystemUtils.doesPathExist(authFilePath),
    'Skipping authentication (session is valid for 30 days)'
  );

  await AuthUtils.authenticate(page, Portal.ADMIN);
});
**/

// Example of setting up BUILD_ID and SOLOMONO_API_TOKEN, ADMIN_API_TOKEN
/*
test('Setting up BUILD_ID, SOLOMONO_API_TOKEN, ADMIN_API_TOKEN', async ({}) => {
  process.env.BUILD_ID ||= `${process.env.CI ? 'CI_' : ''}${Utils.getCurrentDateTime()}`;
  
  const solomonoAuthSession = JSON.parse(
    FileSystemUtils.readFile(AuthUtils.getAuthFilePath(Portal.SOLOMONO)) as string
  );
  process.env.SOLOMONO_API_TOKEN = solomonoAuthSession.origins[0].localStorage.find(
    (item) => item.name === 'token'
  ).value;

  const adminAuthSession = JSON.parse(
    FileSystemUtils.readFile(AuthUtils.getAuthFilePath(Portal.ADMIN)) as string
  );
  process.env.ADMIN_API_TOKEN = adminAuthSession.origins[0].localStorage.find(
    (item) => item.name === 'token'
  ).value;
});
**/

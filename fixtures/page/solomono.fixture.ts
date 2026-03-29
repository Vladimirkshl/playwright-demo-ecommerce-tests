import { getPortalConfig, Portal } from '@constants/env';
import { SolomonoHome } from '@pages/solomono/home';

import { test as base } from '@playwright/test';
import { AuthUtils } from '@utils/auth';

interface SolomonoPageFixtures {
  solomonoHome: SolomonoHome;
  
}

export const test = base.extend<SolomonoPageFixtures>({
  solomonoHome: async ({ browser }, use) => {
    const config = getPortalConfig(Portal.SOLOMONO);
    const context = await browser.newContext({
      storageState: AuthUtils.getAuthFilePath(Portal.SOLOMONO),
      baseURL: config.baseUrl,
    });
    
    const page = await context.newPage();
    const home = new SolomonoHome(page);
    await home.init();
    await use(home);

    await context.close();
  },
});

import { getPortalConfig, Portal } from '@constants/env';
import { IProduct } from '@constants/solomono/product';
import { SolomonoHome } from '@pages/solomono/home';
import { MyAccount } from '@pages/solomono/my-account/my-account';
import { SearchProduct } from '@pages/solomono/search-product';
import { test as base } from '@playwright/test';
import { AuthUtils } from '@utils/auth';

interface SolomonoPageFixtures {
  solomonoHome: SolomonoHome;
  
  searchPage: (product: IProduct) => Promise<SearchProduct>;
  myAccountPage: MyAccount;
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

  searchPage: async ({ solomonoHome }, use) => {
    await use(async (product: IProduct) => await solomonoHome.getSearchProduct(product));
  },

  myAccountPage: async({ solomonoHome }, use) => {
    await use(await solomonoHome.getMyAccount());
  },

});

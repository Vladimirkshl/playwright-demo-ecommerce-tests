import { expect, Page } from '@playwright/test';
import { Report } from '@utils/report';

export class PageUtils {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /* URL */
  
  async goTo(uri: string) {
    await Report.subStep(`Go to [${uri}]`, async () => {
      Report.attachUri(uri);
      await this.page.goto(uri);
    });
  }

  /* TITLE */

  async assertTitle(titleOrRegExp: string | RegExp) {
    await Report.subStep(`Assert page title is [${titleOrRegExp}]`, async () => {
      await expect(this.page).toHaveTitle(titleOrRegExp);
    });
  }

}

import { Page } from '@playwright/test';
import { PageUtils } from '@pages/base/page-utils';
import { H1 } from '@elements/simple/header';

export class PageBase {

  constructor(protected page: Page) {}

  /* ACTIONS */

  utils = () => new PageUtils(this.page);
  goTo = (uri: string) => this.utils().goTo(uri);
  assertTitle = (titleOrRegExp: string | RegExp) => 
    this.utils().assertTitle(titleOrRegExp);

  /* ELEMENTS */

  h1 = (index?: number) => new H1(this.page, index);

}

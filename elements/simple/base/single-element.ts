import { Page } from '@playwright/test';
import { Utils } from '@utils/utils';
import { ElementBase } from '@elements/simple/base/element-base';
import { Report } from '@utils/report';

export class SingleElement extends ElementBase {
  readonly index: number;
  readonly xpathWithIndex: string;
    
  constructor(page: Page, name: string, xpath: string, index = 1) {
    super(page, name, xpath);
    this.index = index;
    this.xpathWithIndex = Utils.addIndexToXpath(xpath, index);
  }

  protected element() {
    Report.logStep(this.xpathWithIndex, false);
    return this.page.locator(this.xpathWithIndex);
  }
}

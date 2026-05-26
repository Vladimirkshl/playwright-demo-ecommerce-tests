import { Page } from '@playwright/test';
import { Utils } from '@utils/utils';
import { ElementBase } from '@elements/base/element-base';
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

  innerElementWithoutParentIndex(name: string, xpath: string, index = 1) {
    return new SingleElement(this.page, `${this.name} > ${name}`, `${this.xpath}${xpath}`, index);
  }

  parent(xpath = '*') {
    return new SingleElement(this.page, `${this.name} parent`, `${this.xpath}/parent::${xpath}`);
  }

  ancestor(xpath = '*') {
    return new SingleElement(this.page, `${this.name} ancestor`, `${this.xpath}/ancestor::${xpath}`);
  }
 
}

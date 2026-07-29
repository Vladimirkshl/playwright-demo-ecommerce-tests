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

  innerElement(name: string, xpath: string, index = 1) {
    return new SingleElement(this.page, `${this.name} > ${name}`, `${this.xpathWithIndex}${xpath}`, index);
  }

  innerElementWithoutParentIndex(name: string, xpath: string, index = 1) {
    return new SingleElement(this.page, `${this.name} > ${name}`, `${this.xpath}${xpath}`, index);
  }

  inDialog(): this {
    const xpathWithinDialog = `//*[@class="modal-dialog"]${this.xpath}`;
    const clonedInstance = Object.create(Object.getPrototypeOf(this));
    
    Object.assign(clonedInstance, this, {
      name: `${this.name} in dialog`,
      xpath: xpathWithinDialog,
      xpathWithIndex: Utils.addIndexToXpath(xpathWithinDialog, this.index),
    });

    return clonedInstance;
  }
  
  protected sameElement() {
    return new SingleElement(this.page, this.name, this.xpath, this.index);
  }

  innerButton(name = '', index = 1) {
    return this.innerElement(`Inner button [${name}]`, name ? `//button[.="${name}"]` : '//button', index);
  }

  followingSibling(xpath = '*') {
    return new SingleElement(this.page, `${this.name} following-sibling`, `${this.xpath}/following-sibling::${xpath}`);
  }

  parent(xpath = '*') {
    return new SingleElement(this.page, `${this.name} parent`, `${this.xpath}/parent::${xpath}`);
  }

  ancestor(xpath = '*') {
    return new SingleElement(this.page, `${this.name} ancestor`, `${this.xpath}/ancestor::${xpath}`);
  }
 
}

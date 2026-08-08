import { MultiElements } from '@elements/base/multi-elements';
import { SingleElement } from '@elements/base/single-element';
import { Page } from '@playwright/test';

export class ListItems extends MultiElements {
  constructor(page: Page, name: string, xpath: string) {
    super(page, name, `${xpath}/option`);
  }
}

export class ListItem extends SingleElement {
  constructor(page: Page, text: string, xpath: string) {
    super(page, text, `${xpath}/option[starts-with(., "${text}")]`);
  }
}

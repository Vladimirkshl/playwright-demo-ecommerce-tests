import { MultiElements } from '@elements/base/multi-elements';
import { SingleElement } from '@elements/base/single-element';
import { Page } from '@playwright/test';

export class ListItems extends MultiElements {
  constructor(page: Page, name: string, xpath = '//div[contains(@class, "selectize-dropdown") and (contains(@style, "display: block"))]//div[contains(@class, "option")]') {
    super(page, name, xpath);
  }
}

export class ListItem extends SingleElement {
  constructor(page: Page, text: string, xpath = `//div[starts-with(., "${text}")]`) {
    super(page, text, xpath);
  }
}

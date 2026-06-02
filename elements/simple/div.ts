import { SingleElement } from '@elements/base/single-element';
import { Page } from '@playwright/test';

export class Div extends SingleElement {
  constructor(page: Page, name: string) {
    super(page, name, `//div[starts-with(., "${name}")] | //div[contains(text(), "${name}")]`);
  }
}

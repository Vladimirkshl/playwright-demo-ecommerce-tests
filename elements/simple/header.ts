import { SingleElement } from '@elements/simple/base/single-element';
import { Page } from '@playwright/test';

export class H1 extends SingleElement {
  constructor(page: Page, index = 1) {
    super(page, 'H1 header', '//h1', index);
  }
}

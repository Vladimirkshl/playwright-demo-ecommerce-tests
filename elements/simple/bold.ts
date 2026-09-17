import { SingleElement } from '@elements/base/single-element';
import { Page } from '@playwright/test';

export class Bold extends SingleElement {
  constructor(page: Page, name: string) {
    super(page, `Bold ${name}`, `//b[starts-with(., "${name}")]`);
  }
}

import { SingleElement } from '@elements/base/single-element';
import { Page } from '@playwright/test';

export class Label extends SingleElement {
  constructor(page: Page, name: string, index?: number) {
    super(page, name, `//label[starts-with(., "${name}")]`, index);
  }
}

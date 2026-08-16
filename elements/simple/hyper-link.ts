import { Page } from '@playwright/test';
import { SingleElement } from '@elements/base/single-element';

export class Hyperlink extends SingleElement {
  constructor(page: Page, text: string, index?: number) {
    super(page, text, `//a[contains(., "${text}")]`, index);
  }
}

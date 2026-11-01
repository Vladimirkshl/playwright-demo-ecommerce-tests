import { SingleElement } from '@elements/base/single-element';
import { Page } from '@playwright/test';

export class P extends SingleElement {
  constructor(page: Page, text: string, index?: number) {
    super(page, text, `//p[starts-with(., "${text}")]`, index);
  }
}

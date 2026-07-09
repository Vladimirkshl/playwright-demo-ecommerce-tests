import { SingleElement } from '@elements/base/single-element';
import { Page } from '@playwright/test';

export class Strong extends SingleElement {
  constructor(page: Page, text: string, index?: number) {
    super(page, text, `//strong[starts-with(., "${text}")]`, index);
  }
}

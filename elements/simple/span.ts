import { SingleElement } from '@elements/base/single-element';
import { Page } from '@playwright/test';

export class Span extends SingleElement {
  constructor(page: Page, name: string, index: number) {
    super(page, name, `//span[starts-with(., "${name}")]`, index);
  }
}

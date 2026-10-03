import { SingleElement } from '@elements/base/single-element';
import { Page } from '@playwright/test';

export class Tooltip extends SingleElement {
  constructor(page: Page, index = 1) {
    super(page, 'Tooltip', '//*[@data-toggle="tooltip"]', index);
  }

  private content() {
    return this.followingSibling('div[contains(@class, "tooltip fade")]');
  }

  async assert(value: string) {
    await this.content().assertText(value);
    await this.unhover();
    await this.content().assertIsHidden();
  }
}

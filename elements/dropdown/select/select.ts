import { Page } from '@playwright/test';
import { SingleElement } from '@elements/base/single-element';

export class Select extends SingleElement {
  constructor(page: Page, name: string, index = 1) {
    super(page, name, `//*[contains(@class, "${name}select")]`, index);
  }
}

import { SingleElement } from '@elements/base/single-element';
import { Page } from '@playwright/test';

export class Field extends SingleElement {
  constructor(page: Page, label: string, index = 1) {
    super(page, label, `//*[.="${label}"]/following-sibling::*`, index);
  }
}

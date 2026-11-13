import { SingleElement } from '@elements/base/single-element';
import { Page } from '@playwright/test';

export class Td extends SingleElement {
  constructor(page: Page, label: string, index = 1) {
    super(page, label, `//td[starts-with(., '${label}')]`, index);
  }
}

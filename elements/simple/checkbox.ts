import { SingleElement } from '@elements/base/single-element';
import { Page } from '@playwright/test';

export class Checkbox extends SingleElement {
  constructor(page: Page, name: string, index = 1) {
    super(page, name, `//label[starts-with(., "${name}")]/preceding-sibling::input[@type="checkbox"]`, index);
  }
}

import { SingleElement } from '@elements/base/single-element';
import { Page } from '@playwright/test';

export class AlertDiv extends SingleElement {
  constructor(page: Page, name: string, index?: number) {
    super(page, `${name} alert div`, `//div[contains(., "${name}") and @role="alert"]`, index);
  }
}

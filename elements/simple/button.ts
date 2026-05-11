import { SingleElement } from '@elements/simple/base/single-element';
import { Page } from '@playwright/test';

export class Button extends SingleElement {
  constructor(page: Page, name: string, index?: number) {
    super(
      page,
      `${name} button`,
      `//button[.="${name}"] | //*[@role="button" and .="${name}"] | //*[@aria-label="${name}"]`,
      index
    );
  }
}

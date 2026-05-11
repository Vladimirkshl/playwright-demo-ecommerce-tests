import { Page } from '@playwright/test';
import { SingleElement } from '@elements/simple/base/single-element';
import { By } from '@constants/common';

export class Input extends SingleElement {
  constructor(page: Page, name: string, by = By.LABEL, index?: number) {
    switch(by) {
      case By.PLACEHOLDER: 
        super(
          page,
          name,
          `//input[@placeholder="${name}"] | //textarea[@placeholder="${name}"]`,
          index
        );
        break;
      case By.ARIA_LABEL: 
        super(
          page,
          name,
          `//input[@aria-label="${name}"] | //textarea[@aria-label="${name}"]`,
          index
        );
        break;
    }
  }
}

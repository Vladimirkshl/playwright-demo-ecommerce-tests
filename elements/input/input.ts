import { Page } from '@playwright/test';
import { SingleElement } from '@elements/base/single-element';
import { By } from '@constants/common';

export class Input extends SingleElement {
  constructor(page: Page, name: string, by = By.LABEL, index?: number) {
    switch(by) {
      case By.LABEL:
        super(
          page,
          name,
          `//*[label[starts-with(., "${name}")] or span[starts-with(., "${name}")]]//*[self::input or self::textarea]`,
          index
        );
        break;
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

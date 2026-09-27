import { SingleElement } from '@elements/base/single-element';
import { Page } from '@playwright/test';

export class AccordionOption extends SingleElement {
  constructor(page: Page, name: string, index?: number) {
    super(page, name, `//*[starts-with(., "${name}")]/ancestor::div[contains(@class, "moduleRow")]`, index);
  }

  label(name: string) {
    return this.innerElementWithoutParentIndex(name, `//div[contains(text(), "${name}")]`);
  }
}

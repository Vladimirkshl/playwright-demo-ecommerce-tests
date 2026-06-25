import { SingleElement } from '@elements/base/single-element';
import { Page } from '@playwright/test';

export class InputImage extends SingleElement {
  constructor(page: Page, name: string, index?: number) {
    super(page, `${name} image`, '//input[@type="file"]', index);
  }
  
}

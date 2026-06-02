import { SingleElement } from '@elements/base/single-element';
import { Page } from '@playwright/test';

export class Header extends SingleElement {
  constructor(page: Page, text: string) {
    super(page, `${text} header`, `//*[self::h1 or self::h2 or self:: h3 or self::header][.="${text}"]`);
  }
}

export class H1 extends SingleElement {
  constructor(page: Page, index = 1) {
    super(page, 'H1 header', '//h1', index);
  }
}

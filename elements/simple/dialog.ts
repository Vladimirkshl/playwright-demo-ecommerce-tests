import { SingleElement } from '@elements/base/single-element';
import { FakeSimple } from '@fake/fake-simple';
import { Page } from '@playwright/test';

export class Dialog extends SingleElement {
  constructor(page: Page) {
    super(page, 'Dialog', '//*[@class="modal-dialog"]');
  }

  private xButton = this.innerElement('[x] button', '//button[@class="close"]');
  private backdrop = new SingleElement(this.page, '[Backdrop]', '//*[contains(@class, "valign-false")]');

  async close() {
    if (FakeSimple.boolean()) await this.backdrop.clickCorner(true);
    else await this.xButton.click();

    await this.assertIsHidden();
  }
};

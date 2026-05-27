import { SingleElement } from '@elements/base/single-element';
import { Page } from '@playwright/test';
import { Report } from '@utils/report';

export class Toastify extends SingleElement {
  constructor(page: Page) {
    super(page, 'Toastify', '//div[contains(@class, "alert-success")]');
  }

  async assertTextIsHidden(text: string, timeoutInSeconds?: number) {
    await Report.subStep(`Assert [${this.name}] text: '${text}'`, async () => {
      await this.assertText(text, timeoutInSeconds);
      await this.unhover();
      await this.assertIsHidden();
    });
  }
}

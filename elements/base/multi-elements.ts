import { ElementBase } from '@elements/base/element-base';
import { expect, Page } from '@playwright/test';
import { Report } from '@utils/report';

export class MultiElements extends ElementBase {
  constructor(page: Page, name: string, xpath: string) {
    super(page, name, xpath);
  }

  protected element() {
    Report.logStep(this.xpath, false);
    return this.page.locator(this.xpath);
  }

  /* STATE ASSERT */
  
  async assertAreVisible() {
    await Report.subStep(`Assert [${this.name}] are visible`, async () => {
      const count = await this.element().count();
      await expect(this.element().nth(0)).toBeVisible();
      if (count > 1) await expect(this.element().nth(count - 1)).toBeVisible();
    });
  }

  async assertAreHidden() {
    await Report.subStep(`Assert [${this.name}] are hidden`, async () => {
      await expect(this.element().nth(0)).toBeHidden();
    });
  }
}

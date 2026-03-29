import { expect, Locator, Page } from '@playwright/test';
import { Report } from '@utils/report';
import config from '@playwrightConfig';

export abstract class ElementBase {
  readonly page: Page;
  readonly name: string;
  readonly xpath: string;

  protected constructor(page: Page, name: string, xpath: string) {
    this.page = page;
    this.name = name;
    this.xpath = xpath;
  }

  protected abstract element(): Locator;

  /* ASSERTS STATES */

  async assertIsVisible(timeoutInSeconds?: number) {
    await Report.subStep(`Assert [${this.name}] is visible`, async () => {
      await expect.soft(this.element()).toBeVisible({
        timeout: timeoutInSeconds * 1000 || config.expect.timeout,
      });
    });
  }

  /* CONTENT */

  async assertText(text: number | string | string[] | RegExp, timeoutInSeconds?: number) {
    await Report.subStep(`Assert [${this.name}]=[${text}]`, async () => {
      if (typeof text === 'number') text = text.toString();
      await expect.soft(this.element()).toHaveText(text, {
        timeout: timeoutInSeconds * 1000 || config.expect.timeout,
      });
    });
  }
}

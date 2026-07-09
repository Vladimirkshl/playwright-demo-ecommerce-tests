import { expect, Locator, Page } from '@playwright/test';
import { Report } from '@utils/report';
import { ElementAttribute as Attribute } from '@constants/common';
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

  async assertToHaveValue(value: string) {
    await Report.subStep(`Assert [${this.name}]=[${value}]`, async () => {
      await expect(this.element()).toHaveValue(value);
    });
  }

  async assertIsHidden(timeoutInSeconds?: number) {
    await Report.subStep(`Assert [${this.name}] is hidden`, async () => {
      await expect.soft(this.element()).toBeHidden({ timeout: timeoutInSeconds * 1000 || config.expect.timeout });
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

  /* ACTIONS */

  async click() {
    await Report.subStep(`Click [${this.name}]`, async () => {
      await this.element().click();
    });
  }

  async clickCorner(force = false) {
    await Report.subStep(`Click top-left corner [${this.name}]`, async () => {
      await this.element().click({ position: { x: 0, y: 0 }, force });
    });
  }

  async fill(text: string) {
    await Report.subStep(`Fill [${this.name}]=[${text}]`, async () => {
      await this.element().clear();
      await this.element().fill(text);
    });
  }

  async fillSequentially(text: string) {
    await Report.subStep(`Fill sequentially [${this.name}]=[${text}]`, async () => {
      await this.element().clear();
      await this.element().pressSequentially(text, { delay: 25 });
    });
  }

  async hover() {
    await Report.subStep(`Hover [${this.name}]`, async () => {
      await this.element().hover();
    });
  }

  async unhover() {
    await Report.subStep(`Unhover [${this.name}]`, async () => {
      await this.page.mouse.move(0, 0);
    });
  }

  async focus() {
    await Report.subStep(`Focus [${this.name}]`, async () => {
      await this.element().focus();
    });
  }

  /* ATTRIBUTES */

  protected async assertAttribute(attrName: Attribute, attrValue?: string) {
    await Report.subStep(`Assert [${this.name}]' @${attrName} is [${attrValue}]`, async () => {
      await expect(this.element()).toHaveAttribute(attrName, attrValue);
    });
  }
  
  async assertAcceptedExtensions(accept: string) {
    await this.assertAttribute(Attribute.ACCEPT, accept);
  }
}

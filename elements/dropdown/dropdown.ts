import { SingleElement } from '@elements/base/single-element';
import { ListItem, ListItems } from '@elements/simple/list-items';
import { Report } from '@utils/report';
import { Utils } from '@utils/utils';

export abstract class Dropdown extends SingleElement {

  //TODO: add constructor with XPath

  /* CONTENT */

  private value = this.innerElement('value', '/*[@selected="selected"]');

  private option(name: string) {
    return new ListItem(this.page, name, this.xpathWithIndex);
  }

  private options = new ListItems(this.page, this.name, `${this.xpathWithIndex}`);

  async getValue(): Promise<string> {
    return this.value.getText();
  }

  /* ASSERT */

  async assertIsOpened() {
    await Report.subStep(`Assert [${this.name}] is opened`, async () => {
      await this.options.assertAreVisible();
    });
  }

  async assertIsClosed() {
    await Report.subStep(`Assert [${this.name}] is hidden`, async () => {
      await this.options.assertAreHidden();
    });
  }

  /* SELECT */

  async select(options: string | string[]) {
    const withMultipleOptions = Array.isArray(options);
    await Report.subStep(`Select [${this.name}]=[${options}]`, async () => {
      await this.scrollTo();
      for (const option of Utils.toArray(options)) {
        await this.selectValue(option, withMultipleOptions);

        await this.assertIsClosed();
      }
    });
  }

  private async selectValue(option: string, withMultipleOptions: boolean) {
    await Report.subStep(`Select option [${option}] for [${this.name}]`, async () => {
      if (await this.isOptionSelected(option, withMultipleOptions)) Report.logStep(`Option [${option}] already selected`);
      else {
        await this.open();
        await this.assertIsOpened();
        await this.option(option).click();
      }
    });
  }

  private async isOptionSelected(option: string, withMultipleOptions: boolean): Promise<boolean> {
    const value = await this.getValue();
    const isOptionPatternWithValue = /\s/.test(value)
      ? new RegExp(`\\b${option}\\b(?![a-z])`)
      : new RegExp(`${option}(?![a-z])`);

    return withMultipleOptions ? isOptionPatternWithValue.test(value) : value === option;
  }
}

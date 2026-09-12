import { SelectType } from '@constants/common';
import { Input } from '@elements/input/input';
import { ListItem } from '@elements/simple/list-item';
import { Report } from '@utils/report';
import { DropdownBase } from '@elements/dropdown/dropdown-base';
import { Utils } from '@utils/utils';

export abstract class SelectBase extends DropdownBase {
  protected selectType: SelectType;
  
  private get isWithSearch() {
    return this.selectType === SelectType.SELECT_WITH_SEARCH;
  }

  /* CONTENT */

  private searchInput = new Input(this.page, 'Please select a state from the States pull down menu.', 1);

  private value = this.innerElement('Value', '//div[@class="item"]');

  private option(name: string) {
    return new ListItem(this.page, name);
  }

  private async getValue() {
    return this.value.getText();
  }

  /* ASSERT */

  async assertValue(value: string | string[], separator = '') {
    if (Array.isArray(value)) value = value.join(separator);
    else value = value.trim();

    await this.expectToEqual((await this.getValue()).trim(), value);
  }

  async assertIsOpened() {
    await Report.subStep(`Assert [${this.name}] is opened`, async () => {
      await this.options.assertAreVisible();
    });
  }

  /* CLEAR */

  async clear() {
    await Report.subStep(`Clear [${this.name}]'s options`, async () => {
      await this.open();
      await this.close(true);
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
        if (this.isWithSearch) await this._fill(option);
        else {
          await this.open();
          await this.assertIsOpened();
        }
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

  private async _fill(option: string) {
    await Report.subStep(`Fill [${this.name}] with [${option}]`, async () => {
      if (this.isWithSearch) {
        await this.open();
        await this.searchInput.fillSequentially(option);
      } 
      // TODO: add else for input which is without search
    });
  }
}

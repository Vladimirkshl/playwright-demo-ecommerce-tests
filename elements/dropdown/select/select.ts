import { Page } from '@playwright/test';
import { SelectType } from '@constants/common';
import { SelectBase } from '@elements/dropdown/select/base';
import { ResponseEvent } from '@constants/api/api';

export class Select extends SelectBase {

  constructor(page: Page, name: string, selectType: SelectType, responseEvent?: ResponseEvent | null, index = 1) {
    let selector: string;
    switch (selectType) {
      case SelectType.SELECT:
        selector = `//*[contains(@class, "${name}select")]`;
        break;
      case SelectType.DYNAMIC_AUTOCOMPLETE:
      case SelectType.SELECT_WITH_SEARCH:
        selector = `//div[starts-with(., "${name}")]//div[contains(@class, "selectize-control")] | //*[starts-with(., "${name}")]/following-sibling::div[contains(@class, "selectize-control")]`;
        break;
    }
    super(page, name, selector, index);

    this.selectType = selectType;
    this.responseEvent = responseEvent;
  }
}

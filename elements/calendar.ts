import { DateFormat, IDateTime } from '@constants/common';
import { SingleElement } from '@elements/base/single-element';
import { FakeSimple } from '@fake/fake-simple';
import { Page } from '@playwright/test';
import { Report } from '@utils/report';
import { Utils } from '@utils/utils';
import { Select } from '@elements/dropdown/select/select';

export class Calendar extends SingleElement {
  constructor(page: Page, label: string, index: number) {
    super(
      page,
      `${label} Calendar`,
      `//*[starts-with(., '${label}')]/following-sibling::input`,
      index
    );
  }

  private popover() {
    return new CalendarPopover(this.page, this.name);
  }

  async assert(dateFormatted: string) {
    await Report.subStep(`Assert [${this.name}]`, async () => {
      await this.assertValue(dateFormatted);
    });
  }

  async select(date: IDateTime) {
    const { dateFormatted } = date;
    
    await Report.subStep(`Select [${this.name}]=[${dateFormatted}]`, async () => {
      if (FakeSimple.boolean(0.85)) {
        await this.fillSequentially(date.dateFormatted);
        await this.popover().applyButton().click();
      } else if (FakeSimple.boolean()) await this.selectViaPopover(date);
      else await this.selectViaPopoverSelects(date);
    });
  }

  private async selectViaPopover(date: IDateTime) {
    await this.open();
    await this.popover().assertIsVisible();
    await this.popover().selectMonth(date);
    await this.sleep(0.5);
    await this.popover().selectDay(date);
    await this.popover().applyButton().click();
    await this.popover().assertIsHidden();
  }

  private async selectViaPopoverSelects(date: IDateTime) {
    await this.open();
    await this.popover().assertIsVisible();
    await this.popover().selectMonthViaSelect(date);
    await this.popover().selectYearViaSelect(date);
    await this.popover().selectDay(date);
    await this.popover().applyButton().click();
    await this.popover().assertIsHidden();
  }
}

class CalendarPopover extends SingleElement {
  constructor(page: Page, name: string) {
    super(page, name, '//div[contains(@class, "daterangepicker")]');
  }

  async header() {
    const month = new SingleElement(this.page, `${this.name} month`, '//select[@class="monthselect"]');
    const year = new SingleElement(this.page, `${this.name} year`, '//select[@class="yearselect"]');
    const selectedMonth = await month.innerElement('Selected month', '//option[@selected="selected"]').getText();
    const selectedYear = await year.innerElement('Selected year', '//option[@selected="selected"]').getText();

    return `${selectedMonth} ${selectedYear}`;
  }

  private day(day: string) {
    return new SingleElement(this.page, `${this.name} day`, `//td[.="${day}" and not(contains(@class, "ends"))]`);
  }

  private monthDropdown() {
    return new Select(this.page, 'month');
  }

  private yearDropdown() {
    return new Select(this.page, 'year');
  }

  private previousButton() {
    return this.innerElement('Previous button', '//th[contains(@class, "prev")]');
  }

  private nextButton() {
    return this.innerElement('Next button', '//th[contains(@class, "next")]');
  }

  applyButton() {
    return this.innerButton('Apply');
  }

  async selectDay(date: IDateTime) {
    await Report.subStep(`Select day [${this.name}]=[${date.day}]`, async () => {
      this.day(date.day).click();
    });
  }
  
  async selectMonth(dateTime: IDateTime) {
    const { date } = dateTime;
    let monthsDifference = Utils.monthsDifference(new Date(await this.header()), date);
    const dateHeader = Utils.dateToString(date, DateFormat.MMMM_yyyy);

    await Report.subStep(`Select month/year [${this.name}]=[${dateHeader}]`, async () => {
      while (monthsDifference < 0) {
        await this.sleep(0.35);
        await this.previousButton().click();
        monthsDifference++;
      }

      while (monthsDifference > 0) {
        await this.sleep(0.35);
        await this.nextButton().click();
        monthsDifference--;
      }

      // TODO: add header assert
    });
  }

  async selectMonthViaSelect(date: IDateTime) {
    await Report.subStep(`Select month via dropdown [${this.name}]=[${date.month}]`, async () => {
      await this.monthDropdown().selectOption(date.monthName);
    });
  }
  
  async selectYearViaSelect(date: IDateTime) {
    await Report.subStep(`Select year via dropdown [${this.name}]=[${date.year}]`, async () => {
      await this.yearDropdown().selectOption(date.year);
    });
  }
}

import { KeyboardKey } from '@constants/common';
import { SingleElement } from '@elements/base/single-element';
import { ListItems } from '@elements/simple/list-item';
import { Report } from '@utils/report';

export class DropdownBase extends SingleElement {

  protected options = new ListItems(this.page, this.name);

  protected buttonSelector = this.sameElement();

  /* ACTIONS */

  async open() {
    await this.buttonSelector.open();
  }

  async close(viaEscape = false) {
    await Report.subStep(`Close [${this.name}]`, async () => {
      if (await this.buttonSelector.isOpened()) {
        if (viaEscape) await this.press(KeyboardKey.ESCAPE);
        else await this.clickCorner();
      } else Report.logStep('Already closed');
    });
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
}

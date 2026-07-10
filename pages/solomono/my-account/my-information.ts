import { IAccount } from '@constants/solomono/my-account/account';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';

export class MyInformation extends PageBase {

  /* ASSERT */

  async assert(account: IAccount) {
    await Report.subStep('Assert my account', async () => {
      // TODO: investigate all allowed emails
      /* await this.field('Email').assertToHaveValue(account.email); */
      await this.field('First Name:').assertToHaveValue(account.firstName);
      await this.field('Last Name:').assertToHaveValue(account.lastName);
      await this.field('Date of Birth:').assertToHaveValue(account.dateOfBirth.formattedDateOfBirth);
      await this.field('Telephone Number:').assertToHaveValue(account.phoneNumber.numberWithCodeFormatted);
    });
  }

  /* ACTIONS */

  async fill(account: IAccount) {
    await Report.subStep('Fill my account', async () => {
      // TODO: investigate all allowed emails
      /* await this.field('Email').fill(account.email); */
      await this.field('First Name:').fill(account.firstName);
      await this.field('Last Name:').fill(account.lastName);
      // TODO: Add probability to select by calendar and fill
      await this.field('Date of Birth:').fillSequentially(account.dateOfBirth.formattedDateOfBirth);
      await this.button('Apply').click();
      await this.field('Telephone Number:').fill(account.phoneNumber.numberWithCodeFormatted);
    });
  }

  async saveChanges() {
    await Report.subStep('Save changes', async () => {  
      await this.button('Continue').click();
      await this.alertDiv('Your account has been successfully updated.').assertIsVisible();
    });
  }

}

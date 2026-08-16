import { IAccount } from '@constants/solomono/my-account/account';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';

export class MyInformation extends PageBase {

  /* ASSERT */

  async assert(account: IAccount) {
    await Report.subStep('Assert my account', async () => {
      await this.h1(2).assertText('My Account');
      // TODO: investigate all allowed emails
      /* await this.field('Email').assertToHaveValue(account.email); */
      await this.field('First Name:').assertValue(account.firstName);
      await this.field('Last Name:').assertValue(account.lastName);
      await this.calendar('Date of Birth:').assert(account.dateOfBirth.formattedDateOfBirth);
      await this.field('Telephone Number:').assertValue(account.phoneNumber.numberWithCodeFormatted);
    });
  }

  /* ACTIONS */

  async fill(account: IAccount) {
    await Report.subStep('Fill my account', async () => {
      // TODO: investigate all allowed emails
      /* await this.field('Email').fill(account.email); */
      await this.field('First Name:').fill(account.firstName);
      await this.field('Last Name:').fill(account.lastName);
      await this.calendar('Date of Birth:').select(account.dateOfBirth);
      await this.field('Telephone Number:').fill(account.phoneNumber.numberWithCodeFormatted);
    });
  }

  /* VALIDATION */

  async triggerValidationErrors() {
    Report.subStep('Trigger validation errors by clicking h1 element', async () => {
      await this.h1().click();
    });
  }

  /* SUBMIT */

  async saveChanges() {
    await Report.subStep('Save changes', async () => {  
      await this.button('Continue').click();
      await this.alertDiv('Your account has been successfully updated.').assertIsVisible();
    });
  }

}

import { By } from '@constants/common';
import { IAccount } from '@constants/solomono/my-account/account';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';

export class MyInformation extends PageBase {

  /* ELEMENTS */

  private firstName = () => this.input('First Name:', By.PLACEHOLDER);
  private lastName = () => this.input('Last Name:', By.PLACEHOLDER);
  private telephoneNumber = () => this.input('Telephone Number:', By.PLACEHOLDER);

  /* ASSERT */

  async assert(account: IAccount) {
    await Report.subStep('Assert my account', async () => {
      await this.h1(2).assertText('My Account');
      // TODO: investigate all allowed emails
      /* await this.input('Email').assertToHaveValue(account.email); */
      await this.firstName().assertValue(account.firstName);
      await this.lastName().assertValue(account.lastName);
      await this.calendar('Date of Birth:').assert(account.dateOfBirth.formattedDateOfBirth);
      await this.telephoneNumber().assertValue(account.phoneNumber.numberWithCodeFormatted);
    });
  }

  /* ACTIONS */

  async fill(account: IAccount) {
    await Report.subStep('Fill my account', async () => {
      // TODO: investigate all allowed emails
      /* await this.input('Email').fill(account.email); */
      await this.firstName().fill(account.firstName);
      await this.lastName().fill(account.lastName);
      await this.calendar('Date of Birth:').select(account.dateOfBirth);
      await this.telephoneNumber().fill(account.phoneNumber.numberWithCodeFormatted);
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

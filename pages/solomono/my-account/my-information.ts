import { IAccount } from '@constants/solomono/my-account/account';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';

export class MyInformation extends PageBase {
  async fill(account: IAccount) {
    await Report.subStep('Fill my information', async () => {
      // TODO: Consider is this available to save edited email
      await this.field('Email').fill(account.email);
      await this.field('First Name:').fill(account.firstName);
      await this.field('Last Name:').fill(account.lastName);
      // TODO: Add probability to select by calendar and fill
      await this.field('Date of Birth:').fill(account.dateOfBirth.formattedDateOfBirth);
      await this.field('Telephone Number:').fill(account.phoneNumber.numberWithCodeFormatted);
    });
  }
}

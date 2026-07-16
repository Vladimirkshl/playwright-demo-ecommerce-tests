import { ApiBase } from '@api/base';
import { ACCOUNT_SERVICE_API } from '@constants/api/my-account';
import { IAccount } from '@constants/solomono/my-account/account';
import { Report } from '@utils/report';

export class AccountApi extends ApiBase {
  apiName = 'AccountApi';

  async update(account: IAccount) {
    await Report.subStep('API: Update my account', async () => {
      await this.POST({
        resource: ACCOUNT_SERVICE_API.myAccount,
        data: {
          email: account.email,
          firstName: account.firstName,
          lastName: account.lastName,
          dateOfBirth: account.dateOfBirth.dateFormatted,
          telephone: account.phoneNumber.numberWithCodeFormatted,
        },
        name: `${this.apiName} / Update my account`,
      });
    });
  }
}

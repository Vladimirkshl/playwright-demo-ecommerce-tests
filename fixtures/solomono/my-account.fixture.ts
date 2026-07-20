import { IAccount } from '@constants/solomono/my-account/account';
import { Fake } from '@fake/solomono/fake';
import { test as base } from '@playwright/test';
import { Report } from '@utils/report';

interface AccountFixtures {
  accountFake: IAccount;
  accountFakeInvalid: IAccount; 
}

export const test = base.extend<AccountFixtures>({
  accountFake: async ({}, use) => {
    const fake = Fake.account();
    Report.attachJson('Fake Account', fake);
    await use(fake);
  },
  accountFakeInvalid: async ({ accountFake }, use) => {
    const fakeInvalid = Fake.accountInvalid(accountFake);
    Report.attachJson('Fake Account Invalid', fakeInvalid);
    await use(fakeInvalid);
  },
});

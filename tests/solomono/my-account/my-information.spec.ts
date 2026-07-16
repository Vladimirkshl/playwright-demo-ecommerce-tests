import { ACCOUNT } from '@constants/solomono/my-account/account';
import { test } from '@test';
import { Report } from '@utils/report';

test('My information > edit', async ({ myAccountPage, accountFake }) => {
  const myAccount = await myAccountPage.getMyInformationPage();

  await Report.step('Fill My Account', async () => {
    await myAccount.fill(accountFake);
  });
  
  await Report.step('Submit', async () => {
    await myAccount.saveChanges();
  });

  await Report.step('Check My Account', async () => {
    await myAccount.assert(accountFake);
  });

  // HACK: data is returned by UI due to API limitation
  await Report.step('Fill My Account with original user', async () => {
    await myAccount.fill(ACCOUNT);
  });

  await Report.step('Submit', async () => {
    await myAccount.saveChanges();
  });
});

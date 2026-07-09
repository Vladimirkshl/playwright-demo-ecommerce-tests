import { test } from '@test';
import { Report } from '@utils/report';

test('My information > edit', async ({ myAccountPage, accountFake }) => {
  const myAccount = await myAccountPage.getMyInformationPage();

  await Report.step('Fill My Account', async () => {
    await myAccount.fill(accountFake);
  });
  
  // TODO: Add save changes action
});

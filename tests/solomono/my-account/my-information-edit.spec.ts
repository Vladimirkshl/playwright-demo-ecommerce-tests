import { ACCOUNT } from '@constants/solomono/my-account/account';
import { test } from '@test';
import { Report } from '@utils/report';

test('Edit My information', async ({ myAccountPage, accountFake }) => {
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

test('Edit My information > Discard changes', async ({ myAccountPage, accountFake }) => {
  const myAccount = await myAccountPage.getMyInformationPage();
  
  await Report.step('Fill My Account', async () => {
    await myAccount.fill(accountFake);
  });

  // HACK: reload page due to sytem's limitation
  await Report.step('Reload page', async () => {
    await myAccount.reload();
  });

  await Report.step('Assert data is not saved', async () => {
    await myAccount.assert(ACCOUNT);
  });
});

test('Edit My information > Validation with invalid data', async ({ myAccountPage, accountFakeInvalid }) => {
  const myAccount = await myAccountPage.getMyInformationPage();

  await Report.step('Fill My Account', async () => {
    await myAccount.fill(accountFakeInvalid);
  });
  
  await Report.step('Trigger the validation errors', async () => {
    await myAccount.triggerValidationErrors();
  });

  //TODO: add assert errors are visible after fixing behavior in system 
});

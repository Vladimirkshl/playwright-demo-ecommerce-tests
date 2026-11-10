import { ACCOUNT } from '@constants/solomono/my-account/account';
import { test } from '@test';
import { Report } from '@utils/report';

test('Edit My information', async ({ myInformationPage, accountFakeToEdit }) => {
  await Report.step('Fill My Information', async () => {
    await myInformationPage.fill(accountFakeToEdit);
  });
  
  await Report.step('Submit', async () => {
    await myInformationPage.saveChanges();
  });

  await Report.step('Check My Information', async () => {
    await myInformationPage.assert(accountFakeToEdit);
  });

  // HACK: data is returned by UI due to API limitation
  await Report.step('Fill My Information with original user', async () => {
    await myInformationPage.fill(ACCOUNT);
  });

  await Report.step('Submit', async () => {
    await myInformationPage.saveChanges();
  });
});

test('Edit My information > Discard changes', async ({ myInformationPage, accountFakeToEdit: accountFake }) => {
  await Report.step('Fill My Information', async () => {
    await myInformationPage.fill(accountFake);
  });

  // HACK: reload page due to sytem's limitation
  await Report.step('Reload page', async () => {
    await myInformationPage.reload();
  });

  await Report.step('Assert data is not saved', async () => {
    await myInformationPage.assert(ACCOUNT);
  });
});

test('Edit My information > Validation with invalid data', async ({ myInformationPage, accountFakeInvalid }) => {
  await Report.step('Fill My Information', async () => {
    await myInformationPage.fill(accountFakeInvalid);
  });
  
  await Report.step('Trigger the validation errors', async () => {
    await myInformationPage.triggerValidationErrors();
  });

  //TODO: add assert errors are visible after fixing behavior in system 
});

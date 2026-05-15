import { test } from '@test';
import { Report } from '@utils/report';

test('Add product to cart', async ({ searchPage, laptopFake }) => {
  const searchResult = await searchPage(laptopFake);

  await Report.step(`Assert ${laptopFake.name} details on Search page`, async () => {
    await searchResult.assertHeader(laptopFake);    
  });
  // HACK: There should be laptop fixture which is created by API instead of laptopFake
  // Assert product
});

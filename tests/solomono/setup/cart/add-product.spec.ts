import { DEMO_LAPTOP } from '@constants/solomono/product';
import { test } from '@test';
import { Report } from '@utils/report';

// HACK: hardcoded DEMO_LAPTOP const is used instead of laptop fixture which is created by API due to limitations on demo website
test('Add product to cart', async ({ searchPage }) => {
  const searchResult = await searchPage(DEMO_LAPTOP);

  await Report.step(`Assert [${DEMO_LAPTOP.name}] details on Search page`, async () => {
    await searchResult.assertHeader(DEMO_LAPTOP);    
  });
});

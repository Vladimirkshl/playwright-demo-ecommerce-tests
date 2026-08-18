import { DEMO_LAPTOP } from '@constants/solomono/product';
import { WishlistDetails } from '@pages/solomono/wishlist';
import { test } from '@test';
import { Report } from '@utils/report';

test('Add product to wishlist', async ({ searchPage }) => {
  const searchResult = await searchPage(DEMO_LAPTOP);

  await Report.step(`Assert [${DEMO_LAPTOP.name}] details on Search page`, async () => {
    await searchResult.assertHeader(DEMO_LAPTOP);  
  });

  await Report.step(`Add [${DEMO_LAPTOP.name}] product to wishlist`, async () => {
    await searchResult.addProductToWishlist(DEMO_LAPTOP);
  });

  let wishlistDetails: WishlistDetails;
  await Report.step('Open wishlist details page', async () => {
    wishlistDetails = await searchResult.getWishlistDetails();
  });

  await Report.step(`Assert [${DEMO_LAPTOP.name}] details on wishlist page`, async () => {
    await wishlistDetails.assert(DEMO_LAPTOP);
  });

  // HACK: remove product from wishlist using UI due to API limitation 
  await Report.step(`Remove [${DEMO_LAPTOP.name}] from wishlist`, async () => {
    await wishlistDetails.removeProduct(DEMO_LAPTOP);
  });
});

test('Add product to wishlist > Remove and add to wishlist', async ({ searchPage }) => {
  // HACK: product is added to wishlist using UI due to API limitation
  let searchResult = await searchPage(DEMO_LAPTOP);

  await Report.step(`Assert [${DEMO_LAPTOP.name}] details on Search page`, async () => {
    await searchResult.assertHeader(DEMO_LAPTOP);  
  });

  await Report.step(`Add [${DEMO_LAPTOP.name}] product to wishlist`, async () => {
    await searchResult.addProductToWishlist(DEMO_LAPTOP);
  });

  let wishlistDetails: WishlistDetails;
  await Report.step('Open wishlist details page', async () => {
    wishlistDetails = await searchResult.getWishlistDetails();
  });

  await Report.step(`Assert [${DEMO_LAPTOP.name}] details on wishlist page`, async () => {
    await wishlistDetails.assert(DEMO_LAPTOP);
  });

  await Report.step(`Remove [${DEMO_LAPTOP.name}] from wishlist`, async () => {
    await wishlistDetails.removeProduct(DEMO_LAPTOP);
  });

  await Report.step(`Search [${DEMO_LAPTOP.name}]`, async () => {
    searchResult = await searchPage(DEMO_LAPTOP);
  });

  await Report.step(`Assert [${DEMO_LAPTOP.name}] details on Search page`, async () => {
    await searchResult.assertHeader(DEMO_LAPTOP);  
  });

  await Report.step(`Add [${DEMO_LAPTOP.name}] product to wishlist`, async () => {
    await searchResult.addProductToWishlist(DEMO_LAPTOP);
  });

  await Report.step('Open wishlist details page', async () => {
    wishlistDetails = await searchResult.getWishlistDetails();
  });

  await Report.step(`Assert [${DEMO_LAPTOP.name}] details on wishlist page`, async () => {
    await wishlistDetails.assert(DEMO_LAPTOP);
  });

  // HACK: remove product from wishlist using UI due to API limitation 
  await Report.step(`Remove [${DEMO_LAPTOP.name}] from wishlist`, async () => {
    await wishlistDetails.removeProduct(DEMO_LAPTOP);
  });
});

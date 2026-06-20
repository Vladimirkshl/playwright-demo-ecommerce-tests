import { DEMO_LAPTOP } from '@constants/solomono/product';
import { ProductDetails } from '@pages/solomono/product-details';
import { ShoppingCart } from '@pages/solomono/shopping-cart';
import { test } from '@test';
import { Report } from '@utils/report';

// HACK: hardcoded DEMO_LAPTOP const is used instead of laptop fixture which is created by API due to limitations on demo website
test('Add product to cart', async ({ searchPage }) => {
  const searchResult = await searchPage(DEMO_LAPTOP);

  await Report.step(`Assert [${DEMO_LAPTOP.name}] details on Search page`, async () => {
    await searchResult.assertHeader(DEMO_LAPTOP);    
  });

  await Report.step(`Assert [${DEMO_LAPTOP.name}] product card on Search page`, async () => {
    await searchResult.assert(DEMO_LAPTOP);
  });

  await Report.step(`Assert hovered [${DEMO_LAPTOP.name}] product card on Search page`, async () => {
    await searchResult.assertHovered(DEMO_LAPTOP);
  });

  let shoppingCart: ShoppingCart;
  await Report.step(`Add [${DEMO_LAPTOP.name}] to shopping cart`, async () => {
    shoppingCart = await searchResult.addProduct(DEMO_LAPTOP);
  });

  await Report.step(`Assert [${DEMO_LAPTOP.name}] in shopping cart`, async () => {
    await shoppingCart.assert(DEMO_LAPTOP);
  });

  // HACK: remove product from cart using UI due to API limitation  
  await Report.step(`Remove [${DEMO_LAPTOP.name}] from shopping cart`, async () => {
    await shoppingCart.removeProduct(DEMO_LAPTOP);
  });
});

test('Add product to cart > remove and add to cart', async ({ searchPage }) => {
  // HACK: product is added to cart using UI due to API limitation
  const searchResult = await searchPage(DEMO_LAPTOP);

  await Report.step(`Assert [${DEMO_LAPTOP.name}] details on Search page`, async () => {
    await searchResult.assertHeader(DEMO_LAPTOP);    
  });

  let shoppingCart: ShoppingCart;
  await Report.subStep(`Add [${DEMO_LAPTOP.name}] to shopping cart`, async () => {
    shoppingCart = await searchResult.addProduct(DEMO_LAPTOP);
  });

  await Report.subStep(`Remove [${DEMO_LAPTOP.name}] from shopping cart`, async () => {
    await shoppingCart.removeProduct(DEMO_LAPTOP);
  });

  await Report.subStep('Close shopping cart dialog', async () => {
    await shoppingCart.close();
  });

  await Report.step(`Add [${DEMO_LAPTOP.name}] to shopping cart`, async () => {
    await searchResult.addProduct(DEMO_LAPTOP);
  });

  await Report.step(`Assert [${DEMO_LAPTOP.name}] in shopping cart`, async () => {
    await shoppingCart.assert(DEMO_LAPTOP);
  });

  // HACK: remove product from cart using UI due to API limitation  
  await Report.step(`Remove [${DEMO_LAPTOP.name}] from shopping cart`, async () => {
    await shoppingCart.removeProduct(DEMO_LAPTOP);
  });
});

test('Add product to cart from product details page', async ({ searchPage }) => {
  const searchResult = await searchPage(DEMO_LAPTOP);

  await Report.step(`Assert [${DEMO_LAPTOP.name}] details on Search page`, async () => {
    await searchResult.assertHeader(DEMO_LAPTOP);    
  });

  await Report.step(`Assert [${DEMO_LAPTOP.name}] product card on Search page`, async () => {
    await searchResult.assert(DEMO_LAPTOP);
  });

  await Report.step(`Assert hovered [${DEMO_LAPTOP.name}] product card on Search page`, async () => {
    await searchResult.assertHovered(DEMO_LAPTOP);
  });

  let productDetails: ProductDetails;
  await Report.step(`Open [${DEMO_LAPTOP.name}] product details page`, async () => {
    productDetails = await searchResult.getProductDetails(DEMO_LAPTOP);
  });

  await Report.step(`Assert [${DEMO_LAPTOP.name}] on product details`, async () => {
    await productDetails.assert(DEMO_LAPTOP);
  });

  // Add product to the cart
  
});

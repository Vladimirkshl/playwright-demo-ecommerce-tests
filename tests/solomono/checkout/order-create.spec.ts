import { ORDER } from '@constants/solomono/order';
import { DEMO_LAPTOP } from '@constants/solomono/product';
import { Checkout } from '@pages/solomono/checkout';
import { ShoppingCart } from '@pages/solomono/shopping-cart';
import { test } from '@test';
import { Report } from '@utils/report';

// HACK: hardcoded ORDER const is used instead of order fixture due to limitations with product API
test('Assert checkout', async ({ searchPage }) => {
  // HACK: product is added to cart using UI due to API limitation
  const searchResult = await searchPage(DEMO_LAPTOP);
  
  let shoppingCart: ShoppingCart;
  await Report.subStep(`Add [${DEMO_LAPTOP.name}] to shopping cart`, async () => {
    shoppingCart = await searchResult.addProduct(DEMO_LAPTOP);
  });

  let checkout: Checkout;
  await Report.step('Open Checkout page', async () => {
    checkout = await shoppingCart.getCheckout();
  });

  await Report.step(`Assert default [${ORDER.customer.fullName}] section`, async () => {
    await checkout.assertUser(ORDER);
  });

  await Report.step('Assert default [Shipping method] section', async () => {
    await checkout.assertShippingMethod();
  });

  await Report.step('Assert default [Payment method] section', async () => {
    await checkout.assertPaymentMethod();
  });

  await Report.step(`Assert [${ORDER.product.name}] cart section`, async () => {
    await checkout.assertCart(ORDER);
  });

  await Report.step('Assert [Newsletter] section', async () => {
    await checkout.assertNewsletter(ORDER);
  });

  await Report.step('Assert [Order totals] section', async () => {
    await checkout.assertOrderTotals(ORDER);
  });

  // HACK: product is removed via UI due to API limitation
  await Report.step(`Remove [${ORDER.product.name}] from checkout`, async () => {
    await checkout.removeProduct(ORDER.product);
  });
});

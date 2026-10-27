import { Checkout } from '@pages/solomono/checkout';
import { ShoppingCart } from '@pages/solomono/shopping-cart';
import { test } from '@test';
import { Report } from '@utils/report';

test('Edit order', async ({ searchPage, orderFakeToEdit }) => {
  // HACK: product is added to cart using UI due to API limitation
  const searchResult = await searchPage(orderFakeToEdit.product);
  
  let shoppingCart: ShoppingCart;
  await Report.subStep(`Add [${orderFakeToEdit.product.name}] to shopping cart`, async () => {
    shoppingCart = await searchResult.addProduct(orderFakeToEdit.product);
  });

  let checkout: Checkout;
  await Report.step('Open [Checkout] page', async () => {
    checkout = await shoppingCart.getCheckout();
  });

  await Report.step(`Fill [${orderFakeToEdit.customer.fullName}] user`, async () => {
    await checkout.fillUser(orderFakeToEdit);
  });

  await Report.step(`Fill [${orderFakeToEdit.shipping.method}] shipping method`, async () => {
    await checkout.fillShippingMethod(orderFakeToEdit);
  });

  await Report.step(`Fill [${orderFakeToEdit.method}] payment method`, async () => {
    await checkout.fillPaymentMethod(orderFakeToEdit);
  });

  await Report.step(`Fill [${orderFakeToEdit.product.name}] product`, async () => {
    await checkout.fillProduct(orderFakeToEdit);
  });

  await Report.step('Fill [Newsletter]', async () => {
    await checkout.fillNewsletter(orderFakeToEdit);
  });

  await Report.step(`Assert collapsed [${orderFakeToEdit.customer.firstName}] user section`, async () => {
    await checkout.assertUserSectionCollapsed(orderFakeToEdit.customer);
  });

  await Report.step('Assert collapsed [Shipping method] section', async () => {
    await checkout.assertShippingSectionCollapsed(orderFakeToEdit);
  });

  await Report.step('Assert collapsed [Payment method] section', async () => {
    await checkout.assertPaymentSectionCollapsed(orderFakeToEdit);
  });

  await Report.step('Assert [Cart] section', async () => {
    await checkout.assertCart(orderFakeToEdit);
  });

  await Report.step('Assert [Newsletter] section', async () => {
    await checkout.assertNewsletter(orderFakeToEdit);
  });

  await Report.step('Assert [Order totals] section', async () => {
    await checkout.assertOrderTotals(orderFakeToEdit);
  });

  // HACK: product is removed via UI due to API limitation
  await Report.step(`Remove [${orderFakeToEdit.product.name}] from checkout`, async () => {
    await checkout.removeProduct(orderFakeToEdit.product);
  });
});

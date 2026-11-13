import { Checkout } from '@pages/solomono/checkout';
import { MyOrderHistory } from '@pages/solomono/my-account/order-history';
import { OrderConfirmation } from '@pages/solomono/order-confirmation';
import { ShoppingCart } from '@pages/solomono/shopping-cart';
import { test } from '@test';
import { Report } from '@utils/report';

// HACK: test is skipped due to limeted qty of products on website
test.skip('Place order > assert order history', async ({ searchPage, myOrderHistoryPage, orderFakeToEdit }) => {
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

  await Report.step(`Fill [${orderFakeToEdit.paymentMethod}] payment method`, async () => {
    await checkout.fillPaymentMethod(orderFakeToEdit);
  });

  await Report.step(`Fill [${orderFakeToEdit.product.name}] product`, async () => {
    await checkout.fillProduct(orderFakeToEdit);
  });

  await Report.step('Fill [Newsletter]', async () => {
    await checkout.fillNewsletter(orderFakeToEdit);
  });

  let orderConfirmation: OrderConfirmation;
  await Report.step('Submit [Order]', async () => {
    orderConfirmation = await checkout.submit();
  });

  await Report.step('Submit [Order placement]', async () => {
    orderFakeToEdit = await orderConfirmation.submit(orderFakeToEdit);
  });

  let orderHistory: MyOrderHistory;
  await Report.step('Open [Order history] page', async () => {
    orderHistory = await myOrderHistoryPage();
  });

  await Report.step('Assert [Order] on Oder history page', async () => {
    await orderHistory.assertHeader();
    await orderHistory.assert(orderFakeToEdit);
  });
});

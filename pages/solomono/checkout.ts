import { ResponseEvent } from '@constants/api/api';
import { By } from '@constants/common';
import { Country } from '@constants/geo/geo';
import { ICustomer, IOrder, PAYMENT_METHOD_TOOLTIP_VALUE, PaymentMethod, 
  SHIPPING_METHOD_CART, SHIPPING_METHOD_PRICE_CHECKOUT_VALUE, 
  SHIPPING_METHOD_TOOLTIP_VALUE, SHIPPING_METHOD_TOTAL_PRICE_CHECKOUT_VALUE, ShippingMethod } from '@constants/solomono/order';
import { IProduct } from '@constants/solomono/product';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';

export class Checkout extends PageBase {

  /* ELEMENTS */

  private addressBook = (index: number) => this.hyperLink('Address book', index);
  private addComment = () => this.checkbox('Add a comment');
  private billingAddress = () => this.header('Billing address');
  private comment = () => this.input('Comment', By.PLACEHOLDER);
  private callMeBack = () => this.checkbox('Don\'t call me back. You can send the order right away.');
  private differentBillingAddress = () => this.checkbox('Different billing address?');
  private newsletter = () => this.checkbox('Newsletter');
  private proceed = (index?: number) => this.span('Proceed', index);
  private card = (name: string) => this.hyperLink(name).ancestor('div[@class="checkout_cart_item"]');
  private image = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.image.name, '//img');
  private quantity = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.cartQty.toString(), '//input[@type="number"]');
  private totalPrice = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.totalPrice, '//b');
  private remove = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex('Delete button', '//button');

  /* ASSERT */

  async assertUser(order: IOrder) {
    await Report.subStep(`Assert [${order.customer.fullName}] user section`, async () => {
      await this.assertUserSection();
      await this.assertAddressBook(order.customer);
      await this.assertAddress(order.customer);
      await this.submitSection(1);
      await this.assertUserSectionCollapsed(order.customer);
    });
  }

  async assertShippingMethod() {
    await Report.subStep('Assert default [Shipping method] section', async () => {
      await this.assertShippingSection();
      await this.assertShippingOptions();
      await this.submitSection(2);
      await this.assertShippingSectionCollapsed();
    });
  }

  async assertPaymentMethod(order: IOrder) {
    await Report.subStep('Assert deftault [Payment method] section', async () => {
      await this.assertPaymentSection();
      await this.assertPaymentOptions();
      await this.submitSection(3);
      await this.assertPaymentSectionCollapsed(order);
    });
  }

  async assertCart(order: IOrder) {
    await Report.subStep(`Assert cart with [${order.product.name}]`, async () => {
      await this.assertCartSection(order.product);
      await this.assertProduct(order.product);
    });
  }

  async assertNewsletter(order: IOrder) {
    await Report.subStep('Assert [Newsletter] section', async () => {
      if (order.newsletter) await this.newsletter().assertIsChecked();
      else await this.newsletter().assertIsUnchecked();
      if (order.callBack) await this.callMeBack().assertIsChecked();
      else await this.callMeBack().assertIsUnchecked();
      if (order.comment.enabled) {
        await this.addComment().assertIsChecked();
        await this.comment().assertIsVisible();
      } else {
        await this.addComment().assertIsUnchecked();
        await this.comment().assertIsHidden();
      }
    });
  }

  async assertOrderTotals(order: IOrder) {
    await Report.subStep('Assert [Order totals] section', async () => {
      await this.field('Order Sub-Total:').assertText(order.product.totalPrice);
      // TODO: remove comment after fixing the UI part of delivery
      /*
      await this.field(SHIPPING_METHOD_CART[order.shipping.method])
        .assertText(SHIPPING_METHOD_TOTAL_PRICE_CHECKOUT_VALUE[order.shipping.method]);
      **/
      // TODO: remove comment after fixing product price
      /* await this.field('Total:').assertText(order.total.fullPrice); */
    });
  }

  private async assertUserSection() {
    await Report.subStep('Assert [User] header', async () => {
      await this.span('1', 1).assertIsVisible();
      await this.div('User', 1).assertIsVisible();
    });
  }

  private async assertAddressBook(customer: ICustomer) {
    await Report.subStep('Assert [Address book]', async () => {
      await this.addressBook(1).click();

      await this.header('Choose address').inDialog().assertIsVisible();
      await this.dialog().xButton.assertIsVisible();
      await this.hyperLink('Address book').inDialog().assertIsVisible();
      await this.bold(customer.fullName).inDialog().assertIsVisible();
      await this.label(customer.address.addressFull).inDialog().assertIsVisible();

      await this.assertFooter();

      await this.dialog().close();
    });
  }

  private async assertFooter() {
    await Report.subStep('Assert address book footer', async () => {
      await this.button('Close').inDialog().assertIsVisible();
      await this.span('Change address').inDialog().assertIsVisible();
    });
  }

  private async assertAddress(customer: ICustomer) {
    await Report.subStep(`Assert [${customer.address.addressFull}] address`, async () => {
      await this.input('First Name:').assertValue(customer.firstName);
      await this.input('Last Name:').assertValue(customer.lastName);
      await this.input('Phone number:').assertValue(customer.phoneNumber.numberWithCodeFormatted);
      await this.input('Street Address:').assertValue(customer.address.streetAddress);
      await this.input('City').assertValue(customer.address.city);
      await this.selectWithSearch('State/Province:').assertValue(customer.address.state);
      await this.input('Zip Code:').assertValue(customer.address.zipCode);
      await this.selectWithSearch('Country:').assertValue(customer.address.country);
      if (customer.differentBillingAddress.isDifferentBillingAddress) {
        await this.differentBillingAddress().assertIsChecked();
        await this.assertBillingAddress(customer);
      } else {
        await this.differentBillingAddress().assertIsUnchecked();
        await this.billingAddress().assertIsHidden();
      }   

      await this.proceed().assertIsVisible();
    });
  }

  private async assertBillingAddress(customer: ICustomer) {
    await Report.subStep(`Assert [${customer.fullName}] billing address`, async () => {
      await this.billingAddress().assertIsVisible();
      await this.addressBook(2).assertIsVisible();
      await this.input('First Name:').assertValue(customer.firstName);
      await this.input('Last Name:').assertValue(customer.lastName);
      await this.input('Street Address:').assertValue(customer.address.streetAddress);
      await this.input('City').assertValue(customer.address.city);
      await this.selectWithSearch('State/Province:').assertValue(customer.address.state);
      await this.input('Zip Code:').assertValue(customer.address.zipCode);
      await this.selectWithSearch('Country:').assertValue(customer.address.country);
    });
  }

  async assertUserSectionCollapsed(customer: ICustomer) {
    await Report.subStep(`Assert collapsed [${customer.firstName}]`, async () => {
      await this.div('User', 9).assertIsClosed();
      await this.span(customer.firstName).assertIsVisible();
      await this.span(customer.lastName).assertIsVisible();
      await this.span(customer.phoneNumber.numberWithCodeFormatted).assertIsVisible();
      await this.span(customer.address.streetAddress).assertIsVisible();
      await this.span(customer.address.city).assertIsVisible();
      await this.span(customer.address.country).assertIsVisible();
      if (customer.address.country === Country.UKRAINE) await this.span(customer.address.state).assertIsVisible();
    });
  }

  private async assertShippingSection() {
    await Report.subStep('Assert [Shipping Method] header', async () => {
      await this.span('2', 1).assertIsVisible();
      await this.div('Shipping method', 1).assertIsVisible();
    });
  }

  private async assertShippingOptions() {
    await Report.subStep('Assert default [Shipping Option]', async () => {
      let tooltipIndex = 1;

      for (const option of Object.values(ShippingMethod)) {
        await this.accordionOption(option).assertIsVisible();
        await this.accordionOption(option).label(SHIPPING_METHOD_PRICE_CHECKOUT_VALUE[option]).assertIsVisible();
        
        if (option !== ShippingMethod.ELECTRONIC_PRODUCT && option !== ShippingMethod.SELF_DELIVERY) {
          await this.tooltip(tooltipIndex).hover();
          await this.tooltip(tooltipIndex).assert(SHIPPING_METHOD_TOOLTIP_VALUE[option]);

          tooltipIndex++;
        }
      }
      await this.proceed(2).assertIsVisible();
    });
  }

  async assertShippingSectionCollapsed(order?: IOrder) {
    await Report.subStep('Assert [Shipping method] section collapsed', async () => {
      await this.span('2').assertIsVisible();
      await this.div('Shipping method', 8).assertIsClosed();
      if (order) {
        await this.span(order.shipping.method).assertIsVisible();
        await this.span(order.shipping.price).assertIsVisible();
      };
      await this.div('Change').assertIsVisible();
    });
  }

  private async assertPaymentSection() {
    await Report.subStep('Assert [Payment] header', async () => {
      await this.span('3', 2).assertIsVisible();
      await this.div('Payment method').assertIsVisible();
    });
  }

  private async assertPaymentOptions() {
    await Report.subStep('Assert default [Shipping Option]', async () => {
      let tooltipIndex = 6;

      for (const option of Object.values(PaymentMethod)) {
        await this.accordionOption(option).assertIsVisible();
        
        if (option !== PaymentMethod.PAYPAL) {
          await this.tooltip(tooltipIndex).hover();
          await this.tooltip(tooltipIndex).assert(PAYMENT_METHOD_TOOLTIP_VALUE[option]);

          tooltipIndex++;
        }
      }
      await this.proceed(3).assertIsVisible();
    });
  }

  async assertPaymentSectionCollapsed(order: IOrder) {
    await Report.subStep('Assert [Shipping method] section collapsed', async () => {
      await this.div('Payment method', 8).assertIsClosed();
      await this.span('3', 2).assertIsVisible();
      await this.div('Payment method').assertIsVisible();
      await this.span(order.method).assertIsVisible();
      await this.div('Change').assertIsVisible();
    });
  }

  private async assertCartSection(product: IProduct) {
    await Report.subStep('Assert [Cart] header', async () => {
      await this.span('4').assertIsVisible();
      await this.div('Cart', 9).assertIsVisible();
      await this.span(`(${product.cartQty})`).assertIsVisible();
    });
  };

  private async assertProduct(product: IProduct) {
    await Report.subStep(`Assert [${product.name}] product`, async () => {
      await this.card(product.name).assertIsVisible();
      await this.image(product).assertIsVisible();
      await this.hyperLink(product.name).assertIsVisible();
      await this.quantity(product).assertValue(product.cartQty.toString());
      // TODO: add calculation after fixing product price
      await this.totalPrice(product).assertText(product.totalPrice);
      await this.remove(product).assertIsVisible();
    });
  }

  /* FILL */

  async fillUser(order: IOrder) {
    await Report.subStep(`Fill [${order.customer.fullName}]`, async () => {
      await this.input('First Name:').fill(order.customer.firstName);
      await this.input('Last Name:').fill(order.customer.lastName);
      await this.input('Phone number').fill(order.customer.phoneNumber.numberWithCodeFormatted);
      await this.input('Street Address:').fill(order.customer.address.streetAddress);
      await this.input('City').fill(order.customer.address.city);
      await this.selectWithSearch('Country:').select(order.customer.address.country);
      await this.input('Zip Code:').fill(order.customer.address.zipCode);
      
      if (order.customer.differentBillingAddress.isDifferentBillingAddress) {
        await this.label('Different billing address?').check();
        await this.fillBillingAddress(order);
      }

      await this.proceed().click();
    });
  }

  async fillBillingAddress(order: IOrder) {
    await Report.subStep('Fill [Billing address] section', async () => {
      await this.input('First Name:', By.LABEL, 2).fill(order.customer.differentBillingAddress.customer.firstName);
      await this.input('Last Name:', By.LABEL, 2).fill(order.customer.differentBillingAddress.customer.lastName);
      await this.input('Street Address:', By.LABEL, 3).fill(order.customer.differentBillingAddress.address.streetAddress);
      await this.input('City', By.LABEL, 2).fill(order.customer.differentBillingAddress.address.city);
      await this.selectWithSearch('Country:', 2).select(order.customer.differentBillingAddress.address.country);
      await this.input('State/Province:', By.LABEL, 3).fill(order.customer.differentBillingAddress.address.state);
      await this.input('Zip Code:', By.LABEL, 2).fill(order.customer.differentBillingAddress.address.zipCode);
    });
  }

  async fillShippingMethod(order: IOrder) {
    await Report.subStep(`Fill [${order.shipping.method}]`, async () => {
      await this.accordionOption(order.shipping.method).click();

      if (order.shipping.method === ShippingMethod.UKRPOSHTA) {
        await this.waitFor(ResponseEvent.CHECKOUT, () => this.dynamicAutocomplete('City of delivery').select(order.shipping.city));
        await this.waitFor(ResponseEvent.CHECKOUT, () => this.selectWithSearch('Branch address').select(order.shipping.branch));
      }
      if (order.shipping.method === ShippingMethod.NOVA_POST) {
        await this.waitFor(ResponseEvent.CHECKOUT, () => this.selectWithSearch('City of delivery').select(order.shipping.city));
        await this.waitFor(ResponseEvent.CHECKOUT, () => this.selectWithSearch('Branch address').select(order.shipping.branch));
      };
      
      await this.proceed(2).click();
    });
  }

  async fillPaymentMethod(order: IOrder) {
    await Report.subStep(`Fill [${order.method}]`, async () => {
      await this.accordionOption(order.method).click();

      await this.proceed(3).click();
    });
  }

  async fillProduct(order: IOrder) {
    await Report.subStep(`Fill [${order.product.name}]`, async () => {
      await this.quantity(order.product).fill(order.product.cartQty.toString());
    });
  }

  async fillNewsletter(order: IOrder) {
    await Report.subStep('Fill [Newsletter] section', async () => {
      if (order.newsletter) await this.label('Newsletter').check();
      else await this.label('Newsletter').uncheck();
      if (order.callBack) await this.label('Don\'t call me back. You can send the order right away.').check();
      else await this.label('Don\'t call me back. You can send the order right away.').uncheck();
      if (order.comment.enabled) {
        await this.label('Add a comment').check();
        await this.comment().fill(order.comment.text);
      } else await this.label('Add a comment').uncheck();
    });
  }

  /* ACTIONS */

  async submitSection(index: number) {
    await Report.subStep('Click submit button', async () => {
      await this.proceed(index).click();
    });
  }
  
  async removeProduct(product: IProduct) {
    await Report.subStep(`Remove [${product.name}] from cart`, async () => {
      await this.remove(product).click();
      await this.card(product.name).assertIsHidden();
    });
  }

}

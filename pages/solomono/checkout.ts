import { By } from '@constants/common';
import { ICustomer, IOrder, PAYMENT_METHOD_TOOLTIP_VALUE, PaymentMethod, SHIPPING_METHOD_PRICE, SHIPPING_METHOD_TOOLTIP_VALUE, ShippingMethod } from '@constants/solomono/order';
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
      await this.assertUserSectionCollapsed(order.customer);
    });
  }

  async assertShippingMethod() {
    await Report.subStep('Assert default [Shipping method] section', async () => {
      await this.assertShippingSection();
      await this.assertShippingOptions();
      await this.assertShippingSectionCollapesed();
    });
  }

  async assertPaymentMethod() {
    await Report.subStep('Assert deftault [Payment method] section', async () => {
      await this.assertPaymentSection();
      await this.assertPaymentOptions();
      await this.assertPaymentSectionCollapesed();
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

  // TODO: add assert order totals method

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

  private async assertUserSectionCollapsed(customer: ICustomer) {
    await Report.subStep(`Assert collapsed [${customer.firstName}]`, async () => {
      await this.proceed(1).click();

      await this.div('User', 9).assertIsClosed();
      await this.span(customer.firstName).assertIsVisible();
      await this.span(customer.lastName).assertIsVisible();
      await this.span(customer.phoneNumber.numberWithCodeFormatted).assertIsVisible();
      await this.span(customer.address.streetAddress).assertIsVisible();
      await this.span(customer.address.city).assertIsVisible();
      await this.span(customer.address.country).assertIsVisible();
      await this.span(customer.address.state).assertIsVisible();
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
        await this.accordionOption(option).label(SHIPPING_METHOD_PRICE[option]).assertIsVisible();
        
        if (option !== ShippingMethod.ELECTRONIC_PRODUCT && option !== ShippingMethod.SELF_DELIVERY) {
          await this.tooltip(tooltipIndex).hover();
          await this.tooltip(tooltipIndex).assert(SHIPPING_METHOD_TOOLTIP_VALUE[option]);

          tooltipIndex++;
        }
      }
      await this.proceed(2).assertIsVisible();
    });
  }

  private async assertShippingSectionCollapesed() {
    await Report.subStep('Assert [Shipping method] section collapsed', async () => {
      await this.proceed(2).click();

      await this.div('Shipping method', 8).assertIsClosed();
      await this.span('2').assertIsVisible();
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

  private async assertPaymentSectionCollapesed() {
    await Report.subStep('Assert [Shipping method] section collapsed', async () => {
      await this.proceed(3).click();

      await this.div('Payment method', 8).assertIsClosed();
      await this.span('3', 2).assertIsVisible();
      await this.div('Payment method').assertIsVisible();
      await this.span('Cash on Delivery').assertIsVisible();
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

  /* ACTIONS */
  
  async removeProduct(product: IProduct) {
    await Report.subStep(`Remove [${product.name}] from cart`, async () => {
      await this.remove(product).click();
      await this.card(product.name).assertIsHidden();
    });
  }

}

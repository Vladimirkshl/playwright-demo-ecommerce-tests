import { ICustomer, IOrder, SHIPPING_METHOD_PRICE, SHIPPING_METHOD_TOOLTIP_VALUE, ShippingMethod } from '@constants/solomono/order';
import { FakeSimple } from '@fake/fake-simple';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';

export class Checkout extends PageBase {

  /* ELEMENTS */

  protected proceed = (index?: number) => this.span('Proceed', index);
  protected addressBook = (index: number) => this.hyperLink('Address book', index);
  protected billingAddress = () => this.header('Billing address');
  protected differentBillingAddress = () => this.checkbox('Different billing address?');

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
    await Report.subStep(`Assert default [${customer.address.addressFull}] address`, async () => {
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
        await this.differentBillingAddress().asserIsUnchecked();
        await this.billingAddress().assertIsHidden();
      }   

      await this.proceed().assertIsVisible();
    });
  }

  private async assertBillingAddress(customer: ICustomer) {
    await Report.subStep(`Assert default [${customer.fullName}] billing address`, async () => {
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
      if (FakeSimple.boolean()) await this.proceed(1).click();
      else await this.div('User', 1).click();
      await this.div('User', 8).assertIsClosed();
      await this.span(customer.firstName).assertIsVisible();
      await this.span(customer.lastName).assertIsVisible();
      await this.span(customer.phoneNumber.numberWithCodeFormatted).assertIsVisible();
      await this.span(customer.address.streetAddress).assertIsVisible();
      await this.span(customer.address.city).assertIsVisible();
      await this.span(customer.address.country).assertIsVisible();
      await this.span(customer.address.state).assertIsVisible();
      await this.addressBook(1).assertIsHidden();
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
      if (FakeSimple.boolean()) await this.proceed(2).click();
      else await this.div('Shipping method').click();
      await this.div('Shipping method').assertIsClosed();
      await this.span('2').assertIsVisible();
      await this.div('Change').assertIsVisible();
    });
  }
}

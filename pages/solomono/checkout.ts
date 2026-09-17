import { ICustomer, IOrder } from '@constants/solomono/order';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';

export class Checkout extends PageBase {

  /* ELEMENTS */

  protected proceed = () => this.span('Proceed');
  protected addressBook = (index: number) => this.hyperLink('Address book', index);
  protected billingAddress = () => this.header('Billing address');
  protected differentBillingAddress = () => this.checkbox('Different billing address?');

  /* ASSERT */

  async assertUser(order: IOrder) {
    await Report.subStep('Assert [Checkout]', async () => {
      await this.assertUserHeader();
      await this.assertAddressBook(order.customer);
      await this.assertUserAddress(order.customer);
      // TODO: add assert of the data of the closed section
    });
  }

  // TODO: implement the assertShippingMethod()

  async assertAddressBook(customer: ICustomer) {
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

  async assertUserHeader() {
    await Report.subStep('Assert [User] header', async () => {
      await this.span('1', 1).assertIsVisible();
      await this.div('User', 1).assertIsVisible();
    });
  }

  async assertUserAddress(customer: ICustomer) {
    await Report.subStep(`Assert [${customer.firstName}] default`, async () => {
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
    await Report.subStep(`Assert [${customer.firstName}] default`, async () => {
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
}

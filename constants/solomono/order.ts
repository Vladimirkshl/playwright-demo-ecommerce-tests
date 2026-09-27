import { IProduct } from '@constants/solomono/product';
import { IAccount } from '@constants/solomono/my-account/account';
import { IAddress } from '@constants/geo/address';
import { Country, Currency, TimeZone } from '@constants/geo/geo';
import { Utils } from '@utils/utils';

export interface IOrder extends IPaymentMetod, IOrderGeneralInfo {}

export interface IOrder {
  customer: ICustomer
  product: IProduct;
  shippingMethod: IShippingMethod;
  api?: {
    id: string;
  }
}

export interface ICustomer extends IAccount {
  address: IAddress;
  differentBillingAddress: IDifferentBillingAddress;
}

export interface IDifferentBillingAddress {
  isDifferentBillingAddress: boolean;
  address?: IAddress;
}

export interface IShippingMethod {
  method: ShippingMethod;
  price: string;
  // TODO: add property to increse the product price
}

export interface IPaymentMetod {
  method: PaymentMethod;
}

export enum ShippingMethod {
  UKRPOSHTA = 'Ukrposhta',
  CUSTOM_SHIPPER = 'Custom Shipper',
  ELECTRONIC_PRODUCT = 'Electronic product',
  BEST_WAY = 'Best Way',
  NOVA_POST = 'Nova Post',
  FOR_ODESSA_CITIZENS = 'For Odessa citizens',
  SELF_DELIVERY = 'Self-delivery',
}

// @ts-ignore
export const SHIPPING_METHOD_PRICE = {
  [ShippingMethod.UKRPOSHTA]: 'По тарифам перевізника',
  [ShippingMethod.CUSTOM_SHIPPER]: 'According to carrier tariffs',
  [ShippingMethod.ELECTRONIC_PRODUCT]: `${Currency.DOLLAR}5.00`,
  [ShippingMethod.BEST_WAY]: `${Currency.DOLLAR}13.00`,
  [ShippingMethod.NOVA_POST]: '',
  [ShippingMethod.FOR_ODESSA_CITIZENS]: `${Currency.DOLLAR}5.00`,
  [ShippingMethod.SELF_DELIVERY]: `${Currency.DOLLAR}5.00`,
};

export const SHIPPING_METHOD_TOOLTIP_VALUE = {
  [ShippingMethod.UKRPOSHTA]: 'For the delivery of documents, vantages and parcels. The biggest measure is in the whole of Ukraine.',
  [ShippingMethod.CUSTOM_SHIPPER]: 'The ability to pick up the purchased goods at a convenient time on their own and at the same time save on delivery.',
  [ShippingMethod.ELECTRONIC_PRODUCT]: '',
  [ShippingMethod.BEST_WAY]: 'Calculation of terms and costs, also possible determination of the cost for transportation.',
  [ShippingMethod.NOVA_POST]: 'Ukrainian international logistics group, the largest network of branches throughout Ukraine.',
  [ShippingMethod.FOR_ODESSA_CITIZENS]: 'Delivery only for residents of Kyiv.',
  [ShippingMethod.SELF_DELIVERY]: '',
};

export enum PaymentMethod {
  CASH_ON_DELIVERY = 'Cash on Delivery',
  BANK_TRANSFER = 'Bank Transfer',
  VISA_MASTERCARD_LIQPAY = 'Visa/Mastercard LiqPay',
  PAYPAL = 'PayPal',
  BANK_CARD_PAYMENT = 'Bank card payment',
  MONOBANK_VISA_MASTERCARD = 'Monobank Visa/Mastercard',
}

interface IOrderGeneralInfo {
  newsletter: boolean;
  callBack: boolean;
  comment: IComment
}

export interface IComment {
  enabled: boolean;
  text: string;
}

// HACK: Default customer is harcoded data due to limitations on demo website
export const CUSTOMER: ICustomer = {
  email: process.env.SOLOMONO_AUTH_EMAIL,
  firstName: 'Volod',
  lastName: 'Testd',
  fullName: 'Volod Testd',
  dateOfBirth: {
    date: new Date('2020-02-02T00:00:00.000Z'),
    dateFormatted: '02/02/2020',
    formattedDateOfBirth: '02/02/2020',
    day: '2',
    month: '02',
    monthName: 'February',
    year: '2020',
    time: '00:00',
    timeZone: TimeZone.MST,
    fullDateTime: '02/02/2020 00:00 MST',
  },
  phoneNumber: {
    code: '+380',
    number: '000000000',
    numberWithCodeFormatted: '+380000000000',
  },
  address: Utils.createAddressFull({
    streetAddress: 'Fake address',
    city: 'Silent Hill',
    state: 'Закарпатська область',
    zipCode: '',
    country: Country.UKRAINE,
  }),
  differentBillingAddress: {
    isDifferentBillingAddress: false,
  },
};

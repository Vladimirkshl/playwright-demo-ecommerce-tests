import { DEMO_LAPTOP, IPrice, IProduct } from '@constants/solomono/product';
import { IAccount } from '@constants/solomono/my-account/account';
import { IAddress } from '@constants/geo/address';
import { Country, Currency, TimeZone } from '@constants/geo/geo';
import { Utils } from '@utils/utils';

export interface IOrder extends IPaymentMetod, IOrderGeneralInfo {}

export interface IOrder {
  customer: ICustomer
  product: IProduct;
  shipping: IShippingMethod;
  total: IPrice;
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

export const SHIPPING_METHOD_CART = {
  [ShippingMethod.UKRPOSHTA]: `${ShippingMethod.UKRPOSHTA}: `,
  [ShippingMethod.CUSTOM_SHIPPER]: `${ShippingMethod.CUSTOM_SHIPPER}: `,
  [ShippingMethod.ELECTRONIC_PRODUCT]: `${ShippingMethod.ELECTRONIC_PRODUCT}: `,
  [ShippingMethod.BEST_WAY]: `${ShippingMethod.BEST_WAY}: `,
  [ShippingMethod.NOVA_POST]: `${ShippingMethod.NOVA_POST}: `,
  [ShippingMethod.FOR_ODESSA_CITIZENS]: `${ShippingMethod.FOR_ODESSA_CITIZENS}: `,
  [ShippingMethod.SELF_DELIVERY]: `${ShippingMethod.SELF_DELIVERY}: `,
};

// @ts-ignore
export const SHIPPING_METHOD_PRICE = {
  [ShippingMethod.UKRPOSHTA]: '0.00',
  [ShippingMethod.CUSTOM_SHIPPER]: '0.00',
  [ShippingMethod.ELECTRONIC_PRODUCT]: '5.00',
  [ShippingMethod.BEST_WAY]: '13.00',
  [ShippingMethod.NOVA_POST]: '5.00',
  [ShippingMethod.FOR_ODESSA_CITIZENS]: '5.00',
  [ShippingMethod.SELF_DELIVERY]: '5.00',
};

export const SHIPPING_METHOD_PRICE_CHECKOUT_VALUE = {
  [ShippingMethod.UKRPOSHTA]: 'По тарифам перевізника',
  [ShippingMethod.CUSTOM_SHIPPER]: 'According to carrier tariffs',
  [ShippingMethod.ELECTRONIC_PRODUCT]: `${Currency.DOLLAR}5.00`,
  [ShippingMethod.BEST_WAY]: `${Currency.DOLLAR}13.00`,
  [ShippingMethod.NOVA_POST]: '',
  [ShippingMethod.FOR_ODESSA_CITIZENS]: `${Currency.DOLLAR}5.00`,
  [ShippingMethod.SELF_DELIVERY]: `${Currency.DOLLAR}5.00`,
};

export const SHIPPING_METHOD_TOTAL_PRICE_CHECKOUT_VALUE = {
  [ShippingMethod.UKRPOSHTA]: `${Currency.DOLLAR}0.00 `,
  [ShippingMethod.CUSTOM_SHIPPER]: `${Currency.DOLLAR}0.00 `,
  [ShippingMethod.ELECTRONIC_PRODUCT]: `${Currency.DOLLAR}5.00 `,
  [ShippingMethod.BEST_WAY]: `${Currency.DOLLAR}13.00 `,
  [ShippingMethod.NOVA_POST]: `${Currency.DOLLAR}5.00 `,
  [ShippingMethod.FOR_ODESSA_CITIZENS]: `${Currency.DOLLAR}5.00 `,
  [ShippingMethod.SELF_DELIVERY]: `${Currency.DOLLAR}5.00 `,
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

export const PAYMENT_METHOD_TOOLTIP_VALUE = {
  [PaymentMethod.CASH_ON_DELIVERY]: 'Possibility to pay cash on delivery (cash upon receipt).',
  [PaymentMethod.BANK_TRANSFER]: 'A form of payment in which cash is not used, funds are transferred from one bank account to another.',
  [PaymentMethod.VISA_MASTERCARD_LIQPAY]: 'A payment service that allows you to accept payments and transfer money using a mobile phone, the Internet and payment cards.',
  [PaymentMethod.PAYPAL]: '',
  [PaymentMethod.BANK_CARD_PAYMENT]: 'Payment is made through the acquiring bank, (enter the card number).',
  [PaymentMethod.MONOBANK_VISA_MASTERCARD]: 'Accepting payments from Visa and Mastercard, through Apple Pay, Google Pay wallets and the Monobank application.',
};

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

// HACK: Default order is harcoded data due to limitations on demo website
export const ORDER: IOrder = {
  method: PaymentMethod.BANK_CARD_PAYMENT,
  newsletter: true,
  callBack: false,
  comment: {
    enabled: true,
    text: 'Vulariter apud natus abduco provident capillus synagoga comminor vulgivagus.',
  },
  product: DEMO_LAPTOP,
  shipping: { method: ShippingMethod.UKRPOSHTA, price: 'According to carrier tariffs' },
  total: { price: '$1173.15 ', currency: Currency.DOLLAR, fullPrice: `${Currency.DOLLAR}1173.15 ` },
  customer: CUSTOMER,
  api: { id: '' },
};

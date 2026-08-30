import { IProduct } from '@constants/solomono/product';
import { IAccount } from '@constants/solomono/my-account/account';
import { IAddress } from '@constants/geo/address';
import { Currency } from '@constants/geo/geo';

export interface IOrder extends IPaymentMetod, IOrderGeneralInfo {}

export interface IOrder {
  customer: ICustomer
  product: IProduct;
  shippingMethod: IShippingMethod;
  api?: {
    id: string;
  }
}

interface ICustomer extends IAccount {
  address: IAddress;
}

export interface IShippingMethod {
  method: ShippingMethod;
  price: string;
  // TODO: add new property to increse the product price
}

export interface IPaymentMetod {
  method: PaymentMethod;
}

enum ShippingMethod {
  UKRPOSHTA = 'Ukrposhta',
  CUSTOM_SHIPPER = 'Custom Shipper',
  ELECTRONIC_PRODUCT = 'Electronic product',
  BEST_WAY = 'Best Way',
  NOVA_POST = 'Nova Post',
  FOR_ODESSA_CITIZENS = 'For Odessa citizens',
  SELF_DELIVERY = 'Self-delivery',
}

// @ts-ignore
const SHIPPING_METHOD_PRICE = {
  [ShippingMethod.UKRPOSHTA]: 'По тарифам перевізника',
  [ShippingMethod.CUSTOM_SHIPPER]: `${Currency.DOLLAR}5.00`,
  [ShippingMethod.BEST_WAY]: `${Currency.DOLLAR}13.00`,
  [ShippingMethod.NOVA_POST]: '',
  [ShippingMethod.FOR_ODESSA_CITIZENS]: `${Currency.DOLLAR}5.00`,
  [ShippingMethod.SELF_DELIVERY]: `${Currency.DOLLAR}5.00`,
};

enum PaymentMethod {
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

interface IComment {
  enabled: boolean;
  text: string;
}

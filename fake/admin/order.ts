import { IComment, IOrder, 
  IShippingMethod, PaymentMethod } from '@constants/solomono/order';
import { IPrice, IProduct } from '@constants/solomono/product';
import { FakeSimple } from '@fake/fake-simple';
import { Utils } from '@utils/utils';
import { getFakeShippingMethod } from '@fake/admin/shipping-method';
import { getFakeCustomer } from '@fake/admin/customer';
import { Currency } from '@constants/geo/geo';

export const getFakeOrder = (product: IProduct): IOrder => {
  const comment: IComment = FakeSimple.boolean() 
    ? { enabled: true, text: FakeSimple.sentence() } : { enabled: false, text: '' };
  const shippingMethod: IShippingMethod = getFakeShippingMethod();
  const price = (Number(product.totalPrice) 
    + Number(shippingMethod.price)).toString();
  const totalPrice: IPrice = { 
    price, 
    currency: Currency.DOLLAR, 
    fullPrice: `${Currency.DOLLAR}${price} `, 
  };

  return {
    method: Utils.getRandomValue(PaymentMethod),
    newsletter: FakeSimple.boolean(),
    callBack: FakeSimple.boolean(),
    comment,
    product,
    shipping: shippingMethod,
    total: totalPrice, 
    customer: getFakeCustomer(),
    api: {
      id: '',
    },
  };
};

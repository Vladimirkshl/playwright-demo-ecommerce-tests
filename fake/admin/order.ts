import { IComment, IOrder, PaymentMethod } from '@constants/solomono/order';
import { IProduct } from '@constants/solomono/product';
import { FakeSimple } from '@fake/fake-simple';
import { Utils } from '@utils/utils';
import { getFakeShippingMethod } from '@fake/admin/shipping-method';
import { getFakeCustomer } from '@fake/admin/customer';

export const getFakeOrder = (product: IProduct): IOrder => {
  const comment: IComment = FakeSimple.boolean() ? { enabled: true, text: FakeSimple.sentence() } : { enabled: false, text: '' };

  return {
    method: Utils.getRandomValue(PaymentMethod),
    newsletter: FakeSimple.boolean(),
    callBack: FakeSimple.boolean(),
    comment,
    product,
    shippingMethod: getFakeShippingMethod(),
    customer: getFakeCustomer(),
    api: {
      id: '',
    },
  };
};

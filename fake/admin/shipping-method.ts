import { IShippingMethod, SHIPPING_METHOD_PRICE, ShippingMethod } from '@constants/solomono/order';
import { Utils } from '@utils/utils';

export const getFakeShippingMethod = (): IShippingMethod => {
  const method = Utils.getRandomValue(ShippingMethod);

  return {
    method,
    price: SHIPPING_METHOD_PRICE[method],
  };
}; 

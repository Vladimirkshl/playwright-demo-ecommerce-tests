import { BRANCH, CITY_BRANCHES, IShippingMethod, SHIPPING_METHOD_PRICE, ShippingMethod } from '@constants/solomono/order';
import { Country } from '@constants/geo/geo';
import { Utils } from '@utils/utils';

export const getFakeShippingMethod = (country: Country): IShippingMethod => {
  const methods = Object.values(ShippingMethod).filter((method) =>
    country === Country.UKRAINE || method !== ShippingMethod.NOVA_POST
  );
  const method = Utils.getRandomMember(methods);
  const city = Utils.getRandomMember(CITY_BRANCHES[method]);
  const branch = Utils.getRandomMember(city ? BRANCH[city] ?? [] : []);

  return {
    method,
    price: SHIPPING_METHOD_PRICE[method],
    city,
    branch,
  };
}; 

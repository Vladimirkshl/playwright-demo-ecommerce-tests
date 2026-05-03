import { Color, IColor, IRam, Ram } from '@constants/solomono/product';
import { FakeSimple } from '@fake/fake-simple';
import { Utils } from '@utils/utils';

export const getFakeColor = (): IColor[] => {
  const discount = FakeSimple.boolean() ? FakeSimple.number(5, 20) : null;

  return [{
    id: FakeSimple.numericString(4, 4),
    name: Utils.getRandomValue(Color),
    price: { price: FakeSimple.price(), discount: discount },
    qty: { qty: FakeSimple.number(1, 21) },
  }];
};

export const getFakeRam = (): IRam[] => {
  const discount = FakeSimple.boolean() ? FakeSimple.number(5, 20) : null;

  return [{ 
    id: FakeSimple.numericString(4, 4),
    name: Utils.getRandomValue(Ram),
    price: { price: FakeSimple.price(), discount: discount },
    qty: { qty: FakeSimple.number(1, 21) }, 
  }];
};

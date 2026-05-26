import { Currency } from '@constants/solomono/geo';
import { CardColor, Color, IColor, IRam, Ram } from '@constants/solomono/product';
import { FakeSimple } from '@fake/fake-simple';
import { Utils } from '@utils/utils';

export const getFakeColor = (): IColor[] => {
  const name = Utils.getRandomValue(Color);
  const price = FakeSimple.price();
  const fullPrice = `${Currency.DOLLAR}${price}`;
  const discount = FakeSimple.boolean() ? FakeSimple.number(5, 20) : null;

  return [{
    id: FakeSimple.numericString(4, 4),
    name: name,
    cardColor: CardColor[name],
    price: { price: price, fullPrice: fullPrice, currency: Currency.DOLLAR, discount: discount },
    qty: { qty: FakeSimple.number(1, 21) },
  }];
};

export const getFakeRam = (): IRam[] => {
  const price = FakeSimple.price();
  const fullPrice = `${Currency.DOLLAR}${price}`;
  const discount = FakeSimple.boolean() ? FakeSimple.number(5, 20) : null;

  return [{ 
    id: FakeSimple.numericString(4, 4),
    name: Utils.getRandomValue(Ram),
    price: { price: price, fullPrice: fullPrice, currency: Currency.DOLLAR, discount: discount },
    qty: { qty: FakeSimple.number(1, 21) }, 
  }];
};

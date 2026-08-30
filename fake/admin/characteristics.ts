import { Currency } from '@constants/geo/geo';
import { Brand, CARD_BRAND, CARD_COLOR, CARD_RAM, CARD_WEIGHT, Color, IBrand, IColor, IRam, IWeight, Ram, Weight } from '@constants/solomono/product';
import { FakeSimple } from '@fake/fake-simple';
import { Utils } from '@utils/utils';

export const getFakeColor = (): IColor[] => {
  const name = Utils.getRandomValue(Color);
  const price = FakeSimple.price();
  const fullPrice = `${Currency.DOLLAR}${price}`;
  const discount = FakeSimple.boolean() ? FakeSimple.number(5, 20) : null;

  return [
    {
      id: FakeSimple.numericString(4, 4),
      name: name,
      cardName: CARD_COLOR[name],
      price: { price: price, fullPrice: fullPrice, currency: Currency.DOLLAR, discount: discount },
      qty: { qty: FakeSimple.number(1, 21) },
    },
  ];
};

export const getFakeRam = (): IRam[] => {
  const name = Utils.getRandomValue(Ram);
  const price = FakeSimple.price();
  const fullPrice = `${Currency.DOLLAR}${price}`;
  const discount = FakeSimple.boolean() ? FakeSimple.number(5, 20) : null;

  return [
    { 
      id: FakeSimple.numericString(4, 4),
      name: name,
      cardName: CARD_RAM[name],
      price: { price: price, fullPrice: fullPrice, currency: Currency.DOLLAR, discount: discount },
      qty: { qty: FakeSimple.number(1, 21) }, 
    },
  ];
};

export const getFakeBrand = (): IBrand[] => {
  const name = Utils.getRandomValue(Brand);

  return [
    { 
      name: name,
      cardName: CARD_BRAND[name],
    },
  ];
};

export const getFakeWeight = (): IWeight[] => {
  const name = Utils.getRandomValue(Weight);

  return [
    { 
      name: name,
      cardName: CARD_WEIGHT[name],
    },
  ];
};

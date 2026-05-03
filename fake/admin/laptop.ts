import { AUTO_TEST_PREFIX } from '@constants/common';
import { getLogo } from '@constants/files/files';
import { Brand, Category, IProduct, Label, ProductStatus, ProductType } from '@constants/solomono/product';
import { FakeSimple } from '@fake/fake-simple';
import { Utils } from '@utils/utils';
import { getFakeReview } from '@fake/admin/review';
import { getFakeColor, getFakeRam } from '@fake/admin/characteristics';

export const getFakeLaptop = (): IProduct => {
  const uuid = FakeSimple.uuidShort();
  const name = `Laptop ${AUTO_TEST_PREFIX} ${uuid}`;
  const review = FakeSimple.boolean() ? getFakeReview() : [];

  return {
    name: name,
    status: ProductStatus.IN_STOCK,
    category: Category.LAPTOPS,
    code: FakeSimple.numericString(4, 4, true),
    price: FakeSimple.price(),
    qty: FakeSimple.number(1, 21),
    discount: FakeSimple.number(5, 20),
    image: getLogo(),
    label: Utils.getRandomValue(Label),
    reviews: review,
    description: FakeSimple.productDescription(),
    shortDescription: FakeSimple.sentence(),
    shippingDescription: FakeSimple.sentence(),
    characteristics: {
      productType: ProductType.LAPTOP,
      color: getFakeColor(),
      ram: getFakeRam(),
      battery: FakeSimple.sentence(),
      brand: Utils.getRandomValue(Brand),
      weight: FakeSimple.sentence(),
      graphicAdapter: FakeSimple.sentence(),
      network: FakeSimple.sentence(),
      processor: FakeSimple.sentence(),
      size: FakeSimple.sentence(),
      volumeDrive: FakeSimple.sentence(),
      warranty: FakeSimple.sentence(),
      os: FakeSimple.sentence(),
    },
    api: {
      id: '',
    },
  };
};

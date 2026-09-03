import { getFakeLaptop } from '@fake/admin/laptop';
import { getFakeReview } from '@fake/admin/review';
import { getFakeOrder } from '@fake/admin/order';
import { IProduct } from '@constants/solomono/product';

export class Fake {
  static laptop = () => getFakeLaptop();

  static review = () => getFakeReview();

  static order = (product: IProduct) => getFakeOrder(product);
}

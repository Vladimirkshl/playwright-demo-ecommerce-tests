import { getFakeLaptop } from '@fake/admin/laptop';
import { getFakeReview } from '@fake/admin/review';

export class Fake {
  static laptop = () => getFakeLaptop();

  static review = () => getFakeReview();
}

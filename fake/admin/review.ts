import { getLogo } from '@constants/files/files';
import { IReview } from '@constants/solomono/product';
import { FakeSimple } from '@fake/fake-simple';

export const getFakeReview = (): IReview[] => {
  const file = FakeSimple.boolean() ? getLogo() : null;

  return [{
    name: FakeSimple.fullName(),
    comment: FakeSimple.sentence(),
    rating: FakeSimple.number(1, 5),
    file: file,
    api: {
      id: '',
    },
  }];
};

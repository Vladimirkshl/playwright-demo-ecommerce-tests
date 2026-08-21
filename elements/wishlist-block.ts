import { SingleElement } from '@elements/base/single-element';
import { Page } from '@playwright/test';

export class WishlistBlock extends SingleElement {
  constructor(page: Page) {
    super(page, 'Wishlist block', '//div[contains(text(), "Wishlist")]/ancestor::div[@class="wishlist_box2"]');
  }

  hyperLink() {
    return this.innerElementWithoutParentIndex('Hyper link', '//a[contains(., "Wishlist:")]');
  }
}

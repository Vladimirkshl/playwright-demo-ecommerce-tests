import { IProduct } from '@constants/solomono/product';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';

export class WishlistDetails extends PageBase {

  /* ELEMENTS */

  private card = (name: string) => this.hyperLink(name).ancestor('tr');
  private image = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.image.name, '//img');
  // TODO: remove comment after fixing price issue on wishlist details
  /* 
  private price = (product: IProduct) => 
    this.card(product.name).innerElementWithoutParentIndex(product.fullPrice, `//td[contains(., "${product.fullPrice}")]`); 
  **/
  private delete = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.name, '//a[starts-with(., "Delete")]');
  private buyButton = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex('Buy', '//button');

  /* ASSERT */

  async assert(product: IProduct) {
    await Report.subStep(`Assert [${product.name}] card`, async () => {
      await this.h1(2).assertText('My Wish List contains:');
      await this.image(product).assertIsVisible();
      await this.hyperLink(product.name).assertIsVisible();
      // TODO: remove comment after fixing price issue on wishlist details
      /* await this.price(product).assertIsVisible(); */
      await this.delete(product).assertIsVisible();
      await this.buyButton(product).assertIsVisible();
    });
  }

  /* ACTIONS */

  async removeProduct(product: IProduct) {
    await Report.subStep(`Remove [${product.name}] from shopping cart`, async () => {
      await this.delete(product).click();
      await this.div('No products are in your Wishlist.').assertIsVisible();
      await this.wishlistBlock().assertIsHidden();
      
      product.isInWishlist = false;
    });
  }
}

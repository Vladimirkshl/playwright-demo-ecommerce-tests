import { IProduct } from '@constants/solomono/product';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';
import { ShoppingCart } from '@pages/solomono/shopping-cart';
import { WishlistDetails } from '@pages/solomono/wishlist';

export class ProductDetails extends PageBase {

  /* ELEMENTS */

  // TODO: remove comment afeter fixing assertReview
  /*
  private review = (review: IReview) => this.div(review.comment).ancestor('div[contains(@class, "all_comments")]');
  private author = (review: IReview) => this.review(review).innerElementWithoutParentIndex(review.name, `//span[.="${review.name}"]`);
  private date = (review: IReview) => 
    this.review(review).innerElementWithoutParentIndex(review.date.dateFormatted, `//span[.="${review.date.dateFormatted}"]`);
  private comment = (review: IReview) => this.review(review).innerElementWithoutParentIndex(review.comment, `//div[.="${review.comment}"]`);
  **/

  /* ASSERT */

  async assert(product: IProduct) {
    await Report.subStep('Assert product details', async () => {
      await this.span(product.category).assertIsVisible();
      await this.h1().assertText(product.name);
      // TODO: add assert image after implementing controlled product object
      await this.span(product.code).assertIsVisible();
      await this.span(product.status).assertIsVisible();
      // TODO: remove commented assert after fixing full price on UI
      /* await this.span(product.fullPrice).assertIsVisible(); */
      await this.assertColor(product);
      await this.assertRam(product);
      await this.assertWeight(product);
      await this.assertBrand(product);
      await this.field('Graphic adapter').assertText(product.characteristics.graphicAdapter);
      // HACK: commented assert short description and skipped description due to large uncontrolled string
      /* await this.field('Short description').assertText(product.shortDescription); */
      // TODO: add assert Description after fixing uncontrolled strings of object
      await this.assertCharacteristics(product);
      // HACK: commented assertReview because of spaces in locator, need to investigate
      /* 
      await this.assertReview(product);
      await this.assertReviewForm(product); 
      **/
      // TODO: add assert Shipping details after fixing uncontrolled strings of object
    });
  }

  private async assertColor(product: IProduct) {
    for (let color of product.characteristics.color) {
      await this.field('Color:').assertText(color.name);
    };
  }

  private async assertRam(product: IProduct) {
    for (let ram of product.characteristics.ram) {
      await this.field('RAM:').assertText(ram.name);
    };
  }

  private async assertWeight(product: IProduct) {
    for (let weight of product.characteristics.weight) {
      await this.field('Weight:').assertText(weight.name);
    };
  }

  private async assertBrand(product: IProduct) {
    for (let brand of product.characteristics.brand) {
      await this.field('Brand:').assertText(brand.name);
    };
  }

  private async assertCharacteristics(product: IProduct) {
    await Report.subStep(`Assert ${product.name} characteristics description`, async () => {
      await this.button('Characteristics').click();
      // TODO: add assert to characteristics in description
      /*
      await this.assertColor(product);
      await this.assertRam(product);
      await this.assertWeight(product);
      await this.assertBrand(product);
      **/
      await this.field('Graphic adapter').assertText(product.characteristics.graphicAdapter);
      await this.field('Network').assertText(product.characteristics.network);
      await this.field('Processor').assertText(product.characteristics.processor);
      await this.field('Volume drive').assertText(product.characteristics.volumeDrive);
      await this.field('Warranty', 2).assertText(product.characteristics.warranty);
      await this.field('ОS').assertText(product.characteristics.os);
    });
  }

  // TODO: fix common button xpath locator
  /*
  private async assertReviewForm(product: IProduct) {
    await Report.subStep('Assert default review', async () => {
      await this.button('Reviews').click();
      await this.div(product.name).assertIsVisible();
      await this.input('Your name:', By.PLACEHOLDER).assertToHaveValue('');
      await this.input('Comment:', By.PLACEHOLDER).assertToHaveValue('');
      await this.inputImage('Choose Files').assertAcceptedExtensions(FileExtension.IMAGE);
      await this.button('Send').assertIsVisible();
    });
  }
  **/

  // TODO: fix common button xpath locator
  /*
  private async assertReview(product: IProduct) {
    await Report.subStep('Assert review', async () => {
      const reviewSection = this.bySelector('Review', '//div[contains(@class, "all_comments")]');

      await this.button('Reviews').click();
      if (!product.reviews) await reviewSection.assertIsHidden();
      else {
        for (const review of product.reviews) {
          await this.author(review).assertIsVisible();
          await this.date(review).assertIsVisible();
          await this.comment(review).assertIsVisible();
        };
      };
    });
  }
  **/

  /* ACTIONS */

  async addProduct(product: IProduct): Promise<ShoppingCart> {
    await Report.subStep(`Add ${product.name} to cart`, async () => {
      await this.button('Buy', 1).click();
      await this.toastify().assertTextIsHidden('Product was successfully added to your cart!');
    });

    return new ShoppingCart(this.page);
  }

  async addProductToWishlist(product: IProduct) {
    await Report.subStep(`Add ${product.name} to wishlist`, async () => {
      await this.label('To Wishlist').click();
      await this.wishlistBlock().assertIsVisible();

      product.isInWishlist = true;
    });
  }

  async getWishlistDetails(): Promise<WishlistDetails> {
    await Report.subStep('Get wishlist details page', async () => {
      await this.wishlistBlock().hyperLink().click();
    });
  
    return new WishlistDetails(this.page);
  } 
}

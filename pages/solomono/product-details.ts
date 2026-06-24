import { IProduct } from '@constants/solomono/product';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';
import { ShoppingCart } from '@pages/solomono/shopping-cart';
import { By } from '@constants/common';
import { FileExtension } from '@constants/files/files';

export class ProductDetails extends PageBase {

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
      // HACK: commented assert short descriptio and skipped description due to large uncontrolled string
      /* await this.field('Short description').assertText(product.shortDescription); */
      // TODO: add assert Description after fixing uncontrolled strings of object
      await this.assertCharacteristics(product);
      // HACK: commented assertReview because of spaces in locator, need to investigate
      /* await this.assertReviewForm(product); */
      // TODO: add assert review is not visible
      // TODO: add assert exsited review
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
      */
      await this.field('Graphic adapter').assertText(product.characteristics.graphicAdapter);
      await this.field('Network').assertText(product.characteristics.network);
      await this.field('Processor').assertText(product.characteristics.processor);
      await this.field('Volume drive').assertText(product.characteristics.volumeDrive);
      await this.field('Warranty', 2).assertText(product.characteristics.warranty);
      await this.field('ОS').assertText(product.characteristics.os);
    });
  }

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

  /* ACTIONS */

  async addProduct(product: IProduct) {
    await Report.subStep(`Add ${product.name} to cart`, async () => {
      await this.button('Buy', 1).click();
      await this.toastify().assertTextIsHidden('Product was successfully added to your cart!');
    });

    return new ShoppingCart(this.page);
  }
}

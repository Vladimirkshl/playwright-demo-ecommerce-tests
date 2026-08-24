import { IProduct } from '@constants/solomono/product';
import { PageBase } from '@pages/base/page-base';
import { Report } from '@utils/report';
import { ShoppingCart } from '@pages/solomono/shopping-cart';
import { ProductDetails } from '@pages/solomono/product-details';
import { WishlistDetails } from '@pages/solomono/wishlist';

export class ProductCard extends PageBase {
  
  /* ELEMENTS */
  
  private card = (name: string) => this.hyperLink(name).ancestor('div[@class="product "]');
  private labelBadge = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.label, `//div[starts-with(., "${product.label}")]`);
  private wishlistButton = (product: IProduct) => this.card(product.name).innerElement(product.name, '//label', 2);
  private image = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.image.name, '//img');
  private name = (name: string) => this.hyperLink(name);
  private price = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex(product.fullPrice, `//span[contains(., "${product.fullPrice}")]`);
  private buyButton = (product: IProduct) => this.card(product.name).innerElementWithoutParentIndex('Buy', '//button');
  private characteristic = (product: IProduct, name: string) => this.card(product.name).innerElementWithoutParentIndex(name, `//span[starts-with(., "${name}")]/parent::td`);

  /* ASSERT */

  async assert(product: IProduct) {
    await Report.subStep(`Assert ${product.name} card`, async () => {
      await this.labelBadge(product).assertIsVisible();
      await this.image(product).assertIsVisible();
      await this.name(product.name).assertIsVisible();
      await this.price(product).assertIsVisible();
      await this.buyButton(product).assertText('Buy');
    });
  }

  async assertHovered(product: IProduct) {
    await Report.subStep(`Assert hovered ${product.name} card`, async () => {
      await this.card(product.name).hover();
      await this.assert(product);
      await this.assertColor(product);
      await this.assertRam(product);
      await this.assertWeigth(product);
      await this.assertBrand(product);  
    });
  }

  private async assertColor(product: IProduct) {
    await Report.subStep('Assert characteristic', async () => {
      for (const characteristic of product.characteristics.color) 
        await this.characteristic(product, 'Color').assertText(characteristic.cardName);
    });
  }

  private async assertRam(product: IProduct) {
    await Report.subStep('Assert characteristic', async () => {
      for (const characteristic of product.characteristics.ram) 
        await this.characteristic(product, 'RAM').assertText(characteristic.cardName);
    });
  }

  private async assertWeigth(product: IProduct) {
    await Report.subStep('Assert characteristic', async () => {
      for (const characteristic of product.characteristics.weight) 
        await this.characteristic(product, 'Weight').assertText(characteristic.cardName);
    });
  }

  private async assertBrand(product: IProduct) {
    await Report.subStep('Assert characteristic', async () => {
      for (const characteristic of product.characteristics.brand) 
        await this.characteristic(product, 'Brand').assertText(characteristic.cardName);
    });
  }

  /* ACTIONS */
  
  async addProduct(product: IProduct) {
    await Report.subStep(`Add ${product.name} to cart`, async () => {
      await this.buyButton(product).click();
      await this.toastify().assertTextIsHidden('Product was successfully added to your cart!');
    });

    return new ShoppingCart(this.page);
  }

  async addProductToWishlist(product: IProduct) {
    await Report.subStep(`Add ${product.name} to wishlist`, async () => {
      await this.wishlistButton(product).click();
      await this.wishlistBlock().assertIsVisible();
      // TODO: add productsInWishlist: IProduct[] property to user's interface
      // TODO: add productsInWishlist.push(product)
      // TODO: add assert productsInWishlist.length on wishlistBlock
      
      product.isInWishlist = true;
    });
  }

  async getWishlistDetails(): Promise<WishlistDetails> {
    await Report.subStep('Get wishlist details page', async () => {
      await this.wishlistBlock().hyperLink().click();
    });

    return new WishlistDetails(this.page);
  } 

  async getProductDetails(product: IProduct): Promise<ProductDetails> {
    await Report.subStep(`Get [${product}] product details page`, async () => {
      await this.name(product.name).click();
    });
    
    return new ProductDetails(this.page);
  }
  
}

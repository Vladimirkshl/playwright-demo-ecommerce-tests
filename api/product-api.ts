import { ApiBase } from '@api/base';
import { PRODUCT_SERVICE_API } from '@constants/api/product-service';
import { IProduct } from '@constants/solomono/product';
import { Report } from '@utils/report';

export class ProductApi extends ApiBase {
  apiName = 'ProductApi';

  async create(product: IProduct): Promise<IProduct> {
    return await Report.subStep(`API: Create Laptop: ${product.name}`, async () => {
      const response = await this.POST({
        resource: PRODUCT_SERVICE_API.products,
        data: {
          name: product.name,
          image: product.image,
          code: product.code,
          category: product.category,
          price: product.price,
          qty: product.qty,
          shippingDescription: product.shippingDescription,
          status: product.status,
          label: product.label,
          description: {
            fullDescription: product.description,
            shortDescription: product.shortDescription,
          },
          characteristics: product.characteristics,
        },
      });

      // TODO: Send the POST review request
      // TODO: Merge the review response/data to the product object

      product.api.id = response.api.id;

      return product;
    });
  }
}

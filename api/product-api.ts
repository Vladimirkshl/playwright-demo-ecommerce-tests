import playwright from 'playwright';

import { ApiBase } from '@api/base';
import { PRODUCT_SERVICE_API } from '@constants/api/product-service';
import { IFile } from '@constants/files/files';
import { IProduct, IReview, IReviewFile } from '@constants/solomono/product';
import { FileSystemUtils } from '@utils/file-system-utils';
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

      product.api.id = response.api.id;

      await this.leaveReviews(product);
      await this.attachFiles(product);

      return product;
    });
  }

  private async leaveReviews(product: IProduct) {
    for (const review of product.reviews) {
      await this.leaveReview(product.api.id, review);
    }
  }

  private async leaveReview(productId: string, review: IReview) {
    const response = await this.POST({
      resource: PRODUCT_SERVICE_API.reviews(productId),
      data: {
        name: review.name,
        comment: review.comment,
        rating: review.rating,
        date: review.date.fullDateTime,
      },
    });
    
    review.api.id = response.id;
  }

  private async attachFiles(product: IProduct) {
    for (const review of product.reviews) {
      await Report.subStep(`API: Attach file: ${review.file}`, async () => {
        const signedUrl = await this.getSignedUrl(review.file);
        await this.sendFileToS3(review.file, signedUrl.signedUrl);
        review.reviewAttachment = await this.attachFile(review.api.id, review.file, signedUrl);
      });

      Report.attachJson('Review attached file', review.file);
    }
  }

  private async getSignedUrl(file: IFile): Promise<ISignedUrl> {
    return (
      await this.POST({
        resource: PRODUCT_SERVICE_API.files.signedUrl,
        data: {
          fileName: file.fileName,
          fileExtension: `.${file.fileName.split('.').pop()}`,
          fileContentLength: file.contentLength,
        },
        name: `${this.apiName} / Get signed URL for file`,
      })
    ).data as ISignedUrl;
  } 

  private async sendFileToS3(fileData: IFile, url: string) {
    const fileContent = FileSystemUtils.readFile(fileData.path, null);
    const s3RequestContext = await playwright.request.newContext();
    try {
      await s3RequestContext.put(url, {
        data: fileContent,
        headers: {
          'Content-Type': fileData.contentType,
          'Content-Length': fileData.contentLength.toString(), 
        },
      });
    } finally {
      await s3RequestContext.dispose();
    }
  }

  private async attachFile(
    reviewId: string,
    file: IFile,
    signedUrl: ISignedUrl 
  ): Promise<IReviewFile> {
    await this.POST({
      resource: PRODUCT_SERVICE_API.files.attachFile(reviewId),
      data: {
        file: {
          fileName: file.fileName,
          id: signedUrl.fileId,
          path: signedUrl.filePath,
        },
      },
      name: `${this.apiName} / Attach file ${file.fileName} to review`,
    });
    
    return {
      fileId: signedUrl.fileId,
      fileName: file.fileName,
      path: signedUrl.filePath,
    };
  }
}

interface ISignedUrl {
  signedUrl: string;
  fileId: string;
  filePath: string;
}

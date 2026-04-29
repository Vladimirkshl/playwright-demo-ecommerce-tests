const PRODUCT_SERVICE_ENDPOINT = 'productservice';
const PRODUCTS = `${PRODUCT_SERVICE_ENDPOINT}/products`;
const REVIEW_SERVICES = `${PRODUCT_SERVICE_ENDPOINT}/review`;
const REVIEW_ID = (id: string) => `${PRODUCTS}/${id}`;

export const PRODUCT_SERVICE_API = {
  products: `${PRODUCT_SERVICE_ENDPOINT}/product`,

  reviews: (productId: string) => `${PRODUCT_SERVICE_API.products}/${productId}/reviews`,

  files: { 
    attachFile: (id: string) => `${REVIEW_ID(id)}/attach-file`,
    signedUrl: `${REVIEW_SERVICES}/files/signed-url`, 
  },
};

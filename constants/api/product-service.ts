const PRODUCT_SERVICE_ENDPOINT = '/productservice';
const PRODUCTS = `${PRODUCT_SERVICE_ENDPOINT}/products`;
const REVIEW_SERVICES = `${PRODUCT_SERVICE_ENDPOINT}/review`;
const REVIEW_ID = (id: string) => `${PRODUCTS}/${id}`;
const CART = (id: string) => `${PRODUCTS}/${id}/add-product`;
const WISHLIST = `${PRODUCTS}/wishlist/`;
const WISHLIST_ID = (id: string) => `${WISHLIST}/${id}`;

export const PRODUCT_SERVICE_API = {
  products: `${PRODUCT_SERVICE_ENDPOINT}/product`,

  reviews: (productId: string) => `${PRODUCT_SERVICE_API.products}/${productId}/reviews`,

  files: {
    attachFile: (id: string) => `${REVIEW_ID(id)}/attach-file`,
    signedUrl: `${REVIEW_SERVICES}/files/signed-url`,
  },

  cart: {
    add: (id: string) => CART(id),
    remove: `${PRODUCTS}/remove-from-cart`,
  },

  wishlist: {
    add: WISHLIST,
    remove: (id: string) => WISHLIST_ID(id),
  },
};

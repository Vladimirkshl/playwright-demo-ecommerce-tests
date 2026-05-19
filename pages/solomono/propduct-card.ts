import { PageBase } from '@pages/base/page-base';

export class ProductCard extends PageBase {
  
  /* ELEMENTS */
  
  protected productCard = (name: string) => this.hyperLink(name).ancestor(12);

}

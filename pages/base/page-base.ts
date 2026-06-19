import { Page } from '@playwright/test';
import { PageUtils } from '@pages/base/page-utils';
import { H1, Header } from '@elements/simple/header';
import { By, Placeholder } from '@constants/common';
import { Input } from '@elements/input/input';
import { Button } from '@elements/simple/button';
import { Hyperlink } from '@elements/simple/hyper-link';
import { Div } from '@elements/simple/div';
import { Span } from '@elements/simple/span';
import { Toastify } from '@elements/simple/toastify';
import { Dialog } from '@elements/simple/dialog';
import { Field } from '@elements/simple/field';

export class PageBase {

  constructor(protected page: Page) {}

  /* ACTIONS */

  utils = () => new PageUtils(this.page);
  goTo = (uri: string) => this.utils().goTo(uri);
  assertTitle = (titleOrRegExp: string | RegExp) => this.utils().assertTitle(titleOrRegExp);

  /* ELEMENTS */

  toastify = () => new Toastify(this.page);

  header = (text: string) => new Header(this.page, text);
  h1 = (index?: number) => new H1(this.page, index);

  dialog = () => new Dialog(this.page);

  field = (name: string) => new Field(this.page, name);

  div = (name: string) => new Div(this.page, name);
  hyperLink = (name: string, index?: number) => new Hyperlink(this.page, name, index);
  button = (name: string, index?: number) => new Button(this.page, name, index);
  span = (name: string, index?: number) => new Span(this.page, name, index);

  searchInput = () => new Input(this.page, Placeholder.QUICK_FIND, By.PLACEHOLDER);
}

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
import { InputImage } from '@elements/input/input-file/input-image';
import { SingleElement } from '@elements/base/single-element';
import { Strong } from '@elements/simple/strong';
import { AlertDiv } from '@elements/alert-div';
import { Calendar } from '@elements/calendar';
import { Select } from '@elements/dropdown/select/select';
import { WishlistBlock } from '@elements/wishlist-block';
import { Label } from '@elements/simple/label';

export class PageBase {

  constructor(protected page: Page) {}

  /* ACTIONS */

  utils = () => new PageUtils(this.page);
  reload = () => this.utils().reload();
  goTo = (uri: string) => this.utils().goTo(uri);
  assertTitle = (titleOrRegExp: string | RegExp) => this.utils().assertTitle(titleOrRegExp);

  /* ELEMENTS */

  bySelector = (name: string, xpath: string, index?: number) => new SingleElement(this.page, name, xpath, index);

  toastify = () => new Toastify(this.page);

  header = (text: string) => new Header(this.page, text);
  h1 = (index?: number) => new H1(this.page, index);

  dialog = () => new Dialog(this.page);

  input = (name: string, by?: By, index?: number) => new Input(this.page, name, by, index);
  inputImage = (name: string, index?: number) => new InputImage(this.page, name, index);

  field = (name: string, index?: number) => new Field(this.page, name, index);
  label = (name: string, index?: number) => new Label(this.page, name, index);

  div = (name: string) => new Div(this.page, name);
  hyperLink = (name: string, index?: number) => new Hyperlink(this.page, name, index);
  button = (name: string, index?: number) => new Button(this.page, name, index);
  span = (name: string, index?: number) => new Span(this.page, name, index);
  strong = (text: string, index?: number) => new Strong(this.page, text, index);

  alertDiv = (name: string, index?: number) => new AlertDiv(this.page, name, index);
  wishlistBlock = () => new WishlistBlock(this.page);

  calendar = (label: string, index?: number) => new Calendar(this.page, label, index);
  searchInput = () => new Input(this.page, Placeholder.QUICK_FIND, By.PLACEHOLDER);
  selectWithClass = (name: string, index = 1) => new Select(this.page, name, index);
}

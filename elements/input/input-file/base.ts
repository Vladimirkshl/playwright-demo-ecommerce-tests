import { FileExtension } from '@constants/files/files';
import { SingleElement } from '@elements/base/single-element';

export abstract class InputFileBase extends SingleElement {
  fileExtensions: FileExtension;
  
  private input = this.innerElement('input', '//input[@type="file"]');

}

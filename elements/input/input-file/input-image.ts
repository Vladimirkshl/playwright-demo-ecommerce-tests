import { FileExtension } from '@constants/files/files';
import { InputFileBase } from '@elements/input/input-file/base';
import { Page } from '@playwright/test';

export class InputImage extends InputFileBase {
  fileExtensions = FileExtension.IMAGE;

  constructor(page: Page, name: string, index?: number) {
    super(page, `${name} image`, '//input[@type="file"]', index);
  }
  
}

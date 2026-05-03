import * as path from 'path';

import { ContentType } from '@constants/common';
import { Utils } from '@utils/utils';

const FILES_DIR = './constants/files';

enum ImageExtension {
  PNG = 'png',
  JPEG = 'jpeg',
  HEIC = 'heic',
}

export interface IFile {
  name: string;
  fileName: FileName;
  path: string;
  contentType: ContentType;
  mimeType?: MimeType;
  contentLength?: number;
}

export enum MimeType {
  HEIC = 'image/heic',
}

enum FileName {
  IMAGE_PNG = 'image.png',
  IMAGE_JPEG = 'image.jpeg',
  IMAGE_HEIC = 'image.heic',
}

const LOGO_BY_IMAGE_EXTENSION = {
  [ImageExtension.PNG]: FileName.IMAGE_PNG,
  [ImageExtension.JPEG]: FileName.IMAGE_JPEG,
  [ImageExtension.HEIC]: FileName.IMAGE_HEIC,
};

const CONTENT_TYPE_BY_IMAGE_EXTENSION = {
  [ImageExtension.PNG]: ContentType.IMAGE_PNG,
  [ImageExtension.JPEG]: ContentType.IMAGE_JPEG,
  [ImageExtension.HEIC]: ContentType.IMAGE_HEIC,
};

export function getLogo(): IFile {
  const ext = Utils.getRandomValue(ImageExtension);
  const fileName = LOGO_BY_IMAGE_EXTENSION[ext];
  const contentType = CONTENT_TYPE_BY_IMAGE_EXTENSION[ext];
  
  const logo: IFile = {
    name: 'Logo',
    fileName: fileName,
    path: path.join(FILES_DIR, fileName),
    contentType: contentType,
  };
  if (ext === ImageExtension.HEIC) logo.mimeType = MimeType.HEIC;

  return logo;
}

export const IMAGE_HEIC = {
  name: 'Image heic',
  fileName: FileName.IMAGE_HEIC,
  path: path.join(FILES_DIR, FileName.IMAGE_HEIC),
  contentType: ContentType.IMAGE_HEIC,
  contentLength: 486005,
};

export const IMAGE_JPEG = {
  name: 'Image jpeg',
  fileName: FileName.IMAGE_JPEG,
  path: path.join(FILES_DIR, FileName.IMAGE_JPEG),
  contentType: ContentType.IMAGE_JPEG,
  contentLength: 150139,
};

export const IMAGE_PNG = {
  name: 'Image png',
  fileName: FileName.IMAGE_PNG,
  path: path.join(FILES_DIR, FileName.IMAGE_PNG),
  contentType: ContentType.IMAGE_PNG,
  contentLength: 82373,
};

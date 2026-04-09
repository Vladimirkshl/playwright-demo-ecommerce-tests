import { ContentType } from '@constants/common';

export interface IFile {
  name: string;
  fileName: FileName;
  path: string;
  contentType: ContentType;
  mimeType?: MimeType;
  contentLength?: number;
}

enum FileName {
  IMAGE_PNG = 'image.png',
  IMAGE_JPEG = 'image.jpeg',
  IMAGE_JPG = 'image.jpg',
  IMAGE_HEIC = 'image.heic',
  IMAGE_PREVIEW_JPEG = 'image-preview.jpeg',
  IMAGE_PREVIEW_HEIC = 'image-preview.heic',
}

export enum MimeType {
  HEIC = 'image/heic',
}

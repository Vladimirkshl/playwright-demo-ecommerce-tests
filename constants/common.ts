export enum ContentType {
  APPLICATION_JSON = 'application/json',
  APPLICATION_PROBLEM_JSON = 'application/problem+json',

  TEXT_HTML = 'text/html',
  TEXT_PLAIN = 'text/plain',
  TEXT_URI_LIST = 'text/uri-list',

  IMAGE_JPEG = 'image/jpeg',
  IMAGE_PNG = 'image/png',
  IMAGE_WILDCARD = 'image/*',
  IMAGE_HEIC = 'image/heic',
  IMAGE_SVG_XML = 'image/svg+xml',
}

export enum DateFormat {
  yyyyMMdd_HHmmss = 'yyyyMMdd_HHmmss',
}

export interface IDateTime extends IDateFormatted {
  date: Date;
  day: string;
  month: string;
  year: string;
  time: string;
  fullDateTime: string;
}

export interface IDateFormatted {
  dateFormatted: string;
}

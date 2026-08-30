import { TimeZone } from '@constants/geo/geo';

export enum By {
  LABEL,
  ARIA_LABEL,
  PLACEHOLDER,
}

export enum ElementAttribute {
  ACCEPT = 'accept',
  ALT = 'alt',
  ARIA_EXPANDED = 'aria-expanded',
  ARIA_INVALID = 'aria-invalid',
  ARIA_SELECTED = 'aria-selected',
  ARIA_SORT = 'aria-sort',
  CLASS = 'class',
  DATA_ACTIVE = 'data-active',
  DATA_DISABLED = 'data-disabled',
  DATA_ICON = 'data-icon',
  DATA_OPEN = 'data-open',
  DATA_SORTABLE = 'data-sortable',
  DATA_SELECTED = 'data-selected',
  HREF = 'href',
  PLACEHOLDER = 'placeholder',
  SRC = 'src',
  SCROLL_LEFT = 'scrollLeft',
  SCROLL_TOP = 'scrollTop',
}

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
  MMMM_yyyy = 'MMMM yyyy',
  dd_MM_yyyy = 'dd/MM/yyyy',
  yyyyMMdd_HHmmss = 'yyyyMMdd_HHmmss',
  HH_mm = 'HH:mm',
}

export interface IDateTime extends IDateFormatted, IDateTimezone {
  date: Date;
  day: string;
  month: string;
  monthName: string;
  year: string;
  time: string;
  fullDateTime: string;
}

export interface IDateFormatted {
  dateFormatted?: string;
  formattedDateOfBirth?: string;
}

interface IDateTimezone {
  timeZone?: TimeZone;
}

export const AUTO_TEST_PREFIX = `${process.env.BUILD_ID} AT`;

export enum Placeholder {
  QUICK_FIND = 'Quick find',
}

export const FAKE_EMAIL_PROVIDER = `${process.env.PORTAL}.qatest`;

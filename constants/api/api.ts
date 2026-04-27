import { Serializable } from 'node:child_process';

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete',
}

export enum RequestContextType {
  ADMIN = 'ADMIN',
  SOLOMONO_USER = 'SOLOMONO_USER',
}

export interface RequestData {
  resource?: string;
  headers?: Record<string, string>;
  params?: TApiParams;
  data?: string | Buffer | Serializable;
  failOnStatusCode?: boolean;
  is4xxRetryable?: boolean;
  apiEndpoint?: string;
  awsAuth?: boolean;
  name?: string;
  contextType?: RequestContextType; 
}

export interface ResponseFormatted {
  url: string;
  status: number;
  headers: Record<string, string>;
  response: ResponseParsed;
  responseFormatted: boolean;
}

export type TApiParams = Record<string, string | number | boolean>;

export type ResponseParsed = Serializable | string | Buffer;

export enum ResponseFormat {
  BODY = 'body',
  JSON = 'json',
  TEXT = 'text',
}

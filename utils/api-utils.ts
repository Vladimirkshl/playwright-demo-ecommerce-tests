import { ProductApi } from '@api/product-api';
import { ResponseFormat, ResponseFormatted } from '@constants/api/api';
import { ContentType } from '@constants/common';
import { APIResponse } from '@playwright/test';

const getResponseParsed = async (response: APIResponse) => {
  const responseFormatted: ResponseFormat = getResponseFormat(response);

  switch (responseFormatted) {
    case ResponseFormat.JSON:
      return await response.json();
    case ResponseFormat.TEXT:
      return await response.text();
    case ResponseFormat.BODY:
      return await response.body();
  }
};

const getResponseFormat = (response: APIResponse): ResponseFormat => {
  const contentType = response.headers()['content-type'];

  if (contentType) {
    if (
      contentType.includes(ContentType.APPLICATION_JSON) ||
      contentType.includes(ContentType.APPLICATION_PROBLEM_JSON)
    )
      return ResponseFormat.JSON;

    if (contentType.includes(ContentType.TEXT_PLAIN) || contentType.includes(ContentType.TEXT_HTML))
      return ResponseFormat.TEXT;
    else return ResponseFormat.BODY;
  }
};

const getResponseFormatted = async (response: APIResponse): Promise<ResponseFormatted> => {
  const responseParsed = await getResponseParsed(response);
  return {
    url: response.url(),
    status: response.status(),
    headers: response.headers(),
    response: responseParsed,
    responseFormatted: true, 
  };
};

export class ApiUtils {
  static getResponseParsed = getResponseParsed;
  static getResponseFormatted = getResponseFormatted;

  /* API COLLECTION */

  static apis() {
    return {
      productApi: () => new ProductApi(),
    };
  }
}

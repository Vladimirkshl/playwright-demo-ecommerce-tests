import playwright from 'playwright';

import { APIRequestContext } from '@playwright/test';
import { HttpMethod, RequestContextType, RequestData } from '@constants/api/api';
import { Utils } from '@utils/utils';
import { Report } from '@utils/report';
import { ApiUtils } from '@utils/api-utils';

export abstract class ApiBase {
  protected abstract apiName: string;

  private readonly defaultGetParams = {
    pageIndex: 0,
    itemsPerPage: 20,
  };

  private static _adminRequestContext: Promise<APIRequestContext> | null = null;
  private static _solomonoUserRequestContext: Promise<APIRequestContext> | null = null;

  private static getAdminRequestContext(): Promise<APIRequestContext> {
    if (!ApiBase._adminRequestContext) {
      ApiBase._adminRequestContext = playwright.request.newContext({
        extraHTTPHeaders: {
          Authorization: process.env.ADMIN_API_TOKEN || '',
        },
      });
    }
    return ApiBase._adminRequestContext;
  }

  private static getSolomonoUserRequestContext(): Promise<APIRequestContext> {
    if (!ApiBase._solomonoUserRequestContext) {
      ApiBase._solomonoUserRequestContext = playwright.request.newContext({
        extraHTTPHeaders: {
          Authorization: process.env.SOLOMONO_API_TOKEN || '',
        },
      });
    }
    return ApiBase._solomonoUserRequestContext;
  }

  async GET(request: RequestData) {
    request.params = Utils.mergeObjects(this.defaultGetParams, request.params);
    return this.sendRequest(HttpMethod.GET, request);
  }

  private async sendRequest(method: HttpMethod, request: RequestData) {
    const requestContext = request.contextType === RequestContextType.SOLOMONO_USER
      ? ApiBase.getSolomonoUserRequestContext()
      : ApiBase.getAdminRequestContext();

    return this.sendRequestWithContext(method, request, requestContext); 
  }

  private async sendRequestWithContext(
    method: HttpMethod,
    request: RequestData,
    requestContext: Promise<APIRequestContext>
  ) {
    const apiEndpoint = `${process.env.API_ENDPOINT}${request.resource}`;
    request.failOnStatusCode = request.failOnStatusCode ?? true;
    request.is4xxRetryable = request.is4xxRetryable ?? false;
    const requestName = `API Request | ${request.name ?? this.apiName} | ${method.toUpperCase()}`;

    Report.attachJson(requestName, {
      ...request,
      apiEndpoint,
    });

    let maxRetries = 10;
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const context = await requestContext;
        const response = await context[method](apiEndpoint, {
          headers: request.headers,
          params: request.params,
          data: request.data,
          timeout: 60_000,
        });

        const statusCode = response.status();
        Report.logStep(`${requestName} | Response Status Code: ${statusCode}`);

        if (request.failOnStatusCode && statusCode >= 400) {
          if (statusCode === 400 || request.is4xxRetryable || statusCode === 500) maxRetries = 3;
          else if (
            statusCode === 401 ||
            statusCode === 404 ||
            statusCode === 405 ||
            statusCode === 415
          )
            maxRetries = 0;

          const errorDetails = await ApiUtils.getResponseFormatted(response);
          throw new Error(Utils.jsonStringify(errorDetails));
        }

        await Report.attachResponse(response);
        return await ApiUtils.getResponseParsed(response);
      } catch (error) {
        lastError = error;

        if (attempt < maxRetries) {
          Report.logStep(
            `${requestName} failed (attempt ${attempt}/${maxRetries}). Retrying in 5 seconds...`
          );
          await Utils.pause(5);
        }
      }
    }
    throw lastError;
  }
}

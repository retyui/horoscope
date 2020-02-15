import { AxiosRequestConfig } from 'axios';

import { JsonApiRequest } from '@/types/jsonApi';

import Resource from './Resource';

class JsonApiResource extends Resource {
  doDelete<Response>(url: string, options?: AxiosRequestConfig) {
    return this.apiGateway.doDelete<Response>(url, options);
  }

  doPatch<RequestBody, Response>(
    url: string,
    body: RequestBody,
    options?: AxiosRequestConfig,
  ) {
    const data = { data: body };

    return this.apiGateway.doPatch<JsonApiRequest<RequestBody>, Response>(
      url,
      data,
      options,
    );
  }

  doPost<RequestBody, Response>(url: string, body: RequestBody, options?: any) {
    const data = { data: body };

    return this.apiGateway.doPost<JsonApiRequest<RequestBody>, Response>(
      url,
      data,
      options,
    );
  }
}

export default JsonApiResource;

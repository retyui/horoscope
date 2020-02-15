import { AxiosRequestConfig } from 'axios';

import { AbstractGateway, AbstractResource } from './types';

class Resource implements AbstractResource {
  // @ts-ignore
  apiGateway: AbstractGateway;

  doGet<Response>(url: string, options?: AxiosRequestConfig) {
    return this.apiGateway.doGet<Response>(url, options);
  }

  doPost<Data, Response>(
    url: string,
    data: Data,
    options?: AxiosRequestConfig,
  ) {
    return this.apiGateway.doPost<Data, Response>(url, data, options);
  }

  setApiGateway(apiGateway: AbstractGateway) {
    this.apiGateway = apiGateway;
  }
}

export default Resource;

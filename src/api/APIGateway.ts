import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { AbstractGateway, AbstractResource, InterceptorOptions } from './types';

type Host = string;
type URL = string;
type Options = {
  axiosInstance?: AxiosInstance;
  host: Host;
  headers: { [key: string]: string };
};

class APIGateway implements AbstractGateway {
  axios: AxiosInstance;

  constructor({ axiosInstance, host, headers }: Options) {
    /* istanbul ignore next - axiosInstance used only for test */
    this.axios =
      axiosInstance ||
      axios.create({
        baseURL: host,
        headers: {
          common: headers,
        },
      });
  }

  doDelete<Response>(
    url: URL,
    options?: AxiosRequestConfig,
  ): Promise<Response> {
    return this.axios.delete<Response>(url, options).then((res) => res.data);
  }

  doGet<Response>(url: URL, options?: AxiosRequestConfig): Promise<Response> {
    return this.axios.get<Response>(url, options).then((res) => res.data);
  }

  doPost<Data, Response>(
    url: URL,
    data: Data,
    options?: AxiosRequestConfig,
  ): Promise<Response> {
    return this.axios
      .post<Response>(url, data, options)
      .then((res) => res.data);
  }

  doPatch<Data, Response>(
    url: URL,
    data: Data,
    options?: AxiosRequestConfig,
  ): Promise<Response> {
    return this.axios
      .patch<Response>(url, data, options)
      .then((res) => res.data);
  }

  injectToResources<T extends AbstractResource>(resources: Array<T>) {
    resources.forEach((resource: T): void => resource.setApiGateway(this));
  }

  retryRequest(config: AxiosRequestConfig) {
    return this.axios(config);
  }

  useInterceptor<T extends 'response' | 'request'>({
    stage,
    onRejected,
    onFulfilled,
  }: InterceptorOptions<T, any>) {
    this.axios.interceptors[stage].use(onFulfilled, onRejected);
  }
}

export default APIGateway;

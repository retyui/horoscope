import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type InterceptorOptions<Type extends 'response' | 'request', Config> = {
  stage: Type;
  onFulfilled?: (requestConfig: Config) => Config | Promise<Config>;
  onRejected?: (error: any) => any;
};

export interface AbstractResource {
  setApiGateway(a: AbstractGateway): void;
}

export interface AbstractGateway {
  retryRequest(config: AxiosRequestConfig): Promise<any>;

  doGet<Response>(url: string, options?: AxiosRequestConfig): Promise<Response>;

  doDelete<Response>(
    url: string,
    options?: AxiosRequestConfig,
  ): Promise<Response>;

  doPost<Data, Response>(
    url: string,
    data: Data,
    options?: AxiosRequestConfig,
  ): Promise<Response>;

  doPatch<Data, Response>(
    url: string,
    data: Data,
    options?: AxiosRequestConfig,
  ): Promise<Response>;

  useInterceptor(
    options: InterceptorOptions<'request', AxiosRequestConfig>,
  ): void;

  useInterceptor(options: InterceptorOptions<'response', AxiosResponse>): void;
}

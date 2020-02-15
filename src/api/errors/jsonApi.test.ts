import { AxiosError } from 'axios';

import {
  formatInvalidReason,
  formatReasonCode,
  formatTakenEmailReason,
  getReasonCode,
} from './jsonApi';

describe('formatReasonCode', () => {
  it('should work properly', () => {
    expect(formatTakenEmailReason('fieldName')).toBe('taken:fieldName');
  });
  expect(formatInvalidReason('fieldName')).toBe('invalid:fieldName');
});

describe('getReasonCode', () => {
  const createAxiosError = (errors: any): AxiosError => ({
    // @ts-ignore
    response: { data: { errors } },
  });

  it('should return formatted reason code', () => {
    const attrName = 'email';
    const jsonApiError = {
      code: 'invalid',
      title: 'Email',
      detail: 'Email is invalid',
      source: { pointer: `/data/attributes/${attrName}` },
    };
    const axiosError = createAxiosError([jsonApiError]);

    expect(getReasonCode(axiosError)).toEqual(
      formatReasonCode(jsonApiError.code, attrName),
    );
  });

  it("should return error code when passed error haven't `source` property", () => {
    const jsonApiError = {
      code: 'invalid',
      title: 'Email',
      detail: 'Email is invalid',
    };
    const axiosError = createAxiosError([jsonApiError]);

    expect(getReasonCode(axiosError)).toEqual(jsonApiError.code);
  });

  it("should return null when error haven't `code` property", () => {
    const jsonApiError = {
      title: 'Email',
      detail: 'Email is invalid',
    };
    const axiosError = createAxiosError([jsonApiError]);

    expect(getReasonCode(axiosError)).toBeNull();
  });

  it('should return null when error empty object', () => {
    const jsonApiError = {};
    const axiosError = createAxiosError([jsonApiError]);

    expect(getReasonCode(axiosError)).toBeNull();
  });
});

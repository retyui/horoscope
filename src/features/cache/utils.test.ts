import { subDays } from 'date-fns';

import { filterLastReadIndex, isSuccessfulMultiGet } from './utils';

describe('filterLastReadIndex', () => {
  const cacheAge = subDays(Date.now(), 10);

  it('should return item when last read date is null', () => {
    const lastReadRaw = null;
    const item = ['key', lastReadRaw];

    expect(
      filterLastReadIndex(cacheAge, [
        // @ts-ignore
        item,
      ]),
    ).toEqual([item]);
  });

  it("should return item when last read date isn't valid date", () => {
    const lastReadRaw = 'INVALID_DATE_TIME';
    const item = ['key', lastReadRaw];

    expect(
      filterLastReadIndex(cacheAge, [
        // @ts-ignore
        item,
      ]),
    ).toEqual([item]);
  });

  it('should reject item when last read date great than cache age', () => {
    const lastReadRaw = `${Date.now()}`;
    const item = ['key', lastReadRaw];

    expect(
      filterLastReadIndex(cacheAge, [
        // @ts-ignore
        item,
      ]),
    ).toEqual([]);
  });

  it('should return item when last read date less than cache age', () => {
    const lastReadRaw = `${subDays(Date.now(), 11)}`;
    const item = ['key', lastReadRaw];

    expect(
      filterLastReadIndex(cacheAge, [
        // @ts-ignore
        item,
      ]),
    ).toEqual([item]);
  });
});

describe('isSuccessfulMultiGet', () => {
  it("should return true when all value isn't null", () => {
    expect(
      isSuccessfulMultiGet([
        ['1', 'val1'],
        ['2', 'val2'],
      ]),
    ).toBeTruthy();
  });

  it('should return falsy when one value is null', () => {
    expect(
      isSuccessfulMultiGet([
        ['1', null],
        ['2', 'val2'],
      ]),
    ).toBeFalsy();
  });
});

import { isAfter, isValid } from 'date-fns';

// CLR - Cache last read date
export const getLastReadKey = (id: string, type: string) =>
  `CLD::${type}::${id}`;

// CV - Cache value
export const getValueKey = (id: string, type: string) => `CV::${type}::${id}`;

export const isSuccessfulMultiGet = (result: Array<[string, string | null]>) =>
  result.every(([, value]) => value !== null);

export const filterLastReadIndex = (
  cacheAge: Date,
  result: Array<[string, string | null]>,
) =>
  result.filter(([, lastReadRaw]) => {
    if (lastReadRaw) {
      const lastRead = Number(lastReadRaw);

      if (isValid(lastRead)) {
        return isAfter(cacheAge, lastRead);
      }
    }

    return true;
  });

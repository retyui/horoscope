import { ItemId, JsonApiResponse } from '@/types/jsonApi';

import extractIds from '../extractIds';

const PAGE_TYPE = 'page';
const createPageItem = (id: ItemId, attributes = {}, other?: {}) => ({
  ...other,
  id,
  type: PAGE_TYPE,
  attributes,
});

const page1 = createPageItem('1');
const page2 = createPageItem('2');
const options = { idProp: (item: any) => item.id };

// @ts-ignore
const createJsonApiResponse = (data: any): JsonApiResponse<any, any> => ({
  data,
});

it('should extract ids by json api response', () => {
  const response = createJsonApiResponse([page1, page2]);

  expect(extractIds(response, options)).toEqual([page1.id, page2.id]);
});

it('should extract one id when data is prop', () => {
  const response = createJsonApiResponse(page2);

  expect(extractIds(response, options)).toEqual([page2.id]);
});

it('should return empty array when data is null', () => {
  const response = createJsonApiResponse(null);

  expect(extractIds(response, options)).toEqual([]);
});

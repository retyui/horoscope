import { ItemId, JsonApiResponse } from '@/types/jsonApi';

import responseToResourcesIndex from '../responseToResourcesIndex';

const BLOCK_TYPE = 'block';
const PAGE_TYPE = 'page';
export const createPageItem = (id: ItemId, attributes = {}, other?: {}) => ({
  ...other,
  id,
  type: PAGE_TYPE,
  attributes,
});

export const createJsonApiResponse = (
  data: any,
  included?: any,
  // @ts-ignore
): JsonApiResponse<any, any> => ({ data, included });

it('should index by id prop', () => {
  const page1 = createPageItem('1', { title: 'Page 1' });
  const page2 = createPageItem('2', { title: 'Page 2' });
  const response = createJsonApiResponse([page1, page2]);

  expect(responseToResourcesIndex(response)).toEqual({
    [PAGE_TYPE]: [
      { id: '1', title: 'Page 1' },
      { id: '2', title: 'Page 2' },
    ],
  });
});

describe('relationships', () => {
  it('should normalize relationships props like array', () => {
    const blockLink = { id: '9', type: BLOCK_TYPE };
    const relationships = {
      blocks: {
        data: [blockLink],
        links: {
          self: 'https://app.com/pages/3/relationships/blocks',
          related: 'https://app.com/pages/3/blocks',
        },
      },
    };
    const page1 = createPageItem('1', { title: 'Page 1' }, { relationships });
    const response = createJsonApiResponse([page1]);

    expect(responseToResourcesIndex(response)).toEqual({
      [PAGE_TYPE]: [{ id: '1', title: 'Page 1', blocks: [blockLink.id] }],
    });
  });

  it('should normalize relationships props like object', () => {
    const personLink = { id: '42', type: 'people' };
    const relationships = { author: { data: personLink } };
    const page1 = createPageItem('1', { title: 'Page 1' }, { relationships });
    const response = createJsonApiResponse([page1]);

    expect(responseToResourcesIndex(response)).toEqual({
      [PAGE_TYPE]: [{ id: '1', title: 'Page 1', author: personLink.id }],
    });
  });
});

it('should remove links props from items', () => {
  const page1 = createPageItem(
    '1',
    { title: 'Page 1' },
    { links: { self: 'https://app.com/page/1' } },
  );
  const response = createJsonApiResponse([page1]);

  expect(responseToResourcesIndex(response)).toEqual({
    [PAGE_TYPE]: [{ id: '1', title: 'Page 1' }],
  });
});

it('should extend index by included items', () => {
  const page1 = createPageItem(
    '1',
    { title: 'Page 1' },
    { links: { self: 'https://app.com/page/1' } },
  );
  const block1 = {
    id: '9',
    type: BLOCK_TYPE,
    attributes: { type: 'category', linked_page_id: 4 },
  };

  const response = createJsonApiResponse([page1], [block1]);

  expect(responseToResourcesIndex(response)).toEqual({
    [PAGE_TYPE]: [{ id: '1', title: 'Page 1' }],
    [BLOCK_TYPE]: [{ ...block1.attributes, id: '9' }],
  });
});

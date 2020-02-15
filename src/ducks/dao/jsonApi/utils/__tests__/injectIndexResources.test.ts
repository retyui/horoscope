import injectIndexResources from '../injectIndexResources';
import {
  createJsonApiResponse,
  createPageItem,
} from './responseToResourcesIndex.test';

it('should return items ids', async () => {
  const page1 = createPageItem('1', { title: 'Page 1' });
  const page2 = createPageItem('2', { title: 'Page 2' });
  const response = createJsonApiResponse([page1, page2]);
  const wrappedJsonApiMethod = injectIndexResources({
    dispatch: jest.fn(),
    idProp: jest.fn(({ id }) => id),
    jsonApiMethod: jest.fn().mockResolvedValueOnce(response),
  });

  const ids = await wrappedJsonApiMethod();

  expect(ids).toEqual(['1', '2']);
});

it('should call dispatch with action', async () => {
  const page1 = createPageItem('1', { title: 'Page 1' });
  const page2 = createPageItem('2', { title: 'Page 2' });
  const response = createJsonApiResponse([page1, page2]);
  const dispatch = jest.fn();

  const wrappedJsonApiMethod = injectIndexResources({
    dispatch,
    idProp: jest.fn(({ id }) => id),
    jsonApiMethod: jest.fn().mockResolvedValueOnce(response),
  });

  await wrappedJsonApiMethod();

  expect(dispatch).toHaveBeenCalledTimes(1);
});

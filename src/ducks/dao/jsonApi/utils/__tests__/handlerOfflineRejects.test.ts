import { indexResources } from '../../../actions';
import handlerOfflineRejects from '../handlerOfflineRejects';
import responseToResourcesIndex from '../responseToResourcesIndex';

const USER_TYPE = 'user';

const createJsonApiResponse = (data: Array<{}>, included?: Array<{}>) => ({
  data,
  included,
});
const createUserType = (id: string, attributes?: {}) => ({
  id,
  type: USER_TYPE,
  attributes,
});

const createWrapper = (userOptions?: {}) => {
  const requiredOptions = {
    dispatch: jest.fn(),
    storageType: USER_TYPE,
    jsonApiMethod: jest.fn(),
    storageMethod: jest.fn(),
  };
  const options = {
    ...requiredOptions,
    ...userOptions,
  };

  const method = handlerOfflineRejects(options);

  return {
    method,
    options,
  };
};

describe('online', () => {
  it('should forward passed arguments to jsonApiMethod', async () => {
    const {
      method,
      options: { jsonApiMethod },
    } = createWrapper();

    jsonApiMethod.mockResolvedValueOnce({});

    expect(jsonApiMethod).toHaveBeenCalledTimes(0);

    const [arg1, arg2] = ['1', 2];

    await method(arg1, arg2);

    expect(jsonApiMethod).toHaveBeenCalledTimes(1);
    expect(jsonApiMethod).toHaveBeenCalledWith(arg1, arg2);
  });

  it('should return items ids by jsonApiMethod response', async () => {
    const {
      method,
      options: { jsonApiMethod },
    } = createWrapper();
    const response = createJsonApiResponse([
      createUserType('1'),
      createUserType('2'),
    ]);

    jsonApiMethod.mockResolvedValueOnce(response);

    const ids = await method();

    expect(ids).toEqual(['1', '2']);
  });

  it('should call dispatch with IndexResources Action', async () => {
    const {
      method,
      options: { jsonApiMethod, dispatch },
    } = createWrapper();
    const response = createJsonApiResponse([
      createUserType('1'),
      createUserType('2'),
    ]);

    jsonApiMethod.mockResolvedValueOnce(response);

    expect(dispatch).toHaveBeenCalledTimes(0);

    await method();

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      indexResources(
        responseToResourcesIndex(
          // @ts-ignore
          response,
        ),
      ),
    );
  });

  it('should call onGetIds with items ids', async () => {
    const {
      method,
      options: {
        jsonApiMethod,
        // @ts-ignore
        onGetIds,
      },
    } = createWrapper({
      onGetIds: jest.fn(),
    });

    jsonApiMethod.mockResolvedValueOnce(
      createJsonApiResponse([createUserType('1'), createUserType('2')]),
    );

    expect(onGetIds).toHaveBeenCalledTimes(0);

    await method();

    expect(onGetIds).toHaveBeenCalledTimes(1);
    expect(onGetIds).toHaveBeenCalledWith(['1', '2']);
  });

  describe('server errore', () => {
    it('should throw error when not offline', async () => {
      const {
        method,
        options: { jsonApiMethod },
      } = createWrapper();
      const serverError = new Error('500');

      jsonApiMethod.mockRejectedValueOnce(serverError);

      try {
        await method();
      } catch (e) {
        expect(e).toBe(serverError);
      }
    });

    it('should not try extract data from storage when not offline error', async () => {
      const {
        method,
        options: { jsonApiMethod, storageMethod },
      } = createWrapper();
      const serverError = new Error('500');

      jsonApiMethod.mockRejectedValueOnce(serverError);

      await method().catch(() => {});

      expect(storageMethod).toHaveBeenCalledTimes(0);
    });
  });
});

describe('offline', () => {
  const offlineError = { response: { status: 0 } };
  const createWrapperWithOfflineReject = (userOptions?: {}) =>
    createWrapper({
      ...userOptions,
      jsonApiMethod: jest.fn().mockRejectedValue(offlineError),
    });

  it('should call storageMethod without arguments', async () => {
    const {
      method,
      options: { storageMethod },
    } = createWrapperWithOfflineReject({
      storageMethod: jest.fn().mockResolvedValue({}),
    });
    const [arg1, arg2] = [1, '2'];

    expect(storageMethod).toHaveBeenCalledTimes(0);

    await method(arg1, arg2);

    expect(storageMethod).toHaveBeenCalledTimes(1);
    expect(storageMethod).toHaveBeenCalledWith();
  });

  it('should throw an offline error when storage not found cached version ', async () => {
    const { method } = createWrapperWithOfflineReject({
      storageMethod: jest.fn().mockResolvedValue(null),
    });

    try {
      await method();
    } catch (e) {
      expect(e).toEqual(offlineError);
    }
  });

  it('should call dispatch with IndexResources Action', async () => {
    const resourcesIndex = { [USER_TYPE]: [] };
    const {
      method,
      options: { dispatch },
    } = createWrapperWithOfflineReject({
      storageMethod: jest.fn().mockResolvedValue(resourcesIndex),
    });

    expect(dispatch).toHaveBeenCalledTimes(0);

    await method();

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(indexResources(resourcesIndex));
  });

  it('should extract ids from stored index', async () => {
    const resourcesIndex = { [USER_TYPE]: [{ id: '1' }, { id: '3' }] };
    const { method } = createWrapperWithOfflineReject({
      storageMethod: jest.fn().mockResolvedValue(resourcesIndex),
    });

    const ids = await method();

    expect(ids).toEqual(['1', '3']);
  });

  it('should use a custom id extractor function to extract ids from stored index', async () => {
    const users = [{ anyIdProps: '1' }, { anyIdProps: '3' }];
    const resourcesIndex = { [USER_TYPE]: users };
    const idProp = jest.fn(({ anyIdProps }) => anyIdProps);
    const { method } = createWrapperWithOfflineReject({
      storageMethod: jest.fn().mockResolvedValue(resourcesIndex),
      idProp,
    });

    const ids = await method();

    expect(ids).toEqual(['1', '3']);
    expect(idProp).toHaveBeenCalledTimes(users.length);
  });

  it('should not call onGetIds but return ids from stored index', async () => {
    const resourcesIndex = { [USER_TYPE]: [{ id: '1' }, { id: '3' }] };
    const {
      method,
      options: {
        // @ts-ignore
        onGetIds,
      },
    } = createWrapperWithOfflineReject({
      storageMethod: jest.fn().mockResolvedValue(resourcesIndex),
      onGetIds: jest.fn(),
    });

    expect(onGetIds).toHaveBeenCalledTimes(0);

    const ids = await method();

    expect(ids).toEqual(['1', '3']);
    expect(onGetIds).toHaveBeenCalledTimes(0);
  });
});

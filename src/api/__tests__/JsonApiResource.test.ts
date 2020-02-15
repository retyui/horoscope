import JsonApiResource from '../JsonApiResource';

const api = new JsonApiResource();

it('should call ApiGateway method with {data} object', () => {
  const doPost = jest.fn();
  const requestData = { user: 'name' };

  // @ts-ignore
  api.setApiGateway({ doPost });

  expect(doPost).toHaveBeenCalledTimes(0);

  api.doPost('/url', requestData);

  expect(doPost).toHaveBeenCalledTimes(1);
  expect(doPost).toHaveBeenCalledWith('/url', { data: requestData }, undefined);
});

import Resource from '../Resource';

const api = new Resource();

it('should call ApiGateway  passed object', () => {
  const doPost = jest.fn();
  const requestData = { user: 'name' };

  // @ts-ignore
  api.setApiGateway({ doPost });

  expect(doPost).toHaveBeenCalledTimes(0);

  api.doPost('/url', requestData);

  expect(doPost).toHaveBeenCalledTimes(1);
  expect(doPost).toHaveBeenCalledWith('/url', requestData, undefined);
});

it('should able to pass axios options as third param', () => {
  const doPost = jest.fn();
  const requestData = { user: 'name' };
  const options = { maxRedirects: 1 };

  // @ts-ignore
  api.setApiGateway({ doPost });
  api.doPost('/url', requestData, options);

  expect(doPost).toHaveBeenCalledWith('/url', requestData, options);
});

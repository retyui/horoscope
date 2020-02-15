import APIGateway from '../APIGateway';

const apiGateway = new APIGateway({ headers: {}, host: '' });

it('should call setApiGateway of passed resource instance', () => {
  const setApiGateway = jest.fn();
  const resource = { setApiGateway };
  const resources = [resource];

  expect(setApiGateway).toHaveBeenCalledTimes(0);

  apiGateway.injectToResources(resources);

  expect(setApiGateway).toHaveBeenCalledTimes(1);
  expect(setApiGateway).toHaveBeenCalledWith(apiGateway);
});

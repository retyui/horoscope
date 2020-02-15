import { getValidColor } from './color';

const defaultColor = 'red';

it('should return default value', () => {
  expect(getValidColor(null, defaultColor)).toEqual(defaultColor);
  expect(getValidColor(undefined, defaultColor)).toEqual(defaultColor);
  expect(getValidColor('', defaultColor)).toEqual(defaultColor);
  expect(getValidColor('invalid_color', defaultColor)).toEqual(defaultColor);
});

it('should return passed color', () => {
  expect(getValidColor('#000', defaultColor)).toEqual('#000');
  expect(getValidColor('gold', defaultColor)).toEqual('gold');
  expect(getValidColor('rgb(1,2,3)', defaultColor)).toEqual('rgb(1,2,3)');
  expect(getValidColor('rgba(1,2,3,0.5)', defaultColor)).toEqual(
    'rgba(1,2,3,0.5)',
  );
});

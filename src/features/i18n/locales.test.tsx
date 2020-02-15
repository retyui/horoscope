/* eslint-disable @typescript-eslint/camelcase */
import { mount } from 'enzyme';
import { fbt, FbtParam, init } from 'fbt';
import React from 'react';

import { setLocale } from './locales';

init({
  translations: {
    de_DE: { '3ITILq': 'Prüfung {param} fbt.' },
    en_US: { '3ITILq': 'Test {param} fbt.' },
  },
});

type Props = { param: string };

const TestFbt = ({ param }: Props) => (
  // https://github.com/facebookincubator/fbt/issues/78
  // eslint-disable-next-line react/jsx-boolean-value
  <fbt desc="test phrase" doNotExtract={true}>
    Test <FbtParam name="param">{param}</FbtParam> fbt.
  </fbt>
);

const render = (props: Props) => mount(<TestFbt {...props} />);

describe('setLocale', () => {
  test('should use default phrase', () => {
    const wrap = render({ param: 'abc' });

    expect(
      wrap
        .children()
        .first()
        .props().content,
    ).toEqual(['Test abc fbt.']);
  });

  test('should use german phrase when change locale', () => {
    // @ts-ignore
    setLocale('de_DE');

    const wrap = render({
      param: '123',
    });

    expect(
      wrap
        .children()
        .first()
        .props().content,
    ).toEqual(['Prüfung 123 fbt.']);

    // @ts-ignore
    setLocale('en_US');
  });
});

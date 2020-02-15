import React from 'react';
import { ThemeProvider } from 'react-native-stylex';

import theme from '@/features/styles/theme';

export const MockThemeProvider = (props: { children: any }) => (
  <ThemeProvider {...props} value={theme} />
);

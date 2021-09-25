import React from 'react';
import { themeClass } from '@nelson-ui/core';

export const ThemeProvider: React.FC<{ theme: 'light' | 'dark' }> = ({
  children,
  theme = 'light',
}) => {
  return <div className={`${themeClass} ${theme}-theme`}>{children}</div>;
};

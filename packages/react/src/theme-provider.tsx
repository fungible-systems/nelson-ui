import React from 'react';
import { themeClass } from '@nelson-ui/core/styles.css';
import clsx from 'clsx';

export const ThemeProvider: React.FC<{ theme: 'light' | 'dark'; className?: string }> = ({
  children,
  theme = 'light',
  className,
}) => {
  return <div className={clsx([className, `${themeClass} ${theme}-theme`])}>{children}</div>;
};

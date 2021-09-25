import { useLayoutEffect } from 'react';
import { themeClass } from '@nelson-ui/core/index.css.js';

type Themes = 'light-theme' | 'dark-theme';

const isSSR = typeof document === 'undefined';

export const useThemeEffect = (defaultTheme: Themes = 'light-theme') => {
  const htmlTag = !isSSR ? document.getElementsByTagName('html')[0] : undefined;
  const hasThemeClass = htmlTag?.classList.contains(themeClass);
  const hasModeClass =
    htmlTag?.classList.contains('light-theme') || htmlTag?.classList.contains('dark-theme');

  useLayoutEffect(() => {
    if (isSSR) return;
    if (!htmlTag) return;
    if (!hasThemeClass) {
      htmlTag.classList.add(themeClass);
    }
    if (!hasModeClass) {
      htmlTag.classList.add(defaultTheme);
    }
  }, [isSSR, htmlTag, hasModeClass, hasThemeClass]);
};

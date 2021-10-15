import { useEffect } from 'react';
import { theme as lightTheme, darkTheme } from '@nelson-ui/core';

type Themes = typeof lightTheme.className | typeof darkTheme.className;

const isSSR = typeof document === 'undefined';

const getInvert = (theme: Themes) =>
  theme === lightTheme.className ? darkTheme.className : lightTheme.className;

export function useThemeEffect(theme: 'light' | 'dark' = 'light') {
  const themeClass = theme === 'light' ? lightTheme.className : darkTheme.className;
  const htmlTag = !isSSR ? document.getElementsByTagName('html')[0] : undefined;
  const hasThemeClass = htmlTag?.classList.contains(themeClass);
  const hasModeClass =
    htmlTag?.classList.contains(lightTheme.className) ||
    htmlTag?.classList.contains(darkTheme.className);
  const isDifferentTheme = hasModeClass && !htmlTag?.classList.contains(themeClass);

  useEffect(() => {
    if (isSSR || !htmlTag) return;
    if (!hasThemeClass) htmlTag.classList.add(themeClass);
    if (isDifferentTheme) {
      htmlTag.classList.remove(getInvert(themeClass));
      htmlTag.classList.add(themeClass);
    }
  }, [isSSR, htmlTag, themeClass, hasModeClass, hasThemeClass]);
}

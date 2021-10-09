import React from 'react';
import { colors, typeStyles } from '@nelson-ui/theme';
import { typeStyleClasses } from '@nelson-ui/core';
import { Box, BoxProps } from './box';
import clsx from 'clsx';

const getDefaultColor = (type: keyof typeof typeStyles): keyof typeof colors['light'] => {
  switch (type) {
    case 'Body01':
    case 'Body02':
      return 'text';
    case 'Caption01':
    case 'Caption02':
      return 'text-subdued';
    case 'Display01':
    case 'Display02':
    case 'Heading01':
    case 'Heading02':
    case 'Heading03':
    case 'Heading04':
    case 'Heading05':
      return 'text';
    case 'Label01':
    case 'Label02':
    case 'Label03':
      return 'text-dim';
  }
};

export const Text = React.forwardRef<
  HTMLElement,
  BoxProps & {
    variant: keyof typeof typeStyles;
  }
>(({ variant, className, ...props }, ref) => {
  const color = getDefaultColor(variant);
  return (
    <Box
      className={clsx([typeStyleClasses[variant], className])}
      ref={ref}
      color={color}
      {...props}
    />
  );
});

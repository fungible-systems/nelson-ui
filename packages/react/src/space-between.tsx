import React from 'react';
import { Stack, StackProps } from './stack';

export const SpaceBetween = React.forwardRef<HTMLElement, StackProps>((props, ref) => (
  <Stack
    spacing="$0"
    isInline
    ref={ref}
    alignItems="center"
    justifyContent="space-between"
    {...props}
  />
));

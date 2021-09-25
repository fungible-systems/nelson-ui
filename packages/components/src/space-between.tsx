import React from 'react';
import { Flex } from './flex';
import { BoxProps } from './box';

export const SpaceBetween = React.forwardRef<HTMLElement, BoxProps>((props, ref) => (
  <Flex ref={ref} alignItems="center" justifyContent="space-between" {...props} />
));

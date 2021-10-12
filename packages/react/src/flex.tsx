import React, { forwardRef } from 'react';
import { Box, BoxProps } from './box';

export const Flex = forwardRef<HTMLElement, BoxProps>((props, ref) => (
  <Box ref={ref} display="flex" {...props} />
));

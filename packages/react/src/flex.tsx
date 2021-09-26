import React from 'react';
import { Box, BoxProps } from './box';

export const Flex = React.forwardRef<HTMLElement, BoxProps>((props, ref) => (
  <Box ref={ref} display="flex" {...props} />
));

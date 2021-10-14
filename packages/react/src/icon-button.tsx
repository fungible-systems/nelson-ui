import React, { forwardRef } from 'react';
import { BoxProps } from './box';
import { Flex } from './flex';

export interface IconButtonProps extends BoxProps {
  icon: any;
  iconSize?: BoxProps['size'];
  iconProps?: BoxProps;
  isHovered?: boolean;
  invert?: boolean;
}

export const IconButton = forwardRef<HTMLElement, IconButtonProps>((props, ref) => {
  const {
    icon: Icon,
    iconSize = '20px',
    iconProps = {},
    invert,
    _hover = {},
    isHovered,
    ...rest
  } = props;
  return (
    <Flex
      backgroundColor="transparent"
      border="0"
      display="flex"
      alignItems="center"
      justifyContent="center"
      as="button"
      placeItems="center"
      borderRadius="100%"
      size="36px"
      position="relative"
      userSelect="none"
      _hover={{
        cursor: 'pointer',
        ..._hover,
      }}
      color="currentColor"
      ref={ref}
      {...rest}
    >
      <Icon display="block" size={iconSize} color="currentColor" {...iconProps} />
    </Flex>
  );
});

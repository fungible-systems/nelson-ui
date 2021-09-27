import { createBox } from '@dessert-box/react';
import { atoms } from '@nelson-ui/core/styles.css';
import { OwnProps } from '@radix-ui/react-polymorphic';

export const Box = createBox({ atoms });

export type BoxProps = OwnProps<typeof Box>;

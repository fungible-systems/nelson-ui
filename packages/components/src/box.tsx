import { createBox } from '@dessert-box/react';
import { atoms } from '@nelson-ui/core/index.css.js';
import { OwnProps } from '@radix-ui/react-polymorphic';

export const Box = createBox({ atoms });

export type BoxProps = OwnProps<typeof Box>;

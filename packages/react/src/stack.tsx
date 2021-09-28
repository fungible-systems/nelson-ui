import React from 'react';
import { hStack, stackGaps, vStack } from './stack.css';
import { Box, BoxProps } from './box';

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */
export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter(child =>
    React.isValidElement(child)
  ) as React.ReactElement[];
}

export interface StackProps extends BoxProps {
  isInline?: boolean;
  children?: React.ReactNode[] | React.ReactNode;
  divider?: React.ReactElement;
  spacing?: BoxProps['margin'];
  shouldWrapChildren?: boolean;
}

export const Stack = React.forwardRef<HTMLElement, StackProps>(
  ({ children, isInline, spacing = 'base', divider, shouldWrapChildren }, ref) => {
    const directionClass = isInline ? hStack : vStack;
    const className = `${directionClass} ${stackGaps[spacing]}`;
    const validChildren = getValidChildren(children);
    return (
      <Box ref={ref} className={className}>
        {validChildren.map((child, index) => {
          const isLastChild = validChildren.length === index + 1;
          if (shouldWrapChildren)
            return (
              <React.Fragment key={`${className}-${index}`}>
                <Box display="inline-block">{child}</Box>
                {!isLastChild ? divider : null}
              </React.Fragment>
            );
          return (
            <React.Fragment key={`${className}-${index}`}>
              {child}
              {!isLastChild && divider ? divider : null}
            </React.Fragment>
          );
        })}
      </Box>
    );
  }
);

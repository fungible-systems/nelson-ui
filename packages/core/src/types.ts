import type { CSSTypes } from './stitches.config';

export interface PseudoProps {
  _after?: CSSTypes;
  _before?: CSSTypes;
  _focus?: CSSTypes;
  _hover?: CSSTypes;
  _active?: CSSTypes;
  _pressed?: CSSTypes;
  _selected?: CSSTypes;
  _focusWithin?: CSSTypes;
  _invalid?: CSSTypes;
  _disabled?: CSSTypes;
  _grabbed?: CSSTypes;
  _expanded?: CSSTypes;
  _checked?: CSSTypes;
  _mixed?: CSSTypes;
  _odd?: CSSTypes;
  _even?: CSSTypes;
  _visited?: CSSTypes;
  _readOnly?: CSSTypes;
  _first?: CSSTypes;
  _last?: CSSTypes;
  _notFirst?: CSSTypes;
  _notLast?: CSSTypes;
  _placeholder?: CSSTypes;
  css?: CSSTypes;
}

export type CssThemeProps = CSSTypes & PseudoProps;

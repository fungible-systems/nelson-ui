/**
 * The selectors are based on [WAI-ARIA state properties](https://www.w3.org/WAI/PF/aria-1.1/states_and_properties) and common CSS Selectors
 */
const _hover = '&:hover';
const _active = '&:active, &[data-active=true]';
const _focus = '&:focus';
const _visited = '&:visited';
const _even = '&:nth-of-type(even)';
const _odd = '&:nth-of-type(odd)';
const _disabled =
  '&:disabled, &:disabled:focus, &:disabled:hover, &[aria-disabled=true], &[aria-disabled=true]:focus, &[aria-disabled=true]:hover';
const _checked = '&[aria-checked=true]';
const _mixed = '&[aria-checked=mixed]';
const _selected = '&[aria-selected=true]';
const _invalid = '&[aria-invalid=true]';
const _pressed = '&[aria-pressed=true]';
const _readOnly = '&[aria-readonly=true], &[readonly]';
const _first = '&:first-of-type';
const _last = '&:last-of-type';
const _expanded = '&[aria-expanded=true]';
const _grabbed = '&[aria-grabbed=true]';
const _notFirst = '&:not(:first-of-type)';
const _notLast = '&:not(:last-of-type)';
const _groupHover = '[role=group]:hover &';
export const PSEUDO_TAGS: Record<string, string> = {
  _hover,
  _active,
  _focus,
  _visited,
  _even,
  _odd,
  _disabled,
  _checked,
  _mixed,
  _selected,
  _invalid,
  _pressed,
  _readOnly,
  _first,
  _last,
  _expanded,
  _grabbed,
  _notFirst,
  _notLast,
  _groupHover,
};

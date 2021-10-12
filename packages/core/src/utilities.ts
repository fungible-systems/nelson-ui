import { PropertyValue } from './stitches-core/css-util';

export const utils = {
  m: (value: PropertyValue<'margin'>) => ({
    margin: value,
  }),
  mt: (value: PropertyValue<'margin'>) => ({
    marginTop: value,
  }),
  mr: (value: PropertyValue<'margin'>) => ({
    marginRight: value,
  }),
  mb: (value: PropertyValue<'margin'>) => ({
    marginBottom: value,
  }),
  ml: (value: PropertyValue<'margin'>) => ({
    marginLeft: value,
  }),
  mx: (value: PropertyValue<'margin'>) => ({
    marginLeft: value,
    marginRight: value,
  }),
  my: (value: PropertyValue<'margin'>) => ({
    marginTop: value,
    marginBottom: value,
  }),
  p: (value: PropertyValue<'padding'>) => ({
    margin: value,
  }),
  pt: (value: PropertyValue<'padding'>) => ({
    marginTop: value,
  }),
  pr: (value: PropertyValue<'padding'>) => ({
    marginRight: value,
  }),
  pb: (value: PropertyValue<'padding'>) => ({
    marginBottom: value,
  }),
  pl: (value: PropertyValue<'padding'>) => ({
    marginLeft: value,
  }),
  px: (value: PropertyValue<'padding'>) => ({
    marginLeft: value,
    marginRight: value,
  }),
  py: (value: PropertyValue<'padding'>) => ({
    marginTop: value,
    marginBottom: value,
  }),
  // A property for applying width/height together
  size: (value: PropertyValue<'width'>) => ({
    width: value,
    height: value,
  }),
};

import DATA from '../figma.json';

type TypeDef = typeof DATA.record.values.base.typography;

export const makeTypeStyles = (data: typeof DATA, vars: any) => {
  const types: TypeDef = data.record.values.base.typography;

  const styles: any = {};

  Object.keys(types).forEach(key => {
    const entry = types[key as keyof typeof types];
    Object.keys(entry).forEach(typeStyle => {
      const { value } = entry[typeStyle as keyof typeof entry];
      styles[typeStyle] = value;
    });
  });

  Object.entries(styles).forEach(([key, value]) => {
    const newValue: any = {};
    Object.entries(value as any).forEach(([prop, propValue]) => {
      const [param, paramValue] = (propValue as string).replace('$', '').split('.');
      if (param === 'paragraphSpacing') return;
      newValue[prop] = vars[param][paramValue];

      if (prop === 'fontWeight') newValue[prop] = newValue[prop] === 'Medium' ? 500 : 400;
    });

    styles[key] = newValue;
  });

  return styles;
};

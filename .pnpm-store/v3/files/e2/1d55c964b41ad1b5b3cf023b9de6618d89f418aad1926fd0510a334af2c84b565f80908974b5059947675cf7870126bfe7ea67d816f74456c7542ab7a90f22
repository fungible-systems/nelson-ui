'use strict';

const createSprinkles = composeStyles => (...args) => {
  const sprinklesStyles = Object.assign({}, ...args.map(a => a.styles));
  const sprinklesKeys = Object.keys(sprinklesStyles);
  const shorthandNames = sprinklesKeys.filter(property => 'mappings' in sprinklesStyles[property]);

  const sprinklesFn = props => {
    const classNames = [];
    const shorthands = {};
    const nonShorthands = { ...props
    };
    let hasShorthands = false;

    for (const shorthand of shorthandNames) {
      const value = props[shorthand];

      if (value) {
        const sprinkle = sprinklesStyles[shorthand];
        hasShorthands = true;

        for (const propMapping of sprinkle.mappings) {
          shorthands[propMapping] = value;

          if (!nonShorthands[propMapping]) {
            delete nonShorthands[propMapping];
          }
        }
      }
    }

    const finalProps = hasShorthands ? { ...shorthands,
      ...nonShorthands
    } : props;

    for (const prop in finalProps) {
      const propValue = finalProps[prop];
      const sprinkle = sprinklesStyles[prop];

      try {
        if (sprinkle.mappings) {
          // Skip shorthands
          continue;
        }

        if (typeof propValue === 'string' || typeof propValue === 'number') {
          if (process.env.NODE_ENV !== 'production') {
            if (!sprinkle.values[propValue].defaultClass) {
              throw new Error();
            }
          }

          classNames.push(sprinkle.values[propValue].defaultClass);
        } else if (Array.isArray(propValue)) {
          for (const responsiveIndex in propValue) {
            const responsiveValue = propValue[responsiveIndex];

            if (responsiveValue != null) {
              const conditionName = sprinkle.responsiveArray[responsiveIndex];

              if (process.env.NODE_ENV !== 'production') {
                if (!sprinkle.values[responsiveValue].conditions[conditionName]) {
                  throw new Error();
                }
              }

              classNames.push(sprinkle.values[responsiveValue].conditions[conditionName]);
            }
          }
        } else {
          for (const conditionName in propValue) {
            // Conditional style
            const value = propValue[conditionName];

            if (value != null) {
              if (process.env.NODE_ENV !== 'production') {
                if (!sprinkle.values[value].conditions[conditionName]) {
                  throw new Error();
                }
              }

              classNames.push(sprinkle.values[value].conditions[conditionName]);
            }
          }
        }
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
          class SprinklesError extends Error {
            constructor(message) {
              super(message);
              this.name = 'SprinklesError';
            }

          }

          const format = v => typeof v === 'string' ? `"${v}"` : v;

          const invalidPropValue = (prop, value, possibleValues) => {
            throw new SprinklesError(`"${prop}" has no value ${format(value)}. Possible values are ${Object.keys(possibleValues).map(format).join(', ')}`);
          };

          if (!sprinkle) {
            throw new SprinklesError(`"${prop}" is not a valid sprinkle`);
          }

          if (typeof propValue === 'string' || typeof propValue === 'number') {
            if (!(propValue in sprinkle.values)) {
              invalidPropValue(prop, propValue, sprinkle.values);
            }

            if (!sprinkle.values[propValue].defaultClass) {
              throw new SprinklesError(`"${prop}" has no default condition. You must specify which conditions to target explicitly. Possible options are ${Object.keys(sprinkle.values[propValue].conditions).map(format).join(', ')}`);
            }
          }

          if (typeof propValue === 'object') {
            if (!('conditions' in sprinkle.values[Object.keys(sprinkle.values)[0]])) {
              throw new SprinklesError(`"${prop}" is not a conditional property`);
            }

            if (Array.isArray(propValue)) {
              if (!('responsiveArray' in sprinkle)) {
                throw new SprinklesError(`"${prop}" does not support responsive arrays`);
              }

              const breakpointCount = sprinkle.responsiveArray.length;

              if (breakpointCount < propValue.length) {
                throw new SprinklesError(`"${prop}" only supports up to ${breakpointCount} breakpoints. You passed ${propValue.length}`);
              }

              for (const responsiveValue of propValue) {
                if (!sprinkle.values[responsiveValue]) {
                  invalidPropValue(prop, responsiveValue, sprinkle.values);
                }
              }
            } else {
              for (const conditionName in propValue) {
                const value = propValue[conditionName];

                if (value != null) {
                  if (!sprinkle.values[value]) {
                    invalidPropValue(prop, value, sprinkle.values);
                  }

                  if (!sprinkle.values[value].conditions[conditionName]) {
                    throw new SprinklesError(`"${prop}" has no condition named ${format(conditionName)}. Possible values are ${Object.keys(sprinkle.values[value].conditions).map(format).join(', ')}`);
                  }
                }
              }
            }
          }
        }

        throw e;
      }
    }

    return composeStyles(classNames.join(' '));
  };

  return Object.assign(sprinklesFn, {
    properties: new Set(sprinklesKeys)
  });
};

exports.createSprinkles = createSprinkles;

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
          if (        "production" !== 'production') ;

          classNames.push(sprinkle.values[propValue].defaultClass);
        } else if (Array.isArray(propValue)) {
          for (const responsiveIndex in propValue) {
            const responsiveValue = propValue[responsiveIndex];

            if (responsiveValue != null) {
              const conditionName = sprinkle.responsiveArray[responsiveIndex];

              if (        "production" !== 'production') ;

              classNames.push(sprinkle.values[responsiveValue].conditions[conditionName]);
            }
          }
        } else {
          for (const conditionName in propValue) {
            // Conditional style
            const value = propValue[conditionName];

            if (value != null) {
              if (        "production" !== 'production') ;

              classNames.push(sprinkle.values[value].conditions[conditionName]);
            }
          }
        }
      } catch (e) {

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

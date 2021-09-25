'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var css = require('@vanilla-extract/css');
var recipe = require('@vanilla-extract/css/recipe');
var fileScope = require('@vanilla-extract/css/fileScope');
var createSprinkles$1 = require('./createSprinkles-346ead5a.cjs.prod.js');
var createUtils_dist_vanillaExtractSprinklesCreateUtils = require('../createUtils/dist/vanilla-extract-sprinkles-createUtils.cjs.prod.js');

function defineProperties(options) {
  let styles = 'shorthands' in options ? Object.fromEntries(Object.entries(options.shorthands).map(([prop, mappings]) => [prop, {
    mappings
  }])) : {};

  for (const key in options.properties) {
    const property = options.properties[key];
    styles[key] = {
      values: {}
    };

    if ('responsiveArray' in options) {
      styles[key].responsiveArray = options.responsiveArray;
    }

    const processValue = (valueName, value) => {
      if ('conditions' in options) {
        styles[key].values[valueName] = {
          conditions: {}
        };
        const defaultConditions = options.defaultCondition ? Array.isArray(options.defaultCondition) ? options.defaultCondition : [options.defaultCondition] : [];
        const defaultClasses = [];

        for (const conditionName in options.conditions) {
          let styleValue = typeof value === 'object' ? value : {
            [key]: value
          };
          const condition = options.conditions[conditionName];

          if (condition['@supports']) {
            styleValue = {
              '@supports': {
                [condition['@supports']]: styleValue
              }
            };
          }

          if (condition['@media']) {
            styleValue = {
              '@media': {
                [condition['@media']]: styleValue
              }
            };
          }

          if (condition.selector) {
            styleValue = {
              selectors: {
                [condition.selector]: styleValue
              }
            };
          }

          const className = css.style(styleValue, `${key}_${String(valueName)}_${conditionName}`);
          styles[key].values[valueName].conditions[conditionName] = className;

          if (defaultConditions.indexOf(conditionName) > -1) {
            defaultClasses.push(className);
          }
        }

        if (defaultClasses.length > 0) {
          styles[key].values[valueName].defaultClass = defaultClasses.join(' ');
        }
      } else {
        const styleValue = typeof value === 'object' ? value : {
          [key]: value
        };
        styles[key].values[valueName] = {
          defaultClass: css.style(styleValue, `${key}_${String(valueName)}`)
        };
      }
    };

    if (Array.isArray(property)) {
      for (const value of property) {
        processValue(value, value);
      }
    } else {
      for (const valueName in property) {
        const value = property[valueName];
        processValue(valueName, value);
      }
    }
  }

  const conditions = 'conditions' in options ? {
    defaultCondition: options.defaultCondition,
    conditionNames: Object.keys(options.conditions),
    responsiveArray: options.responsiveArray
  } : undefined;
  return {
    conditions,
    styles
  };
}

const mockComposeStyles = classList => classList;

function createSprinkles(...config) {
  // When using Sprinkles with the runtime (e.g. within a jest test)
  // `style` can be called (only for composition) outside of a fileScope.
  // Checking we're within a fileScope ensures this doesn't blow up and is
  // safe as compositions don't make sense at runtime
  const sprinkles = createSprinkles$1.createSprinkles(fileScope.hasFileScope() ? css.composeStyles : mockComposeStyles)(...config);
  return recipe.addRecipe(sprinkles, {
    importPath: '@vanilla-extract/sprinkles/createRuntimeSprinkles',
    importName: 'createSprinkles',
    args: config
  });
}
/** @deprecated - Use `defineProperties` */

const createAtomicStyles = defineProperties;
/** @deprecated - Use `createSprinkles` */

const createAtomsFn = createSprinkles;

exports.createMapValueFn = createUtils_dist_vanillaExtractSprinklesCreateUtils.createMapValueFn;
exports.createNormalizeValueFn = createUtils_dist_vanillaExtractSprinklesCreateUtils.createNormalizeValueFn;
exports.createAtomicStyles = createAtomicStyles;
exports.createAtomsFn = createAtomsFn;
exports.createSprinkles = createSprinkles;
exports.defineProperties = defineProperties;

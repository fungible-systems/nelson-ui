'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var recipe = require('@vanilla-extract/css/recipe');

function createNormalizeValueFn(properties) {
  const {
    conditions
  } = properties;

  if (!conditions) {
    throw new Error('Styles have no conditions');
  }

  function normalizeValue(value) {
    if (typeof value === 'string' || typeof value === 'number') {
      if (!conditions.defaultCondition) {
        throw new Error('No default condition');
      }

      return {
        [conditions.defaultCondition]: value
      };
    }

    if (Array.isArray(value)) {
      if (!('responsiveArray' in conditions)) {
        throw new Error('Responsive arrays are not supported');
      }

      const returnValue = {};

      for (const index in conditions.responsiveArray) {
        if (value[index] != null) {
          returnValue[conditions.responsiveArray[index]] = value[index];
        }
      }

      return returnValue;
    }

    return value;
  }

  return recipe.addRecipe(normalizeValue, {
    importPath: '@vanilla-extract/sprinkles/createUtils',
    importName: 'createNormalizeValueFn',
    args: [{
      conditions: properties.conditions
    }]
  });
}
function createMapValueFn(properties) {
  const {
    conditions
  } = properties;

  if (!conditions) {
    throw new Error('Styles have no conditions');
  }

  const normalizeValue = createNormalizeValueFn(properties);

  function mapValue(value, mapFn) {
    if (typeof value === 'string' || typeof value === 'number') {
      if (!conditions.defaultCondition) {
        throw new Error('No default condition');
      }

      return mapFn(value, conditions.defaultCondition);
    }

    const normalizedObject = Array.isArray(value) ? normalizeValue(value) : value;
    const mappedObject = {};

    for (const key in normalizedObject) {
      if (normalizedObject[key] != null) {
        mappedObject[key] = mapFn(normalizedObject[key], key);
      }
    }

    return mappedObject;
  }

  return recipe.addRecipe(mapValue, {
    importPath: '@vanilla-extract/sprinkles/createUtils',
    importName: 'createMapValueFn',
    args: [{
      conditions: properties.conditions
    }]
  });
}

exports.createMapValueFn = createMapValueFn;
exports.createNormalizeValueFn = createNormalizeValueFn;

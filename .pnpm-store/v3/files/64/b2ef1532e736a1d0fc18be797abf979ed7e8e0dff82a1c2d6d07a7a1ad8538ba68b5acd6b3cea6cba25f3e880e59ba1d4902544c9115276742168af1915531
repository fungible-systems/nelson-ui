function getVarName(variable) {
  const matches = variable.match(/^var\((.*)\)$/);

  if (matches) {
    return matches[1];
  }

  return variable;
}

function get(obj, path) {
  let result = obj;

  for (const key of path) {
    if (!(key in result)) {
      throw new Error(`Path ${path.join(' -> ')} does not exist in object`);
    }

    result = result[key];
  }

  return result;
}

function walkObject(obj, fn, path = []) {
  const clone = obj.constructor();

  for (let key in obj) {
    const value = obj[key];
    const currentPath = [...path, key];

    if (typeof value === 'string' || typeof value === 'number' || value == null) {
      clone[key] = fn(value, currentPath);
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      clone[key] = walkObject(value, fn, currentPath);
    } else {
      console.warn(`Skipping invalid key "${currentPath.join('.')}". Should be a string, number, null or object. Received: "${Array.isArray(value) ? 'Array' : typeof value}"`);
    }
  }

  return clone;
}

export { get, getVarName, walkObject };

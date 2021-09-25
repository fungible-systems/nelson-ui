"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.write = exports.match = void 0;

var _fs = require("fs");

var _jestDiff = _interopRequireDefault(require("jest-diff"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const readJsonSync = file => {
  try {
    const text = (0, _fs.readFileSync)(file, "utf-8");

    try {
      return JSON.parse(text);
    } catch (error) {
      return {};
    }
  } catch (error) {
    return null;
  }
};

const writeJsonSync = (file, data) => (0, _fs.writeFileSync)(file, JSON.stringify(data, null, 2) + "\n");

const isObject = d => typeof d === "object" && d != null;

const isNumber = d => typeof d === "number";

const compareWithThreshold = (_1, _2, threshold) => {
  const keys1 = Object.keys(_1);
  const keys2 = Object.keys(_2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every((key, i) => {
    const value1 = _1[key];
    const value2 = _2[key];

    if (isNumber(value1) && isNumber(value2)) {
      return Math.abs(value1 - value2) <= threshold;
    }

    if (isObject(value1) && isObject(value2)) {
      return compareWithThreshold(value1, value2, threshold);
    }

    return false;
  });
};

const match = ({
  snapshotPath,
  name,
  data,
  threshold
}) => {
  const snapshot = readJsonSync(snapshotPath);

  if (snapshot == null) {
    throw Error("Size snapshot is missing. Please run rollup to create one.");
  }

  const prevData = snapshot[name] || {};

  if (!compareWithThreshold(prevData, data, threshold)) {
    console.error((0, _jestDiff.default)(prevData, data));
    throw Error("Size snapshot is not matched. Run rollup to rebuild one.");
  }
};

exports.match = match;

const write = ({
  snapshotPath,
  name,
  data
}) => {
  const snapshot = readJsonSync(snapshotPath) || {};
  snapshot[name] = data;
  writeJsonSync(snapshotPath, snapshot);
};

exports.write = write;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sizeSnapshot = void 0;

var _path = require("path");

var _terser = require("terser");

var _gzipSize = _interopRequireDefault(require("gzip-size"));

var _bytes = _interopRequireDefault(require("bytes"));

var _chalk = _interopRequireDefault(require("chalk"));

var _treeshakeWithRollup = require("./treeshakeWithRollup.js");

var _treeshakeWithWebpack = require("./treeshakeWithWebpack.js");

var snapshot = _interopRequireWildcard(require("./snapshot.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateOptions = options => {
  const optionsKeys = ["snapshotPath", "matchSnapshot", "threshold", "printInfo"];
  const invalidKeys = Object.keys(options).filter(d => !optionsKeys.includes(d));

  const wrap = d => `"${d}"`;

  if (1 === invalidKeys.length) {
    throw Error(`Option ${wrap(invalidKeys[0])} is invalid`);
  }

  if (1 < invalidKeys.length) {
    throw Error(`Options ${invalidKeys.map(wrap).join(", ")} are invalid`);
  }
};

const bytesConfig = {
  thousandsSeparator: ",",
  unitSeparator: " ",
  unit: "B"
};

const formatSize = d => _chalk.default.bold(_bytes.default.format(d, bytesConfig));

const sizeSnapshot = (options = {}) => {
  validateOptions(options);
  const snapshotPath = options.snapshotPath || (0, _path.join)(process.cwd(), ".size-snapshot.json");
  const shouldMatchSnapshot = options.matchSnapshot === true;
  const shouldPrintInfo = options.printInfo !== false;
  const threshold = options.threshold == null ? 0 : options.threshold;
  return {
    name: "size-snapshot",

    renderChunk(rawSource, chunk, outputOptions) {
      // remove windows specific newline character
      const source = rawSource.replace(/\r/g, "");
      const format = outputOptions.format;
      const shouldTreeshake = format === "es" || format === "esm";
      const outputName = chunk.fileName;
      const minified = (0, _terser.minify)(source).code;

      const treeshakeSize = code => Promise.all([(0, _treeshakeWithRollup.treeshakeWithRollup)(code), (0, _treeshakeWithWebpack.treeshakeWithWebpack)(code)]);

      return Promise.all([(0, _gzipSize.default)(minified), shouldTreeshake ? treeshakeSize(source) : [{
        code: 0,
        import_statements: 0
      }, {
        code: 0
      }]]).then(([gzippedSize, [rollupSize, webpackSize]]) => {
        const sizes = {
          bundled: source.length,
          minified: minified.length,
          gzipped: gzippedSize
        };
        const prettyFormat = format === "es" ? "esm" : format;
        const prettyBundled = formatSize(sizes.bundled);
        const prettyMinified = formatSize(sizes.minified);
        const prettyGzipped = formatSize(sizes.gzipped);
        let infoString = "\n" + `Computed sizes of "${outputName}" with "${prettyFormat}" format\n` + `  bundler parsing size: ${prettyBundled}\n` + `  browser parsing size (minified with terser): ${prettyMinified}\n` + `  download size (minified and gzipped): ${prettyGzipped}\n`;

        const formatMsg = (msg, size) => `  ${msg}: ${formatSize(size)}\n`;

        if (shouldTreeshake) {
          sizes.treeshaked = {
            rollup: rollupSize,
            webpack: webpackSize
          };
          infoString += formatMsg("treeshaked with rollup with production NODE_ENV and minified", rollupSize.code);
          infoString += formatMsg("  import statements size of it", rollupSize.import_statements);
          infoString += formatMsg("treeshaked with webpack in production mode", webpackSize.code);
        }

        const snapshotParams = {
          snapshotPath,
          name: outputName,
          data: sizes,
          threshold
        };

        if (shouldMatchSnapshot) {
          snapshot.match(snapshotParams);
        } else {
          if (shouldPrintInfo) {
            console.info(infoString);
          }

          snapshot.write(snapshotParams);
        }

        return null;
      });
    }

  };
};

exports.sizeSnapshot = sizeSnapshot;
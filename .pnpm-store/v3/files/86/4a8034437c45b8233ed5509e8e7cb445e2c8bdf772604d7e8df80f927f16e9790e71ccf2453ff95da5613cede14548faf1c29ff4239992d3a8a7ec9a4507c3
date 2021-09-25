"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.treeshakeWithRollup = void 0;

var _pluginReplace = _interopRequireDefault(require("@rollup/plugin-replace"));

var _rollup = require("rollup");

var _terser = require("terser");

var _acorn = require("acorn");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const inputName = "__size_snapshot_input__.js";
const bundleName = "__size_snapshot_bundle__.js";

const isReservedId = id => id.includes(inputName) || id.includes(bundleName);

const resolvePlugin = ({
  code
}) => ({
  resolveId(importee) {
    if (isReservedId(importee)) {
      return importee;
    }

    return null;
  },

  load(id) {
    if (id.includes(inputName)) {
      return `import {} from "/${bundleName}";`;
    }

    if (id.includes(bundleName)) {
      return code;
    }

    return null;
  }

});

const treeshakeWithRollup = code => {
  const config = {
    input: `/${inputName}`,

    onwarn() {},

    external: id => isReservedId(id) === false,
    plugins: [resolvePlugin({
      code
    }), (0, _pluginReplace.default)({
      "process.env.NODE_ENV": JSON.stringify("production")
    })]
  };
  return (0, _rollup.rollup)(config).then(bundle => bundle.generate({
    format: "es"
  })).then(({
    output
  }) => (0, _terser.minify)(output.find(chunkOrAsset => chunkOrAsset.code).code, {
    toplevel: true
  })).then(result => {
    const ast = (0, _acorn.parse)(result.code, {
      sourceType: "module"
    });
    const import_statements = ast.body // collect all toplevel import statements
    .filter(node => node.type === "ImportDeclaration") // endpos is the next character after node -> substract 1
    .map(node => node.end - node.start).reduce((acc, size) => acc + size, 0);
    return {
      code: result.code.length,
      import_statements
    };
  });
};

exports.treeshakeWithRollup = treeshakeWithRollup;
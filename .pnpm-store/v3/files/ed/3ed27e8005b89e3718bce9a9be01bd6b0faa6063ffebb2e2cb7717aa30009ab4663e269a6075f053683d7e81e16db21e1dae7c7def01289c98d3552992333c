// lib/npm/node-platform.ts
var fs = require("fs");
var os = require("os");
var path = require("path");
var ESBUILD_BINARY_PATH = process.env.ESBUILD_BINARY_PATH || ESBUILD_BINARY_PATH;
var knownWindowsPackages = {
  "win32 arm64 LE": "esbuild-windows-arm64",
  "win32 ia32 LE": "esbuild-windows-32",
  "win32 x64 LE": "esbuild-windows-64"
};
var knownUnixlikePackages = {
  "android arm64 LE": "esbuild-android-arm64",
  "darwin arm64 LE": "esbuild-darwin-arm64",
  "darwin x64 LE": "esbuild-darwin-64",
  "freebsd arm64 LE": "esbuild-freebsd-arm64",
  "freebsd x64 LE": "esbuild-freebsd-64",
  "openbsd x64 LE": "esbuild-openbsd-64",
  "linux arm LE": "esbuild-linux-arm",
  "linux arm64 LE": "esbuild-linux-arm64",
  "linux ia32 LE": "esbuild-linux-32",
  "linux mips64el LE": "esbuild-linux-mips64le",
  "linux ppc64 LE": "esbuild-linux-ppc64le",
  "linux x64 LE": "esbuild-linux-64",
  "sunos x64 LE": "esbuild-sunos-64"
};
function binPathForCurrentPlatform() {
  let pkg;
  let bin;
  let platformKey = `${process.platform} ${os.arch()} ${os.endianness()}`;
  if (platformKey in knownWindowsPackages) {
    pkg = knownWindowsPackages[platformKey];
    bin = `${pkg}/esbuild.exe`;
  } else if (platformKey in knownUnixlikePackages) {
    pkg = knownUnixlikePackages[platformKey];
    bin = `${pkg}/bin/esbuild`;
  } else {
    throw new Error(`Unsupported platform: ${platformKey}`);
  }
  try {
    bin = require.resolve(bin);
  } catch (e) {
    try {
      require.resolve(pkg);
    } catch (e2) {
      throw new Error(`The package "${pkg}" could not be found, and is needed by esbuild.

If you are installing esbuild with npm, make sure that you don't specify the
"--no-optional" flag. The "optionalDependencies" package.json feature is used
by esbuild to install the correct binary executable for your current platform.`);
    }
    throw e;
  }
  return bin;
}

// lib/npm/node-install.ts
var fs2 = require("fs");
var os2 = require("os");
var path2 = require("path");
var child_process = require("child_process");
var toPath = path2.join(__dirname, "bin", "esbuild");
function validateBinaryVersion(...command) {
  command.push("--version");
  const stdout = child_process.execFileSync(command.shift(), command).toString().trim();
  if (stdout !== "0.13.2") {
    throw new Error(`Expected ${JSON.stringify("0.13.2")} but got ${JSON.stringify(stdout)}`);
  }
}
function isYarn2OrAbove() {
  const { npm_config_user_agent } = process.env;
  if (npm_config_user_agent) {
    const match = npm_config_user_agent.match(/yarn\/(\d+)/);
    if (match && match[1]) {
      return parseInt(match[1], 10) >= 2;
    }
  }
  return false;
}
if (process.env.ESBUILD_BINARY_PATH) {
  const pathString = JSON.stringify(process.env.ESBUILD_BINARY_PATH);
  fs2.writeFileSync(toPath, `#!/usr/bin/env node
require('child_process').execFileSync(${pathString}, process.argv.slice(2), { stdio: 'inherit' });
`);
  const libMain = path2.join(__dirname, "lib", "main.js");
  const code = fs2.readFileSync(libMain, "utf8");
  fs2.writeFileSync(libMain, `var ESBUILD_BINARY_PATH = ${pathString};
${code}`);
  validateBinaryVersion("node", toPath);
} else if (os2.platform() !== "win32" && !isYarn2OrAbove()) {
  const bin = binPathForCurrentPlatform();
  try {
    fs2.unlinkSync(toPath);
    fs2.linkSync(bin, toPath);
  } catch (e) {
  }
  validateBinaryVersion(toPath);
} else {
  validateBinaryVersion("node", toPath);
}

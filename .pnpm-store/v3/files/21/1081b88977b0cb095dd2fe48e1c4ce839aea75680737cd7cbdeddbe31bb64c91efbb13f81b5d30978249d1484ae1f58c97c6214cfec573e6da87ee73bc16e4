import dedent from 'dedent';
import { onEndFileScope } from '../../adapter/dist/vanilla-extract-css-adapter.browser.esm.js';

let refCounter = 0;
const fileScopes = [];
function setFileScope(filePath, packageName) {
  refCounter = 0;
  fileScopes.unshift({
    filePath,
    packageName
  });
}
function endFileScope() {
  onEndFileScope(getFileScope());
  refCounter = 0;
  fileScopes.splice(0, 1);
}
function hasFileScope() {
  return fileScopes.length > 0;
}
function getFileScope() {
  if (fileScopes.length === 0) {
    throw new Error(dedent`
        Styles were unable to be assigned to a file. This is generally caused by one of the following:

        - You may have created styles outside of a '.css.ts' context
        - You may have incorrect configuration. See https://vanilla-extract.style/documentation/setup
      `);
  }

  return fileScopes[0];
}
function getAndIncrementRefCounter() {
  return refCounter++;
}

export { endFileScope, getAndIncrementRefCounter, getFileScope, hasFileScope, setFileScope };

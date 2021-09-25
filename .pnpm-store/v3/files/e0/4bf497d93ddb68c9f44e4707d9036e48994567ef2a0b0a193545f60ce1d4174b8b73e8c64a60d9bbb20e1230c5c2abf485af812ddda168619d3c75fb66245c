'use strict';

var _private = require('@vanilla-extract/private');
var cssesc = require('cssesc');
var adapter_dist_vanillaExtractCssAdapter = require('../adapter/dist/vanilla-extract-css-adapter.cjs.dev.js');
var cssWhat = require('css-what');
var dedent = require('dedent');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var cssesc__default = /*#__PURE__*/_interopDefault(cssesc);
var dedent__default = /*#__PURE__*/_interopDefault(dedent);

function forEach(obj, fn) {
  for (const key in obj) {
    fn(obj[key], key);
  }
}
function omit(obj, omitKeys) {
  let result = {};

  for (const key in obj) {
    if (omitKeys.indexOf(key) === -1) {
      result[key] = obj[key];
    }
  }

  return result;
}
function mapKeys(obj, fn) {
  let result = {};

  for (const key in obj) {
    result[fn(obj[key], key)] = obj[key];
  }

  return result;
}

function composeStylesIntoSet(set, ...classNames) {
  for (const className of classNames) {
    if (className.length === 0) {
      continue;
    }

    if (typeof className === 'string') {
      if (className.includes(' ')) {
        composeStylesIntoSet(set, ...className.trim().split(' '));
      } else {
        set.add(className);
      }
    } else if (Array.isArray(className)) {
      composeStylesIntoSet(set, ...className);
    }
  }
}

function dudupeAndJoinClassList(classNames) {
  const set = new Set();
  composeStylesIntoSet(set, ...classNames);
  return Array.from(set).join(' ');
}

function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

const validateSelector = (selector, targetClassName) => {
  const replaceTarget = () => {
    const targetRegex = new RegExp(`.${escapeRegex(cssesc__default['default'](targetClassName, {
      isIdentifier: true
    }))}`, 'g');
    return selector.replace(targetRegex, '&');
  };

  let selectorParts;

  try {
    selectorParts = cssWhat.parse(selector);
  } catch (err) {
    throw new Error(`Invalid selector: ${replaceTarget()}`);
  }

  selectorParts.forEach(tokens => {
    try {
      for (let i = tokens.length - 1; i >= -1; i--) {
        if (!tokens[i]) {
          throw new Error();
        }

        const token = tokens[i];

        if (token.type === 'child' || token.type === 'parent' || token.type === 'sibling' || token.type === 'adjacent' || token.type === 'descendant') {
          throw new Error();
        }

        if (token.type === 'attribute' && token.name === 'class' && token.value === targetClassName) {
          return; // Found it
        }
      }
    } catch (err) {
      throw new Error(dedent__default['default']`
        Invalid selector: ${replaceTarget()}
    
        Style selectors must target the '&' character (along with any modifiers), e.g. ${'`${parent} &`'} or ${'`${parent} &:hover`'}.
        
        This is to ensure that each style block only affects the styling of a single class.
        
        If your selector is targeting another class, you should move it to the style definition for that class, e.g. given we have styles for 'parent' and 'child' elements, instead of adding a selector of ${'`& ${child}`'}) to 'parent', you should add ${'`${parent} &`'} to 'child').
        
        If your selector is targeting something global, use the 'globalStyle' function instead, e.g. if you wanted to write ${'`& h1`'}, you should instead write 'globalStyle(${'`${parent} h1`'}, { ... })'
      `);
    }
  });
};

class ConditionalRuleset {
  /**
   * Stores information about where conditions must in relation to other conditions
   *
   * e.g. mobile -> tablet, desktop
   */
  constructor() {
    this.ruleset = [];
    this.precedenceLookup = new Map();
  }

  findOrCreateCondition(conditionQuery) {
    let targetCondition = this.ruleset.find(cond => cond.query === conditionQuery);

    if (!targetCondition) {
      // No target condition so create one
      targetCondition = {
        query: conditionQuery,
        rules: [],
        children: new ConditionalRuleset()
      };
      this.ruleset.push(targetCondition);
    }

    return targetCondition;
  }

  getConditionalRulesetByPath(conditionPath) {
    let currRuleset = this;

    for (const query of conditionPath) {
      const condition = currRuleset.findOrCreateCondition(query);
      currRuleset = condition.children;
    }

    return currRuleset;
  }

  addRule(rule, conditionQuery, conditionPath) {
    const ruleset = this.getConditionalRulesetByPath(conditionPath);
    const targetCondition = ruleset.findOrCreateCondition(conditionQuery);

    if (!targetCondition) {
      throw new Error('Failed to add conditional rule');
    }

    targetCondition.rules.push(rule);
  }

  addConditionPrecedence(conditionPath, conditionOrder) {
    const ruleset = this.getConditionalRulesetByPath(conditionPath);

    for (let i = 0; i < conditionOrder.length; i++) {
      var _ruleset$precedenceLo;

      const condition = conditionOrder[i];
      const conditionPrecedence = (_ruleset$precedenceLo = ruleset.precedenceLookup.get(condition)) !== null && _ruleset$precedenceLo !== void 0 ? _ruleset$precedenceLo : new Set();

      for (const lowerPrecedenceCondition of conditionOrder.slice(i + 1)) {
        conditionPrecedence.add(lowerPrecedenceCondition);
      }

      ruleset.precedenceLookup.set(condition, conditionPrecedence);
    }
  }

  isCompatible(incomingRuleset) {
    for (const [condition, orderPrecedence] of this.precedenceLookup.entries()) {
      for (const lowerPrecedenceCondition of orderPrecedence) {
        var _incomingRuleset$prec;

        if ((_incomingRuleset$prec = incomingRuleset.precedenceLookup.get(lowerPrecedenceCondition)) !== null && _incomingRuleset$prec !== void 0 && _incomingRuleset$prec.has(condition)) {
          return false;
        }
      }
    } // Check that children are compatible


    for (const {
      query,
      children
    } of incomingRuleset.ruleset) {
      const matchingCondition = this.ruleset.find(cond => cond.query === query);

      if (matchingCondition && !matchingCondition.children.isCompatible(children)) {
        return false;
      }
    }

    return true;
  }

  merge(incomingRuleset) {
    // Merge rulesets into one array
    for (const {
      query,
      rules,
      children
    } of incomingRuleset.ruleset) {
      const matchingCondition = this.ruleset.find(cond => cond.query === query);

      if (matchingCondition) {
        matchingCondition.rules.push(...rules);
        matchingCondition.children.merge(children);
      } else {
        this.ruleset.push({
          query,
          rules,
          children
        });
      }
    } // Merge order precedences


    for (const [condition, incomingOrderPrecedence] of incomingRuleset.precedenceLookup.entries()) {
      var _this$precedenceLooku;

      const orderPrecedence = (_this$precedenceLooku = this.precedenceLookup.get(condition)) !== null && _this$precedenceLooku !== void 0 ? _this$precedenceLooku : new Set();
      this.precedenceLookup.set(condition, new Set([...orderPrecedence, ...incomingOrderPrecedence]));
    }
  }
  /**
   * Merge another ConditionalRuleset into this one if they are compatible
   *
   * @returns true if successful, false if the ruleset is incompatible
   */


  mergeIfCompatible(incomingRuleset) {
    if (!this.isCompatible(incomingRuleset)) {
      return false;
    }

    this.merge(incomingRuleset);
    return true;
  }

  sort() {
    this.ruleset.sort((a, b) => {
      const aWeights = this.precedenceLookup.get(a.query);

      if (aWeights !== null && aWeights !== void 0 && aWeights.has(b.query)) {
        // A is higher precedence
        return -1;
      }

      const bWeights = this.precedenceLookup.get(b.query);

      if (bWeights !== null && bWeights !== void 0 && bWeights.has(a.query)) {
        // B is higher precedence
        return 1;
      }

      return 0;
    });
  }

  renderToArray() {
    // Sort rulesets according to required rule order
    this.sort();
    const arr = [];

    for (const {
      query,
      rules,
      children
    } of this.ruleset) {
      const selectors = {};

      for (const rule of rules) {
        selectors[rule.selector] = rule.rule;
      }

      Object.assign(selectors, ...children.renderToArray());
      arr.push({
        [query]: selectors
      });
    }

    return arr;
  }

}

const simplePseudoMap = {
  ':-moz-any-link': true,
  ':-moz-full-screen': true,
  ':-moz-placeholder': true,
  ':-moz-read-only': true,
  ':-moz-read-write': true,
  ':-ms-fullscreen': true,
  ':-ms-input-placeholder': true,
  ':-webkit-any-link': true,
  ':-webkit-full-screen': true,
  '::-moz-placeholder': true,
  '::-moz-progress-bar': true,
  '::-moz-range-progress': true,
  '::-moz-range-thumb': true,
  '::-moz-range-track': true,
  '::-moz-selection': true,
  '::-ms-backdrop': true,
  '::-ms-browse': true,
  '::-ms-check': true,
  '::-ms-clear': true,
  '::-ms-fill': true,
  '::-ms-fill-lower': true,
  '::-ms-fill-upper': true,
  '::-ms-reveal': true,
  '::-ms-thumb': true,
  '::-ms-ticks-after': true,
  '::-ms-ticks-before': true,
  '::-ms-tooltip': true,
  '::-ms-track': true,
  '::-ms-value': true,
  '::-webkit-backdrop': true,
  '::-webkit-input-placeholder': true,
  '::-webkit-progress-bar': true,
  '::-webkit-progress-inner-value': true,
  '::-webkit-progress-value': true,
  '::-webkit-resizer': true,
  '::-webkit-scrollbar-button': true,
  '::-webkit-scrollbar-corner': true,
  '::-webkit-scrollbar-thumb': true,
  '::-webkit-scrollbar-track-piece': true,
  '::-webkit-scrollbar-track': true,
  '::-webkit-scrollbar': true,
  '::-webkit-slider-runnable-track': true,
  '::-webkit-slider-thumb': true,
  '::after': true,
  '::backdrop': true,
  '::before': true,
  '::cue': true,
  '::first-letter': true,
  '::first-line': true,
  '::grammar-error': true,
  '::placeholder': true,
  '::selection': true,
  '::spelling-error': true,
  ':active': true,
  ':after': true,
  ':any-link': true,
  ':before': true,
  ':blank': true,
  ':checked': true,
  ':default': true,
  ':defined': true,
  ':disabled': true,
  ':empty': true,
  ':enabled': true,
  ':first': true,
  ':first-child': true,
  ':first-letter': true,
  ':first-line': true,
  ':first-of-type': true,
  ':focus': true,
  ':focus-visible': true,
  ':focus-within': true,
  ':fullscreen': true,
  ':hover': true,
  ':in-range': true,
  ':indeterminate': true,
  ':invalid': true,
  ':last-child': true,
  ':last-of-type': true,
  ':left': true,
  ':link': true,
  ':only-child': true,
  ':only-of-type': true,
  ':optional': true,
  ':out-of-range': true,
  ':placeholder-shown': true,
  ':read-only': true,
  ':read-write': true,
  ':required': true,
  ':right': true,
  ':root': true,
  ':scope': true,
  ':target': true,
  ':valid': true,
  ':visited': true
};
const simplePseudos = Object.keys(simplePseudoMap);
const simplePseudoLookup = simplePseudoMap;

const UNITLESS = {
  animationIterationCount: true,
  borderImage: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  gridArea: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnStart: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowStart: true,
  initialLetter: true,
  lineClamp: true,
  lineHeight: true,
  maxLines: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  WebkitLineClamp: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // svg properties
  fillOpacity: true,
  floodOpacity: true,
  maskBorder: true,
  maskBorderOutset: true,
  maskBorderSlice: true,
  maskBorderWidth: true,
  shapeImageThreshold: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

function dashify(str) {
  return str.replace(/([A-Z])/g, '-$1').replace(/^ms-/, '-ms-').toLowerCase();
}

const DOUBLE_SPACE = '  ';
const specialKeys = [...simplePseudos, '@media', '@supports', 'selectors'];

class Stylesheet {
  constructor(localClassNames, composedClassLists) {
    this.rules = [];
    this.conditionalRulesets = [new ConditionalRuleset()];
    this.fontFaceRules = [];
    this.keyframesRules = [];
    this.localClassNameRegex = localClassNames.length > 0 ? RegExp(`(${localClassNames.join('|')})`, 'g') : null; // Class list compositions should be priortized by Newer > Older
    // Therefore we reverse the array as they are added in sequence

    this.composedClassLists = composedClassLists.map(({
      identifier,
      classList
    }) => ({
      identifier,
      regex: RegExp(`(${classList})`, 'g')
    })).reverse();
  }

  processCssObj(root) {
    if (root.type === 'fontFace') {
      this.fontFaceRules.push(root.rule);
      return;
    }

    if (root.type === 'keyframes') {
      this.keyframesRules.push(root);
      return;
    } // Add main styles


    const mainRule = omit(root.rule, specialKeys);
    this.addRule({
      selector: root.selector,
      rule: mainRule
    });
    this.currConditionalRuleset = new ConditionalRuleset();
    this.transformMedia(root, root.rule['@media']);
    this.transformSupports(root, root.rule['@supports']);
    this.transformSimplePseudos(root, root.rule);
    this.transformSelectors(root, root.rule);
    const activeConditionalRuleset = this.conditionalRulesets[this.conditionalRulesets.length - 1];

    if (!activeConditionalRuleset.mergeIfCompatible(this.currConditionalRuleset)) {
      // Ruleset merge failed due to incompatibility. We now deopt by starting a fresh ConditionalRuleset
      this.conditionalRulesets.push(this.currConditionalRuleset);
    }
  }

  addConditionalRule(cssRule, conditions) {
    // Run `pixelifyProperties` before `transformVars` as we don't want to pixelify CSS Vars
    const rule = this.transformVars(this.transformContent(this.pixelifyProperties(cssRule.rule)));
    const selector = this.transformSelector(cssRule.selector);

    if (!this.currConditionalRuleset) {
      throw new Error(`Couldn't add conditional rule`);
    }

    const conditionQuery = conditions[conditions.length - 1];
    const parentConditions = conditions.slice(0, conditions.length - 1);
    this.currConditionalRuleset.addRule({
      selector,
      rule
    }, conditionQuery, parentConditions);
  }

  addRule(cssRule) {
    // Run `pixelifyProperties` before `transformVars` as we don't want to pixelify CSS Vars
    const rule = this.transformVars(this.transformContent(this.pixelifyProperties(cssRule.rule)));
    const selector = this.transformSelector(cssRule.selector);
    this.rules.push({
      selector,
      rule
    });
  }

  pixelifyProperties(cssRule) {
    forEach(cssRule, (value, key) => {
      if (typeof value === 'number' && value !== 0 && !UNITLESS[key]) {
        // @ts-expect-error Any ideas?
        cssRule[key] = `${value}px`;
      }
    });
    return cssRule;
  }

  transformVars({
    vars,
    ...rest
  }) {
    if (!vars) {
      return rest;
    }

    return { ...mapKeys(vars, (_value, key) => _private.getVarName(key)),
      ...rest
    };
  }

  transformContent({
    content,
    ...rest
  }) {
    if (typeof content === 'undefined') {
      return rest;
    } // Handle fallback arrays:


    const contentArray = Array.isArray(content) ? content : [content];
    return {
      content: contentArray.map(value => // This logic was adapted from Stitches :)
      value && (value.includes('"') || value.includes("'") || /^([A-Za-z\-]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)(\s|$)/.test(value)) ? value : `"${value}"`),
      ...rest
    };
  }

  transformSelector(selector) {
    // Map class list compositions to single identifiers
    let transformedSelector = selector;

    for (const {
      identifier,
      regex
    } of this.composedClassLists) {
      transformedSelector = transformedSelector.replace(regex, () => {
        adapter_dist_vanillaExtractCssAdapter.markCompositionUsed(identifier);
        return identifier;
      });
    }

    return this.localClassNameRegex ? transformedSelector.replace(this.localClassNameRegex, (_, className, index) => {
      if (index > 0 && transformedSelector[index - 1] === '.') {
        return className;
      }

      return `.${cssesc__default['default'](className, {
        isIdentifier: true
      })}`;
    }) : transformedSelector;
  }

  transformSelectors(root, rule, conditions) {
    forEach(rule.selectors, (selectorRule, selector) => {
      if (root.type !== 'local') {
        throw new Error(`Selectors are not allowed within ${root.type === 'global' ? '"globalStyle"' : '"selectors"'}`);
      }

      const transformedSelector = this.transformSelector(selector.replace(RegExp('&', 'g'), root.selector));
      validateSelector(transformedSelector, root.selector);
      const rule = {
        selector: transformedSelector,
        rule: omit(selectorRule, specialKeys)
      };

      if (conditions) {
        this.addConditionalRule(rule, conditions);
      } else {
        this.addRule(rule);
      }

      const selectorRoot = {
        type: 'selector',
        selector: transformedSelector,
        rule: selectorRule
      };
      this.transformSupports(selectorRoot, selectorRule['@supports'], conditions);
      this.transformMedia(selectorRoot, selectorRule['@media'], conditions);
    });
  }

  transformMedia(root, rules, parentConditions = []) {
    if (rules) {
      var _this$currConditional;

      (_this$currConditional = this.currConditionalRuleset) === null || _this$currConditional === void 0 ? void 0 : _this$currConditional.addConditionPrecedence(parentConditions, Object.keys(rules).map(query => `@media ${query}`));
      forEach(rules, (mediaRule, query) => {
        const conditions = [...parentConditions, `@media ${query}`];
        this.addConditionalRule({
          selector: root.selector,
          rule: omit(mediaRule, specialKeys)
        }, conditions);

        if (root.type === 'local') {
          this.transformSimplePseudos(root, mediaRule, conditions);
          this.transformSelectors(root, mediaRule, conditions);
        }

        this.transformSupports(root, mediaRule['@supports'], conditions);
      });
    }
  }

  transformSupports(root, rules, parentConditions = []) {
    if (rules) {
      var _this$currConditional2;

      (_this$currConditional2 = this.currConditionalRuleset) === null || _this$currConditional2 === void 0 ? void 0 : _this$currConditional2.addConditionPrecedence(parentConditions, Object.keys(rules).map(query => `@supports ${query}`));
      forEach(rules, (supportsRule, query) => {
        const conditions = [...parentConditions, `@supports ${query}`];
        this.addConditionalRule({
          selector: root.selector,
          rule: omit(supportsRule, specialKeys)
        }, conditions);

        if (root.type === 'local') {
          this.transformSimplePseudos(root, supportsRule, conditions);
          this.transformSelectors(root, supportsRule, conditions);
        }

        this.transformMedia(root, supportsRule['@media'], conditions);
      });
    }
  }

  transformSimplePseudos(root, rule, conditions) {
    for (const key of Object.keys(rule)) {
      // Process simple pseudos
      if (simplePseudoLookup[key]) {
        if (root.type !== 'local') {
          throw new Error(`Simple pseudos are not valid in ${root.type === 'global' ? '"globalStyle"' : '"selectors"'}`);
        }

        if (conditions) {
          this.addConditionalRule({
            selector: `${root.selector}${key}`,
            rule: rule[key]
          }, conditions);
        } else {
          this.addRule({
            conditions,
            selector: `${root.selector}${key}`,
            rule: rule[key]
          });
        }
      }
    }
  }

  toCss() {
    const css = []; // Render font-face rules

    for (const fontFaceRule of this.fontFaceRules) {
      css.push(renderCss({
        '@font-face': fontFaceRule
      }));
    } // Render keyframes


    for (const keyframe of this.keyframesRules) {
      css.push(renderCss({
        [`@keyframes ${keyframe.name}`]: keyframe.rule
      }));
    } // Render unconditional rules


    for (const rule of this.rules) {
      css.push(renderCss({
        [rule.selector]: rule.rule
      }));
    } // Render conditional rules


    for (const conditionalRuleset of this.conditionalRulesets) {
      for (const conditionalRule of conditionalRuleset.renderToArray()) {
        css.push(renderCss(conditionalRule));
      }
    }

    return css.filter(Boolean);
  }

}

function renderCss(v, indent = '') {
  const rules = [];

  for (const key of Object.keys(v)) {
    const value = v[key];

    if (value && Array.isArray(value)) {
      rules.push(...value.map(v => renderCss({
        [key]: v
      }, indent)));
    } else if (value && typeof value === 'object') {
      const isEmpty = Object.keys(value).length === 0;

      if (!isEmpty) {
        rules.push(`${indent}${key} {\n${renderCss(value, indent + DOUBLE_SPACE)}\n${indent}}`);
      }
    } else {
      rules.push(`${indent}${key.startsWith('--') ? key : dashify(key)}: ${value};`);
    }
  }

  return rules.join('\n');
}

function transformCss({
  localClassNames,
  cssObjs,
  composedClassLists
}) {
  const stylesheet = new Stylesheet(localClassNames, composedClassLists);

  for (const root of cssObjs) {
    stylesheet.processCssObj(root);
  }

  return stylesheet.toCss();
}

exports.dudupeAndJoinClassList = dudupeAndJoinClassList;
exports.transformCss = transformCss;

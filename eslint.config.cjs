// Inlined Mapbox ESLint config (flat format)
// Merge of mapbox `base.js` + `node.js` with local overrides from .eslintrc
const base = require('./node_modules/@mapbox/eslint-config-mapbox/base');
const node = require('./node_modules/@mapbox/eslint-config-mapbox/node');

const localRules = {
  'space-in-parens': ['error', 'never'],
  'space-before-blocks': 'error',
  'rest-spread-spacing': ['error', 'never'],
  'space-before-function-paren': ['error', { anonymous: 'never', named: 'never', asyncArrow: 'always' }],
  'comma-spacing': 'error',
  'key-spacing': 'error',
  'no-shadow': 'error',
  'no-constant-condition': ['error', { checkLoops: false }]
};

const mergedRules = Object.assign({}, base.rules || {}, node.rules || {}, localRules);

module.exports = [
  {
    // base language options
    languageOptions: {
      parserOptions: Object.assign({}, base.parserOptions || {}, node.parserOptions || {}),
      ecmaVersion: (base.parserOptions && base.parserOptions.ecmaVersion) || 2020,
      env: Object.assign({}, base.env || {}, node.env || {})
    }
  },
  {
    plugins: (node.plugins || []).slice(),
    rules: mergedRules
  }
];

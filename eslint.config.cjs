// Inlined Mapbox ESLint config (flat format)
// Merge of mapbox `base.js` + `node.js` with local overrides from .eslintrc
const base = require('./node_modules/@mapbox/eslint-config-mapbox/base');
const node = require('./node_modules/@mapbox/eslint-config-mapbox/node');
const globalsList = require('globals');

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
    languageOptions: (function() {
      const parserOptions = Object.assign({}, base.parserOptions || {}, node.parserOptions || {});
      if (!parserOptions.ecmaVersion) parserOptions.ecmaVersion = 2020;

      // convert `env` into `languageOptions.globals` using the `globals` package
      const mergedEnv = Object.assign({}, base.env || {}, node.env || {});
      const mergedGlobals = {};
      try {
        Object.keys(mergedEnv).forEach((envName) => {
          if (!mergedEnv[envName]) return;
          const g = globalsList[envName];
          if (g && typeof g === 'object') {
            Object.assign(mergedGlobals, g);
          }
        });
      } catch (e) {
        // ignore if globals package not available
      }

      return {
        parserOptions,
        globals: mergedGlobals
      };
    })()
  },
  {
    // Convert plugin array into flat-config plugins object: { name: plugin }
    plugins: (function() {
      const pluginsObj = {};
      try {
        // eslint-plugin-node is required by the mapbox node config
        // require it here and assign to the "node" key
        // eslint-disable-next-line import/no-extraneous-dependencies
        const nodePlugin = require('eslint-plugin-node');
        pluginsObj.node = nodePlugin;
      } catch (e) {
        // if plugin not installed, leave plugins object empty; lint will error
      }
      return pluginsObj;
    })(),
    rules: mergedRules
  }
];

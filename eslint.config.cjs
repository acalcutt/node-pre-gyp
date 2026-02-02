const js = require("@eslint/js");
const globals = require("globals");
const nodePlugin = require("eslint-plugin-n");

module.exports = [
    js.configs.recommended,
    {
        files: ["**/*.js", "**/*.cjs", "**/*.mjs", "bin/node-pre-gyp"],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "commonjs",
            globals: {
                ...globals.node,
                ...globals.es6,
            },
        },
        plugins: {
            n: nodePlugin,
        },
        rules: {
            // Mapbox Base Rules
            'no-var': 'error',
            'prefer-const': 'error',
            'eqeqeq': ['error', 'smart'],
            'no-confusing-arrow': ['error', { allowParens: false }],
            'no-extend-native': 'error',
            'no-use-before-define': ['error', 'nofunc'],
            'strict': 'error',
            'no-console': 'off',
            'arrow-parens': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'comma-dangle': ['error', 'never'],
            'computed-property-spacing': ['error', 'never'],
            'eol-last': 'error',
            'no-mixed-spaces-and-tabs': 'error',
            'no-spaced-func': 'error', // Deprecated, but in mapbox config. Replaced by function-call-argument-newline or similar? No, space-before-function-paren handles some. 'no-spaced-func' is deprecated for 'func-call-spacing'. I will use 'func-call-spacing' or keep it if eslint 9 still supports it aliased. Eslint 9 might drop deprecated rules. 'no-spaced-func' was deprecated in v3.3.0. It is 'func-call-spacing'.
            'no-trailing-spaces': 'error',
            'object-curly-spacing': ['error', 'always'],
            'prefer-arrow-callback': 'error',
            'quotes': ['error', 'single', 'avoid-escape'],
            'semi': ['error', 'always'],
            'space-infix-ops': 'error',
            'spaced-comment': ['error', 'always'],
            'keyword-spacing': ['error', { before: true, after: true }],
            'template-curly-spacing': ['error', 'never'],
            'semi-spacing': 'error',
            'indent': ['error', 2, { 'SwitchCase': 1 }],

            // Replacement for deprecated no-spaced-func
            'func-call-spacing': 'error',

            // Mapbox Node Rules
            'n/no-unsupported-features/es-builtins': ['error'],
            'n/no-unsupported-features/es-syntax': ['error'],
            'n/no-unsupported-features/node-builtins': ['error'],
            'n/no-missing-require': 'error',

            // Project Custom Rules (overrides)
            "space-in-parens": [ "error", "never" ],
            "space-before-blocks": "error",
            "rest-spread-spacing": [ "error", "never" ],
            "space-before-function-paren": [ "error", { "anonymous": "never", "named": "never", "asyncArrow": "always" } ],
            "comma-spacing": "error",
            "key-spacing": "error",
            "no-shadow": "error",
            "no-constant-condition": [ "error", { "checkLoops": false } ]
        },
    },
    {
        ignores: ["node_modules/", "coverage/", "build/", "dist/", "**/*.min.js", "test/app*/"],
    }
];

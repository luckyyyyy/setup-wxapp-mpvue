// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    sourceType: 'module'
  },
  env: {
    browser: false,
    node: true,
    es6: true
  },
  extends: [
    'plugin:vue/recommended', // or 'plugin:vue/base'
    'airbnb-base',
  ],
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'html/html-extensions': ['.html'],  // don't include .vue
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    'camelcase': 0,
    // 'id-match': ['error', '^(\\${0,1}[a-z]+[a-zA-Z_]*||[A-Z_]+||[pk][12])$', {
    //   'onlyDeclarations': true,
    // }],
    'arrow-body-style': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'prefer-promise-reject-errors': 0,
    'no-return-assign': 0,
    "no-mixed-operators": 0,
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'max-len': 0,
    'no-unused-vars': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // vue lint configs
    'vue/attribute-hyphenation': ['error', 'always'],
    'vue/html-end-tags': 'error',
    'vue/html-quotes': ['error', 'double'],
    'vue/html-self-closing': ['error', {
      'html': {
        'normal': 'never',
        'void': 'never',
        'component': 'never'
      },
      'svg': 'always',
      'math': 'always',
    }],
    'vue/max-attributes-per-line': [2, {
      'singleline': 10,
      'multiline': {
        'max': 2,
        'allowFirstLine': false
      },
    }],
    'vue/mustache-interpolation-spacing': ['error', 'always'],
    'vue/name-property-casing': ['error', 'kebab-case'],
    'vue/no-async-in-computed-properties': 'error',
    'vue/no-confusing-v-for-v-if': 'error',
    'vue/no-dupe-keys': 'error',
    'vue/no-duplicate-attributes': ['error', {
      allowCoexistClass:  true,
      allowCoexistStyle: true,
    }],
    'vue/no-multi-spaces': 'error',
    'vue/no-parsing-error': 'error',
    'vue/no-reserved-keys': ['error', {
      'reserved': ['$el', '$nextTick', '$route', '$router', 'asyncData'],
      'groups': [],
    }],
    'vue/no-shared-component-data': 'error',
    'vue/no-side-effects-in-computed-properties': 'error',
    'vue/no-template-key': 'error',
    'vue/no-textarea-mustache': 'error',
    'vue/order-in-components': 0,
    'vue/attributes-order': 0,
    'vue/html-self-closing': 0,
    // 'vue/order-in-components': ['error', {
    //   'order': [
    //     ['name', 'delimiters', 'functional', 'model'],
    //     ['components', 'directives', 'filters'],
    //     ['parent', 'mixins', 'extends', 'provide', 'inject'],
    //     'el',
    //     'template',
    //     'props',
    //     'propsData',
    //     'data',
    //     'computed',
    //     'watch',
    //     'asyncData',
    //     'onWechatReady',
    //     'LIFECYCLE_HOOKS',
    //     'methods',
    //     'render',
    //     'renderError'
    //   ],
    // }],
    'vue/require-component-is': 'error',
    // 'vue/require-default-prop': 'error',
    'vue/require-prop-types': 'error',
    'vue/require-render-return': 'error',
    'vue/require-v-for-key': 'error',
    'vue/require-valid-default-prop': 'error',
    'vue/return-in-computed-property': 'error',
    'vue/this-in-template': ['error', 'never'],
    'vue/v-bind-style': ['error', 'shorthand'],
    'vue/v-on-style': ['error', 'shorthand'],
    'vue/valid-template-root': 'error',
    'vue/valid-v-bind': 'error',
    'vue/valid-v-cloak': 'error',
    'vue/valid-v-else-if': 'error',
    'vue/valid-v-else': 'error',
    'vue/valid-v-for': 'error',
    'vue/valid-v-html': 'error',
    'vue/valid-v-if': 'error',
    'vue/valid-v-model': 'error',
    'vue/valid-v-on': 'error',
    'vue/valid-v-once': 'error',
    'vue/valid-v-pre': 'error',
    'vue/valid-v-show': 'error',
    'vue/valid-v-text': 'error',

    // 'vue/html-indent': ['error', 2, {
    //   'attribute': 1,
    //   'closeBracket': 0,
    //   'ignores': []
    // }],
  },
  globals: {
    App: true,
    Page: true,
    wx: true,
    getApp: true,
    getPage: true
  }
}

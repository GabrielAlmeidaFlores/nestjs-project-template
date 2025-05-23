const globals = require('globals');
const tsparser = require('@typescript-eslint/parser');

const coreConfig = require('./eslint/core/index.js');
const customConfig = require('./eslint/custom/index.js');

const plugins = {
  '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
  import: require('eslint-plugin-import'),
  prettier: require('eslint-plugin-prettier'),
  ...customConfig.plugin,
};

module.exports = [
  {
    files: ['{src,apps,libs,test}/**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    plugins,
    rules: {
      'prettier/prettier': 'error',
      ...coreConfig.rules,
      ...customConfig.rules,
    },
  },
  {
    files: ['{src,apps,libs,test}/**/*.ts'],
    rules: {
      ...plugins['@typescript-eslint'].configs.recommended.rules,
      ...plugins['@typescript-eslint'].configs[
        'recommended-requiring-type-checking'
      ].rules,
      ...plugins['@typescript-eslint'].configs.strict.rules,
      ...plugins.import.configs.recommended.rules,
      ...plugins.import.configs.typescript.rules,
    },
  },
];

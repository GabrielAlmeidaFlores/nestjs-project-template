const lib = require('./lib/index.js')

module.exports = {
  plugin: {
    ...lib.plugin,
    'local-rule': {
      rules: {
        'require-build-method-decorator': require('./require-build-method-decorator.js'),
      },
    },
  },
  rules: {
    ...lib.rules,
    'local-rule/require-build-method-decorator': 'error',
  },
};

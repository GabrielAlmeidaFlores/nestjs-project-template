module.exports = {
  plugin: {
    'local-rule': {
      rules: {
        'require-build-method-decorator': require('./require-build-method-decorator.js'),
      },
    },
  },
  rules: {
    'local-rule/require-build-method-decorator': 'error',
  },
};

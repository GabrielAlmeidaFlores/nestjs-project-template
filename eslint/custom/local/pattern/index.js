module.exports = {
  plugin: {
    'pattern-rule': {
      rules: {
        'require-build-method-decorator': require('./require-build-method-decorator.js'),
        'require-dto-decorator': require('./require-dto-decorator.js'),
      },
    },
  },
  rules: {
    'pattern-rule/require-build-method-decorator': 'error',
    'pattern-rule/require-dto-decorator': 'error',
  },
};

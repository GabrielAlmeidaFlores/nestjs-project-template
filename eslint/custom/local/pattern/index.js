module.exports = {
  plugin: {
    'pattern-rule': {
      rules: {
        'require-dto-decorator': require('./require-dto-decorator.js'),
        'require-valid-error-constructor': require('./require-valid-error-constructor.js'),
        'require-valid-bounded-context-link': require('./require-valid-bounded-context-link.js'),
      },
    },
  },
  rules: {
    'pattern-rule/require-dto-decorator': 'error',
    'pattern-rule/require-valid-error-constructor': 'error',
    'pattern-rule/require-valid-bounded-context-link': 'error',
  },
};

module.exports = {
  plugin: {
    'pattern-rule': {
      rules: {
        'require-dto-decorator': require('./require-dto-decorator.js'),
        'require-valid-error-constructor': require('./require-valid-error-constructor.js'),
        'ddd-consistent-nullable-properties': require('./ddd-consistent-nullable-properties.js'),
        'require-matching-dto-property-decorators': require('./require-matching-dto-property-decorators.js'),
        'require-dto-to-extend-base-buildable-object': require('./require-dto-to-extend-base-buildable-object.js'),
        'require-dto-required-to-match-optional': require('./require-dto-required-to-match-optional.js')
      },
    },
  },
  rules: {
    'pattern-rule/require-dto-decorator': 'error',
    'pattern-rule/require-valid-error-constructor': 'error',
    'pattern-rule/ddd-consistent-nullable-properties':
      'error',
    'pattern-rule/require-matching-dto-property-decorators': 'error',
    'pattern-rule/require-dto-to-extend-base-buildable-object': 'error',
    'pattern-rule/require-dto-required-to-match-optional': 'error'
  },
};

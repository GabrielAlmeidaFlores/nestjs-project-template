module.exports = {
  plugin: {
    'pattern-rule': {
      rules: {
        'require-dto-decorator': require('./require-dto-decorator.js'),
        'require-valid-error-constructor': require('./require-valid-error-constructor.js'),
        'require-valid-entity-relation': require('./require-valid-entity-relation.js'),
        'require-ddd-entity-nullable-properties-to-be-optional': require('./require-ddd-entity-nullable-properties-to-be-optional.js'),
      },
    },
  },
  rules: {
    'pattern-rule/require-dto-decorator': 'error',
    'pattern-rule/require-valid-error-constructor': 'error',
    'pattern-rule/require-valid-entity-relation': 'error',
    'pattern-rule/require-ddd-entity-nullable-properties-to-be-optional':
      'error',
  },
};

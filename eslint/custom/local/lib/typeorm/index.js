module.exports = {
    plugin: {
      'typeorm-rule': {
        rules: {
          'require-nullable-type-on-nullable-column': require('./require-nullable-type-on-nullable-column.js'),
          'restrict-column-type': require('./restrict-column-type.js'),
          'restrict-non-typeorm-entity-references': require('./restrict-non-typeorm-entity-references.js'),
        },
      },
    },
    rules: {
      'typeorm-rule/require-nullable-type-on-nullable-column': 'error',
      'typeorm-rule/restrict-column-type': 'error',
      'typeorm-rule/restrict-non-typeorm-entity-references': 'error',
    },
  };
  
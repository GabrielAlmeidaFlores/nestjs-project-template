module.exports = {
    plugin: {
      'typeorm-rule': {
        rules: {
          'require-nullable-type-on-nullable-column': require('./require-nullable-type-on-nullable-column.js'),
          'restrict-column-type': require('./restrict-column-type.js'),
          'forbid-non-typeorm-entity-references': require('./forbid-non-typeorm-entity-references.js'),
        },
      },
    },
    rules: {
      'typeorm-rule/require-nullable-type-on-nullable-column': 'error',
      'typeorm-rule/restrict-column-type': 'error',
      'typeorm-rule/forbid-non-typeorm-entity-references': 'error',
    },
  };
  
module.exports = {
  plugin: {
    'typeorm-rule': {
      rules: {
        'require-nullable-type-on-nullable-column': require('./require-nullable-type-on-nullable-column.js'),
        'restrict-column-type': require('./restrict-column-type.js'),
        'restrict-non-typeorm-entity-references': require('./restrict-non-typeorm-entity-references.js'),
        'restrict-typeorm-relation-type': require('./restrict-typeorm-relation-type.js'),
        'require-column-name-and-match': require('./require-column-name-and-match.js'),
        'require-date-transformer-for-date-columns': require('./require-date-transformer-for-date-columns.js'),
      },
    },
  },
  rules: {
    'typeorm-rule/require-nullable-type-on-nullable-column': 'error',
    'typeorm-rule/restrict-column-type': 'error',
    'typeorm-rule/restrict-non-typeorm-entity-references': 'error',
    'typeorm-rule/restrict-typeorm-relation-type': 'error',
    'typeorm-rule/require-column-name-and-match': 'error',
    'typeorm-rule/require-date-transformer-for-date-columns': 'error',
  },
};

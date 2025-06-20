module.exports = {
    plugin: {
      'typeorm-rule': {
        rules: {
          'require-nullable-type-on-nullable-column': require('./require-nullable-type-on-nullable-column.js'),
          'restrict-column-type': require('./restrict-column-type.js'),
          'require-bidirectional-typeorm-relation': require('./require-bidirectional-typeorm-relation.js'),
        },
      },
    },
    rules: {
      'typeorm-rule/require-nullable-type-on-nullable-column': 'error',
      'typeorm-rule/restrict-column-type': 'error',
      'typeorm-rule/require-bidirectional-typeorm-relation': 'error',
    },
  };
  
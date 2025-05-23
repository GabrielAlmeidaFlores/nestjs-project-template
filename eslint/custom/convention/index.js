module.exports = {
  plugin: {
    'convention-rule': {
      rules: {
        'require-class-type-property': require('./require-class-type-property.js'),
        'require-kebab-case-base-filename': require('./require-kebab-case-base-filename.js'),
        'require-class-property-initialization': require("./require-class-property-initialization.js"), 
        'restrict-import': require('./restrict-import.js'),
        'restrict-export': require('./restrict-export.js'),
        'restrict-name-suffix': require('./restrict-name-suffix.js'),
        'restrict-error-name-suffix': require('./restrict-error-name-suffix.js'),
        'restrict-constructor-parameter-order': require('./restrict-constructor-parameter-order.js'),
      },
    },
  },
  rules: {
    'convention-rule/require-kebab-case-base-filename': 'error',
    'convention-rule/require-class-type-property': [
      'error',
      { propertyName: '_type' },
    ],
    'convention-rule/require-class-property-initialization': 'error',
    'convention-rule/restrict-export': 'error',
    'convention-rule/restrict-import': 'error',
    'convention-rule/restrict-name-suffix': 'error',
    'convention-rule/restrict-error-name-suffix': 'error',
    'convention-rule/restrict-constructor-parameter-order': 'error',
  },
};

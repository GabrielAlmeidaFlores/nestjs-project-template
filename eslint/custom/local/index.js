const lib = require('./lib/index.js');
const pattern = require('./pattern/index.js');

module.exports = {
  plugin: {
    ...lib.plugin,
    ...pattern.plugin,
  },
  rules: {
    ...lib.rules,
    ...pattern.rules,
  },
};

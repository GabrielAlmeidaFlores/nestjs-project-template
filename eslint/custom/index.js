const convention = require('./convention/index.js');
const local = require('./local/index.js');

module.exports = {
  plugin: {
    ...convention.plugin,
    ...local.plugin,
  },
  rules: {
    ...convention.rules,
    ...local.rules,
  },
};

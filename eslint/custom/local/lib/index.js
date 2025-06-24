const typeorm = require('./typeorm/index.js');

module.exports = {
  plugin: {
    ...typeorm.plugin,
  },
  rules: {
    ...typeorm.rules,
  },
};

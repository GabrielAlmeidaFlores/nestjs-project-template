const javascriptRule = require('./javascript.js');
const typescriptRule = require('./typescript.js');
const importRules = require('./import.js');

module.exports = {
  rules: {
    ...javascriptRule,
    ...typescriptRule,
    ...importRules,
  },
};

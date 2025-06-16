const { ESLintUtils } = require('@typescript-eslint/utils');
const path = require('path');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'enforce-kebab-case-filenames',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require kebab-case for base filenames (before dot suffixes), allowing optional leading underscore',
      category: 'Stylistic Issues',
      recommended: true,
      suggestion: false,
    },
    schema: [],
    messages: {
      kebabCase:
        'Filename base "{{name}}" should be in kebab-case (can optionally start with "_").',
    },
  },

  defaultOptions: [],

  create(context) {
    const filenameWithExt = context.getFilename();
    const fullFilename = path.basename(filenameWithExt);

    const baseName = fullFilename.split('.')[0];

    const kebabCaseWithOptionalUnderscore = /^_?[a-z0-9]+(-[a-z0-9]+)*$/;

    if (!kebabCaseWithOptionalUnderscore.test(baseName)) {
      context.report({
        loc: { line: 1, column: 0 },
        messageId: 'kebabCase',
        data: { name: baseName },
      });
    }

    return {};
  },
});

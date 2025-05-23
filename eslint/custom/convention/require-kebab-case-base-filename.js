const path = require('path');

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require kebab-case for base filenames (before dot suffixes), allowing optional leading underscore.',
      recommended: true,
    },
    schema: [],
    messages: {
      kebabCase:
        'Filename base "{{name}}" should be in kebab-case (can optionally start with "_").',
    },
  },

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
};

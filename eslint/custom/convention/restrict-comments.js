const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow all comments (line and block)',
      category: 'Stylistic Issues',
      recommended: true,
      suggestion: false,
    },
    schema: [],
    messages: {
      noComments: 'Comments are not allowed.',
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode();

    return {
      Program() {
        const comments = sourceCode.getAllComments();

        for (const comment of comments) {
          context.report({
            loc: comment.loc,
            messageId: 'noComments',
          });
        }
      },
    };
  },
});

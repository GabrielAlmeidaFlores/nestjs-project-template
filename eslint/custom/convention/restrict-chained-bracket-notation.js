const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow chained property access using bracket notation (e.g., object["a"]["b"])',
      category: 'Best Practices',
      recommended: true,
      suggestion: false,
    },
    schema: [],
    messages: {
      noChainedBracket:
        'Avoid chained property access using bracket notation. Use dot notation or assign intermediate objects.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      MemberExpression(node) {
        if (
          node.computed &&
          node.object.type === 'MemberExpression' &&
          node.object.computed
        ) {
          context.report({
            node,
            messageId: 'noChainedBracket',
          });
        }
      },
    };
  },
});

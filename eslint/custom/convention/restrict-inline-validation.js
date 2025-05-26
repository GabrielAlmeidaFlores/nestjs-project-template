const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow inline validations (comparisons, logical expressions, test() calls) in control flow, function args, arrays, and objects. Require encapsulation in a named variable.',
      category: 'Best Practices',
      recommended: true,
      suggestion: false,
    },
    schema: [],
    messages: {
      noInlineValidation:
        'Inline validation logic must be assigned to a variable before use.',
    },
  },
  defaultOptions: [],
  create(context) {
    const disallowedTypes = new Set([
      'BinaryExpression',
      'LogicalExpression',
      'UnaryExpression',
      'CallExpression',
    ]);

    function isDisallowedTest(node) {
      return disallowedTypes.has(node.type);
    }

    function reportIfDisallowed(node) {
      if (isDisallowedTest(node)) {
        context.report({ node, messageId: 'noInlineValidation' });
      }
    }

    return {
      IfStatement(node) {
        reportIfDisallowed(node.test);
      },
      WhileStatement(node) {
        reportIfDisallowed(node.test);
      },
      DoWhileStatement(node) {
        reportIfDisallowed(node.test);
      },
      ForStatement(node) {
        if (node.test) reportIfDisallowed(node.test);
      },
      ConditionalExpression(node) {
        reportIfDisallowed(node.test);
      },

      ArrayExpression(node) {
        for (const element of node.elements) {
          if (element) reportIfDisallowed(element);
        }
      },

      Property(node) {
        if (node.value && node.value !== node.key) {
          reportIfDisallowed(node.value);
        }
      },

      CallExpression(node) {
        for (const arg of node.arguments) {
          reportIfDisallowed(arg);
        }
      },
    };
  },
});

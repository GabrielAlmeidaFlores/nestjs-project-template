const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: 'problem',
    docs: {
      description:
        'Restrict inline logic expressions in control flow, function arguments, object properties, or arrays. Require extraction into named variables to improve clarity and maintainability',
      category: 'Best Practices',
      recommended: true,
      suggestion: false,
    },
    schema: [],
    messages: {
      noInlineLogic:
        'Avoid inline logic. Assign the result to a clearly named variable first.',
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
      if (
        node.type === 'UnaryExpression' &&
        node.operator === '!' &&
        node.argument.type === 'Identifier'
      ) {
        return false;
      }

      return disallowedTypes.has(node.type);
    }

    function isInsideDecorator(node) {
      let current = node.parent;
      while (current) {
        if (current.type === 'Decorator') return true;
        current = current.parent;
      }
      return false;
    }

    function isInLoopCondition(node) {
      const parent = node.parent;
      return (
        (parent?.type === 'ForStatement' && parent.test === node) ||
        (parent?.type === 'WhileStatement' && parent.test === node) ||
        (parent?.type === 'DoWhileStatement' && parent.test === node)
      );
    }

    function reportIfDisallowed(node) {
      if (
        node.parent &&
        node.parent.type === 'VariableDeclarator' &&
        node.parent.init === node
      ) {
        return;
      }

      if (isInsideDecorator(node)) {
        return;
      }

      if (isInLoopCondition(node)) {
        return;
      }

      if (isDisallowedTest(node)) {
        context.report({ node, messageId: 'noInlineLogic' });
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
        if (isInsideDecorator(node)) return;

        for (const arg of node.arguments) {
          if (disallowedTypes.has(arg.type)) {
            reportIfDisallowed(arg);
          }
        }
      },
    };
  },
});

const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'no-inline-logic-expressions',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow inline logic expressions (binary, logical, unary) in control flow, object values, and array literals. Requires assigning to a variable first.',
      category: 'Best Practices',
      recommended: true,
      suggestion: false,
    },
    schema: [],
    messages: {
      noInlineLogic: 'Avoid inline logic. Assign the result to a clearly named variable first.',
    },
  },
  defaultOptions: [],
  create(context) {
    const disallowedTypes = new Set(['BinaryExpression', 'LogicalExpression', 'UnaryExpression']);

    function isDisallowed(node) {
      return (
        disallowedTypes.has(node.type) &&
        !(node.type === 'UnaryExpression' && node.operator === '!' && node.argument.type === 'Identifier')
      );
    }

    function isInsideDecorator(node) {
      let current = node.parent;
      while (current) {
        if (current.type === 'Decorator') return true;
        current = current.parent;
      }
      return false;
    }

    function isSafeVariableInit(node) {
      return node.parent?.type === 'VariableDeclarator' && node.parent.init === node;
    }

    function isLoopTest(node) {
      return (
        (node.parent?.type === 'ForStatement' && node.parent.test === node) ||
        (node.parent?.type === 'WhileStatement' && node.parent.test === node) ||
        (node.parent?.type === 'DoWhileStatement' && node.parent.test === node)
      );
    }

    function report(node) {
      if (isInsideDecorator(node)) return;
      if (isSafeVariableInit(node)) return;
      if (isLoopTest(node)) return;
      if (node.type === 'Identifier') return;

      if (isDisallowed(node)) {
        context.report({ node, messageId: 'noInlineLogic' });
      }
    }

    return {
      IfStatement(node) {
        report(node.test);
      },
      WhileStatement(node) {
        report(node.test);
      },
      DoWhileStatement(node) {
        report(node.test);
      },
      ForStatement(node) {
        if (node.test) report(node.test);
      },
      ConditionalExpression(node) {
        report(node.test);
      },
      ArrayExpression(node) {
        for (const element of node.elements) {
          if (element) report(element);
        }
      },
      Property(node) {
        if (node.value && node.value !== node.key) report(node.value);
      },
    };
  },
});

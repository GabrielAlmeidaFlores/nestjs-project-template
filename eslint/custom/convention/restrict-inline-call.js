const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'no-inline-function-calls',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow function calls used directly as arguments, control flow conditions, or object property values. Requires assigning the result to a variable first.',
      category: 'Best Practices',
      recommended: true,
      suggestion: false,
    },
    schema: [],
    messages: {
      noInlineCall: 'Function calls used as values must be encapsulated in variables.',
      noInlineArgument: 'Do not pass function calls directly as arguments. Assign to a variable first.',
      noInlineControlFlow: 'Do not use function calls in control flow conditions. Assign to a variable first.',
      noInlineObjectValue: 'Do not use function calls as object property values. Assign to a variable first.',
    },
  },
  defaultOptions: [],
  create(context) {
    function isInsideDecorator(node) {
      let current = node.parent;
      while (current) {
        if (current.type === 'Decorator') return true;
        current = current.parent;
      }
      return false;
    }

    function unwrap(node) {
      let current = node;
      while (
        current.parent &&
        ['TSAsExpression', 'TypeAssertion', 'AwaitExpression', 'UnaryExpression'].includes(current.parent.type)
      ) {
        current = current.parent;
      }
      return current;
    }

    function isSafeAssignment(node) {
      let current = node;
      while (current.parent) {
        const parent = current.parent;
        if (['LogicalExpression', 'ConditionalExpression'].includes(parent.type)) {
          current = parent;
          continue;
        }
        if (
          parent.type === 'AssignmentExpression' && parent.right === current ||
          parent.type === 'VariableDeclarator' && parent.init === current
        ) {
          return true;
        }
        break;
      }
      return false;
    }

    function isFinalExpressionStatement(node) {
      let current = unwrap(node);
      while (
        current.parent &&
        ['MemberExpression', 'CallExpression'].includes(current.parent.type)
      ) {
        current = current.parent;
      }
      return current.parent?.type === 'ExpressionStatement';
    }

    return {
      CallExpression(node) {
        const unwrapped = unwrap(node);
        const parent = unwrapped.parent;

        if (!parent || isInsideDecorator(node) || isFinalExpressionStatement(node) || isSafeAssignment(unwrapped)) {
          return;
        }

        if (parent.type === 'ReturnStatement') return;
        if (parent.type === 'PropertyDefinition') return;
        if (
          ['ArrowFunctionExpression', 'FunctionExpression'].includes(parent.type) &&
          parent.body === node
        ) return;

        if (parent.type === 'CallExpression' && parent.arguments.includes(node)) {
          context.report({ node, messageId: 'noInlineArgument' });
        } else if (parent.type === 'Property' && parent.value === node && parent.parent.type === 'ObjectExpression') {
          context.report({ node, messageId: 'noInlineObjectValue' });
        } else if (
          ['IfStatement', 'WhileStatement', 'SwitchStatement', 'DoWhileStatement'].includes(parent.type)
        ) {
          context.report({ node, messageId: 'noInlineControlFlow' });
        } else {
          context.report({ node, messageId: 'noInlineCall' });
        }
      },
    };
  },
});

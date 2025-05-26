const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow function calls as values (e.g., arguments, object properties, control flow). Require assigning to a variable first. Allows builder chains, decorators, and safe fallback expressions.',
      category: 'Best Practices',
    },
    schema: [],
    messages: {
      noInlineCall:
        'Function calls used as values must be encapsulated in variables.',
      noInlineArgument:
        'Do not pass function calls directly as arguments. Assign to a variable first.',
      noInlineControlFlow:
        'Do not use function calls in control flow conditions. Assign to a variable first.',
      noInlineObjectValue:
        'Do not use function calls as object property values. Assign to a variable first.',
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

    function isPartOfBuilderChain(node) {
      return (
        node.parent &&
        (node.parent.type === 'MemberExpression' || node.parent.type === 'CallExpression') &&
        node.parent.callee === node
      );
    }

    function unwrapTypeCasts(node) {
      let current = node;
      while (
        current.parent &&
        (current.parent.type === 'TSAsExpression' || current.parent.type === 'TypeAssertion')
      ) {
        current = current.parent;
      }
      return current;
    }

    function isPureExpressionStatement(node) {
      let current = node;
      while (
        current.parent &&
        (current.parent.type === 'MemberExpression' || current.parent.type === 'CallExpression')
      ) {
        current = current.parent;
      }
      return current.parent?.type === 'ExpressionStatement';
    }

    function isInsideSafeAssignmentContext(node) {
      let current = node;
      while (current.parent) {
        const parent = current.parent;

        if (
          parent.type === 'LogicalExpression' ||
          parent.type === 'ConditionalExpression'
        ) {
          current = parent;
          continue;
        }

        if (
          parent.type === 'AssignmentExpression' &&
          parent.right === current
        ) {
          return true;
        }

        if (
          parent.type === 'VariableDeclarator' &&
          parent.init === current
        ) {
          return true;
        }

        break;
      }

      return false;
    }

    return {
      CallExpression(node) {
        const unwrapped = unwrapTypeCasts(node);
        const parent = unwrapped.parent;

        if (!parent) return;

        if (isInsideDecorator(node)) return;
        if (isPureExpressionStatement(node)) return;
        if (isInsideSafeAssignmentContext(unwrapped)) return;

        if (parent.type === 'ReturnStatement') return;
        if (parent.type === 'PropertyDefinition') return;

        if (
          (parent.type === 'ArrowFunctionExpression' ||
            parent.type === 'FunctionExpression') &&
          parent.body === node
        ) return;

        if (isPartOfBuilderChain(node)) return;

        if (
          parent.type === 'CallExpression' &&
          parent.arguments.includes(node)
        ) {
          context.report({ node, messageId: 'noInlineArgument' });
          return;
        }

        if (
          parent.type === 'Property' &&
          parent.value === node &&
          parent.parent.type === 'ObjectExpression'
        ) {
          context.report({ node, messageId: 'noInlineObjectValue' });
          return;
        }

        if (
          [
            'IfStatement',
            'WhileStatement',
            'SwitchStatement',
            'DoWhileStatement',
          ].includes(parent.type)
        ) {
          context.report({ node, messageId: 'noInlineControlFlow' });
          return;
        }

        context.report({ node, messageId: 'noInlineCall' });
      },
    };
  },
});

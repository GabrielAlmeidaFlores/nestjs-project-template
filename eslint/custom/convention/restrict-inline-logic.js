const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow inline logic (binary, logical, unary) and function calls in control flow, arguments, and object properties. Require assigning to a named variable first. Allows decorators, final expressions, and safe assignment.',
      category: 'Best Practices',
      recommended: true,
      suggestion: false,
    },
    schema: [],
    messages: {
      noInlineLogic:
        'Avoid inline logic. Assign the result to a clearly named variable first.',
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
    const disallowedTypes = new Set([
      'BinaryExpression',
      'LogicalExpression',
      'UnaryExpression',
      'CallExpression',
    ]);

    function isDisallowedExpression(node) {
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

    function unwrapExpression(node) {
      let current = node;
      while (
        current.parent &&
        (current.parent.type === 'TSAsExpression' ||
          current.parent.type === 'TypeAssertion' ||
          current.parent.type === 'AwaitExpression' ||
          current.parent.type === 'UnaryExpression')
      ) {
        current = current.parent;
      }
      return current;
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

    function isFinalExpressionStatement(node) {
      let current = unwrapExpression(node);
      while (
        current.parent &&
        (current.parent.type === 'MemberExpression' ||
          current.parent.type === 'CallExpression')
      ) {
        current = current.parent;
      }

      return current.parent?.type === 'ExpressionStatement';
    }

    function isInLoopCondition(node) {
      const parent = node.parent;
      return (
        (parent?.type === 'ForStatement' && parent.test === node) ||
        (parent?.type === 'WhileStatement' && parent.test === node) ||
        (parent?.type === 'DoWhileStatement' && parent.test === node)
      );
    }

    function reportDisallowedExpression(node) {
      if (isInsideDecorator(node)) return;
      if (isInsideSafeAssignmentContext(node)) return;
      if (isFinalExpressionStatement(node)) return;
      if (isInLoopCondition(node)) return;

      if (node.type === 'CallExpression') {
        const parent = node.parent;

        if (
          parent?.type === 'CallExpression' &&
          parent.arguments.includes(node)
        ) {
          context.report({ node, messageId: 'noInlineArgument' });
          return;
        }

        if (
          parent?.type === 'Property' &&
          parent.value === node &&
          parent.parent.type === 'ObjectExpression'
        ) {
          context.report({ node, messageId: 'noInlineObjectValue' });
          return;
        }

        if (
          ['IfStatement', 'WhileStatement', 'SwitchStatement', 'DoWhileStatement'].includes(
            parent?.type,
          )
        ) {
          context.report({ node, messageId: 'noInlineControlFlow' });
          return;
        }

        context.report({ node, messageId: 'noInlineCall' });
        return;
      }

      context.report({ node, messageId: 'noInlineLogic' });
    }

    return {
      IfStatement(node) {
        reportDisallowedExpression(node.test);
      },
      WhileStatement(node) {
        reportDisallowedExpression(node.test);
      },
      DoWhileStatement(node) {
        reportDisallowedExpression(node.test);
      },
      ForStatement(node) {
        if (node.test) reportDisallowedExpression(node.test);
      },
      ConditionalExpression(node) {
        reportDisallowedExpression(node.test);
      },
      ArrayExpression(node) {
        for (const element of node.elements) {
          if (element && isDisallowedExpression(element)) {
            reportDisallowedExpression(element);
          }
        }
      },
      Property(node) {
        if (node.value && node.value !== node.key && isDisallowedExpression(node.value)) {
          reportDisallowedExpression(node.value);
        }
      },
      CallExpression(node) {
        for (const arg of node.arguments) {
          if (isDisallowedExpression(arg)) {
            reportDisallowedExpression(arg);
          }
        }
      },
    };
  },
});

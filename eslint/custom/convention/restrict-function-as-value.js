module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce that function calls must be encapsulated in variables',
      category: 'Best Practices',
    },
    schema: [],
  },
  create(context) {
    function isInsideDecorator(node) {
      let parent = node.parent;
      while (parent) {
        if (parent.type === 'Decorator') {
          return true;
        }
        parent = parent.parent;
      }
      return false;
    }

    function isClassProperty(node) {
      let parent = node.parent;
      while (parent) {
        if (parent.type === 'PropertyDefinition') {
          return true;
        }
        if (parent.type === 'ClassBody' || parent.type === 'ClassDeclaration') {
          return false;
        }
        parent = parent.parent;
      }
      return false;
    }

    return {
      CallExpression(node) {
        if (isInsideDecorator(node)) {
          return;
        }

        if (isClassProperty(node)) {
          return;
        }

        if (node.parent.type === 'VariableDeclarator') {
          return;
        }

        if (node.parent.type === 'ExpressionStatement') {
          return;
        }

        const isInsideCallback = [
          'ArrowFunctionExpression',
          'FunctionExpression',
        ].includes(node.parent.type);

        if (isInsideCallback) {
          return;
        }

        if (node.parent.type === 'NewExpression') {
          return;
        }

        context.report({
          node,
          message:
            'All function calls must be encapsulated in a variable before use',
        });
      },
    };
  },
};

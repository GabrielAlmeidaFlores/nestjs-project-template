module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce that function calls must be encapsulated in variables",
      category: "Best Practices",
    },
    schema: []
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

    function isPropertyAssignment(node) {
      const parent = node.parent;
      return (
        (parent.type === 'AssignmentExpression' && 
         parent.left.type === 'MemberExpression' &&
         parent.parent.type === 'ExpressionStatement') ||
        parent.type === 'PropertyDefinition' ||
        parent.type === 'Property'
      );
    }

    return {
      CallExpression(node) {
        if (isInsideDecorator(node)) {
          return;
        }

        if (isPropertyAssignment(node)) {
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
          'FunctionExpression'
        ].includes(node.parent.type);
        
        if (isInsideCallback) {
          return;
        }

        if (node.parent.type === 'NewExpression') {
          return;
        }

        context.report({
          node,
          message: 'All function calls must be encapsulated in a variable before use'
        });
      }
    };
  }
};